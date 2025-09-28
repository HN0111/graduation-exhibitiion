'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  student: string;
  description: string;
  image: string;
}

interface FeaturedProjectProps {
  project: Project;
  reverse?: boolean;
}

const FeaturedProject = ({ project, reverse = false }: FeaturedProjectProps) => {
  const imageVariants = {
    hidden: { opacity: 0, x: reverse ? 100 : -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.3 } },
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center`}>
        <motion.div 
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <img src={project.image} alt={project.title} className="rounded-lg shadow-2xl" />
        </motion.div>
        <motion.div 
          variants={textVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={`w-full md:w-1/2 mt-8 md:mt-0 ${reverse ? 'md:pr-12' : 'md:pl-12'}`}
        >
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">{project.title}</h2>
          <p className="mt-3 text-lg text-gray-500">by {project.student}</p>
          <p className="mt-4 text-lg text-gray-500">{project.description}</p>
          <div className="mt-6">
            <Link href={`/project/${project.id}`} className="inline-block bg-indigo-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-indigo-700 transition-colors">
              View Project
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FeaturedProject;
