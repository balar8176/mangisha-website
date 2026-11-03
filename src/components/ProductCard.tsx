import { useRef, type PointerEvent } from 'react';
import type { Product } from '../data/products';
import { useShortlist } from '../hooks/useShortlist';

/** Card with a restrained CSS-3D tilt on hover (fine pointers only; disabled by CSS for touch / reduced motion). */
export default function ProductCard({ product }: { product: Product }) {
  const { has, toggle } = useShortlist();
  const ref = useRef<HTMLElement>(null);
  const saved = has(product.id);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.setProperty('--tx', `${(-y * 5).toFixed(2)}deg`);
    ref.current.style.setProperty('--ty', `${(x * 6).toFixed(2)}deg`);
  };
  const onLeave = () => {
    ref.current?.style.setProperty('--tx', '0deg');
    ref.current?.style.setProperty('--ty', '0deg');
  };

  return (
    <article className="card" ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} data-reveal>
      <div className="card__media">
        {product.image ? (
          <img src={product.image} alt={product.name} loading="lazy" decoding="async" width="600" height="450" />
        ) : (
          <div className="card__placeholder" role="img" aria-label={`Image for ${product.name} not added yet`}>
            <span>{product.category}</span>
            <small>Add photo: public/assets/products/</small>
          </div>
        )}
      </div>
      <div className="card__body">
        <p className="card__cat">{product.category}</p>
        <h3 className="card__title">{product.name}</h3>
        <p className="card__summary">{product.summary}</p>
        <dl className="card__specs">
          <div><dt>GSM</dt><dd>{product.gsm}</dd></div>
          <div><dt>Composition</dt><dd>{product.composition}</dd></div>
          <div><dt>Width</dt><dd>{product.width}</dd></div>
        </dl>
        <ul className="card__tags">
          {product.uses.map((u) => (
            <li key={u}>{u}</li>
          ))}
        </ul>
        <button
          type="button"
          className={`btn btn--outline btn--block ${saved ? 'is-saved' : ''}`}
          aria-pressed={saved}
          onClick={() => toggle(product.id)}
        >
          {saved ? '✓ In shortlist' : '+ Add to shortlist'}
        </button>
      </div>
    </article>
  );
}
