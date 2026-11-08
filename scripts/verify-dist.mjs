/* global console, process */
/* Checks the built site in dist/ before it is deployed (runs at the end of
   `npm run build`, or on its own with `npm test`). Fails the build on:
     - a sitemap URL without a prerendered page
     - a page missing its title, description, canonical or single <h1>
     - duplicate titles or descriptions
     - a canonical that isn't the page's own URL, or a stray noindex
     - JSON-LD that doesn't parse
     - internal links or images that point at nothing
   and prints warnings for softer issues (long titles, heading jumps). */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const SITE = "https://www.madhvainteriors.com";

const errors = [];
const warnings = [];
const fail = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

const read = (file) => fs.readFileSync(path.join(dist, file), "utf8");
const exists = (file) => fs.existsSync(path.join(dist, file));
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'");

/** URL path → the file Cloudflare Pages serves for it. */
const fileFor = (urlPath) => (urlPath === "/" ? "index.html" : `${urlPath.slice(1)}.html`);

// ---------- sitemap + robots ----------
const sitemap = read("sitemap.xml");
if (!sitemap.startsWith("<?xml")) fail("sitemap.xml: missing XML declaration");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => !/\.(jpe?g|png|webp)$/i.test(u));
if (urls.length === 0) fail("sitemap.xml: no URLs");
const pagePaths = urls.map((u) => {
  if (!u.startsWith(SITE)) fail(`sitemap: ${u} is not on ${SITE}`);
  if (u !== `${SITE}/` && u.endsWith("/")) fail(`sitemap: ${u} has a trailing slash (Pages redirects it)`);
  return u.slice(SITE.length) || "/";
});
if (new Set(pagePaths).size !== pagePaths.length) fail("sitemap: duplicate URLs");

const robots = read("robots.txt");
if (!robots.includes(`Sitemap: ${SITE}/sitemap.xml`)) fail("robots.txt: missing Sitemap line");
if (/^Disallow:\s*\/\s*$/m.test(robots)) fail("robots.txt: disallows the whole site");

// ---------- pages ----------
const titles = new Map();
const descriptions = new Map();
const internalTargets = new Set();
const knownPaths = new Set(pagePaths);

for (const urlPath of pagePaths) {
  const file = fileFor(urlPath);
  if (!exists(file)) {
    fail(`${urlPath}: no prerendered file ${file}`);
    continue;
  }
  const html = read(file);
  const head = html.slice(0, html.indexOf("</head>"));
  const where = urlPath;

  const titleTags = [...head.matchAll(/<title>([^<]*)<\/title>/g)];
  if (titleTags.length !== 1) fail(`${where}: ${titleTags.length} <title> tags`);
  const title = decode(titleTags[0]?.[1] ?? "");
  if (!title) fail(`${where}: empty title`);
  if (title.length > 70) warn(`${where}: title is ${title.length} characters ("${title}")`);
  titles.set(title, [...(titles.get(title) ?? []), where]);

  const description = decode(head.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  if (!description) fail(`${where}: missing meta description`);
  else if (description.length < 70 || description.length > 200)
    warn(`${where}: description is ${description.length} characters`);
  descriptions.set(description, [...(descriptions.get(description) ?? []), where]);

  const canonical = head.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const expected = urlPath === "/" ? `${SITE}/` : `${SITE}${urlPath}`;
  if (canonical !== expected) fail(`${where}: canonical is ${canonical ?? "missing"}, expected ${expected}`);

  const robotsMeta = head.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? "";
  if (/noindex/i.test(robotsMeta)) fail(`${where}: robots meta says noindex`);

  if (!/<html lang="en-IN">/.test(html)) fail(`${where}: <html lang> is not en-IN`);

  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(m[1]);
      for (const node of data["@graph"] ?? [data]) if (!node["@type"]) fail(`${where}: JSON-LD node without @type`);
    } catch (e) {
      fail(`${where}: JSON-LD does not parse (${e.message})`);
    }
  }
  if (!html.includes('id="page-jsonld"')) fail(`${where}: no page JSON-LD`);

  const body = html.slice(html.indexOf('<div id="root">'));
  const h1s = body.match(/<h1[\s>]/g) ?? [];
  if (h1s.length !== 1) fail(`${where}: ${h1s.length} <h1> elements`);

  let last = 1;
  for (const m of body.matchAll(/<h([1-6])[\s>]/g)) {
    const level = Number(m[1]);
    if (level > last + 1) warn(`${where}: heading jumps from h${last} to h${level}`);
    last = level;
  }

  for (const m of body.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    if (!/\balt="/.test(tag)) fail(`${where}: <img> without alt: ${tag.slice(0, 80)}`);
    const src = tag.match(/\bsrc="([^"]+)"/)?.[1];
    if (src?.startsWith("/") && !exists(decodeURI(src.slice(1)))) fail(`${where}: missing image ${src}`);
    const srcset = tag.match(/\bsrcSet="([^"]+)"|\bsrcset="([^"]+)"/);
    for (const candidate of (srcset?.[1] ?? srcset?.[2] ?? "").split(",").map((s) => s.trim().split(" ")[0]).filter(Boolean)) {
      if (!exists(decodeURI(candidate.slice(1)))) fail(`${where}: missing srcset image ${candidate}`);
    }
  }

  for (const m of body.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const href = decode(m[1]);
    if (href.startsWith("/") && !href.startsWith("//")) internalTargets.add(`${href.split(/[?#]/)[0]}|${where}`);
    if (href.startsWith(SITE)) warn(`${where}: absolute internal link ${href}`);
  }
}

for (const [title, pages] of titles) if (pages.length > 1) fail(`duplicate title "${title}" on ${pages.join(", ")}`);
for (const [desc, pages] of descriptions)
  if (desc && pages.length > 1) fail(`duplicate description on ${pages.join(", ")}`);

for (const entry of internalTargets) {
  const [target, from] = entry.split("|");
  const clean = target.length > 1 ? target.replace(/\/$/, "") : target;
  if (target.length > 1 && target.endsWith("/")) warn(`${from}: link to ${target} has a trailing slash (redirects)`);
  if (knownPaths.has(clean) || exists(decodeURI(clean.slice(1)))) continue;
  fail(`${from}: link to ${target} — no such page`);
}

// ---------- 404 ----------
const notFound = read("404.html");
if (!/<meta name="robots" content="noindex/.test(notFound)) fail("404.html: not noindex");
if (/<link rel="canonical"/.test(notFound)) fail("404.html: has a canonical");

// ---------- report ----------
for (const w of warnings) console.warn(`  warn  ${w}`);
for (const e of errors) console.error(`  FAIL  ${e}`);
console.log(
  `verify-dist: ${pagePaths.length} pages checked, ${internalTargets.size} internal links, ${errors.length} errors, ${warnings.length} warnings`
);
if (errors.length) process.exit(1);
