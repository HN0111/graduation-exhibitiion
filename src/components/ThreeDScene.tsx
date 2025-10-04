'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

import { AppleModel } from './models/AppleModel';
import { FlowerModel } from './models/FlowerModel';
import { KimModel } from './models/KimModel';
import { ParkModel } from './models/ParkModel';
import { MuaModel } from './models/MuaModel';

const models = [
  { Component: FlowerModel, position: [-4, -1.0, 0], scale: 0.72 },
  { Component: KimModel, position: [0, -0.5, 0], scale: 0.8 },
  { Component: MuaModel, position: [-1.5, 1.0, 0], scale: 0.98 },
  { Component: ParkModel, position: [4, 0, 0], scale: 39 },
  { Component: AppleModel, position: [0.5, -2.0, 0], scale: 1.4 },
];

function ThreeDScene() {
  return (
    <Canvas style={{ background: '#f0f0f0' }} camera={{ position: [0, 0, 10], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Suspense fallback={null}>
        {models.map((model, index) => (
          <group key={index} position={model.position as [number, number, number]} scale={model.scale}>
            <model.Component />
          </group>
        ))}
        <Environment preset="city" />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

export default ThreeDScene;