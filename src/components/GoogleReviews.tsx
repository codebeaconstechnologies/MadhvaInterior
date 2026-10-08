import { google, googleReviews } from "../data/google";
import { GoogleMark, Stars } from "./GoogleRating";
import "./GoogleReviews.css";

/** Reviews copied from the Google Business Profile, with links back to it. */
export default function GoogleReviews() {
  if (googleReviews.length === 0) return null;

  return (
    <div className="google-reviews">
      <ul className="google-reviews__list">
        {googleReviews.map((review) => (
          <li key={review.author} className="google-review">
            <div className="google-review__head">
              <span className="google-review__avatar" aria-hidden="true">
                {review.author.charAt(0)}
              </span>
              <span className="google-review__who">
                <span className="google-review__author">{review.author}</span>
                <span className="google-review__when">{review.when}</span>
              </span>
              <GoogleMark className="google-review__mark" />
            </div>
            <Stars rating={review.rating} />
            <p className="google-review__text">{review.text}</p>
          </li>
        ))}
      </ul>

      <div className="google-reviews__actions">
        <a href={google.profileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
          See all reviews on Google
        </a>
        <a
          href={google.writeReviewUrl || google.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost"
        >
          Write a review →
        </a>
      </div>
    </div>
  );
}
