import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const VISUALIZERS = [
  {
    id: 1,
    title: 'GOR3- HURRICANE',
    tag: 'Music Visualiser',
    accentColor: '#bc13fe',
    videoSrc: '/visualiser.mp4',
    thumbnail: '/gor3-hurricane-thumb.svg',
  },
  {
    id: 2,
    title: 'MUJHE YE GAANA PASAND HAI',
    tag: 'Music Visualiser',
    accentColor: '#00f5ff',
    videoSrc: '/visualiser2.mp4',
    thumbnail: null,
  },
  {
    id: 3,
    title: 'DARZEEEEEEE INTO THE SPIDERVERSE',
    tag: 'Music Visualiser',
    accentColor: '#f5e642',
    videoSrc: '/video-193.mp4',
    thumbnail: null,
  },
];

function CornerBracket({ position, color }) {
  const styles = {
    'top-left':    { top: 0, left: 0, borderTop: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
    'top-right':   { top: 0, right: 0, borderTop: `2px solid ${color}`, borderRight: `2px solid ${color}` },
    'bottom-left': { bottom: 0, left: 0, borderBottom: `2px solid ${color}`, borderLeft: `2px solid ${color}` },
    'bottom-right':{ bottom: 0, right: 0, borderBottom: `2px solid ${color}`, borderRight: `2px solid ${color}` },
  };
  return (
    <div style={{
      position: 'absolute', width: '20px', height: '20px',
      zIndex: 2, ...styles[position],
    }} />
  );
}

function VideoCard({ item }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);

  const toggle = () => {
    if (!videoRef.current) return;
    if (playing) { videoRef.current.pause(); setPlaying(false); }
    else          { videoRef.current.play();  setPlaying(true);  }
  };

  return (
    <div style={{ position: 'relative' }}>

      {/* Outer glow ring */}
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        style={{
          position: 'absolute', inset: '-2px', borderRadius: '2px',
          background: `linear-gradient(135deg, ${item.accentColor}, #ff006e, ${item.accentColor})`,
          filter: 'blur(8px)', zIndex: 0,
        }}
      />

      {/* Card shell */}
      <div style={{ position: 'relative', zIndex: 1, background: '#05080f', border: `1px solid ${item.accentColor}55` }}>

        {/* Top bar */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0.65rem 1rem',
          borderBottom: `1px solid ${item.accentColor}22`,
          background: 'rgba(188,19,254,0.05)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <motion.div
              animate={{ opacity: playing ? [1, 0.3, 1] : 1 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              style={{ width: '6px', height: '6px', borderRadius: '50%', background: item.accentColor, boxShadow: `0 0 8px ${item.accentColor}` }}
            />
            <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.55rem', letterSpacing: '2px', color: item.accentColor, textTransform: 'uppercase' }}>
              {playing ? 'NOW PLAYING' : 'VIS.SYS'}
            </span>
          </div>
          <span style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.5rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.2)' }}>
            ACTIVE
          </span>
        </div>

        {/* Video frame */}
        <div
          style={{ position: 'relative', cursor: 'pointer' }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={toggle}
        >
          <CornerBracket position="top-left"     color={item.accentColor} />
          <CornerBracket position="top-right"    color={item.accentColor} />
          <CornerBracket position="bottom-left"  color={item.accentColor} />
          <CornerBracket position="bottom-right" color={item.accentColor} />

          {/* Scanline overlay */}
          <div style={{
            position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
            background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)',
          }} />

          <video
            ref={videoRef}
            src={item.videoSrc}
            poster={item.thumbnail}
            loop
            playsInline
            onEnded={() => setPlaying(false)}
            style={{ width: '100%', display: 'block' }}
          />

          {/* Play/pause overlay */}
          <motion.div
            animate={{ opacity: playing ? (hovered ? 1 : 0) : 1 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute', inset: 0, zIndex: 4,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: playing ? 'transparent' : 'rgba(3,4,10,0.5)',
              pointerEvents: 'none',
            }}
          >
            <motion.div
              animate={{ scale: hovered ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
              style={{
                width: '56px', height: '56px',
                border: `1.5px solid ${item.accentColor}cc`,
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 0 24px ${item.accentColor}55`,
                background: 'rgba(3,4,10,0.65)',
              }}
            >
              <span style={{ fontSize: '1rem', color: item.accentColor, marginLeft: playing ? 0 : '3px' }}>
                {playing ? '⏸' : '▶'}
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom info bar */}
        <div style={{
          padding: '0.9rem 1.2rem',
          borderTop: `1px solid ${item.accentColor}22`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(188,19,254,0.04)',
        }}>
          <div>
            <div style={{ fontFamily: 'Orbitron, monospace', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '1px', textShadow: `0 0 15px ${item.accentColor}66` }}>
              {item.title}
            </div>
            <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.55rem', letterSpacing: '2px', color: item.accentColor, marginTop: '0.25rem', textTransform: 'uppercase' }}>
              {item.tag}
            </div>
          </div>
          <div style={{ fontFamily: 'Share Tech Mono, monospace', fontSize: '0.5rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.2)', textAlign: 'right' }}>
            <div>DARZEEEEEEE</div>
            <div style={{ marginTop: '0.2rem', color: item.accentColor, opacity: 0.6 }}>2026</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VisualizerSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <section id="visualizer" className="subpage-section" style={{ padding: '7rem 4rem', background: 'linear-gradient(to bottom, var(--dark), #06020f, var(--dark))' }}>
      <div ref={ref} style={{ maxWidth: '1300px', margin: '0 auto' }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '4rem' }}
        >
          <div style={{
            fontFamily: 'Share Tech Mono, monospace', fontSize: '0.62rem',
            letterSpacing: '4px', color: 'var(--purple)', textTransform: 'uppercase',
            textShadow: '0 0 15px rgba(188,19,254,0.8)', marginBottom: '0.8rem',
          }}>
            // Visualiser Music Videos
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h2 style={{
              fontFamily: 'Orbitron, monospace', fontSize: 'clamp(1.8rem, 3vw, 3rem)',
              fontWeight: 700, color: 'var(--text-main)', position: 'relative',
              textShadow: '0 0 40px rgba(188,19,254,0.4)',
            }}>
              VISUALISERS
              <div style={{
                position: 'absolute', bottom: '-0.8rem', left: 0, width: '60px', height: '2px',
                background: 'linear-gradient(90deg, var(--purple), transparent)',
                boxShadow: '0 0 10px var(--purple)',
              }} />
            </h2>
            <div style={{
              fontFamily: 'Share Tech Mono, monospace', fontSize: '0.58rem',
              letterSpacing: '2px', color: 'rgba(255,255,255,0.2)',
            }}>
              {VISUALIZERS.length} TRACK{VISUALIZERS.length !== 1 ? 'S' : ''} LOADED
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 360px))',
          gap: '2rem',
          justifyContent: 'center',
        }}>
          {VISUALIZERS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <VideoCard item={item} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
