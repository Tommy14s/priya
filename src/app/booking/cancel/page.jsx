import BookingStatusPageContent from "@/components/booking-status-page-content";
import { getBookingById } from "@/lib/booking-store";

export const metadata = {
  title: "Checkout Cancelled - Priya Thai Massage",
  description: "Return to the Priya Thai Massage booking flow and try payment again.",
};

export default async function BookingCancelPage(props) {
  const searchParams = await props.searchParams;
  const bookingId =
    typeof searchParams?.booking_id === "string" ? searchParams.booking_id : "";
  const booking = bookingId ? await getBookingById(bookingId) : null;

  return (
    <BookingStatusPageContent
      booking={booking}
      variant="cancel"
    />
  );
}
