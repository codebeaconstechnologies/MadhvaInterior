import { CSSProperties, ReactNode } from "react";
import { whyChooseUs } from "../data/studio";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "./Promises.css";

// Line icons, in the same order as `whyChooseUs`. Drawn on with
// stroke-dashoffset when the card reveals, so keep them stroke-only.
const icons: ReactNode[] = [
  // Best price — tag
  <path key="p" d="M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9zM8 8h.01" />,
  // 3D visualization — cube
  <path key="c" d="M12 2l9 5v10l-9 5-9-5V7l9-5zM12 22V12M21 7l-9 5-9-5" />,
  // On-time delivery — clock
  <path key="t" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3.5 2" />,
  // Warranty — shield
  <path key="s" d="M12 2l8 3v6c0 5-3.4 9.2-8 11-4.6-1.8-8-6-8-11V5l8-3zM8.5 12l2.5 2.5 4.5-5" />,
  // Modern designs — compass
  <path key="m" d="M12 3l-7 18M12 3l7 18M7.5 15h9M12 3v-1" />,
  // Custom furniture — armchair
  <path key="f" d="M5 11V7a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v4M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v5H3v-5zM5 18v2M19 18v2" />,
];

export default function Promises() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.15);

  return (
    <div ref={ref} className={`promises${isVisible ? " is-visible" : ""}`}>
      {whyChooseUs.map((item, i) => (
        <article
          key={item.title}
          className={`promise promise--${i % 2 === 0 ? "navy" : "terracotta"}`}
          style={{ "--i": i } as CSSProperties}
        >
          <span className="promise__number" aria-hidden="true">
            {String(i + 1).padStart(2, "0")}
          </span>
          <svg
            className="promise__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {icons[i]}
          </svg>
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          <span className="promise__rule" aria-hidden="true" />
        </article>
      ))}
    </div>
  );
}
