import { Link } from "react-router-dom";
import { studio } from "../data/studio";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo" aria-label={`${studio.fullName} — home`}>
            <img src="/images/studio/logo-lockup-dark.png" alt={studio.fullName} />
          </Link>
          <p>
            Pune-based interior design studio creating elegant, functional, and timeless
            residential &amp; commercial spaces.
          </p>
          <a href={studio.instagramUrl} target="_blank" rel="noopener noreferrer" className="site-footer__social">
            Instagram — {studio.instagramHandle}
          </a>
        </div>

        <nav className="site-footer__col" aria-label="Footer navigation">
          <h4>Studio</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>

        <div className="site-footer__col">
          <h4>Get in Touch</h4>
          <ul>
            <li>
              <a href={studio.phoneHref}>{studio.phone}</a>
            </li>
            <li>
              <a href={`mailto:${studio.email}`}>{studio.email}</a>
            </li>
            <li>{studio.hours}</li>
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>Visit</h4>
          <address>
            {studio.address.line1}
            <br />
            {studio.address.line2}
            <br />
            {studio.address.line3}
          </address>
        </div>
      </div>

      <div className="container site-footer__bottom">
        <p>
          © {new Date().getFullYear()} {studio.fullName}. All rights reserved.
        </p>
        <p className="site-footer__credit">Designed for considered living.</p>
      </div>
    </footer>
  );
}
