"use client";

import { useEffect, useRef } from "react";

interface UseInfiniteScrollTriggerOptions {
  enabled: boolean;
  onIntersect: () => void;
  rootMargin?: string;
  threshold?: number;
}

const DEFAULT_ROOT_MARGIN = "500px 0px";

function getVerticalRootMarginPx(rootMargin: string): number {
  const firstValue = rootMargin.trim().split(/\s+/)[0];
  const parsed = Number.parseFloat(firstValue);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function useInfiniteScrollTrigger({
  enabled,
  onIntersect,
  rootMargin = DEFAULT_ROOT_MARGIN,
  threshold = 0,
}: UseInfiniteScrollTriggerOptions) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const onIntersectRef = useRef(onIntersect);

  useEffect(() => {
    onIntersectRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    if (!enabled) {
      return;
    }
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const element = sentinelRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry?.isIntersecting) {
          onIntersectRef.current();
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [enabled, rootMargin, threshold]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const element = sentinelRef.current;
    if (!element) {
      return;
    }

    const rootMarginPx = getVerticalRootMarginPx(rootMargin);
    let frameId: number | null = null;

    const checkAndTrigger = () => {
      frameId = null;

      const sentinel = sentinelRef.current;
      if (!sentinel) {
        return;
      }

      const rect = sentinel.getBoundingClientRect();
      if (rect.top <= window.innerHeight + rootMarginPx) {
        onIntersectRef.current();
      }
    };

    const scheduleCheck = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(checkAndTrigger);
    };

    window.addEventListener("scroll", scheduleCheck, { passive: true });
    window.addEventListener("resize", scheduleCheck);
    scheduleCheck();

    return () => {
      window.removeEventListener("scroll", scheduleCheck);
      window.removeEventListener("resize", scheduleCheck);
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [enabled, rootMargin]);

  return sentinelRef;
}
