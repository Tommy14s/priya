# Deployment Recheck

## Ready

- Next.js production build passes with `npm run build`.
- ESLint passes with `npm run lint`.
- Booking APIs use the Node.js runtime.
- Stripe Checkout creates payment sessions through `/api/bookings/create-checkout`.
- Stripe webhooks arrive at `/api/stripe/webhook`.
- Booking confirmation email is sent only after payment is confirmed.
- Mobile navigation now opens and closes from the hamburger button.
- `.env.local` is ignored by git, while `.env.example` is safe to commit.

## Check Before Vercel

- Add these Vercel Environment Variables:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=yourgmail@gmail.com
SMTP_PASS=your_16_character_google_app_password
SMTP_FROM=Priya Thai Massage <yourgmail@gmail.com>
```

- Confirm `NEXT_PUBLIC_APP_URL`, `STRIPE_SECRET_KEY`, and `STRIPE_WEBHOOK_SECRET` are set in the deployment platform.
- Confirm the support WhatsApp phone number in `src/components/book-page-content.js`.
- Confirm the business address, email, and phone shown in footer sections.
- Confirm pricing currency consistency. Some pages use euros and some use dollars.
- Confirm all remote images from `lh3.googleusercontent.com` still load after deploy.

## Vercel Settings

- Framework Preset: Next.js.
- Build Command: `npm run build`.
- Install Command: `npm install`.
- Output Directory: leave empty.
- Node.js Version: use the Vercel default compatible with Next.js 16, or Node 20+.

## Gmail SMTP Notes

- `SMTP_PASS` is a Google App Password, not the normal Gmail password.
- Gmail account must have 2-Step Verification enabled before App Passwords are available.
- Restart the local dev server after changing `.env.local`.
