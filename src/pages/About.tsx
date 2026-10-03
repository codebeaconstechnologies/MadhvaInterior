import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import CTASection from "../components/CTASection";
import Reveal from "../components/Reveal";
import ProcessTimeline from "../components/ProcessTimeline";
import { studio, materials, whyChooseUs } from "../data/studio";
import "./About.css";

export default function About() {
  return (
    <>
      <Seo
        title="About the Studio"
        description="Madhva Interiors & Design Studio is a Pune-based interior design firm founded by Unmesh Kadre, creating elegant, functional, and timeless spaces."
        path="/about"
      />

      {/* Intro */}
      <section className="about-intro section">
        <div className="container about-intro__grid">
          <Reveal>
            <span className="eyebrow">About Madhva Interiors</span>
            <h1 className="about-intro__title">
              Interiors built around how you actually live.
            </h1>
          </Reveal>
          <Reveal delay={100}>
            <p className="lede">
              A Pune-based interior design firm committed to creating elegant, functional,
              and timeless living spaces — for homes and businesses alike.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Story */}
      <section className="section--tight section--surface">
        <div className="container about-story__grid">
          <Reveal className="about-story__image">
            <img
              src="/images/studio/about-bedroom-render.jpg"
              alt="Warm, wood-paneled bedroom concept render by Madhva Interiors"
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={100} className="about-story__copy">
            <SectionHeading eyebrow="Our Story" title="Considered design, systematically delivered" />
            <p className="body-text">
              Madhva Interiors &amp; Design Studio specializes in residential interior
              solutions with a focus on quality craftsmanship, practical space planning, and
              premium material selection. Our approach blends aesthetics with functionality,
              ensuring every project reflects the client's personality while maintaining
              durability and long-term value.
            </p>
            <p className="body-text">
              From concept to execution, we emphasize transparency, systematic planning, and
              timely delivery. We believe in delivering not just interiors, but thoughtfully
              designed spaces that enhance everyday living.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Founder */}
      <section className="section--tight section--muted">
        <div className="container about-founder__grid">
          <Reveal className="about-founder__image">
            <img
              src="/images/studio/founder-unmesh-kadre.jpg"
              alt={`${studio.founder}, founder of Madhva Interiors & Design Studio`}
              loading="lazy"
            />
          </Reveal>
          <Reveal delay={100} className="about-founder__copy">
            <span className="eyebrow">{studio.founderTitle}</span>
            <h3>{studio.founder}</h3>
            <p className="body-text">
              With a passion for turning ordinary spaces into extraordinary experiences,
              Unmesh Kadre founded Madhva Interiors &amp; Design Studio to bring
              personalized, elegant, and functional design to life. Guided by creativity,
              detail, and compassion, he continues to lead the studio with a focus on
              craftsmanship and client trust.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section section--surface">
        <div className="container about-mv__grid">
          <Reveal className="about-mv__card about-mv__card--navy">
            <h3>Our Mission</h3>
            <p>
              To design functional, aesthetic, and timeless interiors that reflect our
              clients' lifestyle and aspirations — delivering innovative design, quality
              craftsmanship, and seamless execution that turn every house into a dream home.
            </p>
          </Reveal>
          <Reveal delay={100} className="about-mv__card about-mv__card--terracotta">
            <h3>Our Vision</h3>
            <p>
              To be recognized as the most trusted interior design firm, setting new
              benchmarks in creativity, sustainability, and customer satisfaction — creating
              spaces that inspire, comfort, and add value to everyday living.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="section--dark section">
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow="Our Approach" title="How a project comes together" onDark />
          </Reveal>
          <ProcessTimeline />
        </div>
      </section>

      {/* Why work with us */}
      <section className="section section--surface">
        <div className="container">
          <Reveal>
            <SectionHeading eyebrow="Why Work With Us" title="What you can expect" />
          </Reveal>
          <div className="about-why-grid">
            {whyChooseUs.map((item, i) => (
              <Reveal key={item.title} delay={i * 50} className="about-why-item">
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="section--tight section--muted">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Materiality"
              title="Materials we use"
              description="Every material is chosen with lifespan, maintenance, and finish in mind."
            />
          </Reveal>
          <div className="about-materials">
            {materials.map((m, i) => (
              <Reveal key={m.name} delay={i * 40} className="about-materials__row">
                <h4>{m.name}</h4>
                <span className="about-materials__lifespan">{m.lifespan}</span>
                <p>{m.usedIn}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Let's design your next space."
        description="Tell us about your project and we'll take it from concept to completion."
      />
    </>
  );
}
