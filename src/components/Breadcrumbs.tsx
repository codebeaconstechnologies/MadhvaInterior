import { Link } from "react-router-dom";
import type { Crumb } from "../lib/seo";
import "./Breadcrumbs.css";

/** Visible breadcrumb trail; pass the same crumbs to <Seo breadcrumbs> for the structured data. */
export default function Breadcrumbs({ trail, onDark = false }: { trail: Crumb[]; onDark?: boolean }) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return (
    <nav aria-label="Breadcrumb" className={`breadcrumbs${onDark ? " breadcrumbs--on-dark" : ""}`}>
      <ol>
        {items.map((crumb, i) => (
          <li key={crumb.path}>
            {i < items.length - 1 ? <Link to={crumb.path}>{crumb.name}</Link> : <span aria-current="page">{crumb.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
