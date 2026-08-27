export interface Testimonial {
  id: string;
  name: string;
  design: string;
  bhk: string;
  quote: string;
  photo: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "bhikaji-namrata",
    name: "Mr. Bhikaji & Mrs. Namrata",
    design: "Traditional Design",
    bhk: "2 BHK · Smruti Garden, Punawale",
    quote:
      "The quality of work, finishes & materials has been excellent. I never thought my home could look this incredible.",
    photo: "/images/testimonials/bhikaji-namrata.jpg",
  },
  {
    id: "ganesh-pawar",
    name: "Mr. Ganesh Pawar",
    design: "Rustic Design",
    bhk: "2.5 BHK",
    quote:
      "From creating the perfect layout to finding pieces I absolutely loved, my designer really took my space to the next level. I never dreamed my home could look — and feel — this good!",
    photo: "/images/testimonials/ganesh-pawar.jpg",
  },
  {
    id: "ganesh-gudge",
    name: "Mr. Ganesh Gudge",
    design: "Modern Design",
    bhk: "2 BHK",
    quote:
      "Madhva Interiors Team gave us very good suggestions while executing the designs for our new home. We are very happy with the result.",
    photo: "/images/testimonials/ganesh-gudge.jpg",
  },
  {
    id: "rushi-gayatri",
    name: "Mr. Rushi & Mrs. Gayatri",
    design: "Minimalist Design",
    bhk: "2 BHK",
    quote:
      "Excellent work from beginning to end — can work any angle from minimal help to complete project handling, professional without a doubt. Love it!",
    photo: "/images/testimonials/rushi-gayatri.jpg",
  },
  {
    id: "devendra",
    name: "Mr. Devendra",
    design: "Luxury Design",
    bhk: "2 BHK",
    quote:
      "Madhva Interiors was very helpful when it came to designing a minimal but spacious home for us. We are happy with the results.",
    photo: "/images/testimonials/devendra.jpg",
  },
];
