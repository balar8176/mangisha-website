import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/env';

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-reveal for every descendant marked with [data-reveal].
 * Content is only hidden once GSAP has taken over, and `once: true` means it never re-hides.
 * Reduced motion → no animation, content is simply visible.
 * Optional data-reveal="left|right|fade" picks the direction.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const groups = new Map<Element, HTMLElement[]>();
      root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
        const parent = (el.closest('[data-reveal-group]') as Element) || el;
        groups.set(parent, [...(groups.get(parent) || []), el]);
      });
      groups.forEach((els, trigger) => {
        els.forEach((el) => {
          const dir = el.dataset.reveal;
          gsap.set(el, { opacity: 0, y: dir === 'left' || dir === 'right' || dir === 'fade' ? 0 : 36, x: dir === 'left' ? -40 : dir === 'right' ? 40 : 0 });
        });
        ScrollTrigger.create({
          trigger,
          start: 'top 88%',
          once: true,
          onEnter: () =>
            gsap.to(els, { opacity: 1, x: 0, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.09, clearProps: 'transform' }),
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);
  return ref;
}
