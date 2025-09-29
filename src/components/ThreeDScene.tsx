'use client';

import * as THREE from 'three';
import { useRef } from 'react';
import { Canvas, useFrame, GroupProps, RootState } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import { useRouter } from 'next/navigation';

// --- TYPE DEFINITIONS ---
// Define the types for the props the Model component will receive.
// This includes the path for the GLTF model and any standard group properties.
interface ModelProps extends GroupProps {
  path: string;
  speedMultiplier?: number;
}

// --- MODEL COMPONENT ---
// Component to load and display a single 3D model.
function Model({ path, speedMultiplier = 1, ...props }: ModelProps) {
  // Use a ref to get direct access to the THREE.Group object.
  // We type it with THREE.Group to get autocompletion and type checking.
  const modelRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF(path);
  const router = useRouter();

  // Store random rotation speeds in a ref to persist them across renders.
  const rotationSpeeds = useRef({
    x: (Math.random() - 0.5) * 0.8,
    y: (Math.random() - 0.5) * 0.8,
    z: (Math.random() - 0.5) * 0.8,
  });

  // Extract the model name from the file path to use as a URL parameter.
  const modelName = path.split('/').pop()?.split('.')[0].toLowerCase();

  const handleClick = () => {
    if (modelName) {
      router.push(`/projects/${modelName}`);
    }
  };

  // useFrame runs on every rendered frame.
  // We type the 'state' and 'delta' arguments for type safety.
  useFrame((state: RootState, delta: number) => {
    if (modelRef.current) {
      const speed = speedMultiplier;
      modelRef.current.rotation.y += delta * rotationSpeeds.current.y * speed;
      modelRef.current.rotation.x += delta * rotationSpeeds.current.x * speed;
      modelRef.current.rotation.z += delta * rotationSpeeds.current.z * speed;
    }
  });

  return (
    // Pass the ref and any other props to the group.
    <group ref={modelRef} {...props}>
      <primitive 
        object={scene} 
        onClick={handleClick}
      />
    </group>
  );
}

// Preload models for faster initial loading. This is done once.
useGLTF.preload('/models/Flower.glb');
useGLTF.preload('/models/Kim.glb');
useGLTF.preload('/models/mua.glb');


// --- MAIN 3D SCENE COMPONENT ---
const ThreeDScene = () => {
  // Define the list of models to be rendered in the scene.
  const models = [
    { path: '/models/Flower.glb', position: [-4, 0, 0], scale: 1.5, speedMultiplier: 1 },
    { path: '/models/Kim.glb', position: [0, -0.5, 0], scale: 0.8, speedMultiplier: 0.5 },
    { path: '/models/mua.glb', position: [4, 0, 0], scale: 0.7, speedMultiplier: 1 },
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
            position={model.position as [number, number, number]} // Type assertion for position
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
