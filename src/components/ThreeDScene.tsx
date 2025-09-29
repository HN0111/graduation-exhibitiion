'use client';

import * as THREE from 'three';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import { useRouter } from 'next/navigation';

// Component to load and display a single model
function Model({ path, speedMultiplier = 1, ...props }) {
  const modelRef = useRef();
  const { scene } = useGLTF(path);
  const router = useRouter();

  // Store random rotation speeds in a ref to persist them across renders
  const rotationSpeeds = useRef({
    x: (Math.random() - 0.5) * 0.8, // Random value between -0.4 and 0.4
    y: (Math.random() - 0.5) * 0.8,
    z: (Math.random() - 0.5) * 0.8,
  });

  // Extract model name from path for the URL
  const modelName = path.split('/').pop()?.split('.')[0].toLowerCase();

  const handleClick = () => {
    if (modelName) {
      router.push(`/projects/${modelName}`);
    }
  };

  // Add continuous rotation with random speeds
  useFrame((state, delta) => {
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

// Preload models for faster loading
useGLTF.preload('/models/Flower.glb');
useGLTF.preload('/models/Kim.glb');
useGLTF.preload('/models/mua.glb');
useGLTF.preload('/models/Apple.glb');
useGLTF.preload('/models/Park.glb');

// Main 3D scene component
const ThreeDScene = () => {
  const models = [
    { path: '/models/Flower.glb', position: [-4, -1.0, 0], scale: 0.72, speedMultiplier: 1 },
    { path: '/models/Kim.glb', position: [0, -0.5, 0], scale: 0.8, speedMultiplier: 0.5 },
    { path: '/models/mua.glb', position: [-1.5, 1.0, 0], scale: 0.98, speedMultiplier: 1 },
    { path: '/models/Apple.glb', position: [0.5, -2.0, 0], scale: 1.4, speedMultiplier: 1 },
    { path: '/models/Park.glb', position: [4, 0, 0], scale: 39, speedMultiplier: 0.5 },
  ];

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="city" />
      
      <group>
        {models.map((model, index) => (
          <Model 
            key={index} 
            path={model.path} 
            position={model.position} 
            scale={model.scale} 
            speedMultiplier={model.speedMultiplier} 
          />
        ))}
      </group>

      <OrbitControls enableZoom={true} enablePan={false} />


    </Canvas>
  );
};

export default ThreeDScene;
