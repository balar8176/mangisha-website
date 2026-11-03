import { useState } from 'react';
import NavLink from './NavLink';
import PrintTile from './PrintTile';
import Lightbox from './Lightbox';
import { prints } from '../data/prints';
import { useReveal } from '../hooks/useReveal';

/** Homepage teaser of the six signature prints, with the full viewer and a link to /signature-prints. */
export default function SignaturePrints() {
  const ref = useReveal<HTMLElement>();
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section id="prints" className="section section--ink" ref={ref} aria-labelledby="prints-title">
      <div className="container">
        <div className="section__head" data-reveal-group>
          <div>
            <p className="eyebrow eyebrow--light" data-reveal>Signature prints</p>
            <h2 id="prints-title" className="h2" data-reveal>Six prints, drawn to be worn.</h2>
          </div>
          <NavLink href="/signature-prints" className="btn btn--light" data-reveal>View all prints</NavLink>
        </div>
        <div className="grid grid--prints" data-reveal-group>
          {prints.map((p, i) => (
            <PrintTile key={p.id} print={p} onOpen={() => setOpen(i)} />
          ))}
        </div>
      </div>
      <Lightbox items={prints} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </section>
  );
}
