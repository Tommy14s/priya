"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

const bookHref = "/book?ritual=thai-oil-50";

const copy = {
  en: {
    eyebrow: "Signature Treatment",
    title: "Thai Oil Massage",
    intro:
      "A celestial dance of aromatic essential oils and traditional Thai pressure points. This ritual harmonizes the flow of energy while enveloping your senses in a silk-like veil of tranquility.",
    book: "Book This Ritual",
    benefitsTitle: "Sacred Benefits",
    benefits: [
      {
        icon: "water_drop",
        title: "Deep Hydration",
        description:
          "Our organic essential oils penetrate deep layers of the skin, restoring natural elasticity and leaving a radiant, golden glow that lasts for days.",
      },
      {
        icon: "rebase_edit",
        title: "Improved Circulation",
        description:
          "Rhythmic strokes combined with therapeutic oils stimulate blood flow and lymphatic drainage, effectively detoxifying the body and soul.",
      },
      {
        icon: "bedtime",
        title: "Total Relaxation",
        description:
          "The calming scent profile of lemongrass and jasmine induces a meditative state, reducing cortisol and promoting restorative sleep cycles.",
      },
    ],
    opening: "Opening Celebration",
    pricingTitle: "Journey Pricing",
    pricingIntro: "Exclusive limited-time rates to celebrate our sanctuary's arrival.",
    featured: "Most Rejuvenating",
    select: "Select Ritual",
    quote: "\"A moment of peace is a treasure for the soul.\"",
  },
  sl: {
    eyebrow: "Znacilna Terapija",
    title: "Tajska Oljna Masaza",
    intro:
      "Nebeski ples aromaticnih etericnih olj in tradicionalnih tajskih tock pritiska. Ritual uskladi pretok energije in vase cutne zaznave ovije v svilnato tanico miru.",
    book: "Rezerviraj Ta Ritual",
    benefitsTitle: "Svete Prednosti",
    benefits: [
      {
        icon: "water_drop",
        title: "Globoka Hidracija",
        description:
          "Nasa organska etericna olja prodrejo v globlje plasti koze, povrnejo naravno proznost in pustijo sijoce zlat obcutek.",
      },
      {
        icon: "rebase_edit",
        title: "Boljse Krozenje",
        description:
          "Ritmicni gibi s terapevtskimi olji spodbudijo pretok krvi in limfno drenazo ter pomagajo pri naravnem razstrupljanju telesa.",
      },
      {
        icon: "bedtime",
        title: "Popolna Sprostitev",
        description:
          "Pomirjujoc vonj limonske trave in jasmina spodbuja meditativno stanje, zmanjsa napetost in podpira obnovitveni spanec.",
      },
    ],
    opening: "Otvoritveno Praznovanje",
    pricingTitle: "Cene Potovanja",
    pricingIntro: "Posebne omejene cene ob odprtju nasega svetisca.",
    featured: "Najbolj Obnovitveno",
    select: "Izberi Ritual",
    quote: "\"Trenutek miru je zaklad za duso.\"",
  },
};

const prices = [
  { duration: "30 MIN", original: "35\u20AC", discounted: "31\u20AC", key: "thai-oil-30" },
  { duration: "50 MIN", original: "49\u20AC", discounted: "44\u20AC", featured: true, key: "thai-oil-50" },
  { duration: "80 MIN", original: "69\u20AC", discounted: "62\u20AC", key: "thai-oil-80" },
];

export default function ThaiOilMassagePageContent() {
  const { language } = useLanguage();
  const t = useMemo(() => copy[language], [language]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-surface text-on-surface">
      <SiteHeader current="rituals" />

      <section className="mx-auto max-w-7xl px-5 py-12 md:px-10 lg:px-20">
        <section className="relative mb-24 grid grid-cols-1 items-center gap-6 lg:grid-cols-2">
          <div className="relative z-10 space-y-6">
            <div className="mb-4 inline-block rounded-full border border-primary-container px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-primary">
              {t.eyebrow}
            </div>
            <h1 className="font-display text-5xl leading-tight text-primary md:text-6xl">{t.title}</h1>
            <p className="max-w-lg text-lg leading-8 text-on-surface-variant">{t.intro}</p>
            <div className="pt-6">
              <Link
                href={bookHref}
                className="gold-gradient soft-glow inline-flex items-center gap-3 rounded-lg px-12 py-4 font-display text-2xl text-on-primary-container transition hover:brightness-110"
              >
                {t.book}
                <span className="material-symbols-outlined">spa</span>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-primary-container/10 opacity-50 blur-3xl" />
            <div className="relative overflow-hidden rounded-t-[10rem] border-[3px] border-primary-container p-2 shadow-2xl">
              <div className="relative h-[600px] overflow-hidden rounded-t-[10rem]">
                <Image
                  alt="Thai oil massage treatment"
                  className="object-cover"
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjCB99xXvWHU7muAO1Ponfb996H_fvX4Yl0DZFm8sQltsgb0LlQaIOR2VwMeFXn4P0_7JKX68LC5UkVx6FfsJ-ATWGfd06nLrL1-sFcEtJLdDlg9jogJkAfK21xgiXlXhB04cve2JbDHOzHpvBTf5IbuwBDyU4EE0AlnlLOQGovBDWzNo5YKeaOXrE-sn9xm-PCPX1sA0nJ2kdm3rvZVIcugSYaS0-XO8gwzsx-u8t5LmXrwo1gNVF2PZeSBoS9qj3oMDJpD7hSKW2"
                />
              </div>
            </div>
            <div className="kranok-pattern absolute -bottom-10 -left-10 h-40 w-40 bg-primary opacity-20" />
          </div>
        </section>

        <section className="mb-24">
          <div className="mb-16 text-center">
            <h2 className="mb-2 font-display text-4xl text-secondary md:text-5xl">{t.benefitsTitle}</h2>
            <div className="mx-auto h-1 w-24 bg-secondary" />
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {t.benefits.map((benefit, index) => (
              <article
                key={benefit.title}
                className="group relative overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-low p-8 transition-all hover:border-primary-container"
              >
                {index === 1 ? (
                  <div className="kranok-pattern absolute right-0 top-0 h-32 w-32 bg-secondary opacity-5" />
                ) : null}
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-xl bg-primary-fixed transition-transform group-hover:scale-110">
                  <span className="material-symbols-outlined text-3xl text-primary">{benefit.icon}</span>
                </div>
                <h3 className="mb-4 font-display text-2xl text-primary">{benefit.title}</h3>
                <p className="text-base leading-7 text-on-surface-variant">{benefit.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="soft-glow relative mb-24 overflow-hidden rounded-3xl border-2 border-primary-container/20 bg-surface-container-lowest p-8 shadow-inner md:p-12">
          <div className="kranok-pattern pointer-events-none absolute inset-0 bg-primary opacity-5" />
          <div className="relative z-10 mb-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-secondary">{t.opening}</span>
            <h2 className="mt-2 font-display text-5xl text-primary md:text-6xl">{t.pricingTitle}</h2>
            <p className="mt-4 text-lg leading-8 text-on-surface-variant">{t.pricingIntro}</p>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {prices.map((price) => (
              <article
                key={price.duration}
                className={`relative flex flex-col items-center rounded-xl p-8 text-center transition-all ${
                  price.featured
                    ? "soft-glow scale-100 border-2 border-primary-container bg-surface md:scale-105"
                    : "border border-outline-variant/50 bg-surface/50 backdrop-blur-sm hover:bg-surface"
                }`}
              >
                {price.featured ? (
                  <div className="gold-gradient absolute -top-4 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-on-primary-container">
                    {t.featured}
                  </div>
                ) : null}
                <span className="mb-2 font-display text-2xl text-primary">{price.duration}</span>
                <div className={`mb-6 h-px w-12 ${price.featured ? "bg-primary-container" : "bg-outline-variant"}`} />
                <div className="mb-6 flex items-baseline gap-2">
                  <span className="text-lg text-on-surface-variant line-through">{price.original}</span>
                  <span className="font-display text-5xl text-secondary">{price.discounted}</span>
                </div>
                <Link
                  href={`/book?ritual=${price.key}`}
                  className={`w-full rounded py-3 text-xs font-bold uppercase tracking-[0.24em] transition-colors ${
                    price.featured
                      ? "gold-gradient text-on-primary-container shadow-md hover:brightness-110"
                      : "border border-secondary text-secondary hover:bg-secondary hover:text-white"
                  }`}
                >
                  {t.select}
                </Link>
              </article>
            ))}
          </div>

          <div className="relative z-10 mt-12 text-center">
            <p className="text-base italic text-on-surface-variant">{t.quote}</p>
          </div>
        </section>
      </section>

      <SiteFooter />
    </main>
  );
}
