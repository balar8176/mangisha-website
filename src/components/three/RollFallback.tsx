import { useRef, type PointerEvent } from 'react';

/**
 * CSS-3D fabric-roll stack. Used when WebGL is unavailable, the device is low-powered,
 * or the visitor prefers reduced motion. Pointer tilt is pure CSS variables (no JS animation loop).
 */
export default function RollFallback({ interactive = true }: { interactive?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!interactive || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--rx', `${(0.5 - (e.clientY - r.top) / r.height) * 8}deg`);
    ref.current.style.setProperty('--ry', `${(-0.5 + (e.clientX - r.left) / r.width) * 14 - 24}deg`);
  };
  return (
    <div className="roll-fb" ref={ref} onPointerMove={onMove} aria-hidden>
      <div className="roll-fb__stage">
        <div className="roll-fb__roll roll-fb__roll--ink" />
        <div className="roll-fb__roll roll-fb__roll--red" />
        <div className="roll-fb__roll roll-fb__roll--cream" />
        <div className="roll-fb__shadow" />
      </div>
    </div>
  );
}
