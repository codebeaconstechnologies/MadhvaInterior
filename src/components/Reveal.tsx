import { CSSProperties, ReactNode } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** For content above the fold: fade in on page load with CSS, without waiting for JavaScript. */
  immediate?: boolean;
}

export default function Reveal({ children, delay = 0, className = "", immediate = false }: RevealProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  const style: CSSProperties = delay ? { [immediate ? "animationDelay" : "transitionDelay"]: `${delay}ms` } : {};
  const state = immediate ? " reveal--now" : isVisible ? " is-visible" : "";

  return (
    <div ref={ref} className={`reveal${state}${className ? ` ${className}` : ""}`} style={style}>
      {children}
    </div>
  );
}
