/* global console */
/* Runs after `vite build` + the SSR build of src/entry-server.tsx.
   Writes one static HTML file per page (about.html is served at /about on
   Cloudflare Pages), a 404.html for unknown URLs, and sitemap.xml. */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");
const SITE = "https://www.madhvainteriors.com";

const { render, routes, routeImages } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);
const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const SEO_BLOCK = /<!--seo-->[\s\S]*?<!--\/seo-->/;
if (!SEO_BLOCK.test(template)) throw new Error("index.html is missing the <!--seo--> … <!--/seo--> markers");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function headTags(seo) {
  const lines = [`<title>${esc(seo.title)}</title>`];
  for (const m of seo.meta) lines.push(`<meta ${m.attr}="${m.key}" content="${esc(m.content)}" />`);
  if (seo.canonical) lines.push(`<link rel="canonical" href="${esc(seo.canonical)}" />`);
  return lines.join("\n    ");
}

function page(url) {
  const { html, seo } = render(url);
  if (!seo) throw new Error(`No <Seo> rendered for ${url}`);
  return template
    .replace(SEO_BLOCK, headTags(seo))
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
}

function write(file, contents) {
  const out = path.join(dist, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, contents);
}

for (const url of routes) {
  write(url === "/" ? "index.html" : `${url.slice(1)}.html`, page(url));
}
// Cloudflare Pages serves this, with a 404 status, for any unknown URL.
write("404.html", page("/__not-found__"));

const today = new Date().toISOString().slice(0, 10);
const urls = routes.map((url) => {
  const images = (routeImages[url] ?? [])
    .map((src) => `\n    <image:image><image:loc>${esc(SITE + encodeURI(src))}</image:loc></image:image>`)
    .join("");
  return `  <url>\n    <loc>${SITE}${url === "/" ? "/" : url}</loc>\n    <lastmod>${today}</lastmod>${images}\n  </url>`;
});
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join("\n")}
</urlset>
`
);

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${routes.length} pages + 404.html, sitemap.xml (${routes.length} URLs)`);
