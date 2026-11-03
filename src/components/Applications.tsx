import { applications } from '../data/content';
import { useReveal } from '../hooks/useReveal';

export default function Applications() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="applications" className="section" ref={ref} aria-labelledby="apps-title">
      <div className="container">
        <div className="section__head" data-reveal-group>
          <div>
            <p className="eyebrow" data-reveal>Applications</p>
            <h2 id="apps-title" className="h2" data-reveal>Where our fabrics go.</h2>
          </div>
        </div>
        <ol className="apps" data-reveal-group>
          {applications.map((a) => (
            <li className="app" key={a.index} data-reveal>
              <span className="app__index">{a.index}</span>
              <div>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
