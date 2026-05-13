"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { bookingOptions, normalizeBookingKey } from "@/lib/booking-options";
import { availableTimeSlots, formatTimeSlot } from "@/lib/booking-schedule";
import { useLanguage } from "@/components/language-provider";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

const copy = {
  en: {
    title: "Reserve and Pay",
    intro:
      "Choose your ritual, preferred time, and complete secure payment to confirm your booking instantly.",
    fullName: "Full Name",
    phone: "Phone Number",
    customerEmail: "Email",
    namePlaceholder: "E.g., Ananya Silva",
    phonePlaceholder: "+386 40 123 456",
    emailPlaceholder: "you@example.com",
    ritual: "Select Ritual",
    ritualPlaceholder: "Choose a massage or treatment...",
    date: "Preferred Date",
    time: "Preferred Time",
    timePlaceholder: "Select time...",
    request: "Reserve and Pay",
    payment: "Full payment is collected securely through Stripe before the booking is confirmed.",
    walletSupport:
      "Apple Pay and Google Pay are available automatically on supported devices and browsers.",
    summaryTitle: "Booking Summary",
    noSummary: "Choose a ritual to see the duration and price.",
    summaryRitual: "Ritual",
    summaryDuration: "Duration",
    summaryPrice: "Total Due",
    summaryBadge: "Highlight",
    emailSending: "Preparing secure checkout...",
    redirecting: "Redirecting you to Stripe Checkout...",
    paymentError:
      "We could not start payment right now. Please review your details and try again.",
    supportTitle: "Need help instead?",
    supportCopy: "If payment fails, you can still reach the sanctuary directly on WhatsApp.",
    supportLink: "Contact on WhatsApp",
    sanctuary: "The Sanctuary",
    hours: "Operating Hours",
    weekday: "Monday - Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    closed: "Closed",
    email: "Email Us",
  },
  sl: {
    title: "Rezerviraj in Placaj",
    intro:
      "Izberite svoj ritual, zeleni termin in varno dokoncajte placilo za takojsnjo potrditev rezervacije.",
    fullName: "Ime in Priimek",
    phone: "Telefonska Stevilka",
    customerEmail: "Email",
    namePlaceholder: "Npr. Ananya Silva",
    phonePlaceholder: "+386 40 123 456",
    emailPlaceholder: "vi@example.com",
    ritual: "Izberite Ritual",
    ritualPlaceholder: "Izberite masazo ali tretma...",
    date: "Zeleni Datum",
    time: "Zeleni Cas",
    timePlaceholder: "Izberite cas...",
    request: "Rezerviraj in Placaj",
    payment: "Celotno placilo se varno obdela prek Stripe pred potrditvijo rezervacije.",
    walletSupport:
      "Apple Pay in Google Pay sta samodejno na voljo na podprtih napravah in brskalnikih.",
    summaryTitle: "Povzetek Rezervacije",
    noSummary: "Izberite ritual za prikaz trajanja in cene.",
    summaryRitual: "Ritual",
    summaryDuration: "Trajanje",
    summaryPrice: "Skupaj za Placilo",
    summaryBadge: "Poudarek",
    emailSending: "Pripravljamo varno placilo...",
    redirecting: "Preusmerjamo vas na Stripe Checkout...",
    paymentError:
      "Placila trenutno ni mogoce zagnati. Prosimo preverite podatke in poskusite znova.",
    supportTitle: "Potrebujete pomoc?",
    supportCopy: "Ce placilo ne uspe, se lahko se vedno obrnete na salon prek WhatsAppa.",
    supportLink: "Kontaktiraj na WhatsApp",
    sanctuary: "Svetisce",
    hours: "Delovni Cas",
    weekday: "Ponedeljek - Petek",
    saturday: "Sobota",
    sunday: "Nedelja",
    closed: "Zaprto",
    email: "Pisite Nam",
  },
};

const supportWhatsappUrl = "https://wa.me/66949479336";

const fieldLabelClass =
  "block text-[11px] font-semibold uppercase tracking-[0.18em] text-outline";
const fieldShellClass =
  "relative flex h-12 items-center rounded-xl border border-outline-variant/70 bg-surface-container-lowest shadow-sm transition focus-within:border-primary focus-within:bg-surface focus-within:shadow-[0_10px_26px_rgba(85,67,0,0.1)]";
const fieldIconClass =
  "material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xl text-primary/70";
const fieldControlClass =
  "h-full w-full rounded-xl bg-transparent pl-11 pr-4 text-sm text-on-surface outline-none transition placeholder:text-outline disabled:opacity-60";
const selectControlClass =
  "h-full w-full appearance-none rounded-xl bg-transparent pl-11 pr-10 text-sm font-medium text-on-surface outline-none transition disabled:opacity-60";

export default function BookPageContent({ initialRitual = "" }) {
  const { language } = useLanguage();
  const t = useMemo(() => copy[language], [language]);
  const rituals = useMemo(
    () => bookingOptions[language] || bookingOptions.en,
    [language],
  );
  const normalizedInitialRitual = normalizeBookingKey(initialRitual);
  const initialSelection = rituals.some(
    (ritual) => ritual.key === normalizedInitialRitual,
  )
    ? normalizedInitialRitual
    : "";
  const [selectedRitual, setSelectedRitual] = useState(initialSelection);
  const [selectedTime, setSelectedTime] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const selectedOption =
    rituals.find((ritual) => ritual.key === selectedRitual) || null;

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);
    const payload = {
      language,
      name: formData.get("name") || "",
      phone: formData.get("phone") || "",
      email: formData.get("email") || "",
      ritual: formData.get("ritual") || "",
      date: formData.get("date") || "",
      time: formData.get("time") || "",
    };

    setIsSubmitting(true);
    setErrorMessage("");
    setStatusMessage(t.emailSending);

    try {
      const response = await fetch("/api/bookings/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (!response.ok || !result.checkoutUrl) {
        throw new Error(result.error || t.paymentError);
      }

      setStatusMessage(t.redirecting);
      window.location.assign(result.checkoutUrl);
    } catch (error) {
      setStatusMessage("");
      setErrorMessage(error.message || t.paymentError);
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col bg-surface text-on-surface">
      <SiteHeader current="book" />

      <section className="mx-auto w-full max-w-7xl flex-1 px-5 py-12 md:px-10 md:py-20 lg:px-20">
        <div className="mb-12 text-center">
          <h1 className="font-display text-5xl text-primary md:text-6xl">
            {t.title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-on-surface-variant">
            {t.intro}
          </p>
        </div>

        <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-16">
          <div className="bg-kranok pointer-events-none absolute inset-0 z-0 hidden rounded-[1.5rem] opacity-50 lg:block" />

          <div className="relative z-10 lg:col-span-7">
            <div className="flex h-full flex-col justify-center rounded-xl border border-primary-container/30 bg-surface-container-lowest p-8 shadow-sm md:p-12">
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <label
                      className={fieldLabelClass}
                      htmlFor="name"
                    >
                      {t.fullName}
                    </label>
                    <div className={fieldShellClass}>
                      <span className={fieldIconClass}>
                        person
                      </span>
                      <input
                        className={fieldControlClass}
                        disabled={isSubmitting}
                        id="name"
                        name="name"
                        placeholder={t.namePlaceholder}
                        required
                        type="text"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      className={fieldLabelClass}
                      htmlFor="phone"
                    >
                      {t.phone}
                    </label>
                    <div className={fieldShellClass}>
                      <span className={fieldIconClass}>
                        call
                      </span>
                      <input
                        className={fieldControlClass}
                        disabled={isSubmitting}
                        id="phone"
                        name="phone"
                        placeholder={t.phonePlaceholder}
                        required
                        type="tel"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      className={fieldLabelClass}
                      htmlFor="email"
                    >
                      {t.customerEmail}
                    </label>
                    <div className={fieldShellClass}>
                      <span className={fieldIconClass}>
                        mail
                      </span>
                      <input
                        className={fieldControlClass}
                        disabled={isSubmitting}
                        id="email"
                        name="email"
                        placeholder={t.emailPlaceholder}
                        required
                        type="email"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    className={fieldLabelClass}
                    htmlFor="ritual"
                  >
                    {t.ritual}
                  </label>
                  <div className={fieldShellClass}>
                    <span className={fieldIconClass}>
                      spa
                    </span>
                    <select
                      className={selectControlClass}
                      disabled={isSubmitting}
                      id="ritual"
                      name="ritual"
                      onChange={(event) =>
                        setSelectedRitual(event.target.value)
                      }
                      required
                      value={selectedRitual}
                    >
                      <option disabled value="">
                        {t.ritualPlaceholder}
                      </option>
                      {rituals.map((ritual) => (
                        <option key={ritual.key} value={ritual.key}>
                          {ritual.label}
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xl text-outline">
                      expand_more
                    </span>
                  </div>
                  {selectedOption ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full border border-primary-container/30 bg-primary-container/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                        {selectedOption.duration}
                      </span>
                      <span className="rounded-full border border-secondary-container/40 bg-secondary-container/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-secondary">
                        {selectedOption.displayPrice}
                      </span>
                      {selectedOption.badge ? (
                        <span className="rounded-full border border-outline-variant/50 bg-surface px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-outline">
                          {selectedOption.badge}
                        </span>
                      ) : null}
                    </div>
                  ) : null}
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      className={fieldLabelClass}
                      htmlFor="date"
                    >
                      {t.date}
                    </label>
                    <div className={fieldShellClass}>
                      <span className={fieldIconClass}>
                        calendar_today
                      </span>
                      <input
                        className={fieldControlClass}
                        disabled={isSubmitting}
                        id="date"
                        min={new Date().toISOString().slice(0, 10)}
                        name="date"
                        required
                        type="date"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      className={fieldLabelClass}
                      htmlFor="time"
                    >
                      {t.time}
                    </label>
                    <div className={fieldShellClass}>
                      <span className={fieldIconClass}>
                        schedule
                      </span>
                      <select
                        className={selectControlClass}
                        disabled={isSubmitting}
                        id="time"
                        name="time"
                        onChange={(event) => setSelectedTime(event.target.value)}
                        required
                        value={selectedTime}
                      >
                        <option disabled value="">
                          {t.timePlaceholder}
                        </option>
                        {availableTimeSlots.map((time) => (
                          <option key={time} value={time}>
                            {formatTimeSlot(time, language)}
                          </option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xl text-outline">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-primary-container/30 bg-surface-container-low p-6">
                  <h3 className="mb-4 font-display text-2xl text-primary">
                    {t.summaryTitle}
                  </h3>
                  {selectedOption ? (
                    <div className="grid grid-cols-1 gap-4 text-base text-on-surface-variant md:grid-cols-2">
                      <p>
                        <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-outline">
                          {t.summaryRitual}
                        </span>
                        <span className="text-on-surface">
                          {selectedOption.shortLabel}
                        </span>
                      </p>
                      <p>
                        <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-outline">
                          {t.summaryDuration}
                        </span>
                        <span className="text-on-surface">
                          {selectedOption.duration}
                        </span>
                      </p>
                      <p>
                        <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-outline">
                          {t.summaryPrice}
                        </span>
                        <span className="font-display text-3xl text-secondary">
                          {selectedOption.displayPrice}
                        </span>
                      </p>
                      {selectedOption.badge ? (
                        <p>
                          <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-outline">
                            {t.summaryBadge}
                          </span>
                          <span className="text-on-surface">
                            {selectedOption.badge}
                          </span>
                        </p>
                      ) : null}
                    </div>
                  ) : (
                    <p className="text-base text-on-surface-variant">
                      {t.noSummary}
                    </p>
                  )}
                </div>

                <div className="pt-6">
                  <button
                    className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[linear-gradient(to_right,#d4af37,#fbbc00)] py-4 font-display text-2xl text-on-primary-container shadow-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,191,0,0.3)] disabled:cursor-not-allowed disabled:opacity-70"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {t.request}
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </button>
                  <p className="mt-4 text-center text-sm text-outline">
                    {t.payment}
                  </p>
                  <p className="mt-2 text-center text-sm text-secondary">
                    {t.walletSupport}
                  </p>
                  {statusMessage ? (
                    <p className="mt-3 text-center text-sm text-primary">
                      {statusMessage}
                    </p>
                  ) : null}
                  {errorMessage ? (
                    <p className="mt-3 text-center text-sm text-red-700">
                      {errorMessage}
                    </p>
                  ) : null}
                </div>
              </form>
            </div>
          </div>

          <aside className="relative z-10 flex flex-col gap-6 lg:col-span-5">
            <div className="flex flex-grow flex-col overflow-hidden rounded-xl border border-primary-container/20 bg-surface-container-low shadow-sm">
              <div className="relative h-48 w-full overflow-hidden border-b border-primary-container/20 bg-surface-container-highest">
                <Image
                  alt="Atmospheric Thai spa interior"
                  className="object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                  fill
                  sizes="(min-width: 1024px) 32vw, 100vw"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5FBejFKZo3UJGXXfbColZeNdrtlMKqI54F5_m-H5zad_mKMl5s-frW0Rc9sIgmmyH2-Lpac2QtxnfXXo4mt4xc6hZEqoJkxJyWYVcY2tnbDaNu0Sqfdfr0mNoi6KL0cgPvNNkgRDTmq67wcuhY_Xa7HjURg_cShBWg3QT9g8fXCQ0HVfRLZ0oHpO_Jgn_uPMHk694Da1_01eXCsEAQ2VozBmSq-HWHez86UrGZ0kql5W1mc9EgxI2EouK14os3qUkGsJsWXyS-vZ0"
                />
              </div>
              <div className="flex flex-col gap-8 p-8 md:p-10">
                <div>
                  <h2 className="mb-4 border-b border-outline-variant/30 pb-4 font-display text-4xl text-primary">
                    {t.sanctuary}
                  </h2>
                  <p className="flex items-start gap-3 text-base leading-7 text-on-surface-variant">
                    <span className="material-symbols-outlined mt-1 shrink-0 text-secondary">
                      location_on
                    </span>
                    <span>
                      Kolodvorska cesta 1
                      <br />
                      1230 Domzale
                      <br />
                      Slovenia
                    </span>
                  </p>
                </div>
                <div>
                  <h3 className="mb-3 flex items-center gap-2 font-display text-2xl text-secondary">
                    <span className="material-symbols-outlined">
                      nest_clock_farsight_digital
                    </span>
                    {t.hours}
                  </h3>
                  <ul className="space-y-2 text-base text-on-surface-variant">
                    <li className="flex justify-between border-b border-outline-variant/10 pb-1">
                      <span>{t.weekday}</span>
                      <span className="font-medium text-on-surface">
                        9:00 AM - 8:00 PM
                      </span>
                    </li>
                    <li className="flex justify-between border-b border-outline-variant/10 pb-1">
                      <span>{t.saturday}</span>
                      <span className="font-medium text-on-surface">
                        10:00 AM - 6:00 PM
                      </span>
                    </li>
                    <li className="flex justify-between pb-1">
                      <span>{t.sunday}</span>
                      <span className="italic text-outline">{t.closed}</span>
                    </li>
                  </ul>
                </div>
                <div className="rounded-lg border border-primary-container/30 bg-surface p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-outline">
                    {t.supportTitle}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-on-surface-variant">
                    {t.supportCopy}
                  </p>
                  <a
                    className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-surface-container-low px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition hover:border-primary hover:bg-surface-container"
                    href={supportWhatsappUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {t.supportLink}
                    <span className="material-symbols-outlined text-base">
                      open_in_new
                    </span>
                  </a>
                </div>
                <div className="mt-auto flex flex-col gap-4 border-t border-primary-container/20 pt-6">
                  <div className="flex items-center gap-4 text-on-surface-variant">
                    <span className="material-symbols-outlined text-3xl font-light text-primary">
                      mail
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-outline">
                        {t.email}
                      </p>
                      <p className="text-base">sanctuary@priyathai.si</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
