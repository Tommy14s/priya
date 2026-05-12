"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext(null);

const sharedCopy = {
  en: {
    nav: {
      home: "Home",
      rituals: "Rituals",
      academy: "Academy",
      experience: "Experience",
    },
    bookLabel: "Book Now",
    languageButton: "Slovenski",
    footer: {
      title: "Priya Thai Massage",
      description: "A sanctuary for the soul. Experience authentic luxury and traditional healing.",
      navigationTitle: "Navigation",
      visitTitle: "Visit Us",
      privacyLabel: "Privacy Policy",
      termsLabel: "Terms of Service",
      contactLabel: "Contact Us",
      careersLabel: "Careers",
      copyright: "\u00A9 2024 Priya Thai Massage. Sanctuary for the Soul.",
    },
  },
  sl: {
    nav: {
      home: "Domov",
      rituals: "Rituali",
      academy: "Akademija",
      experience: "Dozivetje",
    },
    bookLabel: "Rezerviraj",
    languageButton: "English",
    footer: {
      title: "Priya Thai Massage",
      description: "Svetisce za duso. Dozivite pristno razkosje in tradicionalno zdravljenje.",
      navigationTitle: "Navigacija",
      visitTitle: "Obiscite Nas",
      privacyLabel: "Politika Zasebnosti",
      termsLabel: "Pogoji Uporabe",
      contactLabel: "Kontakt",
      careersLabel: "Kariera",
      copyright: "\u00A9 2024 Priya Thai Massage. Svetisce za duso.",
    },
  },
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") {
      return "en";
    }

    const savedLanguage = window.localStorage.getItem("priya-language");
    return savedLanguage === "sl" || savedLanguage === "en" ? savedLanguage : "en";
  });

  useEffect(() => {
    window.localStorage.setItem("priya-language", language);
    document.documentElement.lang = language === "sl" ? "sl" : "en";
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage((current) => (current === "en" ? "sl" : "en")),
      shared: sharedCopy[language],
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }

  return context;
}
