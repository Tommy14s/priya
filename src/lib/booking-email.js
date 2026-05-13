import "server-only";

import nodemailer from "nodemailer";
import { getDisplayBooking } from "@/lib/booking-presenters";

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
      <h1 style="color:#735c00">Priya Thai Massage Booking Confirmed</h1>
      <p>Thank you for your payment. Your booking is now confirmed.</p>
      <table cellpadding="8" cellspacing="0" style="border-collapse:collapse">
        <tr><td><strong>Booking reference</strong></td><td>${safeBooking.id}</td></tr>
        <tr><td><strong>Name</strong></td><td>${safeBooking.customerName}</td></tr>
        <tr><td><strong>Phone</strong></td><td>${safeBooking.phone}</td></tr>
        <tr><td><strong>Email</strong></td><td>${safeBooking.email}</td></tr>
        <tr><td><strong>Ritual</strong></td><td>${safeBooking.ritualLabel}</td></tr>
        <tr><td><strong>Duration</strong></td><td>${safeBooking.durationMinutes} minutes</td></tr>
        <tr><td><strong>Amount paid</strong></td><td>${safeBooking.displayPrice}</td></tr>
        <tr><td><strong>Date</strong></td><td>${safeBooking.preferredDate}</td></tr>
        <tr><td><strong>Time</strong></td><td>${safeBooking.displayTime}</td></tr>
        <tr><td><strong>Status</strong></td><td>Confirmed</td></tr>
      </table>
      <p style="margin-top:24px">If you need to make a change, reply to this email or contact Priya Thai Massage directly.</p>
      <p>Priya Thai Massage<br/>Kolodvorska cesta 1, 1230 Domzale</p>
    </div>
  `;
}

function getTransporterConfig() {
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpFrom = process.env.SMTP_FROM || smtpUser;

  if (!smtpHost || !smtpUser || !smtpPass || !smtpFrom) {
    return null;
  }

  return {
    smtpFrom,
    transporter: nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    }),
  };
}

export async function sendBookingConfirmationEmail(booking) {
  const config = getTransporterConfig();

  if (!config) {
    return { emailSent: false, skipped: true };
  }

  await config.transporter.sendMail({
    from: config.smtpFrom,
    to: booking.email,
    replyTo: config.smtpFrom,
    subject: "Priya Thai Massage booking confirmed",
    html: buildEmailHtml(getDisplayBooking(booking)),
  });

  return { emailSent: true };
}
