# Email Setup

The booking form sends WhatsApp first, then sends a confirmation email through SMTP.

## Gmail SMTP

1. Open your Google Account.
2. Turn on 2-Step Verification.
3. Go to App Passwords.
4. Create an app password for Mail.
5. Add these values to `.env.local`.

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=yourgmail@gmail.com
SMTP_PASS=your_16_character_google_app_password
SMTP_FROM=Priya Thai Massage <yourgmail@gmail.com>
```

Restart the Next.js dev server after changing `.env.local`.

## Notes

- `SMTP_PASS` is not your normal Gmail password. It must be a Google App Password.
- `.env.local` is ignored by git, so do not commit real credentials.
- If email is not configured, booking still opens WhatsApp with the prepared booking message.
