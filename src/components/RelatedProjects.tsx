import { projects } from "../data/projects";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";
import Button from "./Button";

/** A row of project cards picked by slug. */
export default function RelatedProjects({
  slugs,
  title = "Related projects",
  description,
}: {
  slugs: string[];
  title?: string;
  description?: string;
}) {
  const picked = slugs.map((slug) => projects.find((p) => p.slug === slug)).filter((p) => p !== undefined);
  if (picked.length === 0) return null;
  return (
    <section className="section--tight section--muted">
      <div className="container">
        <SectionHeading eyebrow="Our Work" title={title} description={description} />
        <div className="related-projects">
          {picked.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        <div className="related-projects__more">
          <Button to="/gallery" variant="outline">
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
}
