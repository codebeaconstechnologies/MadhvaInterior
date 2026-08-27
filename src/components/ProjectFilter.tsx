import { Category, categories } from "../data/projects";
import "./ProjectFilter.css";

interface ProjectFilterProps {
  active: Category;
  onChange: (category: Category) => void;
}

export default function ProjectFilter({ active, onChange }: ProjectFilterProps) {
  return (
    <div className="project-filter" role="group" aria-label="Filter projects by style">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`project-filter__btn${active === category ? " is-active" : ""}`}
          aria-pressed={active === category}
          onClick={() => onChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
