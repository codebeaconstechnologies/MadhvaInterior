import { useCallback, useEffect, useState } from "react";
import Button from "./Button";
import { studio } from "../data/studio";
import { heroSlides } from "../data/images";
import "./Hero.css";

const SLIDE_MS = 4000;

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const goTo = useCallback((next: number) => {
    setActive((current) => {
      const target = (next + heroSlides.length) % heroSlides.length;
      if (target !== current) setPrevious(current);
      return target;
    });
  }, []);

  // Auto-advance. Re-arming on every change of `active` also restarts the
  // timer after a manual jump, so a clicked slide gets its full duration.
  useEffect(() => {
    if (paused) return;
    const id = window.setTimeout(() => goTo(active + 1), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [active, paused, goTo]);

  const slide = heroSlides[active];

  return (
    <section
      className={`hero${paused ? " is-paused" : ""}`}
      aria-roledescription="carousel"
      aria-label="Featured interiors"
    >
      <div
        className="hero__stage"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {heroSlides.map((s, i) => (
          <figure
            key={s.src}
            className={`hero__slide hero__slide--${s.motion}${i === active ? " is-active" : ""}${
              i === previous ? " is-leaving" : ""
            }`}
            aria-hidden={i !== active}
          >
            <img
              src={s.src}
              alt={s.alt}
              decoding="async"
              loading={i < 2 ? "eager" : "lazy"}
              {...(i === 0 ? { fetchpriority: "high" } : {})}
            />
          </figure>
        ))}
        <div className="hero__scrim" />

        <div className="hero__controls">
          <div className="hero__caption" aria-live="polite">
            <span className="hero__counter">
              {String(active + 1).padStart(2, "0")}
              <span> / {String(heroSlides.length).padStart(2, "0")}</span>
            </span>
            <span key={active} className="hero__label">
              {slide.label}
            </span>
          </div>
          <div className="hero__arrows">
            <button type="button" onClick={() => goTo(active - 1)} aria-label="Previous slide">
              ←
            </button>
            <button type="button" onClick={() => goTo(active + 1)} aria-label="Next slide">
              →
            </button>
          </div>
        </div>

        <div className="hero__progress" role="tablist" aria-label="Choose slide">
          {heroSlides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Slide ${i + 1}: ${s.label}`}
              className={`${i === active ? "is-active" : ""}${i < active ? " is-done" : ""}`}
              style={{ animationDuration: `${SLIDE_MS}ms` }}
              onClick={() => goTo(i)}
            >
              <span style={{ animationDuration: `${SLIDE_MS}ms` }} />
            </button>
          ))}
        </div>
      </div>

      <div className="hero__panel">
        <div className={`hero__content${mounted ? " is-in" : ""}`}>
          {/* The label sits inside the h1 so search engines read the heading as
              "Interior Designers in Pune — Your Dream Interiors…". */}
          <h1>
            <span className="eyebrow eyebrow--on-dark hero__eyebrow">Interior Designers in Pune</span>{" "}
            {studio.tagline}
          </h1>
          <p className="hero__lede">
            A Pune-based studio designing residential and commercial interiors that are
            elegant, functional, and timeless — built around the way you actually live.
          </p>
          <div className="hero__actions">
            <Button to="/gallery" variant="outline-dark">
              Explore Our Work
            </Button>
            <Button to="/contact" variant="ghost" className="hero__ghost">
              Start a Conversation →
            </Button>
          </div>
        </div>
      </div>

      <div className="hero__badge">
        <span className="hero__badge-number">2</span>
        <span className="hero__badge-text">
          <span className="hero__badge-label">Projects at a time</span>
          <span className="hero__badge-tagline">We don&rsquo;t juggle. We perfect.</span>
        </span>
      </div>
    </section>
  );
}
