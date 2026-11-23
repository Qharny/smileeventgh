"use client";

import Image, { type StaticImageData } from "next/image";
import { useRef, useState, type MouseEvent } from "react";

type Service = {
  id: string;
  name: string;
  summary: string;
  goodFor: string[];
  photo: { src: StaticImageData; alt: string };
};

/**
 * The setlist. With a mouse, hovering a service shows its photo as a small
 * slide that follows the cursor. Touch screens get an inline thumbnail instead.
 */
export function ServiceList({ services }: { services: Service[] }) {
  const [active, setActive] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  const move = (e: MouseEvent) => {
    const el = previewRef.current;
    if (!el) return;
    // Offset so the slide sits beside the cursor rather than under it.
    el.style.translate = `${e.clientX + 28}px ${e.clientY - 120}px`;
  };

  return (
    <>
      <ul className="mt-16 border-b border-gold/20" onMouseMove={move} onMouseLeave={() => setActive(null)}>
        {services.map((s, i) => (
          <li key={s.id} className="group border-t border-gold/20" onMouseEnter={() => setActive(i)}>
            <a
              href={`#book-${s.id}`}
              className="grid gap-x-10 gap-y-4 py-8 md:grid-cols-[minmax(0,5fr)_minmax(0,5fr)_minmax(0,3fr)] md:items-baseline md:py-10"
            >
              <h3 className="flex items-center gap-5 font-display text-[clamp(2.25rem,4.6vw,4.25rem)] font-bold uppercase leading-none text-ink transition-colors duration-300 group-hover:text-gold-deep group-focus-visible:text-gold-deep">
                {/* Inline thumbnail for small/touch screens */}
                <Image
                  src={s.photo.src}
                  alt=""
                  sizes="4rem"
                  placeholder="blur"
                  className="size-14 flex-none rounded-[3px] object-cover md:hidden"
                />
                <span
                  className="pearl-key hidden scale-50 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 md:block"
                  aria-hidden
                />
                <span className="transition-all duration-300 md:-ml-[2.375rem] md:group-hover:ml-0">{s.name}</span>
              </h3>
              <p className="max-w-md leading-relaxed text-ink/80">{s.summary}</p>
              <div className="flex flex-col gap-3">
                <p className="font-utility text-[0.625rem] uppercase tracking-[0.16em] text-muted">Popular for</p>
                <p className="text-sm leading-relaxed text-ink/80">{s.goodFor.join(" · ")}</p>
                <span className="font-utility text-[0.6875rem] uppercase tracking-[0.14em] text-gold-deep">
                  Request this →
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      {/* Cursor-following preview (shown only while a row is hovered with a mouse) */}
      <div ref={previewRef} aria-hidden className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block">
        <div
          className={`w-72 rotate-[4deg] bg-film p-2 pb-6 shadow-[0_24px_48px_-12px_rgb(0_0_0/0.45)] transition-[opacity,scale] duration-200 ease-out
                      ${active === null ? "scale-90 opacity-0" : "scale-100 opacity-100"}`}
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2px]">
            {services.map((s, i) => (
              <Image
                key={s.id}
                src={s.photo.src}
                alt=""
                sizes="18rem"
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-200 ${active === i ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
