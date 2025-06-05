import { Link } from 'react-router-dom';

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  contributors: string[];
  status: 'completed' | 'incomplete';
}

const ProjectCard = ({ id, title, description, image, contributors, status }: ProjectCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1 h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-green-100 bg-opacity-75 p-4 rounded-t-3xl -mb-1">
          <h3 className="text-xl font-bold text-green-900  line-clamp-1">{title}</h3>
          <p className="text-sm text-gray-700 line-clamp-2">{description}</p>
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <div className="mb-3">
            <span className="text-sm font-medium text-gray-600">Contributors:</span>
            <p className="text-sm text-gray-700">{contributors.join(', ')}</p>
          </div>
          
          <div className="mb-4">
            <span className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
              status === 'completed' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {status === 'completed' ? 'Completed' : 'Upcoming'}
            </span>
          </div>
        </div>
        
        {status === 'completed' && (
          <div className='flex justify-center'>
            <Link 
            to={`/project/${id}`}
            className="inline-block w-fit text-center px-6 py-2 bg-green-700 hover:bg-green-800 text-white rounded-3xl transition-colors duration-200"
            >
              Read More
            </Link>
          </div>
          
        )}
      </div>
    </div>
  );
};

export default ProjectCard;