import { useEffect, useState } from "react";
import Button from "./Button";
import { studio } from "../data/studio";
import "./Hero.css";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <section className="hero">
      <div className="hero__media">
        <img
          src="/images/hero/hero-living-room.jpg"
          alt="Warm, marble-paneled living room designed by Madhva Interiors with a crystal chandelier and symmetrical seating"
          decoding="async"
          {...{ fetchpriority: "high" }}
        />
        <div className="hero__scrim" />
      </div>

      <div className={`hero__content container${mounted ? " is-in" : ""}`}>
        <span className="eyebrow eyebrow--on-dark hero__eyebrow">{studio.subtagline}</span>
        <h1>{studio.tagline}</h1>
        <p className="hero__lede">
          A Pune-based interior design studio crafting elegant, functional, and timeless
          spaces — built around the way you actually live.
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

      <div className="hero__badge">
        <span className="hero__badge-number">500+</span>
        <span className="hero__badge-label">Interiors delivered across Pune</span>
      </div>
    </section>
  );
}
