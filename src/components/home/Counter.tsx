"use client";

import { useEffect, useRef, useState } from "react";

type CounterProps = {
  end: number;
  duration?: number;
  className?: string;
  suffix?: string;
};

/** Count-up animation that fires once when scrolled into view. */
export default function Counter({
  end,
  duration = 2000,
  className = "",
  suffix = "+",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      observer.unobserve(el);
      let start: number | null = null;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        setValue(Math.floor(progress * end));
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString("nl-NL")}
      {suffix}
    </span>
  );
}
