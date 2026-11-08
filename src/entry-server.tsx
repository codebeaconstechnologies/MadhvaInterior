/* Build-time prerendering (see scripts/prerender.mjs): renders each page to
   static HTML so search engines and link previews see real content and the
   right title/description without running JavaScript. */

import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import { SeoCollector, type SeoTags } from "./lib/seo";
import { projects } from "./data/projects";
import { services } from "./data/services";
import { locations } from "./data/locations";
import { blogPosts, loadPostHtml } from "./data/blog";

/** Every indexable page, in sitemap order. Adding a project, service, area
    or blog article adds its page here (and to sitemap.xml) automatically. */
export const routes = [
  "/",
  "/services",
  ...services.map((s) => `/services/${s.slug}`),
  ...locations.map((l) => `/locations/${l.slug}`),
  "/gallery",
  ...projects.map((p) => `/gallery/${p.slug}`),
  "/blog",
  ...blogPosts.map((p) => `/blog/${p.slug}`),
  "/about",
  "/contact",
];

/** Main photos per page, listed in the sitemap for image search. */
export const routeImages: Record<string, string[]> = {
  ...Object.fromEntries(
    projects.map((p) => [`/gallery/${p.slug}`, [...new Set([p.cover.src, ...p.images.map((img) => img.src)])]])
  ),
  ...Object.fromEntries(
    services.map((s) => [`/services/${s.slug}`, [...new Set([s.image.src, ...s.gallery.map((img) => img.src)])]])
  ),
  ...Object.fromEntries(blogPosts.map((p) => [`/blog/${p.slug}`, [p.image]])),
};

/** Real last-modified dates where we have them (others use the build date). */
export const routeLastmod: Record<string, string> = Object.fromEntries(
  blogPosts.map((p) => [`/blog/${p.slug}`, p.updated])
);

/** Loads everything that is fetched on demand in the browser (article bodies). */
export async function prepare(): Promise<void> {
  await Promise.all(blogPosts.map((p) => loadPostHtml(p.slug)));
}

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
