export const runtime = "nodejs";

export async function POST() {
  return Response.json(
    {
      error: "This endpoint has been replaced by /api/bookings/create-checkout.",
    },
    { status: 410 },
  );
}
