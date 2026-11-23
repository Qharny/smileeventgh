// Content for the Saxborsah Music site.
// Anything marked PLACEHOLDER must be replaced with real client material before launch.

import type { StaticImageData } from "next/image";
// PLACEHOLDER photos: temporary Unsplash stock (see public/photos/CREDITS.md).
// Swap these for real Saxborsah performance photos before launch.
import aboutSilhouette from "../../public/photos/about-silhouette.jpg";
import bandStageSmoke from "../../public/photos/band-stage-smoke.jpg";
import dinnerCandles from "../../public/photos/dinner-candles.jpg";
import djDecks from "../../public/photos/dj-decks.jpg";
import mixerSliders from "../../public/photos/mixer-sliders.jpg";
import saxGoldTall from "../../public/photos/sax-gold-tall.jpg";
import saxHands from "../../public/photos/sax-hands.jpg";
import soundDesk from "../../public/photos/sound-desk.jpg";
import stageHaze from "../../public/photos/stage-haze.jpg";
import weddingTable from "../../public/photos/wedding-table.jpg";
import worshipHands from "../../public/photos/worship-hands.jpg";

export const aboutPhoto = { src: aboutSilhouette, alt: "Silhouette of a saxophonist playing against a blue evening sky" };

export const EVENT_MANAGEMENT_URL = "https://event.saxborsahmusic.com";

// PLACEHOLDER: drop a 30–90 second performance recording at this path.
// Until the file exists, the hero player shows "Sample coming soon".
// Prefixed with the GitHub Pages base path (empty locally).
export const SAMPLE_AUDIO = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/audio/saxborsah-sample.mp3`;

const allSections = [
  { id: "top", label: "Home" },
  { id: "setlist", label: "Services" },
  { id: "about", label: "About" },
  { id: "media", label: "Media" },
  { id: "kind-words", label: "Reviews" },
  { id: "request", label: "Book" },
] as const;

export type ServiceId = "sax" | "band" | "sound" | "dj" | "consulting";

export const services: {
  id: ServiceId;
  name: string;
  summary: string;
  goodFor: string[];
  photo: { src: StaticImageData; alt: string };
}[] = [
  {
    id: "sax",
    name: "Live saxophone",
    summary:
      "Solo sax for the moments that need a melody: the walk down the aisle, the offertory, the first dance, the toast.",
    goodFor: ["Weddings", "Church services", "Corporate events", "Private functions"],
    photo: { src: saxHands, alt: "Hands on the keys of a gold saxophone" },
  },
  {
    id: "band",
    name: "Live band",
    summary:
      "A full band behind the horn when the room needs to move: highlife, gospel, jazz standards and dance-floor favourites.",
    goodFor: ["Receptions", "Galas", "Concerts", "Anniversaries"],
    photo: { src: stageHaze, alt: "Instruments and microphones on a hazy, spotlit stage" },
  },
  {
    id: "sound",
    name: "Sound rental",
    summary:
      "Speakers, mixers and microphones delivered, set up and tested, so every speech and every note reaches the back row.",
    goodFor: ["Outdoor events", "Conferences", "Church programmes"],
    photo: { src: mixerSliders, alt: "Close-up of the sliders on a mixing console" },
  },
  {
    id: "dj",
    name: "DJ services",
    summary:
      "A professional DJ to carry the night between live sets, or on their own when the brief is non-stop music.",
    goodFor: ["After-parties", "Birthdays", "End-of-year parties"],
    photo: { src: djDecks, alt: "A DJ's hand over glowing red decks" },
  },
  {
    id: "consulting",
    name: "Music consulting",
    summary:
      "Help choosing the music for your event: what plays when, how songs are arranged, and how the performance fits the programme.",
    goodFor: ["Wedding planning", "Programme design", "Choirs and bands"],
    photo: { src: weddingTable, alt: "Wedding table set with glassware and flowers" },
  },
];

export const steps = [
  {
    title: "Send a request",
    body: "Tell us the date, the venue and what you have in mind. It takes about two minutes.",
  },
  {
    title: "We get in touch",
    body: "Saxborsah reads every request personally and replies by email, WhatsApp or SMS.",
  },
  {
    title: "Your date is held",
    body: "Once the details and price are agreed, the date is confirmed for you. Nothing is paid online.",
  },
];

// Client quotes. The Reviews section (and its nav key) only appears once this
// list has entries, so the site never shows made-up reviews. Add real quotes,
// with the client's permission, in this shape:
//   { quote: "…", who: "Wedding couple", where: "Wedding reception" },
// The first quote is shown large; the rest sit in a column beside it.
export const testimonials: { quote: string; who: string; where: string }[] = [];

// Section navigation (key rail). Reviews is left out while there are no quotes.
export const sections = allSections.filter((s) => s.id !== "kind-words" || testimonials.length > 0);

// Media wall. Captions describe what is in each photo; "Video" items show a play
// button, so only use that kind once a real video is attached.
export const media: {
  kind: "Video" | "Photo";
  caption: string;
  shape: "tall" | "wide" | "square";
  photo: { src: StaticImageData; alt: string };
}[] = [
  { kind: "Photo", caption: "Gold sax up close", shape: "tall", photo: { src: saxGoldTall, alt: "A gold saxophone lit warmly against a dark background" } },
  { kind: "Photo", caption: "Worship night", shape: "wide", photo: { src: worshipHands, alt: "Hands raised in worship in front of a glowing stage sign" } },
  { kind: "Photo", caption: "Live band set", shape: "square", photo: { src: bandStageSmoke, alt: "A crowd with hands up in front of a smoky, golden-lit stage" } },
  { kind: "Photo", caption: "Dinner setting", shape: "square", photo: { src: dinnerCandles, alt: "A long candlelit dinner table set with white plates" } },
  { kind: "Photo", caption: "Sound desk", shape: "wide", photo: { src: soundDesk, alt: "A digital mixing console lit in blue" } },
];
