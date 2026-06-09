import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageTransition } from './DoorTransition';

const NAV_LINKS = [
  { label: 'HOME',       path: '/' },
  { label: 'ABOUT',      path: '/about' },
  { label: 'WORK',       path: '/work' },
  { label: 'CONTACT ME', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { transitionTo }          = usePageTransition();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (path) => {
    setMenuOpen(false);
    transitionTo(path);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="main-nav"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1.2rem 3rem',
          background: scrolled || menuOpen ? 'rgba(3,4,10,0.97)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(0,245,255,0.12)' : '1px solid transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(14px)' : 'none',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ textShadow: '0 0 30px #00f5ff' }}
          onClick={() => go('/')}
          style={{
            fontFamily: 'Orbitron, monospace', fontWeight: 900, fontSize: '1rem',
            color: 'var(--cyan)', letterSpacing: '3px',
            textShadow: '0 0 15px rgba(0,245,255,0.9), 0 0 40px rgba(0,245,255,0.4)',
            cursor: 'pointer',
          }}
        >
          DARZEEEEEEE
        </motion.div>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
          {NAV_LINKS.map((link) => (
            <motion.button
              key={link.label}
              whileHover={{ color: 'var(--cyan)', textShadow: '0 0 10px var(--cyan)' }}
              onClick={() => go(link.path)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Share Tech Mono, monospace', fontSize: '0.62rem',
                letterSpacing: '3px', color: 'rgba(255,255,255,0.4)',
                textTransform: 'uppercase', transition: 'color 0.2s',
                display: 'none', // hidden on mobile, shown via media query equivalent
              }}
              className="nav-desktop-link"
            >
              {link.label}
            </motion.button>
          ))}

          {/* Hamburger */}
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ display: 'flex', flexDirection: 'column', gap: '5px', cursor: 'pointer', padding: '4px' }}
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6.5 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'block', width: '22px', height: '1.5px', background: menuOpen ? 'var(--cyan)' : 'rgba(255,255,255,0.5)', transformOrigin: 'center', boxShadow: menuOpen ? '0 0 8px var(--cyan)' : 'none' }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'block', width: '16px', height: '1.5px', background: 'rgba(255,255,255,0.5)', transformOrigin: 'center' }}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6.5 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ display: 'block', width: '22px', height: '1.5px', background: menuOpen ? 'var(--cyan)' : 'rgba(255,255,255,0.5)', transformOrigin: 'center', boxShadow: menuOpen ? '0 0 8px var(--cyan)' : 'none' }}
            />
          </div>
        </div>
      </motion.nav>

      {/* Hamburger overlay menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: 'fixed', top: '64px', left: 0, right: 0,
              zIndex: 199,
              background: 'rgba(3,4,10,0.97)',
              backdropFilter: 'blur(18px)',
              borderBottom: '1px solid rgba(0,245,255,0.12)',
              padding: '2rem 3rem 2.5rem',
            }}
          >
            {/* Scan line accent */}
            <div style={{
              position: 'absolute', top: 0, left: '3rem', right: '3rem',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.3), transparent)',
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.35 }}
                  onClick={() => go(link.path)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontFamily: 'Orbitron, monospace', fontWeight: 700,
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
                    letterSpacing: '4px', color: 'rgba(255,255,255,0.35)',
                    textTransform: 'uppercase', textAlign: 'left',
                    padding: '0.65rem 0',
                    borderBottom: '1px solid rgba(0,245,255,0.05)',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--cyan)';
                    e.currentTarget.style.textShadow = '0 0 20px rgba(0,245,255,0.6)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.35)';
                    e.currentTarget.style.textShadow = 'none';
                  }}
                >
                  <span style={{
                    fontFamily: 'Share Tech Mono, monospace',
                    fontSize: '0.45rem', letterSpacing: '3px',
                    color: 'rgba(0,245,255,0.3)', marginRight: '1rem',
                    verticalAlign: 'middle',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {link.label}
                </motion.button>
              ))}
            </div>

            {/* Bottom label */}
            <div style={{
              marginTop: '1.5rem',
              fontFamily: 'Share Tech Mono, monospace', fontSize: '0.45rem',
              letterSpacing: '4px', color: 'rgba(0,245,255,0.2)',
              textTransform: 'uppercase',
            }}>
              // Navigate
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 768px) {
          .nav-desktop-link { display: block !important; }
        }
      `}</style>
    </>
  );
}
