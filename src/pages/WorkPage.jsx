import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import { usePageTransition } from '../components/DoorTransition';

const SHIPS = [
  {
    id: 1,
    code: 'LF — 01',
    name: 'DOCUMENTARIES',
    subtitle: 'Documentary & long-form content',
    accent: '#00f5ff',
    path: '/longform',
    clipPath: 'polygon(3% 0%, 97% 0%, 100% 18%, 100% 82%, 97% 100%, 3% 100%, 0% 82%, 0% 18%)',
    stats: [{ label: 'Format', value: '16:9' }, { label: 'Type', value: 'DOC' }],
  },
  {
    id: 2,
    code: 'SF — 02',
    name: 'SHORT FORM',
    subtitle: 'Reels, shorts & quick-cut edits',
    accent: '#ff006e',
    path: '/short-form',
    clipPath: 'polygon(0% 20%, 12% 0%, 88% 0%, 100% 20%, 100% 80%, 88% 100%, 12% 100%, 0% 80%)',
    stats: [{ label: 'Format', value: '9:16' }, { label: 'Type', value: 'REEL' }],
  },
  {
    id: 3,
    code: 'VS — 03',
    name: 'VISUALISERS',
    subtitle: 'Music visualiser edits',
    accent: '#bc13fe',
    path: '/visualisers',
    clipPath: 'polygon(6% 0%, 94% 0%, 100% 50%, 94% 100%, 6% 100%, 0% 50%)',
    stats: [{ label: 'Format', value: 'AV' }, { label: 'Type', value: 'MUSIC' }],
  },
  {
    id: 4,
    code: 'MG — 04',
    name: 'MOTION GRAPHICS',
    subtitle: 'Motion design & animation',
    accent: '#f5e642',
    path: '/motion-designs',
    clipPath: 'polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%, 12% 50%)',
    stats: [{ label: 'Format', value: '2D' }, { label: 'Type', value: 'MOTION' }],
  },
];

function SpaceshipCard({ ship, index }) {
  const [hovered, setHovered] = useState(false);
  const { transitionTo } = usePageTransition();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => transitionTo(ship.path)}
      style={{ cursor: 'pointer', position: 'relative' }}
    >
      {/* Engine exhaust glow beneath hull */}
      <motion.div
        animate={{ opacity: hovered ? 0.85 : 0.25, scaleX: hovered ? 1.3 : 0.7 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute', bottom: '-18px',
          left: '20%', right: '20%', height: '40px',
          background: `radial-gradient(ellipse at 50% 0%, ${ship.accent} 0%, ${ship.accent}44 45%, transparent 75%)`,
          filter: 'blur(10px)',
          zIndex: 0,
          transformOrigin: 'center top',
        }}
      />

      {/* Hull */}
      <motion.div
        animate={{
          y: hovered ? -10 : 0,
          filter: hovered
            ? `drop-shadow(0 0 18px ${ship.accent}77) drop-shadow(0 0 40px ${ship.accent}33)`
            : `drop-shadow(0 2px 12px ${ship.accent}22)`,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: 'relative', zIndex: 1,
          clipPath: ship.clipPath,
          background: `linear-gradient(150deg, #0c1428 0%, #04070f 60%, ${ship.accent}0c 100%)`,
          padding: '2rem 2.5rem',
          minHeight: '190px',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          overflow: 'hidden',
        }}
      >
        {/* Interior grid texture */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          backgroundImage: `linear-gradient(${ship.accent}09 1px, transparent 1px), linear-gradient(90deg, ${ship.accent}09 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }} />

        {/* Cockpit window SVG */}
        <svg
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', pointerEvents: 'none', opacity: 0.6 }}
          height="45" viewBox="0 0 300 45" preserveAspectRatio="none"
        >
          <ellipse cx="150" cy="-5" rx="55" ry="28" fill={`${ship.accent}0e`} stroke={`${ship.accent}44`} strokeWidth="0.8" />
          <line x1="95" y1="23" x2="205" y2="23" stroke={`${ship.accent}22`} strokeWidth="0.5" />
          <circle cx="150" cy="10" r="3" fill={`${ship.accent}55`} />
          <motion.circle
            cx="150" cy="10" r="3"
            fill="none" stroke={ship.accent} strokeWidth="0.8"
            animate={{ r: [3, 8, 3], opacity: [0.8, 0, 0.8] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: index * 0.6 }}
          />
        </svg>

        {/* Horizontal accent line across hull */}
        <div style={{
          position: 'absolute', top: '42%', left: 0, right: 0, height: '1px',
          background: `linear-gradient(90deg, transparent 5%, ${ship.accent}18 30%, ${ship.accent}18 70%, transparent 95%)`,
          pointerEvents: 'none',
        }} />

        {/* Scanning line on hover */}
        <motion.div
          animate={hovered ? { top: ['-5%', '110%'] } : { top: '-5%' }}
          transition={hovered ? { duration: 1.8, repeat: Infinity, ease: 'linear' } : {}}
          style={{
            position: 'absolute', left: 0, right: 0, height: '1px',
            background: `linear-gradient(90deg, transparent, ${ship.accent}66, transparent)`,
            pointerEvents: 'none', zIndex: 2,
          }}
        />

        {/* Corner accent */}
        <div style={{
          position: 'absolute', top: 0, right: 0,
          width: '50px', height: '50px',
          background: `linear-gradient(225deg, ${ship.accent}22 0%, transparent 65%)`,
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 3 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: '0.43rem', letterSpacing: '4px',
              color: `${ship.accent}88`, textTransform: 'uppercase',
            }}>
              {ship.code}
            </span>
            {/* Status lights */}
            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: i * 0.4 + index * 0.2 }}
                  style={{
                    width: i === 0 ? '6px' : '4px',
                    height: i === 0 ? '6px' : '4px',
                    borderRadius: '50%',
                    background: i === 0 ? ship.accent : `${ship.accent}55`,
                    boxShadow: i === 0 ? `0 0 6px ${ship.accent}` : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          <motion.h2
            animate={{ color: hovered ? ship.accent : '#f0fbff' }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: 'Orbitron, monospace', fontWeight: 900,
              fontSize: 'clamp(1rem, 2vw, 1.4rem)',
              letterSpacing: '3px', margin: '0 0 0.3rem',
              textShadow: hovered ? `0 0 24px ${ship.accent}99` : 'none',
              transition: 'text-shadow 0.25s',
            }}
          >
            {ship.name}
          </motion.h2>
          <p style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.48rem', letterSpacing: '1px',
            color: 'rgba(255,255,255,0.3)', margin: 0, lineHeight: 1.7,
          }}>
            {ship.subtitle}
          </p>
        </div>

        {/* Bottom panel */}
        <div style={{ position: 'relative', zIndex: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {ship.stats.map(s => (
              <div key={s.label}>
                <div style={{
                  fontFamily: 'Share Tech Mono, monospace',
                  fontSize: '0.36rem', letterSpacing: '2px',
                  color: `${ship.accent}55`, textTransform: 'uppercase', marginBottom: '0.15rem',
                }}>
                  {s.label}
                </div>
                <div style={{
                  fontFamily: 'Orbitron, monospace', fontSize: '0.52rem',
                  fontWeight: 700, color: ship.accent,
                }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          <motion.div
            animate={{ x: hovered ? 6 : 0, opacity: hovered ? 1 : 0.3 }}
            transition={{ duration: 0.2 }}
            style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '1.1rem', color: ship.accent }}
          >
            →
          </motion.div>
        </div>

        {/* Engine stripe at bottom edge */}
        <div style={{
          position: 'absolute', bottom: 0, left: '30%', right: '30%', height: '2px',
          background: `linear-gradient(90deg, transparent, ${ship.accent}99, transparent)`,
        }} />
      </motion.div>
    </motion.div>
  );
}

export default function WorkPage() {
  return (
    <>
      <section className="work-section" style={{
        minHeight: '100vh', background: 'var(--dark)',
        padding: '8rem 4rem 5rem', position: 'relative', overflow: 'hidden',
      }}>
        {/* Atmosphere */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 60% 40% at 20% 60%, rgba(0,245,255,0.04) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 80% 30%, rgba(188,19,254,0.04) 0%, transparent 60%)
          `,
        }} />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div style={{
            fontFamily: 'Share Tech Mono, monospace', fontSize: '0.6rem',
            letterSpacing: '4px', color: 'var(--cyan)', opacity: 0.5,
            textTransform: 'uppercase', marginBottom: '0.75rem',
          }}>
            // Select Mission
          </div>
          <h1 style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: 'clamp(2rem, 4vw, 4rem)',
            fontWeight: 900, color: 'var(--text-main)', letterSpacing: '4px',
            textShadow: '0 0 40px rgba(245,230,66,0.25)',
          }}>
            MY WORK
          </h1>
          <div style={{
            marginTop: '1rem', width: '60px', height: '2px',
            background: 'linear-gradient(90deg, var(--yellow), transparent)',
            boxShadow: '0 0 10px var(--yellow)',
          }} />
        </motion.div>

        {/* Spaceship grid */}
        <div className="work-ships-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '2rem',
          maxWidth: '920px',
        }}>
          {SHIPS.map((ship, i) => (
            <SpaceshipCard key={ship.id} ship={ship} index={i} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
