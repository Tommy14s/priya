"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import PriceOptionSelector from "@/components/price-option-selector";
import PromoCarousel from "@/components/promo-carousel";
import { useLanguage } from "@/components/language-provider";
import SiteHeader from "@/components/site-header";

const copy = {
  en: {
    eyebrow: "The Ancient Art of Healing",
    title: "Traditional Thai Massage",
    intro:
      "Experience deep restorative stretching and rhythmic acupressure. Our signature traditional treatment realigns your body's energy pathways, releasing profound tension and inviting total mind-body harmony.",
    reserve: "Select Ritual",
    pricingTitle: "Journey Pricing",
    pricingIntro: "Select the duration of your retreat.",
    connect: "Connect",
    visit: "Visit Us",
    sanctuaryFooter:
      "Sanctuary for the Soul. Authentic Thai healing traditions tailored for modern wellness.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    contact: "Contact Us",
    careers: "Careers",
    options: [
      {
        icon: "hourglass_empty",
        title: "60 Minutes",
        description:
          "A focused session to address primary areas of tension and introduce the benefits of traditional stretching.",
        price: "\u20AC59",
        bookingKey: "traditional-thai-60",
      },
      {
        icon: "hourglass_top",
        title: "90 Minutes",
        description:
          "The traditional standard. Allows sufficient time for a complete full-body sequence and deeper energy line work.",
        price: "\u20AC79",
        badge: "Most Popular",
        bookingKey: "traditional-thai-90",
      },
      {
        icon: "hourglass_bottom",
        title: "120 Minutes",
        description:
          "The ultimate immersive experience. Profound relaxation, extensive stretching, and comprehensive meridian therapy.",
        price: "\u20AC99",
        bookingKey: "traditional-thai-120",
      },
    ],
  },
  sl: {
    eyebrow: "Starodavna Umetnost Zdravljenja",
    title: "Tradicionalna Tajska Masaza",
    intro:
      "Dozivite globoko obnovitveno raztezanje in ritmicno akupresuro. Nasa znacilna tradicionalna terapija uravnava energijske poti telesa ter prinasa harmonijo telesa in uma.",
    reserve: "Izberi Ritual",
    pricingTitle: "Cene Potovanja",
    pricingIntro: "Izberite trajanje svojega oddiha.",
    connect: "Povezava",
    visit: "Obiscite Nas",
    sanctuaryFooter:
      "Svetisce za duso. Pristne tajske zdravilne tradicije, prilagojene sodobnemu dobremu pocutju.",
    privacy: "Politika Zasebnosti",
    terms: "Pogoji Uporabe",
    contact: "Kontakt",
    careers: "Kariera",
    options: [
      {
        icon: "hourglass_empty",
        title: "60 Minut",
        description:
          "Osredotocena terapija za glavna podrocja napetosti in uvod v koristi tradicionalnega raztezanja.",
        price: "\u20AC59",
        bookingKey: "traditional-thai-60",
      },
      {
        icon: "hourglass_top",
        title: "90 Minut",
        description:
          "Tradicionalni standard. Omogoca dovolj casa za celotno zaporedje po telesu in poglobljeno delo po energijskih linijah.",
        price: "\u20AC79",
        badge: "Najbolj Priljubljeno",
        bookingKey: "traditional-thai-90",
      },
      {
        icon: "hourglass_bottom",
        title: "120 Minut",
        description:
          "Najbolj poglobljena izkusnja. Globoka sprostitev, obsezno raztezanje in celovita terapija meridianov.",
        price: "\u20AC99",
        bookingKey: "traditional-thai-120",
      },
    ],
  },
};

export default function TraditionalThaiPageContent() {
  const { language } = useLanguage();
  const t = useMemo(() => copy[language], [language]);

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-background text-on-background">
      <div className="kranok-pattern pointer-events-none fixed inset-0 z-0" />
      <SiteHeader current="rituals" />

      <section className="relative z-10 w-full">
        <section className="relative min-h-[716px] overflow-hidden border-b border-primary-container/20 bg-gradient-to-b from-surface-container to-background px-5 pb-16 pt-24 md:px-10 lg:px-20">
          <div className="pointer-events-none absolute inset-0 flex justify-between opacity-10">
            <div
              className="h-full w-1/3 bg-contain bg-left-top bg-no-repeat"
              style={{ backgroundImage: "radial-gradient(circle, #ffdfa0 0%, transparent 70%)" }}
            />
            <div
              className="h-full w-1/3 bg-contain bg-right-bottom bg-no-repeat"
              style={{ backgroundImage: "radial-gradient(circle, #ffdfa0 0%, transparent 70%)" }}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl text-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">{t.eyebrow}</p>
            <h1 className="text-glow mb-6 font-display text-5xl leading-tight text-primary md:text-[64px]">
              {t.title}
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-on-surface-variant">
              {t.intro}
            </p>

            <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
              <div className="box-glow relative col-span-1 h-64 overflow-hidden rounded-b-lg rounded-t-[16rem] border-2 border-primary-container/50 md:col-span-2 md:h-96">
                <Image
                  alt="Traditional Thai massage session in progress"
                  className="object-cover"
                  fill
                  priority
                  sizes="(min-width: 768px) 66vw, 100vw"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBM9iip9t7Qm1re7l7IeuWxEpbgzeDUiUTezzQ_Ek86VYYIVTkACvuGCC4zBKObq7BKxfAH_ZUfXKMoHifswhbK1ledUUukxpqo5VEvOnHv-Qn45hYdgcuZQ_Y1t2ZsusMpZsgSAROUVyvHu6kU0Fo1N91JHWJiR3nvbSbro83922Vdvsmbh_HtUq-9mb1Kwp5ejUwmKnw_KHU5gvNS71fl6lz1dipMX-q44LIdSZr6ssWhY-WmBgR6tJ21-U4G6B4YVSqYu2vmLuCe"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary-fixed/40 to-transparent" />
              </div>

              <div className="flex h-64 flex-col gap-6 md:h-96">
                <div className="relative flex-1 overflow-hidden rounded-lg border border-primary-container/30">
                  <Image
                    alt="Spa details with essential oils"
                    className="object-cover"
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKyG_Q-HYc0mcR0PwHdWLN5BkDBgBMCnWjz8Epk9USlOy5nJP7T30Bwof91fipNpgOmUcTU6Tt_u-oHpPt-S00iM0349Czx30DtT0iVZIqlKDALxHCTw19kT300RYd_xweW9qR2DJoEFmbLjmc7Yv-reM9HIIHjSZ8XbWgyBzDmjnbxL1Oh5vSUIqp-MZy3srX6V_lBIGD6NyGQX32VT8tBFbePyf3vosviazZcbG5E0R8FjHaPzvQaXxIC-iY_h_1sBlM_RN32qCz"
                  />
                </div>
                <div className="flex flex-1 flex-col items-center justify-center rounded-lg border border-primary-container/30 bg-surface-container-low p-6 text-center">
                  <span className="material-symbols-outlined mb-2 text-4xl text-secondary">self_improvement</span>
                  <h3 className="font-display text-2xl text-primary">Pure Balance</h3>
                  <p className="mt-2 text-xs font-semibold text-on-surface-variant">Harmonize vital energy</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative bg-surface px-5 py-20 md:px-10 lg:px-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center md:mb-16">
              <h2 className="mb-4 flex items-center justify-center gap-4 font-display text-4xl text-primary md:text-5xl">
                <span className="block h-px w-12 bg-secondary/50" />
                {t.pricingTitle}
                <span className="block h-px w-12 bg-secondary/50" />
              </h2>
              <p className="text-base text-on-surface-variant">{t.pricingIntro}</p>
            </div>

            <PriceOptionSelector
              getBadge={(option) => option.badge}
              getHref={(option) => `/book?ritual=${option.bookingKey}`}
              getPrice={(option) => option.price}
              getSubtitle={(option) => option.description}
              getTitle={(option) => option.title}
              options={t.options}
              reserveLabel={t.reserve}
            />

            <div className="hidden md:block">
              <PromoCarousel
                ariaLabelNext="Next traditional Thai option"
                ariaLabelPrev="Previous traditional Thai option"
                itemClassName="min-w-[82%] sm:min-w-[70%] lg:min-w-[32%]"
                items={t.options}
                renderItem={(option, index, isActive) => (
                  <article
                    className={`relative flex h-full min-h-[390px] flex-col items-center rounded-2xl p-6 text-center shadow-[0_16px_50px_rgba(85,67,0,0.1)] md:p-8 ${
                      index === 1
                        ? "box-glow border-2 border-primary-container bg-gradient-to-b from-surface-bright to-surface-container-low"
                        : "group rounded-xl border border-outline-variant bg-surface-bright transition-colors duration-300 hover:border-secondary"
                    } ${isActive ? "ring-2 ring-secondary/30 ring-offset-2 ring-offset-surface" : ""}`}
                  >
                    {option.badge ? (
                      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary-container to-secondary px-4 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-on-primary-container shadow-md">
                        {option.badge}
                      </div>
                    ) : null}

                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-primary-container/30 bg-surface-container">
                      <span className="material-symbols-outlined text-secondary">{option.icon}</span>
                    </div>
                    <h3 className="mb-2 font-display text-2xl text-on-surface">{option.title}</h3>
                    <p className="mb-6 text-base leading-7 text-on-surface-variant">{option.description}</p>
                    <div className="mb-8 rounded-full bg-primary-container/10 px-6 py-2 font-display text-4xl text-primary">{option.price}</div>
                    <Link
                      href={`/book?ritual=${option.bookingKey}`}
                      className={`luxury-action mt-auto w-full rounded-full px-6 py-4 text-xs font-semibold uppercase tracking-[0.24em] ${
                        index === 1
                          ? "bg-gradient-to-r from-primary-container to-secondary text-on-primary-container"
                          : "border border-secondary bg-surface text-secondary"
                      }`}
                    >
                      {t.reserve}
                    </Link>
                  </article>
                )}
              />
            </div>
          </div>
        </section>
      </section>

      <footer className="relative z-20 grid w-full grid-cols-1 gap-6 border-t-2 border-primary-container/20 bg-surface-container-low px-5 py-16 text-secondary md:grid-cols-3 md:px-10 lg:px-20">
        <div className="flex flex-col gap-4">
          <div className="font-display text-3xl text-primary">Priya Thai Massage</div>
          <p className="max-w-xs text-sm text-on-surface-variant">{t.sanctuaryFooter}</p>
        </div>
        <div className="flex flex-col gap-3 md:items-center">
          <h4 className="mb-2 font-display text-2xl text-primary">{t.connect}</h4>
          <Link className="transition-colors hover:text-primary" href="#">{t.privacy}</Link>
          <Link className="transition-colors hover:text-primary" href="#">{t.terms}</Link>
          <Link className="transition-colors hover:text-primary" href="/book">{t.contact}</Link>
          <Link className="transition-colors hover:text-primary" href="#">{t.careers}</Link>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <h4 className="mb-2 font-display text-2xl text-primary">{t.visit}</h4>
          <p className="text-right text-sm text-on-surface-variant">
            Kolodvorska cesta 1
            <br />
            1230 Domzale, Slovenija
          </p>
          <p className="mt-2 text-sm font-semibold text-primary">+386 696 14798 (WhatsApp)</p>
        </div>
        <div className="col-span-1 mt-6 border-t border-outline-variant/30 pt-6 text-center md:col-span-3">
          <p className="text-xs text-on-surface-variant">{"\u00A9"} 2024 Priya Thai Massage. Sanctuary for the Soul.</p>
        </div>
      </footer>
    </main>
  );
}
