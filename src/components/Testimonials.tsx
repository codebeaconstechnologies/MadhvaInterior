import { CSSProperties, useEffect, useState } from "react";
import { Testimonial, testimonials } from "../data/testimonials";
import "./Testimonials.css";

const SLIDE_MS = 8000;

function Portrait({ t, className }: { t: Testimonial; className: string }) {
  const { x, y, size } = t.crop;
  const style = {
    "--scale": t.photoWidth / size,
    "--dx": x / size,
    "--dy": y / size,
  } as CSSProperties;

  return (
    <span className={className} style={style}>
      <img src={t.photo} alt="" loading="lazy" />
    </span>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const t = testimonials[active];
  const count = testimonials.length;
  const autoplay = !paused && !reducedMotion;

  const goTo = (i: number) => setActive((i + count) % count);

  useEffect(() => {
    if (!autoplay) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % count), SLIDE_MS);
    return () => window.clearTimeout(id);
  }, [active, autoplay, count]);

  return (
    <div
      className="tm"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="tm__stage" aria-roledescription="carousel" aria-label="Client testimonials">
        <span className="tm__mark" aria-hidden="true">
          &ldquo;
        </span>

        <figure key={t.id} className="tm__slide" aria-live="polite">
          <Portrait t={t} className="tm__portrait" />
          <div className="tm__body">
            <blockquote className="tm__quote">{t.quote}</blockquote>
            <figcaption className="tm__caption">
              <span className="tm__name">{t.name}</span>
              <span className="tm__meta">
                {t.design} · {t.bhk}
              </span>
            </figcaption>
          </div>
        </figure>

        <div className="tm__controls">
          <span className="tm__count">
            {String(active + 1).padStart(2, "0")}
            <span> / {String(count).padStart(2, "0")}</span>
          </span>
          <span className="tm__progress" aria-hidden="true">
            <span
              key={active}
              className={autoplay ? "is-running" : ""}
              style={{ animationDuration: `${SLIDE_MS}ms` }}
            />
          </span>
          <div className="tm__arrows">
            <button type="button" onClick={() => goTo(active - 1)} aria-label="Previous testimonial">
              ←
            </button>
            <button type="button" onClick={() => goTo(active + 1)} aria-label="Next testimonial">
              →
            </button>
          </div>
        </div>
      </div>

      <ul className="tm__list" role="tablist" aria-label="Choose a client">
        {testimonials.map((item, i) => (
          <li key={item.id}>
            <button
              type="button"
              role="tab"
              aria-selected={i === active}
              className={i === active ? "is-active" : ""}
              onClick={() => goTo(i)}
            >
              <Portrait t={item} className="tm__avatar" />
              <span className="tm__list-text">
                <span className="tm__list-name">{item.name}</span>
                <span className="tm__list-meta">{item.design}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
