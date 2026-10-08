import Seo from "../components/Seo";
import Hero from "../components/Hero";
import SectionHeading from "../components/SectionHeading";
import ProjectCard from "../components/ProjectCard";
import CTASection from "../components/CTASection";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import Testimonials from "../components/Testimonials";
import BeforeAfter from "../components/BeforeAfter";
import Promises from "../components/Promises";
import { projects } from "../data/projects";
import { services, trustBadges } from "../data/studio";
import "./Home.css";

const featured = projects.slice(0, 4);

export default function Home() {
  return (
    <>
      <Seo
        title="Madhva Interiors & Design Studio — Pune Interior Designers"
        description="Madhva Interiors & Design Studio designs elegant, functional, and timeless residential and commercial interiors in Pune. Explore our work and start your project."
        path="/"
      />

      <Hero />

      {/* Introduction */}
      <section className="section section--surface home-intro">
        <div className="container home-intro__grid">
          <Reveal>
            <SectionHeading
              eyebrow="The Studio"
              title="Spaces designed around the way you live."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="home-intro__copy">
              <p className="body-text">
                Madhva Interiors &amp; Design Studio is a Pune-based interior design firm
                committed to creating elegant, functional, and timeless living spaces. We
                specialize in residential and commercial interiors, with a focus on quality
                craftsmanship, practical space planning, and premium material selection.
              </p>
              <p className="body-text">
                Our approach blends aesthetics with functionality, ensuring every project
                reflects the client's personality while maintaining durability and long-term
                value — from concept to execution, with transparency and systematic planning
                at every step.
              </p>
              <Button to="/about" variant="ghost">
                About the Studio →
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Trust badges */}
      <section className="home-badges section--tight section--muted">
        <div className="container home-badges__row">
          {trustBadges.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
        </div>
      </section>

      {/* Before / After */}
      <section className="section home-ba">
        <div className="container home-ba__grid">
          <Reveal className="home-ba__intro">
            <SectionHeading
              eyebrow="Before & After"
              title="The empty flat, and what we made of it."
              description="Drag the slider to see a bare, handed-over flat become a finished home — the same room, the same angle."
            />
            <ul className="home-ba__facts">
              <li>
                <strong>2</strong>
                <span>Projects at a time — never more</span>
              </li>
              <li>
                <strong>3D</strong>
                <span>Previewed before we build</span>
              </li>
            </ul>
          </Reveal>
          <BeforeAfter />
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section section--surface">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Selected Work"
              title="Featured Projects"
              description="A collection spanning our real client residences and the design styles we work across most."
            />
          </Reveal>
          <div className="home-featured-grid">
            {featured.map((project, i) => (
              <Reveal
                key={project.id}
                delay={i * 90}
                className={i === 0 ? "home-featured-grid__item home-featured-grid__item--large" : "home-featured-grid__item"}
              >
                <ProjectCard project={project} size={i === 0 ? "large" : "regular"} />
              </Reveal>
            ))}
          </div>
          <Reveal className="home-featured-cta">
            <Button to="/gallery" variant="outline">
              View Full Gallery
            </Button>
          </Reveal>
        </div>
      </section>

      {/* Design Philosophy */}
      <section className="home-philosophy section--dark section">
        <div className="container home-philosophy__grid">
          <Reveal>
            <span className="eyebrow eyebrow--on-dark">Design Philosophy</span>
            <h2 className="home-philosophy__title">
              Materiality, function, and detail — designed around you.
            </h2>
          </Reveal>
          <Reveal delay={100} className="home-philosophy__points">
            <div>
              <h3>Materiality</h3>
              <p>
                From solid wood to marble and gypsum, every material is chosen for how it
                ages, not just how it photographs.
              </p>
            </div>
            <div>
              <h3>Function</h3>
              <p>
                Layouts are planned around how you actually move through and use a space,
                every single day.
              </p>
            </div>
            <div>
              <h3>Personalisation</h3>
              <p>
                No two homes are the same — every project is shaped around the client it's
                designed for.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="section section--surface">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="What We Do"
              title="Services"
              description="Full-service interior design, from first sketch to final styling."
            />
          </Reveal>
          <div className="home-services-grid">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 60} className="home-service-card">
                <span className="home-service-card__frame">
                  <img src={service.image} alt="" loading="lazy" />
                </span>
                <span className="home-service-card__index">{String(i + 1).padStart(2, "0")}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="section--tight section--muted">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Why Choose Us"
              title="Built on trust, delivered on time."
              description="Six promises. One reason — a home you love coming back to."
            />
          </Reveal>
          <Promises />
        </div>
      </section>

      {/* Testimonials */}
      <section className="section section--surface">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Client Stories"
              title="What Our Clients Say"
              description="Real homes, real families — in their own words."
              align="center"
            />
          </Reveal>
          <Reveal>
            <Testimonials />
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Have a space in mind?"
        description="Let's create something considered — from first concept to final styling."
      />
    </>
  );
}
