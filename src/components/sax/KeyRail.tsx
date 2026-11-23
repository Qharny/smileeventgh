"use client";

import { useEffect, useState } from "react";
import { sections } from "@/content/saxborsah";

/**
 * Section navigation drawn as the ink key stack of a saxophone.
 * The key for the section in view is shown pressed.
 * Desktop: vertical rail on the left. Mobile: a bar along the bottom.
 */
export function KeyRail() {
  const [active, setActive] = useState<string>(sections[0].id);

  useEffect(() => {
    const targets = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Sections"
      className="fixed z-40 inset-x-0 bottom-0 border-t border-gold/25 bg-stone-deep
                 md:inset-x-auto md:bottom-auto md:left-7 md:top-1/2 md:-translate-y-1/2 md:border-0 md:bg-transparent"
    >
      {/* The key rod: a thin gold line the keys sit on (desktop only). */}
      <span
        aria-hidden
        className="absolute left-[8.5px] -top-6 -bottom-6 hidden w-px bg-gradient-to-b from-gold/0 via-gold/50 to-gold/0 md:block"
      />
      <ul className="relative flex justify-around px-2 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:flex-col md:gap-7 md:p-0">
        {sections.map((s) => {
          const pressed = active === s.id;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={pressed ? "location" : undefined}
                className="group flex flex-col items-center gap-2 rounded-full md:flex-row md:gap-4"
              >
                <span className="pearl-key" data-pressed={pressed} />
                <span
                  className={`font-utility text-[0.625rem] uppercase tracking-[0.14em] transition-all duration-200
                              md:pointer-events-none md:-translate-x-1 md:text-[0.6875rem] md:opacity-0
                              md:group-hover:translate-x-0 md:group-hover:opacity-100 md:group-focus-visible:translate-x-0 md:group-focus-visible:opacity-100
                              ${pressed ? "text-gold-deep" : "text-muted"}`}
                >
                  {s.label}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
