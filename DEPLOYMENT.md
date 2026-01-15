# Deployment Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   
   Create `.env.local` file:
   ```env
   STRIPE_SECRET_KEY=sk_live_your_secret_key
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   NEXT_PUBLIC_APP_URL=https://yourdomain.com
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

## Stripe Setup

### 1. Create Stripe Account
- Go to https://stripe.com
- Create an account
- Complete business verification

### 2. Get API Keys
- Dashboard → Developers → API keys
- Copy Secret Key and Publishable Key
- Add to `.env.local`

### 3. Configure Webhooks (Optional but Recommended)
- Dashboard → Developers → Webhooks
- Add endpoint: `https://yourdomain.com/api/webhook`
- Select events: `checkout.session.completed`
- Copy webhook signing secret to `.env.local`

### 4. Test Mode
- Use test keys for development
- Test card: `4242 4242 4242 4242`
- Any future expiry date and CVC

## Vercel Deployment (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin your-repo-url
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to https://vercel.com
   - Import your GitHub repository
   - Add environment variables
   - Deploy

3. **Configure Domain**
   - Add your custom domain in Vercel dashboard
   - Update `NEXT_PUBLIC_APP_URL` in environment variables

## Other Deployment Options

### Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Add environment variables

### AWS Amplify
1. Connect repository
2. Build settings: Auto-detect Next.js
3. Add environment variables

### Railway
1. New project → Deploy from GitHub
2. Add environment variables
3. Deploy

## Post-Deployment Checklist

- [ ] Environment variables configured
- [ ] Stripe keys set (production keys)
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Test payment flow
- [ ] Test PDF generation
- [ ] Verify all pages load correctly
- [ ] Check mobile responsiveness
- [ ] Test timer functionality
- [ ] Verify legal disclaimers visible

## Monitoring

- Set up error tracking (Sentry, LogRocket)
- Monitor Stripe dashboard for payments
- Track conversion rates
- Monitor page load times

## Security Notes

- Never commit `.env.local` to git
- Use environment variables for all secrets
- Enable Stripe webhook signature verification
- Use HTTPS in production
- Regularly update dependencies

## Support

For issues or questions:
- Check Stripe documentation: https://stripe.com/docs
- Next.js documentation: https://nextjs.org/docs
- Review application logs
