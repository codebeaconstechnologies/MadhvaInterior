import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Seo from "../components/Seo";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import Lightbox from "../components/Lightbox";
import CTASection from "../components/CTASection";
import { getProjectBySlug, projects } from "../data/projects";
import { getServiceBySlug } from "../data/services";
import Breadcrumbs from "../components/Breadcrumbs";
import SectionHeading from "../components/SectionHeading";
import { BUSINESS_ID, absoluteUrl } from "../lib/seo";
import { responsive } from "../lib/images";
import "./ProjectDetail.css";

// Style collections link to these; client projects list their own (src/data/projects.ts).
const DEFAULT_SERVICES = ["home-interior-design-pune", "modular-kitchen-design-pune", "wardrobe-design-pune"];

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!project) {
    return <Navigate to="/gallery" replace />;
  }

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const path = `/gallery/${project.slug}`;
  const relatedServices = (project.services ?? DEFAULT_SERVICES).map(getServiceBySlug).filter((s) => s !== undefined);

  return (
    <>
      <Seo
        title={`${project.title} — ${project.bhk ? `${project.bhk} ` : ""}Interior Design, ${project.location}`}
        description={`${project.summary} ${project.bhk ? `${project.bhk} ` : ""}interior design${
          project.category === "Residential" || project.bhk ? "" : ` in the ${project.category.toLowerCase()} style`
        } by Madhva Interiors, ${project.location}.`}
        path={path}
        image={project.cover.src}
        breadcrumbs={[
          { name: "Projects", path: "/gallery" },
          { name: project.title, path },
        ]}
        schema={[
          {
            "@type": "CreativeWork",
            "@id": `${absoluteUrl(path)}#project`,
            name: project.title,
            description: project.description,
            image: project.images.slice(0, 6).map((img) => absoluteUrl(img.src)),
            creator: { "@id": BUSINESS_ID },
            locationCreated: { "@type": "Place", name: project.location },
            dateCreated: project.year,
          },
        ]}
      />

      {/* Hero */}
      <section className="pd-hero">
        <img {...responsive(project.cover.src)} alt={project.cover.alt} {...{ fetchpriority: "high" }} />
        <div className="pd-hero__scrim" />
        <div className="container pd-hero__content">
          <Breadcrumbs
            onDark
            trail={[
              { name: "Projects", path: "/gallery" },
              { name: project.title, path },
            ]}
          />
          <span className="eyebrow eyebrow--on-dark">{project.category} Style</span>
          <h1>{project.title}</h1>
          <p className="pd-hero__meta">
            {project.location} — {project.year}
            {project.bhk ? ` — ${project.bhk}` : ""}
          </p>
        </div>
      </section>

      {/* Details */}
      <section className="section section--surface">
        <div className="container pd-details">
          <Reveal className="pd-details__main">
            <h2>Overview</h2>
            <p className="body-text">{project.description}</p>

            {project.quote && (
              <blockquote className="pd-quote">&ldquo;{project.quote}&rdquo;</blockquote>
            )}

            <ul className="pd-highlights">
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100} className="pd-details__side">
            <dl className="pd-facts">
              <div>
                <dt>Location</dt>
                <dd>{project.location}</dd>
              </div>
              <div>
                <dt>Year</dt>
                <dd>{project.year}</dd>
              </div>
              {project.client && (
                <div>
                  <dt>Client</dt>
                  <dd>{project.client}</dd>
                </div>
              )}
              {project.bhk && (
                <div>
                  <dt>Configuration</dt>
                  <dd>{project.bhk}</dd>
                </div>
              )}
            </dl>

            {project.rooms && (
              <div className="pd-rooms">
                <h3 className="pd-rooms__title">Room Breakdown</h3>
                <ul>
                  {project.rooms.map((r) => (
                    <li key={r.name}>
                      <span>{r.name}</span>
                      <span>{r.area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* Image grid */}
      <section className="section--tight section--muted">
        <div className="container">
          <div className="pd-grid">
            {project.images.map((img, i) => (
              <Reveal key={img.src} delay={(i % 4) * 60} className="pd-grid__item">
                <button onClick={() => setLightboxIndex(i)} aria-label={`View larger image: ${img.alt}`}>
                  <img {...responsive(img.src, "(min-width: 960px) 33vw, 50vw")} alt={img.alt} loading="lazy" decoding="async" />
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={project.images}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}

      {relatedServices.length > 0 && (
        <section className="section--tight section--surface">
          <div className="container">
            <SectionHeading eyebrow="Services" title="Services in this project" />
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

      {/* Prev / Next */}
      <section className="section--tight section--surface pd-pager">
        <div className="container pd-pager__grid">
          <Button to={`/gallery/${prevProject.slug}`} variant="ghost">
            ← {prevProject.title}
          </Button>
          <Button to={`/gallery/${nextProject.slug}`} variant="ghost">
            {nextProject.title} →
          </Button>
        </div>
      </section>

      <CTASection
        title="Like what you see?"
        description="Let's talk about bringing this level of detail to your own space."
      />
    </>
  );
}
