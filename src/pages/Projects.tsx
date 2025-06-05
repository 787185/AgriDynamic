import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data';

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [activeTab, setActiveTab] = useState('all');
  
  useEffect(() => {
    let result = projects;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        project => 
          project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.contributors.some(contributor => 
            contributor.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }
    
    // Filter by status tab
    if (activeTab === 'completed') {
      result = result.filter(project => project.status === 'completed');
    } else if (activeTab === 'upcoming') {
      result = result.filter(project => project.status === 'incomplete');
    }
    
    setFilteredProjects(result);
  }, [searchTerm, activeTab]);
  
  const completedProjects = filteredProjects.filter(project => project.status === 'completed');
  const upcomingProjects = filteredProjects.filter(project => project.status === 'incomplete');

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Our Research Projects</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Explore our evidence-based research that informs our programs and contributes to broader systems change.
          </p>
        </div>
      </div>
      
      {/* Search and Filter */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Bar */}
            <div className="relative flex-grow max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              />
            </div>
            
            {/* Tabs */}
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'all'
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  activeTab === 'upcoming'
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Upcoming
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Projects Content */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Completed Projects */}
          {(activeTab === 'all' || activeTab === 'completed') && completedProjects.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Completed Projects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {completedProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    contributors={project.contributors}
                    status={project.status}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Upcoming Projects */}
          {(activeTab === 'all' || activeTab === 'upcoming') && upcomingProjects.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Projects</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {upcomingProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    id={project.id}
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    contributors={project.contributors}
                    status={project.status}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* No Results */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No projects found matching your search criteria.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveTab('all');
                }}
                className="mt-4 px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-md transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;