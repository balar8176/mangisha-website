import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { useNavTo } from '../lib/useNavTo';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; onNavigate?: () => void };

/** Real <a href> (works with middle-click / no-JS) that routes or smooth-scrolls on normal clicks. */
export default function NavLink({ href, onNavigate, onClick, children, ...rest }: Props) {
  const go = useNavTo();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    go(href);
    onNavigate?.();
  };
  return (
    <a href={href} onClick={handle} {...rest}>
      {children}
    </a>
  );
}
