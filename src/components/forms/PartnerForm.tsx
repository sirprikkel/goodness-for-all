"use client";

import { useRef, useState } from "react";

type SubmitState = "idle" | "sending" | "sent";

/**
 * Partner contact form — stubbed submit feedback mirroring the original inline behavior:
 * idle → "Versturen..." (disabled) → after ~1.5s "Bericht verzonden!" (asparagus) + reset →
 * after ~3s revert to idle.
 */
export default function PartnerForm() {
  const [state, setState] = useState<SubmitState>("idle");
  const formRef = useRef<HTMLFormElement | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: wire to backend
    setState("sending");
    setTimeout(() => {
      setState("sent");
      formRef.current?.reset();
      setTimeout(() => setState("idle"), 3000);
    }, 1500);
  }

  const inputCls =
    "w-full bg-white border border-evergreen p-4 font-body-md focus:ring-2 focus:ring-harvest-orange outline-none";
  const labelCls = "font-label-sm text-label-sm text-evergreen uppercase";

  const buttonText =
    state === "sending" ? "Versturen..." : state === "sent" ? "Bericht verzonden!" : "Neem contact op";

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className={labelCls}>Naam</label>
          <input className={inputCls} placeholder="Uw volledige naam" type="text" />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelCls}>Bedrijf</label>
          <input className={inputCls} placeholder="Bedrijfsnaam" type="text" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className={labelCls}>Rol</label>
          <input className={inputCls} placeholder="Bijv. ESG Manager of Directie" type="text" />
        </div>
        <div className="flex flex-col gap-2">
          <label className={labelCls}>Email</label>
          <input className={inputCls} placeholder="zakelijk@email.nl" type="email" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className={labelCls}>Bericht</label>
        <textarea
          className={inputCls}
          placeholder="Hoe wilt u bijdragen aan de stad?"
          rows={4}
        />
      </div>
      <button
        className={`w-full md:w-auto text-evergreen px-12 py-5 font-cta text-cta transition-all cursor-pointer active:scale-95 ${
          state === "sent" ? "bg-asparagus" : "bg-harvest-orange hover:bg-secondary-container"
        } ${state === "sending" ? "opacity-50 pointer-events-none" : ""}`}
        type="submit"
        disabled={state !== "idle"}
      >
        {buttonText}
      </button>
    </form>
  );
}
