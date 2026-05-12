import nodemailer from "nodemailer";

export const runtime = "nodejs";

const requiredFields = ["name", "phone", "email", "ritual", "duration", "price", "date", "time"];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildEmailHtml(booking) {
  const safeBooking = Object.fromEntries(
    Object.entries(booking).map(([key, value]) => [key, escapeHtml(value)]),
  );

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#1b1c1b">
      <h1 style="color:#735c00">Priya Thai Massage Booking Request</h1>
      <p>Thank you for your booking request. We received these details and will confirm your appointment shortly.</p>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse">
        <tr><td><strong>Name</strong></td><td>${safeBooking.name}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${safeBooking.phone}</td></tr>
        <tr><td><strong>Email</strong></td><td>${safeBooking.email}</td></tr>
        <tr><td><strong>Ritual</strong></td><td>${safeBooking.ritual}</td></tr>
        <tr><td><strong>Duration</strong></td><td>${safeBooking.duration}</td></tr>
        <tr><td><strong>Price</strong></td><td>${safeBooking.price}</td></tr>
        <tr><td><strong>Date</strong></td><td>${safeBooking.date}</td></tr>
        <tr><td><strong>Time</strong></td><td>${safeBooking.time}</td></tr>
      </table>
      <p style="margin-top:24px">Payment is processed in-person at the sanctuary.</p>
      <p>Priya Thai Massage<br/>Kolodvorska cesta 1, 1230 Domzale</p>
    </div>
  `;
}

export async function POST(request) {
  const booking = await request.json();
  const missingField = requiredFields.find((field) => !booking[field]);

  if (missingField) {
    return Response.json(
      { emailSent: false, error: `Missing required field: ${missingField}` },
      { status: 400 },
    );
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom) {
    return Response.json({
      emailSent: false,
      skipped: true,
      reason: "SMTP provider is not configured.",
    });
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  try {
    await transporter.sendMail({
      from: smtpFrom,
      to: booking.email,
      replyTo: smtpFrom,
      subject: "Priya Thai Massage booking request",
      html: buildEmailHtml(booking),
    });
  } catch {
    return Response.json(
      { emailSent: false, error: "SMTP provider rejected the request." },
      { status: 502 },
    );
  }

  return Response.json({ emailSent: true });
}
