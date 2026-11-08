import { useContext, useEffect } from "react";
import { SeoCollector, seoTags, type SeoProps } from "../lib/seo";

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string | undefined) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/** The per-page JSON-LD block (the site-wide business graph in index.html is left alone). */
function setJsonLd(json: string | undefined) {
  let el = document.getElementById("page-jsonld");
  if (!json) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("script");
    el.id = "page-jsonld";
    el.setAttribute("type", "application/ld+json");
    document.head.appendChild(el);
  }
  if (el.textContent !== json) el.textContent = json;
}

export default function Seo(props: SeoProps) {
  const collect = useContext(SeoCollector);
  const tags = seoTags(props);
  collect?.(tags);

  const key = JSON.stringify(tags);
  useEffect(() => {
    const t = JSON.parse(key) as typeof tags;
    document.title = t.title;
    t.meta.forEach((m) => setMeta(m.attr, m.key, m.content));
    setCanonical(t.canonical);
    setJsonLd(t.jsonLd);
  }, [key]);

  return null;
}
