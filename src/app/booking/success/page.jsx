import BookingStatusPageContent from "@/components/booking-status-page-content";
import { sendBookingConfirmationEmail } from "@/lib/booking-email";
import { getDisplayBooking } from "@/lib/booking-presenters";
import {
  getBookingByCheckoutSessionId,
  markBookingConfirmationEmailSent,
  markOwnerNotificationFailed,
  markOwnerNotificationSent,
  reconcilePaidBooking,
} from "@/lib/booking-store";
import { sendOwnerWhatsAppNotification } from "@/lib/owner-whatsapp";
import { getStripe } from "@/lib/stripe";

export const metadata = {
  title: "Booking Confirmed - Priya Thai Massage",
  description: "Review the status of your Priya Thai Massage payment and booking.",
};

async function maybeSendEmail(booking, shouldSendEmail) {
  if (!booking || !shouldSendEmail) {
    return;
  }

  try {
    await sendBookingConfirmationEmail(getDisplayBooking(booking));
    await markBookingConfirmationEmailSent(booking.id);
  } catch {
    // Let the page render even if SMTP is unavailable.
  }
}

async function maybeSendOwnerNotification(booking) {
  if (!booking || booking.bookingStatus !== "confirmed" || booking.ownerNotificationSentAt) {
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

export default async function BookingSuccessPage(props) {
  const searchParams = await props.searchParams;
  const sessionId =
    typeof searchParams?.session_id === "string" ? searchParams.session_id : "";

  if (!sessionId) {
    return <BookingStatusPageContent variant="pending" />;
  }

  let booking = await getBookingByCheckoutSessionId(sessionId);

  if (booking?.bookingStatus !== "confirmed") {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === "paid") {
        const result = await reconcilePaidBooking({
          eventId: `success_page_${session.id}`,
          checkoutSessionId: session.id,
          paymentIntentId:
            typeof session.payment_intent === "string" ? session.payment_intent : "",
          paidAt: new Date().toISOString(),
        });
        await maybeSendEmail(result.booking, result.shouldSendEmail);
        await maybeSendOwnerNotification(result.booking);
        booking = result.booking || booking;
      }
    } catch {
      // Fall through to pending view if Stripe cannot be reached.
    }
  }

  if (!booking) {
    return <BookingStatusPageContent variant="pending" />;
  }

  await maybeSendOwnerNotification(booking);

  if (booking.needsManualReview) {
    return (
      <BookingStatusPageContent
        booking={booking}
        variant="conflict"
      />
    );
  }

  return (
    <BookingStatusPageContent
      booking={booking}
      variant={booking.bookingStatus === "confirmed" ? "success" : "pending"}
    />
  );
}
