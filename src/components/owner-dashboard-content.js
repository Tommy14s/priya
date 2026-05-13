import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import LogoutButton from "@/components/logout-button";

function formatEuro(amountMinor) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amountMinor / 100);
}

function formatDate(value) {
  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IE", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function statusTone(status) {
  switch (status) {
    case "paid":
    case "confirmed":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "unpaid":
    case "pending_payment":
      return "border-amber-200 bg-amber-50 text-amber-700";
    case "failed":
    case "expired":
    case "cancelled":
      return "border-red-200 bg-red-50 text-red-700";
    default:
      return "border-outline-variant/60 bg-surface text-on-surface-variant";
  }
}

function StatusPill({ children, status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ${statusTone(status)}`}
    >
      {children}
    </span>
  );
}

function EmptyState({ children }) {
  return (
    <div className="rounded-lg border border-dashed border-outline-variant/70 bg-surface px-4 py-5 text-sm text-on-surface-variant">
      {children}
    </div>
  );
}

function MetricCard({ label, value, detail, tone = "primary" }) {
  const valueClass = tone === "danger" ? "text-red-700" : "text-primary";

  return (
    <article className="rounded-lg border border-outline-variant/50 bg-surface-container-lowest p-4 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-outline">
        {label}
      </p>
      <p className={`mt-3 font-display text-4xl leading-none ${valueClass}`}>
        {value}
      </p>
      {detail ? (
        <p className="mt-2 text-sm leading-6 text-on-surface-variant">{detail}</p>
      ) : null}
    </article>
  );
}

function AttentionList({ bookings }) {
  return (
    <section className="rounded-lg border border-outline-variant/50 bg-surface-container-lowest p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl leading-none text-[#3f3200]">
            Needs Attention
          </h2>
          <p className="mt-2 text-sm text-on-surface-variant">
            Payments, manual review, or owner notification issues.
          </p>
        </div>
        <span className="material-symbols-outlined text-2xl text-secondary">
          priority_high
        </span>
      </div>

      <div className="mt-5 space-y-3">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="rounded-lg border border-outline-variant/40 bg-surface p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="font-semibold text-on-surface">{booking.customerName}</p>
                <p className="mt-1 text-sm text-on-surface-variant">
                  {booking.ritualLabel} | {formatDate(booking.preferredDate)} | {booking.displayTime}
                </p>
              </div>
              <StatusPill status={booking.paymentStatus}>
                {booking.paymentStatus}
              </StatusPill>
            </div>
            {booking.adminNotes || booking.ownerNotificationError ? (
              <p className="mt-3 rounded-md bg-red-50 px-3 py-2 text-xs leading-5 text-red-700">
                {booking.adminNotes || booking.ownerNotificationError}
              </p>
            ) : null}
          </div>
        ))}
        {bookings.length === 0 ? (
          <EmptyState>No bookings need manual attention right now.</EmptyState>
        ) : null}
      </div>
    </section>
  );
}

function UpcomingSchedule({ bookingsByDate }) {
  return (
    <section className="rounded-lg border border-outline-variant/50 bg-surface-container-lowest p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl leading-none text-[#3f3200]">
            Upcoming Schedule
          </h2>
          <p className="mt-2 text-sm text-on-surface-variant">
            Confirmed appointments grouped by date.
          </p>
        </div>
        <span className="material-symbols-outlined text-2xl text-secondary">
          calendar_month
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {bookingsByDate.map((group) => (
          <div key={group.date} className="rounded-lg border border-outline-variant/40 bg-surface">
            <div className="flex items-center justify-between gap-4 border-b border-outline-variant/30 px-4 py-3">
              <h3 className="font-semibold text-on-surface">{formatDate(group.date)}</h3>
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-outline">
                {group.bookings.length} bookings
              </span>
            </div>

            <div className="divide-y divide-outline-variant/30">
              {group.bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="grid grid-cols-[72px,1fr] gap-3 px-4 py-3"
                >
                  <p className="rounded-md bg-primary-container/10 px-2 py-2 text-center font-semibold text-primary">
                    {booking.displayTime}
                  </p>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-semibold text-on-surface">{booking.customerName}</p>
                      <span className="text-sm text-outline">{booking.displayPrice}</span>
                    </div>
                    <p className="mt-1 text-sm text-on-surface-variant">
                      {booking.ritualLabel} | {booking.durationMinutes} min
                    </p>
                    <p className="mt-1 break-all text-xs text-outline">
                      {booking.phone} | {booking.email}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        {bookingsByDate.length === 0 ? (
          <EmptyState>No confirmed upcoming bookings yet.</EmptyState>
        ) : null}
      </div>
    </section>
  );
}

function RecentOrdersTable({ bookings }) {
  return (
    <section className="rounded-lg border border-outline-variant/50 bg-surface-container-lowest p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl leading-none text-[#3f3200]">
            Recent Orders
          </h2>
          <p className="mt-2 text-sm text-on-surface-variant">
            Latest booking attempts from the live checkout flow.
          </p>
        </div>
        <span className="material-symbols-outlined text-2xl text-secondary">
          receipt_long
        </span>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-outline-variant/50 text-xs uppercase tracking-[0.12em] text-outline">
              <th className="py-3 pr-4 font-semibold">Customer</th>
              <th className="py-3 pr-4 font-semibold">Appointment</th>
              <th className="py-3 pr-4 font-semibold">Amount</th>
              <th className="py-3 pr-4 font-semibold">Payment</th>
              <th className="py-3 pr-4 font-semibold">Booking</th>
              <th className="py-3 font-semibold">Owner Alert</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30">
            {bookings.map((booking) => (
              <tr key={booking.id} className="align-top">
                <td className="py-4 pr-4">
                  <p className="font-semibold text-on-surface">{booking.customerName}</p>
                  <p className="mt-1 break-all text-xs text-outline">{booking.email}</p>
                  <p className="mt-1 text-xs text-outline">{booking.phone}</p>
                </td>
                <td className="py-4 pr-4">
                  <p className="font-semibold text-on-surface">{booking.ritualLabel}</p>
                  <p className="mt-1 text-xs text-on-surface-variant">
                    {formatDate(booking.preferredDate)} | {booking.displayTime}
                  </p>
                </td>
                <td className="py-4 pr-4 font-semibold text-primary">
                  {booking.displayPrice}
                </td>
                <td className="py-4 pr-4">
                  <StatusPill status={booking.paymentStatus}>
                    {booking.paymentStatus}
                  </StatusPill>
                </td>
                <td className="py-4 pr-4">
                  <StatusPill status={booking.bookingStatus}>
                    {booking.bookingStatus}
                  </StatusPill>
                </td>
                <td className="py-4">
                  {booking.ownerNotificationSentAt ? (
                    <StatusPill status="confirmed">sent</StatusPill>
                  ) : booking.ownerNotificationError ? (
                    <StatusPill status="failed">failed</StatusPill>
                  ) : (
                    <StatusPill status="pending_payment">pending</StatusPill>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bookings.length === 0 ? (
        <div className="mt-5">
          <EmptyState>No bookings have been created yet.</EmptyState>
        </div>
      ) : null}
    </section>
  );
}

export default function OwnerDashboardContent({
  attentionBookings = [],
  metrics,
  bookingsByDate,
  recentBookings,
  loadError = "",
}) {
  return (
    <main className="min-h-screen bg-background text-on-background">
      <SiteHeader current="book" />

      <section className="border-b border-outline-variant/40 bg-surface px-4 py-8 md:px-10 lg:px-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-secondary">
              Owner Dashboard
            </p>
            <h1 className="mt-3 font-display text-5xl leading-none text-[#3f3200] md:text-6xl">
              Orders and Finance
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-on-surface-variant">
              Paid bookings, upcoming appointments, revenue, and booking issues from the live checkout flow.
            </p>
          </div>
          <LogoutButton />
        </div>
      </section>

      <section className="px-4 py-8 md:px-10 lg:px-20">
        <div className="mx-auto max-w-7xl space-y-6">
          {loadError ? (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {loadError}
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <MetricCard
              detail={`${metrics.confirmedCount} confirmed`}
              label="Total Orders"
              value={metrics.totalCount}
            />
            <MetricCard
              detail="Successful payments"
              label="Paid Orders"
              value={metrics.paidCount}
            />
            <MetricCard
              detail={`${formatEuro(metrics.averageOrderMinor)} average order`}
              label="Paid Revenue"
              value={formatEuro(metrics.paidRevenueMinor)}
            />
            <MetricCard
              detail={formatEuro(metrics.pendingRevenueMinor)}
              label="Pending Payment"
              value={metrics.pendingCount}
            />
            <MetricCard
              detail={`${metrics.ownerNotifiedCount} alerts sent`}
              label="Attention"
              tone={metrics.attentionCount > 0 ? "danger" : "primary"}
              value={metrics.attentionCount}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[0.95fr,1.25fr]">
            <AttentionList bookings={attentionBookings} />
            <UpcomingSchedule bookingsByDate={bookingsByDate} />
          </div>

          <RecentOrdersTable bookings={recentBookings} />
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
