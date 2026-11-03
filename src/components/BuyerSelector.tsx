import { useState } from 'react';
import { buyerTypes } from '../data/content';
import { useReveal } from '../hooks/useReveal';
import { useNavTo } from '../lib/useNavTo';

export const FILTER_EVENT = 'mangisha:filter';

/** "Who are you buying for?" — picks a buyer type, then jumps to the collection pre-filtered. */
export default function BuyerSelector() {
  const ref = useReveal<HTMLElement>();
  const go = useNavTo();
  const [active, setActive] = useState(buyerTypes[0].id);
  const current = buyerTypes.find((b) => b.id === active)!;

  const show = () => {
    window.dispatchEvent(new CustomEvent(FILTER_EVENT, { detail: current.pick }));
    go('/#collection');
  };

  return (
    <section id="buyers" className="section section--paper" ref={ref} aria-labelledby="buyers-title">
      <div className="container buyer">
        <div className="buyer__intro" data-reveal-group>
          <p className="eyebrow" data-reveal>Find your fabric</p>
          <h2 id="buyers-title" className="h2" data-reveal>Who are you making for?</h2>
        </div>

        <div className="buyer__panel" data-reveal-group>
          <div className="buyer__tabs" role="tablist" aria-label="Buyer type" data-reveal>
            {buyerTypes.map((b) => (
              <button
                key={b.id}
                role="tab"
                id={`tab-${b.id}`}
                aria-selected={active === b.id}
                aria-controls="buyer-panel"
                tabIndex={active === b.id ? 0 : -1}
                className={`buyer__tab ${active === b.id ? 'is-active' : ''}`}
                onClick={() => setActive(b.id)}
                onKeyDown={(e) => {
                  const i = buyerTypes.findIndex((x) => x.id === active);
                  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') setActive(buyerTypes[(i + 1) % buyerTypes.length].id);
                  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') setActive(buyerTypes[(i - 1 + buyerTypes.length) % buyerTypes.length].id);
                }}
              >
                {b.title}
              </button>
            ))}
          </div>
          <div id="buyer-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="buyer__content" data-reveal>
            <p key={current.id} className="buyer__text">{current.text}</p>
            <button type="button" className="btn btn--solid" onClick={show}>
              See {current.pick === 'Specialty' ? 'specialty' : current.pick.toLowerCase()} fabrics
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
