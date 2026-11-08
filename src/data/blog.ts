/* Blog articles live as Markdown files in src/content/blog/ — add a file
   there to publish a new article (see the README in that folder). The
   blog-posts plugin in vite.config.ts reads them at build time. */

import posts from "virtual:blog-posts";

export interface BlogPost {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  /** YYYY-MM-DD */
  date: string;
  updated: string;
  image: string;
  imageAlt: string;
  /** Service slugs this article links to at the end. */
  related: string[];
  readMinutes: number;
  faqs: { question: string; answer: string }[];
  /** The article body as HTML, loaded on demand (its own JS chunk). */
  loadHtml: () => Promise<string>;
}

export const blogPosts: BlogPost[] = posts;

export const getPostBySlug = (slug: string) => blogPosts.find((p) => p.slug === slug);

/** Article bodies already loaded (filled for every post before prerendering). */
export const loadedHtml = new Map<string, string>();

export async function loadPostHtml(slug: string): Promise<string> {
  const cached = loadedHtml.get(slug);
  if (cached !== undefined) return cached;
  const post = getPostBySlug(slug);
  const html = post ? await post.loadHtml() : "";
  loadedHtml.set(slug, html);
  return html;
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
