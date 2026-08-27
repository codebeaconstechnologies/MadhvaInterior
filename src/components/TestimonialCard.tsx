import { Testimonial } from "../data/testimonials";
import "./TestimonialCard.css";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="testimonial-card">
      <span className="testimonial-card__quote-mark" aria-hidden="true">
        &rdquo;
      </span>
      <blockquote>&ldquo;{testimonial.quote}&rdquo;</blockquote>
      <figcaption>
        <img src={testimonial.photo} alt="" loading="lazy" />
        <span>
          <span className="testimonial-card__name">{testimonial.name}</span>
          <span className="testimonial-card__meta">
            {testimonial.design} · {testimonial.bhk}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
