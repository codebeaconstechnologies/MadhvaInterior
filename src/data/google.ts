// Google Business Profile details shown on the site. Copied by hand from the
// profile (no API), so update `rating` if it changes.

const query = encodeURIComponent("Madhva Interiors & Design Studio, Charholi Budruk, Pimpri-Chinchwad");

export const google = {
  rating: 4.8,
  /** Opens the Business Profile on Google Maps. */
  profileUrl: `https://www.google.com/maps/search/?api=1&query=${query}`,
  /** Opens Google Maps directions to the studio. */
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${query}`,
  /** Free keyless Maps embed of the listing. */
  mapEmbedUrl: `https://maps.google.com/maps?q=${query}&output=embed`,
};
