import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSmoothScroll } from './smoothScroll';

/**
 * Handles both route links ("/signature-prints") and in-page anchors ("/#collection").
 * From another route, anchors navigate home first; <Home/> then scrolls to the hash.
 */
export function useNavTo() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { scrollTo } = useSmoothScroll();

  return useCallback(
    (href: string) => {
      if (href.startsWith('/#')) {
        const hash = href.slice(1);
        if (pathname === '/') {
          scrollTo(hash);
          history.replaceState(null, '', href);
        } else {
          navigate('/' + hash);
        }
      } else {
        navigate(href);
      }
    },
    [navigate, pathname, scrollTo],
  );
}
