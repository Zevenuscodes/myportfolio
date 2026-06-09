import React from 'react';
import { motion } from 'framer-motion';
import MagicBento from '../components/MagicBento';
import Footer from '../components/Footer';
import { usePageTransition } from '../components/DoorTransition';

const CATEGORIES = [
  { label: '01', title: 'Long Form',   description: 'Documentary & long-form content',         path: '/longform'    },
  { label: '02', title: 'Short Form',  description: 'Reels, shorts & quick-cut edits',         path: '/short-form'  },
  { label: '03', title: 'Visualisers', description: 'Music visualiser edits',                  path: '/visualisers' },
];

export default function WorkPage() {
  const { transitionTo } = usePageTransition();

  return (
    <>
      <section className="work-section" style={{
        minHeight: '100vh',
        background: 'var(--dark)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '8rem 4rem 4rem',
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3rem' }}
        >
          <div style={{
            fontFamily: 'Share Tech Mono, monospace', fontSize: '0.6rem',
            letterSpacing: '4px', color: 'var(--cyan)', opacity: 0.6,
            textTransform: 'uppercase', marginBottom: '0.75rem',
          }}>
            // Select a Category
          </div>
          <h1 style={{
            fontFamily: 'Orbitron, monospace', fontSize: 'clamp(2rem, 4vw, 4rem)',
            fontWeight: 900, color: 'var(--text-main)', letterSpacing: '4px',
            textShadow: '0 0 40px rgba(245,230,66,0.3)',
          }}>
            MY WORK
          </h1>
          <div style={{
            marginTop: '1rem', width: '60px', height: '2px',
            background: 'linear-gradient(90deg, var(--yellow), transparent)',
            boxShadow: '0 0 10px var(--yellow)',
          }} />
        </motion.div>

        {/* Bento grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ maxWidth: '900px' }}
        >
          <MagicBento
            cards={CATEGORIES}
            onCardClick={(card) => transitionTo(card.path)}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableMagnetism={true}
            clickEffect={true}
            glowColor="245, 230, 66"
            particleCount={10}
            spotlightRadius={280}
          />
        </motion.div>
      </section>
      <Footer />
    </>
  );
}
