import { Project } from "../data/projects";
import ProjectCard from "./ProjectCard";
import "./ProjectGrid.css";

interface ProjectGridProps {
  projects: Project[];
}

export default function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return <p className="project-grid__empty">No projects in this category yet.</p>;
  }

  return (
    <div className="project-grid">
      {projects.map((project, i) => (
        <ProjectCard key={project.id} project={project} size={i % 5 === 0 ? "large" : "regular"} />
      ))}
    </div>
  );
}
