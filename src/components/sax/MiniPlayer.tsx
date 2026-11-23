"use client";

import { useEffect, useState } from "react";
import { PlayIcon, useSamplePlayer } from "./SamplePlayer";

/**
 * Docked control for the performance sample. It appears only after the visitor
 * has pressed play and scrolled the hero record out of view, so the music can
 * be paused from anywhere on the page.
 */
export function MiniPlayer() {
  const { state, started, toggle } = useSamplePlayer();
  const [heroVisible, setHeroVisible] = useState(true);
  const playing = state === "playing";

  useEffect(() => {
    const hero = document.getElementById("hero-player");
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting));
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const show = started && !heroVisible && state !== "unavailable";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={playing}
      aria-label={playing ? "Pause performance sample" : "Play performance sample"}
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`fixed z-40 flex items-center gap-3 bg-gold text-ink transition-[opacity,translate] duration-300
                  bottom-[5.25rem] right-4 p-2 md:bottom-auto md:right-5 md:top-1/2 md:-translate-y-1/2 md:flex-col md:px-2 md:pb-4 md:pt-2
                  hover:bg-gold-hi
                  ${show ? "opacity-100" : "pointer-events-none translate-x-4 opacity-0"}`}
    >
      <span className="grid size-8 place-items-center bg-ink text-logo-gold">
        <PlayIcon playing={playing} />
      </span>
      {/* Vertical ticker: scrolls only while the sample is playing */}
      <span className="hidden h-40 overflow-hidden md:block">
        <span
          className="ticker block whitespace-nowrap font-utility text-[0.6875rem] font-medium uppercase tracking-[0.18em] [writing-mode:vertical-rl]"
          style={{ animationPlayState: playing ? "running" : "paused" }}
        >
          Now playing · Saxborsah live · Now playing · Saxborsah live ·
        </span>
      </span>
      <span className="pr-1 font-utility text-[0.625rem] font-medium uppercase tracking-[0.16em] md:hidden">
        {playing ? "Playing" : "Paused"}
      </span>
    </button>
  );
}
