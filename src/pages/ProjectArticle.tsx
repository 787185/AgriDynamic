import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { projects } from '../data';

const ProjectArticle = () => {
  const { id } = useParams<{ id: string }>();
  const projectId = parseInt(id || '0');
  
  const project = projects.find(p => p.id === projectId);
  
  if (!project || project.status !== 'completed') {
    return (
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">
            The project you're looking for doesn't exist or is not yet completed.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-medium rounded-md transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }
  
  const content = project.content;
  
  if (!content) {
    return (
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Content Not Available</h1>
          <p className="text-xl text-gray-600 mb-8">
            The content for this project is not available at the moment.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center px-6 py-3 bg-green-700 hover:bg-green-800 text-white font-medium rounded-md transition-colors duration-200"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold uppercase">{project.title}</h1>
          <div className="mt-2 text-sm text-green-100">
            <span>Contributors: {project.contributors.join(', ')}</span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg px-8 py-10 -mt-8 mb-16">
        <Link
          to="/projects"
          className="inline-flex items-center text-green-700 hover:text-green-800 mb-6"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Projects
        </Link>
        
        <div className="mb-8">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-green-700 mb-2">Background</h2>
            <p className="text-gray-700">{content.background}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-green-700 mb-2">Methodology</h2>
            <p className="text-gray-700">{content.methodology}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-green-700 mb-2">Main Results</h2>
            <p className="text-gray-700">{content.results}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-green-700 mb-2">Conclusions</h2>
            <p className="text-gray-700">{content.conclusions}</p>
          </section>
          
          <section>
            <h2 className="text-xl font-bold text-green-700 mb-2">Recommendations</h2>
            <p className="text-gray-700">{content.recommendations}</p>
          </section>
          
          <section className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-green-700 mb-2">Application at AgriDynamic</h2>
            <p className="text-gray-700">{content.application}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectArticle;