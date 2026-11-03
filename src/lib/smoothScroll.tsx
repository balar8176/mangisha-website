import { createContext, useContext, useEffect, useRef, type ReactNode } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './env';

gsap.registerPlugin(ScrollTrigger);

type ScrollApi = { scrollTo: (target: string | number, opts?: { immediate?: boolean }) => void };
const Ctx = createContext<ScrollApi>({ scrollTo: () => {} });
export const useSmoothScroll = () => useContext(Ctx);

// Height of the fixed header, so anchored sections are not hidden under it.
const HEADER_OFFSET = -88;

/**
 * One Lenis instance, driven by GSAP's ticker so ScrollTrigger stays in sync.
 * Native touch scrolling is untouched (Lenis' smoothTouch is off by default).
 * With reduced-motion we skip Lenis entirely and use native scrolling.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 3) });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo: ScrollApi['scrollTo'] = (target, opts) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target as never, { offset: typeof target === 'number' ? 0 : HEADER_OFFSET, immediate: opts?.immediate });
      return;
    }
    if (typeof target === 'number') return window.scrollTo({ top: target });
    const el = document.querySelector(target);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + HEADER_OFFSET, behavior: 'smooth' });
  };

  return <Ctx.Provider value={{ scrollTo }}>{children}</Ctx.Provider>;
}
