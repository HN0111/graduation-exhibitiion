import ProjectCard from '@/components/ProjectCard';
import projects from '@/data/projects.json';

const GalleryPage = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Gallery</h2>
          <p className="mt-4 text-lg leading-6 text-gray-500">
            Explore the amazing work of our talented students.
          </p>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
