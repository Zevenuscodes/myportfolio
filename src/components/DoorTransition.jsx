import { createContext, useContext, useCallback, useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export const TransitionContext = createContext(null);
export const usePageTransition = () => useContext(TransitionContext);

const EASE = [0.76, 0, 0.24, 1];
const COVER_DURATION = 0.6;
const REVEAL_DURATION = 0.75;

const LABELS = {
  '/': 'Home',
  '/about': 'About',
  '/work': 'Work',
  '/music-videos': 'Music Videos',
  '/short-form': 'Short Form',
  '/saas-explainers': 'SaaS',
  '/longform': 'Documentaries',
  '/contact': 'Contact',
};

// A single ink curtain: rises from below to cover, then exits upward to reveal.
export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const curtain = useAnimation();
  const [label, setLabel] = useState('Darzeeeeeee');
  const [active, setActive] = useState(true);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      await curtain.start({ y: '-100%', transition: { duration: REVEAL_DURATION, ease: EASE } });
      setActive(false);
    }, 650);
    return () => clearTimeout(timer);
  }, [curtain]);

  const transitionTo = useCallback(async (path) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    setLabel(LABELS[path] || 'Darzeeeeeee');
    setActive(true);
    curtain.set({ y: '100%' });
    await curtain.start({ y: '0%', transition: { duration: COVER_DURATION, ease: EASE } });

    navigate(path);
    window.scrollTo(0, 0);
    await new Promise(r => setTimeout(r, 150));

    await curtain.start({ y: '-100%', transition: { duration: REVEAL_DURATION, ease: EASE } });
    setActive(false);
    isAnimatingRef.current = false;
  }, [navigate, curtain]);

  return (
    <TransitionContext.Provider value={{ transitionTo }}>
      {children}
      <motion.div
        initial={{ y: '0%' }}
        animate={curtain}
        aria-hidden="true"
        style={{
          position: 'fixed', inset: 0, zIndex: 9998,
          background: 'var(--ink)', color: 'var(--bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: active ? 'all' : 'none',
          visibility: active ? 'visible' : 'hidden',
        }}
      >
        <motion.span
          key={label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="display"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', fontStyle: 'italic' }}
        >
          {label}
        </motion.span>
      </motion.div>
    </TransitionContext.Provider>
  );
}
