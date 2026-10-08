import { FormEvent, useRef, useState } from "react";
import { studio } from "../data/studio";
import "./ContactForm.css";

interface FormState {
  name: string;
  phone: string;
  email: string;
  location: string;
  projectType: string;
  propertyType: string;
  message: string;
}

const initialState: FormState = {
  name: "",
  phone: "",
  email: "",
  location: "",
  projectType: "",
  propertyType: "",
  message: "",
};

const PROJECT_TYPES = ["Residential", "Commercial", "Renovation"] as const;
const PROPERTY_TYPES = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "Penthouse", "Villa", "Bungalow"] as const;

// Commercial briefs vary too much for a fixed list, so the property type
// only applies to residential and renovation projects.
const hasPropertyType = (projectType: string) => projectType !== "" && projectType !== "Commercial";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Accepts a 10-digit Indian mobile number, optionally prefixed with 0 or +91.
function isValidPhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return /^(?:91|0)?[6-9]\d{9}$/.test(digits);
}

// "my 2 BHK home in Punawale", "my commercial space", "my home" — built from
// whatever the visitor has filled in so far.
function describePlace(v: FormState): string {
  const place =
    v.projectType === "Commercial"
      ? "commercial space"
      : `${v.propertyType ? `${v.propertyType} ` : ""}home`;
  const location = v.location.trim() ? ` in ${v.location.trim()}` : "";
  return `my ${place}${location}`;
}

// Ready-made messages the visitor can start from instead of a blank box.
const MESSAGE_TEMPLATES: { label: string; text: (v: FormState) => string }[] = [
  {
    label: "Complete interiors",
    text: (v) =>
      `Hi, I'd love to get the complete interiors done for ${describePlace(v)}. I'm looking for a space that feels elegant, practical and truly ours. Could we set up a time to discuss ideas?`,
  },
  {
    label: "New possession",
    text: (v) =>
      `We've just received possession of ${describePlace(v)} and would like to plan the interiors from scratch: layout, furniture, lighting, everything. When could we meet to get started?`,
  },
  {
    label: "Renovation",
    text: (v) =>
      `I'm planning to renovate ${describePlace(v)} and give it a fresh, modern look. I'd love to hear your ideas on what's possible. Could we talk?`,
  },
  {
    label: "Kitchen & wardrobes",
    text: (v) =>
      `I'm looking to redesign the kitchen and wardrobes in ${describePlace(v)}. Could you share how you would approach it and what the next steps are?`,
  },
];

function buildWhatsAppText(v: FormState): string {
  const project = hasPropertyType(v.projectType) ? `${v.projectType} · ${v.propertyType}` : v.projectType;
  const lines = [
    "Hello Madhva Interiors! 👋",
    "I'd love your help designing my space. Here are my details:",
    "",
    `👤 *Name:* ${v.name.trim()}`,
    `📞 *Phone:* ${v.phone.trim()}`,
    v.email.trim() ? `✉️ *Email:* ${v.email.trim()}` : null,
    `🏠 *Project:* ${project}`,
    v.location.trim() ? `📍 *Location:* ${v.location.trim()}` : null,
    "",
    "📝 *About my project:*",
    v.message.trim(),
    "",
    "Looking forward to creating something beautiful together! ✨",
  ];
  return lines.filter((line) => line !== null).join("\n");
}

const whatsappHref = (v: FormState) =>
  `https://wa.me/${studio.whatsappNumber}?text=${encodeURIComponent(buildWhatsAppText(v))}`;

export default function ContactForm() {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sentHref, setSentHref] = useState("");
  const honeypotRef = useRef<HTMLInputElement>(null);
  const submittedOnceRef = useRef(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function updateProjectType(projectType: string) {
    setValues((v) => ({
      ...v,
      projectType,
      propertyType: hasPropertyType(projectType) ? v.propertyType : "",
    }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.phone.trim()) {
      next.phone = "Please enter your phone number.";
    } else if (!isValidPhone(values.phone)) {
      next.phone = "Please enter a valid 10-digit mobile number.";
    }
    if (values.email.trim() && !EMAIL_RE.test(values.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.projectType) next.projectType = "Please choose a project type.";
    if (hasPropertyType(values.projectType) && !values.propertyType) {
      next.propertyType = "Please choose a property type.";
    }
    if (!values.message.trim()) next.message = "Tell us a little about your project.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function resetForm() {
    submittedOnceRef.current = false;
    setValues(initialState);
    setErrors({});
    setSentHref("");
    setStatus("idle");
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

    // Open WhatsApp first, while we still have the click's user gesture —
    // browsers block pop-ups opened after an await.
    const href = whatsappHref(values);
    setSentHref(href);
    window.open(href, "_blank", "noopener");

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
        <p>
          Your enquiry has been received. Please send the WhatsApp message that just opened
          so we have your details there too — we&rsquo;ll be in touch shortly.
        </p>
        <div className="contact-form__status-actions">
          {sentHref && (
            <a href={sentHref} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Open WhatsApp
            </a>
          )}
          <button type="button" className="btn btn-ghost" onClick={resetForm}>
            Send another enquiry
          </button>
        </div>
      </div>
    );
  }

  const propertyEnabled = hasPropertyType(values.projectType);

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
          <label htmlFor="phone">Phone *</label>
          <input
            id="phone"
            type="tel"
            required
            inputMode="tel"
            autoComplete="tel"
            placeholder="e.g. 98765 43210"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? "phone-error" : undefined}
          />
          {errors.phone && (
            <span className="field-error" id="phone-error">
              {errors.phone}
            </span>
          )}
        </div>
      </div>

      <div className="contact-form__row">
        <div className="field">
          <label htmlFor="email">
            Email <span className="optional">(optional)</span>
          </label>
          <input
            id="email"
            type="email"
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
      </div>

      <div className="contact-form__row">
        <div className="field">
          <label htmlFor="projectType">Project Type *</label>
          <select
            id="projectType"
            required
            value={values.projectType}
            onChange={(e) => updateProjectType(e.target.value)}
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={errors.projectType ? "projectType-error" : undefined}
          >
            <option value="">Select one</option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.projectType && (
            <span className="field-error" id="projectType-error">
              {errors.projectType}
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="propertyType">Property Type{values.projectType === "Commercial" ? "" : " *"}</label>
          <select
            id="propertyType"
            required={propertyEnabled}
            disabled={!propertyEnabled}
            value={values.propertyType}
            onChange={(e) => update("propertyType", e.target.value)}
            aria-invalid={Boolean(errors.propertyType)}
            aria-describedby={errors.propertyType ? "propertyType-error" : undefined}
          >
            <option value="">
              {values.projectType === "Commercial"
                ? "Not applicable for commercial"
                : values.projectType
                  ? "Select one"
                  : "Choose a project type first"}
            </option>
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.propertyType && (
            <span className="field-error" id="propertyType-error">
              {errors.propertyType}
            </span>
          )}
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">Message *</label>
        <div className="contact-form__templates" role="group" aria-label="Start from a suggested message">
          <span className="contact-form__templates-hint">Need a starting point?</span>
          {MESSAGE_TEMPLATES.map((template) => {
            const text = template.text(values);
            return (
              <button
                key={template.label}
                type="button"
                className={values.message === text ? "is-active" : ""}
                aria-pressed={values.message === text}
                onClick={() => update("message", text)}
              >
                {template.label}
              </button>
            );
          })}
        </div>
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
          We couldn&rsquo;t email your enquiry just now. If you sent the WhatsApp message, we
          already have your details — otherwise please try again or call us on {studio.phone}.
        </p>
      )}

      <div className="contact-form__footer">
        <button type="submit" className="btn btn-primary contact-form__submit" disabled={status === "submitting"}>
          {status === "submitting" ? "Sending…" : "Send Enquiry"}
        </button>
        <p className="contact-form__note">
          Your details are sent to our studio by email and WhatsApp.
        </p>
      </div>
    </form>
  );
}
