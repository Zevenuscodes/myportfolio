import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader, fadeUp, stagger } from './ui';

const PROJECT_TYPES = ['Brand Film', 'Music Visualiser', 'Social Content', 'Documentary', 'Commercial', 'Other'];
const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/darzeeeeeee/' },
];

const fieldStyle = {
  width: '100%',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--rule)',
  color: 'var(--ink)',
  fontFamily: 'var(--sans)',
  fontSize: '1.05rem',
  padding: '0.6rem 0 0.8rem',
  outline: 'none',
  borderRadius: 0,
  transition: 'border-color 0.25s',
};

const focus = e => { e.target.style.borderBottomColor = 'var(--ink)'; };
const blur  = e => { e.target.style.borderBottomColor = 'var(--rule)'; };

function Field({ label, children }) {
  return (
    <label style={{ display: 'block', marginBottom: '2rem' }}>
      <span className="eyebrow" style={{ display: 'block' }}>{label}</span>
      {children}
    </label>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', type: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `Hi Darzee! 👋\n\nName: ${form.name}\nEmail: ${form.email}\nProject Type: ${form.type || 'Not specified'}\n\nMessage:\n${form.message}`;
    window.open(`https://wa.me/919027080039?text=${encodeURIComponent(text)}`, '_blank');
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section className="page">
      <div className="page-inner">
        <PageHeader
          eyebrow="Contact"
          aside="Replies within 24h"
          title={<>Let's make <em>something.</em></>}
        />

        <motion.div className="contact-grid" variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp}>
            <p className="display" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', lineHeight: 1.15, maxWidth: '18ch' }}>
              Brand films, music visualisers, edits — tell me what you're building.
            </p>
            <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--rule)' }}>
              {SOCIALS.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '1rem 0', borderBottom: '1px solid var(--rule)',
                    fontWeight: 500,
                  }}
                >
                  {s.label} <span>↗</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ padding: '2rem 0' }}
              >
                <div className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
                  Message <em>sent.</em>
                </div>
                <p style={{ marginTop: '0.75rem', color: 'var(--muted)' }}>
                  I'll get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <Field label="Name">
                    <input name="name" type="text" placeholder="Your name" required
                      value={form.name} onChange={handleChange}
                      style={fieldStyle} onFocus={focus} onBlur={blur} />
                  </Field>
                  <Field label="Email">
                    <input name="email" type="email" placeholder="you@domain.com" required
                      value={form.email} onChange={handleChange}
                      style={fieldStyle} onFocus={focus} onBlur={blur} />
                  </Field>
                </div>

                <Field label="Project type">
                  <select name="type" value={form.type} onChange={handleChange}
                    style={{ ...fieldStyle, cursor: 'pointer', appearance: 'none' }}
                    onFocus={focus} onBlur={blur}>
                    <option value="">Select a type</option>
                    {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </Field>

                <Field label="Message">
                  <textarea name="message" placeholder="Tell me about your project…" required rows={5}
                    value={form.message} onChange={handleChange}
                    style={{ ...fieldStyle, resize: 'vertical', minHeight: '130px' }}
                    onFocus={focus} onBlur={blur} />
                </Field>

                <button
                  type="submit"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '1rem',
                    padding: '1rem 1.5rem', background: 'var(--ink)', color: 'var(--bg)',
                    fontSize: '0.95rem', fontWeight: 500,
                    transition: 'background 0.25s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--ink)'; }}
                >
                  Send via WhatsApp <span>→</span>
                </button>
              </form>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
