import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const SKILLS = [
  { label: 'Motion Design',    tools: 'After Effects · Premiere Pro' },
  { label: 'SaaS Explainers',  tools: 'After Effects · Figma' },
  { label: 'Music Videos',     tools: 'Premiere · DaVinci Resolve' },
  { label: 'Visualisers',      tools: 'After Effects · Cinema 4D' },
  { label: 'Longform',         tools: 'Premiere · DaVinci Resolve' },
  { label: 'Color Grading',    tools: 'DaVinci Resolve' },
];

const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

export default function AboutPage() {
  return (
    <>
      <section className="about-section" style={{
        minHeight: '100vh',
        background: 'var(--dark)',
        padding: '9rem 4rem 5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Background atmosphere */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 50% 60% at 80% 40%, rgba(0,245,255,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 40% 50% at 10% 70%, rgba(188,19,254,0.05) 0%, transparent 60%)
          `,
        }} />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          style={{ maxWidth: '1000px', margin: '0 auto' }}
        >
          {/* ── Top label ── */}
          <motion.div variants={item} style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.52rem', letterSpacing: '5px',
            color: 'rgba(0,245,255,0.45)', textTransform: 'uppercase',
            marginBottom: '0.75rem',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
          }}>
            <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--cyan)', opacity: 0.4 }} />
            About
          </motion.div>

          {/* ── Two-column layout ── */}
          <div className="about-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 420px',
            gap: '5rem',
            alignItems: 'flex-start',
          }}>

            {/* Left — text */}
            <div>
              {/* Name */}
              <motion.h1 variants={item} style={{
                fontFamily: 'Orbitron, monospace',
                fontSize: 'clamp(2rem, 4vw, 3.2rem)',
                fontWeight: 900, letterSpacing: '4px',
                color: 'var(--text-main)',
                textShadow: '0 0 40px rgba(245,230,66,0.15)',
                marginBottom: '0.2rem', lineHeight: 1.1,
              }}>
                YASH JOSHI
              </motion.h1>

              <motion.div variants={item} style={{
                fontFamily: 'Share Tech Mono, monospace',
                fontSize: '0.6rem', letterSpacing: '4px',
                color: 'var(--cyan)', textTransform: 'uppercase',
                marginBottom: '2rem',
                textShadow: '0 0 10px rgba(0,245,255,0.5)',
              }}>
                aka DARZEEEEEEE
              </motion.div>

              <motion.div variants={item} style={{
                width: '50px', height: '2px', marginBottom: '3rem',
                background: 'linear-gradient(90deg, var(--cyan), transparent)',
                boxShadow: '0 0 10px var(--cyan)',
              }} />

              {/* Floating retro words */}
              <style>{`@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');`}</style>
              <motion.div variants={item} style={{ position: 'relative', height: '220px', marginBottom: '3rem' }}>
                {[
                  { word: 'I',      color: '#00f5ff', top: '0px',   left: '0px',   size: '2.8rem', x: [0,18,-12,6,0],   y: [0,-22,12,-8,0],   dur: 7,   delay: 0   },
                  { word: 'STITCH', color: '#f5e642', top: '65px',  left: '40px',  size: '2.1rem', x: [0,-14,22,-6,0],  y: [0,18,-28,10,0],   dur: 9,   delay: 0.8 },
                  { word: 'VIDEOS', color: '#ff006e', top: '140px', left: '10px',  size: '2.3rem', x: [0,22,-16,10,0],  y: [0,-14,20,-10,0],  dur: 8,   delay: 0.4 },
                ].map(({ word, color, top, left, size, x, y, dur, delay }) => (
                  <motion.div
                    key={word}
                    animate={{ x, y }}
                    transition={{ repeat: Infinity, duration: dur, delay, ease: 'easeInOut' }}
                    style={{
                      position: 'absolute', top, left,
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: size,
                      color,
                      textShadow: `0 0 18px ${color}, 0 0 40px ${color}66`,
                      letterSpacing: '2px',
                      userSelect: 'none',
                    }}
                  >
                    {word}
                  </motion.div>
                ))}
              </motion.div>

              {/* Capabilities label */}
              <motion.div variants={item} style={{
                fontFamily: 'Share Tech Mono, monospace',
                fontSize: '0.48rem', letterSpacing: '4px',
                color: 'rgba(0,245,255,0.35)', textTransform: 'uppercase',
                marginBottom: '1rem',
              }}>
                // Capabilities
              </motion.div>

              {/* Skills grid */}
              <motion.div variants={container} style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '0.5rem',
              }}>
                {SKILLS.map((s) => (
                  <motion.div
                    key={s.label}
                    variants={item}
                    whileHover={{ borderColor: 'rgba(0,245,255,0.45)', y: -4 }}
                    style={{
                      background: 'rgba(8,14,28,0.95)',
                      border: '1px solid rgba(0,245,255,0.12)',
                      padding: '0.8rem 1rem',
                      clipPath: 'polygon(8px 0%, calc(100% - 8px) 0%, 100% 8px, 100% calc(100% - 8px), calc(100% - 8px) 100%, 8px 100%, 0% calc(100% - 8px), 0% 8px)',
                      transition: 'border-color 0.2s, transform 0.2s',
                      position: 'relative', overflow: 'hidden',
                    }}
                  >
                    {/* Grid texture */}
                    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)', backgroundSize: '14px 14px' }} />
                    {/* Engine stripe */}
                    <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.5), transparent)', pointerEvents: 'none' }} />
                    {/* Status dot */}
                    <motion.div animate={{ opacity: [1,0.2,1] }} transition={{ repeat: Infinity, duration: 2.5 }}
                      style={{ position: 'absolute', top: '8px', right: '8px', width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(0,245,255,0.7)', boxShadow: '0 0 5px rgba(0,245,255,0.6)' }} />
                    <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.58rem', fontWeight: 700, color: '#fff', letterSpacing: '1px', position: 'relative', zIndex: 1 }}>
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right — photo */}
            <motion.div
              variants={item}
              style={{ position: 'sticky', top: '7rem' }}
            >
              {/* Outer glow frame */}
              <div style={{
                position: 'relative',
                clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))',
                boxShadow: '0 0 40px rgba(0,245,255,0.12), 0 0 80px rgba(0,245,255,0.05)',
              }}>
                {/* Cyan corner accent lines */}
                <div style={{
                  position: 'absolute', top: 0, left: 0,
                  width: '40px', height: '40px',
                  borderTop: '2px solid var(--cyan)',
                  borderLeft: '2px solid var(--cyan)',
                  zIndex: 2,
                }} />
                <div style={{
                  position: 'absolute', bottom: 0, right: 0,
                  width: '40px', height: '40px',
                  borderBottom: '2px solid rgba(188,19,254,0.7)',
                  borderRight: '2px solid rgba(188,19,254,0.7)',
                  zIndex: 2,
                }} />

                {/* Photo */}
                <img
                  src="/yash.jpg"
                  alt="Yash Joshi"
                  style={{
                    width: '100%',
                    display: 'block',
                    filter: 'grayscale(20%) contrast(1.05)',
                    objectFit: 'cover',
                    aspectRatio: '16/10',
                  }}
                />

                {/* Scanline overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)',
                  pointerEvents: 'none', zIndex: 1,
                }} />

                {/* Subtle cyan tint overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(135deg, rgba(0,245,255,0.04) 0%, transparent 50%, rgba(188,19,254,0.04) 100%)',
                  pointerEvents: 'none', zIndex: 1,
                }} />
              </div>

              {/* Caption */}
              <div style={{
                marginTop: '0.75rem',
                fontFamily: 'Share Tech Mono, monospace',
                fontSize: '0.48rem', letterSpacing: '3px',
                color: 'rgba(0,245,255,0.3)', textTransform: 'uppercase',
                textAlign: 'right',
              }}>
                Yash Joshi — somewhere above the clouds
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>
      <Footer />
    </>
  );
}
