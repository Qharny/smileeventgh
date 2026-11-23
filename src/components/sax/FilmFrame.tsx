import type { ReactNode } from "react";

/**
 * A 35mm slide frame: dark film border with edge print, holding a photo,
 * video or the hero record. Tilt it with a rotate-* class for the collage look.
 */
export function FilmFrame({
  children,
  label,
  frame,
  className = "",
  innerClassName = "",
}: {
  children: ReactNode;
  /** Edge print along the top, e.g. "Saxborsah live 400". */
  label: string;
  /** Frame number printed bottom-right, e.g. "24A". */
  frame: string;
  className?: string;
  innerClassName?: string;
}) {
  return (
    <figure
      className={`relative bg-film px-2.5 py-7 shadow-[0_24px_48px_-12px_rgb(0_0_0/0.55)] sm:px-3.5 sm:py-8 ${className}`}
    >
      <span
        aria-hidden
        className="absolute left-4 top-2.5 font-utility text-[0.5625rem] uppercase tracking-[0.14em] text-film-text/60 sm:top-3"
      >
        {label}
      </span>
      <span
        aria-hidden
        className="absolute right-4 top-2.5 font-utility text-[0.5625rem] uppercase tracking-[0.14em] text-film-text/60 sm:top-3"
      >
        Saxborsah
      </span>
      <div className={`relative overflow-hidden rounded-[3px] ${innerClassName}`}>{children}</div>
      <span
        aria-hidden
        className="absolute bottom-2.5 right-4 font-utility text-[0.5625rem] tracking-[0.14em] text-film-text/60 sm:bottom-3"
      >
        ▸ {frame}
      </span>
    </figure>
  );
}
