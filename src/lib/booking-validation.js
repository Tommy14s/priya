import { getBookingOption } from "@/lib/booking-options";
import { availableTimeSlots } from "@/lib/booking-schedule";

export function normalizeLanguage(language) {
  return language === "sl" ? "sl" : "en";
}

function normalizeString(value) {
  return String(value || "").trim();
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidDateString(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isDateInPast(value) {
  const requestedDate = new Date(`${value}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Number.isNaN(requestedDate.getTime()) || requestedDate < today;
}

export function validateBookingPayload(payload) {
  const language = normalizeLanguage(payload.language);
  const name = normalizeString(payload.name);
  const phone = normalizeString(payload.phone);
  const email = normalizeString(payload.email).toLowerCase();
  const ritual = normalizeString(payload.ritual);
  const date = normalizeString(payload.date);
  const time = normalizeString(payload.time);

  if (!name || !phone || !email || !ritual || !date || !time) {
    return { ok: false, error: "Please complete all required fields." };
  }

  if (!isValidEmail(email)) {
    return { ok: false, error: "Please provide a valid email address." };
  }

  if (!isValidDateString(date) || isDateInPast(date)) {
    return { ok: false, error: "Please choose a valid future date." };
  }

  if (!availableTimeSlots.includes(time)) {
    return { ok: false, error: "Please choose an available time slot." };
  }

  const option = getBookingOption(ritual, language);

  if (!option) {
    return { ok: false, error: "The selected ritual is no longer available." };
  }

  return {
    ok: true,
    value: {
      language,
      name,
      phone,
      email,
      ritual: option,
      date,
      time,
    },
  };
}
