"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { bookingOptions } from "@/lib/booking-options";
import { useLanguage } from "@/components/language-provider";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

const rituals = [
  {
    key: "traditional-thai",
    href: "/rituals/traditional-thai",
    bookHref: "/book?ritual=traditional-thai-90",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBM9iip9t7Qm1re7l7IeuWxEpbgzeDUiUTezzQ_Ek86VYYIVTkACvuGCC4zBKObq7BKxfAH_ZUfXKMoHifswhbK1ledUUukxpqo5VEvOnHv-Qn45hYdgcuZQ_Y1t2ZsusMpZsgSAROUVyvHu6kU0Fo1N91JHWJiR3nvbSbro83922Vdvsmbh_HtUq-9mb1Kwp5ejUwmKnw_KHU5gvNS71fl6lz1dipMX-q44LIdSZr6ssWhY-WmBgR6tJ21-U4G6B4YVSqYu2vmLuCe",
  },
  {
    key: "thai-oil",
    href: "/rituals/thai-oil-massage",
    bookHref: "/book?ritual=thai-oil-50",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAjCB99xXvWHU7muAO1Ponfb996H_fvX4Yl0DZFm8sQltsgb0LlQaIOR2VwMeFXn4P0_7JKX68LC5UkVx6FfsJ-ATWGfd06nLrL1-sFcEtJLdDlg9jogJkAfK21xgiXlXhB04cve2JbDHOzHpvBTf5IbuwBDyU4EE0AlnlLOQGovBDWzNo5YKeaOXrE-sn9xm-PCPX1sA0nJ2kdm3rvZVIcugSYaS0-XO8gwzsx-u8t5LmXrwo1gNVF2PZeSBoS9qj3oMDJpD7hSKW2",
  },
  {
    key: "deep-tissue",
    href: "/rituals/deep-tissue",
    bookHref: "/book?ritual=deep-tissue-90",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuApYoyRhV07y-ASuwIF_wG51Wgg32tTWSIrOr56QYv45hkuUD4zrZSykAAdGHJ8sTr65z65svHSJYwRxFfahjbzXMbdnnV10cdku3PHQTDZN7r5rX1GACDiun3EnhZ18EA4WWOzAR_n0EeUZjWnKOFXabEJYHlX-_evoofdcZKc3ZIEL0vxlTgHvVx0nqCBTCtCCsdVo7qahYhBCGsicHAsXGvERpcDZtfveheSapbs6UqTA3inTyIsm8dDZtLhP1cwevBD9Pabv_6Z",
  },
  {
    key: "hot-stone",
    href: "/rituals/hot-stone",
    bookHref: "/book?ritual=hot-stone-90",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCKBjgqWbSgTEhf1L7F_btFL-U5TWOKRLTP9P6RsAno8xXL63gXDo8I_3xKS6-YRPgQ6jFI74ioB0SBkGfp9dw803ukwiXT33KUFKrd2_w8sRDYpE_aXUt1DSwMP9jXw8qR1U-oJQS1rex9LFyerOQ7CxXeGnfynuPX5MmB1O3nUr6_w6_ocW-8W0eJK7V9zAikhQ2JUO5mZ4t4JTIqWeZARTmh26rr9WFHNFeqHHvjKTnbqkVoPNYZXRRqVt1HNJ15k8r3YJVikrIc",
  },
];

const copy = {
  en: {
    eyebrow: "Choose Your Course",
    title: "Rituals Menu",
    intro:
      "Browse each treatment, compare the starting price, then open the detail page to choose the duration that fits your visit.",
    from: "From",
    durations: "Durations",
    details: "View Details",
    book: "Book",
    highlights: {
      "traditional-thai": "Deep stretching, acupressure, and classic Thai energy line work.",
      "thai-oil": "Warm botanical oils with flowing pressure for calm, glow, and rest.",
      "deep-tissue": "Focused therapeutic pressure for chronic tension and structural relief.",
      "hot-stone": "Heated basalt stones for deep warmth, circulation, and full-body release.",
    },
  },
  sl: {
    eyebrow: "Izberite Svoj Tečaj",
    title: "Meni Ritualov",
    intro:
      "Preglejte terapije, primerjajte začetno ceno in odprite podrobnosti za izbiro trajanja obiska.",
    from: "Od",
    durations: "Trajanja",
    details: "Podrobnosti",
    book: "Rezerviraj",
    highlights: {
      "traditional-thai": "Globoko raztezanje, akupresura in tradicionalno delo po energijskih linijah.",
      "thai-oil": "Topla botanicna olja in tekoči pritisk za mir, sijaj in počitek.",
      "deep-tissue": "Usmerjen terapevtski pritisk za kronično napetost in olajšanje.",
      "hot-stone": "Segreti bazaltni kamni za globoko toploto, cirkulacijo in sprostitev.",
    },
  },
};

function getRitualSummary(ritualKey, language) {
  const options = (bookingOptions[language] || bookingOptions.en).filter(
    (option) => option.ritual === ritualKey,
  );
  const lowestOption = options.reduce(
    (lowest, option) => (option.amountMinor < lowest.amountMinor ? option : lowest),
    options[0],
  );

  return {
    title: options[0]?.shortLabel || ritualKey,
    fromPrice: lowestOption?.displayPrice || "",
    durations: options.map((option) => `${option.durationMinutes}m`).join(" / "),
  };
}

export default function RitualsPageContent() {
  const { language } = useLanguage();
  const t = copy[language] || copy.en;
  const courses = useMemo(
    () =>
      rituals.map((ritual) => ({
        ...ritual,
        ...getRitualSummary(ritual.key, language),
        highlight: t.highlights[ritual.key],
      })),
    [language, t],
  );

  return (
    <main className="min-h-screen bg-background text-on-background">
      <SiteHeader current="rituals" />

      <section className="bg-[linear-gradient(180deg,#fffdf8_0%,#fcf9f8_44%,#f6f3f2_100%)] px-4 pb-16 pt-10 md:px-10 md:pb-24 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 md:mb-12">
            <p className="inline-flex rounded-full border border-primary-container/40 bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-secondary shadow-sm">
              {t.eyebrow}
            </p>
            <h1 className="mt-4 font-display text-5xl leading-tight text-[#3f3200] md:text-6xl">
              {t.title}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#4a4334] md:text-lg">
              {t.intro}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {courses.map((course) => (
              <article
                key={course.key}
                className="luxury-action gold-border overflow-hidden rounded-3xl bg-surface-container-lowest shadow-[0_18px_55px_rgba(85,67,0,0.12)]"
              >
                <Link className="block" href={course.href}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      alt={course.title}
                      className="object-cover transition duration-700 hover:scale-105"
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
                      src={course.image}
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="font-display text-3xl leading-tight text-white">
                        {course.title}
                      </p>
                    </div>
                  </div>
                </Link>

                <div className="p-5">
                  <p className="min-h-[72px] text-sm leading-6 text-on-surface-variant">
                    {course.highlight}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-primary-container/10 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-outline">
                        {t.from}
                      </p>
                      <p className="mt-1 font-display text-3xl text-primary">
                        {course.fromPrice}
                      </p>
                    </div>
                    <div className="rounded-2xl bg-surface-container-low p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-outline">
                        {t.durations}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-on-surface">
                        {course.durations}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <Link
                      className="luxury-action rounded-full border border-primary/20 px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-primary"
                      href={course.href}
                    >
                      {t.details}
                    </Link>
                    <Link
                      className="luxury-action gold-gradient rounded-full px-4 py-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-on-primary-container"
                      href={course.bookHref}
                    >
                      {t.book}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
