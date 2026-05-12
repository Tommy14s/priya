# Priya Thai Massage

Next.js site for Priya Thai Massage with multilingual pages, ritual detail pages, booking via WhatsApp, and booking confirmation email through Gmail SMTP.

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Create `.env.local` from `.env.example`.

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=yourgmail@gmail.com
SMTP_PASS=your_16_character_google_app_password
SMTP_FROM=Priya Thai Massage <yourgmail@gmail.com>
```

`SMTP_PASS` must be a Google App Password, not the normal Gmail password.

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
