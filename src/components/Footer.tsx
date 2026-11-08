import { Link } from "react-router-dom";
import { studio } from "../data/studio";
import { services } from "../data/services";
import { locations } from "../data/locations";
import { responsive } from "../lib/images";
import Icon from "./Icon";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo" aria-label={`${studio.fullName} — home`}>
            <img {...responsive("/images/studio/logo-lockup-dark.png", "136px")} alt={studio.fullName} loading="lazy" />
          </Link>
          <div className="site-footer__brand-text">
            <p className="site-footer__tagline">Design with Dignity &amp; Values</p>
            <hr className="site-footer__rule" />
            <p className="site-footer__desc">
              Elegant, functional and timeless interiors for homes and workplaces across Pune.
            </p>
          </div>
        </div>

        <nav className="site-footer__col" aria-label="Footer navigation">
          <h2 className="site-footer__heading">Studio</h2>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/gallery">Projects</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/blog">Blog</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="site-footer__col">
          <h2 className="site-footer__heading">Get in Touch</h2>
          <ul className="site-footer__contact">
            <li>
              <a href={studio.phoneHref}>
                <Icon name="phone" className="site-footer__icon" />
                {studio.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${studio.email}`}>
                <Icon name="mail" className="site-footer__icon" />
                {studio.email}
              </a>
            </li>
            <li>
              <a href={studio.instagramUrl} target="_blank" rel="noopener noreferrer">
                <Icon name="instagram" className="site-footer__icon" />
                {studio.instagramHandle}
              </a>
            </li>
            <li>
              <span>
                <Icon name="clock" className="site-footer__icon" />
                {studio.hours}
              </span>
            </li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h2 className="site-footer__heading">Visit</h2>
          <address className="site-footer__contact">
            <Icon name="pin" className="site-footer__icon" />
            <span>
              {studio.address.line1}
              <br />
              {studio.address.line2}
              <br />
              {studio.address.line3}
            </span>
          </address>
        </div>
      </div>

      <div className="container site-footer__links">
        <nav aria-label="Services">
          <h2 className="site-footer__heading">Services</h2>
          <ul>
            {services.map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`}>{s.name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Areas we serve">
          <h2 className="site-footer__heading">Areas</h2>
          <ul>
            {locations.map((l) => (
              <li key={l.slug}>
                <Link to={`/locations/${l.slug}`}>Interior Designer in {l.area}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="container site-footer__bottom">
        <p>
          © {new Date().getFullYear()} {studio.fullName}. All rights reserved.
        </p>
        <p className="site-footer__credit">
          Designed by{" "}
          <a href="https://codebeacons.in/" target="_blank" rel="noopener noreferrer">
            Code Beacons Technologies
          </a>
        </p>
      </div>
    </footer>
  );
}
