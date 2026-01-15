# IQ Test Web Application - Global Platform

A conversion-optimized, multilingual IQ test platform designed for global Google Ads traffic monetization. Features visual pattern questions (Raven-style), automatic language detection, and flexible monetization with free (ad-supported) and paid (detailed PDF) options.

## Features

- **Multilingual Support**: 7 languages (English, Spanish, Italian, German, Turkish, Greek, French)
- **Automatic Language Detection**: Detects user language from browser settings
- **Visual Pattern Questions**: Raven-style progressive matrix questions with SVG-based patterns
- **Professional UI**: Centered, minimal, mobile-first design optimized for IQ test experience
- **Flexible Monetization**:
  - **Free**: Basic IQ range after watching a mock ad (15-20 seconds)
  - **Paid**: Detailed PDF report with cognitive breakdown ($79 USD)
- **Mock Modes**: Test locally without payment provider keys or real ad providers
- **Paddle Integration**: Production-ready payment processing with Paddle as Merchant of Record
- **PDF Reports**: Detailed cognitive analysis for premium users
- **Google Ads Compliant**: Proper disclaimers in all languages

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Paddle (Payment processing & Merchant of Record)
- jsPDF (PDF generation)
- i18n routing with middleware

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Payment Mode: 'mock' for local testing, 'paddle' for production
NEXT_PUBLIC_PAYMENT_MODE=mock

# Paddle Configuration (required when NEXT_PUBLIC_PAYMENT_MODE=paddle)
PADDLE_API_KEY=test_your_api_key_here
PADDLE_ENVIRONMENT=sandbox
PADDLE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
PADDLE_VENDOR_ID=your_vendor_id
PADDLE_PRODUCT_ID=your_product_id

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Ad Mode: 'mock' for local testing, 'real' for production
NEXT_PUBLIC_AD_MODE=mock

# Auth Configuration
AUTH_SECRET=your-secret-key-change-in-production

# Mock Premium Mode (for testing)
MOCK_PREMIUM_ACTIVE=false
```

**For Local Development (No Payment Keys Required):**
- Set `NEXT_PUBLIC_PAYMENT_MODE=mock`
- Set `NEXT_PUBLIC_AD_MODE=mock`
- The app will work fully with simulated payments and ads
- Purchase data stored in `data/purchases.json` (file-based)

**For Production with Paddle:**
- Set `NEXT_PUBLIC_PAYMENT_MODE=paddle`
- Add your Paddle API keys (see `ENV_SETUP.md` for details)
- Set `PADDLE_ENVIRONMENT=production`
- Configure webhook: `https://yourdomain.com/api/webhook/paddle`
- Set `NEXT_PUBLIC_AD_MODE=real` (when you integrate a real ad provider)
- Update `NEXT_PUBLIC_APP_URL` to your production domain


### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app will automatically detect your language and redirect to the appropriate locale (e.g., `/en`, `/es`, `/tr`).

### 4. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
iq-test-app/
├── app/
│   ├── [locale]/              # Locale-based routing
│   │   ├── layout.tsx         # Locale layout with language switcher
│   │   ├── page.tsx           # Landing page
│   │   ├── test/
│   │   │   └── page.tsx       # IQ test page
│   │   ├── result-lock/
│   │   │   └── page.tsx       # Results gate (ad/payment)
│   │   └── result/
│   │       └── page.tsx       # Result display
│   ├── api/
│   │   └── payment/
│   │       └── route.ts       # Paddle payment API
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── LanguageSwitcher.tsx    # Language selector component
│   └── AdModal.tsx             # Mock ad modal component
├── locales/                    # Translation files
│   ├── en/common.json
│   ├── es/common.json
│   ├── it/common.json
│   ├── de/common.json
│   ├── tr/common.json
│   ├── el/common.json
│   └── fr/common.json
├── lib/
│   ├── i18n.ts                 # i18n utilities
│   ├── use-translations.ts    # Client-side translation hook
│   ├── questions.ts            # Question data & IQ calculation
│   ├── visual-patterns.tsx     # Visual pattern generator
│   └── pdf-generator.ts        # PDF report generation
├── middleware.ts               # Locale detection & routing
└── package.json
```

## Supported Languages

- English (en) - Default
- Spanish (es)
- Italian (it)
- German (de)
- Turkish (tr)
- Greek (el)
- French (fr)

Language is automatically detected from:
1. Browser `Accept-Language` header
2. Stored cookie preference
3. Falls back to English

Users can manually switch languages using the language switcher in the top-right corner.

## Monetization Flow

### Free Path (Ad-Supported)
1. User completes the test
2. Results gate screen shows "Calculating..." animation
3. User clicks "Watch Ad to Reveal Basic Result"
4. Mock ad modal appears (15-20 second countdown)
5. After ad completes, basic IQ range is unlocked
6. User can view free result or upgrade to full report

### Paid Path (Weekly Subscription)
1. User clicks "Start 1€ Trial" on results gate
2. If not logged in, login modal appears (email magic link)
3. After authentication, redirects to Paddle checkout for weekly subscription
4. After successful payment, webhook updates user entitlement
5. User gets premium access with:
   - Exact IQ score
   - Cognitive breakdown (Pattern Recognition, Abstract Reasoning, Complex Analysis)
   - Downloadable PDF report
   - Overall accuracy percentage
   - Premium features persist across devices/sessions

## Membership & Entitlement System

### Overview

The application includes a minimal membership system for weekly subscription management. Premium access persists across devices and sessions through user authentication and entitlement tracking.

### Authentication

**Email Magic Link Authentication:**
- Users sign in with email (no password required)
- Magic link sent to email (valid for 15 minutes)
- Session stored in HTTP-only cookie (30-day duration)
- In development mode, magic link is logged to console for testing

**API Endpoints:**
- `POST /api/auth/login` - Request magic link
- `GET /api/auth/verify?token=...` - Verify magic link and create session
- `GET /api/auth/session` - Get current user session
- `POST /api/auth/logout` - Clear session

### Database Schema

**Users Table** (`data/users.json`):
```typescript
{
  id: string;
  email: string;
  createdAt: string;
}
```

**Entitlements Table** (`data/entitlements.json`):
```typescript
{
  userId: string;
  premiumActive: boolean;
  premiumUntil: string | null;  // ISO date string
  providerCustomerId: string | null;  // Paddle customer ID
  providerSubscriptionId: string | null;  // Paddle subscription ID
  updatedAt: string;
}
```

### Entitlement Flow

1. **User Registration:**
   - User signs in with email magic link
   - User record created in `data/users.json`
   - Default entitlement created with `premiumActive: false`

2. **Subscription Purchase:**
   - User clicks "Start 1€ Trial" on result lock page
   - If not authenticated, login modal appears
   - After login, redirected to Paddle checkout
   - Checkout includes `userId` in metadata

3. **Webhook Processing:**
   - Paddle webhook receives subscription events:
     - Subscription created/updated - Maps subscription to user
     - Payment succeeded - Updates entitlement and refreshes premium access
     - Subscription cancelled - Revokes premium access
   - Entitlement updated with:
     - `premiumActive: true`
     - `premiumUntil: <subscription period end>`
     - `providerCustomerId` and `providerSubscriptionId`

4. **Premium Access Check:**
   - On app load, fetch user session
   - Check entitlement via `GET /api/entitlement/check`
   - Show/hide premium features based on `premiumActive` and `premiumUntil`

### Mock Mode for Testing

**Toggle Premium Access:**
```bash
POST /api/entitlement/toggle-mock
Content-Type: application/json

{
  "premiumActive": true
}
```

**Environment Variable:**
```env
MOCK_PREMIUM_ACTIVE=true  # Overrides all entitlement checks
```

**Development Testing:**
1. Sign in with email
2. Use `/api/entitlement/toggle-mock` to enable premium
3. Premium features unlocked immediately
4. Test premium UI and functionality

### Environment Variables

Add to `.env.local`:
```env
# Auth secret for JWT tokens (change in production!)
AUTH_SECRET=your-secret-key-change-in-production

# Mock premium mode (for testing)
MOCK_PREMIUM_ACTIVE=false
```

### Production Considerations

**Database Migration:**
- Current: File-based storage (`data/*.json`)
- Production: Replace `lib/db.ts` with PostgreSQL, MySQL, or MongoDB
- Migrate existing data before switching

**Email Service Integration:**
- Replace mock email in `app/api/auth/login/route.ts`
- Integrate with SendGrid, Resend, AWS SES, etc.
- Example:
```typescript
import { sendEmail } from '@/lib/email-service';
await sendEmail({
  to: email,
  subject: 'Sign in to IQTestZone',
  html: `Click here to sign in: <a href="${magicLink}">${magicLink}</a>`
});
```

**Security:**
- Change `AUTH_SECRET` to a strong random string in production
- Use HTTPS in production (required for secure cookies)
- Add rate limiting to auth endpoints
- Consider adding CAPTCHA to prevent abuse

## Payment Configuration

### Mock Mode (Development)
- Set `NEXT_PUBLIC_PAYMENT_MODE=mock` in `.env.local`
- Payments are simulated without a payment provider
- Users are redirected to results page with mock session ID
- Perfect for local development and testing

### Paddle Mode (Production)
1. Sign up at [Paddle](https://paddle.com)
2. Configure your Paddle account and products
3. Get your API keys from Paddle dashboard
4. Set `NEXT_PUBLIC_PAYMENT_MODE=paddle`
5. Add Paddle configuration (see `ENV_SETUP.md` for details)
6. Configure webhook: `https://yourdomain.com/api/webhook/paddle`

**Pricing:**
- Full Report: $79 USD
- Currency: USD (can be changed in payment route)

**Note:** Paddle acts as the Merchant of Record for all transactions.

## Ad Integration

### Mock Mode (Development)
- Set `NEXT_PUBLIC_AD_MODE=mock` in `.env.local`
- Shows a simulated ad with countdown timer
- 15-20 second duration
- Skip button appears after 5 seconds

### Real Ad Provider (Production)
1. Set `NEXT_PUBLIC_AD_MODE=real` in `.env.local`
2. Integrate your ad provider SDK in `components/AdModal.tsx`
3. Replace mock ad logic with real ad provider calls
4. Common providers: Google AdSense, AdMob, Unity Ads

**Recommended Integration Points:**
- `components/AdModal.tsx` - Replace mock ad with real provider
- `app/[locale]/result-lock/page.tsx` - Update ad completion handler

## Question Bank

- **25 Visual Pattern Questions**
- **Types**: Raven-style matrices, sequence patterns, abstract reasoning
- **Difficulty**: Progressive (5 easy, 15 medium, 5 hard)
- **Rendering**: SVG-based patterns (no copyrighted images)
- **Scoring**: Weighted by difficulty and time remaining

## Scoring System

- **IQ Ranges Only**: No exact scores for free users (e.g., 90-100, 110-120, 130+)
- **Free Result**: Shows IQ range + positive description
- **Paid Result**: Shows exact score + cognitive breakdown + PDF

**Range Categories:**
- Below Average: 70-89
- Average: 90-109
- Above Average: 110-129
- High: 130-144
- Very High: 145+

## Legal Compliance

All pages include translated disclaimers:

> "This test is for entertainment and personal awareness. It is not a clinical diagnostic tool. IQ scores are shown as ranges only."

**Key Compliance Points:**
- No medical/clinical claims
- No "official" or "certified" language
- Clear entertainment purpose
- IQ ranges only (not exact scores for free users)
- Translated disclaimers in all languages

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_PAYMENT_MODE=paddle`
   - Paddle configuration variables (see `ENV_SETUP.md`)
   - `NEXT_PUBLIC_APP_URL=https://yourdomain.com`
   - `NEXT_PUBLIC_AD_MODE=real` (when ready)
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- DigitalOcean App Platform

## Testing Checklist

- [ ] Language detection works (browser settings)
- [ ] Language switcher changes locale correctly
- [ ] All pages display in selected language
- [ ] Test flow: Landing → Test → Result Lock → Result
- [ ] Mock ad plays and unlocks free result
- [ ] Mock payment redirects to result page
- [ ] Free result shows IQ range only
- [ ] Paid result shows full breakdown
- [ ] PDF download works for premium users
- [ ] Disclaimers appear on all pages
- [ ] Mobile responsive design works
- [ ] All 7 languages have complete translations

## Next Steps & Optimizations

1. **A/B Testing**:
   - Test different ad durations (15s vs 20s)
   - Test pricing ($79 vs $99)
   - Test CTA copy variations

2. **Ad Provider Integration**:
   - Integrate Google AdSense or AdMob
   - Implement rewarded video ads
   - Track ad completion rates

3. **Analytics**:
   - Add Google Analytics or Plausible
   - Track conversion rates (free vs paid)
   - Monitor language distribution

4. **Performance**:
   - Optimize image loading
   - Add loading states
   - Implement service worker for offline support

5. **SEO**:
   - Add meta tags per locale
   - Implement sitemap.xml
   - Add structured data

## License

Private project - All rights reserved
