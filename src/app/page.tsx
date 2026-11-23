import Image from "next/image";
import emblem from "../../public/brand/emblem.png";
import wordmark from "../../public/brand/wordmark.png";
import wordmarkDeep from "../../public/brand/wordmark-deep.png";
import { FilmFrame } from "@/components/sax/FilmFrame";
import { HeroPlayer } from "@/components/sax/HeroPlayer";
import { KeyRail } from "@/components/sax/KeyRail";
import { MiniPlayer } from "@/components/sax/MiniPlayer";
import { SamplePlayerProvider } from "@/components/sax/SamplePlayer";
import { ServiceList } from "@/components/sax/ServiceList";
import { RequestForm } from "@/components/sax/RequestForm";
import {
  EVENT_MANAGEMENT_URL,
  SAMPLE_AUDIO,
  aboutPhoto,
  media,
  services,
  steps,
  testimonials,
} from "@/content/saxborsah";

const eyebrow = "font-utility text-[0.6875rem] uppercase tracking-[0.18em] text-gold-deep";
const sectionTitle =
  "font-display font-black uppercase leading-[0.86] tracking-[-0.01em] text-ink text-[clamp(3rem,8vw,7rem)]";
const d = (ms: string) => ({ "--d": ms }) as React.CSSProperties;

const [featured, ...others] = testimonials;

// Slight, varied tilts so the media wall reads as slides laid on a table.
const tilts = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1", "rotate-[0.5deg]"];

const occasions =["Weddings", "Church services", "Corporate events", "Private functions"];

export default function SaxborsahHome() {
  return (
    <SamplePlayerProvider src={SAMPLE_AUDIO}>
      <KeyRail />
      <MiniPlayer />

      <div className="pb-20 md:pb-0 md:pl-24">
        <header className="mx-auto flex max-w-[88rem] items-center justify-between px-5 pt-6 md:px-10 md:pt-8">
          <a href="#top" aria-label="Saxborsah Music & Event Management, home" className="flex items-center gap-3 md:gap-4">
            <Image src={wordmarkDeep} alt="" className="h-6 w-auto md:h-7" preload />
            <span aria-hidden className="h-7 w-px bg-gold/50 md:h-8" />
            <span className="font-utility text-[0.5625rem] uppercase leading-[1.35] tracking-[0.16em] text-ink/80 md:text-[0.625rem]">
              Music &amp;
              <br />
              Event Management
            </span>
          </a>
          <a
            href="#request"
            className="border border-gold/60 px-4 py-2 font-utility text-[0.6875rem] uppercase tracking-[0.14em] text-gold-deep transition-colors hover:border-gold-hi hover:bg-gold hover:text-ink"
          >
            <span className="sm:hidden">Book</span>
            <span className="hidden sm:inline">Request a performance</span>
          </a>
        </header>

        <main>
          {/* Hero */}
          {/* Full-width misprinted headline; the record "slide" is pinned over its lower lines. */}
          <section id="top" className="relative mx-auto max-w-[88rem] px-5 pt-10 pb-16 md:px-10 md:pt-12 md:pb-20">
            <p className={eyebrow}>Saxophone · Live band · Sound · DJ</p>
            <h1 className="relative mt-5 font-display font-black uppercase leading-[0.82] tracking-[-0.015em] text-[clamp(4.25rem,12.2vw,12.5rem)]">
              <span className="rise-line">
                <span className="misprint" data-text="Live sax" style={d("100ms")}>Live sax</span>
              </span>
              <span className="rise-line">
                <span className="misprint" data-text="that carries" style={d("200ms")}>that carries</span>
              </span>
              <span className="rise-line">
                <span className="misprint text-gold [--outline:var(--color-ink)]" data-text="the room." style={d("300ms")}>
                  the room.
                </span>
              </span>
            </h1>

            <div className="mt-10 grid gap-14 md:mt-0 md:grid-cols-[1fr_1.05fr] md:items-start md:gap-10">
              <div className="relative z-10 mx-auto w-full max-w-[34rem] md:order-2 md:-mt-[clamp(7rem,13vw,14rem)] md:mr-0">
                <HeroPlayer emblem={emblem} />
              </div>

              <div className="md:order-1 md:pt-12">
              <p className="max-w-[34rem] text-lg leading-relaxed text-ink/85 md:text-xl">
                Saxborsah plays the moments people remember: the walk down the aisle, a church on its
                feet, a dinner that turns into a dance. Tell us your date and we’ll take it from there.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
                <a
                  href="#request"
                  className="bg-gold px-8 py-4 font-display text-lg font-bold uppercase tracking-[0.06em] text-ink transition-colors hover:bg-gold-hi"
                >
                  Request a performance
                </a>
                <a
                  href="#setlist"
                  className="font-utility text-xs uppercase tracking-[0.14em] text-ink/80 underline decoration-gold/50 underline-offset-[6px] transition-colors hover:text-gold-deep hover:decoration-gold-hi"
                >
                  See what you can book
                </a>
              </div>
              <ul className="mt-14 flex flex-wrap gap-x-8 gap-y-2 border-t border-gold/20 pt-5">
                {occasions.map((o) => (
                  <li key={o} className="font-utility text-[0.6875rem] uppercase tracking-[0.18em] text-muted">{o}</li>
                ))}
              </ul>
              </div>
            </div>
          </section>

          {/* Services as a setlist */}
          <section id="setlist" className="mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-36">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className={eyebrow}>What you can book</p>
                <h2 className={`${sectionTitle} mt-4`}>The setlist</h2>
              </div>
              <p className="max-w-sm text-ink/75">
                Book one, or put several together. A wedding might be sax for the ceremony, band for
                the reception and a DJ to close the night.
              </p>
            </div>

            <ServiceList services={services} />
          </section>

          {/* About */}
          <section id="about" className="bg-stone-deep md:-ml-24 md:pl-24">
            <div className="mx-auto grid max-w-[88rem] gap-14 px-5 py-24 md:grid-cols-[1fr_1.15fr] md:items-center md:px-10 md:py-36">
              {/* PLACEHOLDER: stock silhouette; replace with a real portrait of Saxborsah performing. */}
              <FilmFrame
                label="Portrait"
                frame="07"
                className="mx-auto w-full max-w-md -rotate-2"
                innerClassName="aspect-[4/5]"
              >
                <Image
                  src={aboutPhoto.src}
                  alt={aboutPhoto.alt}
                  placeholder="blur"
                  sizes="(min-width: 768px) 28rem, 90vw"
                  className="h-full w-full object-cover"
                />
              </FilmFrame>

              <div>
                <h2 className={sectionTitle}>
                  One horn,
                  <br />
                  <span className="text-gold-deep">every room.</span>
                </h2>
                {/* PLACEHOLDER: expand with the real biography. */}
                <div className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-ink/85">
                  <p>
                    Saxborsah is a saxophonist and bandleader who plays weddings, church services,
                    corporate events and private functions. Some days that means a single melody
                    under a quiet ceremony; other nights, a full band and a packed floor.
                  </p>
                  <p>
                    Every booking is handled personally, from the first message to the last note, so
                    the music fits your programme rather than the other way round.
                  </p>
                </div>
                <dl className="mt-10 grid gap-6 border-t border-gold/20 pt-8 sm:grid-cols-2">
                  <div>
                    <dt className="font-utility text-[0.625rem] uppercase tracking-[0.16em] text-muted">Plays for</dt>
                    <dd className="mt-2">Weddings, worship, corporate and private events</dd>
                  </div>
                  <div>
                    <dt className="font-utility text-[0.625rem] uppercase tracking-[0.16em] text-muted">Replies by</dt>
                    <dd className="mt-2">Email, WhatsApp or SMS</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          {/* Media */}
          <section id="media" className="mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-36">
            <div>
              <h2 className={sectionTitle}>Hear it, see it</h2>
            </div>
            <div className="mt-14 grid auto-rows-[13rem] grid-cols-2 gap-4 md:auto-rows-[16rem] md:grid-cols-4 md:gap-6">
              {media.map((m, i) => (
                <FilmFrame
                  key={m.caption}
                  label={m.kind}
                  frame={String(12 + i * 2)}
                  className={`group flex h-full flex-col transition-transform duration-300 hover:rotate-0 ${tilts[i % tilts.length]} ${m.shape === "tall" ? "row-span-2" : ""} ${m.shape === "wide" ? "col-span-2" : ""}`}
                  innerClassName="flex-1"
                >
                  <Image
                    src={m.photo.src}
                    alt={m.photo.alt}
                    placeholder="blur"
                    sizes={m.shape === "wide" ? "(min-width: 768px) 45vw, 90vw" : "(min-width: 768px) 22vw, 45vw"}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {m.kind === "Video" && (
                    <span aria-hidden className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-gold/50 transition-transform duration-300 group-hover:scale-110">
                      <span className="ml-1 border-y-[9px] border-l-[14px] border-y-transparent border-l-gold" />
                    </span>
                  )}
                  <span className="absolute bottom-0 left-0 bg-film px-2.5 py-1.5 font-utility text-[0.625rem] uppercase tracking-[0.16em] text-film-text">
                    {m.caption}
                  </span>
                </FilmFrame>
              ))}
            </div>
          </section>

          {/* Testimonials: only rendered once real client quotes exist */}
          {featured && (
          <section id="kind-words" className="border-y border-gold/15 bg-stone-up/40 md:-ml-24 md:pl-24">
            <div className="mx-auto max-w-[88rem] px-5 py-24 md:px-10 md:py-32">
              <h2 className={eyebrow}>Kind words</h2>
              {/* One featured quote set large, the rest as a quieter column beside it. */}
              <div className="mt-12 grid gap-14 md:grid-cols-[1.6fr_1fr] md:gap-20">
                <figure>
                  <blockquote className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold uppercase leading-[0.98] text-ink">
                    <span aria-hidden className="text-gold-deep">“</span>
                    {featured.quote}
                    <span aria-hidden className="text-gold-deep">”</span>
                  </blockquote>
                  <figcaption className="mt-8 flex items-baseline gap-4">
                    <span className="text-ink">{featured.who}</span>
                    <span className="font-utility text-[0.625rem] uppercase tracking-[0.16em] text-muted">{featured.where}</span>
                  </figcaption>
                </figure>
                <ul className="divide-y divide-gold/20 border-y border-gold/20">
                  {others.map((t) => (
                    <li key={t.who} className="py-7">
                      <figure>
                        <blockquote className="text-lg leading-relaxed text-ink/90">“{t.quote}”</blockquote>
                        <figcaption className="mt-4">
                          <span className="text-sm text-ink">{t.who}</span>
                          <span className="ml-3 font-utility text-[0.625rem] uppercase tracking-[0.16em] text-muted">{t.where}</span>
                        </figcaption>
                      </figure>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
          )}

          {/* Booking */}
          <section id="request" className="mx-auto grid max-w-[88rem] gap-16 px-5 py-24 md:grid-cols-[1fr_1.3fr] md:px-10 md:py-36">
            <div>
              <h2 className={sectionTitle}>
                Tell us
                <br />
                <span className="text-gold-deep">your date.</span>
              </h2>
              <ol className="mt-12 space-y-8">
                {steps.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-4">
                    <span className="font-display text-3xl font-bold leading-none text-gold-deep">{i + 1}</span>
                    <div>
                      <p className="font-display text-2xl font-bold uppercase leading-none">{s.title}</p>
                      <p className="mt-2 max-w-sm leading-relaxed text-ink/75">{s.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="border border-gold/20 bg-stone-deep/60 p-6 sm:p-10">
              <RequestForm />
            </div>
          </section>

          {/* Cross-link to Event Management */}
          <section className="mx-auto max-w-[88rem] px-5 pb-24 md:px-10 md:pb-32">
            <a href={EVENT_MANAGEMENT_URL} className="group flex flex-col gap-6 border-t border-gold/30 pt-10 md:flex-row md:items-end md:justify-between">
              <div>
                <p className={eyebrow}>Planning a full event?</p>
                <p className="mt-4 max-w-2xl font-display text-[clamp(2rem,4.5vw,3.75rem)] font-bold uppercase leading-[0.95] transition-colors group-hover:text-gold-deep">
                  Planning, rentals and decoration from our Event Management team.
                </p>
              </div>
              <span className="font-utility text-xs uppercase tracking-[0.14em] text-gold-deep">Visit Event Management ↗</span>
            </a>
          </section>
        </main>

        <footer className="bg-film text-film-text md:-ml-24 md:pl-24">
          <div className="mx-auto flex max-w-[88rem] flex-col gap-10 px-5 py-14 md:flex-row md:items-end md:justify-between md:px-10">
            <div className="flex items-center gap-4 md:gap-5">
              <Image src={wordmark} alt="Saxborsah" className="h-10 w-auto md:h-12" />
              <span aria-hidden className="h-11 w-px bg-logo-gold/40 md:h-13" />
              <span className="font-utility text-[0.6875rem] uppercase leading-[1.4] tracking-[0.16em] text-film-text md:text-xs">
                Music &amp;
                <br />
                Event Management
              </span>
            </div>
            <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 font-utility text-[0.6875rem] uppercase tracking-[0.14em] text-film-text">
              <a href="#setlist" className="hover:text-logo-gold">Services</a>
              <a href="#about" className="hover:text-logo-gold">About</a>
              <a href="#media" className="hover:text-logo-gold">Media</a>
              <a href="#request" className="hover:text-logo-gold">Book</a>
              <a href={EVENT_MANAGEMENT_URL} className="hover:text-logo-gold">Event Management ↗</a>
            </nav>
          </div>
          <p className="mx-auto max-w-[88rem] px-5 pb-10 font-utility text-[0.625rem] uppercase tracking-[0.16em] text-film-text/70 md:px-10">
            © Saxborsah Music &amp; Event Management
          </p>
        </footer>
      </div>
    </SamplePlayerProvider>
  );
}
