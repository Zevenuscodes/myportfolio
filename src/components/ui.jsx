import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { DEFAULT_RATIO } from '../data/projects';

export const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export function PageHeader({ eyebrow, title, aside }) {
  return (
    <motion.header
      variants={stagger}
      initial="hidden"
      animate="show"
      style={{ marginBottom: 'clamp(3rem, 7vw, 6rem)' }}
    >
      <motion.div
        variants={fadeUp}
        className="eyebrow"
        style={{
          display: 'flex', justifyContent: 'space-between', gap: '1rem',
          paddingBottom: '1rem', marginBottom: '2rem',
          borderBottom: '1px solid var(--rule)',
        }}
      >
        <span>{eyebrow}</span>
        {aside && <span>{aside}</span>}
      </motion.div>
      <motion.h1
        variants={fadeUp}
        className="display"
        style={{ fontSize: 'clamp(3.25rem, 10vw, 9rem)' }}
      >
        {title}
      </motion.h1>
    </motion.header>
  );
}

const canHover = typeof window !== 'undefined' && window.matchMedia('(hover: hover)').matches;

export function VideoProject({ project, index }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Hover: silent preview from the start. Click: play with sound.
  const startPreview = () => {
    setHovered(true);
    const v = videoRef.current;
    if (!canHover || !v || playing) return;
    v.muted = true;
    v.currentTime = 0;
    v.play().then(() => setPreviewing(true)).catch(() => {});
  };

  const stopPreview = () => {
    setHovered(false);
    const v = videoRef.current;
    if (!v || playing) return;
    v.pause();
    v.currentTime = 0.1;
    setPreviewing(false);
  };

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
      setPlaying(false);
      return;
    }
    v.muted = false;
    v.play().catch(() => {});
    setPlaying(true);
    setPreviewing(false);
  };

  const label = playing ? 'Pause' : previewing ? 'Play with sound' : 'Play';

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: EASE, delay: (index % 2) * 0.08 }}
    >
      <button
        type="button"
        onClick={toggle}
        onMouseEnter={startPreview}
        onMouseLeave={stopPreview}
        aria-label={`${playing ? 'Pause' : 'Play'} ${project.title}`}
        style={{
          position: 'relative', display: 'block', width: '100%',
          background: 'var(--ink)', overflow: 'hidden', padding: 0,
          aspectRatio: project.ratio || DEFAULT_RATIO,
        }}
      >
        <motion.video
          ref={videoRef}
          src={`${project.video}#t=0.1`}
          loop
          playsInline
          preload="metadata"
          onEnded={() => setPlaying(false)}
          animate={{ scale: hovered && !playing ? 1.03 : 1 }}
          transition={{ duration: 0.9, ease: EASE }}
          style={{
            width: '100%', height: '100%', display: 'block',
            objectFit: playing ? 'contain' : 'cover',
          }}
        />

        <motion.span
          animate={{ opacity: playing && !hovered ? 0 : 1 }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'absolute', left: '1rem', bottom: '1rem',
            display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.55rem 0.9rem 0.55rem 0.75rem',
            background: 'var(--bg)', color: 'var(--ink)',
            fontSize: '0.72rem', fontWeight: 500,
            letterSpacing: '0.12em', textTransform: 'uppercase',
            pointerEvents: 'none',
          }}
        >
          <span style={{
            width: '0.5rem', height: '0.5rem', borderRadius: '50%',
            background: playing || previewing ? 'var(--accent)' : 'var(--ink)',
          }} />
          {label}
        </motion.span>

        {project.kicker && (
          <span
            className="eyebrow"
            style={{
              position: 'absolute', top: '1rem', right: '1rem',
              padding: '0.4rem 0.65rem', background: 'var(--bg)', color: 'var(--ink)',
              pointerEvents: 'none',
            }}
          >
            {project.kicker}
          </span>
        )}
      </button>

      <div style={{
        display: 'grid', gridTemplateColumns: '2.5rem 1fr', gap: '0.5rem 1rem',
        paddingTop: '1rem', marginTop: '1rem', borderTop: '1px solid var(--rule)',
      }}>
        <span className="eyebrow" style={{ paddingTop: '0.35rem' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div>
          <h3 className="display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.05 }}>
            {project.title}
          </h3>
          {project.client && project.client !== project.title && (
            <div style={{ marginTop: '0.35rem', color: 'var(--ink-soft)', fontSize: '0.95rem' }}>
              {project.client}
            </div>
          )}
          {project.description && (
            <p style={{ marginTop: '0.6rem', color: 'var(--muted)', fontSize: '0.95rem', maxWidth: '46ch' }}>
              {project.description}
            </p>
          )}
          {project.tags?.length > 0 && (
            <div className="eyebrow" style={{ marginTop: '0.9rem' }}>
              {project.tags.join('  /  ')}
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function IndexRow({ item, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: EASE, delay: index * 0.06 }}
      className="index-row"
      style={{
        width: '100%', textAlign: 'left',
        padding: 'clamp(1rem, 2.5vw, 1.75rem) 0',
        borderTop: '1px solid var(--rule)',
        borderBottom: '1px solid var(--rule)',
        marginTop: '-1px',
      }}
    >
      <span className="eyebrow">{String(index + 1).padStart(2, '0')}</span>
      <span
        className="display"
        style={{
          fontSize: 'clamp(2.25rem, 6vw, 5rem)',
          fontStyle: hovered ? 'italic' : 'normal',
          color: hovered ? 'var(--accent)' : 'var(--ink)',
          transform: `translateX(${hovered ? '0.5rem' : '0'})`,
          transition: 'color 0.3s, transform 0.5s cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        {item.label}
      </span>
      <span style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        {item.note && (
          <span className="eyebrow nav-desktop">{item.note}</span>
        )}
        <span style={{
          fontSize: '1.5rem',
          transform: `rotate(${hovered ? '0deg' : '-45deg'})`,
          transition: 'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
        }}>
          →
        </span>
      </span>
    </motion.button>
  );
}
