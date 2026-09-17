import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Seated editor at a laptop, facing left toward the cutter. Same flat tone as HeroSilhouette.
export default function HeroWorker() {
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion;

  return (
    <motion.div
      aria-hidden="true"
      className="hero-worker"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <svg
        viewBox="0 0 600 600"
        preserveAspectRatio="xMaxYMax meet"
        style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
      >
        <g fill="var(--ink)" opacity="0.17">
          {/* Desk */}
          <rect x="30" y="360" width="380" height="14" rx="2" />
          <rect x="50" y="374" width="12" height="216" />
          <rect x="380" y="374" width="12" height="216" />

          {/* Mug */}
          <path d="M60 322 L92 322 L90 360 L62 360 Z" />
          <path d="M92 330 Q106 332 104 342 Q102 352 90 350" fill="none" stroke="var(--ink)" strokeWidth="5" />

          {/* Laptop: base + screen seen from the side */}
          <path d="M112 350 L300 350 L310 360 L102 360 Z" />
          <path d="M118 352 L94 214 L108 212 L132 352 Z" />

          {/* Chair */}
          <rect x="390" y="404" width="130" height="16" rx="4" />
          <path d="M506 412 L522 250 L538 252 L524 414 Z" />
          <rect x="449" y="420" width="12" height="130" />
          <path d="M385 552 L525 552 L515 564 L395 564 Z" />
          <circle cx="398" cy="576" r="10" />
          <circle cx="512" cy="576" r="10" />

          {/* Legs */}
          <path d="M478 398 L334 392" fill="none" stroke="var(--ink)" strokeWidth="46" strokeLinecap="round" />
          <path d="M334 392 L346 556" fill="none" stroke="var(--ink)" strokeWidth="36" strokeLinecap="round" />
          <path d="M300 552 L364 552 L366 576 L296 576 Q288 564 300 552 Z" />

          {/* Torso, leaning in */}
          <path d="M424 408 L506 408 Q512 330 476 252 Q444 224 404 246 Q392 310 424 408 Z" />

          {/* Head + neck, with a small nod */}
          <g>
            {animate && (
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 420 240; -3 420 240; 0 420 240; 0 420 240"
                keyTimes="0; 0.2; 0.45; 1"
                dur="3.2s"
                repeatCount="indefinite"
              />
            )}
            <path d="M404 222 L434 222 L440 256 L408 258 Z" />
            <ellipse cx="410" cy="190" rx="36" ry="42" />
            <path d="M378 184 L362 206 L380 212 Z" />
            <path d="M376 172 Q384 138 418 142 Q448 148 448 184 Q432 164 408 166 Q390 166 376 172 Z" />
          </g>

          {/* Typing arm */}
          <path d="M444 268 L404 346 L262 346" fill="none" stroke="var(--ink)" strokeWidth="30" strokeLinecap="round" strokeLinejoin="round">
            {animate && (
              <animate
                attributeName="d"
                values="M444 268 L404 346 L262 346; M444 268 L404 344 L258 338; M444 268 L404 346 L266 346; M444 268 L404 343 L254 340; M444 268 L404 346 L262 346"
                dur="0.9s"
                repeatCount="indefinite"
              />
            )}
          </path>
        </g>

        {/* Steam */}
        {animate && [0, 1].map(i => (
          <path
            key={i}
            d={`M${70 + i * 14} 314 Q${64 + i * 14} 300 ${72 + i * 14} 288 Q${80 + i * 14} 276 ${72 + i * 14} 262`}
            fill="none"
            stroke="var(--ink)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0"
          >
            <animate attributeName="opacity" values="0;0.18;0" dur="2.6s" begin={`${i * 1.3}s`} repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="translate" values="0 6; 0 -10" dur="2.6s" begin={`${i * 1.3}s`} repeatCount="indefinite" />
          </path>
        ))}

        {/* Render progress, floating above the laptop */}
        <g transform="translate(120 150)">
          <text x="0" y="-8" fontSize="11" fontFamily="Inter Tight, sans-serif" fontWeight="500" letterSpacing="1.5" fill="var(--muted)">
            RENDERING
          </text>
          <rect width="180" height="6" rx="3" fill="var(--ink)" opacity="0.12" />
          <rect width={animate ? 0 : 120} height="6" rx="3" fill="var(--accent)" opacity="0.8">
            {animate && (
              <animate attributeName="width" values="0;180;180" keyTimes="0;0.85;1" dur="4s" repeatCount="indefinite" />
            )}
          </rect>
        </g>
      </svg>
    </motion.div>
  );
}
