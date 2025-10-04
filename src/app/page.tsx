'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Cloudflare R2 버킷의 공개 URL 주소입니다.
const R2_PUBLIC_URL = 'https://pub-76928191cc6045f998d59a3641f27efe.r2.dev';

// 모델 컴포넌트의 props 타입을 정의합니다. (position 추가)
interface ModelProps {
  name: string;
  position: [number, number, number];
}

// R2에서 실제 3D 모델을 로드하고 화면에 표시하는 컴포-넌트입니다.
function Model({ name, position }: ModelProps) {
  // R2 URL, 'models' 폴더 경로, 파일 이름을 안전하게 조합하여 최종 URL을 생성합니다.
  const modelUrl = new URL(`models/${name}.glb`, R2_PUBLIC_URL).toString();

  // useGLTF 훅을 사용해 R2에 있는 모델을 불러옵니다.
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} position={position} />;
}

// 메인 씬 컴포넌트의 props 타입을 정의합니다. (name -> names 배열로 변경)
interface ThreeDSceneProps {
  names: string[];
}

// 메인 3D 씬 컴포넌트입니다.
const ThreeDScene = ({ names = [] }: ThreeDSceneProps) => {
  return (
    <Canvas camera={{ position: [0, 5, 12], fov: 50 }}>
      {/* 조명 설정 */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      
      {/* Suspense는 모델이 로드되는 동안 잠시 기다려주는 역할을 합니다. */}
      <Suspense fallback={null}>
        {/* names 배열을 순회하며 각 모델을 원형으로 배치합니다. */}
        {names.map((name, index) => {
          const angle = (index / names.length) * Math.PI * 2;
          const radius = 5; // 모델 간의 거리 (반지름)
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          return <Model key={name} name={name} position={[x, 0, z]} />;
        })}
        <Environment preset="sunset" />
      </Suspense>
      
      {/* 마우스로 3D 모델을 회전, 확대/축소할 수 있게 해주는 컨트롤러입니다. */}
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeDScene;
