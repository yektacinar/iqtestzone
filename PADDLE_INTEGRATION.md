# Paddle Payment Integration

## Overview

The application now supports Paddle as a Merchant of Record (MoR) payment provider alongside Stripe and mock payments.

## Features

- ✅ Payment provider abstraction (mock | paddle | stripe)
- ✅ Paddle Checkout integration (Classic and Billing API)
- ✅ Webhook endpoint with signature verification
- ✅ Purchase status tracking in file-based database
- ✅ Premium access granted after successful payment
- ✅ PDF report generation for premium users

## Architecture

### Payment Flow

1. User completes test → sees result lock screen
2. User clicks "Get Full Report" → redirected to `/api/payment?type=premium&locale={locale}`
3. Payment route:
   - **Mock**: Creates purchase record, redirects to result
   - **Paddle**: Creates pending purchase, redirects to Paddle checkout
   - **Stripe**: Creates Stripe checkout session
4. After payment:
   - Paddle webhook → updates purchase status → user gets premium access
   - Result page checks purchase status from database

### Database Layer

Simple file-based storage in `data/purchases.json`:
- Stores transaction ID, session ID, status, timestamps
- In production, replace with PostgreSQL/MySQL/etc.

### Webhook Handling

- Endpoint: `/api/webhook/paddle`
- Verifies signature using HMAC-SHA256
- Handles events: `payment_succeeded`, `transaction.completed`, `payment_failed`
- Updates purchase status in database

## Setup Instructions

### 1. Create Paddle Account

1. Sign up at https://paddle.com
2. Complete business verification
3. Set up tax settings

### 2. Get Paddle Credentials

1. **API Key**: Dashboard > Developer Tools > Authentication
   - Generate API key (separate for sandbox/production)
2. **Vendor ID**: Dashboard > Account Settings
3. **Product ID**: Dashboard > Products
   - Create a product for "IQ Test - Detailed PDF Analysis"
   - Set price: $79.00 USD
   - Copy Product ID
4. **Webhook Secret**: Dashboard > Developer Tools > Webhooks
   - Create webhook: `https://yourdomain.com/api/webhook/paddle`
   - Copy webhook secret

### 3. Configure Environment

Add to `.env.local`:

```env
NEXT_PUBLIC_PAYMENT_MODE=paddle
PADDLE_API_KEY=test_xxxxxxxxxxxxx
PADDLE_ENVIRONMENT=sandbox
PADDLE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
PADDLE_VENDOR_ID=your_vendor_id
PADDLE_PRODUCT_ID=your_product_id
```

### 4. Test Integration

1. Set `PADDLE_ENVIRONMENT=sandbox`
2. Use Paddle test cards: https://developer.paddle.com/concepts/payments/test-cards
3. Complete a test purchase
4. Verify webhook receives event
5. Check `data/purchases.json` for purchase record
6. Verify premium access on result page

### 5. Go Live

1. Set `PADDLE_ENVIRONMENT=production`
2. Use production API key
3. Update webhook URL to production domain
4. Test with real payment

## API Endpoints

### Payment Initiation
- `GET /api/payment?type=premium&locale={locale}`
- Creates checkout and redirects user

### Purchase Status Check
- `GET /api/purchase/check?transaction_id={id}`
- Returns purchase status and access level

### Webhook
- `POST /api/webhook/paddle`
- Receives Paddle payment events
- Updates purchase status

## Database Schema

```typescript
interface Purchase {
  transactionId: string;
  sessionId: string;
  userId?: string;
  packageType: 'premium';
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
  completedAt?: string;
  locale?: string;
}
```

## Migration to Production Database

Replace `lib/db.ts` with your database implementation:

```typescript
// Example: PostgreSQL
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function createPurchase(purchase: Omit<Purchase, 'createdAt'>) {
  const result = await pool.query(
    'INSERT INTO purchases (transaction_id, session_id, package_type, status, locale) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [purchase.transactionId, purchase.sessionId, purchase.packageType, purchase.status, purchase.locale]
  );
  return result.rows[0];
}
```

## Testing

### Mock Mode (No Paddle Required)
```env
NEXT_PUBLIC_PAYMENT_MODE=mock
```
- Payments are simulated
- Purchase records created immediately
- Perfect for local development

### Paddle Sandbox
```env
NEXT_PUBLIC_PAYMENT_MODE=paddle
PADDLE_ENVIRONMENT=sandbox
```
- Use Paddle sandbox API keys
- Test with Paddle test cards
- Webhooks work in sandbox

## Troubleshooting

### Webhook Not Receiving Events
1. Check webhook URL is correct in Paddle dashboard
2. Verify webhook secret matches
3. Check server logs for errors
4. Use Paddle webhook testing tool

### Purchase Status Not Updating
1. Check `data/purchases.json` file permissions
2. Verify webhook signature verification
3. Check transaction ID matching logic

### Checkout Not Opening
1. Verify PADDLE_VENDOR_ID and PADDLE_PRODUCT_ID
2. Check Paddle dashboard for product status
3. Verify API key has correct permissions

## Security Notes

- Webhook signature verification is critical in production
- Store API keys in environment variables only
- Use HTTPS for webhook endpoints
- Implement rate limiting on webhook endpoint
- Consider IP whitelisting for webhooks

## Next Steps

1. Replace file-based DB with PostgreSQL/MySQL
2. Add user accounts for persistent purchase history
3. Implement refund handling
4. Add analytics for conversion tracking
5. Set up monitoring for webhook events
