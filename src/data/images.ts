/* ---------------------------------------------------------------
   Site photography, read straight from the folders under
   src/assets/images at build time. To add, remove or replace a photo,
   change the files in the right folder and redeploy — no code edits.

   hero/           NN_label.jpg            e.g. 03_modular-kitchen.jpg
                   Slide order comes from NN; the label is shown on the slide.
   before-after/   N_before.jpg + N_after.jpg   (same room, same framing)
                   Room names for each N are in `beforeAfterRooms` below.
                   A pair only appears once both files exist.
   gallery/<projectId>/  <projectId>_<room>.jpg  e.g. smruti-garden_kitchen.jpg
                   Add -2, -3 … for more shots of the same room.
                   <projectId>_cover.jpg (optional) is used as the cover.
   about/          founder.jpg, studio.jpg
   --------------------------------------------------------------- */

type UrlMap = Record<string, string>;

// Vite needs each glob's options written inline, so they're repeated here.
const heroFiles: UrlMap = import.meta.glob("../assets/images/hero/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
});
const beforeAfterFiles: UrlMap = import.meta.glob("../assets/images/before-after/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
});
const galleryFiles: UrlMap = import.meta.glob("../assets/images/gallery/*/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
});
const aboutFiles: UrlMap = import.meta.glob("../assets/images/about/*.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  query: "?url",
  import: "default",
});

/** "../assets/images/hero/03_modular-kitchen.jpg" → "03_modular-kitchen" */
const baseName = (path: string) => path.slice(path.lastIndexOf("/") + 1).replace(/\.[^.]+$/, "");

const naturalSort = (a: string, b: string) => a.localeCompare(b, undefined, { numeric: true });

// Names that don't title-case cleanly from a file name: whole names first,
// then single words.
const NAMES: Record<string, string> = { living: "Living Room", tvunit: "TV Unit" };
const WORDS: Record<string, string> = { tv: "TV", and: "&", kids: "Kids'" };

/** "master-bedroom-2" → "Master Bedroom", "entry-and-kitchen" → "Entry & Kitchen" */
export function humanize(slug: string): string {
  const name = slug.replace(/-\d+$/, "");
  if (NAMES[name]) return NAMES[name];
  return name
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) => WORDS[w] ?? w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/* ---------- Hero ---------- */

export type SlideMotion = "zoom-in" | "zoom-out" | "pan-left" | "pan-right";

// Cycled through so consecutive slides move differently.
const MOTIONS: SlideMotion[] = ["zoom-in", "pan-left", "zoom-out", "pan-right"];

export const heroSlides = Object.keys(heroFiles)
  .sort(naturalSort)
  .map((path, i) => {
    const label = humanize(baseName(path).replace(/^\d+[_-]?/, "")) || "Interior";
    return {
      src: heroFiles[path],
      label,
      alt: `${label} interior designed by Madhva Interiors`,
      motion: MOTIONS[i % MOTIONS.length],
    };
  });

/* ---------- Before / after ---------- */

// Room name and caption for each pair number. Numbers without an entry here
// still show, labelled "Room N".
export const beforeAfterRooms: Record<number, { room: string; caption: string }> = {
  1: { room: "Living Room", caption: "A bare, handed-over living room turned into a layered, elegant family lounge." },
  2: { room: "Bedroom", caption: "An empty bedroom given warm panelling, soft lighting and a calm palette." },
  3: { room: "Kitchen", caption: "A plain utility space rebuilt as a modular kitchen with generous storage." },
  4: { room: "Entrance", caption: "A blank entryway turned into a welcoming foyer that sets the tone for the home." },
  5: { room: "Bathroom", caption: "A basic washroom reworked with premium finishes and smart storage." },
  6: { room: "Study", caption: "An unused corner turned into a quiet, functional workspace." },
};

export const beforeAfter = (() => {
  const byNumber = new Map<number, { before?: string; after?: string }>();
  for (const [path, url] of Object.entries(beforeAfterFiles)) {
    const match = baseName(path).match(/^(\d+)[_-](before|after)$/i);
    if (!match) continue;
    const n = Number(match[1]);
    const entry = byNumber.get(n) ?? {};
    entry[match[2].toLowerCase() as "before" | "after"] = url;
    byNumber.set(n, entry);
  }
  return [...byNumber.entries()]
    .filter(([, pair]) => pair.before && pair.after)
    .sort(([a], [b]) => a - b)
    .map(([n, pair]) => ({
      id: String(n),
      room: beforeAfterRooms[n]?.room ?? `Room ${n}`,
      caption: beforeAfterRooms[n]?.caption ?? "",
      before: pair.before as string,
      after: pair.after as string,
    }));
})();

/* ---------- Project galleries ---------- */

export interface GalleryImage {
  src: string;
  /** Room key from the file name, e.g. "kitchen-2" */
  room: string;
}

const galleries = (() => {
  const byProject = new Map<string, GalleryImage[]>();
  for (const path of Object.keys(galleryFiles).sort(naturalSort)) {
    const parts = path.split("/");
    const projectId = parts[parts.length - 2];
    const name = baseName(path);
    const room = name.startsWith(`${projectId}_`) ? name.slice(projectId.length + 1) : name;
    const list = byProject.get(projectId) ?? [];
    list.push({ src: galleryFiles[path], room });
    byProject.set(projectId, list);
  }
  return byProject;
})();

/**
 * Photos for one project, cover first: `<id>_cover` if present, otherwise the
 * room named by `coverRoom`, otherwise the first file.
 */
export function getGallery(projectId: string, coverRoom?: string): GalleryImage[] {
  const images = [...(galleries.get(projectId) ?? [])];
  let coverIndex = images.findIndex((img) => img.room === "cover");
  if (coverIndex === -1 && coverRoom) coverIndex = images.findIndex((img) => img.room === coverRoom);
  if (coverIndex > 0) images.unshift(...images.splice(coverIndex, 1));
  return images;
}

/* ---------- About ---------- */

const about = Object.fromEntries(
  Object.entries(aboutFiles).map(([path, url]) => [baseName(path), url])
);

export const aboutImages = {
  founder: about.founder,
  studio: about.studio,
};
