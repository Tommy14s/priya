"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";
import SiteHeader from "@/components/site-header";

const copy = {
  en: {
    eyebrow: "Your Sanctuary",
    title: "The Priya Experience",
    intro:
      "Step into a realm of absolute tranquility. A symphony of traditional Thai healing arts designed to elevate your spirit and restore your physical harmony.",
    begin: "Begin Your Journey",
    sensesTitle: "A Journey for the Senses",
    sensesIntro:
      "Every detail at Priya is meticulously curated to engage your senses, guiding you into a state of profound relaxation from the moment you arrive.",
    sensory: [
      ["spa", "Aromatic Scent", "Breathe deeply. Our bespoke blend of lemongrass, jasmine, and warm sandalwood essential oils instantly calms the mind and prepares the body for healing."],
      ["music_note", "Harmonic Sound", "Drift away to the gentle resonance of traditional Thai instruments blended with soft nature sounds, specifically tuned to lower your heart rate."],
      ["pan_tool", "Expert Touch", "Experience the ancient art of Nuad Thai. Our master therapists use rhythmic pressure and deep stretching to release tension and restore vital energy flow."],
    ],
    sanctuaryTitle: "The Sanctuary",
    sanctuaryIntro:
      "A glimpse into our meticulously designed spaces, where traditional Thai elegance meets modern luxury.",
    gallery: "View Full Gallery",
    quoteTitle: "Voices of Serenity",
    quote:
      '"From the moment I crossed the threshold, the chaos of the city vanished. The attention to detail, the soothing ambiance, and the masterful technique of the therapists make Priya a true sanctuary. It is an unmatched healing experience."',
    regularGuest: "Regular Guest",
    ctaTitle: "Ready for your escape?",
    ctaBody:
      "Reserve your sanctuary time today and experience the pinnacle of traditional Thai wellness.",
    ctaButton: "Book Your Escape",
    connect: "Connect",
    legal: "Legal",
    sanctuaryFooter:
      "Sanctuary for the Soul. Traditional Thai healing arts dedicated to your wellness journey.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    contact: "Contact Us",
    careers: "Careers",
    suites: "Private Suites",
    suitesBody: "Exclusive rooms designed for deep restorative rest.",
    purity: "Symbol of Purity",
  },
  sl: {
    eyebrow: "Vase Svetisce",
    title: "Priya Dozivetje",
    intro:
      "Stopite v svet popolnega miru. Simfonija tradicionalnih tajskih zdravilnih umetnosti za obnovo duha in telesa.",
    begin: "Zacnite Svoje Potovanje",
    sensesTitle: "Potovanje za Cutila",
    sensesIntro:
      "Vsaka podrobnost pri Priya je skrbno izbrana, da prebudi vasa cutila in vas uvede v globoko sprostitev.",
    sensory: [
      ["spa", "Aromaticni Vonj", "Nas poseben preplet limonske trave, jasmina in sandalovine takoj umiri um in pripravi telo na zdravljenje."],
      ["music_note", "Harmonicni Zvok", "Prepustite se zvokom tradicionalnih tajskih instrumentov in neznih zvokov narave."],
      ["pan_tool", "Strokovni Dotik", "Dozivite starodavno umetnost Nuad Thai z ritmicnim pritiskom in globokim raztezanjem."],
    ],
    sanctuaryTitle: "Svetisce",
    sanctuaryIntro:
      "Vpogled v nase skrbno zasnovane prostore, kjer se tajska eleganca sreca s sodobnim razkosjem.",
    gallery: "Poglej Galerijo",
    quoteTitle: "Glasovi Miru",
    quote:
      '"Od trenutka, ko sem prestopila prag, je mestni hrup izginil. Pozornost do podrobnosti, pomirjujoce vzdusje in izjemna tehnika terapevtov naredijo Priya pravo svetisce."',
    regularGuest: "Redna Gostja",
    ctaTitle: "Ste pripravljeni na oddih?",
    ctaBody: "Rezervirajte svoj cas v svetiscu in dozivite vrhunec tradicionalnega tajskega dobrega pocutja.",
    ctaButton: "Rezervirajte Oddih",
    connect: "Povezava",
    legal: "Pravno",
    sanctuaryFooter: "Svetisce za duso. Tradicionalne tajske zdravilne umetnosti za vase dobro pocutje.",
    privacy: "Politika Zasebnosti",
    terms: "Pogoji Uporabe",
    contact: "Kontakt",
    careers: "Kariera",
    suites: "Zasebne Sobe",
    suitesBody: "Ekskluzivne sobe za globok in obnovitven pocitek.",
    purity: "Simbol Cistosti",
  },
};

const galleryImages = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD49LQZVjnexN9cQjFqZMtkU6bGF5Z1KAWLMCxnSX0i8I0GxhvtxYp2IBWR-XyAxWF1Zq5EZSsIR3d56Pg3tg5La9BTRnpJw4gEIhI5HVBSjwcYur09UU6etJAiViqWh8d6UKQ20XVCgh7tGXjq3l9waUIOyfwGyagj2K-5-omMaCFr6PMjLmliUIGpVDBvOVUSdVybJHNJOrNyv0bp0LfpDuBX3CKN6bmmwa3ianBxiZgfFV-1LXMK8-J94UF5KoOmsLwDAs2hockE",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAuxFsIjvcL16LwEX_VQzv-WX8HblyiFp8EzZJbJGoPp4I6g0gS5W4BGufbbQOjrx8_pdM9LdHaLELw6Jy-aXvv4S9vxMnuruJLw1rzIO6NhM8Fn3zuj8ZtTNx9Vd6F9mvPrlXs6sY3L_f7YVASz9dOpdCEIZv0G9fbj0ha0wOA-Ihz3EFf5N5mGkcOSku0twbau4rV1ktyq4TCx3xqEPSSl7hjOZ0ndEVqqEou_HtrSHt_Lo6-A3_crf1Y5GAzjSy6vV66uqwpqZxu",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDBTMZ8AEb_FyMFFIMiRalIBqgfLk16jsWoPr84NfUg84rTKQefI96w70UkuU6rBfNC65W4zhzS2e-Of9JFm-lKPXUdkebJpH87MQhJOlsw-g2U5OLLD9MagCvUHjgGk4ucHKO0qtrr5nCSao-vs-bPXVzfALWIwFYFkQfjQmdoESU86yywnXYdDNQBOXpTs67emYW1WiTkULVOwNNlG12HaWcA9nxXpTYkyzGXyaJv2oEO7L4YDoqYtNK5XPSFqjyX9CTyAl84YpdN",
];

export default function ExperiencePageContent() {
  const { language } = useLanguage();
  const t = useMemo(() => copy[language], [language]);

  return (
    <main className="bg-surface text-on-surface">
      <SiteHeader current="experience" />
      <section className="relative flex min-h-[716px] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image alt="Luxurious Thai spa interior with warm ambient lighting" className="object-cover" fill priority sizes="100vw" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGwubjR3LBBQ06YxB27lL540Eu7AK9My0ItfHfHEuafg3wlDfj0AGqN9qomz2-Wn1bzjcL_grEKfRz4Ny39oK0p2IoA_8DOVJmqfMDB489HR4ghgw7M-r3lokV2Mg-wVk66r_HVtaxi3TTH4XAzGZ7nj-Wh2C92fmJzuAUOeDTc3JMpH8TrqSkNT1yzzSRsFZbmjZO0Zb9UuOPMbuCJAsqvQdT3z8deitn7Rf6_0z0gEryiPwf2L5EvVXIHppn6aa-b_gzmSxSU8TY" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-surface" />
        </div>
        <div className="relative z-10 mx-auto mt-20 max-w-4xl px-5 text-center md:px-10 lg:px-20">
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.2em] text-[#ffe8a8] drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">{t.eyebrow}</span>
          <h1 className="mb-6 font-display text-5xl text-[#fff5dd] drop-shadow-[0_4px_18px_rgba(0,0,0,0.7)] md:text-6xl">{t.title}</h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-[#f3e9d3] drop-shadow-[0_3px_12px_rgba(0,0,0,0.75)]">{t.intro}</p>
          <Link className="gold-gradient soft-glow inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-on-primary-container transition-all hover:scale-105 hover:opacity-90" href="/book">{t.begin}<span className="material-symbols-outlined text-[18px]">arrow_forward</span></Link>
        </div>
      </section>
      <section className="relative overflow-hidden bg-surface px-5 py-24 md:px-10 lg:px-20">
        <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5" />
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-display text-4xl text-primary md:text-5xl">{t.sensesTitle}</h2>
            <div className="mx-auto mb-6 h-px w-16 bg-primary-container" />
            <p className="mx-auto max-w-2xl text-base leading-7 text-on-surface-variant">{t.sensesIntro}</p>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {t.sensory.map(([icon, title, description]) => (
              <article key={title} className="group relative overflow-hidden rounded-[1rem] border border-outline-variant/30 bg-surface-container-lowest p-8 text-center transition-all duration-500 hover:-translate-y-2">
                <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-transparent via-primary-container to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container-low text-primary transition-colors duration-300 group-hover:bg-primary-container group-hover:text-on-primary-container">
                  <span className="material-symbols-outlined text-[32px]">{icon}</span>
                </div>
                <h3 className="mb-3 font-display text-2xl text-secondary">{title}</h3>
                <p className="text-base leading-7 text-on-surface-variant">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="border-y border-outline-variant/20 bg-surface-container-low px-5 py-24 md:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 className="mb-2 font-display text-4xl text-primary md:text-5xl">{t.sanctuaryTitle}</h2>
              <p className="max-w-xl text-base leading-7 text-on-surface-variant">{t.sanctuaryIntro}</p>
            </div>
            <Link className="flex items-center gap-1 border-b border-secondary pb-1 text-xs font-semibold uppercase tracking-[0.2em] text-secondary transition-colors hover:text-primary" href="/book">{t.gallery}<span className="material-symbols-outlined text-[16px]">arrow_forward</span></Link>
          </div>
          <div className="grid grid-cols-1 gap-4 md:h-[600px] md:grid-cols-4 md:gap-6">
            <article className="gold-border group relative overflow-hidden rounded-[1rem] md:col-span-2 md:row-span-2">
              <Image alt="Lotus" className="object-cover transition-transform duration-700 group-hover:scale-105" fill sizes="(min-width: 768px) 50vw, 100vw" src={galleryImages[0]} />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"><span className="font-display text-2xl text-white">{t.purity}</span></div>
            </article>
            <article className="gold-border group relative overflow-hidden rounded-[1rem] md:col-span-2"><Image alt="Setup" className="object-cover transition-transform duration-700 group-hover:scale-105" fill sizes="(min-width: 768px) 50vw, 100vw" src={galleryImages[1]} /></article>
            <article className="gold-border group relative overflow-hidden rounded-[1rem]"><Image alt="Corridor" className="object-cover transition-transform duration-700 group-hover:scale-105" fill sizes="(min-width: 768px) 25vw, 100vw" src={galleryImages[2]} /></article>
            <article className="soft-glow flex flex-col items-center justify-center rounded-[1rem] bg-primary-container p-6 text-center"><span className="material-symbols-outlined mb-4 text-[48px] text-on-primary-container">self_care</span><h3 className="mb-2 font-display text-2xl text-on-primary-container">{t.suites}</h3><p className="text-sm leading-6 text-on-primary-container/80">{t.suitesBody}</p></article>
          </div>
        </div>
      </section>
      <section className="relative bg-surface px-5 py-24 md:px-10 lg:px-20">
        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rotate-180 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-5" />
        <div className="mx-auto max-w-4xl text-center">
          <span className="material-symbols-outlined mb-6 text-[40px] text-primary-container">format_quote</span>
          <h2 className="mb-12 font-display text-4xl text-primary md:text-5xl">{t.quoteTitle}</h2>
          <div className="soft-glow relative rounded-[1.5rem] border border-outline-variant/30 bg-surface-container-lowest p-8 md:p-12">
            <p className="mb-8 font-display text-2xl italic leading-relaxed text-secondary">{t.quote}</p>
            <div className="flex items-center justify-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-full border border-primary-container bg-surface-container-high"><Image alt="Portrait of a satisfied spa guest" className="h-full w-full object-cover" height={48} width={48} src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1rbU7UvTC17fRjwn3T0V8lQFqSLAVMO3bgQoBwnDnbbviYPo1Jt65h-HswlR2JJzO5260zqIqr22DeX_yEn3qMdT-q7i7bIk-zLfgJDrD98RTs_iTqRihVP0fKOiLzlMcFRnWYx1dBIGDyfTa05zM-Qo6eLCE8IZeJScwzle5dSgruKFg93BzrW75v04S_EPGztmjVH0sfxO-rk3OWeXLG3X7sAxL8ujKUBDE6L6QHxtLbYwdxN5LXpBPf2TTN6YeCv6ZYVNed3b9" /></div>
              <div className="text-left"><h4 className="text-sm font-semibold tracking-wider text-on-surface">Elena R.</h4><span className="text-sm text-on-surface-variant">{t.regularGuest}</span></div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative overflow-hidden border-t border-outline-variant/30 bg-surface-dim py-20 text-center">
        <div className="relative z-10 mx-auto max-w-2xl px-5">
          <h2 className="mb-4 font-display text-5xl text-primary">{t.ctaTitle}</h2>
          <p className="mb-8 text-lg leading-8 text-on-surface-variant">{t.ctaBody}</p>
          <Link className="gold-gradient soft-glow inline-flex rounded-full px-10 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-on-primary-container shadow-lg shadow-primary-container/20 transition-all hover:-translate-y-1 hover:opacity-90" href="/book">{t.ctaButton}</Link>
        </div>
      </section>
      <footer className="grid w-full grid-cols-1 gap-8 border-t-2 border-primary-container/20 bg-surface-container-low px-5 py-16 md:grid-cols-3 md:px-10 lg:px-20">
        <div><div className="mb-4 font-display text-3xl text-primary">Priya Thai Massage</div><p className="max-w-sm text-base leading-7 text-on-surface-variant">{t.sanctuaryFooter}</p></div>
        <div className="flex flex-col gap-3"><h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">{t.connect}</h4><a className="inline-flex items-center gap-2 text-base text-on-surface-variant transition-colors hover:text-primary" href="tel:+38669614798"><span className="material-symbols-outlined text-[20px]">call</span>+386 696 14798</a><a className="inline-flex items-center gap-2 text-base text-on-surface-variant transition-colors hover:text-primary" href="https://maps.google.com/?q=Kolodvorska+cesta+1,+Domzale" rel="noreferrer" target="_blank"><span className="material-symbols-outlined text-[20px]">location_on</span>Kolodvorska cesta 1, Domzale</a></div>
        <div className="flex flex-col gap-3"><h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.28em] text-secondary">{t.legal}</h4><Link className="text-base text-on-surface-variant transition-colors hover:text-primary" href="#">{t.privacy}</Link><Link className="text-base text-on-surface-variant transition-colors hover:text-primary" href="#">{t.terms}</Link><Link className="text-base text-on-surface-variant transition-colors hover:text-primary" href="/book">{t.contact}</Link><Link className="text-base text-on-surface-variant transition-colors hover:text-primary" href="#">{t.careers}</Link></div>
        <div className="border-outline-variant/20 text-on-surface-variant/70 md:col-span-3 mt-8 border-t pt-8 text-center text-base">{"\u00A9"} 2024 Priya Thai Massage. Sanctuary for the Soul.</div>
      </footer>
    </main>
  );
}
