import Comparison from './Comparison';
import NavLink from './NavLink';
import { products } from '../data/products';
import { useShortlist } from '../hooks/useShortlist';
import { useReveal } from '../hooks/useReveal';

export default function Shortlist() {
  const ref = useReveal<HTMLElement>();
  const { ids, remove, clear, compareIds, toggleCompare, maxCompare } = useShortlist();
  const items = ids.map((id) => products.find((p) => p.id === id)).filter(Boolean) as typeof products;

  return (
    <section id="shortlist" className="section section--paper" ref={ref} aria-labelledby="shortlist-title">
      <div className="container">
        <div className="section__head" data-reveal-group>
          <div>
            <p className="eyebrow" data-reveal>Your shortlist</p>
            <h2 id="shortlist-title" className="h2" data-reveal>Compare, then request a quote.</h2>
          </div>
          {items.length > 0 && (
            <button type="button" className="btn btn--outline" onClick={clear} data-reveal>Clear all</button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="empty empty--box" role="status">
            <p>Your shortlist is empty.</p>
            <NavLink href="/#collection" className="btn btn--solid">Browse the collection</NavLink>
          </div>
        ) : (
          <>
            <ul className="short">
              {items.map((p) => {
                const checked = compareIds.includes(p.id);
                const full = !checked && compareIds.length >= maxCompare;
                return (
                  <li className="short__item" key={p.id}>
                    <div>
                      <strong>{p.name}</strong>
                      <small>{p.category} · {p.gsm} GSM · {p.composition}</small>
                    </div>
                    <label className={`short__compare ${full ? 'is-disabled' : ''}`}>
                      <input type="checkbox" checked={checked} disabled={full} onChange={() => toggleCompare(p.id)} />
                      Compare
                    </label>
                    <button type="button" className="link" onClick={() => remove(p.id)} aria-label={`Remove ${p.name} from shortlist`}>
                      Remove
                    </button>
                  </li>
                );
              })}
            </ul>
            <Comparison />
            <div className="short__cta">
              <NavLink href="/#quote" className="btn btn--solid">Request a quote for these fabrics</NavLink>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
