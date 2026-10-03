import { useEffect, useState } from "react";
import { beforeAfter } from "../data/studio";
import { useScrollReveal } from "../hooks/useScrollReveal";
import "./BeforeAfter.css";

export default function BeforeAfter() {
  const [activeId, setActiveId] = useState(beforeAfter[0].id);
  const [position, setPosition] = useState(50);
  const [touched, setTouched] = useState(false);
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>(0.35);

  const pair = beforeAfter.find((p) => p.id === activeId) ?? beforeAfter[0];

  // First time the slider scrolls into view, sweep the handle across once so
  // visitors see it is draggable. Stops as soon as they interact.
  useEffect(() => {
    if (!isVisible || touched) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const frames = [50, 78, 22, 50];
    const timers = frames.map((value, i) => window.setTimeout(() => setPosition(value), 500 + i * 900));
    return () => timers.forEach(window.clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);

  const selectPair = (id: string) => {
    setActiveId(id);
    setPosition(50);
    setTouched(true);
  };

  return (
    <div ref={ref} className={`ba${isVisible ? " is-visible" : ""}${touched ? " is-touched" : ""}`}>
      <div className="ba__tabs" role="tablist" aria-label="Choose a room">
        {beforeAfter.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={p.id === pair.id}
            className={p.id === pair.id ? "is-active" : ""}
            onClick={() => selectPair(p.id)}
          >
            {p.room}
          </button>
        ))}
      </div>

      <div className="ba__frame" style={{ ["--pos" as string]: `${position}%` }}>
        <img key={`${pair.id}-after`} className="ba__img ba__img--after" src={pair.after} alt={`${pair.room} after the Madhva makeover`} />
        <img
          key={`${pair.id}-before`}
          className={`ba__img ba__img--before${pair.before ? "" : " ba__img--placeholder"}`}
          src={pair.before ?? pair.after}
          alt={pair.before ? `${pair.room} before — the empty flat as handed over` : ""}
        />

        <span className="ba__tag ba__tag--before">Before</span>
        <span className="ba__tag ba__tag--after">After</span>

        <span className="ba__handle" aria-hidden="true">
          <span className="ba__knob">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
            </svg>
          </span>
        </span>

        <input
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={position}
          className="ba__range"
          aria-label={`Reveal ${pair.room} before and after`}
          onPointerDown={() => setTouched(true)}
          onKeyDown={() => setTouched(true)}
          onChange={(e) => {
            setTouched(true);
            setPosition(Number(e.target.value));
          }}
        />
      </div>

      <p key={pair.id} className="ba__caption">
        {pair.caption}
      </p>
    </div>
  );
}
