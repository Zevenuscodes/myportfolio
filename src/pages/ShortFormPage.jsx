import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const PROJECTS = [
  {
    id: 1,
    client: 'Truck Art',
    title: 'Truck Art Sample',
    description: 'A vibrant dive into the subculture of Indian truck art — bold, colourful, unapologetically loud.',
    tags: ['Short Form', 'Documentary', 'Motion'],
    video: '/truckartsample.mp4',
  },
  {
    id: 2,
    client: 'Elon Musk X Nikhil Kamath',
    title: 'Elon Musk X Nikhil Kamath',
    description: 'A sharp, punchy cut of the Elon Musk and Nikhil Kamath conversation.',
    tags: ['Short Form', 'Interview', 'Edit'],
    video: '/video-31.mp4',
  },
];

function VideoCard({ project, index }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  const toggle = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      style={{ display: 'flex', flexDirection: 'column', width: '220px' }}
    >
      {/* 9:16 video card */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={toggle}
        style={{
          position: 'relative',
          width: '220px',
          aspectRatio: '9 / 16',
          background: '#050810',
          clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
          border: `1px solid ${hovered ? 'rgba(0,245,255,0.4)' : 'rgba(0,245,255,0.18)'}`,
          boxShadow: hovered
            ? '0 0 30px rgba(0,245,255,0.15), inset 0 0 20px rgba(0,245,255,0.04)'
            : '0 0 15px rgba(0,245,255,0.05)',
          transition: 'box-shadow 0.3s, border-color 0.3s',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
      >
        <video
          ref={videoRef}
          src={project.video}
          loop
          playsInline
          onEnded={() => setPlaying(false)}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />

        {/* Scanlines */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)',
        }} />

        {/* Play/pause overlay */}
        <motion.div
          animate={{ opacity: playing ? (hovered ? 1 : 0) : 1 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: playing ? 'transparent' : 'rgba(3,4,10,0.4)',
            pointerEvents: 'none',
          }}
        >
          <motion.div
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
            style={{
              width: '44px', height: '44px',
              border: '1.5px solid rgba(0,245,255,0.7)', borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 18px rgba(0,245,255,0.3)', background: 'rgba(3,4,10,0.6)',
            }}
          >
            <span style={{
              fontSize: '0.75rem', color: 'var(--cyan)',
              marginLeft: playing ? '0' : '3px',
              textShadow: '0 0 8px var(--cyan)',
            }}>
              {playing ? '⏸' : '▶'}
            </span>
          </motion.div>
        </motion.div>

        {/* Corner brackets */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '14px', height: '14px', borderTop: '1.5px solid var(--cyan)', borderLeft: '1.5px solid var(--cyan)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '14px', height: '14px', borderBottom: '1.5px solid rgba(188,19,254,0.6)', borderRight: '1.5px solid rgba(188,19,254,0.6)', pointerEvents: 'none' }} />

        {/* Playing dot */}
        {playing && (
          <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', alignItems: 'center', gap: '5px', pointerEvents: 'none' }}>
            <motion.div
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 6px var(--cyan)' }}
            />
          </div>
        )}

        {/* Tags overlay at bottom */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '1.5rem 0.75rem 0.75rem',
          background: 'linear-gradient(to top, rgba(3,4,10,0.85) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}>
          <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: 'Share Tech Mono, monospace',
                fontSize: '0.38rem', letterSpacing: '1.5px',
                color: 'rgba(0,245,255,0.6)', textTransform: 'uppercase',
                border: '1px solid rgba(0,245,255,0.2)',
                padding: '0.15rem 0.35rem',
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Info below card */}
      <div style={{ marginTop: '0.75rem' }}>
        <div style={{
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: '0.45rem', letterSpacing: '3px',
          color: 'rgba(0,245,255,0.4)', textTransform: 'uppercase', marginBottom: '0.2rem',
        }}>
          {project.client}
        </div>
        <div style={{
          fontFamily: 'Orbitron, monospace', fontSize: '0.7rem', fontWeight: 700,
          color: 'var(--text-main)', letterSpacing: '1px',
        }}>
          {project.title}
        </div>
      </div>
    </motion.div>
  );
}

export default function ShortFormPage() {
  return (
    <>
      <section className="subpage-section" style={{
        minHeight: '100vh', background: 'var(--dark)',
        padding: '9rem 4rem 4rem', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 50% 40% at 80% 20%, rgba(188,19,254,0.05) 0%, transparent 60%)',
        }} />

        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '4rem' }}
          >
            <div style={{
              fontFamily: 'Share Tech Mono, monospace', fontSize: '0.52rem',
              letterSpacing: '5px', color: 'rgba(0,245,255,0.4)',
              textTransform: 'uppercase', marginBottom: '0.75rem',
              display: 'flex', alignItems: 'center', gap: '0.75rem',
            }}>
              <span style={{ display: 'inline-block', width: '24px', height: '1px', background: 'var(--cyan)', opacity: 0.4 }} />
              Work / Short Form
            </div>
            <h1 style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              fontWeight: 900, letterSpacing: '4px',
              color: 'var(--text-main)',
              textShadow: '0 0 40px rgba(245,230,66,0.2)',
              marginBottom: '1rem',
            }}>
              SHORT FORM
            </h1>
            <div style={{
              width: '60px', height: '2px',
              background: 'linear-gradient(90deg, var(--yellow), transparent)',
              boxShadow: '0 0 10px var(--yellow)',
            }} />
          </motion.div>

          {/* Card grid */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
            {PROJECTS.map((project, i) => (
              <VideoCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
