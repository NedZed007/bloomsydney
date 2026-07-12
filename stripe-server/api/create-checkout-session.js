const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function setCors(res, origin) {
  const allowed = process.env.ALLOWED_ORIGIN || '*';
  const allowOrigin = allowed === '*' ? origin || '*' : allowed;
  res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function json(res, status, body) {
  res.status(status).json(body);
}

module.exports = async (req, res) => {
  setCors(res, req.headers.origin);

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return json(res, 405, { error: 'Method not allowed' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return json(res, 500, { error: 'STRIPE_SECRET_KEY is not configured on the server' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return json(res, 400, { error: 'Invalid JSON body' });
    }
  }

  const { orderId, items, total, customerEmail, deliveryFee } = body || {};

  if (!orderId || !Array.isArray(items) || items.length === 0) {
    return json(res, 400, { error: 'orderId and items are required' });
  }

  const siteUrl = (process.env.SITE_URL || 'http://localhost:8080').replace(/\/$/, '');

  const lineItems = items.map((item) => ({
    price_data: {
      currency: 'aud',
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round(Number(item.price) * 100),
    },
    quantity: Math.max(1, Number(item.qty) || 1),
  }));

  if (deliveryFee && Number(deliveryFee) > 0) {
    lineItems.push({
      price_data: {
        currency: 'aud',
        product_data: {
          name: 'Delivery fee',
        },
        unit_amount: Math.round(Number(deliveryFee) * 100),
      },
      quantity: 1,
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems,
      customer_email: customerEmail || undefined,
      metadata: {
        orderId: String(orderId),
        expectedTotal: total != null ? String(total) : '',
      },
      success_url: `${siteUrl}/?payment=success&order_id=${encodeURIComponent(orderId)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/?payment=cancelled&order_id=${encodeURIComponent(orderId)}`,
    });

    return json(res, 200, { url: session.url, sessionId: session.id });
  } catch (err) {
    console.error('Stripe session error:', err.message);
    return json(res, 500, { error: err.message || 'Failed to create checkout session' });
  }
};
