'use client';

import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <div className="relative bg-stone-100 pt-24 pb-32 sm:pt-32 sm:pb-40 lg:pt-40 lg:pb-48">
      <div className="relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block xl:inline">Graduation Show</span>
            <span className="block text-indigo-600 xl:inline">2025</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Discover the next generation of creators and innovators. A showcase of talent, dedication, and passion.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
