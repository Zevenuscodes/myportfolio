import React from 'react';

export default function CyberDivider() {
  return (
    <div style={{
      width: '100%', height: '1px',
      background: 'linear-gradient(90deg, transparent, var(--cyan), var(--purple), transparent)',
      boxShadow: '0 0 12px rgba(0,245,255,0.7), 0 0 30px rgba(188,19,254,0.4)',
    }} />
  );
}
