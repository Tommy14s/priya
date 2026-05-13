# Priya Thai Massage

Next.js site for Priya Thai Massage with multilingual pages, ritual detail pages, Stripe-powered booking checkout, Apple Pay / Google Pay compatible Stripe Checkout, and booking confirmation email through Gmail SMTP.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Create `.env.local` from `.env.example`.

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=yourgmail@gmail.com
SMTP_PASS=your_16_character_google_app_password
SMTP_FROM=Priya Thai Massage <yourgmail@gmail.com>
```

`SMTP_PASS` must be a Google App Password, not the normal Gmail password.

## Booking Storage

Bookings are stored in `src/data/bookings.json` for this implementation so payment and booking state can persist locally. For a production deployment, move this store to a real database before scaling beyond a single instance.

## Stripe Webhook

Run the Stripe CLI locally and forward events to the app:

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## Apple Pay and Google Pay

The booking flow uses Stripe Checkout. According to Stripe Checkout's hosted flow, Apple Pay and Google Pay are surfaced automatically when the customer's browser, device, and Stripe account configuration support them. No extra frontend wallet form is required in this project.

## Owner Notifications and Reporting

When Stripe confirms a paid booking, the app can notify the owner through WhatsApp Business Cloud API if these environment variables are configured:

```env
WHATSAPP_ACCESS_TOKEN=your_meta_whatsapp_access_token
WHATSAPP_PHONE_NUMBER_ID=your_meta_phone_number_id
WHATSAPP_OWNER_PHONE=66801234567
```

Owner reporting is available at `/owner/dashboard`, showing paid orders, pending orders, revenue totals, and upcoming bookings grouped by date.

## Checks

```bash
npm run lint
npm run build
```

## Deploy To Vercel

1. Push the project to GitHub.
2. Import the repo in Vercel.
3. Set the SMTP environment variables in Vercel Project Settings.
4. Deploy with the default Next.js preset.

See `DEPLOYMENT_RECHECK.md` for the full pre-deploy checklist.
