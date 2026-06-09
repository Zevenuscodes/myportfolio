import React from 'react';
import Footer from '../components/Footer';

export default function MusicVideosPage() {
  return (
    <>
      <section style={{
        minHeight: '100vh', paddingTop: '7rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Orbitron, monospace', color: 'var(--pink)',
        fontSize: '1.2rem', letterSpacing: '4px',
      }}>
        MUSIC VIDEOS — COMING SOON
      </section>
      <Footer />
    </>
  );
}
