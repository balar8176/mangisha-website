import { site, whatsappUrl } from '../data/site';
import { useReveal } from '../hooks/useReveal';

export default function Contact() {
  const ref = useReveal<HTMLElement>();
  const c = site.contact;
  return (
    <section id="contact" className="section" ref={ref} aria-labelledby="contact-title">
      <div className="container">
        <div className="section__head" data-reveal-group>
          <div>
            <p className="eyebrow" data-reveal>Contact</p>
            <h2 id="contact-title" className="h2" data-reveal>Let’s talk fabric.</h2>
          </div>
        </div>
        <div className="grid grid--contact" data-reveal-group>
          <a className="contact" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" data-reveal>
            <small>WhatsApp</small>
            <strong>{c.whatsappDisplay}</strong>
          </a>
          <a className="contact" href={`mailto:${c.email}`} data-reveal>
            <small>Email</small>
            <strong>{c.email}</strong>
          </a>
          <div className="contact" data-reveal>
            <small>Address</small>
            <strong>{c.address}</strong>
          </div>
          <div className="contact" data-reveal>
            <small>Hours</small>
            <strong>{c.hours}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
