"use client";

import { useEffect, useState, type FormEvent } from "react";
import { services, type ServiceId } from "@/content/saxborsah";

type Status = "editing" | "sending" | "failed" | "received";

const field =
  "w-full rounded-none border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-base text-ink placeholder:text-muted/70 " +
  "transition-colors focus:border-gold focus:outline-none focus-visible:outline-none user-invalid:border-danger";

const label = "font-utility text-[0.6875rem] uppercase tracking-[0.14em] text-muted";

export function RequestForm() {
  const [status, setStatus] = useState<Status>("editing");
  const [picked, setPicked] = useState<ServiceId[]>([]);
  const [firstName, setFirstName] = useState("");
  // Links like #book-sax preselect a service, then scroll to the form.
  useEffect(() => {
    const apply = () => {
      const match = window.location.hash.match(/^#book-(\w+)$/);
      if (!match) return;
      const id = match[1] as ServiceId;
      if (services.some((s) => s.id === id)) {
        setPicked((p) => (p.includes(id) ? p : [...p, id]));
        setStatus("editing");
        document.getElementById("request")?.scrollIntoView();
        history.replaceState(null, "", "#request");
      }
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const toggle = (id: ServiceId) =>
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setFirstName(String(data.get("name") ?? "").trim().split(/\s+/)[0] ?? "");
    setStatus("sending");
    try {
      // TODO: send to a Server Action that saves the request in Supabase
      // and notifies the owner by email / WhatsApp / SMS. Throw on failure.
      await new Promise((r) => setTimeout(r, 700));
      setStatus("received");
    } catch {
      // The form keeps everything typed, so the visitor can simply try again.
      setStatus("failed");
    }
  }

  if (status === "received") {
    return (
      <div role="status" className="flex min-h-[32rem] flex-col justify-center">
        <span className="pearl-key mb-8" data-pressed="true" />
        <p className="font-display text-5xl font-black uppercase leading-[0.9] text-gold-deep md:text-6xl">
          Request received{firstName ? `, ${firstName}` : ""}.
        </p>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/85">
          Saxborsah will read it personally and get back to you by email, WhatsApp or SMS to talk
          through the details. Your date is held once you both confirm.
        </p>
        <button
          type="button"
          onClick={() => {
            setPicked([]);
            setStatus("editing");
          }}
          className="mt-10 self-start font-utility text-xs uppercase tracking-[0.14em] text-gold-deep underline decoration-gold/50 underline-offset-4 hover:decoration-gold-hi"
        >
          Send another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-x-8 gap-y-7 sm:grid-cols-2">
      <fieldset className="sm:col-span-2">
        <legend className={label}>What would you like to book?</legend>
        <p className="mt-1 text-sm text-muted">Choose one or more.</p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {services.map((s) => {
            const on = picked.includes(s.id);
            return (
              <label
                key={s.id}
                className={`flex cursor-pointer items-center gap-3 border py-2.5 pl-3 pr-4 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold-hi
                            ${on ? "border-gold bg-gold/10 text-ink" : "border-ink/20 text-ink/80 hover:border-ink/45"}`}
              >
                <input
                  type="checkbox"
                  name="services"
                  value={s.id}
                  checked={on}
                  onChange={() => toggle(s.id)}
                  className="sr-only"
                />
                <span className="pearl-key [--size:0.75rem]" data-pressed={on} aria-hidden />
                {s.name}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="flex flex-col gap-1">
        <label htmlFor="name" className={label}>Your name</label>
        <input id="name" name="name" required autoComplete="name" className={field} />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className={label}>Phone or WhatsApp</label>
        <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="024 000 0000" className={field} />
      </div>
      <div className="flex flex-col gap-1 sm:col-span-2">
        <label htmlFor="email" className={label}>Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="date" className={label}>Event date</label>
        <input id="date" name="date" type="date" required
          // Earliest selectable date is today; set on the client to avoid a hydration mismatch.
          onFocus={(e) => (e.currentTarget.min = new Date().toLocaleDateString("en-CA"))}
          className={`${field} [color-scheme:light]`} />
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="occasion" className={label}>Occasion</label>
        <input id="occasion" name="occasion" required placeholder="Wedding, church service, dinner…" className={field} />
      </div>
      <div className="flex flex-col gap-1 sm:col-span-2">
        <label htmlFor="venue" className={label}>Venue or location</label>
        <input id="venue" name="venue" required className={field} />
      </div>
      <div className="flex flex-col gap-1 sm:col-span-2">
        <label htmlFor="message" className={label}>Anything else we should know?</label>
        <textarea
          id="message"
          name="message"
          rows={3}
          placeholder="Timings, songs you love, number of guests…"
          className={`${field} resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="bg-gold px-8 py-4 font-display text-lg font-bold uppercase tracking-[0.06em] text-ink transition-colors hover:bg-gold-hi disabled:opacity-60"
        >
          {status === "sending" ? "Sending request…" : "Send request"}
        </button>
        {status === "failed" ? (
          <p role="alert" className="text-sm text-danger">
            Your request didn’t send. Check your connection and press Send request again; nothing
            you typed has been lost.
          </p>
        ) : (
          <p className="text-sm text-muted">Nothing to pay now. You’ll hear back personally.</p>
        )}
      </div>
    </form>
  );
}
