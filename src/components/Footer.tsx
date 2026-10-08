import { Link } from "react-router-dom";
import { studio } from "../data/studio";
import Icon from "./Icon";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <Link to="/" className="site-footer__logo" aria-label={`${studio.fullName} — home`}>
            <img src="/images/studio/logo-lockup-dark.png" alt={studio.fullName} />
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
          <h4>Visit</h4>
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
