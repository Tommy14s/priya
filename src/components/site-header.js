"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/components/language-provider";

const navLinks = [
  { href: "/", key: "home", fallback: "Home", match: "home" },
  { href: "/rituals", key: "rituals", fallback: "Rituals", match: "rituals" },
  { href: "/academy", key: "academy", fallback: "Academy", match: "academy" },
  { href: "/experience", key: "experience", fallback: "Experience", match: "experience" },
];

export default function SiteHeader({ current = "home" }) {
  const { shared, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);
  const toggleMenu = () => setIsMenuOpen((open) => !open);

  return (
    <header className="sticky top-0 z-[80] border-b border-outline-variant/40 bg-surface/90 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-10 lg:px-20">
        <Link className="font-display text-3xl leading-none text-secondary md:text-4xl" href="/" onClick={closeMenu}>
          Priya Thai Massage
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = link.match === current;

            return (
              <Link
                key={link.key}
                className={
                  isActive
                    ? "border-b-2 border-secondary pb-1 font-display text-xl text-primary"
                    : "font-display text-xl text-on-surface-variant transition hover:text-secondary"
                }
                href={link.href}
              >
                {shared.nav[link.key] ?? link.fallback}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            className="rounded-full border border-primary/20 bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition hover:border-primary hover:bg-surface-container-low"
            onClick={toggleLanguage}
            type="button"
          >
            {shared.languageButton}
          </button>
          <Link
            className={
              current === "book"
                ? "gold-gradient soft-glow rounded-full px-6 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-on-primary-container ring-1 ring-primary/20"
                : "gold-gradient soft-glow rounded-full px-6 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-on-primary-container transition hover:brightness-110"
            }
            href="/book"
          >
            {shared.bookLabel}
          </Link>
        </div>

        <button
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-controls="mobile-navigation"
          className="relative z-[100] flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-primary/20 bg-surface text-primary transition hover:bg-surface-container-low lg:hidden"
          onClick={toggleMenu}
          type="button"
        >
          <span className="material-symbols-outlined text-3xl">
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {isMenuOpen ? (
        <div className="absolute left-0 right-0 top-full z-[90] border-t border-outline-variant/30 bg-surface shadow-xl lg:hidden">
          <nav id="mobile-navigation" className="mx-auto flex w-full max-w-7xl flex-col px-5 py-4">
            {navLinks.map((link) => {
              const isActive = link.match === current;

              return (
                <Link
                  key={link.key}
                  className={
                    isActive
                      ? "rounded-lg bg-primary-container/20 px-4 py-3 font-display text-2xl text-primary"
                      : "rounded-lg px-4 py-3 font-display text-2xl text-on-surface-variant transition hover:bg-surface-container-low hover:text-secondary"
                  }
                  href={link.href}
                  onClick={closeMenu}
                >
                  {shared.nav[link.key] ?? link.fallback}
                </Link>
              );
            })}
            <div className="mt-4 grid grid-cols-1 gap-3 border-t border-outline-variant/30 pt-4">
              <button
                className="rounded-full border border-primary/20 bg-surface px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-primary transition hover:border-primary hover:bg-surface-container-low"
                onClick={() => {
                  toggleLanguage();
                  closeMenu();
                }}
                type="button"
              >
                {shared.languageButton}
              </button>
              <Link
                className="gold-gradient soft-glow rounded-full px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.24em] text-on-primary-container"
                href="/book"
                onClick={closeMenu}
              >
                {shared.bookLabel}
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
