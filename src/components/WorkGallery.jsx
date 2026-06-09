import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const PROJECTS = [
  {
    id: 1, featured: true,
    cat: 'Brand Film', title: 'ECLIPSE — Corporate Identity Launch',
    year: '2024', tags: ['4K', 'Color Grade', 'Motion FX'],
    accentColor: '#00f5ff',
    bg: 'linear-gradient(135deg, #03040a, #0a0520)',
    svgLines: [
      { x1: 100, y1: 338, x2: 200, y2: 0, color: '#00f5ff', op: 0.4 },
      { x1: 300, y1: 338, x2: 400, y2: 0, color: '#bc13fe', op: 0.3 },
      { x1: 500, y1: 338, x2: 600, y2: 0, color: '#00f5ff', op: 0.2 },
    ],
  },
  {
    id: 2, featured: false,
    cat: 'Music Video', title: 'VOLTAGE — Underground EP',
    year: '2024', tags: ['VFX', 'Grade'],
    accentColor: '#ff006e',
    bg: 'linear-gradient(135deg, #03040a, #1a0a05)',
  },
  {
    id: 3, featured: false,
    cat: 'Social Content', title: 'VIRAL — Short-Form Series',
    year: '2024', tags: ['Reels', 'Shorts'],
    accentColor: '#bc13fe',
    bg: 'linear-gradient(135deg, #03040a, #05101a)',
  },
  {
    id: 4, featured: false,
    cat: 'Documentary', title: 'SIGNAL — Short Doc',
    year: '2023', tags: ['Award', 'Cut'],
    accentColor: '#f5e642',
    bg: 'linear-gradient(135deg, #03040a, #0a0520)',
  },
  {
    id: 5, featured: true,
    cat: 'Commercial', title: '2024 SHOWREEL — Full Commercial Package',
    year: '2024', tags: ['4K HDR', 'Sound Design', 'Grade'],
    accentColor: '#00f5ff',
    bg: 'linear-gradient(135deg, #03040a, #050a1a)',
  },
];

function ThumbArt({ project }) {
  const { accentColor, bg } = project;
  return (
    <div style={{
      width: '100%', height: '100%',
      background: bg,
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${accentColor}0f 1px, transparent 1px), linear-gradient(90deg, ${accentColor}0f 1px, transparent 1px)`,
        backgroundSize: '24px 24px',
      }} />
      {/* SVG decoration */}
      <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} viewBox="0 0 300 180" fill="none">
        <circle cx="150" cy="90" r="55" stroke={accentColor} strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="4 4" />
        <circle cx="150" cy="90" r="30" stroke={accentColor} strokeWidth="0.5" strokeOpacity="0.2" />
        <circle cx="150" cy="90" r="10" fill={`${accentColor}33`} stroke={accentColor} strokeWidth="1" />
        <line x1="50" y1="50" x2="150" y2="90" stroke={accentColor} strokeWidth="0.5" strokeOpacity="0.35" />
        <line x1="250" y1="130" x2="150" y2="90" stroke={accentColor} strokeWidth="0.5" strokeOpacity="0.35" />
        <line x1="150" y1="20" x2="150" y2="90" stroke={accentColor} strokeWidth="0.5" strokeOpacity="0.2" />
      </svg>
      {/* Label */}
      <div style={{
        position: 'absolute', bottom: '1rem', left: '1rem',
        fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem',
        letterSpacing: '2px', color: accentColor,
        textShadow: `0 0 15px ${accentColor}`,
        textTransform: 'uppercase',
      }}>
        {project.cat.toUpperCase()}
      </div>
      {/* Bottom bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, ${accentColor}, #bc13fe)`,
      }} />
    </div>
  );
}

function WorkCard({ project, delay }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, borderColor: project.accentColor }}
      style={{
        gridColumn: project.featured ? 'span 2' : 'span 1',
        background: '#080d1a',
        border: '1px solid rgba(0,245,255,0.1)',
        clipPath: 'polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 18px 100%, 0 calc(100% - 18px))',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.3s',
      }}
    >
      {/* Thumbnail */}
      <div style={{ aspectRatio: '16/9', position: 'relative', overflow: 'hidden' }}>
        <ThumbArt project={project} />
        {/* Hover play overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,245,255,0.04)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'opacity 0.3s',
          }}
        >
          <div style={{
            width: '52px', height: '52px', borderRadius: '50%',
            border: `2px solid ${project.accentColor}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: `${project.accentColor}22`,
          }}>
            <div style={{
              borderLeft: `18px solid ${project.accentColor}`,
              borderTop: '10px solid transparent',
              borderBottom: '10px solid transparent',
              marginLeft: '4px',
            }} />
          </div>
        </motion.div>
      </div>

      {/* Card body */}
      <div style={{ padding: '1.2rem 1.4rem' }}>
        <div style={{
          fontFamily: 'Share Tech Mono, monospace', fontSize: '0.58rem',
          letterSpacing: '3px', color: project.accentColor,
          textTransform: 'uppercase', marginBottom: '0.5rem',
        }}>
          {project.cat}
        </div>
        <div style={{
          fontFamily: 'Orbitron, monospace', fontSize: '0.9rem',
          fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.75rem',
        }}>
          {project.title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
            {project.year}
          </span>
          {project.tags.map((tag) => (
            <span key={tag} style={{
              fontFamily: 'Share Tech Mono, monospace', fontSize: '0.55rem',
              padding: '0.2rem 0.6rem',
              border: `1px solid ${project.accentColor}44`,
              color: project.accentColor, letterSpacing: '1px',
            }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function WorkGallery() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="work" className="work-gallery-section" style={{ padding: '7rem 4rem', maxWidth: '1300px', margin: '0 auto' }}>
      <div ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '3.5rem' }}
        >
          <div style={{
            fontFamily: 'Share Tech Mono, monospace', fontSize: '0.62rem',
            letterSpacing: '4px', color: 'var(--pink)', textTransform: 'uppercase',
            marginBottom: '0.8rem',
          }}>
            // Selected Work
          </div>
          <h2 style={{
            fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.8rem, 3vw, 3rem)',
            fontWeight: 700, color: 'var(--text-main)', position: 'relative',
          }}>
            THE ARCHIVES
            <div style={{
              position: 'absolute', bottom: '-1rem', left: 0,
              width: '60px', height: '2px',
              background: 'linear-gradient(90deg, var(--cyan), transparent)',
            }} />
          </h2>
        </motion.div>

        <div className="work-gallery-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
        }}>
          {PROJECTS.map((p, i) => (
            <WorkCard key={p.id} project={p} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
