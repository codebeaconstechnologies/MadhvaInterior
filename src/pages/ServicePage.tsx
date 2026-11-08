import { Link, Navigate, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import EnquiryActions from "../components/EnquiryActions";
import Faq from "../components/Faq";
import RelatedProjects from "../components/RelatedProjects";
import BeforeAfter from "../components/BeforeAfter";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { getServiceBySlug } from "../data/services";
import { BUSINESS_ID, absoluteUrl, faqSchema } from "../lib/seo";
import { responsive } from "../lib/images";
import "./Content.css";

export default function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;
  if (!service) return <Navigate to="/services" replace />;

  const path = `/services/${service.slug}`;
  const related = service.related.map(getServiceBySlug).filter((s) => s !== undefined);
  const trail = [
    { name: "Services", path: "/services" },
    { name: service.name, path },
  ];

  return (
    <>
      <Seo
        title={service.seoTitle}
        description={service.description}
        path={path}
        image={service.image.src}
        breadcrumbs={trail}
        schema={[
          {
            "@type": "Service",
            "@id": `${absoluteUrl(path)}#service`,
            name: service.h1,
            serviceType: service.name,
            description: service.description,
            url: absoluteUrl(path),
            image: absoluteUrl(service.image.src),
            provider: { "@id": BUSINESS_ID },
            areaServed: [
              { "@type": "City", name: "Pune" },
              { "@type": "City", name: "Pimpri-Chinchwad" },
            ],
          },
          faqSchema(path, service.faqs),
        ]}
      />

      <section className="content-hero">
        <div className="container content-hero__grid">
          <div className="content-hero__copy">
            <Breadcrumbs trail={trail} />
            <span className="eyebrow">Madhva Interiors · Pune</span>
            <h1>{service.h1}</h1>
            {service.intro.map((p, i) => (
              <p key={i} className={i === 0 ? "lede" : "body-text"}>
                {p}
              </p>
            ))}
            <EnquiryActions whatsappText={service.whatsappText} trackAs="service_hero" />
          </div>
          <div className="content-hero__media">
            <img
              {...responsive(service.image.src, "(min-width: 960px) 45vw, 100vw")}
              alt={service.image.alt}
              {...{ fetchpriority: "high" }}
            />
          </div>
        </div>
      </section>

      <section className="section--tight section--surface">
        <div className="container content-split">
          <Reveal>
            <SectionHeading eyebrow="What's Included" title="What we take care of" />
            <ul className="tick-list">
              {service.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100} className="benefit-grid">
            {service.benefits.map((b) => (
              <div key={b.title} className="benefit">
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {service.sections.map((section, i) => (
        <section key={section.heading} className={`section--tight ${i % 2 === 0 ? "section--muted" : "section--surface"}`}>
          <div className="container prose-block">
            <h2>{section.heading}</h2>
            {section.body.map((p, j) => (
              <p key={j} className="body-text">
                {p}
              </p>
            ))}
            {section.points && (
              <ul className="tick-list">
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}

      <section className="section--tight section--surface">
        <div className="container">
          <SectionHeading eyebrow="From Our Projects" title={`${service.name} by Madhva Interiors`} />
          <div className="photo-grid">
            {service.gallery.map((img) => (
              <figure key={img.src}>
                <img {...responsive(img.src, "(min-width: 960px) 25vw, 50vw")} alt={img.alt} loading="lazy" decoding="async" />
                <figcaption>{img.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {service.beforeAfter && (
        <section className="section--tight section--muted">
          <div className="container content-ba">
            <SectionHeading
              eyebrow="Before & After"
              title="From handed-over flat to finished home"
              description="Drag the slider to compare the same room before and after our work."
            />
            <BeforeAfter />
          </div>
        </section>
      )}

      <RelatedProjects slugs={service.projects} title="Projects you can explore" />

      <Faq items={service.faqs} />

      <section className="section--tight section--muted">
        <div className="container">
          <SectionHeading eyebrow="Explore More" title="Related services" />
          <ul className="link-cards">
            {related.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`}>
                  <strong>{s.name}</strong>
                  <span>{s.summary}</span>
                </Link>
              </li>
            ))}
            <li>
              <Link to="/services">
                <strong>All services</strong>
                <span>Everything we design and build for Pune homes.</span>
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <CTASection
        title={`Planning ${service.name.toLowerCase()} in Pune?`}
        description="Tell us about your home. We take on just two projects at a time — reach out early to reserve your slot."
      />
    </>
  );
}
