import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const PROJECTS = [
  {
    id: 1,
    client: 'PayPal',
    title: 'Product Walkthrough',
    description: "SaaS explainer breaking down PayPal's core flow — clean, punchy, conversion-focused.",
    tags: ['SaaS', 'Explainer', 'Motion'],
    video: '/paypal.mp4',
  },
];

function VideoCard({ project, index }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  const toggle = () => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else { videoRef.current.play(); setPlaying(true); }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ marginBottom: '5rem' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.2rem' }}>
        <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.48rem', letterSpacing: '4px', color: 'rgba(245,230,66,0.35)', textTransform: 'uppercase' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(245,230,66,0.08)' }} />
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: 'Share Tech Mono, monospace', fontSize: '0.42rem', letterSpacing: '2px',
              color: 'rgba(245,230,66,0.5)', textTransform: 'uppercase',
              border: '1px solid rgba(245,230,66,0.2)', padding: '0.2rem 0.5rem',
            }}>{tag}</span>
          ))}
        </div>
      </div>

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={toggle}
        style={{
          position: 'relative', width: '100%', background: '#050810',
          clipPath: 'polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 28px 100%, 0 calc(100% - 28px))',
          border: `1px solid ${hovered ? 'rgba(245,230,66,0.4)' : 'rgba(245,230,66,0.18)'}`,
          boxShadow: hovered ? '0 0 40px rgba(245,230,66,0.12)' : '0 0 20px rgba(245,230,66,0.05)',
          transition: 'box-shadow 0.3s, border-color 0.3s', cursor: 'pointer', overflow: 'hidden',
        }}
      >
        <video ref={videoRef} src={project.video} loop playsInline onEnded={() => setPlaying(false)} style={{ width: '100%', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)' }} />

        <motion.div
          animate={{ opacity: playing ? (hovered ? 1 : 0) : 1 }}
          transition={{ duration: 0.2 }}
          style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: playing ? 'transparent' : 'rgba(3,4,10,0.45)', pointerEvents: 'none' }}
        >
          <motion.div
            animate={{ scale: hovered ? 1.1 : 1 }}
            style={{ width: '64px', height: '64px', border: '1.5px solid rgba(245,230,66,0.7)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 24px rgba(245,230,66,0.3)', background: 'rgba(3,4,10,0.6)' }}
          >
            <span style={{ fontSize: '1rem', color: 'var(--yellow)', marginLeft: playing ? '0' : '4px' }}>
              {playing ? '⏸' : '▶'}
            </span>
          </motion.div>
        </motion.div>

        <div style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', borderTop: '2px solid var(--yellow)', borderLeft: '2px solid var(--yellow)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px', borderBottom: '2px solid rgba(188,19,254,0.6)', borderRight: '2px solid rgba(188,19,254,0.6)', pointerEvents: 'none' }} />

        {playing && (
          <div style={{ position: 'absolute', top: '14px', right: '14px', display: 'flex', alignItems: 'center', gap: '6px', pointerEvents: 'none' }}>
            <motion.div animate={{ opacity: [1, 0.2, 1] }} transition={{ repeat: Infinity, duration: 1.2 }} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--yellow)', boxShadow: '0 0 8px var(--yellow)' }} />
            <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.42rem', letterSpacing: '3px', color: 'var(--yellow)', textTransform: 'uppercase' }}>Playing</span>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '1.2rem' }}>
        <div>
          <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.5rem', letterSpacing: '4px', color: 'rgba(245,230,66,0.5)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{project.client}</div>
          <h3 style={{ fontFamily: 'Orbitron, monospace', fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '2px', margin: 0 }}>{project.title}</h3>
          <p style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.6rem', lineHeight: '1.8', color: 'rgba(255,255,255,0.3)', marginTop: '0.4rem', maxWidth: '500px', marginBottom: 0 }}>{project.description}</p>
        </div>
        <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.42rem', letterSpacing: '3px', color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase', flexShrink: 0 }}>
          Click to {playing ? 'pause' : 'play'}
        </div>
      </div>
    </motion.div>
  );
}

export default function MotionDesignsPage() {
  return (
    <>
      <section className="subpage-section" style={{
        minHeight: '100vh', background: 'var(--dark)',
        padding: '9rem 4rem 4rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 50% 40% at 80% 20%, rgba(245,230,66,0.05) 0%, transparent 60%)' }} />
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ marginBottom: '4rem' }}>
            <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.52rem', letterSpacing: '5px', color: 'rgba(245,230,66,0.5)', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--yellow)', opacity: 0.4 }} />
              Work / Motion Graphics
            </div>
            <h1 style={{ fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', fontWeight: 900, letterSpacing: '4px', color: 'var(--text-main)', textShadow: '0 0 40px rgba(245,230,66,0.25)', marginBottom: '1rem' }}>
              MOTION GRAPHICS
            </h1>
            <div style={{ width: '60px', height: '2px', background: 'linear-gradient(90deg, var(--yellow), transparent)', boxShadow: '0 0 10px var(--yellow)' }} />
          </motion.div>
          {PROJECTS.map((project, i) => (
            <VideoCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}
