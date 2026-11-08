import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";
import { blogPosts, formatDate } from "../data/blog";
import { absoluteUrl, BUSINESS_ID } from "../lib/seo";
import { responsive } from "../lib/images";
import "./Content.css";

const trail = [{ name: "Blog", path: "/blog" }];

export default function BlogIndex() {
  return (
    <>
      <Seo
        title="Interior Design Guides for Pune Homeowners"
        description="Practical interior design guides for Pune homeowners from Madhva Interiors — planning a new flat, modular kitchens, materials, false ceilings, budgets and timelines."
        path="/blog"
        pageType="CollectionPage"
        breadcrumbs={trail}
        schema={[
          {
            "@type": "Blog",
            "@id": `${absoluteUrl("/blog")}#blog`,
            name: "Madhva Interiors — Interior Design Guides",
            url: absoluteUrl("/blog"),
            publisher: { "@id": BUSINESS_ID },
            blogPost: blogPosts.map((p) => ({ "@id": `${absoluteUrl(`/blog/${p.slug}`)}#article` })),
          },
        ]}
      />

      <section className="content-hero content-hero--plain">
        <div className="container">
          <Breadcrumbs trail={trail} />
          <span className="eyebrow">Guides &amp; Ideas</span>
          <h1>Interior Design Guides for Pune Homes</h1>
          <p className="lede">
            Straight answers to the questions homeowners ask us most — what drives cost, which materials to
            choose, and how to plan a new flat from possession to move-in.
          </p>
        </div>
      </section>

      <section className="section--tight section--surface">
        <div className="container post-cards">
          {blogPosts.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 60}>
              <Link to={`/blog/${post.slug}`} className="post-card">
                <span className="post-card__frame">
                  <img
                    {...responsive(post.image, "(min-width: 960px) 30vw, (min-width: 640px) 50vw, 100vw")}
                    alt={post.imageAlt}
                    loading={i < 3 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </span>
                <span className="post-card__meta">
                  {formatDate(post.date)} · {post.readMinutes} min read
                </span>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection title="Have a question we haven't answered?" description="Ask us directly — we're happy to help you plan." />
    </>
  );
}
