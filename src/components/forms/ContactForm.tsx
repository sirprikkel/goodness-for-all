"use client";

import { useRef, useState } from "react";

/**
 * Contact form — label focus color swap + stubbed submit feedback.
 * Mirrors the original inline behavior 1:1.
 */
export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire to backend / email service.
    setSent(true);
    setTimeout(() => {
      setSent(false);
      formRef.current?.reset();
    }, 3000);
  }

  const labelCls =
    "block font-label-sm text-label-sm text-evergreen uppercase mb-2 transition-colors focus-within:text-harvest-orange";
  const inputCls =
    "w-full bg-pure-mist border-2 border-evergreen focus:outline-none focus:border-harvest-orange text-body-md font-body-md p-base placeholder-evergreen/30";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-base">
      <div className="group">
        <label className={labelCls} htmlFor="naam">
          naam
        </label>
        <input
          className={inputCls}
          id="naam"
          name="naam"
          placeholder="Jouw volledige naam"
          required
          type="text"
        />
      </div>
      <div className="group">
        <label className={labelCls} htmlFor="email">
          e-mailadres
        </label>
        <input
          className={inputCls}
          id="email"
          name="email"
          placeholder="naam@voorbeeld.nl"
          required
          type="email"
        />
      </div>
      <div className="group">
        <label className={labelCls} htmlFor="bericht">
          bericht
        </label>
        <textarea
          className={inputCls}
          id="bericht"
          name="bericht"
          placeholder="Wat kunnen we voor je betekenen?"
          required
          rows={6}
        />
      </div>
      <div className="pt-4">
        <button
          className={`w-full md:w-auto font-cta text-cta px-12 py-4 uppercase border-2 border-evergreen transition-all duration-300 active:scale-95 ${
            sent
              ? "bg-asparagus text-evergreen"
              : "bg-harvest-orange text-evergreen hover:bg-evergreen hover:text-harvest-orange"
          }`}
          type="submit"
          disabled={sent}
        >
          {sent ? "Verzonden!" : "verzenden"}
        </button>
      </div>
    </form>
  );
}
