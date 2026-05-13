import { connection } from "next/server";
import {
  createPendingBooking,
  hasConfirmedBookingAtSlot,
  updateBookingCheckoutSession,
} from "@/lib/booking-store";
import { validateBookingPayload } from "@/lib/booking-validation";
import { getAppUrl, getStripe } from "@/lib/stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function getSafeErrorMessage(error, fallback) {
  if (!(error instanceof Error) || !error.message) {
    return fallback;
  }

  return error.message.replaceAll(process.env.STRIPE_SECRET_KEY || "", "[redacted]");
}

export async function POST(request) {
  try {
    await connection();

    let payload;

    try {
      payload = await request.json();
    } catch {
      return Response.json({ error: "Invalid request body." }, { status: 400 });
    }

    const validation = validateBookingPayload(payload);

    if (!validation.ok) {
      return Response.json({ error: validation.error }, { status: 400 });
    }

    const { value } = validation;
    const slotTaken = await hasConfirmedBookingAtSlot(value.date, value.time);

    if (slotTaken) {
      return Response.json(
        {
          error: "That appointment time has already been booked. Please choose another slot.",
        },
        { status: 409 },
      );
    }

    let stripe;

    try {
      stripe = getStripe();
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    const { booking, reused } = await createPendingBooking({
      name: value.name,
      phone: value.phone,
      email: value.email,
      ritualKey: value.ritual.key,
      ritualLabel: value.ritual.shortLabel,
      durationMinutes: value.ritual.durationMinutes,
      amountMinor: value.ritual.amountMinor,
      currency: value.ritual.currency,
      preferredDate: value.date,
      preferredTime: value.time,
      language: value.language,
    });

    if (reused && booking.checkoutUrl) {
      return Response.json({
        bookingId: booking.id,
        checkoutUrl: booking.checkoutUrl,
      });
    }

    const appUrl = getAppUrl();

    try {
      const session = await stripe.checkout.sessions.create(
        {
          mode: "payment",
          success_url: `${appUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${appUrl}/booking/cancel?booking_id=${booking.id}`,
          customer_email: booking.email,
          payment_method_types: ["card"],
          metadata: {
            bookingId: booking.id,
            ritualKey: booking.ritualKey,
            preferredDate: booking.preferredDate,
            preferredTime: booking.preferredTime,
          },
          payment_intent_data: {
            metadata: {
              booking_id: booking.id,
              checkout_session_id: booking.stripeCheckoutSessionId || booking.id,
            },
          },
          line_items: [
            {
              quantity: 1,
              price_data: {
                currency: booking.currency.toLowerCase(),
                unit_amount: booking.amountMinor,
                product_data: {
                  name: booking.ritualLabel,
                  description: `${booking.durationMinutes} minutes on ${booking.preferredDate} at ${booking.preferredTime}`,
                },
              },
            },
          ],
        },
        {
          idempotencyKey: `checkout_${booking.id}`,
        },
      );

      await updateBookingCheckoutSession(booking.id, {
        sessionId: session.id,
        paymentIntentId:
          typeof session.payment_intent === "string" ? session.payment_intent : "",
        checkoutUrl: session.url || "",
      });

      if (typeof session.payment_intent === "string") {
        await stripe.paymentIntents.update(session.payment_intent, {
          metadata: {
            booking_id: booking.id,
            checkout_session_id: session.id,
          },
        });
      }

      return Response.json({
        bookingId: booking.id,
        checkoutUrl: session.url,
      });
    } catch (error) {
      console.error("Stripe checkout failed", error);

      return Response.json(
        {
          error: getSafeErrorMessage(
            error,
            "Unable to start Stripe checkout right now. Please try again.",
          ),
        },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Create checkout failed", error);

    return Response.json(
      {
        error: getSafeErrorMessage(
          error,
          "Unable to start Stripe checkout right now. Please try again.",
        ),
      },
      { status: 500 },
    );
  }
}
