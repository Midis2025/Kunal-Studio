"use client";

import { useActionState, useEffect, useRef } from "react";
import { submitInquiry } from "@/app/contact/actions";
import { studio } from "@/data/studio";
import { coverage, guestCounts, sources, weddingTypes, type InquiryField, type InquiryState } from "@/lib/inquiry";

const initial: InquiryState = { status: "idle" };

function Field({
  id,
  label,
  error,
  hint,
  children,
  className = "",
}: {
  id: InquiryField;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="label block text-ash">
        {label}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-xs text-ash">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-wine" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [state, action, pending] = useActionState(submitInquiry, initial);
  const startedAt = useRef(0);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  // Time-on-form spam check: stamp when the form becomes interactive.
  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  // React resets uncontrolled fields after each action, so the timestamp is attached at submit time.
  const submit = (fd: FormData) => {
    fd.set("t", String(startedAt.current));
    return action(fd);
  };

  // Move focus to the first problem, or to the confirmation.
  useEffect(() => {
    if (state.status === "error") {
      const first = Object.keys(state.errors)[0];
      (first ? formRef.current?.querySelector<HTMLElement>(`#${first}`) : formRef.current?.querySelector<HTMLElement>("[data-form-error]"))?.focus();
    }
    if (state.status === "success") doneRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div ref={doneRef} tabIndex={-1} className="animate-[lbIn_0.9s_var(--ease-film)] py-10 outline-none" role="status">
        <p className="label text-wine">Enquiry received</p>
        <p className="mt-8 font-serif t-h2 leading-[0.95] tracking-[-0.02em]">
          Thank you, <em>{state.names}.</em>
        </p>
        <p className="mt-8 max-w-md t-lead">Your story has reached us. We’ll read every word and be in touch soon.</p>
        <p className="mt-6 max-w-md text-ash">
          In the meantime, if anything comes to mind — a date change, a venue, a song you love — simply write to{" "}
          <a href={`mailto:${studio.email}`} className="link-line text-ink">
            {studio.email}
          </a>
          .
        </p>
      </div>
    );
  }

  const err = state.status === "error" ? state.errors : {};
  const val = state.status === "error" ? state.values : {};
  const a11y = (id: InquiryField, hint?: boolean) => ({
    id,
    name: id,
    "aria-invalid": err[id] ? true : undefined,
    "aria-describedby": err[id] ? `${id}-error` : hint ? `${id}-hint` : undefined,
    defaultValue: val[id] ?? "",
  });

  return (
    <form ref={formRef} action={submit} noValidate className="grid gap-x-10 gap-y-10 sm:grid-cols-2" aria-describedby="form-note">
      {state.status === "error" && (
        <p data-form-error tabIndex={-1} className="border-l border-wine pl-4 text-wine outline-none sm:col-span-2" role="alert">
          {state.message}
        </p>
      )}

      <Field id="names" label="Your names *" error={err.names} className="sm:col-span-2">
        <input {...a11y("names")} className="field font-serif !text-2xl md:!text-3xl" autoComplete="name" required placeholder="Priya & Arjun" />
      </Field>
      <Field id="email" label="Email *" error={err.email}>
        <input {...a11y("email")} type="email" className="field" autoComplete="email" required />
      </Field>
      <Field id="phone" label="Phone" error={err.phone} hint="Optional — WhatsApp works too.">
        <input {...a11y("phone", true)} type="tel" className="field" autoComplete="tel" inputMode="tel" />
      </Field>
      <Field id="eventDate" label="Event date *" error={err.eventDate} hint="Approximate is fine.">
        <input {...a11y("eventDate", true)} type="date" className="field" required />
      </Field>
      <Field id="location" label="Event location *" error={err.location}>
        <input {...a11y("location")} className="field" placeholder="City, venue or country" required />
      </Field>
      <Field id="weddingType" label="Type of celebration *" error={err.weddingType}>
        <select {...a11y("weddingType")} className="field" required>
          <option value="" disabled>
            Choose one
          </option>
          {weddingTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field id="guests" label="Estimated guest count *" error={err.guests}>
        <select {...a11y("guests")} className="field" required>
          <option value="" disabled>
            Choose one
          </option>
          {guestCounts.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>

      <fieldset className="sm:col-span-2" aria-describedby={err.coverage ? "coverage-error" : undefined}>
        <legend className="label text-ash">Photography, film, or both? *</legend>
        <div className="mt-4 flex flex-wrap gap-3">
          {coverage.map((c) => (
            <label key={c} className="relative cursor-pointer">
              <input type="radio" name="coverage" value={c} defaultChecked={val.coverage === c} className="peer sr-only" required />
              <span className="flex min-h-11 items-center border border-ink/25 px-6 font-serif text-lg transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-ivory peer-focus-visible:outline peer-focus-visible:outline-1 peer-focus-visible:outline-offset-4 hover:border-ink">
                {c}
              </span>
            </label>
          ))}
        </div>
        {err.coverage && (
          <p id="coverage-error" className="mt-2 text-sm text-wine" role="alert">
            {err.coverage}
          </p>
        )}
      </fieldset>

      <Field id="source" label="How did you find us?" error={err.source} className="sm:col-span-2">
        <select {...a11y("source")} className="field">
          <option value="">Choose one (optional)</option>
          {sources.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>

      <Field id="message" label="Tell us about your celebration *" error={err.message} className="sm:col-span-2" hint="The people, the traditions, the feeling you want to remember.">
        <textarea {...a11y("message", true)} rows={6} className="field resize-y leading-relaxed" required />
      </Field>

      {/* Spam protection: honeypot + time-on-form */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-6 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="max-w-sm text-xs text-ash">
          We use your details only to reply to your enquiry. See our{" "}
          <a href="/privacy" className="link-line">
            privacy notice
          </a>
          .
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group flex min-h-14 items-center justify-center gap-4 bg-ink px-8 text-ivory transition-colors hover:bg-wine disabled:opacity-60"
        >
          <span className="label-lg">{pending ? "Sending…" : "Begin the conversation"}</span>
          <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>
    </form>
  );
}
