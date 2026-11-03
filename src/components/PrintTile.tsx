import { useState } from 'react';
import type { Print } from '../data/prints';

/** One print. Shows the supplied image unchanged; if the file is ever missing it says so instead of faking one. */
export default function PrintTile({ print, onOpen, priority = false }: { print: Print; onOpen: () => void; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  return (
    <button type="button" className="print" onClick={onOpen} aria-label={`View ${print.name}, ${print.colourway}`} data-reveal>
      <span className="print__media" style={{ aspectRatio: `${print.width} / ${print.height}` }}>
        {failed ? (
          <span className="print__missing">Missing file<br />{print.src.split('/').pop()}</span>
        ) : (
          <img
            src={print.src}
            alt={`${print.name} print`}
            width={print.width}
            height={print.height}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setFailed(true)}
          />
        )}
        <span className="print__zoom" aria-hidden>View</span>
      </span>
      <span className="print__meta">
        <strong>{print.name}</strong>
        <small>{print.code} · {print.colourway}</small>
      </span>
    </button>
  );
}
