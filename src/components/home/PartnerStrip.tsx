"use client";

import { useRef } from "react";

const PARTNERS = [
  "Gemeente Rotterdam",
  "Provincie Zuid-Holland",
  "Rabobank",
  "FMO",
  "ABB",
  "Savills",
  "Azbel",
  "NS Stations",
  "Lazy",
  "SOL",
  "Incluzio",
];

/** Drag-to-scroll horizontal partner logo strip. */
export default function PartnerStrip() {
  const ref = useRef<HTMLDivElement | null>(null);
  const state = useRef({ down: false, startX: 0, scrollLeft: 0 });

  return (
    <div
      ref={ref}
      className="flex partner-scroll overflow-x-auto whitespace-nowrap gap-12 px-8 items-center cursor-grab active:cursor-grabbing"
      onMouseDown={(e) => {
        const el = ref.current!;
        state.current = {
          down: true,
          startX: e.pageX - el.offsetLeft,
          scrollLeft: el.scrollLeft,
        };
      }}
      onMouseLeave={() => (state.current.down = false)}
      onMouseUp={() => (state.current.down = false)}
      onMouseMove={(e) => {
        if (!state.current.down) return;
        e.preventDefault();
        const el = ref.current!;
        const x = e.pageX - el.offsetLeft;
        el.scrollLeft = state.current.scrollLeft - (x - state.current.startX) * 2;
      }}
    >
      {PARTNERS.map((p) => (
        <div
          key={p}
          className="flex-shrink-0 font-bold text-xl uppercase tracking-tighter text-evergreen/60 select-none"
        >
          {p}
        </div>
      ))}
    </div>
  );
}
