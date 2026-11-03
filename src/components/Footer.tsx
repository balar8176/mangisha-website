import NavLink from './NavLink';
import { navLinks, site } from '../data/site';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div>
          <img src={site.logo} alt="" width="72" height="62" loading="lazy" className="footer__logo" />
          <p className="footer__tag">{site.name} — {site.tagline}</p>
        </div>
        <nav aria-label="Footer">
          {navLinks.map((l) => (
            <NavLink key={l.href} href={l.href}>{l.label}</NavLink>
          ))}
        </nav>
        <p className="footer__copy">© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
