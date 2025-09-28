'use client';

import { useParams } from 'next/navigation';
import projects from '@/data/projects.json';
import { motion } from 'framer-motion';

const ProjectDetailPage = () => {
  const params = useParams();
  const id = params.id;
  const project = projects.find((p) => p.id.toString() === id);

  if (!project) {
    return (
      <div className="text-center py-24">
        <h1 className="text-3xl font-extrabold text-gray-900">Project not found.</h1>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
        >
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">{project.title}</h1>
            <p className="mt-4 max-w-xl mx-auto text-xl text-gray-500">by {project.student}</p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12"
          >
            <img src={project.image} alt={project.title} className="rounded-lg shadow-2xl w-full" />
          </motion.div>

          <div className="mt-12 max-w-3xl mx-auto text-lg text-gray-700">
            <p>{project.description}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
