 "use client";

import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";
import { useLanguage } from "@/components/language-provider";
import { formatBookingCurrency, getBookingOption } from "@/lib/booking-options";
import { formatTimeSlot } from "@/lib/booking-schedule";

const copy = {
  en: {
    successTitle: "Payment Received",
    successDescription:
      "Your payment was captured and your booking details are shown below.",
    pendingTitle: "Payment Processing",
    pendingDescription:
      "Stripe accepted your checkout, but final confirmation is still syncing. Please refresh in a moment.",
    cancelTitle: "Checkout Not Completed",
    cancelDescription:
      "Your booking has not been confirmed yet. You can return to the booking form and try again.",
    conflictTitle: "Payment Received, Manual Follow-Up Needed",
    conflictDescription:
      "We received your payment, but this time slot now needs manual review. Priya Thai Massage will contact you directly.",
    bookingReference: "Booking Reference",
    ritual: "Ritual",
    date: "Date",
    time: "Time",
    amount: "Amount",
    status: "Status",
    returnToBook: "Back to Booking",
  },
  sl: {
    successTitle: "Placilo Prejeto",
    successDescription:
      "Vase placilo je bilo uspesno obdelano, podrobnosti rezervacije pa so spodaj.",
    pendingTitle: "Placilo se Obdeluje",
    pendingDescription:
      "Stripe je sprejel vas checkout, vendar se koncna potrditev se usklajuje. Prosimo osvezite cez trenutek.",
    cancelTitle: "Checkout ni Bil Zakljucen",
    cancelDescription:
      "Vasa rezervacija se ni potrjena. Lahko se vrnete na obrazec in poskusite znova.",
    conflictTitle: "Placilo Prejeto, Potrebna je Rocna Obravnava",
    conflictDescription:
      "Placilo smo prejeli, vendar ta termin zdaj potrebuje rocni pregled. Priya Thai Massage vas bo kontaktiral neposredno.",
    bookingReference: "Referenca Rezervacije",
    ritual: "Ritual",
    date: "Datum",
    time: "Cas",
    amount: "Znesek",
    status: "Status",
    returnToBook: "Nazaj na Rezervacijo",
  },
};

export default function BookingStatusPageContent({
  booking,
  variant = "success",
}) {
  const { language } = useLanguage();
  const t = copy[language] || copy.en;
  const bookingOption = booking ? getBookingOption(booking.ritualKey, language) : null;
  const bookingRitualLabel = bookingOption?.shortLabel || booking?.ritualLabel;
  const bookingDisplayPrice =
    bookingOption?.displayPrice ||
    formatBookingCurrency(booking?.amountMinor || 0, booking?.currency || "EUR", language);
  const bookingDisplayTime = booking ? formatTimeSlot(booking.preferredTime, language) : "";

  const title =
    variant === "pending"
      ? t.pendingTitle
      : variant === "cancel"
        ? t.cancelTitle
        : variant === "conflict"
          ? t.conflictTitle
          : t.successTitle;
  const description =
    variant === "pending"
      ? t.pendingDescription
      : variant === "cancel"
        ? t.cancelDescription
        : variant === "conflict"
          ? t.conflictDescription
          : t.successDescription;

  return (
    <main className="flex min-h-screen flex-col bg-surface text-on-surface">
      <SiteHeader current="book" />
      <section className="mx-auto flex w-full max-w-4xl flex-1 px-5 py-16 md:px-10 lg:px-20">
        <div className="w-full rounded-[2rem] border border-primary-container/30 bg-surface-container-lowest p-8 shadow-sm md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
            Priya Thai Massage
          </p>
          <h1 className="mt-4 font-display text-4xl text-primary md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-on-surface-variant">
            {description}
          </p>

          {booking ? (
            <div className="mt-10 grid gap-4 rounded-2xl border border-primary-container/20 bg-surface-container-low p-6 text-sm md:grid-cols-2">
              <div className="md:col-span-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-outline">
                  {t.bookingReference}
                </p>
                <p className="mt-2 break-all rounded-xl bg-surface px-4 py-3 font-mono text-sm text-on-surface md:text-base">
                  {booking.id}
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-outline">
                  {t.status}
                </p>
                <p className="mt-2 text-base text-on-surface">{booking.bookingStatus}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-outline">
                  {t.ritual}
                </p>
                <p className="mt-2 text-base text-on-surface">{bookingRitualLabel}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-outline">
                  {t.amount}
                </p>
                <p className="mt-2 text-base text-on-surface">{bookingDisplayPrice}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-outline">
                  {t.date}
                </p>
                <p className="mt-2 text-base text-on-surface">{booking.preferredDate}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-outline">
                  {t.time}
                </p>
                <p className="mt-2 text-base text-on-surface">{bookingDisplayTime}</p>
              </div>
            </div>
          ) : null}

          <div className="mt-10">
            <Link
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-surface px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition hover:border-primary hover:bg-surface-container-low"
              href={booking?.ritualKey ? `/book?ritual=${booking.ritualKey}` : "/book"}
            >
              {t.returnToBook}
              <span className="material-symbols-outlined text-base">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
