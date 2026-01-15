# Quick Start Guide

## 🚀 Get Started in 3 Steps

### Step 1: Install Dependencies
```bash
cd iq-test-app
npm install
```

### Step 2: Configure Environment
Create `.env.local` file:
```env
NEXT_PUBLIC_PAYMENT_MODE=mock
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Note**: For testing without a payment provider, you can skip Paddle configuration. The app will use mock payments.

### Step 3: Run Development Server
```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## 🧪 Test the Flow

1. **Landing Page** → Click "Teste Başla"
2. **IQ Test** → Answer 25 questions (7-minute timer)
3. **Result Lock** → Choose payment option (49 TL or 79 TL)
4. **Payment** → Complete payment (or use mock in dev mode)
5. **Results** → View IQ score and download PDF (if premium)

## 📝 Key Files

- `app/page.tsx` - Landing page
- `app/test/page.tsx` - IQ test interface
- `app/result-lock/page.tsx` - Payment wall
- `app/result/page.tsx` - Results display
- `lib/questions.ts` - Question data & scoring
- `lib/pdf-generator.ts` - PDF report generation

## 🔧 Customization

### Change Pricing
Edit `app/api/payment/route.ts`:
```typescript
const amount = packageType === 'basic' ? 4900 : 7900; // Amount in kuruş
```

### Modify Questions
Edit `lib/questions.ts` - Add/remove questions in the `questions` array.

### Update Colors
Edit `tailwind.config.ts` or use Tailwind classes directly.

## 🐛 Troubleshooting

**Issue**: Payment errors
- **Solution**: Use mock mode for development or configure Paddle in sandbox mode

**Issue**: PDF not generating
- **Solution**: Ensure jsPDF is installed: `npm install jspdf`

**Issue**: Timer not working
- **Solution**: Check browser console for errors, ensure React hooks are working

## 📦 Production Build

```bash
npm run build
npm start
```

## 🌐 Deploy

See `DEPLOYMENT.md` for detailed deployment instructions.

**Recommended**: Vercel (easiest Next.js deployment)

---

**Ready to go!** 🎉
