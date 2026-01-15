# Environment Variables Setup

## Payment Configuration

### Payment Provider Selection
```env
NEXT_PUBLIC_PAYMENT_MODE=mock|paddle|stripe
```
- `mock`: Simulated payments for local development
- `paddle`: Paddle Merchant of Record
- `stripe`: Stripe payments

### Paddle Configuration (Required when NEXT_PUBLIC_PAYMENT_MODE=paddle)

```env
# Paddle API Key (from Paddle Dashboard > Developer Tools > Authentication)
PADDLE_API_KEY=test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Paddle Environment
PADDLE_ENVIRONMENT=sandbox
# Options: 'sandbox' (for testing) or 'production' (for live)

# Paddle Webhook Secret (from Paddle Dashboard > Developer Tools > Webhooks)
PADDLE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Option 1: Paddle Classic Checkout (simpler, recommended)
PADDLE_VENDOR_ID=your_vendor_id
PADDLE_PRODUCT_ID=your_product_id

# Option 2: Paddle Billing API (alternative)
PADDLE_PRICE_ID=pri_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**Getting Paddle Credentials:**
1. Sign up at https://paddle.com
2. Go to Dashboard > Developer Tools > Authentication
3. Generate API Key (separate for sandbox and production)
4. Go to Developer Tools > Webhooks
5. Create webhook endpoint: `https://yourdomain.com/api/webhook/paddle`
6. Copy webhook secret
7. Create a product in Paddle dashboard
8. Copy Product ID (for Classic) or Price ID (for Billing API)

### Stripe Configuration (Required when NEXT_PUBLIC_PAYMENT_MODE=stripe)

```env
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### App Configuration

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
# For production: https://yourdomain.com

NEXT_PUBLIC_AD_MODE=mock|real
# 'mock' for local testing, 'real' for production with ad provider
```

## Example .env.local

```env
# Payment
NEXT_PUBLIC_PAYMENT_MODE=mock

# Paddle (when using paddle mode)
PADDLE_API_KEY=
PADDLE_ENVIRONMENT=sandbox
PADDLE_WEBHOOK_SECRET=
PADDLE_VENDOR_ID=
PADDLE_PRODUCT_ID=

# Stripe (when using stripe mode)
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_AD_MODE=mock
```

## Local Development

For local development without payment providers:
- Set `NEXT_PUBLIC_PAYMENT_MODE=mock`
- Set `NEXT_PUBLIC_AD_MODE=mock`
- No API keys required

## Production Deployment

1. Set `NEXT_PUBLIC_PAYMENT_MODE=paddle` (or `stripe`)
2. Add all required API keys
3. Set `PADDLE_ENVIRONMENT=production` (if using Paddle)
4. Update `NEXT_PUBLIC_APP_URL` to your production domain
5. Configure webhook URL in Paddle/Stripe dashboard:
   - Paddle: `https://yourdomain.com/api/webhook/paddle`
   - Stripe: `https://yourdomain.com/api/webhook`
