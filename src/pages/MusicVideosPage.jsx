import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

export default function MusicVideosPage() {
  return (
    <>
      <section className="subpage-section" style={{
        minHeight: '100vh', background: 'var(--dark)',
        padding: '9rem 4rem 4rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 50% 40% at 80% 20%, rgba(255,0,110,0.06) 0%, transparent 60%)' }} />

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: '4rem' }}>
            <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.52rem', letterSpacing: '5px', color: 'rgba(255,0,110,0.5)', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--pink)', opacity: 0.4 }} />
              Work / Music Videos
            </div>
            <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 900, letterSpacing: '4px', color: 'var(--text-main)', textShadow: '0 0 40px rgba(255,0,110,0.25)', marginBottom: '1rem' }}>
              MUSIC VIDEOS
            </h1>
            <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, var(--pink), transparent)', boxShadow: '0 0 10px var(--pink)' }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{
              position: 'relative',
              clipPath: 'polygon(14px 0%, calc(100% - 14px) 0%, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0% calc(100% - 14px), 0% 14px)',
              border: '1px solid rgba(255,0,110,0.2)',
              background: 'rgba(8,3,15,0.9)',
              padding: '4rem 3rem',
              textAlign: 'center',
            }}
          >
            {/* Grid texture */}
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(255,0,110,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,110,0.03) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            {/* Engine stripe */}
            <div style={{ position: 'absolute', bottom: 0, left: '25%', right: '25%', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(255,0,110,0.8), transparent)' }} />
            {/* Status lights */}
            <div style={{ position: 'absolute', top: '14px', left: '16px', display: 'flex', gap: '5px' }}>
              {[0,1,2].map(i => (
                <motion.div key={i} animate={{ opacity: [1,0.2,1] }} transition={{ repeat: Infinity, duration: 2, delay: i*0.35 }}
                  style={{ width: i===0?'7px':'5px', height: i===0?'7px':'5px', borderRadius: '50%', background: i===0?'rgba(255,0,110,1)':'rgba(255,0,110,0.4)', boxShadow: i===0?'0 0 7px rgba(255,0,110,0.9)':'none' }} />
              ))}
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.55rem', letterSpacing: '6px', color: 'rgba(255,0,110,0.6)', textTransform: 'uppercase', marginBottom: '1.5rem' }}
              >
                // Uploading...
              </motion.div>
              <div style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', fontWeight: 900, letterSpacing: '4px', color: 'var(--text-main)', textShadow: '0 0 30px rgba(255,0,110,0.4)', marginBottom: '1rem' }}>
                COMING SOON
              </div>
              <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', letterSpacing: '2px' }}>
                Full music video productions loading...
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
}
