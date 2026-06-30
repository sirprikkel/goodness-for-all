"use client";

import { useRef, useState } from "react";
import type { SiteContent } from "@/lib/content";

type SubmitState = "idle" | "sending" | "sent" | "error";
type PartnerFormContent = SiteContent["forms"]["partner"];

// Checkbox 5 ("Algemene informatie") staat altijd standaard aangevinkt.
const ALWAYS_CHECKED = "algemeen";
// De waarde van ?keuze=... is gelijk aan de checkbox-id die extra
// aangevinkt moet worden. Checkbox 4 ("gift") wordt nooit automatisch
// aangevinkt en staat daarom bewust niet in deze lijst.
const CHOICE_TO_CHECKBOX: Record<string, string> = {
  supporter: "supporter",
  builder: "builder",
  leider: "leider",
};

// Startset checkboxes: altijd "Algemene informatie", plus de checkbox die
// hoort bij ?keuze=... (indien aanwezig). Wordt zowel op de server als op de
// client met dezelfde prop berekend, dus geen hydration-mismatch en geen flits.
function initialSelection(choice: string | undefined): Set<string> {
  const selection = new Set([ALWAYS_CHECKED]);
  const extra = choice ? CHOICE_TO_CHECKBOX[choice] : undefined;
  if (extra) {
    selection.add(extra);
  }
  return selection;
}

export default function PartnerForm({
  content,
  initialChoice,
}: {
  content: PartnerFormContent;
  initialChoice?: string;
}) {
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const [checked, setChecked] = useState<Set<string>>(() => initialSelection(initialChoice));
  const formRef = useRef<HTMLFormElement | null>(null);

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const interesses = content.interests
      .filter((option) => checked.has(option.id))
      .map((option) => option.label);

    setState("sending");
    setMessage("");

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: "partner",
        naam: formData.get("naam"),
        bedrijf: formData.get("bedrijf"),
        rol: formData.get("rol"),
        email: formData.get("email"),
        bericht: formData.get("bericht"),
        interesses,
      }),
    });

    if (!response.ok) {
      const data = (await response.json().catch(() => null)) as { message?: string } | null;
      setState("error");
      setMessage(data?.message ?? "Het versturen is mislukt. Probeer het later opnieuw.");
      return;
    }

    setState("sent");
    setMessage(content.sentLabel);
    form.reset();
    setChecked(initialSelection(initialChoice));
    setTimeout(() => {
      setState("idle");
      setMessage("");
    }, 3000);
  }

  const inputCls =
    "w-full bg-white border border-evergreen p-4 font-body-md focus:ring-2 focus:ring-harvest-orange outline-none";
  const labelCls = "font-label-sm text-label-sm text-evergreen uppercase";
  const buttonText =
    state === "sending" ? content.sendingLabel : state === "sent" ? content.sentLabel : content.submitLabel;
  const firstRow = content.fields.slice(0, 2);
  const secondRow = content.fields.slice(2, 4);
  const messageField = content.fields[4];
  const fieldNames = ["naam", "bedrijf", "rol", "email"] as const;

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {firstRow.map((field, index) => (
          <div className="flex flex-col gap-2" key={field.label}>
            <label className={labelCls} htmlFor={`partner-${fieldNames[index]}`}>
              {field.label}
            </label>
            <input
              className={inputCls}
              id={`partner-${fieldNames[index]}`}
              name={fieldNames[index]}
              placeholder={field.placeholder}
              required
              type={field.type}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {secondRow.map((field, index) => (
          <div className="flex flex-col gap-2" key={field.label}>
            <label className={labelCls} htmlFor={`partner-${fieldNames[index + 2]}`}>
              {field.label}
            </label>
            <input
              className={inputCls}
              id={`partner-${fieldNames[index + 2]}`}
              name={fieldNames[index + 2]}
              placeholder={field.placeholder}
              required
              type={field.type}
            />
          </div>
        ))}
      </div>
      {messageField && (
        <div className="flex flex-col gap-2">
          <label className={labelCls} htmlFor="partner-bericht">
            {messageField.label}
          </label>
          <textarea
            className={inputCls}
            id="partner-bericht"
            name="bericht"
            placeholder={messageField.placeholder}
            required
            rows={4}
          />
        </div>
      )}
      <fieldset className="flex flex-col gap-3">
        <legend className={`${labelCls} mb-1`}>{content.interestsLabel}</legend>
        {content.interests.map((option) => (
          <label
            key={option.id}
            className="flex items-start gap-3 text-body-md text-evergreen cursor-pointer"
          >
            <input
              type="checkbox"
              className="mt-1 h-5 w-5 shrink-0 accent-harvest-orange cursor-pointer"
              checked={checked.has(option.id)}
              onChange={() => toggle(option.id)}
            />
            <span>{option.label}</span>
          </label>
        ))}
      </fieldset>
      <button
        className={`w-full md:w-auto text-evergreen px-12 py-5 font-cta text-cta transition-all cursor-pointer active:scale-95 ${
          state === "sent" ? "bg-asparagus" : "bg-harvest-orange hover:bg-secondary-container"
        } ${state === "sending" ? "opacity-50 pointer-events-none" : ""}`}
        type="submit"
        disabled={state !== "idle"}
      >
        {buttonText}
      </button>
      {message && (
        <p
          aria-live="polite"
          className={`font-body-md text-body-md ${
            state === "error" ? "text-red-700" : "text-evergreen"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
