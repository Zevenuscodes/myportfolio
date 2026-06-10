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
      style={{ marginBottom: '5rem', position: 'relative' }}
    >
      {/* Project meta */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '1.5rem',
        marginBottom: '1.2rem',
      }}>
        <span style={{
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: '0.48rem', letterSpacing: '4px',
          color: 'rgba(0,245,255,0.35)', textTransform: 'uppercase',
        }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div style={{ flex: 1, height: '1px', background: 'rgba(0,245,255,0.08)' }} />
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: '0.42rem', letterSpacing: '2px',
              color: 'rgba(0,245,255,0.4)', textTransform: 'uppercase',
              border: '1px solid rgba(0,245,255,0.15)',
              padding: '0.2rem 0.5rem',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Engine glow */}
      <motion.div animate={{ opacity: hovered ? 0.8 : 0.2, scaleX: hovered ? 1.4 : 0.8 }} transition={{ duration: 0.4 }}
        style={{ position: 'absolute', bottom: '-16px', left: '20%', right: '20%', height: '35px', background: 'radial-gradient(ellipse at 50% 0%, rgba(0,245,255,0.9) 0%, rgba(0,245,255,0.3) 50%, transparent 75%)', filter: 'blur(10px)', zIndex: 0, transformOrigin: 'center top' }} />

      {/* Video frame */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={toggle}
        style={{
          position: 'relative', zIndex: 1,
          width: '100%',
          background: '#050810',
          clipPath: 'polygon(14px 0%, calc(100% - 14px) 0%, 100% 14px, 100% calc(100% - 14px), calc(100% - 14px) 100%, 14px 100%, 0% calc(100% - 14px), 0% 14px)',
          border: `1px solid ${hovered ? 'rgba(0,245,255,0.4)' : 'rgba(0,245,255,0.18)'}`,
          boxShadow: hovered ? '0 0 40px rgba(0,245,255,0.15)' : '0 0 20px rgba(0,245,255,0.05)',
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
          style={{ width: '100%', display: 'block' }}
        />

        {/* Grid texture */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(0,245,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.04) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
        {/* Scanlines */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.04) 3px, rgba(0,0,0,0.04) 4px)' }} />
        {/* Status lights */}
        <div style={{ position: 'absolute', top: '12px', left: '14px', display: 'flex', gap: '5px', zIndex: 4, pointerEvents: 'none' }}>
          {[0,1,2].map(i => (
            <motion.div key={i} animate={{ opacity: [1,0.2,1] }} transition={{ repeat: Infinity, duration: 2, delay: i*0.35 }}
              style={{ width: i===0?'7px':'5px', height: i===0?'7px':'5px', borderRadius: '50%', background: i===0?'rgba(0,245,255,1)':'rgba(0,245,255,0.4)', boxShadow: i===0?'0 0 7px rgba(0,245,255,0.9)':'none' }} />
          ))}
        </div>
        {/* Scan sweep */}
        {hovered && <motion.div animate={{ top: ['-3%', '108%'] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }} style={{ position: 'absolute', left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.55), transparent)', pointerEvents: 'none', zIndex: 3 }} />}
        {/* Engine stripe */}
        <div style={{ position: 'absolute', bottom: 0, left: '25%', right: '25%', height: '2px', background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.8), transparent)', pointerEvents: 'none', zIndex: 4 }} />

        {/* Play/pause overlay */}
        <motion.div
          animate={{ opacity: playing ? (hovered ? 1 : 0) : 1 }}
          transition={{ duration: 0.2 }}
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: playing ? 'transparent' : 'rgba(3,4,10,0.45)',
            pointerEvents: 'none',
          }}
        >
          <motion.div
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
            style={{
              width: '64px', height: '64px',
              border: '1.5px solid rgba(0,245,255,0.7)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 24px rgba(0,245,255,0.3)',
              background: 'rgba(3,4,10,0.6)',
            }}
          >
            <span style={{
              fontSize: '1rem', color: 'var(--cyan)',
              marginLeft: playing ? '0' : '4px',
              textShadow: '0 0 10px var(--cyan)',
            }}>
              {playing ? '⏸' : '▶'}
            </span>
          </motion.div>
        </motion.div>

        {/* Corner brackets */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', borderTop: '2px solid var(--cyan)', borderLeft: '2px solid var(--cyan)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px', borderBottom: '2px solid rgba(188,19,254,0.6)', borderRight: '2px solid rgba(188,19,254,0.6)', pointerEvents: 'none' }} />

        {/* Playing indicator */}
        {playing && (
          <div style={{
            position: 'absolute', top: '14px', right: '14px',
            display: 'flex', alignItems: 'center', gap: '6px',
            pointerEvents: 'none',
          }}>
            <motion.div
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.2 }}
              style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 8px var(--cyan)' }}
            />
            <span style={{
              fontFamily: 'Share Tech Mono, monospace',
              fontSize: '0.42rem', letterSpacing: '3px',
              color: 'var(--cyan)', textTransform: 'uppercase',
            }}>
              Playing
            </span>
          </div>
        )}
      </div>

      {/* Project info */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
        marginTop: '1.2rem',
      }}>
        <div>
          <div style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.5rem', letterSpacing: '4px',
            color: 'rgba(0,245,255,0.4)', textTransform: 'uppercase',
            marginBottom: '0.3rem',
          }}>
            {project.client}
          </div>
          <h3 style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: '1rem', fontWeight: 700,
            color: 'var(--text-main)', letterSpacing: '2px',
            margin: 0,
          }}>
            {project.title}
          </h3>
          <p style={{
            fontFamily: 'Share Tech Mono, monospace',
            fontSize: '0.6rem', lineHeight: '1.8',
            color: 'rgba(255,255,255,0.3)', letterSpacing: '0.3px',
            marginTop: '0.4rem', maxWidth: '500px', marginBottom: 0,
          }}>
            {project.description}
          </p>
        </div>
        <div style={{
          fontFamily: 'Share Tech Mono, monospace',
          fontSize: '0.42rem', letterSpacing: '3px',
          color: 'rgba(255,255,255,0.15)', textTransform: 'uppercase',
          textAlign: 'right', flexShrink: 0,
        }}>
          Click to {playing ? 'pause' : 'play'}
        </div>
      </div>
    </motion.div>
  );
}

export default function SaasExplainersPage() {
  return (
    <>
      <section className="subpage-section" style={{
        minHeight: '100vh',
        background: 'var(--dark)',
        padding: '9rem 4rem 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 50% 40% at 80% 20%, rgba(0,245,255,0.05) 0%, transparent 60%)',
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
              Work / SaaS Explainers
            </div>
            <h1 style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
              fontWeight: 900, letterSpacing: '4px',
              color: 'var(--text-main)',
              textShadow: '0 0 40px rgba(245,230,66,0.2)',
              marginBottom: '1rem',
            }}>
              SAAS EXPLAINERS
            </h1>
            <div style={{
              width: '60px', height: '2px',
              background: 'linear-gradient(90deg, var(--yellow), transparent)',
              boxShadow: '0 0 10px var(--yellow)',
            }} />
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
