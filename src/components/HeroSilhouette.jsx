import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

// Snip cycle: blades open, snap shut, hold. Everything below shares this clock.
const SNIP = '1.4s';

// Where the blades cross the timeline.
const CUT_X = 380;

// Timeline is drawn in the silhouette's two tones: ink for solid shapes,
// background colour for the cut-out detail (lanes, gaps, waveforms, labels).
const INK = 'var(--ink)';
const CUT = 'var(--bg)';

const TL_X = 250;
const TL_W = 480;
const TL_Y = 236;
const HEADER_W = 24;

const TRACKS = [
  { label: 'V2', y: 256, clips: [[300, 362, 'Title'], [470, 600, 'Grade.mogrt']] },
  { label: 'V1', y: 275, clips: [[276, 340, 'A001.mp4'], [343, 455, 'Hook_v3.mp4'], [458, 562, 'Broll_02'], [565, 726, 'Drop.mp4']] },
  { label: 'A1', y: 296, audio: true, clips: [[276, 455], [458, 726]] },
  { label: 'A2', y: 315, audio: true, clips: [[320, 610]] },
];
const TRACK_H = 16;

function Waveform({ x1, x2, y }) {
  const bars = [];
  for (let x = x1 + 3, i = 0; x < x2 - 2; x += 3, i++) {
    const h = 2 + Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.37)) * (TRACK_H - 6);
    bars.push(<rect key={x} x={x} y={y + (TRACK_H - h) / 2} width="1.4" height={h} fill={CUT} />);
  }
  return <>{bars}</>;
}

function Timeline() {
  const ticks = [];
  for (let x = TL_X + 66; x <= TL_X + TL_W - 4; x += 12) {
    const major = (x - TL_X - 66) % 60 === 0;
    ticks.push(<rect key={x} x={x} y={TL_Y + (major ? 4 : 9)} width="1" height={major ? 9 : 4} fill={CUT} />);
  }

  return (
    <g>
      <rect x={TL_X} y={TL_Y} width={TL_W} height="102" rx="4" fill={INK} />
      {ticks}
      <text x={TL_X + 5} y={TL_Y + 11} fontSize="7.5" fontWeight="600" fill={CUT} fontFamily="Inter Tight, sans-serif">00;00;04;12</text>
      <rect x={TL_X} y={TL_Y + 16} width={TL_W} height="2" fill={CUT} />

      {TRACKS.map(t => (
        <g key={t.label}>
          <text x={TL_X + 5} y={t.y + 11} fontSize="7.5" fontWeight="600" fill={CUT} fontFamily="Inter Tight, sans-serif">{t.label}</text>
          {/* Empty lane */}
          <rect x={TL_X + HEADER_W} y={t.y} width={TL_W - HEADER_W - 4} height={TRACK_H} fill={CUT} />
          {t.clips.map(([x1, x2, name]) => (
            <g key={x1}>
              <rect x={x1} y={t.y + 1.5} width={x2 - x1} height={TRACK_H - 3} rx="1.5" fill={INK} />
              {t.audio
                ? <Waveform x1={x1} x2={x2} y={t.y} />
                : <text x={x1 + 3} y={t.y + 10.5} fontSize="6.5" fontWeight="600" fill={CUT} fontFamily="Inter Tight, sans-serif">{name}</text>}
            </g>
          ))}
        </g>
      ))}

      {/* Playhead — ink line with a cut-out halo so it reads on both lanes and clips */}
      <rect x="518" y={TL_Y + 2} width="4" height="98" fill={CUT} />
      <rect x="519.25" y={TL_Y + 2} width="1.5" height="98" fill={INK} />
      <path d={`M512 ${TL_Y + 1} L528 ${TL_Y + 1} L528 ${TL_Y + 10} L520 ${TL_Y + 16} L512 ${TL_Y + 10} Z`} fill={CUT} />
      <path d={`M514 ${TL_Y + 2} L526 ${TL_Y + 2} L526 ${TL_Y + 9} L520 ${TL_Y + 14} L514 ${TL_Y + 9} Z`} fill={INK} />
    </g>
  );
}

function Blade({ dir, animate }) {
  // dir = -1 for one lever, 1 for the other. Rotates about the pivot at (0,0).
  return (
    <g>
      {animate && (
        <animateTransform
          attributeName="transform"
          type="rotate"
          values={`0 0 0; ${-16 * dir} 0 0; ${-16 * dir} 0 0; 0 0 0; 0 0 0`}
          keyTimes="0; 0.35; 0.5; 0.62; 1"
          calcMode="spline"
          keySplines="0.4 0 0.2 1; 0 0 1 1; 0.7 0 1 1; 0 0 1 1"
          dur={SNIP}
          repeatCount="indefinite"
        />
      )}
      <circle cx="-34" cy={16 * dir} r="15" fill="none" stroke="currentColor" strokeWidth="7" />
      <path d={`M-22 ${9 * dir} L0 ${3 * dir} L170 ${-1 * dir} L0 ${-6 * dir} Z`} fill="currentColor" />
    </g>
  );
}

export default function HeroSilhouette() {
  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion;

  return (
    <motion.div
      aria-hidden="true"
      className="hero-silhouette"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.svg
        viewBox="0 0 600 800"
        preserveAspectRatio="xMinYMax meet"
        animate={animate ? { scaleY: [1, 1.012, 1] } : undefined}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{ width: '100%', height: '100%', display: 'block', transformOrigin: '50% 100%', overflow: 'visible' }}
      >
        <defs>
          <clipPath id="hero-tl-left"><rect x="0" y="0" width={CUT_X} height="800" /></clipPath>
          <clipPath id="hero-tl-right"><rect x={CUT_X} y="0" width="1000" height="800" /></clipPath>
        </defs>

        {/* Figure + timeline — one flat layer so overlaps don't darken */}
        <g fill="var(--ink)" opacity="0.17">
          {/* Head + nose + hair + neck */}
          <ellipse cx="200" cy="108" rx="40" ry="48" />
          <path d="M236 100 L252 124 L234 130 Z" />
          <path d="M160 92 Q168 52 206 56 Q236 58 242 92 Q222 76 196 80 Q176 82 160 92 Z" />
          <rect x="182" y="146" width="36" height="40" />

          {/* Torso */}
          <path d="M128 214 Q132 180 172 174 L232 174 Q270 180 276 214 L264 440 L146 440 Z" />

          {/* Legs + shoes */}
          <path d="M148 430 L208 430 L196 758 L150 758 Z" />
          <path d="M198 430 L264 430 L268 758 L222 758 Z" />
          <path d="M138 750 L200 750 Q206 772 190 778 L132 778 Z" />
          <path d="M216 750 L272 750 Q300 758 298 778 L214 778 Z" />

          {/* Back arm, holding the left end of the timeline */}
          <path d="M150 214 L180 326 L258 300" fill="none" stroke="var(--ink)" strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="260" cy="298" r="17" />

          {/* Front arm, raised to the scissors */}
          <path d="M254 212 L290 292 L372 186" fill="none" stroke="var(--ink)" strokeWidth="34" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="376" cy="180" r="18" />

          {/* Timeline, split at the cut. Left half stays; right half gets pushed off each snip. */}
          <g clipPath="url(#hero-tl-left)">
            <Timeline />
          </g>
          <g clipPath="url(#hero-tl-right)">
            {animate && (
              <animateTransform
                attributeName="transform"
                type="translate"
                values="0 0; 0 0; 12 5; 12 5; 0 0"
                keyTimes="0; 0.6; 0.66; 0.9; 1"
                dur={SNIP}
                repeatCount="indefinite"
              />
            )}
            <Timeline />
          </g>
        </g>

        {/* Razor flash along the cut */}
        {animate && (
          <line x1={CUT_X} x2={CUT_X} y1={TL_Y - 6} y2={TL_Y + 106} stroke="var(--accent)" strokeWidth="2" opacity="0">
            <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.58;0.63;0.8;1" dur={SNIP} repeatCount="indefinite" />
          </line>
        )}

        {/* Scissors, pointing down through the timeline */}
        <g transform={`translate(${CUT_X} 214) rotate(90)`} style={{ color: 'var(--accent)' }} opacity="0.75">
          <Blade dir={-1} animate={animate} />
          <Blade dir={1} animate={animate} />
          <circle r="4.5" fill="var(--bg)" />
        </g>
      </motion.svg>
    </motion.div>
  );
}
