import { useEffect } from 'react';
import { site } from '../data/site';

type Seo = { title: string; description: string; path: string; image?: string };

const setMeta = (attr: 'name' | 'property', key: string, content: string) => {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

/** Sets <title>, description, canonical and Open Graph tags for the current route. */
export function useSeo({ title, description, path, image = site.logo }: Seo) {
  useEffect(() => {
    document.title = title;
    setMeta('name', 'description', description);
    const base = site.domain || window.location.origin;
    const url = `${base}${path}`;
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', `${base}${image}`);
    setMeta('name', 'twitter:card', 'summary_large_image');
    // Canonical is only emitted once a real domain is configured in data/site.ts
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (site.domain) {
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = url;
    } else if (link) link.remove();
  }, [title, description, path, image]);
}
