import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PROJECT_TYPES = ['Brand Film', 'Music Video', 'Social Content', 'Documentary', 'Commercial', 'Other'];
const SOCIALS = [
  { label: 'Instagram', href: 'https://www.instagram.com/darzeeeeeee/' },
];

export default function Contact() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
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

  const inputStyle = {
    width: '100%',
    background: '#0d1526',
    border: '1px solid rgba(0,245,255,0.15)',
    color: '#e0f7ff',
    fontFamily: 'Exo 2, sans-serif',
    fontSize: '0.9rem',
    fontWeight: 300,
    padding: '0.8rem 1rem',
    outline: 'none',
    transition: 'border-color 0.3s, box-shadow 0.3s',
    borderRadius: 0,
  };

  const labelStyle = {
    fontFamily: 'Share Tech Mono, monospace',
    fontSize: '0.62rem',
    letterSpacing: '3px',
    color: 'var(--cyan)',
    textTransform: 'uppercase',
    display: 'block',
    marginBottom: '0.5rem',
  };

  return (
    <section id="contact" className="contact-section" style={{
      padding: '7rem 4rem',
      background: 'linear-gradient(to bottom, var(--dark), #06070f)',
      borderTop: '1px solid rgba(0,245,255,0.06)',
    }}>
      <div ref={ref} style={{ maxWidth: '760px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div style={{
            fontFamily: 'Share Tech Mono, monospace', fontSize: '0.62rem',
            letterSpacing: '4px', color: 'var(--pink)', textTransform: 'uppercase', marginBottom: '0.8rem',
          }}>
            // Get in Touch
          </div>
          <h2 style={{
            fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.8rem, 3vw, 3rem)',
            fontWeight: 700, color: 'var(--text-main)', position: 'relative',
          }}>
            INITIATE CONTACT
            <div style={{
              position: 'absolute', bottom: '-1rem', left: 0, width: '60px', height: '2px',
              background: 'linear-gradient(90deg, var(--cyan), transparent)',
            }} />
          </h2>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="contact-form-card"
          style={{
            background: '#080d1a',
            border: '1px solid rgba(0,245,255,0.15)',
            padding: '3rem',
            position: 'relative',
            clipPath: 'polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 28px 100%, 0 calc(100% - 28px))',
          }}
        >
          {/* Corner decorations */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '24px', height: '24px', borderTop: '2px solid var(--cyan)', borderLeft: '2px solid var(--cyan)' }} />
          <div style={{ position: 'absolute', bottom: 0, right: 0, width: '24px', height: '24px', borderBottom: '2px solid var(--pink)', borderRight: '2px solid var(--pink)' }} />

          {/* System label */}
          <div style={{
            position: 'absolute', top: '1.2rem', right: '1.8rem',
            fontFamily: 'Share Tech Mono, monospace', fontSize: '0.58rem',
            letterSpacing: '2px', color: 'rgba(0,245,255,0.2)', textTransform: 'uppercase',
          }}>
            CONTACT.SYS
          </div>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                textAlign: 'center', padding: '3rem 0',
                fontFamily: 'Orbitron, monospace', fontSize: '1.2rem',
                color: 'var(--cyan)', textShadow: '0 0 20px var(--cyan)',
              }}
            >
              ✓ TRANSMISSION SENT
              <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '1rem', letterSpacing: '2px' }}>
                I'll get back to you within 24 hours.
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Name + Email row */}
              <div className="contact-name-email-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={labelStyle}>Name</label>
                  <input
                    name="name" type="text" placeholder="Your Name" required
                    value={form.name} onChange={handleChange}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = 'var(--cyan)'; e.target.style.boxShadow = '0 0 15px rgba(0,245,255,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(0,245,255,0.15)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    name="email" type="email" placeholder="you@domain.com" required
                    value={form.email} onChange={handleChange}
                    style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = 'var(--cyan)'; e.target.style.boxShadow = '0 0 15px rgba(0,245,255,0.1)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(0,245,255,0.15)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              </div>

              {/* Project type */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Project Type</label>
                <select
                  name="type" value={form.type} onChange={handleChange}
                  style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--cyan)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(0,245,255,0.15)'; }}
                >
                  <option value="" style={{ background: '#080d1a' }}>— Select Type —</option>
                  {PROJECT_TYPES.map(t => (
                    <option key={t} value={t} style={{ background: '#080d1a' }}>{t}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={labelStyle}>Message</label>
                <textarea
                  name="message" placeholder="Tell me about your project..." required rows={5}
                  value={form.message} onChange={handleChange}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '130px' }}
                  onFocus={e => { e.target.style.borderColor = 'var(--cyan)'; e.target.style.boxShadow = '0 0 15px rgba(0,245,255,0.1)'; }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(0,245,255,0.15)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ color: '#000', background: 'var(--cyan)' }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  fontFamily: 'Orbitron, monospace', fontSize: '0.68rem', letterSpacing: '4px',
                  padding: '1rem', background: 'transparent',
                  border: '1px solid var(--cyan)', color: 'var(--cyan)',
                  textTransform: 'uppercase', transition: 'all 0.3s',
                }}
              >
                // TRANSMIT MESSAGE
              </motion.button>
            </form>
          )}

          {/* Social links */}
          <div className="contact-socials" style={{
            display: 'flex', gap: '2rem', marginTop: '2.5rem', paddingTop: '2rem',
            borderTop: '1px solid rgba(0,245,255,0.1)',
          }}>
            {SOCIALS.map(s => (
              <motion.a
                key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                whileHover={{ color: 'var(--cyan)' }}
                style={{
                  fontFamily: 'Share Tech Mono, monospace', fontSize: '0.62rem',
                  letterSpacing: '2px', color: 'var(--text-muted)',
                  textTransform: 'uppercase', transition: 'color 0.2s',
                }}
              >
                {s.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
