import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { studio } from "../data/studio";
import Button from "./Button";
import "./Header.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}${menuOpen ? " menu-open" : ""}`}>
      <div className="site-header__backdrop" aria-hidden="true" />
      <div className="site-header__bar container">
        <NavLink to="/" className="site-header__logo" aria-label={`${studio.fullName} — home`}>
          <img src="/images/studio/logo-icon.png" alt="" width="44" height="44" />
          <span>
            <span className="site-header__logo-name">Madhva</span>{" "}
            <span className="site-header__logo-suffix">Interiors</span>
          </span>
        </NavLink>

        <nav className="site-header__nav" aria-label="Primary">
          <ul>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === "/"} className={({ isActive }) => (isActive ? "is-active" : "")}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__cta">
          <Button to="/contact" variant="primary">
            Start a Project
          </Button>
        </div>

        <button
          className="site-header__toggle"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-nav" className="mobile-nav" aria-hidden={!menuOpen}>
        <nav aria-label="Mobile">
          <ul>
            {links.map((link, i) => (
              <li key={link.to} style={{ transitionDelay: `${i * 45}ms` }}>
                <NavLink to={link.to} end={link.to === "/"}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <Button to="/contact" variant="primary" className="mobile-nav__cta">
          Start a Project
        </Button>
        <div className="mobile-nav__contact">
          <a href={studio.phoneHref}>{studio.phone}</a>
          <a href={`mailto:${studio.email}`}>{studio.email}</a>
        </div>
      </div>
    </header>
  );
}
