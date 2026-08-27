import Seo from "../components/Seo";
import ContactForm from "../components/ContactForm";
import Reveal from "../components/Reveal";
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
        <div className="container contact-page__grid">
          <Reveal className="contact-page__info">
            <span className="eyebrow">Get In Touch</span>
            <h1 className="contact-page__title">Let&rsquo;s create something considered.</h1>
            <p className="lede">
              Tell us about your space and we&rsquo;ll get back to you to schedule a
              conversation.
            </p>

            <dl className="contact-page__facts">
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={studio.phoneHref}>{studio.phone}</a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={`mailto:${studio.email}`}>{studio.email}</a>
                </dd>
              </div>
              <div>
                <dt>Studio Hours</dt>
                <dd>{studio.hours}</dd>
              </div>
              <div>
                <dt>Address</dt>
                <dd>
                  {studio.address.line1}
                  <br />
                  {studio.address.line2}
                  <br />
                  {studio.address.line3}
                </dd>
              </div>
              <div>
                <dt>Instagram</dt>
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
    </>
  );
}
