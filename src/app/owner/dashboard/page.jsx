import OwnerDashboardContent from "@/components/owner-dashboard-content";
import { getAllBookings } from "@/lib/booking-store";
import { getDisplayBooking } from "@/lib/booking-presenters";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Owner Dashboard - Priya Thai Massage",
  description: "Owner booking and finance summary for Priya Thai Massage.",
};

function groupBookingsByDate(bookings) {
  const grouped = new Map();

  for (const booking of bookings) {
    const bucket = grouped.get(booking.preferredDate) || [];
    bucket.push(booking);
    grouped.set(booking.preferredDate, bucket);
  }

  return [...grouped.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([date, entries]) => ({
      date,
      bookings: entries.sort((left, right) => left.preferredTime.localeCompare(right.preferredTime)),
    }));
}

function isUpcomingConfirmedBooking(booking) {
  if (booking.bookingStatus !== "confirmed") {
    return false;
  }

  const bookingDateTime = new Date(`${booking.preferredDate}T${booking.preferredTime}:00`);
  return Number.isNaN(bookingDateTime.getTime()) || bookingDateTime >= new Date();
}

export default async function OwnerDashboardPage() {
  let bookings = [];
  let loadError = "";

  try {
    bookings = (await getAllBookings()).map(getDisplayBooking);
  } catch {
    loadError = "Bookings could not be loaded. Check the database connection and Prisma schema.";
  }

  const paidBookings = bookings.filter((booking) => booking.paymentStatus === "paid");
  const pendingBookings = bookings.filter((booking) => booking.paymentStatus === "unpaid");
  const confirmedBookings = bookings.filter((booking) => booking.bookingStatus === "confirmed");
  const upcomingBookings = bookings.filter(isUpcomingConfirmedBooking);
  const attentionBookings = bookings.filter(
    (booking) =>
      booking.needsManualReview ||
      booking.ownerNotificationError ||
      booking.paymentStatus === "failed" ||
      booking.paymentStatus === "expired",
  );

  const metrics = {
    totalCount: bookings.length,
    paidCount: paidBookings.length,
    pendingCount: pendingBookings.length,
    confirmedCount: confirmedBookings.length,
    attentionCount: attentionBookings.length,
    ownerNotifiedCount: bookings.filter((booking) => booking.ownerNotificationSentAt).length,
    paidRevenueMinor: paidBookings.reduce((total, booking) => total + booking.amountMinor, 0),
    pendingRevenueMinor: pendingBookings.reduce((total, booking) => total + booking.amountMinor, 0),
    averageOrderMinor:
      paidBookings.length > 0
        ? Math.round(paidBookings.reduce((total, booking) => total + booking.amountMinor, 0) / paidBookings.length)
        : 0,
  };

  return (
    <OwnerDashboardContent
      attentionBookings={attentionBookings.slice(0, 6)}
      bookingsByDate={groupBookingsByDate(upcomingBookings)}
      loadError={loadError}
      metrics={metrics}
      recentBookings={bookings.slice(0, 12)}
    />
  );
}
