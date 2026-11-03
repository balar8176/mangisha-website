import { about } from '../data/content';
import { site } from '../data/site';
import { useReveal } from '../hooks/useReveal';

export default function About() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="about" className="section section--paper" ref={ref} aria-labelledby="about-title">
      <div className="container about" data-reveal-group>
        <div className="about__mark" data-reveal="left">
          <img src={site.logo} alt={`${site.name} — ${site.tagline}`} width="578" height="494" loading="lazy" decoding="async" />
        </div>
        <div className="about__copy">
          <p className="eyebrow" data-reveal>{about.eyebrow}</p>
          <h2 id="about-title" className="h2" data-reveal>{about.title}</h2>
          {about.paragraphs.map((p) => (
            <p key={p} className="lead" data-reveal>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
