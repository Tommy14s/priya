"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import SiteFooter from "@/components/site-footer";
import SiteHeader from "@/components/site-header";

const courseImages = {
  traditional:
    "https://lh3.googleusercontent.com/aida/ADBb0uhFw7bU_iEncHv9wFDBH21sDFd5yO0BWMl8ctrOuTt-07qEF4J568ciMoI657vJD2EA4fi9IqQQEdmZfrh3sOg7lJwE3Y3qNHSu4LRv1vymXNubdGGL0Wf0jijjtKSssoWmGVUonRG-cSxkQApUEABcDaelv9I1cddY3vAyjd1mjsrf8FfYQKKf93InR25-MygeM4ng0yTHLWfyq-X9MBTQNtI3BBXRqtY1NifnloFCH_sizTm6n-GeVGnT1NVyorz_H82yog-Fqe0",
  oil: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbwdNk6GnCkekmvmo6Lu5NoEcsTp3CVgfcW4QqKrhRdeyuT5TLJ3BfZjvFLBzZOXTpWk6Gay9wzVg6kgboTsQti_gPfPkZja8Xnwss9Q3kYM8tKEhgQv0d1UcUexvdfK2QlbUusfbZgF3AtvHVrp98AtYVQ5zF-a_X9iXEaj-JvXwBFl0nNLCsKvspG_168Av5haUMALRho8tpLuvogjAtC2XyB1t1AP8-dReA9s72qxED7QELplkxCfJ0nTP85dYPj41UnGBO57v_",
  deep: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJ0kbNVxzpsVnGllOL7IUB-rwNLPnJkwWWqY3MobcRSoRZj9fZxAICFAkhncOjFUJNrHAEAonfKtbUhnY1JsXyM8YPXvjgDPY6jK100OZG5xPVGeMR-rRpy4KHCY1w7iJpnj-MlL5wBee-d60nQCi5_faXYr78kaUmMiaLowyvKLsNnBqzUCjhJs2bwmiYRTaPffUzYLAMy-j6OzgFZlGsTkVE_jiSU0IOIjXgzp-GcJWYEk3fvhBC1ktVL9tg1hDYDz6pQeYVU9my",
  stone:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAboc0jI2bw-Ec-6zHZMA-2CYQOCuALU0z4Qdc2fVcV1taRf6JySDNS6Pn63UOxAhH7_unXtQRo4TqMA6-Cxk84qvmPzxDtHtPeiui5qaXr3Vev7oncVHt298kd9rVLvUrCOsx9gl9rbzcW-XtKwOVV45J0JMsIBobTt-Ju-ZckGfGTZJrOJ3i572iU1eNdIBfjCDYD23Fjs2RR7BoLX67GV5ysn8NBZztJv0Tsq0Soim9jHnQPjTprYIUbqbVWTzr6C2AuZkHPV-f2",
};

const copy = {
  en: {
    title: "Massage Courses",
    intro:
      "Master the ancient arts of healing and relaxation. Our academy offers comprehensive training in traditional and modern techniques.",
    pricingTitle: "Duration & Pricing",
    viewDetails: "View Details",
    courses: [
      {
        title: "Traditional Thai Massage",
        category: "Foundational",
        icon: "self_improvement",
        description:
          "Learn the deep stretching and acupressure techniques that form the core of authentic Thai massage. Perfect for beginners seeking a strong foundation.",
        image: courseImages.traditional,
        href: "/rituals/traditional-thai",
      },
      {
        title: "Thai Oil Massage",
        category: "Relaxation",
        icon: "water_drop",
        description:
          "Master the art of combining traditional Thai pressure points with soothing essential oils for a deeply relaxing and hydrating experience.",
        image: courseImages.oil,
        href: "/rituals/thai-oil-massage",
      },
      {
        title: "Deep Tissue",
        category: "Therapeutic",
        icon: "fitness_center",
        description:
          "Focus on realigning deeper layers of muscles and connective tissue. Ideal for chronic aches and pains and contracted areas such as stiff neck and upper back.",
        image: courseImages.deep,
        href: "/rituals/deep-tissue",
      },
      {
        title: "Hot Stone",
        category: "Specialty",
        icon: "volcano",
        description:
          "Learn to incorporate smooth, heated stones into your massage practice to melt away tension, ease muscle stiffness, and increase circulation.",
        image: courseImages.stone,
        href: "/rituals/hot-stone",
      },
    ],
  },
  sl: {
    title: "Masazni Tecaji",
    intro:
      "Obvladajte starodavne umetnosti zdravljenja in sprostitve. Nasa akademija ponuja celovito usposabljanje iz tradicionalnih in sodobnih tehnik.",
    pricingTitle: "Trajanje in Cene",
    viewDetails: "Poglej Podrobnosti",
    courses: [
      {
        title: "Tradicionalna Tajska Masaza",
        category: "Osnovni Tecaj",
        icon: "self_improvement",
        description:
          "Spoznajte globoko raztezanje in akupresurne tehnike, ki tvorijo jedro pristne tajske masaze. Popolno za zacetnike.",
        image: courseImages.traditional,
        href: "/rituals/traditional-thai",
      },
      {
        title: "Tajska Oljna Masaza",
        category: "Sprostitev",
        icon: "water_drop",
        description:
          "Obvladajte povezovanje tradicionalnih tajskih pritiskovnih tock z negovalnimi etericnimi olji za globoko sprostitev.",
        image: courseImages.oil,
        href: "/rituals/thai-oil-massage",
      },
      {
        title: "Globinsko Tkivo",
        category: "Terapevtsko",
        icon: "fitness_center",
        description:
          "Osredotocite se na globlje plasti misic in vezivnega tkiva. Primerno za kronicke bolecine in napetost.",
        image: courseImages.deep,
        href: "/rituals/deep-tissue",
      },
      {
        title: "Vroci Kamni",
        category: "Posebni Program",
        icon: "volcano",
        description:
          "Naucite se vkljuciti gladke, ogrete kamne v svojo prakso za sproscanje napetosti in izboljsanje prekrvavitve.",
        image: courseImages.stone,
        href: "/rituals/hot-stone",
      },
    ],
  },
};

export default function AcademyPageContent() {
  const { language } = useLanguage();
  const t = useMemo(() => copy[language], [language]);

  return (
    <main className="flex min-h-screen flex-col bg-background bg-pattern text-on-background">
      <SiteHeader current="academy" />
      <section className="mx-auto w-full max-w-7xl flex-1 px-5 py-12 md:px-10 lg:px-20">
        <header className="relative mb-16 text-center">
          <h1 className="relative z-10 inline-block font-display text-5xl text-primary md:text-6xl">
            {t.title}
            <span className="absolute -bottom-4 left-1/2 h-1 w-24 -translate-x-1/2 bg-primary-container" />
          </h1>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-on-surface-variant">{t.intro}</p>
        </header>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {t.courses.map((course) => (
            <article key={course.title} className="soft-glow group flex flex-col overflow-hidden rounded-xl border border-primary-container/30 bg-surface-container-lowest transition-colors duration-300 hover:border-primary-container">
              <div className="relative h-64 overflow-hidden">
                <Image alt={`${course.title} training`} className="object-cover transition-transform duration-700 group-hover:scale-105" fill sizes="(min-width: 768px) 50vw, 100vw" src={course.image} />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest to-transparent opacity-60" />
              </div>
              <div className="flex flex-1 flex-col justify-between p-8">
                <div>
                  <div className="mb-3 flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg text-secondary">{course.icon}</span>
                    <span className="text-xs font-semibold uppercase tracking-[0.28em] text-secondary">{course.category}</span>
                  </div>
                  <h2 className="mb-4 font-display text-4xl text-primary">{course.title}</h2>
                  <p className="mb-6 text-base leading-7 text-on-surface-variant">{course.description}</p>
                </div>
                <div className="mt-6 border-t border-outline-variant/20 pt-6">
                  <h3 className="mb-4 text-center text-sm font-semibold uppercase tracking-[0.28em] text-secondary">{t.pricingTitle}</h3>
                  <div className="flex justify-center gap-4 text-center">
                    {["35\u20AC", "49\u20AC", "69\u20AC"].map((price, index) => (
                      <div key={`${course.title}-${price}`} className="min-w-[80px] rounded border border-outline-variant/40 p-3">
                        <div className="mb-1 text-xs font-semibold text-on-surface-variant">{["30 MIN", "50 MIN", "80 MIN"][index]}</div>
                        <div className="font-display text-2xl font-bold text-primary">{price}</div>
                      </div>
                    ))}
                  </div>
                  <Link href={course.href} className="mt-6 block w-full rounded border border-primary bg-surface-container-lowest py-3 text-center text-xs font-semibold uppercase tracking-[0.28em] text-primary transition-colors hover:bg-primary-container/10">
                    {t.viewDetails}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
