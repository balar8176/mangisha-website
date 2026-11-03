import { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from './ProductCard';
import { categories, products } from '../data/products';
import { useReveal } from '../hooks/useReveal';
import { FILTER_EVENT } from './BuyerSelector';

type Cat = (typeof categories)[number];

export default function Collection() {
  const ref = useReveal<HTMLElement>();
  const [cat, setCat] = useState<Cat>('All');

  // Lets the BuyerSelector pre-filter this list.
  useEffect(() => {
    const on = (e: Event) => {
      const c = (e as CustomEvent<string>).detail as Cat;
      if (categories.includes(c)) setCat(c);
    };
    window.addEventListener(FILTER_EVENT, on);
    return () => window.removeEventListener(FILTER_EVENT, on);
  }, []);

  // Card count changes page height — let ScrollTrigger re-measure the sections below.
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 80);
    return () => clearTimeout(t);
  }, [cat]);

  const list = cat === 'All' ? products : products.filter((p) => p.category === cat);

  return (
    <section id="collection" className="section" ref={ref} aria-labelledby="collection-title">
      <div className="container">
        <div className="section__head" data-reveal-group>
          <div>
            <p className="eyebrow" data-reveal>The collection</p>
            <h2 id="collection-title" className="h2" data-reveal>Knit fabrics, by construction.</h2>
          </div>
          <div className="chips" role="group" aria-label="Filter by category" data-reveal>
            {categories.map((c) => (
              <button key={c} type="button" className={`chip ${cat === c ? 'is-active' : ''}`} aria-pressed={cat === c} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {list.length === 0 ? (
          <p className="empty">No fabrics in this category yet. Try another filter.</p>
        ) : (
          <div className="grid grid--cards" key={cat} data-reveal-group aria-live="polite">
            {list.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
