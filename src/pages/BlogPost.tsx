import { MouseEvent, useEffect, useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import EnquiryActions from "../components/EnquiryActions";
import Faq from "../components/Faq";
import CTASection from "../components/CTASection";
import SectionHeading from "../components/SectionHeading";
import { blogPosts, formatDate, getPostBySlug, loadPostHtml, loadedHtml } from "../data/blog";
import { getServiceBySlug } from "../data/services";
import { BUSINESS_ID, WEBSITE_ID, absoluteUrl, faqSchema } from "../lib/seo";
import { responsive } from "../lib/images";
import "./Content.css";

/** On first load the body is already in the prerendered HTML; reuse it so hydration doesn't blank it. */
function initialHtml(slug: string): string | undefined {
  const cached = loadedHtml.get(slug);
  if (cached !== undefined || typeof document === "undefined") return cached;
  const el = document.getElementById("article-body");
  return el && el.dataset.slug === slug ? el.innerHTML : undefined;
}

/** The article body HTML for `slug`, loading its chunk if needed. */
function useArticleHtml(slug: string): string {
  const [state, setState] = useState(() => ({ slug, html: initialHtml(slug) }));
  const current = state.slug === slug ? state.html : loadedHtml.get(slug);

  useEffect(() => {
    if (current !== undefined || !slug) return;
    let cancelled = false;
    loadPostHtml(slug).then((html) => {
      if (!cancelled) setState({ slug, html });
    });
    return () => {
      cancelled = true;
    };
  }, [slug, current]);

  return current ?? "";
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const post = slug ? getPostBySlug(slug) : undefined;
  const html = useArticleHtml(post?.slug ?? "");
  if (!post) return <Navigate to="/blog" replace />;

  const path = `/blog/${post.slug}`;
  const url = absoluteUrl(path);
  const trail = [
    { name: "Blog", path: "/blog" },
    { name: post.title, path },
  ];
  const relatedServices = post.related.map(getServiceBySlug).filter((s) => s !== undefined);
  const morePosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  // Links inside the article body are plain <a> tags (it's HTML from
  // Markdown); route internal ones through React Router instead of a reload.
  function onArticleClick(e: MouseEvent<HTMLDivElement>) {
    const link = (e.target as Element).closest("a");
    const href = link?.getAttribute("href");
    if (!href || !href.startsWith("/") || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(href);
  }

  return (
    <>
      <Seo
        title={post.seoTitle}
        description={post.description}
        path={path}
        image={post.image}
        type="article"
        breadcrumbs={trail}
        schema={[
          {
            "@type": "BlogPosting",
            "@id": `${url}#article`,
            headline: post.title,
            description: post.description,
            image: absoluteUrl(post.image),
            datePublished: post.date,
            dateModified: post.updated,
            inLanguage: "en-IN",
            mainEntityOfPage: { "@id": `${url}#webpage` },
            isPartOf: { "@id": WEBSITE_ID },
            author: { "@id": BUSINESS_ID },
            publisher: { "@id": BUSINESS_ID },
          },
          ...(post.faqs.length ? [faqSchema(path, post.faqs)] : []),
        ]}
      />

      <article>
        <header className="content-hero content-hero--plain">
          <div className="container article-head">
            <Breadcrumbs trail={trail} />
            <span className="eyebrow">
              <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readMinutes} min read
            </span>
            <h1>{post.title}</h1>
            <p className="lede">{post.description}</p>
          </div>
        </header>

        <div className="container article-cover">
          <img {...responsive(post.image, "(min-width: 1320px) 1240px, 100vw")} alt={post.imageAlt} {...{ fetchpriority: "high" }} />
        </div>

        <div className="container">
          <div
            id="article-body"
            data-slug={post.slug}
            className="prose"
            onClick={onArticleClick}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>

        <div className="container">
          <aside className="article-cta" aria-label="Talk to Madhva Interiors">
            <h2>Planning your home&rsquo;s interiors?</h2>
            <p>
              Talk to our designer about your flat. We plan every project in 3D first, and take on just two at a
              time.
            </p>
            <EnquiryActions
              whatsappText={`Hello Madhva Interiors! I read your article "${post.title}" and would like to discuss my home.`}
              trackAs="blog_article"
            />
          </aside>
        </div>
      </article>

      <Faq items={post.faqs} />

      {relatedServices.length > 0 && (
        <section className="section--tight section--muted">
          <div className="container">
            <SectionHeading eyebrow="Related Services" title="How we can help" />
            <ul className="link-cards">
              {relatedServices.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services/${s.slug}`}>
                    <strong>{s.name}</strong>
                    <span>{s.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section--tight section--surface">
        <div className="container">
          <SectionHeading eyebrow="Keep Reading" title="More guides" />
          <ul className="link-cards">
            {morePosts.map((p) => (
              <li key={p.slug}>
                <Link to={`/blog/${p.slug}`}>
                  <strong>{p.title}</strong>
                  <span>{p.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection title="Ready to start planning?" description="Tell us about your space and we'll take it from there." />
    </>
  );
}
