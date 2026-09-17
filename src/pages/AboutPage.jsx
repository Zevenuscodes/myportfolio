import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import { PageHeader, fadeUp, stagger } from '../components/ui';

const FACTS = [
  { label: 'Role',     value: 'Creative Director' },
  { label: 'Based in', value: 'Dehradun, India' },
  { label: 'Makes',    value: 'Visualisers, brand films, edits' },
  { label: 'Alias',    value: 'Darzeeeeeee' },
];

export default function AboutPage() {
  return (
    <>
      <section className="page">
        <div className="page-inner">
          <PageHeader
            eyebrow="About"
            aside="Yash Joshi"
            title={<>I <em>stitch</em> videos.</>}
          />

          <motion.div
            className="about-grid"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <div>
              <motion.p
                variants={fadeUp}
                className="display"
                style={{ fontSize: 'clamp(1.75rem, 3.2vw, 2.75rem)', lineHeight: 1.15, maxWidth: '22ch' }}
              >
                I am a Creative Director based out of Dehradun. I stitch — as my name suggests — visuals for artists and brands.
              </motion.p>
              <motion.p
                variants={fadeUp}
                style={{ marginTop: '1.5rem', color: 'var(--muted)', fontSize: '1.05rem' }}
              >
                Welcome to my world.
              </motion.p>

              <motion.dl variants={fadeUp} style={{ marginTop: '3.5rem' }}>
                {FACTS.map(f => (
                  <div
                    key={f.label}
                    style={{
                      display: 'grid', gridTemplateColumns: '8rem 1fr', gap: '1rem',
                      padding: '0.9rem 0', borderTop: '1px solid var(--rule)',
                    }}
                  >
                    <dt className="eyebrow" style={{ paddingTop: '0.2rem' }}>{f.label}</dt>
                    <dd style={{ margin: 0 }}>{f.value}</dd>
                  </div>
                ))}
              </motion.dl>
            </div>

            <motion.figure variants={fadeUp} style={{ margin: 0, position: 'sticky', top: '7rem' }}>
              <img
                src="/yash.jpg"
                alt="Yash Joshi"
                style={{
                  width: '100%', display: 'block',
                  objectFit: 'cover', aspectRatio: '4 / 5',
                  filter: 'grayscale(100%) contrast(1.05)',
                }}
              />
              <figcaption className="eyebrow" style={{ marginTop: '0.75rem' }}>
                Somewhere above the clouds
              </figcaption>
            </motion.figure>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
}
