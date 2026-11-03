import { Suspense, lazy, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import NavLink from './NavLink';
import RollFallback from './three/RollFallback';
import { hero } from '../data/content';
import { canRun3D, prefersReducedMotion } from '../lib/env';

// The three.js bundle is only downloaded when 3D will actually run.
const HeroRoll = lazy(() => import('./three/HeroRoll'));

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [use3D] = useState(canRun3D);
  const [visible, setVisible] = useState(true);

  // Entrance timeline: eyebrow → headline lines (masked rise) → copy → buttons.
  useLayoutEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero__eyebrow', { opacity: 0, y: 14, duration: 0.7 })
        .from('.hero__line > span', { yPercent: 110, duration: 1, stagger: 0.12 }, '-=0.35')
        .from('.hero__body', { opacity: 0, y: 18, duration: 0.8 }, '-=0.5')
        .from('.hero__cta > *', { opacity: 0, y: 16, duration: 0.7, stagger: 0.1 }, '-=0.55')
        .from('.hero__stage', { opacity: 0, duration: 1.2 }, 0.2);
      // Subtle scroll parallax: stage drifts slower than the page.
      gsap.to('.hero__stage', {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  // Stop rendering the WebGL canvas while the hero is off-screen.
  useEffect(() => {
    const el = stage.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.01 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="hero" ref={root} aria-labelledby="hero-title">
      <div className="hero__grain" aria-hidden />
      <div className="container hero__grid">
        <div className="hero__copy">
          <p className="hero__eyebrow eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title" className="hero__title">
            {hero.title.map((line) => (
              <span className="hero__line" key={line}>
                <span>{line}</span>
              </span>
            ))}
          </h1>
          <p className="hero__body">{hero.body}</p>
          <div className="hero__cta">
            <NavLink href={hero.primaryCta.href} className="btn btn--solid">
              {hero.primaryCta.label}
            </NavLink>
            <NavLink href={hero.secondaryCta.href} className="btn btn--ghost">
              {hero.secondaryCta.label}
            </NavLink>
          </div>
        </div>

        <div className="hero__stage" ref={stage}>
          <span className="hero__ring" aria-hidden />
          {use3D ? (
            <Suspense fallback={<RollFallback interactive={false} />}>
              <HeroRoll active={visible} />
            </Suspense>
          ) : (
            <RollFallback />
          )}
        </div>
      </div>
      <NavLink href="/#buyers" className="hero__scroll" aria-label="Scroll to content">
        <span />
      </NavLink>
    </section>
  );
}
