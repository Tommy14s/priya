"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { bookingOptions, normalizeBookingKey } from "@/lib/booking-options";
import { useLanguage } from "@/components/language-provider";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

const copy = {
  en: {
    title: "Reserve Your Sanctuary",
    intro:
      "Step into a world of tranquility. Schedule your traditional Thai ritual below and prepare to unwind your body and soul.",
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
    times: [
      "9:00 AM",
      "9:30 AM",
      "10:00 AM",
      "10:30 AM",
      "11:00 AM",
      "11:30 AM",
      "12:00 PM",
      "12:30 PM",
      "1:00 PM",
      "1:30 PM",
      "2:00 PM",
      "2:30 PM",
      "3:00 PM",
      "3:30 PM",
      "4:00 PM",
      "4:30 PM",
      "5:00 PM",
      "5:30 PM",
      "6:00 PM",
      "6:30 PM",
      "7:00 PM",
    ],
    request: "Request Appointment",
    payment: "Payment is processed in-person at the sanctuary.",
    summaryTitle: "Booking Summary",
    noSummary: "Choose a ritual to see the duration and price.",
    summaryRitual: "Ritual",
    summaryDuration: "Duration",
    summaryPrice: "Estimated Price",
    summaryBadge: "Highlight",
    emailSending: "Preparing WhatsApp and confirmation email...",
    emailSent: "WhatsApp opened. Confirmation email request was sent.",
    emailSkipped:
      "WhatsApp opened. Email confirmation needs SMTP settings in the environment.",
    emailFailed:
      "WhatsApp opened. Confirmation email could not be sent, so please confirm in WhatsApp.",
    whatsappTitle: "Priya Thai Massage booking request",
    whatsappFields: {
      name: "Full name",
      phone: "Phone",
      email: "Email",
      ritual: "Ritual",
      duration: "Duration",
      price: "Price",
      date: "Preferred date",
      time: "Preferred time",
    },
    sanctuary: "The Sanctuary",
    hours: "Operating Hours",
    weekday: "Monday - Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    closed: "Closed",
    email: "Email Us",
  },
  sl: {
    title: "Rezervirajte Svoje Svetisce",
    intro:
      "Stopite v svet miru. Spodaj nacrtujte svoj tradicionalni tajski ritual in se pripravite na sprostitev telesa in duse.",
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
    times: [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
      "18:30",
      "19:00",
    ],
    request: "Poslji Povprasevanje",
    payment: "Placilo se izvede osebno v salonu.",
    summaryTitle: "Povzetek Rezervacije",
    noSummary: "Izberite ritual za prikaz trajanja in cene.",
    summaryRitual: "Ritual",
    summaryDuration: "Trajanje",
    summaryPrice: "Ocenjena Cena",
    summaryBadge: "Poudarek",
    emailSending: "Pripravljamo WhatsApp in potrditveni email...",
    emailSent:
      "WhatsApp je odprt. Zahteva za potrditveni email je bila poslana.",
    emailSkipped:
      "WhatsApp je odprt. Za email potrditev nastavite SMTP podatke v okolju.",
    emailFailed:
      "WhatsApp je odprt. Potrditvenega emaila ni bilo mogoce poslati, zato prosimo potrdite prek WhatsAppa.",
    whatsappTitle: "Povprasevanje za rezervacijo Priya Thai Massage",
    whatsappFields: {
      name: "Ime in priimek",
      phone: "Telefon",
      email: "Email",
      ritual: "Ritual",
      duration: "Trajanje",
      price: "Cena",
      date: "Zeleni datum",
      time: "Zeleni cas",
    },
    sanctuary: "Svetisce",
    hours: "Delovni Cas",
    weekday: "Ponedeljek - Petek",
    saturday: "Sobota",
    sunday: "Nedelja",
    closed: "Zaprto",
    email: "Pisite Nam",
  },
};

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
  const [statusMessage, setStatusMessage] = useState("");
  const selectedOption =
    rituals.find((ritual) => ritual.key === selectedRitual) || null;

  const handleWhatsAppRequest = async (event) => {
    const form = event.currentTarget.form;

    if (!form.reportValidity()) {
      return;
    }

    const formData = new FormData(form);
    const ritualKey = formData.get("ritual");
    const ritualOption = rituals.find((ritual) => ritual.key === ritualKey);
    const ritualLabel = ritualOption?.label || "-";
    const email = formData.get("email") || "";
    const message = [
      t.whatsappTitle,
      "",
      `${t.whatsappFields.name}: ${formData.get("name") || "-"}`,
      `${t.whatsappFields.phone}: ${formData.get("phone") || "-"}`,
      `${t.whatsappFields.email}: ${email || "-"}`,
      `${t.whatsappFields.ritual}: ${ritualLabel}`,
      `${t.whatsappFields.duration}: ${ritualOption?.duration || "-"}`,
      `${t.whatsappFields.price}: ${ritualOption?.price || "-"}`,
      `${t.whatsappFields.date}: ${formData.get("date") || "-"}`,
      `${t.whatsappFields.time}: ${formData.get("time") || "-"}`,
    ].join("\n");

    setStatusMessage(t.emailSending);

    const emailPayload = {
      language,
      name: formData.get("name") || "",
      phone: formData.get("phone") || "",
      email,
      ritual: ritualOption?.shortLabel || ritualLabel,
      duration: ritualOption?.duration || "",
      price: ritualOption?.price || "",
      date: formData.get("date") || "",
      time: formData.get("time") || "",
    };

    window.open(
      `https://wa.me/66949479336?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer",
    );

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailPayload),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Email request failed");
      }

      setStatusMessage(result.emailSent ? t.emailSent : t.emailSkipped);
    } catch {
      setStatusMessage(t.emailFailed);
    }
  };

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
              <form className="space-y-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="space-y-2">
                    <label
                      className="block text-xs font-semibold uppercase tracking-[0.28em] text-on-surface-variant"
                      htmlFor="name"
                    >
                      {t.fullName}
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute bottom-2 left-0 text-primary/70">
                        person
                      </span>
                      <input
                        className="w-full border-0 border-b border-outline-variant bg-transparent pb-2 pl-8 text-base text-on-surface transition-colors placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-0"
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
                      className="block text-xs font-semibold uppercase tracking-[0.28em] text-on-surface-variant"
                      htmlFor="phone"
                    >
                      {t.phone}
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute bottom-2 left-0 text-primary/70">
                        call
                      </span>
                      <input
                        className="w-full border-0 border-b border-outline-variant bg-transparent pb-2 pl-8 text-base text-on-surface transition-colors placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-0"
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
                      className="block text-xs font-semibold uppercase tracking-[0.28em] text-on-surface-variant"
                      htmlFor="email"
                    >
                      {t.customerEmail}
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute bottom-2 left-0 text-primary/70">
                        mail
                      </span>
                      <input
                        className="w-full border-0 border-b border-outline-variant bg-transparent pb-2 pl-8 text-base text-on-surface transition-colors placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-0"
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
                    className="block text-xs font-semibold uppercase tracking-[0.28em] text-on-surface-variant"
                    htmlFor="ritual"
                  >
                    {t.ritual}
                  </label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute bottom-2 left-0 text-primary/70">
                      spa
                    </span>
                    <select
                      className="w-full appearance-none border-0 border-b border-outline-variant bg-transparent pb-2 pl-8 text-base text-on-surface transition-colors focus:border-primary focus:ring-0"
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
                          {ritual.label} - {ritual.price}
                        </option>
                      ))}
                    </select>
                    <span className="material-symbols-outlined pointer-events-none absolute bottom-2 right-0 text-outline">
                      expand_more
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label
                      className="block text-xs font-semibold uppercase tracking-[0.28em] text-on-surface-variant"
                      htmlFor="date"
                    >
                      {t.date}
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute bottom-2 left-0 text-primary/70">
                        calendar_today
                      </span>
                      <input
                        className="w-full border-0 border-b border-outline-variant bg-transparent pb-2 pl-8 text-base text-on-surface transition-colors focus:border-primary focus:ring-0"
                        id="date"
                        name="date"
                        required
                        type="date"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      className="block text-xs font-semibold uppercase tracking-[0.28em] text-on-surface-variant"
                      htmlFor="time"
                    >
                      {t.time}
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute bottom-2 left-0 text-primary/70">
                        schedule
                      </span>
                      <select
                        className="w-full appearance-none border-0 border-b border-outline-variant bg-transparent pb-2 pl-8 text-base text-on-surface transition-colors focus:border-primary focus:ring-0"
                        defaultValue=""
                        id="time"
                        name="time"
                        required
                      >
                        <option disabled value="">
                          {t.timePlaceholder}
                        </option>
                        {t.times.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined pointer-events-none absolute bottom-2 right-0 text-outline">
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
                          {selectedOption.price}
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
                    className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[linear-gradient(to_right,#d4af37,#fbbc00)] py-4 font-display text-2xl text-on-primary-container shadow-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,191,0,0.3)]"
                    onClick={handleWhatsAppRequest}
                    type="button"
                  >
                    {t.request}
                    <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </button>
                  <p className="mt-4 text-center text-sm text-outline">
                    {t.payment}
                  </p>
                  {statusMessage ? (
                    <p className="mt-3 text-center text-sm text-primary">
                      {statusMessage}
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
                      Kolodvorska cesta 1<br />
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
