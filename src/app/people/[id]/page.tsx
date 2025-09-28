import projects from '@/data/projects.json';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    id: string;
  };
}

export default function PersonPage({ params }: PageProps) {
  const projectId = parseInt(params.id, 10);
  const project = projects.find(p => p.id === projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Image */}
          <div className="mb-8 lg:mb-0">
            <div className="aspect-w-1 aspect-h-1">
              <div className="w-full h-96 bg-gray-200 rounded-lg flex items-center justify-center shadow-lg">
                 <span className="text-gray-500">Image for {project.title}</span>
              </div>
            </div>
          </div>

          {/* Project Info */}
          <div>
            <p className="text-base font-semibold text-indigo-600 uppercase tracking-wide">
              Student Project
            </p>
            <h1 className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl tracking-tight">
              {project.title}
            </h1>
            <h2 className="mt-4 text-2xl font-bold text-gray-700">
              by {project.student}
            </h2>
            <p className="mt-6 text-xl text-gray-500">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
