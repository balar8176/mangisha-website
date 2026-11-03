import { useCallback, useEffect, useRef } from 'react';
import type { Print } from '../data/prints';

type Props = { items: Print[]; index: number | null; onClose: () => void; onIndex: (i: number) => void };

/** Accessible modal viewer: Esc closes, ←/→ navigate, focus is trapped and restored, page scroll is locked. */
export default function Lightbox({ items, index, onClose, onIndex }: Props) {
  const open = index !== null;
  const dialog = useRef<HTMLDivElement>(null);
  const opener = useRef<Element | null>(null);
  const touchX = useRef<number | null>(null);

  const step = useCallback(
    (d: number) => index !== null && onIndex((index + d + items.length) % items.length),
    [index, items.length, onIndex],
  );

  useEffect(() => {
    if (!open) return;
    opener.current = document.activeElement;
    document.documentElement.classList.add('lightbox-open');
    dialog.current?.querySelector<HTMLElement>('button')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'Tab' && dialog.current) {
        const f = dialog.current.querySelectorAll<HTMLElement>('button, a[href]');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) (e.preventDefault(), last.focus());
        else if (!e.shiftKey && document.activeElement === last) (e.preventDefault(), first.focus());
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.classList.remove('lightbox-open');
      (opener.current as HTMLElement | null)?.focus?.();
    };
  }, [open, onClose, step]);

  if (index === null) return null;
  const p = items[index];

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${p.name}, print ${index + 1} of ${items.length}`}
      ref={dialog}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
        touchX.current = null;
      }}
    >
      <button type="button" className="lightbox__close" onClick={onClose} aria-label="Close viewer">✕</button>
      <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => step(-1)} aria-label="Previous print">‹</button>
      <figure className="lightbox__figure">
        <img key={p.id} src={p.src} alt={`${p.name} print — ${p.colourway}`} width={p.width} height={p.height} />
        <figcaption>
          <strong>{p.name}</strong>
          <span>{p.code} · {p.colourway}</span>
          <em>{index + 1} / {items.length}</em>
        </figcaption>
      </figure>
      <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => step(1)} aria-label="Next print">›</button>
    </div>
  );
}
