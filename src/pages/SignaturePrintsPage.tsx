import { useMemo, useState } from 'react';
import NavLink from '../components/NavLink';
import PrintTile from '../components/PrintTile';
import Lightbox from '../components/Lightbox';
import { prints } from '../data/prints';
import { useReveal } from '../hooks/useReveal';
import { useSeo } from '../lib/useSeo';

const families = ['All', ...Array.from(new Set(prints.map((p) => p.family)))];

export default function SignaturePrintsPage() {
  useSeo({
    title: 'Signature Prints — Mangisha',
    description: 'Explore the six Mangisha signature prints — doodle blooms and blossom scatters in curated colourways for knit fabrics.',
    path: '/signature-prints',
    image: prints[0].src,
  });
  const ref = useReveal<HTMLElement>();
  const [family, setFamily] = useState('All');
  const [open, setOpen] = useState<number | null>(null);
  const list = useMemo(() => (family === 'All' ? prints : prints.filter((p) => p.family === family)), [family]);

  return (
    <main className="prints-page" ref={ref}>
      <header className="prints-page__hero">
        <div className="container" data-reveal-group>
          <p className="eyebrow eyebrow--light" data-reveal>Signature prints</p>
          <h1 className="h1" data-reveal>The print library.</h1>
          <p className="lead lead--light" data-reveal>
            Six prints in two families. Tap any print to view it full size, and use the arrow keys to move between them.
          </p>
        </div>
      </header>

      <section className="section section--ink section--flush" aria-label="Prints">
        <div className="container">
          <div className="chips" role="group" aria-label="Filter prints by family">
            {families.map((f) => (
              <button key={f} type="button" className={`chip chip--light ${family === f ? 'is-active' : ''}`} aria-pressed={family === f} onClick={() => setFamily(f)}>
                {f}
              </button>
            ))}
          </div>
          <div className="grid grid--prints grid--prints-page" key={family}>
            {list.map((p, i) => (
              <PrintTile key={p.id} print={p} priority={i < 2} onOpen={() => setOpen(i)} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--paper cta-band">
        <div className="container cta-band__inner">
          <h2 className="h2">Like a print? Ask for samples.</h2>
          <div className="cta-band__actions">
            <NavLink href="/#quote" className="btn btn--solid">Request a quote</NavLink>
            <NavLink href="/#collection" className="btn btn--outline">Browse fabrics</NavLink>
          </div>
        </div>
      </section>

      <Lightbox items={list} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
    </main>
  );
}
