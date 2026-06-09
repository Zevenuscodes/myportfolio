import React, { useEffect, useRef } from 'react';

const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

export default function CyberpunkCursor() {
  const dotRef = useRef();
  const ringRef = useRef();
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isTouchDevice) return;
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', move);
    let raf;
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top = ring.current.y + 'px';
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);

  if (isTouchDevice) return null;

  const base = {
    position: 'fixed', pointerEvents: 'none', zIndex: 9999,
    transform: 'translate(-50%, -50%)',
  };

  return (
    <>
      <div ref={dotRef} style={{
        ...base, width: '6px', height: '6px', borderRadius: '50%',
        background: 'var(--cyan)',
        boxShadow: '0 0 8px var(--cyan)',
      }} />
      <div ref={ringRef} style={{
        ...base, width: '28px', height: '28px', borderRadius: '50%',
        border: '1px solid rgba(0,245,255,0.5)',
      }} />
    </>
  );
}
