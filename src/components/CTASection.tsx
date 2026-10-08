import Button from "./Button";
import Reveal from "./Reveal";
import "./CTASection.css";

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function CTASection({
  eyebrow = "Let's Talk",
  title,
  description,
}: CTASectionProps) {
  return (
    <section className="cta-section">
      <div className="container cta-section__inner">
        <Reveal>
          <span className="eyebrow cta-section__eyebrow">{eyebrow}</span>
          <h2>{title}</h2>
          {description && <p className="cta-section__desc">{description}</p>}
          <div className="cta-section__actions">
            <Button to="/contact" variant="outline-dark">
              Contact the Studio
            </Button>
            <a href="tel:+919270304552" className="cta-section__phone">
              or call +91 92703 04552
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
