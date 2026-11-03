/**
 * Cloudflare Pages Function — POST /api/quote
 *
 * Delivers the quote form by email through Resend (https://resend.com).
 * It reports success ONLY if Resend accepts the message. If credentials are not configured
 * it returns 503 and the website shows an honest error — it never pretends to have sent anything.
 *
 * Required environment variables (Cloudflare Pages → Settings → Environment variables):
 *   RESEND_API_KEY    API key from Resend (store as an encrypted secret)
 *   QUOTE_TO_EMAIL    Address that should receive quote requests
 *   QUOTE_FROM_EMAIL  Verified sender, e.g. "Mangisha Website <quotes@yourdomain.com>"
 */
interface Env {
  RESEND_API_KEY?: string;
  QUOTE_TO_EMAIL?: string;
  QUOTE_FROM_EMAIL?: string;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }

  // Honeypot: bots fill the hidden field. Pretend success to them, send nothing.
  if (str(body.website, 200)) return json({ ok: true });

  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const company = str(body.company, 160);
  const phone = str(body.phone, 60);
  const quantity = str(body.quantity, 120);
  const message = str(body.message, 4000);
  const fabrics = Array.isArray(body.fabrics) ? body.fabrics.map((f) => str(f, 80)).filter(Boolean).slice(0, 20) : [];

  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || message.length < 10) {
    return json({ ok: false, error: 'Please check the form fields and try again.' }, 422);
  }

  if (!env.RESEND_API_KEY || !env.QUOTE_TO_EMAIL || !env.QUOTE_FROM_EMAIL) {
    return json({ ok: false, error: 'Online quote requests are not switched on yet. Please contact us on WhatsApp or by email.' }, 503);
  }

  const rows: [string, string][] = [
    ['Name', name], ['Company', company], ['Email', email], ['Phone', phone],
    ['Quantity', quantity], ['Shortlisted fabrics', fabrics.join(', ')], ['Message', message],
  ];
  const html = `<h2>New quote request</h2><table cellpadding="6">${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td><strong>${esc(k)}</strong></td><td>${esc(v).replace(/\n/g, '<br>')}</td></tr>`)
    .join('')}</table>`;
  const text = rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.QUOTE_FROM_EMAIL,
      to: [env.QUOTE_TO_EMAIL],
      reply_to: email,
      subject: `Quote request — ${name}${company ? ` (${company})` : ''}`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    return json({ ok: false, error: 'We could not send your request right now. Please try WhatsApp or email instead.' }, 502);
  }
  return json({ ok: true });
};

// Any other method on this route
export const onRequest: PagesFunction<Env> = async () => json({ ok: false, error: 'Method not allowed.' }, 405);
