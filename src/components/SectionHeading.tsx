import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  onDark = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1.1rem",
        alignItems: align === "center" ? "center" : "flex-start",
        textAlign: align === "center" ? "center" : "left",
        maxWidth: align === "center" ? "44rem" : undefined,
        marginInline: align === "center" ? "auto" : undefined,
      }}
    >
      {eyebrow && <span className={`eyebrow${onDark ? " eyebrow--on-dark" : ""}`}>{eyebrow}</span>}
      <h2>{title}</h2>
      <hr className={`divider${onDark ? " divider--on-dark" : ""}`} />
      {description && (
        <p className="lede" style={onDark ? { color: "var(--on-dark-muted)" } : undefined}>
          {description}
        </p>
      )}
    </div>
  );
}
