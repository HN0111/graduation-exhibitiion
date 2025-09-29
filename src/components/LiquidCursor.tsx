'use client';

import { useEffect, useRef } from 'react';

// Helper function for linear interpolation
const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;

const WobblyRingCursor = () => {
  const orbRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const previousMouse = useRef({ x: 0, y: 0 });
  const orb = useRef({ x: 0, y: 0, scaleX: 1, scaleY: 1 });
  const animationFrameId = useRef<number>(0); // 타입 수정

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    const tick = () => {
      // Calculate mouse velocity
      const speed = Math.hypot(mouse.current.x - previousMouse.current.x, mouse.current.y - previousMouse.current.y);

      // Spring physics for position
      orb.current.x = lerp(orb.current.x, mouse.current.x, 0.1);
      orb.current.y = lerp(orb.current.y, mouse.current.y, 0.1);

      // Squash and stretch based on velocity
      const targetScale = 1 + speed * 0.08; // Reduced stretch effect
      orb.current.scaleX = lerp(orb.current.scaleX, targetScale, 0.15);
      orb.current.scaleY = lerp(orb.current.scaleY, 1 / targetScale, 0.15);

      // Calculate rotation based on movement direction
      const angle = Math.atan2(mouse.current.y - previousMouse.current.y, mouse.current.x - previousMouse.current.x) * (180 / Math.PI);

      if (orbRef.current) {
        orbRef.current.style.transform = `translate(${orb.current.x}px, ${orb.current.y}px) rotate(${angle}deg) scaleX(${orb.current.scaleX}) scaleY(${orb.current.scaleY})`;
      }

      previousMouse.current = mouse.current;
      animationFrameId.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <div
      ref={orbRef}
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '30px',
        height: '30px',
        marginLeft: '-15px',
        marginTop: '-15px',
        borderRadius: '50%',
        background: 'transparent',
        border: '3px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default WobblyRingCursor;
