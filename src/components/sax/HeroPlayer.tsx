"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useRef } from "react";
import { FilmFrame } from "./FilmFrame";
import { PlayIcon, formatTime, useSamplePlayer } from "./SamplePlayer";

const BARS = 120;

/**
 * The hero "slide": a film frame holding the emblem as a record.
 * While the sample plays, the record turns and gold bars around it show the
 * real frequency spectrum. Nothing moves unless music is playing.
 */
export function HeroPlayer({ emblem }: { emblem: StaticImageData }) {
  const { state, time, plays, analyser, toggle } = useSamplePlayer();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playing = state === "playing";
  const disabled = state === "unavailable" || state === "loading";

  useEffect(() => {
    const canvas = canvasRef.current;
    const node = analyser.current;
    if (!playing || !canvas || !node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const data = new Uint8Array(node.frequencyBinCount);
    // Log-spaced bins from ~150 Hz to ~5 kHz (where a sax lives), mirrored
    // left/right, so notes and their harmonics spread around the whole ring.
    const nyquist = node.context.sampleRate / 2;
    const usable = Math.floor((5000 / nyquist) * data.length);
    const lowest = Math.max(2, Math.floor((150 / nyquist) * data.length));
    let frame = 0;

    const draw = () => {
      const dpr = window.devicePixelRatio || 1;
      const size = canvas.clientWidth;
      if (canvas.width !== Math.round(size * dpr)) {
        canvas.width = Math.round(size * dpr);
        canvas.height = Math.round(size * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, size, size);
      node.getByteFrequencyData(data);

      const c = size / 2;
      const inner = size * 0.375; // just outside the emblem's outer ring
      const maxLen = size * 0.12;
      ctx.lineCap = "round";
      ctx.lineWidth = Math.max(1.5, size / 260);

      for (let i = 0; i < BARS; i++) {
        const half = i < BARS / 2 ? i : BARS - 1 - i;
        const idx = Math.floor(lowest * Math.pow(usable / lowest, half / (BARS / 2 - 1)));
        const v = data[Math.min(idx, data.length - 1)] / 255;
        const len = 2 + v * v * maxLen;
        const a = (i / BARS) * Math.PI * 2 - Math.PI / 2;
        ctx.strokeStyle = `rgba(211, 177, 109, ${0.25 + v * 0.75})`;
        ctx.beginPath();
        ctx.moveTo(c + Math.cos(a) * inner, c + Math.sin(a) * inner);
        ctx.lineTo(c + Math.cos(a) * (inner + len), c + Math.sin(a) * (inner + len));
        ctx.stroke();
      }
      frame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frame);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [playing, analyser]);

  return (
    <div id="hero-player" className="relative">
      <FilmFrame
        label="Saxborsah live 400"
        frame="24A"
        className="rotate-[2.5deg] md:rotate-[3deg]"
        innerClassName="grid aspect-[5/4] place-items-center bg-film"
      >
        <div className="relative aspect-square h-[88%]">
          {/* Resting grooves, hidden while the spectrum is drawn */}
          <span
            aria-hidden
            className={`absolute inset-[9%] rounded-full border border-gold/25 transition-opacity duration-500 ${playing ? "opacity-0" : ""}`}
          />
          <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
          <Image
            key={plays}
            src={emblem}
            alt=""
            preload
            sizes="(min-width: 768px) 20rem, 55vw"
            className="record absolute inset-[13%] h-[74%] w-[74%]"
            style={{ animationPlayState: playing ? "running" : "paused" }}
          />
        </div>
      </FilmFrame>

      {/* Sticker on the slide's corner: how bookings are answered */}
      <p
        aria-hidden
        className="absolute -left-2 bottom-20 z-10 grid size-28 -rotate-[12deg] place-items-center rounded-full bg-green p-4 text-center font-display text-xl font-black uppercase leading-[0.9] text-stone md:-left-10 md:bottom-24 md:size-32 md:text-2xl"
      >
        Replies on WhatsApp
      </p>

      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        aria-pressed={playing}
        className="group relative -mt-6 ml-4 flex min-w-[15rem] items-center gap-4 border border-gold/60 bg-stone py-3 pl-3 pr-5 text-left transition-colors hover:border-gold-hi hover:bg-stone-up disabled:cursor-not-allowed disabled:border-ink/15 disabled:hover:bg-stone md:ml-10"
      >
        <span className="grid size-9 flex-none place-items-center bg-gold text-ink transition-colors group-hover:bg-gold-hi group-disabled:bg-ink/15 group-disabled:text-muted">
          <PlayIcon playing={playing} />
        </span>
        <span className="flex flex-col">
          <span className="font-display text-lg font-bold uppercase leading-none tracking-[0.04em] text-ink group-disabled:text-muted">
            {state === "unavailable" ? "Sample coming soon" : playing ? "Pause" : "Hear him play"}
          </span>
          <span className="mt-1.5 font-utility text-[0.625rem] uppercase tracking-[0.16em] text-muted">
            {state === "unavailable"
              ? "Performance recording"
              : state === "loading"
                ? "Loading sample…"
                : `${formatTime(time.now)} / ${formatTime(time.total)}`}
          </span>
        </span>
      </button>
    </div>
  );
}
