import Link from "next/link";

export default function PriceOptionSelector({
  options,
  reserveLabel,
  getTitle,
  getSubtitle,
  getPrice,
  getOriginalPrice,
  getBadge,
  getHref,
}) {
  return (
    <div className="grid gap-3 md:hidden">
      {options.map((option, index) => {
        const title = getTitle(option, index);
        const subtitle = getSubtitle?.(option, index);
        const price = getPrice(option, index);
        const originalPrice = getOriginalPrice?.(option, index);
        const badge = getBadge?.(option, index);

        return (
          <Link
            key={option.bookingKey || option.key || title}
            className={`luxury-action group rounded-3xl border bg-surface-container-lowest p-4 shadow-[0_16px_45px_rgba(85,67,0,0.12)] ${
              badge
                ? "border-primary-container ring-2 ring-primary-container/25"
                : "border-outline-variant/50"
            }`}
            href={getHref(option, index)}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                {badge ? (
                  <span className="mb-2 inline-flex rounded-full bg-primary-container px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-on-primary-container">
                    {badge}
                  </span>
                ) : null}
                <h3 className="font-display text-3xl leading-none text-on-surface">
                  {title}
                </h3>
                {subtitle ? (
                  <p className="mt-2 text-sm leading-6 text-on-surface-variant">
                    {subtitle}
                  </p>
                ) : null}
              </div>
              <div className="shrink-0 rounded-2xl bg-primary-container/10 px-4 py-3 text-right">
                {originalPrice ? (
                  <p className="text-xs text-outline line-through">{originalPrice}</p>
                ) : null}
                <p className="font-display text-3xl leading-none text-primary">
                  {price}
                </p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-full bg-[linear-gradient(135deg,#d4af37,#ffdfa0,#d4af37)] px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-on-primary-container shadow-sm transition group-active:scale-[0.98]">
              <span>{reserveLabel}</span>
              <span className="material-symbols-outlined text-base">
                arrow_forward
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
