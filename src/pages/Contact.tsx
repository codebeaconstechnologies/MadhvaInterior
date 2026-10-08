import Seo from "../components/Seo";
import ContactForm from "../components/ContactForm";
import Reveal from "../components/Reveal";
import Icon from "../components/Icon";
import GoogleRating from "../components/GoogleRating";
import { google } from "../data/google";
import { studio } from "../data/studio";
import "./Contact.css";

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact"
        description="Get in touch with Madhva Interiors & Design Studio in Pune. Call, email, or send an enquiry to start your interior design project."
        path="/contact"
      />

      <section className="contact-page section">
        <Reveal className="container contact-page__header">
          <span className="contact-page__kicker">Get in Touch</span>
        </Reveal>
        <div className="container contact-page__grid">
          <Reveal className="contact-page__info">
            <h1 className="contact-page__title">Let&rsquo;s create something considered.</h1>
            <p className="lede">
              Tell us about your space and we&rsquo;ll get back to you to schedule a
              conversation.
            </p>
            <p className="contact-page__note">
              We never juggle a crowd of projects. We take on just two at a time and give
              each one everything it takes to be perfect. Reach out early to reserve your slot.
            </p>

            <dl className="contact-page__facts">
              <div>
                <dt>
                  <span className="contact-page__icon">
                    <Icon name="phone" />
                  </span>
                  Phone
                </dt>
                <dd>
                  <a href={studio.phoneHref}>{studio.phone}</a>
                </dd>
              </div>
              <div>
                <dt>
                  <span className="contact-page__icon">
                    <Icon name="mail" />
                  </span>
                  Email
                </dt>
                <dd>
                  <a href={`mailto:${studio.email}`}>{studio.email}</a>
                </dd>
              </div>
              <div className="contact-page__facts-wide">
                <dt>
                  <span className="contact-page__icon">
                    <Icon name="pin" />
                  </span>
                  Address
                </dt>
                <dd>
                  {studio.address.line1}
                  <br />
                  {studio.address.line2}
                  <br />
                  {studio.address.line3}
                </dd>
              </div>
              <div>
                <dt>
                  <span className="contact-page__icon">
                    <Icon name="instagram" />
                  </span>
                  Instagram
                </dt>
                <dd>
                  <a href={studio.instagramUrl} target="_blank" rel="noopener noreferrer">
                    {studio.instagramHandle}
                  </a>
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={100} className="contact-page__form-wrap">
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="contact-map section--tight section--muted">
        <div className="container">
          <Reveal className="contact-map__head">
            <div>
              <span className="eyebrow">Visit the Studio</span>
              <h2 className="contact-map__title">Find us on Pune – Alandi Road</h2>
            </div>
            <div className="contact-map__actions">
              <GoogleRating />
              <a href={google.directionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                Get Directions
              </a>
            </div>
          </Reveal>
          <Reveal className="contact-map__frame">
            <iframe
              src={google.mapEmbedUrl}
              title={`${studio.fullName} on Google Maps`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
