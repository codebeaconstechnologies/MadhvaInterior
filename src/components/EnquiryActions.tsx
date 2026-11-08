import { Link } from "react-router-dom";
import { studio } from "../data/studio";

const whatsappLink = (text: string) =>
  `https://wa.me/${studio.whatsappNumber}?text=${encodeURIComponent(text)}`;

interface EnquiryActionsProps {
  whatsappText: string;
  /** Reported with call / WhatsApp click events (see src/lib/analytics.ts). */
  trackAs: string;
  onDark?: boolean;
}

/** WhatsApp, call and consultation buttons used on service, area and blog pages. */
export default function EnquiryActions({ whatsappText, trackAs, onDark = false }: EnquiryActionsProps) {
  return (
    <div className="enquiry-actions" data-track={trackAs}>
      <a href={whatsappLink(whatsappText)} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
        WhatsApp Us
      </a>
      <a href={studio.phoneHref} className={`btn ${onDark ? "btn-outline--on-dark" : "btn-outline"}`}>
        Call {studio.phone}
      </a>
      <Link to="/contact" className={`btn btn-ghost${onDark ? " enquiry-actions__ghost--on-dark" : ""}`}>
        Book a Consultation →
      </Link>
    </div>
  );
}
