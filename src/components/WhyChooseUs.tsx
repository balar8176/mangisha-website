import { whyUs } from '../data/content';
import { useReveal } from '../hooks/useReveal';

export default function WhyChooseUs() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="why" className="section" ref={ref} aria-labelledby="why-title">
      <div className="container">
        <div className="section__head" data-reveal-group>
          <div>
            <p className="eyebrow" data-reveal>Why Mangisha</p>
            <h2 id="why-title" className="h2" data-reveal>Reasons to work with us.</h2>
          </div>
        </div>
        <div className="grid grid--why" data-reveal-group>
          {whyUs.map((w, i) => (
            <div className="why" key={w.title} data-reveal>
              <span className="why__n">0{i + 1}</span>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
