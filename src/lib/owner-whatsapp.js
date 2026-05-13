import "server-only";

import { getDisplayBooking } from "@/lib/booking-presenters";

function getWhatsAppConfig() {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const ownerPhone = process.env.WHATSAPP_OWNER_PHONE;

  if (!token || !phoneNumberId || !ownerPhone) {
    return null;
  }

  return { token, phoneNumberId, ownerPhone };
}

function buildOwnerSummaryMessage(booking) {
  const details = getDisplayBooking(booking);

  return [
    "New paid booking received",
    "",
    `Booking: ${details.id}`,
    `Customer: ${details.customerName}`,
    `Phone: ${details.phone}`,
    `Email: ${details.email}`,
    `Ritual: ${details.ritualLabel}`,
    `Duration: ${details.durationMinutes} min`,
    `Paid: ${details.displayPrice}`,
    `Date: ${details.preferredDate}`,
    `Time: ${details.displayTime}`,
    `Status: ${details.bookingStatus}`,
  ].join("\n");
}

export async function sendOwnerWhatsAppNotification(booking) {
  const config = getWhatsAppConfig();

  if (!config) {
    return { sent: false, skipped: true, reason: "WhatsApp Business API is not configured." };
  }

  const response = await fetch(
    `https://graph.facebook.com/v23.0/${config.phoneNumberId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: config.ownerPhone,
        type: "text",
        text: {
          preview_url: false,
          body: buildOwnerSummaryMessage(booking),
        },
      }),
    },
  );

  if (!response.ok) {
    const result = await response.text();
    throw new Error(`WhatsApp API request failed: ${result}`);
  }

  return { sent: true };
}
