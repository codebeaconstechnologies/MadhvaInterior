/* Page SEO tags, shared by <Seo> in the browser and by build-time
   prerendering (src/entry-server.tsx). */

import { createContext } from "react";
import { studio } from "../data/studio";

export interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  /** Keep the page out of search results (e.g. the 404 page). */
  noindex?: boolean;
}

export interface SeoTags {
  title: string;
  meta: { attr: "name" | "property"; key: string; content: string }[];
  canonical?: string;
}

/** The <title>, meta and canonical tags for a page. */
export function seoTags({ title, description, path, image, type = "website", noindex }: SeoProps): SeoTags {
  const fullTitle = title.includes(studio.name) ? title : `${title} | ${studio.name}`;
  const url = `${studio.siteUrl}${path}`;
  const ogImage = image ?? `${studio.siteUrl}/images/og-image.jpg`;

  return {
    title: fullTitle,
    canonical: noindex ? undefined : url,
    meta: [
      { attr: "name", key: "description", content: description },
      { attr: "name", key: "robots", content: noindex ? "noindex, follow" : "index, follow, max-image-preview:large" },
      { attr: "property", key: "og:title", content: fullTitle },
      { attr: "property", key: "og:description", content: description },
      { attr: "property", key: "og:url", content: url },
      { attr: "property", key: "og:type", content: type },
      { attr: "property", key: "og:image", content: ogImage },
      { attr: "property", key: "og:site_name", content: studio.fullName },
      { attr: "property", key: "og:locale", content: "en_IN" },
      { attr: "name", key: "twitter:card", content: "summary_large_image" },
      { attr: "name", key: "twitter:title", content: fullTitle },
      { attr: "name", key: "twitter:description", content: description },
      { attr: "name", key: "twitter:image", content: ogImage },
    ],
  };
}

/** Set during build-time prerendering to capture each page's tags. */
export const SeoCollector = createContext<((tags: SeoTags) => void) | null>(null);
