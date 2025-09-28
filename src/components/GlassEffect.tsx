'use client';

const GlassEffect = () => {
  return (
    <div 
      className="absolute inset-0 z-10 pointer-events-none backdrop-blur-md"
    >
      {/* Shimmering overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
        style={{ backgroundSize: '400% 400%' }}
      />
    </div>
  );
};

export default GlassEffect;