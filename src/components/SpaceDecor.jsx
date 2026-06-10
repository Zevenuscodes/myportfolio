import React from 'react';
import { motion } from 'framer-motion';

function ShipSVG({ color, scale = 1 }) {
  return (
    <svg
      viewBox="0 0 64 26"
      width={64 * scale}
      height={26 * scale}
      style={{ overflow: 'visible', display: 'block' }}
    >
      {/* Top wing */}
      <polygon points="14,4 32,4 27,-5 9,0"    fill={`${color}22`} stroke={color} strokeWidth="0.7" />
      {/* Bottom wing */}
      <polygon points="14,22 32,22 27,31 9,26"  fill={`${color}22`} stroke={color} strokeWidth="0.7" />
      {/* Main hull */}
      <polygon points="1,13 11,3 55,5 64,13 55,21 11,23" fill={`${color}11`} stroke={color} strokeWidth="1" />
      {/* Cockpit dome */}
      <ellipse cx="30" cy="13" rx="12" ry="5"  fill={`${color}40`} />
      {/* Engine exhaust */}
      <ellipse cx="2"  cy="13" rx="5"  ry="3"  fill={color} opacity="0.9" />
      <ellipse cx="-5" cy="13" rx="6"  ry="2"  fill={color} opacity="0.3" />
    </svg>
  );
}

export default function SpaceDecor() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', left: 0, top: 0,
        width: '45%', height: '100%',
        zIndex: 13, pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >

      {/* ─── LARGE PURPLE RINGED PLANET ─── */}
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ repeat: Infinity, duration: 9, ease: 'easeInOut' }}
        style={{ position: 'absolute', left: '5%', top: '7%' }}
      >
        <div style={{ position: 'relative', width: 130, height: 130 }}>
          <motion.div
            animate={{ filter: [
              'drop-shadow(0 0 15px rgba(188,19,254,0.45))',
              'drop-shadow(0 0 32px rgba(188,19,254,0.82))',
              'drop-shadow(0 0 15px rgba(188,19,254,0.45))',
            ] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            style={{
              width: 130, height: 130, borderRadius: '50%',
              background: 'radial-gradient(circle at 32% 28%, rgba(150,40,210,0.95) 0%, rgba(70,0,110,0.9) 45%, rgba(15,0,30,0.97) 80%)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Surface texture */}
            <div style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              background: `
                radial-gradient(circle at 62% 55%, rgba(0,0,0,0.4) 0%, transparent 55%),
                radial-gradient(circle at 25% 65%, rgba(255,255,255,0.04) 0%, transparent 30%),
                repeating-linear-gradient(38deg, transparent, transparent 16px, rgba(255,255,255,0.018) 16px, rgba(255,255,255,0.018) 17px)
              `,
            }} />
          </motion.div>
          {/* Ring — behind sphere */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', width: 240, height: 48,
            transform: 'translate(-50%, -50%) perspective(90px) rotateX(74deg)',
            border: '1.5px solid rgba(188,19,254,0.28)', borderRadius: '50%', zIndex: -1,
          }} />
          {/* Ring — front arc (top half) */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', width: 240, height: 48,
            transform: 'translate(-50%, -50%) perspective(90px) rotateX(74deg)',
            borderTop: '2px solid rgba(188,19,254,0.85)',
            borderLeft: '1.5px solid rgba(188,19,254,0.5)',
            borderRight: '1.5px solid rgba(188,19,254,0.5)',
            borderBottom: 'none', borderRadius: '50%', zIndex: 2,
          }} />
        </div>
      </motion.div>

      {/* ─── SMALL CYAN PLANET ─── */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6.5, ease: 'easeInOut', delay: 1.5 }}
        style={{ position: 'absolute', left: '2%', top: '63%' }}
      >
        <motion.div
          animate={{ filter: [
            'drop-shadow(0 0 8px rgba(0,245,255,0.4))',
            'drop-shadow(0 0 22px rgba(0,245,255,0.82))',
            'drop-shadow(0 0 8px rgba(0,245,255,0.4))',
          ] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 1 }}
          style={{
            width: 70, height: 70, borderRadius: '50%',
            background: 'radial-gradient(circle at 33% 28%, rgba(0,200,230,0.95) 0%, rgba(0,80,130,0.9) 45%, rgba(0,15,35,0.97) 80%)',
            overflow: 'hidden', position: 'relative',
          }}
        >
          <div style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: `
              radial-gradient(circle at 65% 60%, rgba(0,0,0,0.38) 0%, transparent 50%),
              repeating-linear-gradient(55deg, transparent, transparent 12px, rgba(0,245,255,0.03) 12px, rgba(0,245,255,0.03) 13px)
            `,
          }} />
        </motion.div>
      </motion.div>

      {/* ─── TINY YELLOW MOON ─── */}
      <motion.div
        animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.8 }}
        style={{ position: 'absolute', left: '22%', top: '20%' }}
      >
        <motion.div
          animate={{ filter: [
            'drop-shadow(0 0 5px rgba(245,230,66,0.4))',
            'drop-shadow(0 0 14px rgba(245,230,66,0.72))',
            'drop-shadow(0 0 5px rgba(245,230,66,0.4))',
          ] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          style={{
            width: 30, height: 30, borderRadius: '50%',
            background: 'radial-gradient(circle at 38% 32%, rgba(245,230,66,0.9) 0%, rgba(200,160,10,0.75) 55%, rgba(50,35,0,0.95) 85%)',
          }}
        />
      </motion.div>

      {/* ─── TWINKLING STAR FIELD ─── */}
      {[
        { l:'9%',  t:'43%', s:2,   o:0.5  },
        { l:'15%', t:'38%', s:1.5, o:0.4  },
        { l:'30%', t:'46%', s:2,   o:0.55 },
        { l:'37%', t:'28%', s:1.5, o:0.38 },
        { l:'41%', t:'54%', s:2,   o:0.5  },
        { l:'17%', t:'57%', s:2,   o:0.45 },
        { l:'27%', t:'72%', s:1.5, o:0.38 },
        { l:'43%', t:'14%', s:2,   o:0.5  },
        { l:'34%', t:'67%', s:2,   o:0.42 },
        { l:'21%', t:'82%', s:1.5, o:0.35 },
        { l:'11%', t:'29%', s:1.5, o:0.38 },
        { l:'48%', t:'38%', s:2,   o:0.45 },
      ].map((star, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [star.o, star.o * 0.18, star.o] }}
          transition={{ repeat: Infinity, duration: 2.2 + i * 0.3, ease: 'easeInOut', delay: i * 0.15 }}
          style={{
            position: 'absolute', left: star.l, top: star.t,
            width: star.s, height: star.s, borderRadius: '50%',
            background: 'rgba(200,230,255,0.9)',
            boxShadow: '0 0 3px rgba(0,245,255,0.4)',
          }}
        />
      ))}

      {/* ─── SPACESHIP 1 — Cyan, slow rightward cruise ─── */}
      <motion.div
        animate={{ x: [0, 40, 650, 720], opacity: [0, 1, 1, 0] }}
        transition={{ repeat: Infinity, duration: 22, ease: 'linear', times: [0, 0.04, 0.9, 1] }}
        style={{
          position: 'absolute', top: '35%', left: -80,
          filter: 'drop-shadow(0 0 5px rgba(0,245,255,0.9)) drop-shadow(0 0 14px rgba(0,245,255,0.4))',
        }}
      >
        <ShipSVG color="#00f5ff" scale={0.65} />
      </motion.div>

      {/* ─── SPACESHIP 2 — Pink, diagonal climb ─── */}
      <motion.div
        animate={{ x: [0, 50, 320, 380], y: [0, -20, -160, -200], opacity: [0, 1, 1, 0] }}
        transition={{ repeat: Infinity, duration: 16, ease: 'linear', delay: 5, times: [0, 0.06, 0.92, 1] }}
        style={{
          position: 'absolute', bottom: '20%', left: '6%',
          transform: 'rotate(-22deg)',
          filter: 'drop-shadow(0 0 5px rgba(255,0,110,0.9)) drop-shadow(0 0 10px rgba(255,0,110,0.4))',
        }}
      >
        <ShipSVG color="#ff006e" scale={0.5} />
      </motion.div>

      {/* ─── SPACESHIP 3 — Yellow, patrol orbit near big planet ─── */}
      <motion.div
        animate={{
          x: [0, 55, 100, 75, 20, 0],
          y: [0, -15, 25, 65, 55, 0],
          opacity: [0.5, 0.82, 0.7, 0.82, 0.65, 0.5],
        }}
        transition={{ repeat: Infinity, duration: 20, ease: 'easeInOut', delay: 2 }}
        style={{
          position: 'absolute', top: '22%', left: '14%',
          filter: 'drop-shadow(0 0 4px rgba(245,230,66,0.8)) drop-shadow(0 0 8px rgba(245,230,66,0.3))',
        }}
      >
        <ShipSVG color="#f5e642" scale={0.38} />
      </motion.div>

    </div>
  );
}
