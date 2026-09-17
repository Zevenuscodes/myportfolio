import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { usePageTransition } from './DoorTransition';

const NAV_LINKS = [
  { label: 'Work',    path: '/work' },
  { label: 'About',   path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const WORK_PATHS = ['/work', '/music-videos', '/short-form', '/saas-explainers', '/longform'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { transitionTo } = usePageTransition();
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll behind the full-screen mobile menu
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const go = (path) => {
    setMenuOpen(false);
    if (path !== pathname) transitionTo(path);
  };

  const isActive = (path) => path === '/work' ? WORK_PATHS.includes(pathname) : pathname === path;

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1.25rem max(var(--gutter), calc((100% - 1280px) / 2))',
          background: scrolled || menuOpen ? 'rgba(242,239,232,0.92)' : 'transparent',
          backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'var(--rule)' : 'transparent'}`,
          transition: 'background 0.3s, border-color 0.3s',
        }}
      >
        <button
          type="button"
          onClick={() => go('/')}
          className="display"
          style={{ fontSize: '1.65rem', lineHeight: 1, letterSpacing: '-0.01em' }}
        >
          Darzeeeeeee<span style={{ color: 'var(--accent)' }}>.</span>
        </button>

        <div className="nav-desktop" style={{ alignItems: 'center', gap: '2.25rem' }}>
          {NAV_LINKS.map((link) => (
            <button
              key={link.path}
              type="button"
              onClick={() => go(link.path)}
              style={{
                position: 'relative', fontSize: '0.9rem', fontWeight: 500,
                color: isActive(link.path) ? 'var(--ink)' : 'var(--muted)',
                transition: 'color 0.2s', padding: '0.25rem 0',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--ink)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = isActive(link.path) ? 'var(--ink)' : 'var(--muted)'; }}
            >
              {link.label}
              {isActive(link.path) && (
                <span style={{
                  position: 'absolute', left: 0, right: 0, bottom: '-2px',
                  height: '1px', background: 'var(--ink)',
                }} />
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="nav-burger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{ fontSize: '0.9rem', fontWeight: 500, padding: '0.25rem 0' }}
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 199,
              background: 'var(--bg)',
              padding: '7rem var(--gutter) 2rem',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            }}
          >
            <div>
              {[{ label: 'Home', path: '/' }, ...NAV_LINKS].map((link, i) => (
                <motion.button
                  key={link.path}
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => go(link.path)}
                  className="display"
                  style={{
                    display: 'flex', alignItems: 'baseline', gap: '1rem', width: '100%',
                    fontSize: 'clamp(3rem, 14vw, 5rem)', textAlign: 'left',
                    padding: '0.5rem 0', borderBottom: '1px solid var(--rule)',
                    fontStyle: isActive(link.path) ? 'italic' : 'normal',
                    color: isActive(link.path) ? 'var(--accent)' : 'var(--ink)',
                  }}
                >
                  <span className="eyebrow" style={{ fontStyle: 'normal' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {link.label}
                </motion.button>
              ))}
            </div>
            <div className="eyebrow">Dehradun, India</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
