# Madhva Interiors & Design Studio — Website

A production-ready marketing website for **Madhva Interiors & Design Studio**, a
Pune-based interior design firm. Built as a static React + Vite site with a
Cloudflare Pages Function that securely sends contact-form enquiries via
[Resend](https://resend.com).

Content, photography, colors, and brand details were extracted directly from the
studio's brand PDF — see [Content sourced from the brand PDF](#content-sourced-from-the-brand-pdf)
for exactly what's real vs. what you'll want to review.

---

## 1. Project structure

```
MadhavaInterior/
├── functions/
│   └── api/
│       └── contact.ts        # Cloudflare Pages Function — sends email via Resend
├── public/
│   ├── images/
│   │   ├── studio/            # logo, founder portrait, service photos
│   │   ├── hero/               # homepage hero image
│   │   ├── projects/           # gallery project photos, by project slug
│   │   └── testimonials/       # client headshots
│   ├── _redirects              # SPA fallback for Cloudflare Pages
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/             # Header, Footer, ContactForm, ProjectCard, etc.
│   ├── data/                   # studio.ts, projects.ts, testimonials.ts — edit these to update content
│   ├── hooks/
│   ├── pages/                  # Home, About, Gallery, ProjectDetail, Contact, NotFound
│   ├── styles/index.css        # design tokens + base styles
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── wrangler.toml
├── .env.example
└── package.json
```

---

## 2. Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`. Vite's dev server does **not** run Cloudflare
Pages Functions, so `/api/contact` will 404 locally unless you run it through
Wrangler instead (see below).

### Running the contact form locally (with Wrangler)

```bash
npm run build
npx wrangler pages dev dist --compatibility-date=2024-11-01
```

Create a `.dev.vars` file (never committed — already covered by `.gitignore`
if you name it `.dev.vars`) in the project root with your Resend credentials,
using `.env.example` as a template:

```
RESEND_API_KEY=re_your_real_key
CONTACT_EMAIL=unmesh@madhvainteriors.com
FROM_EMAIL=Madhva Interiors <enquiries@yourdomain.com>
```

Wrangler picks up `.dev.vars` automatically for local testing.

---

## 3. Production build

```bash
npm run build
```

Outputs to `dist/`. `npm run preview` serves that build locally for a final
sanity check.

---

## 4. Resend setup (email delivery)

1. Create a free account at [resend.com](https://resend.com).
2. **Verify a sending domain** (Resend → Domains → Add Domain) and add the DNS
   records it gives you. You cannot send from an unverified domain, and you
   should **not** send `from` a `gmail.com` address — use a domain you control
   (e.g. `madhvainteriors.com`, or a domain you already own).
3. Create an API key (Resend → API Keys) — this is your `RESEND_API_KEY`.
4. Decide on:
   - `FROM_EMAIL` — e.g. `Madhva Interiors <enquiries@yourdomain.com>` (must be on your verified domain)
   - `CONTACT_EMAIL` — the studio inbox that should receive enquiries, e.g. `unmesh@madhvainteriors.com` (this can be any inbox — it's just the recipient)

The contact form (`functions/api/contact.ts`) sends a formatted HTML email to
`CONTACT_EMAIL`, from `FROM_EMAIL`, with `reply_to` set to the visitor's own
email address — so replying to the notification email replies directly to the
enquirer.

**The Resend API key is never exposed to the browser.** It is only read
server-side inside the Cloudflare Pages Function, from an environment
variable/secret.

---

## 5. Cloudflare Pages deployment

### Option A — Git integration (recommended)

1. Push this repository to GitHub/GitLab.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git** → select the repo.
3. Build settings:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Deploy. Cloudflare Pages automatically detects `functions/api/contact.ts`
   and deploys it as a Pages Function — no extra config needed.

### Option B — Direct upload via Wrangler

```bash
npm run build
npx wrangler pages deploy dist --project-name=madhva-interiors
```

### Environment variables (required)

In the Cloudflare dashboard → your Pages project → **Settings** →
**Environment variables**, add for both **Production** and **Preview**:

| Variable | Type | Example |
|---|---|---|
| `RESEND_API_KEY` | Secret | `re_xxxxxxxxxxxxxxxx` |
| `CONTACT_EMAIL` | Plaintext | `unmesh@madhvainteriors.com` |
| `FROM_EMAIL` | Plaintext | `Madhva Interiors <enquiries@yourdomain.com>` |

Redeploy after adding/changing environment variables (Cloudflare Pages does
not hot-reload them into already-running deployments).

### Optional: rate limiting via KV

`functions/api/contact.ts` supports an optional `RATE_LIMIT_KV` binding for
basic per-IP rate limiting (5 submissions / 10 minutes). Without it, the form
still works — this layer is skipped entirely if unbound.

```bash
npx wrangler kv namespace create RATE_LIMIT_KV
```

Add the returned `id` to `wrangler.toml` (uncomment the `[[kv_namespaces]]`
block) **and** bind it in the Cloudflare dashboard under your Pages project →
Settings → Functions → KV namespace bindings.

### Custom domain

Cloudflare Pages project → **Custom domains** → **Set up a custom domain** →
follow the DNS instructions. Once your real domain is live, update:

- `src/data/studio.ts` → `siteUrl`
- `index.html` → the `canonical`, `og:*` tags, and JSON-LD `url`/`image`
- `public/robots.txt` and `public/sitemap.xml`

(all currently use the placeholder `https://www.madhvainteriors.com`).

### Verify the contact form after deploy

1. Visit `https://<your-deployment>/contact`.
2. Submit a test enquiry.
3. Confirm the email arrives at `CONTACT_EMAIL` with `Reply-To` set to the
   email you entered.
4. Check Cloudflare Pages → your deployment → **Functions** logs if it fails —
   the function logs Resend API errors there (never shown to the visitor).

### Troubleshooting

| Symptom | Likely cause |
|---|---|
| Form shows the generic error message | Check Functions logs — usually a missing/incorrect env var, or an unverified `FROM_EMAIL` domain in Resend |
| 404 on `/about`, `/gallery/...` after refresh | `public/_redirects` didn't deploy — confirm it exists in `dist/` after `npm run build` |
| Images 404 | Confirm `public/images/...` paths match `src/data/projects.ts` exactly (case-sensitive on Cloudflare) |
| Email lands in spam | Domain not fully verified in Resend (SPF/DKIM DNS records), or sending from a free/generic domain |

---

## 6. Replacing images

All current photography was extracted directly from the studio's brand PDF —
see [Content sourced from the brand PDF](#content-sourced-from-the-brand-pdf).
To replace any image with a higher-resolution or updated photo:

1. Drop the new file into the matching folder under `public/images/...`,
   ideally as a compressed `.jpg` or `.webp` (aim for under ~300KB per image;
   tools like [Squoosh](https://squoosh.app) work well).
2. If you keep the same filename, no code changes are needed.
3. If you rename it, update the matching `src` path in `src/data/projects.ts`
   (for gallery/project photos) or the relevant component (`Hero.tsx`,
   `About.tsx`, `Header.tsx`/`Footer.tsx` for the logo, etc.).
4. Keep `alt` text accurate and descriptive — it's used for accessibility and
   SEO.

---

## 7. Adding a new gallery project

Everything lives in **`src/data/projects.ts`** — no component changes needed.

1. Add your images to `public/images/projects/<your-project-slug>/`.
2. Add a new entry to the `projects` array:

```ts
{
  id: "your-project-slug",
  slug: "your-project-slug",
  title: "Project Name",
  category: "Modern", // must match one of the `categories` filter values
  location: "Area, Pune",
  year: "2026",
  summary: "One-sentence summary shown on cards.",
  description: "Longer paragraph for the project detail page.",
  highlights: ["Bullet one", "Bullet two"],
  cover: { src: "/images/projects/your-project-slug/cover.jpg", alt: "..." },
  images: [
    { src: "/images/projects/your-project-slug/living-room.jpg", alt: "..." },
    // ...
  ],
  rooms: [{ name: "Living Room", area: "200 sq. ft." }], // optional
  quote: "A client testimonial line.", // optional
}
```

3. If it introduces a new style/category, add it to the `categories` array at
   the top of the same file so it shows up as a filter pill on `/gallery`.

The project automatically appears in the gallery grid, gets its own
`/gallery/<slug>` detail page with prev/next navigation, and is eligible to
show in "Featured Projects" on the homepage (edit the `.slice(0, 4)` in
`src/pages/Home.tsx` to change which/how many appear there).

---

## 8. Content sourced from the brand PDF

Everything below was taken directly from the studio's brand PDF — studio
name, tagline, founder, address, phone, email, Instagram handle, services,
"why choose us" points, materials list, all six design-style descriptions,
all five client testimonials, and all photography (cropped directly from the
PDF's pages).

**Known placeholder that needs your input before going live:**

- `siteUrl` in `src/data/studio.ts` (and the matching values in `index.html`,
  `robots.txt`, `sitemap.xml`) uses `https://www.madhvainteriors.com` as a
  placeholder — replace with the studio's actual registered domain once
  chosen.
- `FROM_EMAIL` for Resend needs a real verified sending domain — it cannot be
  a `gmail.com` address (see [§4](#4-resend-setup-email-delivery)).

Nothing else was fabricated — no invented contact details, no stock photos
standing in for real projects.

---

## 9. Adding Cloudflare Turnstile (optional, not yet wired in)

The contact form architecture supports adding
[Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/) for
stronger bot protection alongside the existing honeypot field:

1. Create a Turnstile site key in the Cloudflare dashboard.
2. Add the Turnstile widget script + `<div class="cf-turnstile">` to
   `ContactForm.tsx`, and include its token in the POST body.
3. In `functions/api/contact.ts`, verify the token server-side against
   `https://challenges.cloudflare.com/turnstile/v0/siteverify` using a
   `TURNSTILE_SECRET_KEY` environment variable before proceeding.

---

## 10. Production checklist

- [ ] Replace `siteUrl` placeholder domain across `studio.ts`, `index.html`, `robots.txt`, `sitemap.xml`
- [ ] Verify a real sending domain in Resend and set `FROM_EMAIL` to it
- [ ] Set `RESEND_API_KEY`, `CONTACT_EMAIL`, `FROM_EMAIL` in Cloudflare Pages (Production + Preview)
- [ ] Submit a real test enquiry on the deployed site and confirm the email arrives
- [ ] Connect the custom domain in Cloudflare Pages
- [ ] Swap in higher-resolution photography where available (current images are cropped from the source PDF)
- [ ] Re-run `npm run build` locally to confirm a clean build before each deploy
- [ ] Spot-check `/`, `/about`, `/gallery`, a project detail page, and `/contact` on both mobile and desktop widths
- [ ] Confirm the mobile hamburger menu opens/closes correctly and all links work
- [ ] (Optional) Set up `RATE_LIMIT_KV` for contact-form rate limiting
- [ ] (Optional) Add Cloudflare Turnstile per §9 if spam becomes an issue

---

## Tech stack

- **React 18 + TypeScript + Vite** — static frontend, no server required
- **React Router** — client-side routing, with `public/_redirects` handling
  the SPA fallback on Cloudflare Pages
- **Plain CSS** with design tokens (`src/styles/index.css`) — no framework
  dependency, kept deliberately small
- **Cloudflare Pages Functions** — the `/api/contact` endpoint, deployed
  alongside the static site, no separate backend to host
- **Resend** — transactional email delivery for contact-form enquiries

No database, no paid services required — everything runs within Cloudflare
Pages' and Resend's free tiers.
