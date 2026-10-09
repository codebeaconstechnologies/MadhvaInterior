/* Build-time prerendering (see scripts/prerender.mjs): renders each page to
   static HTML so search engines and link previews see real content and the
   right title/description without running JavaScript. */

import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { SeoCollector, type SeoTags } from "./lib/seo";
import { projects } from "./data/projects";

/** Every indexable page, in sitemap order. */
export const routes = [
  "/",
  "/about",
  "/gallery",
  ...projects.map((p) => `/gallery/${p.slug}`),
  "/contact",
];

/** Main photos per page, listed in the sitemap for image search. */
export const routeImages: Record<string, string[]> = Object.fromEntries(
  projects.map((p) => [`/gallery/${p.slug}`, [...new Set([p.cover.src, ...p.images.map((img) => img.src)])]])
);

export function render(url: string): { html: string; seo: SeoTags | null } {
  let seo: SeoTags | null = null;
  const html = renderToString(
    <SeoCollector.Provider value={(tags) => (seo = tags)}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </SeoCollector.Provider>
  );
  return { html, seo };
}
