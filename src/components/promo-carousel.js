"use client";

import { useEffect, useRef, useState } from "react";

export default function PromoCarousel({
  items,
  ariaLabelPrev = "Previous slide",
  ariaLabelNext = "Next slide",
  autoPlayMs = 4500,
  containerClassName = "",
  itemClassName = "",
  renderItem,
}) {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const scrollTimeoutRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length);
  }, [items]);

  useEffect(() => {
    const currentItem = itemRefs.current[activeIndex];
    const container = containerRef.current;

    if (!currentItem || !container) {
      return;
    }

    const itemOffsetLeft = currentItem.offsetLeft;
    const centeredLeft =
      itemOffsetLeft - (container.clientWidth - currentItem.clientWidth) / 2;

    container.scrollTo({
      left: Math.max(0, centeredLeft),
      behavior: "smooth",
    });
  }, [activeIndex]);

  useEffect(() => {
    if (isPaused || items.length < 2) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length);
    }, autoPlayMs);

    return () => window.clearInterval(intervalId);
  }, [autoPlayMs, isPaused, items.length]);

  function handleScroll() {
    const container = containerRef.current;

    if (!container || !items.length) {
      return;
    }

    if (scrollTimeoutRef.current) {
      window.clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = window.setTimeout(() => {
      const containerCenter = container.scrollLeft + container.clientWidth / 2;
      const closestIndex = itemRefs.current.reduce((closest, item, index) => {
        if (!item) {
          return closest;
        }

        const itemCenter = item.offsetLeft + item.clientWidth / 2;
        const currentDistance = Math.abs(itemCenter - containerCenter);
        const closestItem = itemRefs.current[closest];
        const closestDistance = closestItem
          ? Math.abs(closestItem.offsetLeft + closestItem.clientWidth / 2 - containerCenter)
          : Number.POSITIVE_INFINITY;

        return currentDistance < closestDistance ? index : closest;
      }, activeIndex);

      setActiveIndex(closestIndex);
    }, 120);
  }

  function moveTo(direction) {
    setActiveIndex((current) => {
      const nextIndex = current + direction;

      if (nextIndex < 0) {
        return items.length - 1;
      }

      if (nextIndex >= items.length) {
        return 0;
      }

      return nextIndex;
    });
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="mb-5 flex items-center justify-between gap-3 rounded-full border border-primary-container/20 bg-surface/85 p-2 shadow-sm backdrop-blur-md sm:justify-end sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-0">
        <div className="ml-3 font-display text-xl text-primary sm:hidden">
          {String(activeIndex + 1).padStart(2, "0")}
          <span className="mx-2 text-outline">/</span>
          <span className="text-on-surface-variant">
            {String(items.length).padStart(2, "0")}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label={ariaLabelPrev}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-surface text-primary shadow-sm transition hover:border-primary hover:bg-surface-container-low"
            onClick={() => moveTo(-1)}
            type="button"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <button
            aria-label={ariaLabelNext}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-surface text-primary shadow-sm transition hover:border-primary hover:bg-surface-container-low"
            onClick={() => moveTo(1)}
            type="button"
          >
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-10 left-0 top-20 z-10 w-6 bg-gradient-to-r from-surface to-transparent sm:w-10" />
      <div className="pointer-events-none absolute bottom-10 right-0 top-20 z-10 w-6 bg-gradient-to-l from-surface to-transparent sm:w-10" />

      <div
        ref={containerRef}
        className={`flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-4 sm:gap-6 sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden ${containerClassName}`}
        onScroll={handleScroll}
      >
        {items.map((item, index) => (
          <div
            key={item.key || item.id || index}
            ref={(element) => {
              itemRefs.current[index] = element;
            }}
            className={`snap-center transition duration-500 ${
              activeIndex === index
                ? "scale-100 opacity-100"
                : "scale-[0.96] opacity-75"
            } ${itemClassName}`}
          >
            {renderItem(item, index, activeIndex === index)}
          </div>
        ))}
      </div>

      {items.length > 1 ? (
        <div className="mt-4 flex justify-center gap-2">
          {items.map((item, index) => (
            <button
              key={item.key || item.id || index}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                activeIndex === index
                  ? "w-8 bg-primary"
                  : "w-2.5 bg-primary/25 hover:bg-primary/45"
              }`}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
