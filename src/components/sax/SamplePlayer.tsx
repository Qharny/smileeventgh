"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";

export type PlayerState = "loading" | "ready" | "playing" | "paused" | "unavailable";

type Player = {
  state: PlayerState;
  time: { now: number; total: number };
  /** Bumped when a track ends, so views can reset (e.g. the record turns upright). */
  plays: number;
  /** True once the visitor has pressed play at least once. */
  started: boolean;
  analyser: RefObject<AnalyserNode | null>;
  toggle: () => void;
};

const PlayerContext = createContext<Player | null>(null);

export function useSamplePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("useSamplePlayer must be used inside <SamplePlayerProvider>");
  return ctx;
}

export function formatTime(s: number) {
  if (!Number.isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
}

/** One audio source for the whole page, shared by the hero record and the docked control. */
export function SamplePlayerProvider({ src, children }: { src: string; children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const [state, setState] = useState<PlayerState>("loading");
  const [time, setTime] = useState({ now: 0, total: 0 });
  const [plays, setPlays] = useState(0);
  const [started, setStarted] = useState(false);

  // The server-rendered <audio> may finish (or fail) loading before hydration,
  // in which case its events were missed. Read its current state once.
  useEffect(() => {
    const audio = audioRef.current;
    if (audio?.error) setState("unavailable");
    else if (audio && audio.readyState >= 1) {
      setTime({ now: 0, total: audio.duration });
      setState("ready");
    }
  }, []);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio || state === "unavailable" || state === "loading") return;
    if (state === "playing") {
      audio.pause();
      return;
    }
    // The audio graph can only be created after a user gesture.
    if (!analyser.current) {
      const ctx = new AudioContext();
      const source = ctx.createMediaElementSource(audio);
      const node = ctx.createAnalyser();
      node.fftSize = 2048;
      node.smoothingTimeConstant = 0.82;
      source.connect(node);
      node.connect(ctx.destination);
      analyser.current = node;
    }
    await (analyser.current.context as AudioContext).resume();
    setStarted(true);
    await audio.play().catch(() => setState("unavailable"));
  }

  return (
    <PlayerContext.Provider value={{ state, time, plays, started, analyser, toggle }}>
      {children}
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={(e) => {
          setTime({ now: 0, total: e.currentTarget.duration });
          setState("ready");
        }}
        onError={() => setState("unavailable")}
        onTimeUpdate={(e) => {
          const now = e.currentTarget.currentTime;
          setTime((t) => ({ ...t, now }));
        }}
        onPlay={() => setState("playing")}
        onPause={() => setState("paused")}
        onEnded={(e) => {
          e.currentTarget.currentTime = 0;
          setPlays((n) => n + 1);
          setState("ready");
        }}
      />
    </PlayerContext.Provider>
  );
}

export function PlayIcon({ playing, className = "size-3" }: { playing: boolean; className?: string }) {
  return playing ? (
    <svg viewBox="0 0 12 12" className={className} aria-hidden>
      <rect x="2" y="1.5" width="2.6" height="9" fill="currentColor" />
      <rect x="7.4" y="1.5" width="2.6" height="9" fill="currentColor" />
    </svg>
  ) : (
    <svg viewBox="0 0 12 12" className={`ml-0.5 ${className}`} aria-hidden>
      <path d="M2.5 1.2 10.5 6l-8 4.8z" fill="currentColor" />
    </svg>
  );
}
