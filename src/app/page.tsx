'use client';

import { useState } from 'react';
import ThreeDScene from '@/components/ThreeDScene';

const models = ['Apple', 'Flower', 'Kim', 'Park', 'Mua'];

export default function Home() {
  const [modelName, setModelName] = useState('Kim');

  return (
    <main className="h-screen w-screen relative">
      <div className="absolute top-0 left-0 z-10 p-4 flex gap-2">
        {models.map((name) => (
          <button
            key={name}
            onClick={() => setModelName(name)}
            className={`px-4 py-2 rounded ${modelName === name ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {name}
          </button>
        ))}
      </div>
      <ThreeDScene name={modelName} />
    </main>
  );
}
