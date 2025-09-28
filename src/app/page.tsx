import Image from 'next/image';
import ThreeDScene from '@/components/ThreeDScene';

export default function Home() {
  return (
    <main className="h-screen w-screen">
      <ThreeDScene />
    </main>
  );
}