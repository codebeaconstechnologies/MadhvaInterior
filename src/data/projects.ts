import { getGallery, humanize } from "./images";

export interface ProjectImage {
  src: string;
  alt: string;
}

// Project details. Photos are not listed here: they come from
// src/assets/images/gallery/<id>/ (see ./images.ts), so `id` must match the
// folder name. `coverRoom` picks the cover when there's no <id>_cover file.
interface ProjectInfo {
  id: string;
  coverRoom?: string;
  slug: string;
  title: string;
  category: string;
  featured?: boolean;
  location: string;
  year: string;
  client?: string;
  bhk?: string;
  summary: string;
  description: string;
  highlights: string[];
  rooms?: { name: string; area: string }[];
  quote?: string;
}

export interface Project extends ProjectInfo {
  cover: ProjectImage;
  images: ProjectImage[];
}

export const categories = [
  "All",
  "Residential",
  "Luxury",
  "Minimalist",
  "Modern",
  "Scandinavian",
  "Traditional",
  "Rustic",
] as const;

export type Category = (typeof categories)[number];

const projectInfo: ProjectInfo[] = [
  {
    id: "smruti-garden",
    coverRoom: "living",
    slug: "smruti-garden-residence",
    title: "Smruti Garden Residence",
    category: "Residential",
    featured: true,
    location: "Punawale, Pune",
    year: "2025",
    client: "Mr. Bhikaji & Mrs. Namrata",
    bhk: "2 BHK",
    summary:
      "A warm, modern home balancing comfort, functionality, and daily living.",
    description:
      "Mr. Bhikaji envisioned a warm, modern home that balances comfort, functionality, and daily living. Blending modern elegance with functionality, this design creates a stylish, comfortable, and light-filled space across the living room, kitchen, bedrooms, and washroom.",
    highlights: [
      "Full 2 BHK residential fit-out",
      "Custom TV unit and wardrobe joinery",
      "Warm ambient and cove lighting throughout",
      "Space-planned kitchen with island-style counter",
    ],
    rooms: [
      { name: "Bedroom", area: "120 sq. ft." },
      { name: "Living Room", area: "200 sq. ft." },
      { name: "Kitchen", area: "110 sq. ft." },
    ],
    quote:
      "The quality of work, finishes & materials has been excellent. I never thought my home could look this incredible.",
  },
  {
    id: "walnut-residence",
    coverRoom: "tvunit",
    slug: "walnut-residence",
    title: "The Walnut Residence",
    category: "Modern",
    featured: true,
    location: "Pune",
    year: "2025",
    summary:
      "A warm, walnut-toned home built around considered joinery and a calm neutral palette.",
    description:
      "A full residential fit-out centered on warm walnut wood, matte green cabinetry, and a restrained neutral palette. From the floating TV wall to the sculptural console and a garden-facing kitchen, every room was planned to feel calm, current, and built to last.",
    highlights: [
      "Floating walnut TV wall with integrated soundbar niche",
      "Sculptural console styled with curated art and objects",
      "Bouclé-upholstered living room seating",
      "Matte green modular kitchen with walnut wall cabinetry",
    ],
  },
  {
    id: "family-residence",
    coverRoom: "master-bedroom",
    slug: "family-residence",
    title: "Family Residence",
    category: "Residential",
    featured: true,
    location: "Pune",
    year: "2025",
    summary:
      "A multi-bedroom family home where every room carries its own considered character.",
    description:
      "A family home designed room by room — a playful kids' nook, a moody walnut-and-charcoal master bedroom, a soft striped guest room, and a textured plaster feature wall — each space tailored to the person who uses it, without losing a cohesive sense of quality throughout.",
    highlights: [
      "Custom kids' study nook with wall-mounted storage",
      "Moody master bedroom in walnut and charcoal tones",
      "Scalloped upholstered headboard in the guest room",
      "Hand-textured plaster feature wall with botanical relief",
    ],
  },
  {
    id: "luxury",
    slug: "luxury-style",
    title: "The Luxury Collection",
    category: "Luxury",
    location: "Pune",
    year: "2025",
    summary: "Opulent materials and layered lighting for expansive, detailed living.",
    description:
      "Timeless elegance and unparalleled comfort in every detail — opulent materials like marble and silk, custom furniture and unique art, layered lighting from chandeliers to sconces, and expansive spaces finished with meticulous detail.",
    highlights: [
      "Opulent materials: marble, silk",
      "Custom furniture and unique art",
      "Layered lighting: chandeliers, sconces",
      "Rich colors with bold accents",
      "Technology seamlessly integrated",
    ],
  },
  {
    id: "minimalist",
    slug: "minimalist-style",
    title: "The Minimalist Collection",
    category: "Minimalist",
    location: "Pune",
    year: "2025",
    summary: "Clean lines, uncluttered spaces, and a 'less is more' philosophy.",
    description:
      "Simplicity and clean lines define this collection — uncluttered spaces, a monochromatic palette with restrained accents, open floor plans, and abundant natural light throughout.",
    highlights: [
      "Simplicity and clean lines",
      "Monochromatic palette with accents",
      "Open floor plan",
      "Lots of natural light",
      "Functional, essential furniture",
    ],
  },
  {
    id: "modern",
    slug: "modern-style",
    title: "The Modern Collection",
    category: "Modern",
    location: "Pune",
    year: "2025",
    summary: "Sleek, functional spaces in neutral palettes with bold accents.",
    description:
      "Sleek and minimalist, but never cold — functional, spacious layouts in neutral palettes with bold accents, open plans filled with natural light, and innovative materials like glass, metal, and concrete.",
    highlights: [
      "Sleek, minimalist style",
      "Neutral palettes with bold accents",
      "Open layouts with natural light",
      "Innovative materials: glass, metal, concrete",
    ],
  },
  {
    id: "scandinavian",
    slug: "scandinavian-style",
    title: "The Scandinavian Collection",
    category: "Scandinavian",
    location: "Pune",
    year: "2025",
    summary: "Simplicity, coziness, and light, airy spaces with natural materials.",
    description:
      "A focus on simplicity and coziness — an intentional, minimalistic design blending midcentury and modern styles, with warm, approachable aesthetics, light colors, and natural materials throughout.",
    highlights: [
      "Focus on simplicity and coziness",
      "Blend of midcentury modern and modern styles",
      "Warm, approachable aesthetics",
      "Light colors and natural materials",
    ],
  },
  {
    id: "traditional",
    slug: "traditional-style",
    title: "The Traditional Collection",
    category: "Traditional",
    location: "Pune",
    year: "2025",
    summary: "Classic details, rich palettes, and balanced, symmetrical layouts.",
    description:
      "Timeless elegance with rich colors, classic furniture, and balanced symmetry — ornate furniture in elegant fabrics, decorative moldings and woodwork, and a formal, layered design throughout.",
    highlights: [
      "Classic details and timeless elements",
      "Rich, warm color palettes",
      "Ornate furniture with elegant fabrics",
      "Symmetry and balanced layouts",
      "Decorative moldings and woodwork",
    ],
  },
  {
    id: "rustic",
    slug: "rustic-style",
    title: "The Rustic Collection",
    category: "Rustic",
    location: "Pune",
    year: "2025",
    summary: "Natural, aged materials with rugged, handcrafted charm.",
    description:
      "Emphasizing natural, aged elements with a rugged, handcrafted charm — organic textures, warm earthy colors, and raw, unfinished wood used throughout the space.",
    highlights: [
      "Natural and aged materials",
      "Organic textures",
      "Handcrafted elements",
      "Warm, earthy colors",
      "Raw, unfinished wood",
    ],
  },
];

export const projects: Project[] = projectInfo.map((info) => {
  const images = getGallery(info.id, info.coverRoom).map((img) => ({
    src: img.src,
    alt: `${humanize(img.room)} — ${info.title} by Madhva Interiors`,
  }));
  return { ...info, cover: images[0] ?? { src: "/images/og-image.jpg", alt: info.title }, images };
});

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(current: Project, count = 3): Project[] {
  const rest = projects.filter((p) => p.id !== current.id);
  return rest.slice(0, count);
}
