"use client";

import { useRef, useState } from "react";
import type { SiteContent } from "@/lib/content";

type ContactFormContent = SiteContent["forms"]["contact"];

/**
 * Contact form — label focus color swap + stubbed submit feedback.
 * Mirrors the original inline behavior 1:1.
 */
export default function ContactForm({ content }: { content: ContactFormContent }) {
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
      {content.fields.map((field) => (
        <div className="group" key={field.id}>
          <label className={labelCls} htmlFor={field.id}>
            {field.label}
          </label>
          {field.type === "textarea" ? (
            <textarea
              className={inputCls}
              id={field.id}
              name={field.name}
              placeholder={field.placeholder}
              required
              rows={6}
            />
          ) : (
            <input
              className={inputCls}
              id={field.id}
              name={field.name}
              placeholder={field.placeholder}
              required
              type={field.type}
            />
          )}
        </div>
      ))}
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
          {sent ? content.sentLabel : content.submitLabel}
        </button>
      </div>
    </form>
  );
}
