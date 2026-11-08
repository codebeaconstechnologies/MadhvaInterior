import { Link } from "react-router-dom";
import Seo from "../components/Seo";
import Breadcrumbs from "../components/Breadcrumbs";
import EnquiryActions from "../components/EnquiryActions";
import CTASection from "../components/CTASection";
import ProcessTimeline from "../components/ProcessTimeline";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import { services } from "../data/services";
import { locations } from "../data/locations";
import { absoluteUrl } from "../lib/seo";
import { responsive } from "../lib/images";
import "./Content.css";

const trail = [{ name: "Services", path: "/services" }];

export default function ServicesIndex() {
  return (
    <>
      <Seo
        title="Interior Design Services in Pune"
        description="Interior design services in Pune from Madhva Interiors: complete home interiors, 2 BHK and 3 BHK design, modular kitchens, wardrobes, renovation and turnkey projects."
        path="/services"
        pageType="CollectionPage"
        breadcrumbs={trail}
        schema={[
          {
            "@type": "ItemList",
            "@id": `${absoluteUrl("/services")}#list`,
            name: "Interior design services in Pune",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: absoluteUrl(`/services/${s.slug}`),
              name: s.h1,
            })),
          },
        ]}
      />

      <section className="content-hero content-hero--plain">
        <div className="container">
          <Breadcrumbs trail={trail} />
          <span className="eyebrow">What We Do</span>
          <h1>Interior Design Services in Pune</h1>
          <p className="lede">
            From a single modular kitchen to a complete turnkey home, every project is planned around how you
            live, visualized in 3D before work begins, and delivered by one accountable studio.
          </p>
          <EnquiryActions
            whatsappText="Hello Madhva Interiors! I'd like to know more about your interior design services."
            trackAs="services_hub"
          />
        </div>
      </section>

      <section className="section--tight section--surface">
        <div className="container service-cards">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 60}>
              <Link to={`/services/${s.slug}`} className="service-card">
                <span className="service-card__frame">
                  <img
                    {...responsive(s.image.src, "(min-width: 960px) 30vw, (min-width: 640px) 50vw, 100vw")}
                    alt={s.image.alt}
                    loading={i < 3 ? "eager" : "lazy"}
                    decoding="async"
                  />
                </span>
                <h2>{s.name}</h2>
                <p>{s.summary}</p>
                <span className="service-card__more">Learn more →</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section--dark section">
        <div className="container">
          <SectionHeading eyebrow="Our Approach" title="How every project comes together" onDark />
          <ProcessTimeline />
        </div>
      </section>

      <section className="section--tight section--muted">
        <div className="container">
          <SectionHeading
            eyebrow="Where We Work"
            title="Serving Pune and Pimpri-Chinchwad"
            description="Our studio is on the Pune–Alandi Road at Charholi Budruk."
          />
          <ul className="link-cards">
            {locations.map((l) => (
              <li key={l.slug}>
                <Link to={`/locations/${l.slug}`}>
                  <strong>{l.h1}</strong>
                  <span>{l.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection title="Not sure where to start?" description="Tell us about your space and we'll suggest the right scope for it." />
    </>
  );
}
