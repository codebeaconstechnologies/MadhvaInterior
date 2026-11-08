/* Page SEO tags, shared by <Seo> in the browser and by build-time
   prerendering (src/entry-server.tsx). */

import { createContext } from "react";
import { studio } from "../data/studio";

export interface Crumb {
  name: string;
  path: string;
}

export type JsonLdNode = Record<string, unknown>;

export interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  /** Keep the page out of search results (e.g. the 404 page). */
  noindex?: boolean;
  /** schema.org type of the page itself. */
  pageType?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  /** Trail below Home, e.g. [{ name: "Services", path: "/services" }, { name: "2 BHK", path: "/services/…" }]. */
  breadcrumbs?: Crumb[];
  /** Extra structured data for this page (Service, FAQPage, BlogPosting, …). */
  schema?: JsonLdNode[];
}

export interface SeoTags {
  title: string;
  meta: { attr: "name" | "property"; key: string; content: string }[];
  canonical?: string;
  /** Serialized JSON-LD for this page, safe to place inside a <script> tag. */
  jsonLd?: string;
}

export const BUSINESS_ID = `${studio.siteUrl}/#business`;
export const WEBSITE_ID = `${studio.siteUrl}/#website`;

export const absoluteUrl = (path: string) => (path.startsWith("http") ? path : `${studio.siteUrl}${path}`);

/** FAQPage structured data from question/answer pairs. */
export function faqSchema(path: string, faqs: { question: string; answer: string }[]): JsonLdNode {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

function pageGraph(props: SeoProps, fullTitle: string, url: string, ogImage: string): string {
  const { description, pageType = "WebPage", breadcrumbs, schema = [] } = props;
  const graph: JsonLdNode[] = [];
  const webPage: JsonLdNode = {
    "@type": pageType,
    "@id": `${url}#webpage`,
    url,
    name: fullTitle,
    description,
    inLanguage: "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": BUSINESS_ID },
    primaryImageOfPage: { "@type": "ImageObject", url: ogImage },
  };
  graph.push(webPage);

  if (breadcrumbs && breadcrumbs.length > 0) {
    const trail = [{ name: "Home", path: "/" }, ...breadcrumbs];
    webPage.breadcrumb = { "@id": `${url}#breadcrumb` };
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: trail.map((crumb, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        item: absoluteUrl(crumb.path === "/" ? "/" : crumb.path),
      })),
    });
  }

  graph.push(...schema);
  // "<" is escaped so page text can never close the <script> element early.
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}

/** The <title>, meta, canonical and JSON-LD for a page. */
export function seoTags(props: SeoProps): SeoTags {
  const { title, description, path, image, type = "website", noindex } = props;
  const fullTitle = title.includes(studio.name) ? title : `${title} | ${studio.name}`;
  const url = absoluteUrl(path);
  const ogImage = image ? absoluteUrl(image) : `${studio.siteUrl}/images/og-image.jpg`;

  return {
    title: fullTitle,
    canonical: noindex ? undefined : url,
    jsonLd: noindex ? undefined : pageGraph(props, fullTitle, url, ogImage),
    meta: [
      { attr: "name", key: "description", content: description },
      { attr: "name", key: "robots", content: noindex ? "noindex, follow" : "index, follow, max-image-preview:large" },
      { attr: "property", key: "og:title", content: fullTitle },
      { attr: "property", key: "og:description", content: description },
      { attr: "property", key: "og:url", content: url },
      { attr: "property", key: "og:type", content: type },
      { attr: "property", key: "og:image", content: ogImage },
      { attr: "property", key: "og:site_name", content: studio.name },
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
