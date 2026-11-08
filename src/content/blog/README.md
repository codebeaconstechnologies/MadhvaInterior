# Blog articles

Each `.md` file in this folder is one article at `/blog/<file-name>`. Adding a
file and redeploying publishes it — it appears on `/blog`, in `sitemap.xml`,
and gets its own page with structured data. No code changes needed.

## Front matter

Every file starts with a block like this:

```
---
title: 2 BHK Interior Design Cost in Pune: What Decides Your Budget
seoTitle: 2 BHK Interior Design Cost in Pune — Budget Guide
description: One or two sentences (about 150 characters) shown in Google results.
date: 2026-11-08
updated: 2026-11-08
image: /images/gallery/smruti-garden/smruti-garden_living.jpg
imageAlt: Living room of a 2 BHK in Punawale designed by Madhva Interiors
related: 2bhk-interior-design-pune, modular-kitchen-design-pune
---
```

- `title`, `description`, `date`, `image` and `imageAlt` are required.
- `seoTitle` (optional) is the browser/Google title if it should differ from the heading.
- `updated` (optional) — change it when you revise an article.
- `related` (optional) — service page slugs from `src/data/services.ts`, linked at the end.
- `image` must be a photo under `public/images/`.

## Body

Plain Markdown: `##` and `###` headings (never `#` — the title is the page's
heading), lists, **bold**, and links. Link to other pages with site paths,
e.g. `[modular kitchens](/services/modular-kitchen-design-pune)`.

To add FAQs, end the article with:

```
## Frequently asked questions

### The question?
The answer, as one paragraph.
```

They are shown as an accordion and added as FAQ structured data.

## Accuracy

Don't publish prices, timelines, guarantees or claims the studio hasn't
confirmed. Where costs come up, explain what drives them and invite readers
to ask for an itemised quote — or add the studio's real figures.
