'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

import { AppleModel } from './models/AppleModel';
import { FlowerModel } from './models/FlowerModel';
import { KimModel } from './models/KimModel';
import { ParkModel } from './models/ParkModel';
import { MuaModel } from './models/MuaModel';

const modelComponents: { [key: string]: React.ElementType } = {
  Apple: AppleModel,
  Flower: FlowerModel,
  Kim: KimModel,
  Park: ParkModel,
  Mua: MuaModel,
};

function ThreeDScene({ name }: { name: string }) {
  const CurrentModel = modelComponents[name] || null;

  return (
    <Canvas style={{ background: '#f0f0f0' }}>
      <ambientLight intensity={1.5} />
      <Environment preset="sunset" />
      <Suspense fallback={null}>
        {CurrentModel && <CurrentModel />}
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

export default ThreeDScene;