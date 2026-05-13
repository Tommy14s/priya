const localeByLanguage = {
  en: "en-IE",
  sl: "sl-SI",
};

const bookingCatalog = [
  {
    key: "traditional-thai-60",
    ritual: "traditional-thai",
    durationMinutes: 60,
    amountMinor: 5900,
    currency: "EUR",
  },
  {
    key: "traditional-thai-90",
    ritual: "traditional-thai",
    durationMinutes: 90,
    amountMinor: 7900,
    currency: "EUR",
    badgeKey: "mostPopular",
  },
  {
    key: "traditional-thai-120",
    ritual: "traditional-thai",
    durationMinutes: 120,
    amountMinor: 9900,
    currency: "EUR",
  },
  {
    key: "thai-oil-30",
    ritual: "thai-oil",
    durationMinutes: 30,
    amountMinor: 3100,
    originalAmountMinor: 3500,
    currency: "EUR",
  },
  {
    key: "thai-oil-50",
    ritual: "thai-oil",
    durationMinutes: 50,
    amountMinor: 4400,
    originalAmountMinor: 4900,
    currency: "EUR",
    badgeKey: "mostRejuvenating",
  },
  {
    key: "thai-oil-80",
    ritual: "thai-oil",
    durationMinutes: 80,
    amountMinor: 6200,
    originalAmountMinor: 6900,
    currency: "EUR",
  },
  {
    key: "deep-tissue-60",
    ritual: "deep-tissue",
    durationMinutes: 60,
    amountMinor: 14500,
    currency: "EUR",
  },
  {
    key: "deep-tissue-90",
    ritual: "deep-tissue",
    durationMinutes: 90,
    amountMinor: 19500,
    currency: "EUR",
    badgeKey: "recommended",
  },
  {
    key: "deep-tissue-120",
    ritual: "deep-tissue",
    durationMinutes: 120,
    amountMinor: 24500,
    currency: "EUR",
  },
  {
    key: "hot-stone-90",
    ritual: "hot-stone",
    durationMinutes: 90,
    amountMinor: 18000,
    currency: "EUR",
  },
  {
    key: "hot-stone-120",
    ritual: "hot-stone",
    durationMinutes: 120,
    amountMinor: 23000,
    currency: "EUR",
    badgeKey: "signature",
  },
];

const localizedRituals = {
  en: {
    "traditional-thai": "Traditional Thai Massage",
    "thai-oil": "Thai Oil Massage",
    "deep-tissue": "Deep Tissue Massage",
    "hot-stone": "Hot Stone Ritual",
  },
  sl: {
    "traditional-thai": "Tradicionalna Tajska Masaza",
    "thai-oil": "Tajska Oljna Masaza",
    "deep-tissue": "Globinska Masaza Tkiva",
    "hot-stone": "Ritual Vrocih Kamnov",
  },
};

const localizedBadges = {
  en: {
    mostPopular: "Most Popular",
    mostRejuvenating: "Most Rejuvenating",
    recommended: "Recommended",
    signature: "Signature",
  },
  sl: {
    mostPopular: "Najbolj Priljubljeno",
    mostRejuvenating: "Najbolj Obnovitveno",
    recommended: "Priporoceno",
    signature: "Podpis Priya",
  },
};

export const defaultBookingByRitual = {
  "traditional-thai": "traditional-thai-90",
  "thai-oil": "thai-oil-50",
  "deep-tissue": "deep-tissue-90",
  "hot-stone": "hot-stone-90",
};

function getLocale(language) {
  return localeByLanguage[language] || localeByLanguage.en;
}

export function formatBookingCurrency(amountMinor, currency = "EUR", language = "en") {
  return new Intl.NumberFormat(getLocale(language), {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amountMinor / 100);
}

function formatDuration(durationMinutes, language) {
  return language === "sl"
    ? `${durationMinutes} Minut`
    : `${durationMinutes} Minutes`;
}

function mapBookingOption(option, language) {
  const ritualName = localizedRituals[language]?.[option.ritual] || localizedRituals.en[option.ritual];
  const badge = option.badgeKey
    ? localizedBadges[language]?.[option.badgeKey] || localizedBadges.en[option.badgeKey]
    : undefined;
  const displayPrice = formatBookingCurrency(option.amountMinor, option.currency, language);
  const originalDisplayPrice = option.originalAmountMinor
    ? formatBookingCurrency(option.originalAmountMinor, option.currency, language)
    : undefined;
  const duration = formatDuration(option.durationMinutes, language);

  return {
    ...option,
    label: `${ritualName} - ${duration}`,
    shortLabel: ritualName,
    duration,
    displayPrice,
    price: displayPrice,
    originalDisplayPrice,
    originalPrice: originalDisplayPrice,
    badge,
  };
}

export const bookingOptions = {
  en: bookingCatalog.map((option) => mapBookingOption(option, "en")),
  sl: bookingCatalog.map((option) => mapBookingOption(option, "sl")),
};

export function normalizeBookingKey(value) {
  return defaultBookingByRitual[value] || value || "";
}

export function getBookingOption(value, language = "en") {
  const normalizedKey = normalizeBookingKey(value);
  const localizedOptions = bookingOptions[language] || bookingOptions.en;
  return localizedOptions.find((option) => option.key === normalizedKey) || null;
}
