# QA Checklist - Global IQ Test Platform

Use this checklist to validate the complete flow before production deployment.

## Pre-Deployment Checklist

### Environment Setup
- [ ] `.env.local` file created from `.env.example`
- [ ] `NEXT_PUBLIC_PAYMENT_MODE=mock` for local testing
- [ ] `NEXT_PUBLIC_AD_MODE=mock` for local testing
- [ ] App runs locally: `npm run dev`
- [ ] No console errors in browser
- [ ] No build errors: `npm run build`

### Language Detection & Routing
- [ ] Visit `/` redirects to `/{detected-locale}/`
- [ ] Browser language detection works (test with different browser languages)
- [ ] Language switcher appears in top-right on all pages
- [ ] Language switcher changes locale correctly
- [ ] URL updates when language changes (e.g., `/en/test` → `/es/test`)
- [ ] All 7 languages accessible via switcher:
  - [ ] English (en)
  - [ ] Spanish (es)
  - [ ] Italian (it)
  - [ ] German (de)
  - [ ] Turkish (tr)
  - [ ] Greek (el)
  - [ ] French (fr)

### Landing Page (`/{locale}/`)
- [ ] Title displays in selected language
- [ ] Subtitle displays in selected language
- [ ] Features (time, questions, no signup) display correctly
- [ ] CTA button text is translated
- [ ] Disclaimer footer is translated
- [ ] "Start Test" button navigates to `/{locale}/test`
- [ ] Mobile responsive
- [ ] Language switcher works

### Test Page (`/{locale}/test`)
- [ ] Question counter displays correctly (e.g., "Question 1 of 25")
- [ ] Timer displays and counts down
- [ ] Progress bar updates correctly
- [ ] Visual pattern questions render correctly:
  - [ ] Matrix questions show 3x3 grid with missing piece
  - [ ] Sequence questions show pattern sequence
  - [ ] Answer options render as visual patterns
- [ ] Answer selection works (click to select)
- [ ] Selected answer shows checkmark
- [ ] "Next" button enables after selection
- [ ] "Finish Test" appears on last question
- [ ] Timer expiration auto-submits test
- [ ] All 25 questions display correctly
- [ ] Mobile responsive
- [ ] Language switcher works

### Results Gate (`/{locale}/result-lock`)
- [ ] "Calculating..." animation shows and stops at 90%
- [ ] Two options appear:
  - [ ] "Watch Ad to Reveal Basic Result" button
  - [ ] "Get Full Report (PDF)" button
- [ ] Clicking "Watch Ad" opens ad modal
- [ ] Ad modal shows:
  - [ ] Mock video player
  - [ ] Countdown timer (15-20 seconds)
  - [ ] Progress bar
  - [ ] Skip button appears after 5 seconds
- [ ] After ad completes:
  - [ ] Free result shows IQ range (e.g., "110-129")
  - [ ] Description displays
  - [ ] "View Result" button appears
  - [ ] Premium upsell appears below
- [ ] Clicking "Get Full Report" redirects to payment
- [ ] Disclaimer footer is translated
- [ ] Mobile responsive
- [ ] Language switcher works

### Result Page - Free (`/{locale}/result`)
- [ ] Shows IQ range only (not exact score)
- [ ] Range displays correctly (e.g., "110-129")
- [ ] Description displays
- [ ] "Want Detailed Analysis?" upsell section appears
- [ ] Upgrade button redirects to payment
- [ ] No cognitive breakdown shown
- [ ] No PDF download button
- [ ] Disclaimer footer is translated
- [ ] Mobile responsive
- [ ] Language switcher works

### Result Page - Paid (`/{locale}/result?session_id=mock_...`)
- [ ] Shows exact IQ score (e.g., "115")
- [ ] Shows score range
- [ ] Description displays
- [ ] Cognitive breakdown section shows:
  - [ ] Pattern Recognition percentage
  - [ ] Abstract Reasoning percentage
  - [ ] Complex Analysis percentage
  - [ ] Overall Accuracy percentage
- [ ] "Download Detailed PDF Report" button appears
- [ ] PDF download works (generates and downloads file)
- [ ] PDF contains:
  - [ ] IQ score and range
  - [ ] Cognitive breakdown
  - [ ] Strengths section
  - [ ] Career suggestions
  - [ ] Improvement tips
  - [ ] Disclaimer
- [ ] Disclaimer footer is translated
- [ ] Mobile responsive
- [ ] Language switcher works

### Payment Flow
- [ ] Mock mode: Clicking "Get Full Report" redirects to result page
- [ ] Mock mode: Session ID appears in URL (`session_id=mock_...`)
- [ ] Stripe mode: Clicking "Get Full Report" redirects to Stripe Checkout
- [ ] Stripe mode: Payment success redirects to result page
- [ ] Stripe mode: Payment cancel redirects to result-lock page
- [ ] Locale preserved in payment redirects

### Translations Quality
- [ ] All UI text is translated (no hardcoded strings)
- [ ] No missing translations (check console for errors)
- [ ] Translations are grammatically correct
- [ ] Button labels are appropriate length
- [ ] Disclaimers are properly translated
- [ ] Numbers and formatting are correct

### Mobile Responsiveness
- [ ] Landing page works on mobile
- [ ] Test page works on mobile (patterns visible)
- [ ] Results gate works on mobile
- [ ] Result page works on mobile
- [ ] Language switcher works on mobile
- [ ] Ad modal works on mobile

### Performance
- [ ] Page load times are acceptable (< 2s)
- [ ] Translations load without delay
- [ ] Visual patterns render quickly
- [ ] No layout shift (CLS)
- [ ] Smooth animations

### Browser Compatibility
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

### Accessibility
- [ ] Keyboard navigation works
- [ ] Focus states visible
- [ ] Alt text for icons (if applicable)
- [ ] Color contrast meets WCAG AA

### Legal Compliance
- [ ] Disclaimers appear on all pages
- [ ] Disclaimers are in selected language
- [ ] No medical/clinical claims
- [ ] No "official" or "certified" language
- [ ] IQ ranges only (not exact scores for free)

## Production Deployment Checklist

### Before Deploying
- [ ] Set `NEXT_PUBLIC_PAYMENT_MODE=stripe` in production env
- [ ] Add Stripe production keys
- [ ] Set `NEXT_PUBLIC_APP_URL` to production domain
- [ ] Set `NEXT_PUBLIC_AD_MODE=real` (when ad provider ready)
- [ ] Test Stripe checkout with test cards
- [ ] Verify webhook endpoint (if using)

### After Deploying
- [ ] Test all languages on production
- [ ] Test payment flow on production
- [ ] Verify redirects work correctly
- [ ] Check analytics (if added)
- [ ] Monitor error logs
- [ ] Test mobile on real devices

## Known Issues / Notes

- Mock ad is simulated (15-20 second countdown)
- Mock payment bypasses Stripe (for local testing)
- Old routes (`/test`, `/result`) redirect via middleware
- Language preference stored in cookie

## Recommended Next Steps

1. **A/B Testing**:
   - Test ad duration (15s vs 20s)
   - Test pricing ($79 vs $99)
   - Test CTA copy variations

2. **Ad Provider Integration**:
   - Replace mock ad with real provider
   - Implement rewarded video ads
   - Track completion rates

3. **Analytics**:
   - Add Google Analytics or Plausible
   - Track conversion rates
   - Monitor language distribution

4. **SEO**:
   - Add meta tags per locale
   - Implement sitemap.xml
   - Add structured data
