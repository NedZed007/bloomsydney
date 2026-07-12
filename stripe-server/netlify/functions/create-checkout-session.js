const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function corsHeaders(origin) {
  const allowed = process.env.ALLOWED_ORIGIN || '*';
  const allowOrigin = allowed === '*' ? origin || '*' : allowed;
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };
}

exports.handler = async (event) => {
  const headers = corsHeaders(event.headers.origin);

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'STRIPE_SECRET_KEY is not configured on the server' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const { orderId, items, total, customerEmail, deliveryFee } = body;

  if (!orderId || !Array.isArray(items) || items.length === 0) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: 'orderId and items are required' }),
    };
  }

  const siteUrl = (process.env.SITE_URL || 'http://localhost:8080').replace(/\/$/, '');

  const lineItems = items.map((item) => ({
    price_data: {
      currency: 'aud',
      product_data: { name: item.name },
      unit_amount: Math.round(Number(item.price) * 100),
    },
    quantity: Math.max(1, Number(item.qty) || 1),
  }));

  if (deliveryFee && Number(deliveryFee) > 0) {
    lineItems.push({
      price_data: {
        currency: 'aud',
        product_data: { name: 'Delivery fee' },
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

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ url: session.url, sessionId: session.id }),
    };
  } catch (err) {
    console.error('Stripe session error:', err.message);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message || 'Failed to create checkout session' }),
    };
  }
};
