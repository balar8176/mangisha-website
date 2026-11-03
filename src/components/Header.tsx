import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NavLink from './NavLink';
import { navLinks, site } from '../data/site';
import { useShortlist } from '../hooks/useShortlist';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const { pathname } = useLocation();
  const { ids } = useShortlist();

  // Solid background after scrolling; hide on scroll-down, reveal on scroll-up.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (!open) setHidden(y > lastY.current && y > 240);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  // Lock page scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open);
    if (!open) return;
    document.querySelector<HTMLElement>('.mobile-menu__link')?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`header ${scrolled ? 'is-solid' : ''} ${hidden ? 'is-hidden' : ''}`}>
      <div className="header__bar container">
        <NavLink href="/" className="brand" aria-label={`${site.name} — home`}>
          <img src={site.logo} alt="" width="44" height="38" className="brand__mark" />
          <span className="brand__text">
            <strong>{site.name}</strong>
            <small>{site.tagline}</small>
          </span>
        </NavLink>

        <nav className="nav" aria-label="Primary">
          {navLinks.map((l) => (
            <NavLink key={l.href} href={l.href} className="nav__link">
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="header__actions">
          <NavLink href="/#shortlist" className="shortlist-chip" aria-label={`Shortlist, ${ids.length} fabric${ids.length === 1 ? '' : 's'}`}>
            <span aria-hidden>♡</span>
            <span className="shortlist-chip__count">{ids.length}</span>
          </NavLink>
          <NavLink href="/#quote" className="btn btn--solid btn--sm header__cta">
            Request a quote
          </NavLink>
          <button
            type="button"
            className={`burger ${open ? 'is-open' : ''}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Mobile">
          {navLinks.map((l, i) => (
            <NavLink
              key={l.href}
              href={l.href}
              className="mobile-menu__link"
              onNavigate={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink href="/#quote" className="btn btn--solid mobile-menu__cta" onNavigate={() => setOpen(false)} tabIndex={open ? 0 : -1}>
            Request a quote
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
