'use client';

import * as THREE from 'three';
import { useRef, Suspense } from 'react';
import { Canvas, useFrame, GroupProps, RootState, useLoader } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useRouter } from 'next/navigation';

// --- TYPE DEFINITIONS ---
interface ModelProps extends GroupProps {
  path: string;
  speedMultiplier?: number;
}

// --- MODEL COMPONENT (for GLB models) ---
function Model({ path, speedMultiplier = 1, ...props }: ModelProps) {
  const modelRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF(path);
  const router = useRouter();

  const rotationSpeeds = useRef({
    x: (Math.random() - 0.5) * 0.8,
    y: (Math.random() - 0.5) * 0.8,
    z: (Math.random() - 0.5) * 0.8,
  });

  const modelName = path.split('/').pop()?.split('.')[0].toLowerCase();

  const handleClick = () => {
    if (modelName) {
      router.push(`/projects/${modelName}`);
    }
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

// Preload models for faster initial loading.
useGLTF.preload('/models/Apple.glb');
useGLTF.preload('/models/Flower.glb');
useGLTF.preload('/models/Kim.glb');
useGLTF.preload('/models/mua.glb');
useGLTF.preload('/models/Park.glb');


// --- MAIN 3D SCENE COMPONENT ---
const ThreeDScene = () => {
  // Define the list of models to be rendered in the scene.
  const models = [
    { path: '/models/Flower.glb', position: [-4, -1.0, 0], scale: 0.72, speedMultiplier: 1 },
    { path: '/models/Kim.glb', position: [0, -0.5, 0], scale: 0.8, speedMultiplier: 0.5 },
    { path: '/models/mua.glb', position: [-1.5, 1.0, 0], scale: 0.98, speedMultiplier: 1 },
    { path: '/models/Park.glb', position: [4, 0, 0], scale: 39, speedMultiplier: 0.5 },
    { path: '/models/Apple.glb', position: [0.5, -2.0, 0], scale: 1.4, speedMultiplier: 1 },
  ];

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="city" />
      
      <Suspense fallback={null}>
        <group>
          {models.map((model, index) => (
            <Model 
              key={index} 
              path={model.path} 
              position={model.position as [number, number, number]} // Type assertion for position
              scale={model.scale} 
              speedMultiplier={model.speedMultiplier} 
            />
          ))}
        </group>
      </Suspense>

      <OrbitControls enableZoom={true} enablePan={false} />
    </Canvas>
  );
};

export default ThreeDScene;