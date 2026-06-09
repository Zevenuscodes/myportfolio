import { createContext, useContext, useCallback, useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const TransitionContext = createContext(null);
export const usePageTransition = () => useContext(TransitionContext);

const EASE = [0.76, 0, 0.24, 1];
const CLOSE_DURATION = 0.55;
const OPEN_DURATION = 0.72;

// ── Web Audio SFX ──────────────────────────────────────────────
function getAudioCtx(ref) {
  if (!ref.current) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx) ref.current = new Ctx();
  }
  return ref.current;
}

function makeNoise(ctx, duration) {
  const len = ctx.sampleRate * duration;
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const d   = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  return src;
}

function playSealSound(ctx) {
  const t = ctx.currentTime;

  // 1. Low hydraulic sweep down
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(180, t);
  osc.frequency.exponentialRampToValueAtTime(55, t + 0.45);
  gain.gain.setValueAtTime(0.18, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
  osc.connect(gain); gain.connect(ctx.destination);
  osc.start(t); osc.stop(t + 0.5);

  // 2. Hiss burst
  const noise  = makeNoise(ctx, 0.35);
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass'; filter.frequency.value = 900; filter.Q.value = 0.6;
  const nGain  = ctx.createGain();
  nGain.gain.setValueAtTime(0.12, t);
  nGain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
  noise.connect(filter); filter.connect(nGain); nGain.connect(ctx.destination);
  noise.start(t);

  // 3. Thud on impact
  const thud  = ctx.createOscillator();
  const tGain = ctx.createGain();
  thud.frequency.setValueAtTime(90, t + 0.44);
  thud.frequency.exponentialRampToValueAtTime(35, t + 0.65);
  tGain.gain.setValueAtTime(0, t); tGain.gain.setValueAtTime(0.45, t + 0.44);
  tGain.gain.exponentialRampToValueAtTime(0.001, t + 0.65);
  thud.connect(tGain); tGain.connect(ctx.destination);
  thud.start(t); thud.stop(t + 0.65);
}

function playOpenSound(ctx) {
  const t = ctx.currentTime;

  // 1. Decompression burst — front-loaded noise sweep high→low
  const noise  = makeNoise(ctx, 0.55);
  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(2400, t);
  filter.frequency.exponentialRampToValueAtTime(180, t + 0.55);
  filter.Q.value = 0.8;
  const nGain = ctx.createGain();
  nGain.gain.setValueAtTime(0.2, t);
  nGain.gain.setValueAtTime(0.08, t + 0.06);
  nGain.gain.exponentialRampToValueAtTime(0.001, t + 0.55);
  noise.connect(filter); filter.connect(nGain); nGain.connect(ctx.destination);
  noise.start(t);

  // 2. Rising tone — door sliding open
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(70, t);
  osc.frequency.exponentialRampToValueAtTime(320, t + 0.6);
  gain.gain.setValueAtTime(0.12, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.65);
  osc.connect(gain); gain.connect(ctx.destination);
  osc.start(t); osc.stop(t + 0.65);

  // 3. Airy whoosh tail
  const whoosh  = makeNoise(ctx, 0.6);
  const wFilter = ctx.createBiquadFilter();
  wFilter.type = 'highpass'; wFilter.frequency.value = 3500;
  const wGain = ctx.createGain();
  wGain.gain.setValueAtTime(0.06, t + 0.05);
  wGain.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
  whoosh.connect(wFilter); wFilter.connect(wGain); wGain.connect(ctx.destination);
  whoosh.start(t + 0.05);
}

const SEAM_LINES = [0.15, 0.32, 0.5, 0.68, 0.85];

function CornerBracket({ top, right }) {
  return (
    <div style={{
      position: 'absolute',
      top: top ? '18px' : 'auto',
      bottom: !top ? '18px' : 'auto',
      right: right ? '18px' : 'auto',
      left: !right ? '18px' : 'auto',
      width: '14px',
      height: '14px',
      borderTop: top ? '1.5px solid rgba(0,245,255,0.5)' : 'none',
      borderBottom: !top ? '1.5px solid rgba(0,245,255,0.5)' : 'none',
      borderRight: right ? '1.5px solid rgba(0,245,255,0.5)' : 'none',
      borderLeft: !right ? '1.5px solid rgba(0,245,255,0.5)' : 'none',
    }} />
  );
}

function Panel({ side, controls, scanning }) {
  const isLeft = side === 'left';
  return (
    <motion.div
      initial={{ x: 0 }}
      animate={controls}
      style={{
        position: 'fixed',
        top: 0,
        left: isLeft ? 0 : '50%',
        width: '51%',
        height: '100%',
        background: 'linear-gradient(180deg, #070c18 0%, #03040a 45%, #050810 100%)',
        zIndex: 9998,
        overflow: 'hidden',
        borderRight: isLeft ? '1px solid rgba(0,245,255,0.7)' : 'none',
        borderLeft: !isLeft ? '1px solid rgba(0,245,255,0.7)' : 'none',
        boxShadow: isLeft
          ? 'inset -40px 0 80px rgba(0,245,255,0.05), 4px 0 30px rgba(0,245,255,0.5)'
          : 'inset 40px 0 80px rgba(0,245,255,0.05), -4px 0 30px rgba(0,245,255,0.5)',
        pointerEvents: 'all',
      }}
    >
      {/* Subtle repeating horizontal seams */}
      {SEAM_LINES.map((pos) => (
        <div key={pos} style={{
          position: 'absolute',
          top: `${pos * 100}%`,
          left: 0, right: 0,
          height: '1px',
          background: `linear-gradient(90deg, transparent, rgba(0,245,255,0.08) 30%, rgba(0,245,255,0.08) 70%, transparent)`,
        }} />
      ))}

      {/* Inner accent line (near seam edge) */}
      <div style={{
        position: 'absolute',
        top: 0, bottom: 0,
        [isLeft ? 'right' : 'left']: '48px',
        width: '1px',
        background: 'linear-gradient(180deg, transparent 5%, rgba(0,245,255,0.18) 25%, rgba(0,245,255,0.18) 75%, transparent 95%)',
      }} />

      {/* Outer accent line */}
      <div style={{
        position: 'absolute',
        top: 0, bottom: 0,
        [isLeft ? 'left' : 'right']: '48px',
        width: '1px',
        background: 'linear-gradient(180deg, transparent 5%, rgba(0,245,255,0.08) 25%, rgba(0,245,255,0.08) 75%, transparent 95%)',
      }} />

      {/* Scan line sweep */}
      {scanning && (
        <motion.div
          initial={{ y: '-80px' }}
          animate={{ y: '100vh' }}
          transition={{ duration: OPEN_DURATION * 0.9, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '80px',
            background: 'linear-gradient(180deg, transparent, rgba(0,245,255,0.07) 40%, rgba(0,245,255,0.12) 50%, rgba(0,245,255,0.07) 60%, transparent)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Corner brackets */}
      <CornerBracket top right={isLeft} />
      <CornerBracket top={false} right={isLeft} />

      {/* Panel sector label */}
      <div style={{
        position: 'absolute',
        top: '50%',
        [isLeft ? 'left' : 'right']: '22px',
        transform: `translateY(-50%) rotate(${isLeft ? -90 : 90}deg)`,
        fontFamily: 'Share Tech Mono, monospace',
        fontSize: '0.42rem',
        letterSpacing: '4px',
        color: 'rgba(0,245,255,0.18)',
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
      }}>
        {isLeft ? 'PORT — A' : 'STARBOARD — A'}
      </div>
    </motion.div>
  );
}

function SeamGlow({ visible }) {
  if (!visible) return null;
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '2px',
      height: '100%',
      background: 'linear-gradient(180deg, transparent 5%, rgba(0,245,255,0.9) 30%, rgba(0,245,255,1) 50%, rgba(0,245,255,0.9) 70%, transparent 95%)',
      boxShadow: '0 0 12px rgba(0,245,255,0.8), 0 0 30px rgba(0,245,255,0.4)',
      zIndex: 9999,
      pointerEvents: 'none',
    }} />
  );
}

function StatusOverlay({ phase }) {
  const lines = {
    'initial': { top: 'SYSTEM BOOT', bottom: 'DARZEEEEEEE' },
    'initial-open': { top: 'SYSTEM ONLINE', bottom: 'DARZEEEEEEE' },
    'closing': { top: 'ACCESSING', bottom: 'NEXT SECTOR' },
    'closed': { top: 'ACCESS GRANTED', bottom: '——' },
    'opening': { top: 'LOADING', bottom: 'SECTOR...' },
  };
  const msg = lines[phase] || lines['initial'];

  return (
    <div style={{
      position: 'fixed',
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 10000,
      textAlign: 'center',
      pointerEvents: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
    }}>
      {/* Top vertical tick */}
      <div style={{ width: '1px', height: '40px', background: 'linear-gradient(180deg, transparent, rgba(0,245,255,0.9))' }} />

      <div style={{
        fontFamily: 'Share Tech Mono, monospace',
        fontSize: '0.42rem',
        letterSpacing: '5px',
        color: 'rgba(0,245,255,0.5)',
        textTransform: 'uppercase',
      }}>
        {msg.top}
      </div>

      <div style={{
        fontFamily: 'Orbitron, monospace',
        fontSize: '0.85rem',
        fontWeight: 900,
        letterSpacing: '6px',
        color: 'rgba(0,245,255,0.95)',
        textShadow: '0 0 20px rgba(0,245,255,0.8)',
        textTransform: 'uppercase',
      }}>
        {msg.bottom}
      </div>

      {/* Bottom vertical tick */}
      <div style={{ width: '1px', height: '40px', background: 'linear-gradient(180deg, rgba(0,245,255,0.9), transparent)' }} />
    </div>
  );
}

export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const leftControls = useAnimation();
  const rightControls = useAnimation();
  const [phase, setPhase] = useState('initial');
  const isAnimatingRef = useRef(false);
  const audioCtxRef = useRef(null);
  const panelsVisible = phase !== 'open';

  // Prime AudioContext on first user interaction so initial-load sound works
  useEffect(() => {
    const prime = () => getAudioCtx(audioCtxRef);
    window.addEventListener('pointerdown', prime, { once: true });
    window.addEventListener('keydown',     prime, { once: true });
    return () => {
      window.removeEventListener('pointerdown', prime);
      window.removeEventListener('keydown',     prime);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      setPhase('initial-open');
      const ctx = getAudioCtx(audioCtxRef);
      if (ctx) playOpenSound(ctx);
      await Promise.all([
        leftControls.start({ x: '-101%', transition: { duration: OPEN_DURATION, ease: EASE } }),
        rightControls.start({ x: '101%', transition: { duration: OPEN_DURATION, ease: EASE } }),
      ]);
      setPhase('open');
    }, 700);
    return () => clearTimeout(timer);
  }, [leftControls, rightControls]);

  const transitionTo = useCallback(async (path) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    setPhase('closing');
    const ctx = getAudioCtx(audioCtxRef);
    if (ctx) playSealSound(ctx);
    await Promise.all([
      leftControls.start({ x: 0, transition: { duration: CLOSE_DURATION, ease: EASE } }),
      rightControls.start({ x: 0, transition: { duration: CLOSE_DURATION, ease: EASE } }),
    ]);

    setPhase('closed');
    navigate(path);
    await new Promise(r => setTimeout(r, 120));

    setPhase('opening');
    if (ctx) playOpenSound(ctx);
    await Promise.all([
      leftControls.start({ x: '-101%', transition: { duration: OPEN_DURATION, ease: EASE } }),
      rightControls.start({ x: '101%', transition: { duration: OPEN_DURATION, ease: EASE } }),
    ]);

    setPhase('open');
    isAnimatingRef.current = false;
  }, [navigate, leftControls, rightControls]);

  return (
    <TransitionContext.Provider value={{ transitionTo }}>
      {children}
      <Panel side="left" controls={leftControls} scanning={phase === 'initial-open' || phase === 'opening'} />
      <Panel side="right" controls={rightControls} scanning={phase === 'initial-open' || phase === 'opening'} />
      <SeamGlow visible={panelsVisible} />
      {panelsVisible && <StatusOverlay phase={phase} />}
    </TransitionContext.Provider>
  );
}
