import { FormEvent, useRef, useState } from "react";
import "./ContactForm.css";

interface FormState {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  location: string;
  budget: string;
  contactMethod: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  projectType: "",
  location: "",
  budget: "",
  contactMethod: "Phone",
  message: "",
};

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const submittedOnceRef = useRef(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!EMAIL_RE.test(values.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.message.trim()) next.message = "Tell us a little about your project.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (status === "submitting" || submittedOnceRef.current) return;
    if (honeypotRef.current?.value) {
      // Silently drop likely-bot submissions without revealing the honeypot.
      setStatus("success");
      return;
    }
    if (!validate()) return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Request failed");

      submittedOnceRef.current = true;
      setStatus("success");
      setValues(initialState);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="contact-form__status contact-form__status--success" role="status">
        <h3>Thank you.</h3>
        <p>Your enquiry has been received. We&rsquo;ll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          ref={honeypotRef}
        />
      </div>

      <div className="contact-form__row">
        <div className="field">
          <label htmlFor="name">Name *</label>
          <input
            id="name"
            type="text"
            required
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <span className="field-error" id="name-error">
              {errors.name}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <span className="field-error" id="email-error">
              {errors.email}
            </span>
          )}
        </div>
      </div>

      <div className="contact-form__row">
        <div className="field">
          <label htmlFor="phone">
            Phone <span className="optional">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="projectType">
            Project Type <span className="optional">(optional)</span>
          </label>
          <select
            id="projectType"
            value={values.projectType}
            onChange={(e) => update("projectType", e.target.value)}
          >
            <option value="">Select one</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Renovation">Renovation</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="contact-form__row">
        <div className="field">
          <label htmlFor="location">
            Project Location <span className="optional">(optional)</span>
          </label>
          <input
            id="location"
            type="text"
            placeholder="e.g. Punawale, Pune"
            value={values.location}
            onChange={(e) => update("location", e.target.value)}
          />
        </div>

        <div className="field">
          <label htmlFor="budget">
            Approximate Budget <span className="optional">(optional)</span>
          </label>
          <select id="budget" value={values.budget} onChange={(e) => update("budget", e.target.value)}>
            <option value="">Select a range</option>
            <option value="Under ₹5 Lakh">Under ₹5 Lakh</option>
            <option value="₹5–10 Lakh">₹5–10 Lakh</option>
            <option value="₹10–25 Lakh">₹10–25 Lakh</option>
            <option value="₹25 Lakh+">₹25 Lakh+</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="contactMethod">Preferred Contact Method</label>
        <select
          id="contactMethod"
          value={values.contactMethod}
          onChange={(e) => update("contactMethod", e.target.value)}
        >
          <option value="Phone">Phone</option>
          <option value="Email">Email</option>
          <option value="WhatsApp">WhatsApp</option>
        </select>
      </div>

      <div className="field">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          required
          rows={5}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <span className="field-error" id="message-error">
            {errors.message}
          </span>
        )}
      </div>

      {status === "error" && (
        <p className="contact-form__error" role="alert">
          Something went wrong while sending your enquiry. Please try again or contact us
          directly.
        </p>
      )}

      <button type="submit" className="btn btn-primary contact-form__submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send Enquiry"}
      </button>
    </form>
  );
}
