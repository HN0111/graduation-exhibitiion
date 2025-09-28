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

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      <Link href={`/project/${project.id}`} className="block group">
        <div className="overflow-hidden rounded-lg">
          <img src={project.image} alt={project.title} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
          <p className="mt-1 text-base text-gray-500">{project.student}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProjectCard;
