'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, Environment, OrbitControls } from '@react-three/drei';

// Cloudflare R2 버킷의 공개 URL 주소입니다.
const R2_PUBLIC_URL = 'https://pub-76928191cc6045f998d59a3641f27efe.r2.dev';

// 모델 컴포넌트의 props 타입을 정의합니다.
interface ModelProps {
  name: string;
}

// R2에서 실제 3D 모델을 로드하고 화면에 표시하는 컴포넌트입니다.
function Model({ name }: ModelProps) {
  // R2 URL, 'models' 폴더 경로, 파일 이름을 안전하게 조합하여 최종 URL을 생성합니다.
  const modelUrl = new URL(`models/${name}.glb`, R2_PUBLIC_URL).toString();

  // useGLTF 훅을 사용해 R2에 있는 모델을 불러옵니다.
  const { scene } = useGLTF(modelUrl);
  return <primitive object={scene} />;
}

// 메인 씬 컴포넌트의 props 타입을 정의합니다.
interface ThreeDSceneProps {
  name: string;
}

// 메인 3D 씬 컴포넌트입니다.
const ThreeDScene = ({ name }: ThreeDSceneProps) => {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
      {/* 조명 설정 */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Suspense는 모델이 로드되는 동안 잠시 기다려주는 역할을 합니다. */}
      <Suspense fallback={null}>
        {/* name prop이 있을 때만 Model 컴포넌트를 렌더링합니다. */}
        {name && <Model name={name} />}
        <Environment preset="sunset" />
      </Suspense>
      
      {/* 마우스로 3D 모델을 회전, 확대/축소할 수 있게 해주는 컨트롤러입니다. */}
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeDScene;
