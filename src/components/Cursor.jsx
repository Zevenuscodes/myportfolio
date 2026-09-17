import React, { useEffect, useRef } from 'react';

const isTouchDevice = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

// Trailing ring that grows over anything clickable.
export default function Cursor() {
  const ringRef = useRef();
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const scale = useRef(1);
  const targetScale = useRef(1);

  useEffect(() => {
    if (isTouchDevice) return;

    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      const interactive = e.target.closest?.('a, button, select, input, textarea, [role="button"]');
      targetScale.current = interactive ? 2.2 : 1;
    };
    window.addEventListener('mousemove', move);

    let raf;
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18;
      ring.current.y += (pos.current.y - ring.current.y) * 0.18;
      scale.current += (targetScale.current - scale.current) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%) scale(${scale.current})`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9999, pointerEvents: 'none',
        width: '18px', height: '18px', borderRadius: '50%',
        background: '#fff', mixBlendMode: 'difference',
      }}
    />
  );
}
