export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
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
  cover: ProjectImage;
  images: ProjectImage[];
  rooms?: { name: string; area: string }[];
  quote?: string;
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

export const projects: Project[] = [
  {
    id: "smruti-garden-residence",
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
    cover: {
      src: "/images/projects/smruti-garden/livingroom-1.jpg",
      alt: "Living room of the Smruti Garden 2BHK residence with warm wood paneling and cove lighting",
    },
    images: [
      {
        src: "/images/projects/smruti-garden/livingroom-1.jpg",
        alt: "Living room with wood-paneled TV unit and beige sectional sofa",
      },
      {
        src: "/images/projects/smruti-garden/bedroom-1.jpg",
        alt: "Bedroom with backlit floral headboard panel and warm cove lighting",
      },
      {
        src: "/images/projects/smruti-garden/kitchen-1.jpg",
        alt: "Modern kitchen with wood island counter and pendant lighting",
      },
      {
        src: "/images/projects/smruti-garden/livingroom-2.jpg",
        alt: "Second living room angle with sofa, curtains, and gallery wall",
      },
      {
        src: "/images/projects/smruti-garden/kitchen-2.jpg",
        alt: "Kitchen cabinetry with under-cabinet lighting and open shelving",
      },
      {
        src: "/images/projects/smruti-garden/washroom-1.jpg",
        alt: "Washroom with round mirror, pendant lighting, and walk-in shower",
      },
      {
        src: "/images/projects/smruti-garden/bedroom-2.jpg",
        alt: "Second bedroom with air conditioning, roman blinds, and bedside lighting",
      },
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
    cover: {
      src: "/images/projects/walnut-residence/living-room-tv-wall.jpg",
      alt: "Living room with a floating walnut-paneled TV wall and integrated soundbar",
    },
    images: [
      {
        src: "/images/projects/walnut-residence/living-room-tv-wall.jpg",
        alt: "Living room with a floating walnut-paneled TV wall and integrated soundbar",
      },
      {
        src: "/images/projects/walnut-residence/console-art.jpg",
        alt: "Entryway console in walnut with abstract art and brass elephant figurines",
      },
      {
        src: "/images/projects/walnut-residence/living-room-sofa.jpg",
        alt: "Living room with a sage bouclé sofa and warm ambient lighting",
      },
      {
        src: "/images/projects/walnut-residence/kitchen.jpg",
        alt: "Modular kitchen with matte green cabinetry and walnut wall units",
      },
      {
        src: "/images/projects/walnut-residence/entryway-kitchen.jpg",
        alt: "Wood-slatted entryway opening onto a matte green kitchen",
      },
    ],
  },
  {
    id: "family-residence",
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
    cover: {
      src: "/images/projects/family-residence/master-bedroom.jpg",
      alt: "Moody master bedroom with charcoal wainscoting and warm sconce lighting",
    },
    images: [
      {
        src: "/images/projects/family-residence/master-bedroom.jpg",
        alt: "Moody master bedroom with charcoal wainscoting and warm sconce lighting",
      },
      {
        src: "/images/projects/family-residence/master-bedroom-wardrobe.jpg",
        alt: "Master bedroom wardrobe wall in cream and walnut with black trim detailing",
      },
      {
        src: "/images/projects/family-residence/kids-room-desk.jpg",
        alt: "Kids' room study nook with a floating walnut desk beneath a botanical mural",
      },
      {
        src: "/images/projects/family-residence/guest-room.jpg",
        alt: "Guest room with a scalloped striped headboard and gingham bedding",
      },
      {
        src: "/images/projects/family-residence/bedroom-textured-wall.jpg",
        alt: "Bedroom with a hand-textured plaster feature wall in a botanical relief pattern",
      },
      {
        src: "/images/projects/family-residence/wardrobe-mirror.jpg",
        alt: "Bedroom wardrobe with full-height mirror and backlit open shelving",
      },
    ],
  },
  {
    id: "luxury-style",
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
    cover: {
      src: "/images/projects/luxury/cover.jpg",
      alt: "Luxury style living room with marble feature wall and gold accents",
    },
    images: [
      {
        src: "/images/projects/luxury/bedroom.jpg",
        alt: "Luxury bedroom with marble headboard wall and warm pendant lighting",
      },
      {
        src: "/images/projects/luxury/kitchen.jpg",
        alt: "Luxury kitchen with dark marble backsplash and integrated lighting",
      },
      {
        src: "/images/projects/luxury/livingroom.jpg",
        alt: "Luxury living room with crystal chandelier and framed artwork",
      },
    ],
  },
  {
    id: "minimalist-style",
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
    cover: {
      src: "/images/projects/minimalist/cover.jpg",
      alt: "Minimalist style bedroom with neutral tones and clean lines",
    },
    images: [
      {
        src: "/images/projects/minimalist/bedroom.jpg",
        alt: "Minimalist bedroom with marble feature wall and floating bed frame",
      },
      {
        src: "/images/projects/minimalist/kitchen.jpg",
        alt: "Minimalist kitchen with light cabinetry and dining nook",
      },
      {
        src: "/images/projects/minimalist/livingroom.jpg",
        alt: "Minimalist living room in soft neutral tones",
      },
    ],
  },
  {
    id: "modern-style",
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
    cover: {
      src: "/images/projects/modern/cover.jpg",
      alt: "Modern style living room with ring pendant light and large windows",
    },
    images: [
      {
        src: "/images/projects/modern/bedroom.jpg",
        alt: "Modern bedroom with marble accent wall and warm wood tones",
      },
      {
        src: "/images/projects/modern/kitchen.jpg",
        alt: "Modern kitchen with glossy cabinetry and pendant lighting",
      },
      {
        src: "/images/projects/modern/livingroom.jpg",
        alt: "Modern living room with round pendant light and garden view",
      },
    ],
  },
  {
    id: "scandinavian-style",
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
    cover: {
      src: "/images/projects/scandinavian/cover.jpg",
      alt: "Scandinavian style bedroom with light wood paneling and brass chandelier",
    },
    images: [
      {
        src: "/images/projects/scandinavian/bedroom.jpg",
        alt: "Scandinavian bedroom with botanical art and green accents",
      },
      {
        src: "/images/projects/scandinavian/kitchen.jpg",
        alt: "Scandinavian kitchen with light cabinetry and dining table",
      },
      {
        src: "/images/projects/scandinavian/livingroom.jpg",
        alt: "Scandinavian living room with warm lighting and wood ceiling detail",
      },
    ],
  },
  {
    id: "traditional-style",
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
    cover: {
      src: "/images/projects/traditional/cover.jpg",
      alt: "Traditional style bedroom with ornate gold wall decor",
    },
    images: [
      {
        src: "/images/projects/traditional/bedroom.jpg",
        alt: "Traditional bedroom with gold floral wall art and tufted bench",
      },
      {
        src: "/images/projects/traditional/kitchen.jpg",
        alt: "Traditional kitchen with patterned backsplash and pooja shelf",
      },
      {
        src: "/images/projects/traditional/livingroom.jpg",
        alt: "Traditional living room with wood-paneled TV unit and crystal chandelier",
      },
    ],
  },
  {
    id: "rustic-style",
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
    cover: {
      src: "/images/projects/rustic/cover.jpg",
      alt: "Rustic style bedroom with slatted wood wall and warm lighting",
    },
    images: [
      {
        src: "/images/projects/rustic/bedroom.jpg",
        alt: "Rustic bedroom with wood-slat feature wall and warm lantern lighting",
      },
      {
        src: "/images/projects/rustic/kitchen.jpg",
        alt: "Rustic kitchen with dark cabinetry and marble backsplash",
      },
      {
        src: "/images/projects/rustic/livingroom.jpg",
        alt: "Rustic living room with carved wood ceiling medallion",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelatedProjects(current: Project, count = 3): Project[] {
  const rest = projects.filter((p) => p.id !== current.id);
  return rest.slice(0, count);
}
