'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';

import { AppleModel } from './models/AppleModel';
import { FlowerModel } from './models/FlowerModel';
import { KimModel } from './models/KimModel';
import { MuaModel } from './models/MuaModel';
import { ParkModel } from './models/ParkModel';

// --- MAIN 3D SCENE COMPONENT ---
const ThreeDScene = () => {
  // Define the list of models to be rendered in the scene.
  const models: { Component: React.ElementType; props: any }[] = [
    { Component: FlowerModel, props: { position: [-4, -1.0, 0], scale: 0.72, speedMultiplier: 1 } },
    { Component: KimModel, props: { position: [0, -0.5, 0], scale: 0.8, speedMultiplier: 0.5 } },
    { Component: MuaModel, props: { position: [-1.5, 1.0, 0], scale: 0.98, speedMultiplier: 1 } },
    { Component: ParkModel, props: { position: [4, 0, 0], scale: 39, speedMultiplier: 0.5 } },
    { Component: AppleModel, props: { position: [0.5, -2.0, 0], scale: 1.4, speedMultiplier: 1 } },
  ];

  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 35 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="city" />

      <Suspense fallback={null}>
        <group>
          {models.map(({ Component, props }, index) => (
            <Component key={index} {...props} />
          ))}
        </group>
      </Suspense>

      <OrbitControls enableZoom={true} enablePan={false} />
    </Canvas>
  );
};

export default ThreeDScene;
