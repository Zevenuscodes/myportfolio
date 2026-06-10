import React from 'react';
import Footer from '../components/Footer';

export default function LongformPage() {
  return (
    <>
      <section style={{
        minHeight: '100vh', paddingTop: '7rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Orbitron, monospace', color: 'var(--cyan)',
        fontSize: '1.2rem', letterSpacing: '4px', textAlign: 'center',
        padding: '7rem 2rem 4rem',
      }}>
        LONG FORM — COMING SOON
      </section>
      <Footer />
    </>
  );
}
