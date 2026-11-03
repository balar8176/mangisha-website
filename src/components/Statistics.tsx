import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { stats } from '../data/content';
import { prefersReducedMotion } from '../lib/env';

gsap.registerPlugin(ScrollTrigger);

/** Numbers count up once when scrolled into view. Final value is already in the DOM (SEO / no-JS / reduced motion). */
export default function Statistics() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !root.current) return;
    const ctx = gsap.context(() => {
      root.current!.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        const end = Number(el.dataset.count);
        const obj = { v: 0 };
        ScrollTrigger.create({
          trigger: el,
          start: 'top 90%',
          once: true,
          onEnter: () =>
            gsap.to(obj, {
              v: end,
              duration: 1.6,
              ease: 'power2.out',
              onUpdate: () => (el.textContent = String(Math.round(obj.v))),
            }),
        });
        el.textContent = '0';
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section className="stats" ref={root} aria-label="Mangisha at a glance">
      <div className="container stats__grid">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat__value">
              <span data-count={s.value}>{s.value}</span>
              <span className="stat__suffix">{s.suffix}</span>
            </div>
            <div className="stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
