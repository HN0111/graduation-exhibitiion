'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';

// 컴포넌트가 받을 props의 타입을 정의합니다.
interface ModelProps {
  name: string;
}

// 실제 3D 모델을 로드하고 화면에 표시하는 컴포넌트입니다.
// 이제 'name' prop을 사용해 올바른 파일 경로를 동적으로 생성합니다.
function Model({ name }: ModelProps) {
  const modelPath = `/models/${name}.glb`;
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} />;
}

// 메인 씬 컴포넌트의 props 타입을 정의합니다.
interface ThreeDSceneProps {
  name: string;
}

// 이제 메인 컴포넌트가 'name' prop을 받아 Model 컴포넌트로 전달합니다.
const ThreeDScene = ({ name }: ThreeDSceneProps) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        <Model name={name} />
        <Environment preset="sunset" />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeDScene;