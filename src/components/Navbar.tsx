'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }} 
      animate={{ y: 0 }} 
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-semibold text-gray-900">Graduation Show</Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">About</Link>
              <Link href="/projects" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Projects</Link>
              <Link href="/people" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">People</Link>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
