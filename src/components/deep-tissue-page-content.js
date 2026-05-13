"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import PriceOptionSelector from "@/components/price-option-selector";
import PromoCarousel from "@/components/promo-carousel";
import { useLanguage } from "@/components/language-provider";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

const copy = {
  en: {
    eyebrow: "Therapeutic Ritual",
    title: "Deep Tissue Massage",
    intro:
      "A focused, profound therapeutic journey. Using traditional Thai techniques combined with sustained pressure, we release chronic patterns of tension to restore structural balance and deep serenity.",
    reserve: "Reserve Experience",
    menu: "View Menu",
    benefitsTitle: "The Anatomy of Relief",
    benefits: [
      [
        "healing",
        "Chronic Tension Release",
        "Targets the deepest layers of muscle tissue, tendons, and fascia to break down adhesions that cause pain and inflammation.",
      ],
      [
        "water_drop",
        "Enhanced Circulation",
        "Firm pressure stimulates blood flow, carrying rich oxygen and nutrients to vital organs and tissues, promoting natural healing.",
      ],
      [
        "self_improvement",
        "Structural Realignment",
        "By addressing muscular imbalances, this therapy helps correct posture, increasing range of motion and overall physical fluidity.",
      ],
    ],
    journeysTitle: "Curated Journeys",
    journeysIntro: "Select the duration that aligns with your body's needs.",
    recommended: "Recommended",
    options: [
      {
        duration: "60 Minutes",
        description: "Targeted relief for specific areas of concern.",
        price: "$145",
        bookingKey: "deep-tissue-60",
      },
      {
        duration: "90 Minutes",
        description: "Comprehensive full-body structural balance.",
        price: "$195",
        bookingKey: "deep-tissue-90",
      },
      {
        duration: "120 Minutes",
        description: "The ultimate restorative immersion.",
        price: "$245",
        bookingKey: "deep-tissue-120",
      },
    ],
  },
  sl: {
    eyebrow: "Terapevtski Ritual",
    title: "Globinska Masaza Tkiva",
    intro:
      "Osredotoceno in poglobljeno terapevtsko potovanje. S pomocjo tradicionalnih tajskih tehnik in dolgotrajnega pritiska sproscamo kronicne vzorce napetosti ter obnavljamo ravnovesje telesa in notranji mir.",
    reserve: "Rezerviraj Dozivetje",
    menu: "Poglej Ponudbo",
    benefitsTitle: "Anatomija Olajsanja",
    benefits: [
      [
        "healing",
        "Sproscanje Kronicne Napetosti",
        "Deluje na najgloblje plasti misic, kit in fascije ter pomaga razbiti napetosti, ki povzrocajo bolecino in vnetje.",
      ],
      [
        "water_drop",
        "Boljse Krozenje",
        "Mocnejsi pritisk spodbuja pretok krvi, ki prinese kisik in hranila v tkiva ter podpira naravno okrevanje.",
      ],
      [
        "self_improvement",
        "Strukturna Poravnava",
        "Z obravnavo misicnih neravnovesij terapija pomaga izboljsati držo, gibljivost in splošno lahkotnost gibanja.",
      ],
    ],
    journeysTitle: "Izbrane Poti",
    journeysIntro: "Izberite trajanje, ki najbolj ustreza potrebam vasega telesa.",
    recommended: "Priporoceno",
    options: [
      {
        duration: "60 Minut",
        description: "Ciljno olajsanje za dolocena podrocja napetosti.",
        price: "$145",
        bookingKey: "deep-tissue-60",
      },
      {
        duration: "90 Minut",
        description: "Celostno ravnovesje celotnega telesa.",
        price: "$195",
        bookingKey: "deep-tissue-90",
      },
      {
        duration: "120 Minut",
        description: "Najgloblja obnovitvena izkusnja.",
        price: "$245",
        bookingKey: "deep-tissue-120",
      },
    ],
  },
};

export default function DeepTissuePageContent() {
  const { language } = useLanguage();
  const t = useMemo(() => copy[language], [language]);

  return (
    <main className="w-full bg-surface pb-20 text-on-surface">
      <SiteHeader current="rituals" />

      <section className="kranok-pattern px-5 pb-24 pt-12 md:px-10 lg:px-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 lg:grid-cols-2">
          <div className="z-10 space-y-6">
            <div className="flex items-center gap-2 text-secondary">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                spa
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.28em]">{t.eyebrow}</span>
            </div>
            <h1 className="font-display text-5xl text-on-surface md:text-6xl">{t.title}</h1>
            <p className="max-w-lg text-lg leading-8 text-on-surface-variant">{t.intro}</p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                className="gold-gradient soft-glow rounded px-8 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-on-primary-container transition hover:brightness-110"
                href="/book?ritual=deep-tissue-90"
              >
                {t.reserve}
              </Link>
              <Link
                className="gold-border rounded bg-surface-bright px-8 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary transition hover:bg-surface-container-low"
                href="/academy"
              >
                {t.menu}
              </Link>
            </div>
          </div>

          <div className="gold-border soft-glow relative h-[400px] overflow-hidden rounded-t-[16rem] lg:h-[600px]">
            <Image
              alt="Therapist performing deep tissue massage"
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuApYoyRhV07y-ASuwIF_wG51Wgg32tTWSIrOr56QYv45hkuUD4zrZSykAAdGHJ8sTr65z65svHSJYwRxFfahjbzXMbdnnV10cdku3PHQTDZN7r5rX1GACDiun3EnhZ18EA4WWOzAR_n0EeUZjWnKOFXabEJYHlX-_evoofdcZKc3ZIEL0vxlTgHvVx0nqCBTCtCCsdVo7qahYhBCGsicHAsXGvERpcDZtfveheSapbs6UqTA3inTyIsm8dDZtLhP1cwevBD9Pabv_6Z"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section className="px-5 py-16 md:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 font-display text-4xl text-on-surface md:text-5xl">{t.benefitsTitle}</h2>
            <div className="mx-auto h-0.5 w-16 bg-primary-container" />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {t.benefits.map(([icon, title, description], index) => (
              <article
                key={title}
                className={`gold-border bg-surface-container-low rounded-lg p-8 transition-colors duration-300 hover:bg-surface-container ${
                  index === 1 ? "md:translate-y-4" : ""
                }`}
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-secondary-fixed/30 text-secondary">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    {icon}
                  </span>
                </div>
                <h3 className="mb-3 font-display text-2xl text-on-surface">{title}</h3>
                <p className="text-base leading-7 text-on-surface-variant">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-4 my-12 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest/50 px-4 py-12 md:mx-10 md:px-10 md:py-16 lg:mx-20 lg:px-20">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <h2 className="font-display text-4xl leading-tight text-on-surface md:text-5xl">{t.journeysTitle}</h2>
            <p className="mt-2 text-base text-on-surface-variant">{t.journeysIntro}</p>
          </div>

          <PriceOptionSelector
            getBadge={(option, index) => (index === 1 ? t.recommended : "")}
            getHref={(option) => `/book?ritual=${option.bookingKey}`}
            getPrice={(option) => option.price}
            getSubtitle={(option) => option.description}
            getTitle={(option) => option.duration}
            options={t.options}
            reserveLabel={t.reserve}
          />

          <div className="hidden md:block">
            <PromoCarousel
              ariaLabelNext="Next deep tissue option"
              ariaLabelPrev="Previous deep tissue option"
              itemClassName="min-w-[82%] sm:min-w-[70%] lg:min-w-full"
              items={t.options}
              renderItem={(option, index, isActive) => (
                <div
                  className={`relative flex h-full min-h-[260px] flex-col items-center justify-between rounded-2xl p-6 text-center shadow-[0_16px_50px_rgba(85,67,0,0.1)] sm:flex-row sm:text-left ${
                    index === 1
                      ? "border-2 border-primary-container bg-surface-container-low"
                      : "gold-border bg-surface"
                  } ${isActive ? "ring-2 ring-secondary/30 ring-offset-2 ring-offset-surface" : ""}`}
                >
                  {index === 1 ? (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary-container px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-on-primary-container">
                      {t.recommended}
                    </div>
                  ) : null}
                  <div className={`mb-4 text-center sm:mb-0 sm:text-left ${index === 1 ? "mt-2 sm:mt-0" : ""}`}>
                    <h4 className="font-display text-2xl text-on-surface">{option.duration}</h4>
                    <p className="text-base text-on-surface-variant">{option.description}</p>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="rounded-full bg-primary-container/10 px-6 py-2 font-display text-4xl text-secondary">{option.price}</span>
                    <Link
                      className="luxury-action flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 text-primary"
                      href={`/book?ritual=${option.bookingKey}`}
                    >
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
