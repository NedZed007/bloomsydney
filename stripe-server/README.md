# BloomSydney Stripe Checkout Server

Minimal serverless backend for creating [Stripe Checkout](https://stripe.com/docs/payments/checkout) sessions. The BloomSydney frontend is static (GitHub Pages); the **secret key must live here**, not in `app.js`.

## What it does

`POST /api/create-checkout-session` accepts:

```json
{
  "orderId": "BS-0001",
  "items": [{ "name": "Classic Rose Bouquet", "qty": 1, "price": 89 }],
  "total": 89,
  "deliveryFee": 12.25,
  "customerEmail": "customer@example.com"
}
```

Returns `{ "url": "https://checkout.stripe.com/...", "sessionId": "cs_..." }`.

## 1. Stripe dashboard setup

1. Create a [Stripe account](https://dashboard.stripe.com/register) (use **Test mode** while developing).
2. Go to **Developers → API keys**.
3. Copy:
   - **Publishable key** → set in `app.js` as `STRIPE_CONFIG.publishableKey`
   - **Secret key** → set as `STRIPE_SECRET_KEY` on the server (never commit)

## 2. Deploy (Vercel — recommended)

```bash
cd stripe-server
npm install
cp .env.example .env.local   # edit with your keys
npx vercel
```

Set these environment variables in the Vercel project:

| Variable | Example |
|----------|---------|
| `STRIPE_SECRET_KEY` | `sk_test_...` |
| `SITE_URL` | `https://your-username.github.io/sydney-florist-marketplace` |
| `ALLOWED_ORIGIN` | `https://your-username.github.io` |

Your API URL will be:

```
https://your-project.vercel.app/api/create-checkout-session
```

Set that in `app.js` → `STRIPE_CONFIG.apiUrl`.

### Local dev with Vercel

```bash
cd stripe-server
npm install
cp .env.example .env.local
npx vercel dev
```

Then point `STRIPE_CONFIG.apiUrl` to `http://localhost:3000/api/create-checkout-session`.

## 3. Deploy (Netlify alternative)

1. Create a new Netlify site from the `stripe-server/` folder.
2. Set the same env vars in **Site settings → Environment variables**.
3. The function lives at `/.netlify/functions/create-checkout-session`.
4. Set `STRIPE_CONFIG.apiUrl` in `app.js` to that URL.

## 4. Wire the frontend

In `app.js`, update `STRIPE_CONFIG`:

```javascript
const STRIPE_CONFIG = {
  publishableKey: 'pk_test_...',  // optional for Checkout redirect
  apiUrl: 'https://your-project.vercel.app/api/create-checkout-session',
  enabled: true,
};
```

Redeploy the static site to GitHub Pages after editing.

## 5. Success / cancel URLs

The server sets Stripe redirect URLs back to your GitHub Pages site:

- **Success:** `SITE_URL/?payment=success&order_id=BS-0001&session_id=cs_...`
- **Cancel:** `SITE_URL/?payment=cancelled&order_id=BS-0001`

The frontend reads these query params, marks the order **Paid** in `localStorage`, and opens the Order Routing tab.

## Test flow

1. Place an order on the shop (cart → Place order).
2. Open **Order Routing** → pending order queue.
3. Click **Pay with card** on an order card (or **Pay now** in the confirmation modal).
4. Complete payment with Stripe test card `4242 4242 4242 4242`, any future expiry, any CVC.
5. You are redirected back; the order shows a green **Paid** badge.

## Security notes

- Never commit `.env.local` or real API keys.
- In production, set `ALLOWED_ORIGIN` to your exact GitHub Pages origin.
- For production payments, verify sessions server-side (webhook on `checkout.session.completed`) before fulfilling orders. This stub marks paid on the client for demo purposes only.

## Files

| File | Purpose |
|------|---------|
| `api/create-checkout-session.js` | Vercel serverless function |
| `netlify/functions/create-checkout-session.js` | Netlify equivalent |
| `.env.example` | Template for required env vars |
