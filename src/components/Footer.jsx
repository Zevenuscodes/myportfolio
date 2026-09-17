import React from 'react';

export default function Footer() {
  return (
    <footer style={{ padding: '0 var(--gutter) 2rem' }}>
      <div className="site-footer" style={{
        maxWidth: '1280px', margin: '0 auto',
        paddingTop: '1.5rem', borderTop: '1px solid var(--rule)',
      }}>
        <span className="eyebrow">© 2026 Darzeeeeeee</span>
        <span className="eyebrow">Dehradun, India</span>
        <div style={{ display: 'flex', gap: '1.75rem' }}>
          <a
            className="eyebrow"
            href="https://www.instagram.com/darzeeeeeee/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--ink)' }}
          >
            Instagram ↗
          </a>
          <button
            type="button"
            className="eyebrow"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{ color: 'var(--ink)' }}
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
