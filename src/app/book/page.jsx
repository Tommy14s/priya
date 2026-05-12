import BookPageContent from "@/components/book-page-content";

export const metadata = {
  title: "Book an Appointment - Priya Thai Massage",
  description: "Reserve your Thai massage ritual at Priya Thai Massage.",
};

export default async function BookPage({ searchParams }) {
  const params = await searchParams;
  const ritual = typeof params?.ritual === "string" ? params.ritual : "";

  return <BookPageContent initialRitual={ritual} />;
}
