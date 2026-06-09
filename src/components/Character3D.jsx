import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function Character3D() {
  const groupRef = useRef();
  const { scene } = useGLTF('/character.glb');

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(t * 0.8) * 0.06;
    }
  });

  return (
    <group ref={groupRef} scale={3}>
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload('/character.glb');
