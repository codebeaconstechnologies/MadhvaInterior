/* Google Analytics 4 events. The gtag.js snippet lives in index.html and
   only loads on the production host, so nothing here fires on localhost
   or preview deploys.

   Events sent:
     click_to_call   — any tel: link is clicked
     click_whatsapp  — any wa.me / WhatsApp link is clicked
     generate_lead   — the enquiry form was accepted by the server (sent
                       from ContactForm only after a successful response,
                       never on a button click alone)

   Page views come from GA4's own config call plus Enhanced Measurement
   ("page changes based on browser history events"), so they are not sent
   here — doing both would double-count. */

type Gtag = (command: "event", name: string, params?: Record<string, unknown>) => void;

export function track(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}

/** Where on the page a link sits, so reports can tell header from footer clicks. */
function linkLocation(el: Element): string {
  const tagged = el.closest<HTMLElement>("[data-track]");
  if (tagged) return tagged.dataset.track as string;
  if (el.closest(".floating-whatsapp")) return "floating_button";
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  return "page";
}

let installed = false;

/** One delegated listener covers every call / WhatsApp link, now and in future pages. */
export function installLinkTracking(): void {
  if (installed || typeof document === "undefined") return;
  installed = true;
  document.addEventListener(
    "click",
    (event) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const params = { link_location: linkLocation(link), page_path: window.location.pathname };
      if (href.startsWith("tel:")) track("click_to_call", params);
      else if (/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href)) track("click_whatsapp", params);
    },
    { capture: true }
  );
}
