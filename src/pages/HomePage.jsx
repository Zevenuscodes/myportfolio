import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import FloatingScissors from '../components/FloatingScissors';
import HeroSilhouette from '../components/HeroSilhouette';
import HeroWorker from '../components/HeroWorker';
import { usePageTransition } from '../components/DoorTransition';
import { IndexRow, fadeUp, stagger } from '../components/ui';

const INDEX = [
  { label: 'Music Videos', note: 'Visualisers', path: '/music-videos' },
  { label: 'Short Form', note: 'Reels & edits', path: '/short-form' },
  { label: 'SaaS', note: 'Explainers', path: '/saas-explainers' },
  { label: 'Get in touch', note: 'Start a project', path: '/contact' },
];

export default function HomePage() {
  const { transitionTo } = usePageTransition();

  return (
    <div style={{ position: 'relative' }}>
      <FloatingScissors />

      <section className="page" style={{ position: 'relative', zIndex: 1, paddingBottom: '4rem' }}>
        <HeroSilhouette />
        <HeroWorker />
        <motion.div
          className="page-inner"
          style={{ position: 'relative', zIndex: 1 }}
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          <motion.div
            variants={fadeUp}
            className="eyebrow"
            style={{
              display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap',
              paddingBottom: '1rem', marginBottom: 'clamp(2rem, 5vw, 4rem)',
              borderBottom: '1px solid var(--rule)',
            }}
          >
            <span>Yash Joshi — Creative Director</span>
            <span>Dehradun, IN · Available 2026</span>
          </motion.div>

          <div style={{ minHeight: 'clamp(420px, 66vh, 700px)', display: 'flex', alignItems: 'flex-end' }}>
            <motion.h1
              variants={fadeUp}
              className="display"
              style={{ fontSize: 'clamp(3.5rem, 9.5vw, 9.5rem)' }}
            >
              Stitching ideas <br />to <em>visuals.</em>
            </motion.h1>
          </div>
        </motion.div>
      </section>

      <section style={{ position: 'relative', zIndex: 1, padding: '0 var(--gutter) 7rem' }}>
        <div className="page-inner">
          <div className="eyebrow" style={{ marginBottom: '1rem' }}>Index</div>
          {INDEX.map((item, i) => (
            <IndexRow key={item.path} item={item} index={i} onClick={() => transitionTo(item.path)} />
          ))}
        </div>
      </section>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Footer />
      </div>
    </div>
  );
}
