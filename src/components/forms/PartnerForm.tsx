"use client";

import { useRef, useState } from "react";
import type { SiteContent } from "@/lib/content";

type SubmitState = "idle" | "sending" | "sent";
type PartnerFormContent = SiteContent["forms"]["partner"];

/**
 * Partner contact form — stubbed submit feedback mirroring the original inline behavior:
 * idle → "Versturen..." (disabled) → after ~1.5s "Bericht verzonden!" (asparagus) + reset →
 * after ~3s revert to idle.
 */
export default function PartnerForm({ content }: { content: PartnerFormContent }) {
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
    state === "sending" ? content.sendingLabel : state === "sent" ? content.sentLabel : content.submitLabel;
  const firstRow = content.fields.slice(0, 2);
  const secondRow = content.fields.slice(2, 4);
  const messageField = content.fields[4];

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {firstRow.map((field) => (
          <div className="flex flex-col gap-2" key={field.label}>
            <label className={labelCls}>{field.label}</label>
            <input className={inputCls} placeholder={field.placeholder} type={field.type} />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {secondRow.map((field) => (
          <div className="flex flex-col gap-2" key={field.label}>
            <label className={labelCls}>{field.label}</label>
            <input className={inputCls} placeholder={field.placeholder} type={field.type} />
          </div>
        ))}
      </div>
      {messageField && (
        <div className="flex flex-col gap-2">
          <label className={labelCls}>{messageField.label}</label>
          <textarea
            className={inputCls}
            placeholder={messageField.placeholder}
            rows={4}
          />
        </div>
      )}
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
