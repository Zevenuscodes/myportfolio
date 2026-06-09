import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="site-footer" style={{
      borderTop: '1px solid rgba(0,245,255,0.1)',
      padding: '2rem 4rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: '#03040a',
    }}>
      <span style={{
        fontFamily: 'Share Tech Mono, monospace', fontSize: '0.62rem',
        letterSpacing: '2px', color: 'var(--text-muted)',
      }}>
        © 2026 <span style={{ color: 'var(--cyan)' }}>DARZEEEEEEE</span>
      </span>

      <span style={{
        fontFamily: 'Share Tech Mono, monospace', fontSize: '0.55rem',
        letterSpacing: '2px', color: 'var(--text-muted)',
      }}>
        SYSTEM STATUS:{' '}
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ color: 'var(--cyan)' }}
        >
          ● ONLINE
        </motion.span>
      </span>

      <span style={{
        fontFamily: 'Share Tech Mono, monospace', fontSize: '0.55rem',
        letterSpacing: '1px', color: 'var(--text-muted)',
      }}>
        CRAFTED WITH CODE & CAFFEINE
      </span>
    </footer>
  );
}
