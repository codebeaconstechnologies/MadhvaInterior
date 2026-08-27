import { Link } from "react-router-dom";
import { Project } from "../data/projects";
import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
  size?: "large" | "regular";
}

export default function ProjectCard({ project, size = "regular" }: ProjectCardProps) {
  return (
    <Link to={`/gallery/${project.slug}`} className={`project-card project-card--${size}`}>
      <span className="project-card__frame">
        <img src={project.cover.src} alt={project.cover.alt} loading="lazy" decoding="async" />
      </span>
      <span className="project-card__meta">
        <span className="project-card__category">{project.category}</span>
        <span className="project-card__title">{project.title}</span>
        <span className="project-card__sub">
          {project.location} — {project.year}
        </span>
      </span>
    </Link>
  );
}
