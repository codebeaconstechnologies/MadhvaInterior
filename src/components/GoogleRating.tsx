import { google } from "../data/google";
import "./GoogleRating.css";

// Google "G" mark, used to attribute the rating and reviews to Google.
function GoogleMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.7 13.2l7.9 6.2C12.5 13.6 17.8 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.7 6c4.5-4.2 6.9-10.4 6.9-17.7z" />
      <path fill="#FBBC05" d="M10.6 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.2C1 16.6 0 20.2 0 24s1 7.4 2.7 10.8l7.9-6.2z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.7-6c-2.1 1.4-4.9 2.3-8.2 2.3-6.2 0-11.5-4.1-13.4-9.9l-7.9 6.2C6.6 42.6 14.6 48 24 48z" />
    </svg>
  );
}

/** Five stars filled to `rating` (fractions shown as a partial star). */
function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <span className={`stars ${className}`} role="img" aria-label={`${rating} out of 5 stars`}>
      <span className="stars__base" aria-hidden="true">★★★★★</span>
      <span className="stars__fill" aria-hidden="true" style={{ width: `${(rating / 5) * 100}%` }}>
        ★★★★★
      </span>
    </span>
  );
}

/** "G 4.8 ★★★★★" — links to the Business Profile on Google. */
export default function GoogleRating() {
  return (
    <a
      href={google.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="google-rating"
      aria-label={`Rated ${google.rating} out of 5 on Google`}
    >
      <GoogleMark className="google-rating__mark" />
      <span className="google-rating__score">{google.rating.toFixed(1)}</span>
      <Stars rating={google.rating} />
    </a>
  );
}
