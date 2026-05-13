"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import PromoCarousel from "@/components/promo-carousel";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

const rituals = [
  {
    key: "royal",
    badgeKey: "mostPopular",
    href: "/rituals/traditional-thai",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAME86sb-yRXxay7FAqMUmaRLn0NQxik3OJ56ZImwAyVYVzgsEcQg2ckh9dO8j04NYLIpN0AfKA5czSVHUKCR8YcGM48tWB2OSzZEDOHBNEt9vPluKDz0YkSoPoKQipCS-4fVzdCZ3gICCbuUUJs32d2mltKCX5cASYqiiLGjQOVc6VgPY4wZqJVRGqePw67-wjb2BCkzxwwDqkAOxYl_ZGVRXNPcmogHJi5OlVpFSDmCPXowfg4nHzFhOPLvKuXQVtEVxEps7lmHq2",
  },
  {
    key: "oil",
    duration: "60 MIN | 90 MIN",
    icon: "water_drop",
    href: "/rituals/thai-oil-massage",
  },
  {
    key: "herbal",
    href: "/rituals/hot-stone",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgMWHZN6FfPgW7Q68JpeowURBL9NsXg2HSVvCwQbjZthOgfiDsYxtDHn7-5WgJGPuSPZgeY6g6hcD_ObNzP7iF4fMf3RWL0RaoZehaKADS2cwdCpkqqLCJDblfUB4h_IbCbGO4bBREY_tGYUJCoc0lLp0wPbttpgHuOlKYw8GCwzdke4iWAakZYx_TUECAgf9Tq8uP8UbU0AcUvP58x2VaF2es-l8P7JxoYE3kjLw1gjQ0wB9DJ6OmACU06NeiR13k6o3MMYDaCyc-",
  },
];

const pageCopy = {
  en: {
    heroEyebrow: "Welcome to Priya",
    heroTitle: "The Art of Golden Relaxation",
    heroBody:
      "Experience authentic Thai healing in a sanctuary of luxury. Allow the ancient traditions to restore your body, calm your mind, and elevate your spirit.",
    heroPrimary: "Explore the Ritual",
    heroSecondary: "Reserve Now",
    essenceLabel: "Our Essence",
    philosophyTitle: "The Philosophy of Priya",
    philosophyBodyOne:
      "In Sanskrit, Priya translates to beloved, dear, or bringing joy. This core principle guides every touch, every aroma, and every moment within our sanctuary. We believe that true relaxation is not merely the absence of tension, but the presence of profound joy and balance within.",
    philosophyBodyTwo:
      "Our therapists are artisans of healing, trained in the royal traditions of Thai massage. They blend rhythmic compression, mindful stretching, and intuitive touch to unblock energy pathways, inviting a state of golden serenity.",
    authenticityTitle: "Authenticity",
    authenticityBody: "Rooted in ancient techniques.",
    luxuryTitle: "Luxury",
    luxuryBody: "A tactile, premium experience.",
    offeringsLabel: "Signature Offerings",
    offeringsTitle: "Curated Rituals",
    offeringsCta: "Explore Ritual",
    rituals: {
      mostPopular: "Most Popular",
      royal: {
        title: "Royal Thai Tradition",
        description:
          "The quintessential experience. Deep stretching and acupressure to restore flow and vitality.",
      },
      oil: {
        title: "Aromatic Gold Oil",
        description:
          "A soothing fusion of rhythmic strokes and warm, botanical oils infused with delicate gold flakes.",
      },
      herbal: {
        title: "Herbal Poultice",
        description: "Warm steamed herbs applied to soothe aching muscles.",
      },
    },
  },
  sl: {
    heroEyebrow: "Dobrodosli v Priya",
    heroTitle: "Umetnost Zlate Sprostitve",
    heroBody:
      "Dozivite pristno tajsko zdravljenje v razkosnem svetišču. Naj starodavne tradicije obnovijo vase telo, umirijo vas um in povzdignejo vas duh.",
    heroPrimary: "Razišči Ritual",
    heroSecondary: "Rezerviraj Zdaj",
    essenceLabel: "Nase Bistvo",
    philosophyTitle: "Filozofija Priya",
    philosophyBodyOne:
      "V sanskrtu Priya pomeni ljubljena, draga ali tista, ki prinaša veselje. To nacelo vodi vsak dotik, vsak vonj in vsak trenutek v nasem svetišču. Verjamemo, da prava sprostitev ni le odsotnost napetosti, temvec prisotnost globokega veselja in ravnovesja.",
    philosophyBodyTwo:
      "Nasi terapevti so mojstri zdravljenja, izurjeni v kraljevskih tradicijah tajske masaze. Zdruzujejo ritmicni pritisk, zavestno raztezanje in intuitiven dotik, da sprostijo energijske poti in priklicejo zlato spokojnost.",
    authenticityTitle: "Pristnost",
    authenticityBody: "Temelji na starodavnih tehnikah.",
    luxuryTitle: "Razkosje",
    luxuryBody: "Premisljena, vrhunska izkusnja.",
    offeringsLabel: "Izbrani Rituali",
    offeringsTitle: "Skromno Izbrani Rituali",
    offeringsCta: "Razišči Ritual",
    rituals: {
      mostPopular: "Najbolj Priljubljeno",
      royal: {
        title: "Kraljevska Tajska Tradicija",
        description:
          "Bistvena izkusnja. Globoko raztezanje in akupresura za povrnitev pretoka in vitalnosti.",
      },
      oil: {
        title: "Aromaticno Zlato Olje",
        description:
          "Pomirjujoca povezava ritmicnih gibov in toplih botanicnih olj z neznimi zlatimi delci.",
      },
      herbal: {
        title: "Zelisci Obkladek",
        description: "Topla para zelisc pomiri utrujene in bolece misice.",
      },
    },
  },
};

export default function HomePageContent() {
  const { language } = useLanguage();
  const t = useMemo(() => pageCopy[language], [language]);
  const offerings = useMemo(
    () =>
      rituals.map((ritual) => ({
        ...ritual,
        ...t.rituals[ritual.key],
        badge: ritual.badgeKey ? t.rituals[ritual.badgeKey] : "",
      })),
    [t],
  );

  return (
    <main className="bg-background text-on-background">
      <SiteHeader current="home" />

      <header className="relative flex min-h-[720px] items-center justify-center overflow-hidden">
        <Image
          alt="Priya Thai Massage sanctuary hero"
          className="object-cover brightness-90"
          fill
          priority
          sizes="100vw"
          src="/images/image.png"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(252,249,248,0.35),rgba(252,249,248,0.08),rgba(252,249,248,1))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,191,0,0.12)_0%,transparent_70%)]" />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 py-24 text-center md:px-10 lg:px-20">
          <span className="mb-6 rounded-full border border-primary-container/40 bg-surface/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-secondary shadow-sm backdrop-blur-md md:text-sm">
            {t.heroEyebrow}
          </span>
          <h1 className="font-display text-5xl leading-[1.05] text-[#4f3d00] drop-shadow-sm md:text-7xl">
            {t.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#3f392d] md:text-xl">
            {t.heroBody}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/rituals"
              className="luxury-action gold-gradient soft-glow inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-on-primary-container"
            >
              <span>{t.heroPrimary}</span>
              <span className="material-symbols-outlined text-base">
                arrow_forward
              </span>
            </Link>
            <Link
              href="/book"
              className="luxury-action inline-flex items-center gap-2 rounded-full border border-primary/20 bg-surface/85 px-8 py-4 text-xs font-semibold uppercase tracking-[0.28em] text-primary backdrop-blur-sm"
            >
              <span>{t.heroSecondary}</span>
              <span className="material-symbols-outlined text-base">
                calendar_month
              </span>
            </Link>
          </div>
        </div>
      </header>

      <section
        id="philosophy"
        className="kranok-pattern bg-surface-container-lowest px-5 py-24 md:px-10 lg:px-20"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative order-2 lg:order-1">
            <div className="gold-border soft-glow relative aspect-[4/5] overflow-hidden rounded-t-[14rem] bg-surface p-2">
              <Image
                alt="Traditional Thai spa arrangement with lotus flowers and massage stones"
                className="rounded-t-[13rem] object-cover"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1Q_bcv8uhsmXQM9vLbcIr3LvINKd7NJ0be8gYWf9OVfR02kK9Gq990JVOG40GiWOB5j1GUWXNsgRwygWkHPbfQGm7slEXBnht3pFMIk9KX0irERng1FFF1jGXGkyh-rDRnxrzoifr6SzOttjOvME3HQXNk1UmTjuRa6hO-rNswzORGNxFekozirBsV34YkCxqD9UEV8Zr_QrCDKe8Hby-DEFg-bZy4TcMUoNyf5RSuzlf-8jNaJRpbVYRel6pSty1Io0AYzYEuflW"
              />
            </div>
            <div className="absolute -bottom-8 -right-6 h-40 w-40 rounded-full bg-primary-container/20 blur-3xl" />
          </div>

          <div className="order-1 lg:order-2">
            <div className="mb-4 flex items-center gap-4">
              <div className="h-px w-12 bg-primary-container" />
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
                {t.essenceLabel}
              </span>
            </div>
            <h2 className="font-display text-4xl leading-tight text-on-surface md:text-5xl">
              {t.philosophyTitle}
            </h2>
            <p className="mt-6 text-base leading-8 text-on-surface-variant md:text-lg">
              {t.philosophyBodyOne}
            </p>
            <p className="mt-6 text-base leading-8 text-on-surface-variant md:text-lg">
              {t.philosophyBodyTwo}
            </p>

            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <span
                  className="material-symbols-outlined text-4xl text-secondary"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  self_improvement
                </span>
                <h3 className="font-display text-2xl text-on-surface">
                  {t.authenticityTitle}
                </h3>
                <p className="text-sm leading-7 text-on-surface-variant">
                  {t.authenticityBody}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <span
                  className="material-symbols-outlined text-4xl text-secondary"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  diamond
                </span>
                <h3 className="font-display text-2xl text-on-surface">
                  {t.luxuryTitle}
                </h3>
                <p className="text-sm leading-7 text-on-surface-variant">
                  {t.luxuryBody}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="rituals"
        className="relative overflow-hidden bg-surface px-4 py-16 md:px-10 md:py-24 lg:px-20"
      >
        <div className="absolute right-0 top-0 h-80 w-80 rounded-full bg-secondary-container/10 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-10 text-center md:mb-16">
            <span className="block text-xs font-semibold uppercase tracking-[0.28em] text-secondary">
              {t.offeringsLabel}
            </span>
            <h2 className="mt-3 font-display text-4xl leading-tight text-[#3f3200] md:text-5xl">
              {t.offeringsTitle}
            </h2>
          </div>

          <PromoCarousel
            ariaLabelNext="Next offering"
            ariaLabelPrev="Previous offering"
            itemClassName="min-w-[82%] sm:min-w-[70%] lg:min-w-[48%]"
            items={offerings}
            renderItem={(ritual) => (
              <article className="gold-border group relative flex min-h-[430px] overflow-hidden rounded-[1.5rem] bg-surface-container-low shadow-[0_18px_60px_rgba(85,67,0,0.14)] md:rounded-[1.75rem]">
                {ritual.image ? (
                  <>
                    <Image
                      alt={ritual.title}
                      className="object-cover transition duration-700 group-hover:scale-105"
                      fill
                      sizes="(min-width: 1024px) 48vw, 86vw"
                      src={ritual.image}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(27,28,27,0.15),rgba(27,28,27,0.82))]" />
                  </>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.22),transparent_40%),linear-gradient(135deg,#fdf8ef,#f6efe4)]" />
                    <div className="absolute -right-10 top-0 h-40 w-40 rounded-full bg-primary-container/20 blur-2xl transition group-hover:scale-110" />
                  </>
                )}

                <div className="relative z-10 flex w-full flex-col justify-between p-6 md:p-10">
                  <div>
                    {ritual.badge ? (
                      <span
                        className={`mb-4 inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
                          ritual.image
                            ? "border border-white/30 bg-white/15 text-white backdrop-blur-md"
                            : "bg-primary-container text-on-primary-container"
                        }`}
                      >
                        {ritual.badge}
                      </span>
                    ) : null}

                    {!ritual.image ? (
                      <span
                        className="material-symbols-outlined mb-4 block text-4xl text-primary"
                        style={{ fontVariationSettings: '"FILL" 1' }}
                      >
                        {ritual.icon}
                      </span>
                    ) : null}

                    <h3
                      className={`font-display text-3xl leading-tight md:text-4xl ${
                        ritual.image ? "text-white" : "text-on-surface"
                      }`}
                    >
                      {ritual.title}
                    </h3>
                    <p
                      className={`mt-3 max-w-xl text-sm leading-7 md:text-base ${
                        ritual.image ? "text-[#efe8df]" : "text-on-surface-variant"
                      }`}
                    >
                      {ritual.description}
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                    <span
                      className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                        ritual.image ? "text-white/80" : "text-secondary"
                      }`}
                    >
                      {ritual.duration || t.offeringsLabel}
                    </span>
                    <Link
                      aria-label={`View ${ritual.title}`}
                      className={`luxury-action inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-semibold uppercase tracking-[0.2em] sm:w-auto ${
                        ritual.image
                          ? "border border-white/30 bg-white/15 text-white backdrop-blur-md hover:bg-primary-container hover:text-on-primary-container"
                          : "gold-gradient text-on-primary-container hover:brightness-110"
                      }`}
                      href={ritual.href}
                    >
                      {t.offeringsCta}
                      <span className="material-symbols-outlined text-base">
                        arrow_outward
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            )}
          />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
