import React from 'react';
import Footer from '../components/Footer';

export default function MotionDesignsPage() {
  return (
    <>
      <section style={{
        minHeight: '100vh', paddingTop: '7rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Orbitron, monospace', color: 'var(--yellow)',
        fontSize: '1.2rem', letterSpacing: '4px',
      }}>
        MOTION DESIGNS — COMING SOON
      </section>
      <Footer />
    </>
  );
}
