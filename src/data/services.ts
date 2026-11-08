/* Service landing pages (/services/<slug>). Each one targets a search
   Pune homeowners actually make, so keep the copy specific and honest:
   nothing here promises prices, timelines or capabilities the studio
   hasn't confirmed. Photos are existing project photos. */

export interface ServiceImage {
  src: string;
  alt: string;
}

export interface ServiceSection {
  heading: string;
  body: string[];
  points?: string[];
}

export interface Service {
  slug: string;
  /** Short name for cards, menus and breadcrumbs. */
  name: string;
  h1: string;
  seoTitle: string;
  /** Meta description, ~150 characters. */
  description: string;
  /** One-line summary for service cards. */
  summary: string;
  intro: string[];
  image: ServiceImage;
  gallery: ServiceImage[];
  sections: ServiceSection[];
  includes: string[];
  benefits: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  /** Project slugs (src/data/projects.ts) shown as related work. */
  projects: string[];
  /** Other service slugs to link to. */
  related: string[];
  /** Pre-filled WhatsApp message. */
  whatsappText: string;
  /** Show the before/after slider (handed-over flat → finished home). */
  beforeAfter?: boolean;
}

export const services: Service[] = [
  {
    slug: "home-interior-design-pune",
    name: "Home Interior Design",
    h1: "Home Interior Design in Pune",
    seoTitle: "Home Interior Designers in Pune",
    description:
      "Complete home interior design in Pune by Madhva Interiors — space planning, 3D visualization, modular kitchens, wardrobes, false ceilings and lighting, managed end to end.",
    summary: "Complete interiors for your home, planned in 3D and delivered room by room.",
    intro: [
      "A home is the one project most families do only once or twice, and it has to work every day for years. Our home interior design service takes a flat or house from bare walls to a finished, furnished home — planning, design, materials and execution handled by one studio, so you are not coordinating carpenters, electricians and painters yourself.",
      "We are a Pune studio on the Pune–Alandi Road at Charholi Budruk, and we deliberately work on only two projects at a time. That keeps the founder and the design team on your site, not stretched across a dozen.",
    ],
    image: { src: "/images/hero/01_living-room.jpg", alt: "Finished living room with layered lighting designed by Madhva Interiors" },
    gallery: [
      { src: "/images/gallery/smruti-garden/smruti-garden_living-2.jpg", alt: "Living room of the Smruti Garden Residence, Punawale" },
      { src: "/images/gallery/walnut-residence/walnut-residence_living.jpg", alt: "Walnut-toned living room with bouclé seating" },
      { src: "/images/gallery/family-residence/family-residence_master-bedroom.jpg", alt: "Master bedroom in walnut and charcoal tones" },
      { src: "/images/hero/08_foyer.jpg", alt: "Entrance foyer with storage and feature wall" },
    ],
    sections: [
      {
        heading: "How we design a complete home",
        body: [
          "Every home starts with a conversation about how you live: who cooks, who works from home, how much storage you really need, what you want guests to see first. From that we plan each room's layout, then build the design in 3D so you can walk through it and change things before a single sheet of plywood is cut.",
          "Once the design is final we take you through materials — carcass board, laminates or veneers, hardware, ceiling and lighting — and explain where it is worth spending and where a simpler option performs just as well.",
        ],
      },
      {
        heading: "Planning for Pune homes",
        body: [
          "Most of our clients are moving into newly handed-over flats. That brings its own checklist: fixing seepage or tile issues before carpentry goes in, working within your housing society's rules for work hours and material movement, and planning electrical points before the false ceiling closes them off.",
          "Pune's monsoon is the other constant. Kitchens, utility areas and bathroom vanities need moisture-resistant board and proper edge sealing, and we plan ventilation and exhaust from the start rather than as an afterthought.",
        ],
      },
    ],
    includes: [
      "Space planning and furniture layouts for every room",
      "3D visualization of the design before work begins",
      "Modular kitchen and wardrobes",
      "TV units, storage and custom furniture",
      "False ceiling, cove and accent lighting",
      "Wooden flooring and wall finishes where required",
      "Material selection guidance",
      "Site execution and supervision through to handover",
    ],
    benefits: [
      { title: "See it before it's built", text: "3D visualization lets you review and refine every room before execution begins." },
      { title: "One studio, one point of contact", text: "Design and execution sit with the same team, so nothing falls between contractors." },
      { title: "Two projects at a time", text: "We limit how many homes we take on so each one gets proper attention." },
      { title: "Built to last", text: "Materials are chosen for how they age, and our work carries a 5+ year material warranty." },
    ],
    faqs: [
      {
        question: "How much does complete home interior design cost in Pune?",
        answer:
          "It depends on the size of the home, which rooms are included, and the materials and finishes you choose — a kitchen in laminate costs very differently from one in acrylic or veneer, for example. We give you an itemised quote once we understand your scope, so you can see exactly where the budget goes and adjust it.",
      },
      {
        question: "Do you handle execution, or only design?",
        answer:
          "Both. We design the home and then manage the build — false ceilings, flooring, furniture, kitchen, wardrobes and lighting — through to a final walkthrough.",
      },
      {
        question: "Can I see the design before work starts?",
        answer:
          "Yes. Every project is planned and rendered in 3D first, so you can see the layout, colours and finishes and ask for changes before anything is built.",
      },
      {
        question: "Do you work outside Pune city?",
        answer:
          "Our studio is at Charholi Budruk on the Pune–Alandi Road, and we work across Pune and Pimpri-Chinchwad. Get in touch with your location and we'll confirm.",
      },
    ],
    projects: ["smruti-garden-residence", "walnut-residence", "family-residence"],
    related: ["2bhk-interior-design-pune", "3bhk-interior-design-pune", "modular-kitchen-design-pune", "turnkey-interior-design-pune"],
    whatsappText: "Hello Madhva Interiors! I'm looking for complete home interior design in Pune. Could we discuss my home?",
    beforeAfter: true,
  },
  {
    slug: "2bhk-interior-design-pune",
    name: "2 BHK Interior Design",
    h1: "2 BHK Interior Design in Pune",
    seoTitle: "2 BHK Interior Design in Pune",
    description:
      "2 BHK interior design in Pune that makes every square foot count — kitchen, wardrobes, TV unit, storage and lighting, planned in 3D. See our Smruti Garden 2 BHK in Punawale.",
    summary: "Space-smart 2 BHK interiors with storage planned into every wall.",
    intro: [
      "Most of the homes we design are 2 BHK flats, and most of them are newly handed over. In a 2 BHK the challenge is always the same: fit a family's storage, a working kitchen, a comfortable living room and two calm bedrooms into a compact carpet area — without the home feeling crowded.",
      "Our 2 BHK interiors are planned wall by wall in 3D, so you can see exactly where storage goes and how much floor space you keep before work begins.",
    ],
    image: { src: "/images/gallery/smruti-garden/smruti-garden_living-2.jpg", alt: "2 BHK living room at the Smruti Garden Residence in Punawale, Pune" },
    gallery: [
      { src: "/images/gallery/smruti-garden/smruti-garden_kitchen.jpg", alt: "2 BHK kitchen with island-style counter, Smruti Garden Residence" },
      { src: "/images/gallery/smruti-garden/smruti-garden_bedroom.jpg", alt: "2 BHK bedroom with wardrobe joinery, Smruti Garden Residence" },
      { src: "/images/gallery/smruti-garden/smruti-garden_bedroom-2.jpg", alt: "Second bedroom of a 2 BHK in Punawale" },
      { src: "/images/gallery/smruti-garden/smruti-garden_washroom.jpg", alt: "Washroom finish in the Smruti Garden 2 BHK" },
    ],
    sections: [
      {
        heading: "Making a 2 BHK feel bigger",
        body: [
          "Space in a 2 BHK is won with planning, not with fewer things. We use full-height wardrobes instead of half-height ones, build storage into the TV wall and the entrance, and keep walkways clear so rooms read as open.",
          "Light does the rest: cove and ambient lighting in the false ceiling, lighter shutter colours in smaller bedrooms, and mirrors or glass where they genuinely open up a corner.",
        ],
        points: [
          "Full-height wardrobes with loft storage",
          "TV unit with closed storage, not just open shelves",
          "Shoe and utility storage at the entrance",
          "A study or work-from-home corner where the layout allows",
          "Kitchen storage planned around your cooking and appliances",
        ],
      },
      {
        heading: "Our 2 BHK work: Smruti Garden Residence, Punawale",
        body: [
          "For Mr. Bhikaji and Mrs. Namrata's 2 BHK at Smruti Garden in Punawale, we designed the full home — living room, kitchen, both bedrooms and the washroom — around a warm, modern brief. The project includes a custom TV unit and wardrobe joinery, warm ambient and cove lighting throughout, and a kitchen planned with an island-style counter.",
        ],
      },
    ],
    includes: [
      "Layout planning for the living room, kitchen and both bedrooms",
      "3D visualization of every room",
      "Modular kitchen",
      "Wardrobes for both bedrooms",
      "TV unit and living-room storage",
      "False ceiling and lighting",
      "Entrance, shoe and utility storage",
      "Execution and supervision through to handover",
    ],
    benefits: [
      { title: "Storage without clutter", text: "Built-in storage is planned into walls so floors and walkways stay clear." },
      { title: "Designed in 3D", text: "See how much space each room keeps before anything is built." },
      { title: "Proven in 2 BHK homes", text: "Most of our completed homes, and our client stories, are 2 BHK flats." },
      { title: "Personal attention", text: "We take on just two projects at a time." },
    ],
    faqs: [
      {
        question: "What does 2 BHK interior design usually include?",
        answer:
          "Typically a modular kitchen, wardrobes in both bedrooms, a TV unit, false ceiling and lighting, and storage for the entrance and utility area. Some clients add a study corner, wall panelling or loose furniture. We help you decide what to include and what can wait.",
      },
      {
        question: "How much does 2 BHK interior design cost in Pune?",
        answer:
          "The cost depends mainly on scope (which rooms and items are included) and materials (board grade, shutter finish and hardware). We share an itemised quote after understanding your requirements, so you can compare options line by line.",
      },
      {
        question: "Can you work on a 2 BHK we have just taken possession of?",
        answer:
          "Yes — most of our 2 BHK projects are newly handed-over flats. Starting early lets us plan electrical points and the false ceiling before anything is closed up.",
      },
    ],
    projects: ["smruti-garden-residence", "walnut-residence"],
    related: ["3bhk-interior-design-pune", "modular-kitchen-design-pune", "wardrobe-design-pune", "home-interior-design-pune"],
    whatsappText: "Hello Madhva Interiors! I'd like to discuss interior design for my 2 BHK in Pune.",
    beforeAfter: true,
  },
  {
    slug: "3bhk-interior-design-pune",
    name: "3 BHK Interior Design",
    h1: "3 BHK Interior Design in Pune",
    seoTitle: "3 BHK Interior Design in Pune",
    description:
      "3 BHK interior design in Pune for growing families — each bedroom designed for the person who uses it, with planned storage, a working kitchen and a cohesive look throughout.",
    summary: "Family homes where every bedroom has its own character, and the whole home still feels as one.",
    intro: [
      "A 3 BHK gives a family room to grow — and more decisions to make. The third bedroom might be a kids' room today and a study tomorrow; the master bedroom needs proper wardrobe space; the living and dining areas have to host guests and still feel like home.",
      "We design 3 BHK homes room by room for the people who use them, while keeping one consistent material and colour story so the home feels cohesive rather than like three separate projects.",
    ],
    image: { src: "/images/gallery/family-residence/family-residence_master-bedroom.jpg", alt: "Master bedroom in walnut and charcoal tones designed by Madhva Interiors" },
    gallery: [
      { src: "/images/gallery/family-residence/family-residence_kids-room.jpg", alt: "Kids' room with a custom study nook and wall-mounted storage" },
      { src: "/images/gallery/family-residence/family-residence_guest-room.jpg", alt: "Guest bedroom with a scalloped upholstered headboard" },
      { src: "/images/gallery/family-residence/family-residence_wardrobe.jpg", alt: "Custom bedroom wardrobe in a family home" },
      { src: "/images/hero/10_study-nook.jpg", alt: "Study nook built into a bedroom" },
    ],
    sections: [
      {
        heading: "Designing each room for the person who uses it",
        body: [
          "In a family home, the brief changes from room to room. A kids' room needs a study surface, durable finishes and storage they can reach; a master bedroom can be moodier and more tailored; a guest room has to be comfortable without taking over the storage the family needs.",
          "We plan the rooms together so the home still flows: the same family of materials, related colours, and lighting that feels consistent as you walk through.",
        ],
        points: [
          "Kids' rooms with study nooks and storage that grows with them",
          "Master bedroom wardrobes planned around both partners' needs",
          "A flexible third bedroom — guest room, study or both",
          "Living and dining areas designed for hosting",
          "A kitchen sized to a larger household's storage",
        ],
      },
      {
        heading: "Our multi-bedroom work: Family Residence",
        body: [
          "Our Family Residence project shows this approach: a playful kids' study nook with wall-mounted storage, a master bedroom in walnut and charcoal, a soft guest room with a scalloped upholstered headboard, and a hand-textured plaster feature wall — each room distinct, all of them clearly one home.",
        ],
      },
    ],
    includes: [
      "Room-by-room layout planning",
      "3D visualization of every room",
      "Modular kitchen",
      "Wardrobes for all bedrooms",
      "Kids' room and study furniture",
      "Living, dining and TV unit design",
      "False ceiling and lighting",
      "Execution and supervision through to handover",
    ],
    benefits: [
      { title: "Room-by-room design", text: "Each bedroom is designed for the person who uses it." },
      { title: "A cohesive home", text: "One material and colour story ties every room together." },
      { title: "Plan once, phase if needed", text: "We can design the whole home and execute in stages to suit your budget." },
      { title: "Built to last", text: "Durable materials for busy family homes, backed by our 5+ year material warranty." },
    ],
    faqs: [
      {
        question: "How much does 3 BHK interior design cost in Pune?",
        answer:
          "A 3 BHK cost depends on which rooms and items are in scope and the materials chosen for each. Because a 3 BHK has more wardrobes and furniture, material choices make a bigger difference to the total. We provide an itemised quote so you can see and adjust each part.",
      },
      {
        question: "Can we do the interiors in phases?",
        answer:
          "Yes. Many families complete the kitchen, wardrobes and essential storage first and add items like loose furniture or wall panelling later. Designing the whole home up front keeps later phases consistent with the first.",
      },
      {
        question: "Can the third bedroom work as both a study and a guest room?",
        answer:
          "Often, yes. A wall-mounted desk, a sofa-cum-bed or a well-planned storage bed can let one room serve both purposes. We'll plan it around how often you actually have guests.",
      },
    ],
    projects: ["family-residence", "walnut-residence", "smruti-garden-residence"],
    related: ["2bhk-interior-design-pune", "wardrobe-design-pune", "modular-kitchen-design-pune", "turnkey-interior-design-pune"],
    whatsappText: "Hello Madhva Interiors! I'd like to discuss interior design for my 3 BHK in Pune.",
  },
  {
    slug: "modular-kitchen-design-pune",
    name: "Modular Kitchen Design",
    h1: "Modular Kitchen Design in Pune",
    seoTitle: "Modular Kitchen Design in Pune",
    description:
      "Modular kitchen design in Pune — layouts planned around how you cook, moisture-resistant materials, practical storage and hardware, visualized in 3D before we build.",
    summary: "Kitchens planned around how you cook, built from materials that handle Pune's humidity.",
    intro: [
      "The kitchen is the hardest-working room in an Indian home. It has to handle daily cooking, heat, water and steam, store far more than it looks like it can, and still be pleasant to stand in for an hour every morning.",
      "We design modular kitchens around how your family actually cooks — what you keep within arm's reach, which appliances need a home, and where the chimney, sink and gas connection sit — then show you the result in 3D before anything is manufactured.",
    ],
    image: { src: "/images/hero/03_modular-kitchen.jpg", alt: "Modular kitchen designed by Madhva Interiors" },
    gallery: [
      { src: "/images/gallery/walnut-residence/walnut-residence_kitchen.jpg", alt: "Matte green modular kitchen with walnut wall cabinetry" },
      { src: "/images/gallery/smruti-garden/smruti-garden_kitchen.jpg", alt: "Kitchen with island-style counter at the Smruti Garden Residence" },
      { src: "/images/gallery/smruti-garden/smruti-garden_kitchen-2.jpg", alt: "Kitchen storage in a Punawale 2 BHK" },
      { src: "/images/hero/05_entry-and-kitchen.jpg", alt: "Open kitchen seen from the entrance" },
    ],
    sections: [
      {
        heading: "Layout first",
        body: [
          "Most Pune flats come with an L-shaped or parallel kitchen platform, often with a granite top and sink already in place. We work with that layout — or advise when changing it is worth the cost — and plan the working triangle between hob, sink and refrigerator so you are not crossing the kitchen for every task.",
        ],
        points: [
          "L-shaped, parallel, U-shaped and straight layouts",
          "Tall units for appliances and pantry storage",
          "Drawers instead of shelves where you need to reach the back",
          "Corner solutions so blind corners don't become dead space",
          "A planned spot for the chimney duct, water purifier and microwave",
        ],
      },
      {
        heading: "Materials that handle moisture",
        body: [
          "Under the sink and around the hob, ordinary board swells and delaminates within a few monsoons. We specify moisture-resistant carcass material for wet zones, sealed edges, and shutter finishes chosen for how easily they clean — and explain the trade-offs between laminate, acrylic and other finishes so you can pick what suits your budget and cooking style.",
          "Hardware matters as much as the board: soft-close hinges and drawer channels take the daily wear, so we help you choose hardware you won't have to replace.",
        ],
      },
      {
        heading: "Practical details we plan for",
        body: [
          "Piped gas lines and meters, existing plumbing points, electrical sockets for every appliance, under-cabinet lighting so the counter isn't in your own shadow, and enough ventilation for steam and smoke. These are cheap to plan early and expensive to fix later.",
        ],
      },
    ],
    includes: [
      "Kitchen layout planning and 3D visualization",
      "Base, wall and tall units",
      "Shutter finish and colour selection",
      "Hardware selection: hinges, channels and accessories",
      "Planning for chimney, hob, sink and appliances",
      "Electrical and lighting points for the kitchen",
      "Installation and finishing",
    ],
    benefits: [
      { title: "Planned around your cooking", text: "Storage goes where you reach for it, not where it fits a catalogue." },
      { title: "Moisture-aware", text: "Wet zones get materials and sealing that survive Pune's monsoon." },
      { title: "See it in 3D", text: "Review the layout, colours and finishes before manufacturing." },
      { title: "Fits with the whole home", text: "Your kitchen is designed alongside the rest of your interiors." },
    ],
    faqs: [
      {
        question: "How much does a modular kitchen cost in Pune?",
        answer:
          "Modular kitchen cost depends on the size and layout, the carcass material, the shutter finish (laminate, acrylic and others vary widely), the hardware and accessories, and whether appliances are included. We give an itemised quote so you can compare finishes and hardware options side by side.",
      },
      {
        question: "Can you keep the granite platform the builder provided?",
        answer:
          "Usually, yes. If the platform is in good condition we design the cabinets around it. If you want a different countertop or layout, we'll explain what changes and what it involves.",
      },
      {
        question: "Which material is best for the area under the sink?",
        answer:
          "The sink cabinet is the wettest part of the kitchen, so it needs moisture-resistant board with sealed edges. We'll recommend the right option for your budget during material selection.",
      },
      {
        question: "Do you design only the kitchen, or the whole home?",
        answer:
          "Both. You can come to us for a kitchen alone, or as part of complete home interiors.",
      },
    ],
    projects: ["walnut-residence", "smruti-garden-residence"],
    related: ["wardrobe-design-pune", "2bhk-interior-design-pune", "home-renovation-pune", "home-interior-design-pune"],
    whatsappText: "Hello Madhva Interiors! I'm planning a modular kitchen in Pune and would like to discuss the design.",
  },
  {
    slug: "wardrobe-design-pune",
    name: "Wardrobe Design",
    h1: "Custom Wardrobe Design in Pune",
    seoTitle: "Custom Wardrobe Design in Pune",
    description:
      "Custom and built-in wardrobe design in Pune — sliding or hinged, full height with lofts, interiors planned around what you store. Designed in 3D by Madhva Interiors.",
    summary: "Built-in wardrobes planned around what you actually store.",
    intro: [
      "A good wardrobe is planned from the inside out. Before we choose a shutter finish we ask what goes in it: long dresses or sarees, folded clothes, a growing child's things, suitcases, bedding, a locker. The answer decides the hanging height, the drawer count and where the shelves go.",
      "We design custom wardrobes as part of the room, not as a box against a wall — full height where it makes sense, with lofts for seasonal storage and finishes that match the rest of your interiors.",
    ],
    image: { src: "/images/gallery/family-residence/family-residence_wardrobe.jpg", alt: "Custom built-in wardrobe designed by Madhva Interiors" },
    gallery: [
      { src: "/images/gallery/family-residence/family-residence_wardrobe-2.jpg", alt: "Bedroom wardrobe with tailored shutters" },
      { src: "/images/studio/service-furniture.jpg", alt: "Custom furniture and wardrobe joinery" },
      { src: "/images/gallery/smruti-garden/smruti-garden_bedroom.jpg", alt: "Bedroom with wardrobe joinery, Smruti Garden Residence" },
      { src: "/images/hero/09_guest-bedroom.jpg", alt: "Guest bedroom with built-in storage" },
    ],
    sections: [
      {
        heading: "Sliding or hinged?",
        body: [
          "Sliding wardrobes save the swing space of a door, which helps in compact bedrooms where the bed sits close to the wardrobe. Hinged wardrobes let you open the full width at once and are simpler to maintain. We'll recommend one based on the room, not on fashion.",
        ],
      },
      {
        heading: "Inside the wardrobe",
        body: [
          "The internal layout is where a wardrobe earns its keep. We plan hanging, shelves and drawers to match your clothes and habits, and keep the most-used things between shoulder and knee height.",
        ],
        points: [
          "Long and short hanging sections",
          "Drawers for folded clothes and accessories",
          "Lofts for suitcases and seasonal bedding",
          "A locker or concealed compartment if needed",
          "Mirror shutters or a dresser section",
          "Internal lighting where it helps",
        ],
      },
      {
        heading: "Materials and finishes",
        body: [
          "Wardrobes are usually built on a plywood or engineered-board carcass, finished in laminate, veneer, acrylic or painted shutters. We'll walk you through how each looks, cleans and ages, so the finish suits both the room and your budget.",
        ],
      },
    ],
    includes: [
      "Wardrobe layout and internal planning",
      "3D visualization in the context of the room",
      "Carcass, shutter and finish selection",
      "Hardware: hinges, sliding systems, channels and handles",
      "Lofts and overhead storage",
      "Installation and finishing",
    ],
    benefits: [
      { title: "Planned from the inside", text: "Hanging, drawers and shelves are set to what you actually store." },
      { title: "Part of the room", text: "Wardrobes match the rest of your interiors, not a catalogue." },
      { title: "Full-height storage", text: "Lofts and full-height units make the most of every wall." },
      { title: "Built to last", text: "Durable materials and hardware, backed by our 5+ year material warranty." },
    ],
    faqs: [
      {
        question: "Are sliding wardrobes better than hinged wardrobes?",
        answer:
          "Neither is better everywhere. Sliding wardrobes suit rooms where there's little space in front of the wardrobe; hinged wardrobes open fully and are simpler to maintain. We recommend one based on your room.",
      },
      {
        question: "Can you design wardrobes only, without full home interiors?",
        answer: "Yes. We take on wardrobes on their own as well as part of complete home interiors.",
      },
      {
        question: "How is the price of a wardrobe worked out?",
        answer:
          "It depends on the size, the carcass material, the shutter finish, the internal fittings and the hardware. We provide an itemised quote so you can see the effect of each choice.",
      },
    ],
    projects: ["family-residence", "smruti-garden-residence"],
    related: ["modular-kitchen-design-pune", "3bhk-interior-design-pune", "2bhk-interior-design-pune", "home-interior-design-pune"],
    whatsappText: "Hello Madhva Interiors! I'm looking for custom wardrobe design in Pune.",
  },
  {
    slug: "home-renovation-pune",
    name: "Home Renovation",
    h1: "Home Interior Renovation in Pune",
    seoTitle: "Home Interior Renovation in Pune",
    description:
      "Home interior renovation in Pune — a new kitchen, wardrobes, false ceiling, lighting or a complete makeover for a lived-in home, planned in 3D and managed by Madhva Interiors.",
    summary: "A fresh, modern home without moving out of the neighbourhood you love.",
    intro: [
      "Renovation is different from designing a new flat. You know exactly what doesn't work in your home — the kitchen that never had enough storage, the wardrobe doors that sag, the living room lit by a single tube light — and you often have to live around the work while it happens.",
      "We plan renovations to fix those specific problems first, show you the new design in 3D, and sequence the work so your household is disrupted as little as possible.",
    ],
    image: { src: "/images/hero/06_tv-wall.jpg", alt: "Renovated living room TV wall by Madhva Interiors" },
    gallery: [
      { src: "/images/hero/02_living-room.jpg", alt: "Refreshed living room with warm lighting" },
      { src: "/images/studio/service-lighting.jpg", alt: "Layered lighting and decor" },
      { src: "/images/studio/service-flooring.jpg", alt: "False ceiling and wooden flooring work" },
      { src: "/images/gallery/walnut-residence/walnut-residence_console.jpg", alt: "Sculptural console styled with art and objects" },
    ],
    sections: [
      {
        heading: "Start with what isn't working",
        body: [
          "A renovation brief usually begins with a list of frustrations. We walk through the home with you, note what to keep, what to repair and what to replace, and check the things you can't see — seepage, old wiring, weak plumbing joints — before planning new interiors on top of them.",
        ],
        points: [
          "Kitchen renovation: new layout, cabinets, shutters and hardware",
          "Wardrobe replacement or refacing",
          "New false ceiling and lighting",
          "Wooden flooring and wall finishes",
          "TV units, storage and custom furniture",
          "A complete makeover of one room or the whole home",
        ],
      },
      {
        heading: "Living through the work",
        body: [
          "If you are staying at home during the renovation, we plan the work in sequence — finishing one area before opening up the next where possible — and agree the working hours and dust control with you and your society in advance.",
        ],
      },
    ],
    includes: [
      "Site assessment of the existing interiors",
      "Design and 3D visualization of the renovated spaces",
      "Removal of old fittings where needed",
      "New kitchen, wardrobes, ceilings, lighting and finishes",
      "Execution and supervision through to handover",
    ],
    benefits: [
      { title: "Problems fixed first", text: "We address seepage, wiring and storage issues before the finishes go on." },
      { title: "See the new home first", text: "3D visualization shows the result before work begins." },
      { title: "Less disruption", text: "Work is sequenced around your household where possible." },
      { title: "One accountable team", text: "Design and execution are handled by the same studio." },
    ],
    faqs: [
      {
        question: "Can we live at home during the renovation?",
        answer:
          "Often, yes, especially if the work is done room by room. Some jobs — like a full kitchen replacement — make a room unusable for a while, so we'll tell you up front what to expect.",
      },
      {
        question: "Can you renovate just one room?",
        answer: "Yes. Many renovations are a single kitchen, bedroom or living room.",
      },
      {
        question: "What affects the cost of a renovation?",
        answer:
          "The scope, the materials, and the condition of what's already there — removing old fittings or fixing hidden issues like seepage adds work. We assess the site first and give you an itemised quote.",
      },
    ],
    projects: ["walnut-residence", "family-residence"],
    related: ["modular-kitchen-design-pune", "wardrobe-design-pune", "home-interior-design-pune", "turnkey-interior-design-pune"],
    whatsappText: "Hello Madhva Interiors! I'm planning to renovate my home in Pune and would like to discuss it.",
  },
  {
    slug: "turnkey-interior-design-pune",
    name: "Turnkey Interiors",
    h1: "Turnkey Interior Design in Pune",
    seoTitle: "Turnkey Interior Design in Pune",
    description:
      "Turnkey interior design in Pune — one studio from concept and 3D design through materials, execution and final handover. Madhva Interiors manages the whole project.",
    summary: "From first sketch to final walkthrough, managed by one studio.",
    intro: [
      "Turnkey interiors means you deal with one team from the first conversation to the day you get the keys back. We design the space, help you choose materials, manage the people who build it, and hand over a finished home — so you are not chasing carpenters, electricians, painters and suppliers yourself.",
      "It suits busy professionals, families relocating to Pune, and anyone who would rather approve decisions than coordinate trades.",
    ],
    image: { src: "/images/hero/05_entry-and-kitchen.jpg", alt: "Finished entrance and kitchen delivered by Madhva Interiors" },
    gallery: [
      { src: "/images/gallery/walnut-residence/walnut-residence_entrance.jpg", alt: "Entrance of the Walnut Residence" },
      { src: "/images/gallery/walnut-residence/walnut-residence_tvunit.jpg", alt: "Floating walnut TV wall" },
      { src: "/images/hero/04_master-bedroom.jpg", alt: "Finished master bedroom" },
      { src: "/images/studio/service-space-planning.jpg", alt: "Space planning drawings" },
    ],
    sections: [
      {
        heading: "How a turnkey project runs",
        body: [
          "Our process has five stages, and you have one point of contact through all of them.",
        ],
        points: [
          "Discover — we understand how you live and what the space needs",
          "Concept & 3D visualization — you see and refine the design before anything is built",
          "Material selection — we guide you through materials and finishes for durability, budget and look",
          "Execution — our team manages the build: false ceilings, flooring, furniture and lighting",
          "Deliver — a final walkthrough, with a 5+ year material warranty on the work we deliver",
        ],
      },
      {
        heading: "Why fewer projects means better results",
        body: [
          "Turnkey work only goes well when someone is genuinely watching the site. We take on just two projects at a time, so decisions get made quickly, problems are caught early, and the finished home matches the design you approved.",
        ],
      },
    ],
    includes: [
      "Design, layouts and 3D visualization",
      "Material and finish selection",
      "Modular kitchen, wardrobes and custom furniture",
      "False ceiling, flooring and lighting",
      "Coordination of all trades on site",
      "Supervision, quality checks and final walkthrough",
    ],
    benefits: [
      { title: "One point of contact", text: "No coordinating separate contractors — we manage the whole project." },
      { title: "Fewer surprises", text: "The design is fixed in 3D before execution, so the build matches it." },
      { title: "Close supervision", text: "Two projects at a time means someone is always watching yours." },
      { title: "Warranty", text: "Our work carries a 5+ year material warranty." },
    ],
    faqs: [
      {
        question: "What does turnkey interior design include?",
        answer:
          "Design, 3D visualization, material selection, and the management of execution through to handover — kitchen, wardrobes, furniture, false ceiling, flooring and lighting. We confirm the exact scope for your home in the quote.",
      },
      {
        question: "Do I need to be in Pune during the project?",
        answer:
          "It helps to visit at key stages, but turnkey projects are designed so that you approve decisions rather than manage the site. We keep you updated throughout.",
      },
      {
        question: "Is turnkey more expensive than hiring contractors separately?",
        answer:
          "Turnkey includes design and project management, which you would otherwise do yourself. In return you avoid coordination gaps, rework and delays between trades. We give an itemised quote so you can see what you are paying for.",
      },
    ],
    projects: ["walnut-residence", "smruti-garden-residence", "family-residence"],
    related: ["home-interior-design-pune", "3bhk-interior-design-pune", "2bhk-interior-design-pune", "home-renovation-pune"],
    whatsappText: "Hello Madhva Interiors! I'm interested in turnkey interior design for my home in Pune.",
  },
];

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);
