'use client';

import * as THREE from 'three';
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, GroupProps, RootState } from '@react-three/fiber';
import { useRouter } from 'next/navigation';

interface ModelProps extends GroupProps {
  speedMultiplier?: number;
}

export function MuaModel({ speedMultiplier = 1, ...props }: ModelProps) {
  const modelRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF('/models/mua.glb');
  const router = useRouter();

  const rotationSpeeds = useRef({
    x: (Math.random() - 0.5) * 0.8,
    y: (Math.random() - 0.5) * 0.8,
    z: (Math.random() - 0.5) * 0.8,
  });

  const modelName = 'mua';

  const handleClick = () => {
    router.push(`/projects/${modelName}`);
  };

  useFrame((state: RootState, delta: number) => {
    if (modelRef.current) {
      const speed = speedMultiplier;
      modelRef.current.rotation.y += delta * rotationSpeeds.current.y * speed;
      modelRef.current.rotation.x += delta * rotationSpeeds.current.x * speed;
      modelRef.current.rotation.z += delta * rotationSpeeds.current.z * speed;
    }
  });

  return (
    <group ref={modelRef} {...props}>
      <primitive
        object={scene}
        onClick={handleClick}
      />
    </group>
  );
}

useGLTF.preload('/models/mua.glb');
