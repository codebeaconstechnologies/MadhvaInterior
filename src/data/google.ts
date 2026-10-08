// Google Business Profile details shown on the site. These are copied by hand
// from the profile (no API), so update `rating`, `reviewCount` and `reviews`
// when new reviews come in.

const query = encodeURIComponent("Madhva Interiors & Design Studio, Charholi Budruk, Pimpri-Chinchwad");

export const google = {
  rating: 4.8,
  reviewCount: 4,
  /** Opens the Business Profile on Google Maps (reviews, photos, directions). */
  profileUrl: `https://www.google.com/maps/search/?api=1&query=${query}`,
  /** Opens Google Maps directions to the studio. */
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${query}`,
  /**
   * Direct "write a review" link. Copy it from the Business Profile →
   * "Ask for reviews" (looks like https://g.page/r/…/review). Until it's set,
   * the review button opens the profile instead.
   */
  writeReviewUrl: "",
  /** Free keyless Maps embed of the listing. */
  mapEmbedUrl: `https://maps.google.com/maps?q=${query}&output=embed`,
};

export interface GoogleReview {
  author: string;
  rating: number;
  /** As Google shows it, e.g. "2 months ago" */
  when: string;
  text: string;
}

// Reviews from the Business Profile, newest first. Leave empty to hide the
// reviews strip (the rating badge and map still show).
export const googleReviews: GoogleReview[] = [];
