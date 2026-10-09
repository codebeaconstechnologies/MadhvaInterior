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

export default function Seo(props: SeoProps) {
  const collect = useContext(SeoCollector);
  const { title, description, path, image, type, noindex } = props;
  collect?.(seoTags(props));

  useEffect(() => {
    const tags = seoTags({ title, description, path, image, type, noindex });
    document.title = tags.title;
    tags.meta.forEach((m) => setMeta(m.attr, m.key, m.content));
    setCanonical(tags.canonical);
  }, [title, description, path, image, type, noindex]);

  return null;
}
