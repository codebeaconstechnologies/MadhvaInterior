/* Area pages (/locations/<slug>). Only areas with a real connection to
   the studio get a page: Charholi (the studio itself) and Pimpri-Chinchwad
   (the studio's municipal area, and our Punawale project). Add an area
   only when there is genuine local work or presence to describe — thin
   look-alike pages for every suburb can hurt search rankings. */

import type { ServiceImage } from "./services";

export interface LocationPage {
  slug: string;
  /** Area name used in breadcrumbs and links. */
  area: string;
  h1: string;
  seoTitle: string;
  description: string;
  intro: string[];
  image: ServiceImage;
  sections: { heading: string; body: string[]; points?: string[] }[];
  /** Nearby localities mentioned on the page (plain text, not separate pages). */
  nearby: string[];
  faqs: { question: string; answer: string }[];
  projects: string[];
  whatsappText: string;
}

export const locations: LocationPage[] = [
  {
    slug: "interior-designer-charholi",
    area: "Charholi Budruk",
    h1: "Interior Designer in Charholi Budruk, Pune",
    seoTitle: "Interior Designer in Charholi Budruk, Pune",
    description:
      "Madhva Interiors is an interior design studio on the Pune–Alandi Road at Wadmukhwadi, Charholi Budruk. Visit us to plan your new home's interiors in 3D.",
    intro: [
      "Our studio is right here in Charholi Budruk — Shop No. 233, Shri Ganesh Galaxy, on the Pune–Alandi Road at Wadmukhwadi. If you have just taken possession of a flat in Charholi or nearby, you can drop in, sit down with the designer, and talk through your home in person.",
      "Charholi has grown quickly into one of north-east Pune's busiest residential areas, and many of the homes here are new flats waiting for their first interiors. That is exactly the work we do most.",
    ],
    image: { src: "/images/hero/02_living-room.jpg", alt: "Living room interior designed by Madhva Interiors, Pune" },
    sections: [
      {
        heading: "Interiors for new flats in Charholi",
        body: [
          "Newly handed-over flats need a little groundwork before the interiors go in: checking for seepage or hollow tiles, confirming your society's rules for interior work, and planning electrical points before the false ceiling closes them off. Being local, we can visit your site easily at each stage.",
        ],
        points: [
          "Complete home interiors for 1, 2 and 3 BHK flats",
          "Modular kitchens planned around the builder's platform",
          "Built-in wardrobes with loft storage",
          "False ceilings, cove lighting and TV units",
          "3D visualization before work begins",
        ],
      },
      {
        heading: "Visit the studio",
        body: [
          "Seeing a design on screen is one thing; talking it through face to face is better. Call or WhatsApp before you come so the designer is free to spend time with you.",
        ],
      },
    ],
    nearby: ["Wadmukhwadi", "Dighi", "Moshi", "Alandi", "Lohegaon", "Dhanori", "Vishrantwadi"],
    faqs: [
      {
        question: "Where exactly is the Madhva Interiors studio?",
        answer:
          "Shop No. 233, Shri Ganesh Galaxy, Pune–Alandi Road, Wadmukhwadi, Charholi Budruk, Pune, Maharashtra 412105. Use the Get Directions button for Google Maps.",
      },
      {
        question: "Do you work in areas near Charholi, like Dighi, Moshi, Lohegaon or Dhanori?",
        answer:
          "Our studio is a short drive from these areas, and we work with homeowners across Pune and Pimpri-Chinchwad. Tell us your location when you get in touch and we'll confirm.",
      },
      {
        question: "Should I book before visiting?",
        answer:
          "We recommend calling or sending a WhatsApp message first so the designer can set aside time for you.",
      },
    ],
    projects: ["smruti-garden-residence", "walnut-residence", "family-residence"],
    whatsappText: "Hello Madhva Interiors! I live near Charholi and would like to discuss interiors for my home.",
  },
  {
    slug: "interior-designer-pcmc",
    area: "Pimpri-Chinchwad",
    h1: "Interior Designer in Pimpri-Chinchwad (PCMC)",
    seoTitle: "Interior Designer in Pimpri-Chinchwad (PCMC), Pune",
    description:
      "Interior designer in PCMC — Madhva Interiors designs complete homes, 2 BHK and 3 BHK flats and modular kitchens across Pimpri-Chinchwad, including our Smruti Garden project in Punawale.",
    intro: [
      "Madhva Interiors is based in Charholi Budruk, within Pimpri-Chinchwad, and we design homes across PCMC — from new flats near our studio to our completed Smruti Garden Residence in Punawale.",
      "Much of PCMC's newer housing is 2 and 3 BHK flats in large societies, handed over with basic fittings and a kitchen platform. Our work is turning those into finished, personal homes.",
    ],
    image: { src: "/images/gallery/smruti-garden/smruti-garden_living-2.jpg", alt: "Living room of the Smruti Garden Residence, Punawale, PCMC" },
    sections: [
      {
        heading: "Our work in PCMC: Smruti Garden Residence, Punawale",
        body: [
          "For Mr. Bhikaji and Mrs. Namrata's 2 BHK at Smruti Garden in Punawale, we designed the complete home — living room, kitchen, both bedrooms and the washroom — with a custom TV unit, wardrobe joinery, warm cove lighting and a kitchen with an island-style counter.",
        ],
      },
      {
        heading: "What we design for PCMC homes",
        body: [
          "The best time to plan is soon after possession: before furniture arrives, before the false ceiling goes up, and before electrical points are fixed.",
        ],
        points: [
          "Complete home interior design",
          "2 BHK and 3 BHK interiors",
          "Modular kitchens and wardrobes",
          "False ceiling and lighting",
          "Renovation of lived-in homes",
        ],
      },
    ],
    nearby: ["Punawale", "Moshi", "Charholi", "Dighi"],
    faqs: [
      {
        question: "Do you take projects across Pimpri-Chinchwad?",
        answer:
          "Yes. Our studio is in Charholi Budruk, within PCMC, and we have completed homes elsewhere in PCMC, such as the Smruti Garden Residence in Punawale. Share your location and we'll confirm.",
      },
      {
        question: "Can I see a completed project in PCMC?",
        answer:
          "You can see photos of the Smruti Garden Residence in Punawale in our gallery, and we're happy to talk you through it at the studio.",
      },
      {
        question: "How do we start?",
        answer:
          "Call, WhatsApp or send an enquiry with your flat's location and configuration. We'll set up a conversation to understand what you need.",
      },
    ],
    projects: ["smruti-garden-residence", "walnut-residence"],
    whatsappText: "Hello Madhva Interiors! I'm in Pimpri-Chinchwad and would like to discuss interiors for my home.",
  },
];

export const getLocationBySlug = (slug: string) => locations.find((l) => l.slug === slug);
