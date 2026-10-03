import { CSSProperties, useEffect, useRef, useState } from "react";
import { processSteps } from "../data/studio";
import "./ProcessTimeline.css";

/**
 * Process steps on a line that fills as the section scrolls through the
 * viewport. Each step lights up once the fill reaches it.
 */
export default function ProcessTimeline() {
  const ref = useRef<HTMLOListElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the list's top reaches 85% down the viewport, 1 when its
      // bottom reaches 55% — so the line completes while still in view.
      const start = vh * 0.85;
      const end = vh * 0.55;
      const total = rect.height + (start - end);
      const value = (start - rect.top) / total;
      setProgress(Math.min(1, Math.max(0, value)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  const count = processSteps.length;

  return (
    <ol ref={ref} className="timeline" style={{ "--progress": progress } as CSSProperties}>
      <span className="timeline__track" aria-hidden="true">
        <span className="timeline__fill" />
      </span>
      {processSteps.map((step, i) => {
        // Step i sits at i / (count - 1) along the line.
        const reached = progress >= (i / (count - 1)) * 0.92;
        return (
          <li key={step.number} className={`timeline__step${reached ? " is-active" : ""}`}>
            <span className="timeline__dot" aria-hidden="true">
              {step.number}
            </span>
            <div className="timeline__body">
              <h4>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
