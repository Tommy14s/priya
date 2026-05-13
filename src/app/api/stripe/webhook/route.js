import { sendBookingConfirmationEmail } from "@/lib/booking-email";
import { getDisplayBooking } from "@/lib/booking-presenters";
import {
  markOwnerNotificationFailed,
  markOwnerNotificationSent,
  markBookingConfirmationEmailSent,
  markBookingExpiredBySessionId,
  markBookingPaymentFailedBySessionId,
  reconcilePaidBooking,
} from "@/lib/booking-store";
import { sendOwnerWhatsAppNotification } from "@/lib/owner-whatsapp";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

async function maybeSendConfirmationEmail(booking, shouldSendEmail) {
  if (!booking || !shouldSendEmail) {
    return;
  }

  try {
    await sendBookingConfirmationEmail(getDisplayBooking(booking));
    await markBookingConfirmationEmailSent(booking.id);
  } catch {
    // Keep the booking confirmed even if SMTP is temporarily unavailable.
  }
}

async function maybeSendOwnerNotification(booking, shouldSendNotification) {
  if (!booking || !shouldSendNotification || booking.ownerNotificationSentAt) {
    return;
  }

  try {
    const result = await sendOwnerWhatsAppNotification(getDisplayBooking(booking));

    if (result.sent) {
      await markOwnerNotificationSent(booking.id);
    }
  } catch (error) {
    await markOwnerNotificationFailed(booking.id, error.message);
  }
}

export async function POST(request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return Response.json({ error: "Missing STRIPE_WEBHOOK_SECRET." }, { status: 500 });
  }

  let stripe;

  try {
    stripe = getStripe();
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return Response.json({ error: "Missing stripe-signature header." }, { status: 400 });
  }

  const payload = await request.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch {
    return Response.json({ error: "Invalid Stripe webhook signature." }, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const result = await reconcilePaidBooking({
        eventId: event.id,
        checkoutSessionId: session.id,
        paymentIntentId:
          typeof session.payment_intent === "string" ? session.payment_intent : "",
        paidAt: new Date().toISOString(),
      });
      await maybeSendConfirmationEmail(result.booking, result.shouldSendEmail);
      await maybeSendOwnerNotification(result.booking, result.booking?.bookingStatus === "confirmed");
      break;
    }
    case "checkout.session.expired": {
      const session = event.data.object;
      await markBookingExpiredBySessionId(session.id);
      break;
    }
    case "payment_intent.payment_failed": {
      const paymentIntent = event.data.object;
      const sessionId =
        typeof paymentIntent.metadata?.checkout_session_id === "string"
          ? paymentIntent.metadata.checkout_session_id
          : "";
      if (sessionId) {
        await markBookingPaymentFailedBySessionId(sessionId);
      }
      break;
    }
    default:
      break;
  }

  return Response.json({ received: true });
}
