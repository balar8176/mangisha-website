import { useState, type FormEvent, type ReactNode } from 'react';
import { products } from '../data/products';
import { site, whatsappUrl } from '../data/site';
import { useShortlist } from '../hooks/useShortlist';
import { useReveal } from '../hooks/useReveal';

type Fields = { name: string; company: string; email: string; phone: string; quantity: string; message: string; website: string };
type Errors = Partial<Record<keyof Fields, string>>;
type Status = { state: 'idle' } | { state: 'sending' } | { state: 'success' } | { state: 'error'; message: string };

const empty: Fields = { name: '', company: '', email: '', phone: '', quantity: '', message: '', website: '' };

const validate = (f: Fields): Errors => {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Please enter a valid email address.';
  if (f.phone.trim() && !/^[+\d][\d\s().-]{6,}$/.test(f.phone.trim())) e.phone = 'Please enter a valid phone number.';
  if (f.message.trim().length < 10) e.message = 'Tell us a little about what you need (at least 10 characters).';
  return e;
};

export default function QuoteForm() {
  const ref = useReveal<HTMLElement>();
  const { ids } = useShortlist();
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ state: 'idle' });
  const shortlisted = ids.map((id) => products.find((p) => p.id === id)?.name).filter(Boolean) as string[];

  const set = (k: keyof Fields) => (e: { target: { value: string } }) => {
    setF((p) => ({ ...p, [k]: e.target.value }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (status.state === 'sending') return;
    const errs = validate(f);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`q-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStatus({ state: 'sending' });
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...f, fabrics: shortlisted }),
      });
      const data = await res.json().catch(() => ({}));
      // Only a confirmed delivery from the server counts as success.
      if (res.ok && data?.ok === true) {
        setStatus({ state: 'success' });
        setF(empty);
      } else {
        setStatus({ state: 'error', message: data?.error || 'We could not send your request. Please try WhatsApp or email instead.' });
      }
    } catch {
      setStatus({ state: 'error', message: 'Network problem — your request was not sent. Please try again or use WhatsApp / email.' });
    }
  };

  const waText = `Hello Mangisha, I'd like a quote.${shortlisted.length ? ` Fabrics: ${shortlisted.join(', ')}.` : ''}`;

  return (
    <section id="quote" className="section section--ink" ref={ref} aria-labelledby="quote-title">
      <div className="container quote">
        <div className="quote__intro" data-reveal-group>
          <p className="eyebrow eyebrow--light" data-reveal>Request a quote</p>
          <h2 id="quote-title" className="h2" data-reveal>Tell us what you’re making.</h2>
          <p className="lead lead--light" data-reveal>Share your fabric, quantity and timeline — we’ll come back with pricing and sampling options.</p>
          {shortlisted.length > 0 && (
            <p className="quote__chosen" data-reveal>
              Including your shortlist: <strong>{shortlisted.join(', ')}</strong>
            </p>
          )}
          <p className="quote__alt" data-reveal>
            Prefer chat? <a href={whatsappUrl(waText)} target="_blank" rel="noopener noreferrer">WhatsApp us</a> or write to{' '}
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
          </p>
        </div>

        <form className="form" onSubmit={submit} noValidate data-reveal>
          {status.state === 'success' ? (
            <div className="form__success" role="status">
              <h3>Request sent — thank you.</h3>
              <p>Our team will reply by email shortly.</p>
              <button type="button" className="btn btn--light" onClick={() => setStatus({ state: 'idle' })}>Send another request</button>
            </div>
          ) : (
            <>
              <div className="form__row">
                <Field id="name" label="Your name *" error={errors.name}>
                  <input id="q-name" autoComplete="name" value={f.name} onChange={set('name')} aria-invalid={!!errors.name} aria-describedby={errors.name ? 'err-name' : undefined} />
                </Field>
                <Field id="company" label="Company">
                  <input id="q-company" autoComplete="organization" value={f.company} onChange={set('company')} />
                </Field>
              </div>
              <div className="form__row">
                <Field id="email" label="Email *" error={errors.email}>
                  <input id="q-email" type="email" autoComplete="email" value={f.email} onChange={set('email')} aria-invalid={!!errors.email} aria-describedby={errors.email ? 'err-email' : undefined} />
                </Field>
                <Field id="phone" label="Phone / WhatsApp" error={errors.phone}>
                  <input id="q-phone" type="tel" autoComplete="tel" value={f.phone} onChange={set('phone')} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'err-phone' : undefined} />
                </Field>
              </div>
              <Field id="quantity" label="Approx. quantity (kg / metres)">
                <input id="q-quantity" value={f.quantity} onChange={set('quantity')} />
              </Field>
              <Field id="message" label="What do you need? *" error={errors.message}>
                <textarea id="q-message" rows={5} value={f.message} onChange={set('message')} aria-invalid={!!errors.message} aria-describedby={errors.message ? 'err-message' : undefined} />
              </Field>
              {/* Honeypot: real visitors never see or fill this */}
              <div className="hp" aria-hidden>
                <label>Website<input tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} /></label>
              </div>

              {status.state === 'error' && (
                <p className="form__error" role="alert">{status.message}</p>
              )}
              <button type="submit" className="btn btn--solid btn--block" disabled={status.state === 'sending'} aria-busy={status.state === 'sending'}>
                {status.state === 'sending' ? 'Sending…' : 'Send request'}
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={`q-${id}`}>{label}</label>
      {children}
      {error && <span className="field__error" id={`err-${id}`}>{error}</span>}
    </div>
  );
}
