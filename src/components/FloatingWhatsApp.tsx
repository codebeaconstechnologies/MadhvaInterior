import { studio } from "../data/studio";
import "./FloatingWhatsApp.css";

const whatsappHref = `https://wa.me/${studio.whatsappNumber}?text=${encodeURIComponent(
  "Hello Madhva Interiors! 👋 I'm planning the interiors for my space and would love your help in making it beautiful. ✨"
)}`;

export default function FloatingWhatsApp() {
  return (
    <a
      href={whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Chat with Madhva Interiors on WhatsApp"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M16.02 3C9.4 3 4 8.36 4 14.96c0 2.36.64 4.56 1.86 6.5L4 29l7.72-1.8a13.05 13.05 0 0 0 4.3.73c6.62 0 12.02-5.36 12.02-11.96C28.04 8.36 22.64 3 16.02 3zm0 21.7a10.6 10.6 0 0 1-5.4-1.47l-.39-.23-4.58 1.07 1.1-4.44-.26-.41a9.9 9.9 0 0 1-1.55-5.26c0-5.5 4.5-9.97 10.08-9.97 5.57 0 10.07 4.47 10.07 9.97 0 5.51-4.5 9.74-9.07 9.74zm5.53-7.34c-.3-.15-1.79-.88-2.07-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.96 1.18-.18.2-.35.22-.65.08-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.51-1.79-1.69-2.09-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.24-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.79-.73 2.04-1.44.25-.7.25-1.31.18-1.44-.07-.13-.27-.2-.57-.35z"
        />
      </svg>
    </a>
  );
}
