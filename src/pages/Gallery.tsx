import { useMemo, useState } from "react";
import Seo from "../components/Seo";
import ProjectFilter from "../components/ProjectFilter";
import ProjectGrid from "../components/ProjectGrid";
import Reveal from "../components/Reveal";
import { Category, projects } from "../data/projects";
import "./Gallery.css";

export default function Gallery() {
  const [active, setActive] = useState<Category>("All");

  const filtered = useMemo(() => {
    if (active === "All") return projects;
    if (active === "Residential") return projects.filter((p) => p.category === "Residential");
    return projects.filter((p) => p.category === active);
  }, [active]);

  return (
    <>
      <Seo
        title="Interior Design Portfolio — Homes in Pune"
        description="Browse Madhva Interiors' portfolio of residential interior projects across Luxury, Minimalist, Modern, Scandinavian, Traditional, and Rustic design styles."
        path="/gallery"
      />

      <section className="gallery-intro section--tight section--surface">
        <div className="container">
          <Reveal>
            <span className="eyebrow">Portfolio</span>
            <h1 className="gallery-intro__title">Our Gallery</h1>
            <p className="lede">
              Real client residences and the design styles we work across most — from
              opulent Luxury interiors to warm, handcrafted Rustic spaces.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section--tight section--surface gallery-list">
        <div className="container">
          <Reveal className="gallery-list__filter">
            <ProjectFilter active={active} onChange={setActive} />
          </Reveal>
          <div className="gallery-list__grid">
            <ProjectGrid projects={filtered} />
          </div>
        </div>
      </section>
    </>
  );
}
