import "server-only";

import { formatBookingCurrency, getBookingOption } from "@/lib/booking-options";
import { formatTimeSlot } from "@/lib/booking-schedule";

export function getDisplayBooking(booking) {
  const option = getBookingOption(booking.ritualKey, booking.language) || {};

  return {
    ...booking,
    ritualLabel: option.shortLabel || booking.ritualLabel,
    displayPrice:
      option.displayPrice ||
      formatBookingCurrency(booking.amountMinor, booking.currency, booking.language),
    displayTime: formatTimeSlot(booking.preferredTime, booking.language),
  };
}
