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
    eyebrow: "Thermal Therapy",
    title: "Hot Stone Ritual",
    intro:
      "Surrender to the profound warmth of heated basalt stones. This ancient therapy melts away deep-seated tension, allowing healing heat to penetrate muscles and guide you into a state of absolute tranquility.",
    reserve: "Reserve This Ritual",
    menu: "View Menu",
    experienceTitle: "The Experience",
    experienceBodyOne:
      "Our Hot Stone Ritual is a symphony of touch and temperature. Smooth, water-heated volcanic stones are expertly glided across the body using warm, aromatic oils. The stones act as an extension of the therapist's hands, delivering concentrated heat that expands blood vessels, encouraging blood flow and profound muscle relaxation.",
    experienceBodyTwo:
      "Following traditional Thai Sen energy lines, the warmth helps to unblock stagnant energy, restoring harmony to mind and spirit. It is an ideal sanctuary for those suffering from muscle stiffness, stress, or seeking a deeply restorative escape.",
    benefitsTitle: "Benefits",
    benefits: [
      "Deep muscle relaxation",
      "Improved circulation",
      "Stress & anxiety relief",
      "Promotes better sleep",
    ],
    journeyTitle: "Select Your Journey",
    options: [
      {
        icon: "hourglass_top",
        title: "The Immersion",
        duration: "90 Minutes",
        description:
          "A comprehensive full-body hot stone therapy, allowing ample time for the heat to penetrate deep muscle layers and induce total relaxation.",
        price: "$180",
        bookingKey: "hot-stone-90",
      },
      {
        icon: "hourglass_bottom",
        title: "The Sanctuary",
        duration: "120 Minutes",
        description:
          "The ultimate indulgence. Includes a full-body stone massage followed by targeted facial stone therapy and a soothing scalp massage.",
        price: "$230",
        badge: "Signature",
        bookingKey: "hot-stone-120",
      },
    ],
  },
  sl: {
    eyebrow: "Toplotna Terapija",
    title: "Ritual Vrocih Kamnov",
    intro:
      "Prepustite se globoki toploti segretih bazaltnih kamnov. Ta starodavna terapija sprosca globoko napetost in vodi telo v popoln mir.",
    reserve: "Rezerviraj Ta Ritual",
    menu: "Poglej Ponudbo",
    experienceTitle: "Dozivetje",
    experienceBodyOne:
      "Nasa terapija z vrocimi kamni je preplet dotika in temperature. Gladki vulkanski kamni, ogreti v vodi, drsijo po telesu z uporabo toplih aromaticnih olj. Delujejo kot podaljsek terapevtovih rok in prinasajo globoko sprostitev.",
    experienceBodyTwo:
      "Po tradicionalnih tajskih energijskih linijah toplota pomaga sprostiti zastalo energijo ter vrniti ravnovesje umu in telesu. Idealno za otrdelost misic, stres in popolno obnovo.",
    benefitsTitle: "Prednosti",
    benefits: [
      "Globoka sprostitev misic",
      "Boljse krozenje",
      "Olajsanje stresa in tesnobe",
      "Spodbuja boljsi spanec",
    ],
    journeyTitle: "Izberite Svoje Potovanje",
    options: [
      {
        icon: "hourglass_top",
        title: "Potopitev",
        duration: "90 Minut",
        description:
          "Celovita terapija z vrocimi kamni za celo telo, ki omogoca, da toplota prodre globoko v misice in prinese popolno sprostitev.",
        price: "$180",
        bookingKey: "hot-stone-90",
      },
      {
        icon: "hourglass_bottom",
        title: "Svetisce",
        duration: "120 Minut",
        description:
          "Najbolj razkosna izkusnja. Vkljucuje masažo celotnega telesa z vročimi kamni ter dodatno terapijo obraza in lasisca.",
        price: "$230",
        badge: "Podpis Priya",
        bookingKey: "hot-stone-120",
      },
    ],
  },
};

export default function HotStonePageContent() {
  const { language } = useLanguage();
  const t = useMemo(() => copy[language], [language]);

  return (
    <main className="min-h-screen bg-surface bg-[radial-gradient(circle,rgba(255,223,160,0.3)_0%,rgba(252,249,248,1)_100%)] text-on-surface">
      <SiteHeader current="rituals" />

      <section className="kranok-pattern mx-auto max-w-7xl px-5 py-12 md:px-10 lg:px-20">
        <section className="mb-20 grid grid-cols-1 items-center gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">{t.eyebrow}</p>
            <h1 className="font-display text-5xl text-primary md:text-6xl">{t.title}</h1>
            <p className="text-lg leading-8 text-on-surface-variant">{t.intro}</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/book?ritual=hot-stone-90"
                className="gold-gradient soft-glow rounded-full px-8 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-on-primary-container transition hover:opacity-90"
              >
                {t.reserve}
              </Link>
              <Link
                href="/academy"
                className="gold-border rounded-full bg-surface-bright px-8 py-3 text-xs font-semibold uppercase tracking-[0.28em] text-secondary transition hover:bg-surface-container-low"
              >
                {t.menu}
              </Link>
            </div>
          </div>

          <div className="gold-border soft-glow relative h-[500px] overflow-hidden rounded-t-[16rem]">
            <Image
              alt="Hot stone massage setup"
              className="object-cover"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKBjgqWbSgTEhf1L7F_btFL-U5TWOKRLTP9P6RsAno8xXL63gXDo8I_3xKS6-YRPgQ6jFI74ioB0SBkGfp9dw803ukwiXT33KUFKrd2_w8sRDYpE_aXUt1DSwMP9jXw8qR1U-oJQS1rex9LFyerOQ7CxXeGnfynuPX5MmB1O3nUr6_w6_ocW-8W0eJK7V9zAikhQ2JUO5mZ4t4JTIqWeZARTmh26rr9WFHNFeqHHvjKTnbqkVoPNYZXRRqVt1HNJ15k8r3YJVikrIc"
            />
          </div>
        </section>

        <section className="gold-border relative mb-20 overflow-hidden rounded-lg bg-surface-container-low p-10">
          <div className="kranok-pattern absolute inset-0 opacity-50" />
          <div className="relative z-10 grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="md:col-span-2">
              <h2 className="mb-6 font-display text-4xl text-primary md:text-5xl">{t.experienceTitle}</h2>
              <p className="mb-6 text-base leading-7 text-on-surface-variant">{t.experienceBodyOne}</p>
              <p className="text-base leading-7 text-on-surface-variant">{t.experienceBodyTwo}</p>
            </div>
            <div>
              <h3 className="mb-4 border-b border-outline-variant pb-2 font-display text-2xl text-secondary">
                {t.benefitsTitle}
              </h3>
              <ul className="space-y-4">
                {t.benefits.map((benefit, index) => (
                  <li key={benefit} className="flex items-start">
                    <span className="material-symbols-outlined mr-3 text-primary-container">
                      {["spa", "water_drop", "self_improvement", "bedtime"][index]}
                    </span>
                    <span className="text-base text-on-surface-variant">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="mb-10 text-center md:mb-12">
            <h2 className="font-display text-4xl leading-tight text-primary md:text-5xl">{t.journeyTitle}</h2>
            <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-primary-container" />
          </div>

          <PriceOptionSelector
            getBadge={(option) => option.badge}
            getHref={(option) => `/book?ritual=${option.bookingKey}`}
            getPrice={(option) => option.price}
            getSubtitle={(option) => option.description}
            getTitle={(option) => option.duration}
            options={t.options}
            reserveLabel={t.reserve}
          />

          <div className="hidden md:block">
            <PromoCarousel
              ariaLabelNext="Next hot stone option"
              ariaLabelPrev="Previous hot stone option"
              itemClassName="min-w-[82%] sm:min-w-[70%] lg:min-w-[48%]"
              items={t.options}
              renderItem={(option, index, isActive) => (
                <article
                  className={`gold-border soft-glow relative flex h-full min-h-[430px] cursor-pointer flex-col items-center rounded-2xl bg-surface p-6 text-center shadow-[0_16px_50px_rgba(85,67,0,0.1)] transition-colors hover:bg-surface-container-low md:p-8 ${
                    isActive ? "ring-2 ring-secondary/30 ring-offset-2 ring-offset-surface" : ""
                  }`}
                >
                  {option.badge ? (
                    <div className="absolute -top-3 rounded-full bg-primary-container px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-on-primary-container shadow-sm">
                      {option.badge}
                    </div>
                  ) : null}
                  <span className="material-symbols-outlined mb-4 text-4xl text-primary-container">
                    {option.icon}
                  </span>
                  <h3 className="mb-2 font-display text-2xl text-secondary">{option.title}</h3>
                  <p className="mb-6 text-xs font-semibold uppercase tracking-[0.28em] text-outline">
                    {option.duration}
                  </p>
                  <p className="mb-8 flex-grow text-base leading-7 text-on-surface-variant">
                    {option.description}
                  </p>
                  <p className="rounded-full bg-primary-container/10 px-6 py-2 font-display text-4xl text-primary">{option.price}</p>
                  <Link
                    href={`/book?ritual=${option.bookingKey}`}
                    className="luxury-action mt-auto w-full rounded-full border border-secondary px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-secondary"
                  >
                    {t.reserve}
                  </Link>
                </article>
              )}
            />
          </div>
        </section>
      </section>

      <SiteFooter />
    </main>
  );
}
