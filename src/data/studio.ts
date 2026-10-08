export const studio = {
  name: "Madhva Interiors",
  fullName: "Madhva Interiors & Design Studio",
  tagline: "Your Dream Interiors, All in One Place",
  subtagline: "Residential and Commercial Interior Design",
  founder: "Unmesh Kadre",
  founderTitle: "Founder & Principal Designer",
  city: "Pune",
  phone: "+91 9270304552",
  phoneHref: "tel:+919270304552",
  whatsappNumber: "919270304552",
  email: "unmesh@madhvainteriors.com",
  instagramHandle: "@madhvainteriors",
  instagramUrl: "https://www.instagram.com/madhvainteriors",
  address: {
    line1: "Shop No 233, Shri Ganesh Galaxy",
    line2: "Pune - Alandi Rd, near Gokhale Mala, Wadmukhwadi",
    line3: "Charholi Budruk, Pune, Pimpri-Chinchwad, Maharashtra 412105",
    full: "Shop No 233, Shri Ganesh Galaxy, Pune - Alandi Rd, near Gokhale Mala, Wadmukhwadi, Charholi Budruk, Pune, Pimpri-Chinchwad, Maharashtra 412105",
  },
  hours: "All days, 10:00 AM – 7:00 PM",
  // NOTE: placeholder production domain — replace once the studio's real
  // domain is registered, then update index.html canonical logic + sitemap.xml.
  siteUrl: "https://www.madhvainteriors.com",
} as const;

export const whyChooseUs = [
  {
    title: "Best Price Guarantee",
    description: "Transparent, competitive quotes with no hidden costs.",
  },
  {
    title: "3D Visualization",
    description: "See your space rendered in detail before work begins.",
  },
  {
    title: "On-Time Delivery",
    description: "Systematic planning that keeps every project on schedule.",
  },
  {
    title: "5+ Year Material Warranty",
    description: "Premium materials backed by a warranty you can rely on.",
  },
  {
    title: "Modern Designs",
    description: "Contemporary aesthetics tailored to how you actually live.",
  },
  {
    title: "Custom Furniture",
    description: "Bespoke pieces built to fit your space and your taste.",
  },
] as const;

export const services = [
  {
    slug: "space-planning-design",
    title: "Space Planning & Design",
    description:
      "Thoughtful layouts that make every square foot work harder for you.",
    image: "/images/studio/service-space-planning.jpg",
  },
  {
    slug: "false-ceiling-flooring",
    title: "False Ceiling & Wooden Flooring",
    description:
      "Precision ceiling work and flooring installations, finished to last.",
    image: "/images/studio/service-flooring.jpg",
  },
  {
    slug: "lighting-decor",
    title: "Lighting & Decor",
    description:
      "Layered lighting schemes and styling that bring warmth to every room.",
    image: "/images/studio/service-lighting.jpg",
  },
  {
    slug: "custom-furniture-wardrobes",
    title: "Custom Furniture & Wardrobes",
    description:
      "Bespoke furniture and wardrobes, designed and built around your space.",
    image: "/images/studio/service-furniture.jpg",
  },
] as const;

export const processSteps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We start with a conversation — understanding how you live, what you need, and the character you want your space to have.",
  },
  {
    number: "02",
    title: "Concept & 3D Visualization",
    description:
      "Your space is planned and rendered in 3D, so you can see and refine the design before anything is built.",
  },
  {
    number: "03",
    title: "Material Selection",
    description:
      "We guide you through premium materials and finishes, balancing durability, budget, and aesthetics.",
  },
  {
    number: "04",
    title: "Execution",
    description:
      "Our team manages the full build — false ceilings, flooring, furniture, and lighting — with systematic oversight.",
  },
  {
    number: "05",
    title: "Deliver",
    description:
      "A final walkthrough, on schedule, backed by a 5+ year material warranty on the work we deliver.",
  },
] as const;

export const materials = [
  {
    name: "Solid & Engineered Wood",
    lifespan: "15–50 years",
    usedIn: "Flooring, furniture, cabinetry, wall paneling",
    note: "Solid wood can be refinished multiple times; engineered wood is more stable in humid conditions.",
  },
  {
    name: "Plywood",
    lifespan: "20–30 years",
    usedIn: "Furniture, paneling, modular kitchens",
    note: "Versatile and strong — often the base material beneath laminates or veneers.",
  },
  {
    name: "Laminate",
    lifespan: "10–15 years",
    usedIn: "Cabinetry, flooring, countertops",
    note: "Cost-effective with a wide range of finishes.",
  },
  {
    name: "MDF",
    lifespan: "10–20 years",
    usedIn: "Cabinetry, wall paneling, decorative pieces",
    note: "A smooth surface that takes paint and finishes beautifully.",
  },
  {
    name: "PVC Panels",
    lifespan: "20–25 years",
    usedIn: "Wall and ceiling coverings",
    note: "Lightweight, water-resistant, and termite-proof — ideal for bathrooms and kitchens.",
  },
  {
    name: "Gypsum Board",
    lifespan: "20–30 years",
    usedIn: "False ceilings, wall partitions",
    note: "Fire-resistant and easy to install when properly sealed.",
  },
  {
    name: "Upholstery Fabric",
    lifespan: "5–15 years",
    usedIn: "Sofas, chairs, soft furnishings",
    note: "Synthetic blends resist stains and wear better than natural fibers.",
  },
  {
    name: "Emulsion & Enamel Paint",
    lifespan: "5–10 years",
    usedIn: "Interior walls, ceilings, trims",
    note: "High-quality emulsion can last up to a decade; enamel suits trims and doors.",
  },
] as const;

export const trustBadges = [
  "People's Choice Award",
  "Leading & Most Promising Interior Design Firm — 2025",
  "Just Two Projects at a Time",
] as const;

// Homepage hero slideshow. `motion` picks the Ken Burns move applied while
// the slide is on screen — alternate them so consecutive slides feel varied.
export type SlideMotion = "zoom-in" | "zoom-out" | "pan-left" | "pan-right";

export const heroSlides: ReadonlyArray<{
  src: string;
  alt: string;
  label: string;
  motion: SlideMotion;
}> = [
  {
    src: "/images/hero/hero-living-room.jpg",
    alt: "Warm, marble-paneled living room with a crystal chandelier and symmetrical seating",
    label: "Living Room",
    motion: "zoom-in",
  },
  {
    src: "/images/showcase/living-sage-sofa.jpg",
    alt: "Living room with a sage boucle sofa, slatted feature wall and marble floor",
    label: "Living Room",
    motion: "pan-left",
  },
  {
    src: "/images/showcase/kitchen-green-walnut.jpg",
    alt: "Modular kitchen in deep green with walnut overhead cabinets",
    label: "Modular Kitchen",
    motion: "zoom-out",
  },
  {
    src: "/images/showcase/bedroom-textured-wall.jpg",
    alt: "Master bedroom with a textured accent wall and soft cove lighting",
    label: "Master Bedroom",
    motion: "pan-right",
  },
  {
    src: "/images/showcase/kitchen-arch-partition.jpg",
    alt: "Arched wooden partition with a backlit niche opening into the kitchen",
    label: "Entry & Kitchen",
    motion: "zoom-in",
  },
  {
    src: "/images/showcase/living-tv-wall.jpg",
    alt: "Living room TV wall with a floating walnut console",
    label: "TV Wall",
    motion: "pan-left",
  },
  {
    src: "/images/showcase/kids-bedroom-scallop.jpg",
    alt: "Kids' bedroom with a scalloped upholstered headboard and window seat",
    label: "Kids' Bedroom",
    motion: "zoom-out",
  },
  {
    src: "/images/showcase/foyer-console.jpg",
    alt: "Foyer console with abstract wall art and fresh flowers",
    label: "Foyer",
    motion: "pan-right",
  },
  {
    src: "/images/showcase/bedroom-warm-wood.jpg",
    alt: "Bedroom with warm wood wainscoting and a bedside lamp",
    label: "Guest Bedroom",
    motion: "zoom-in",
  },
  {
    src: "/images/showcase/study-window-seat.jpg",
    alt: "Study nook with a floating desk, wall shelf and window seat",
    label: "Study Nook",
    motion: "pan-left",
  },
];

// Before / after pairs for the homepage comparison slider.
// TODO: `before` should be a photo of the same room as handed over (bare
// shell), shot from the same angle as `after`. Until one is supplied the
// slider shows a desaturated placeholder of the finished room.
export const beforeAfter: ReadonlyArray<{
  id: string;
  room: string;
  caption: string;
  before?: string;
  after: string;
}> = [
  {
    id: "living",
    room: "Living Room",
    caption: "Bare walls and a marble floor, turned into a soft, layered family lounge.",
    after: "/images/showcase/living-sage-sofa.jpg",
  },
  {
    id: "bedroom",
    room: "Bedroom",
    caption: "An empty room given warm wood paneling, cove lighting and a calm palette.",
    after: "/images/showcase/bedroom-warm-wood.jpg",
  },
  {
    id: "kitchen",
    room: "Kitchen",
    caption: "A plain utility space rebuilt as a deep-green modular kitchen with walnut storage.",
    after: "/images/showcase/kitchen-green-walnut.jpg",
  },
];
