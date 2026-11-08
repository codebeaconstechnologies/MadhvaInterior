import { Link, Navigate, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import EnquiryActions from "../components/EnquiryActions";
import Faq from "../components/Faq";
import RelatedProjects from "../components/RelatedProjects";
import CTASection from "../components/CTASection";
import SectionHeading from "../components/SectionHeading";
import { getLocationBySlug } from "../data/locations";
import { services } from "../data/services";
import { studio } from "../data/studio";
import { google } from "../data/google";
import { faqSchema } from "../lib/seo";
import { responsive } from "../lib/images";
import "./Content.css";

export default function LocationPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = slug ? getLocationBySlug(slug) : undefined;
  if (!location) return <Navigate to="/services" replace />;

  const path = `/locations/${location.slug}`;
  const trail = [{ name: `Interior Designer in ${location.area}`, path }];

  return (
    <>
      <Seo
        title={location.seoTitle}
        description={location.description}
        path={path}
        image={location.image.src}
        breadcrumbs={trail}
        schema={[faqSchema(path, location.faqs)]}
      />

      <section className="content-hero">
        <div className="container content-hero__grid">
          <div className="content-hero__copy">
            <Breadcrumbs trail={trail} />
            <span className="eyebrow">Madhva Interiors · {location.area}</span>
            <h1>{location.h1}</h1>
            {location.intro.map((p, i) => (
              <p key={i} className={i === 0 ? "lede" : "body-text"}>
                {p}
              </p>
            ))}
            <EnquiryActions whatsappText={location.whatsappText} trackAs="location_hero" />
          </div>
          <div className="content-hero__media">
            <img
              {...responsive(location.image.src, "(min-width: 960px) 45vw, 100vw")}
              alt={location.image.alt}
              {...{ fetchpriority: "high" }}
            />
          </div>
        </div>
      </section>

      {location.sections.map((section, i) => (
        <section key={section.heading} className={`section--tight ${i % 2 === 0 ? "section--surface" : "section--muted"}`}>
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
        <div className="container content-split">
          <div className="prose-block">
            <SectionHeading eyebrow="Visit the Studio" title="Find us on Pune–Alandi Road" />
            <address className="studio-address">
              <strong>{studio.name}</strong>
              <br />
              {studio.address.line1}
              <br />
              {studio.address.line2}
              <br />
              {studio.address.line3}
            </address>
            <p className="body-text">
              Open {studio.hours.replace("All days", "all days")}. Phone:{" "}
              <a href={studio.phoneHref} className="inline-link">
                {studio.phone}
              </a>
            </p>
            <p className="body-text">Nearby areas: {location.nearby.join(", ")}.</p>
            <a href={google.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Get Directions
            </a>
          </div>
          <div className="content-map">
            <iframe
              src={google.mapEmbedUrl}
              title={`${studio.name} on Google Maps`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <RelatedProjects slugs={location.projects} title="Homes we've designed" />

      <section className="section--tight section--surface">
        <div className="container">
          <SectionHeading eyebrow="Services" title={`Interior design services for ${location.area} homes`} />
          <ul className="link-cards">
            {services.map((s) => (
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

      <Faq items={location.faqs} />

      <CTASection
        title={`Planning interiors in ${location.area}?`}
        description="Call, WhatsApp or visit the studio — we'll talk you through what's possible for your home."
      />
    </>
  );
}
