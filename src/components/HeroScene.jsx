import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import Character3D from './Character3D';
import ASCIIText from './ASCIIText';
import MagicBento from './MagicBento';
import { usePageTransition } from './DoorTransition';
import SpaceDecor from './SpaceDecor';

function CyberpunkLights() {
  const cyanRef = useRef();
  const pinkRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (cyanRef.current) cyanRef.current.intensity = 6 + Math.sin(t * 1.5) * 1.5;
    if (pinkRef.current) pinkRef.current.intensity = 4 + Math.sin(t * 1.2 + 1) * 1.2;
  });

  return (
    <>
      <ambientLight intensity={0.7} color="#aaccff" />
      <pointLight ref={cyanRef} position={[-4, 3, 2]} color="#00f5ff" intensity={6} distance={18} />
      <pointLight ref={pinkRef} position={[4, 2, -2]} color="#ff006e" intensity={4} distance={15} />
      <pointLight position={[0, -2, 3]} color="#f5e642" intensity={2.5} distance={12} />
      <directionalLight position={[2, 5, 4]} intensity={1.4} color="#ffffff" />
      <pointLight position={[0, 5, 0]} color="#aaddff" intensity={1.5} distance={20} />
      <pointLight position={[-2, 0, 4]} color="#bc13fe" intensity={2} distance={10} />
    </>
  );
}

function GridFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
      <planeGeometry args={[20, 20, 20, 20]} />
      <meshStandardMaterial
        color="#03040a"
        wireframe
        wireframeLinewidth={1}
        opacity={0.3}
        transparent
      />
    </mesh>
  );
}

function GlowRing() {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.4;
      ref.current.material.opacity = 0.35 + Math.sin(state.clock.elapsedTime * 1.2) * 0.15;
    }
  });
  return (
    <mesh ref={ref} position={[0, -1.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[1.2, 2.0, 64]} />
      <meshBasicMaterial color="#00f5ff" transparent opacity={0.15} />
    </mesh>
  );
}

function HeroText() {
  const { transitionTo } = usePageTransition();
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
  };
  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="hero-text"
      style={{
        position: 'absolute',
        left: '3.5rem',
        bottom: '9rem',
        width: 'auto',
        zIndex: 20,
        pointerEvents: 'none',
      }}
    >
      {/* Name tag */}
      <motion.div variants={item} style={{
        fontFamily: 'Share Tech Mono, monospace', fontSize: '0.5rem',
        letterSpacing: '5px', color: 'rgba(0,245,255,0.4)',
        textTransform: 'uppercase', marginBottom: '0.4rem',
        display: 'flex', alignItems: 'center', gap: '0.6rem',
      }}>
        <span style={{ display: 'inline-block', width: '20px', height: '1px', background: 'var(--cyan)', opacity: 0.35 }} />
        Creative Director
      </motion.div>

      {/* CTA cards — side by side */}
      <motion.div variants={item} className="hero-bento-wrap" style={{ pointerEvents: 'all', width: '340px' }}>
        <MagicBento
          cards={[
            { label: '▶', title: 'My Work', description: 'SaaS · Visuals · Motion', path: '/work' },
            { label: '✉', title: 'Contact', description: 'Let\'s collaborate', path: '/contact' },
          ]}
          onCardClick={(card) => transitionTo(card.path)}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableMagnetism={true}
          clickEffect={true}
          glowColor="245, 230, 66"
          particleCount={10}
          spotlightRadius={240}
        />
      </motion.div>
    </motion.div>
  );
}

function Tagline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="hero-tagline"
      style={{
        position: 'absolute', bottom: '3rem', left: '3.5rem',
        zIndex: 20, width: '340px',
        borderTop: '1px solid rgba(0,245,255,0.08)',
        paddingTop: '0.9rem',
      }}
    >
      <div style={{
        fontFamily: 'Share Tech Mono, monospace', fontSize: '0.5rem',
        letterSpacing: '4px', color: 'rgba(0,245,255,0.35)',
        textTransform: 'uppercase', marginBottom: '0.3rem',
        display: 'flex', alignItems: 'center', gap: '0.5rem',
      }}>
        <span style={{ display: 'inline-block', width: '16px', height: '1px', background: 'rgba(0,245,255,0.3)' }} />
        Tagline
      </div>
      <div style={{
        fontFamily: 'Orbitron, monospace', fontSize: '0.75rem', fontWeight: 700,
        color: 'var(--cyan)', letterSpacing: '2px',
        textShadow: '0 0 12px rgba(0,245,255,0.9), 0 0 30px rgba(0,245,255,0.5)',
      }}>
        stitching ideas to visuals
      </div>
    </motion.div>
  );
}

export default function HeroScene() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <section id="home" style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#03040a' }}>

      {/* Scanlines */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none',
        background: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 4px)',
      }} />

      {/* ASCII text backdrop */}
      <div style={{
        position: 'absolute', left: 0, top: 0,
        width: '100%', height: '100%',
        zIndex: 15, pointerEvents: 'none', opacity: 0.92,
      }}>
        <ASCIIText
          text="DARZEEEEEEE"
          enableWaves={true}
          asciiFontSize={6}
          textFontSize={200}
          planeBaseHeight={window.innerWidth <= 390 ? 1.1 : window.innerWidth <= 480 ? 1.3 : window.innerWidth <= 768 ? 1.6 : 4}
          textColor="#f5e642"
        />
      </div>

      {/* Space decor — planets + ships on the left */}
      <SpaceDecor />

      {/* Atmosphere blobs */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 50% 70% at 75% 55%, rgba(0,245,255,0.18) 0%, transparent 60%),
          radial-gradient(ellipse 40% 50% at 85% 20%, rgba(188,19,254,0.18) 0%, transparent 50%),
          radial-gradient(ellipse 60% 40% at 10% 80%, rgba(255,0,110,0.14) 0%, transparent 60%),
          radial-gradient(ellipse 30% 30% at 20% 20%, rgba(245,230,66,0.07) 0%, transparent 50%)
        `,
      }} />

      {/* 3D Canvas - right half */}
      <div className="hero-canvas-wrap" style={{ position: 'absolute', right: 0, top: 0, width: '58%', height: '100%', zIndex: 10 }}>
        <Canvas
          camera={{ position: [0, 0.8, 5.5], fov: 42 }}
          shadows
          style={{ background: 'transparent' }}
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
        >
          <CyberpunkLights />
          <Suspense fallback={null}>
            <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.15}>
              <Character3D />
            </Float>
          </Suspense>
          <GridFloor />
          <GlowRing />
          <Stars radius={50} depth={30} count={800} factor={3} saturation={0.5} fade speed={0.5} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.8}
            rotateSpeed={0.6}
          />
        </Canvas>
      </div>

      {/* Left fade gradient */}
      <div className="hero-fade" style={{
        position: 'absolute', inset: 0, zIndex: 11, pointerEvents: 'none',
        background: 'linear-gradient(to right, #03040a 32%, rgba(3,4,10,0.75) 50%, transparent 68%)',
      }} />

      {/* Hero text */}
      <HeroText />
      <Tagline />

      {/* Drag hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="hero-drag-hint"
        style={{
          position: 'absolute', bottom: '2.5rem', right: '3rem', zIndex: 20,
          fontFamily: 'Share Tech Mono, monospace', fontSize: '0.55rem',
          letterSpacing: '3px', color: 'rgba(0,245,255,0.4)', textTransform: 'uppercase',
        }}
      >
        ↺ drag to rotate
      </motion.div>

      {/* Slide counter */}
      <div className="hero-slide-counter" style={{
        position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)',
        zIndex: 20, fontFamily: 'Share Tech Mono, monospace', fontSize: '0.6rem',
        letterSpacing: '3px', color: 'rgba(255,255,255,0.2)',
      }}>
        <span style={{ color: 'var(--cyan)' }}>01</span> / 06
      </div>

      {/* Bottom bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '3px', zIndex: 20,
        background: 'linear-gradient(90deg, var(--cyan), var(--purple), var(--pink), var(--yellow))',
        boxShadow: '0 0 20px rgba(0,245,255,0.6), 0 0 40px rgba(188,19,254,0.3)',
      }} />
    </section>
  );
}
