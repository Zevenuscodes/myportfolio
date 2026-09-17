import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const COUNT = 50;

// Small seeded PRNG so the layout is identical on every render/reload.
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Scissors({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" style={{ display: 'block', color }}>
      <circle cx="12" cy="37" r="6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="36" cy="37" r="6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M15 32 L42 3 L19 34 Z" fill="currentColor" />
      <path d="M33 32 L6 3 L29 34 Z" fill="currentColor" />
      <circle cx="24" cy="22.3" r="1.4" fill="var(--bg)" />
    </svg>
  );
}

export default function FloatingScissors() {
  const reduceMotion = useReducedMotion();

  const items = useMemo(() => {
    const rand = mulberry32(7);
    return Array.from({ length: COUNT }, (_, i) => {
      const accent = rand() < 0.18;
      return {
        id: i,
        top: `${rand() * 96}%`,
        left: `${rand() * 96}%`,
        size: 18 + rand() * 42,
        rotate: rand() * 360,
        spin: (rand() < 0.5 ? -1 : 1) * (20 + rand() * 50),
        driftX: (rand() - 0.5) * 60,
        driftY: 20 + rand() * 50,
        duration: 9 + rand() * 12,
        delay: rand() * -20,
        opacity: accent ? 0.55 : 0.12 + rand() * 0.14,
        color: accent ? 'var(--accent)' : 'var(--ink)',
      };
    });
  }, []);

  return (
    <div
      aria-hidden="true"
      className="floating-scissors"
      style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}
    >
      {items.map(s => (
        <motion.div
          key={s.id}
          initial={{ rotate: s.rotate, x: 0, y: 0 }}
          animate={reduceMotion ? undefined : {
            x: [0, s.driftX, 0],
            y: [0, -s.driftY, 0],
            rotate: [s.rotate, s.rotate + s.spin, s.rotate],
          }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: s.top, left: s.left, opacity: s.opacity, willChange: 'transform' }}
        >
          <Scissors size={s.size} color={s.color} />
        </motion.div>
      ))}
    </div>
  );
}
