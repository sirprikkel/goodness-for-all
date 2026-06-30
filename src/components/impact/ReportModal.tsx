"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  buttonLabel: string;
  title: string;
  text: string;
};

/** Knop "Rapport downloaden" die een lightbox (modal) opent met toelichting. */
export default function ReportModal({ buttonLabel, title, text }: Props) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // De modal wordt via een portal direct in <body> gerenderd, zodat hij niet
  // wordt ingeperkt door een containing block van een voorouder en altijd het
  // volledige scherm bedekt. De overlay rendert alleen na een klik (in de
  // browser), dus document.body is op dat moment altijd beschikbaar.
  const overlay = open ? (
    <div
          className="fixed top-0 left-0 z-[1000] flex h-full w-full items-center justify-center p-4 bg-evergreen/70"
          role="dialog"
          aria-modal="true"
          aria-labelledby="report-modal-title"
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-sandstone-beige border-2 border-evergreen rounded-[12px] p-8 md:p-10 shadow-[8px_8px_0_0_#334E1F]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Sluiten"
              className="absolute top-3 right-3 text-evergreen hover:text-harvest-orange transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h3
              id="report-modal-title"
              className="hero-title font-bold text-headline-md text-evergreen mb-4 pr-8"
            >
              {title}
            </h3>
            <p className="font-body-md text-body-md text-evergreen/90 whitespace-pre-line">
              {text}
            </p>
          </div>
    </div>
  ) : null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-harvest-orange text-evergreen px-6 py-3 font-cta text-cta uppercase active:scale-95 transition-transform inline-flex items-center gap-2"
      >
        <span className="material-symbols-outlined">download</span>
        {buttonLabel}
      </button>

      {overlay ? createPortal(overlay, document.body) : null}
    </>
  );
}
