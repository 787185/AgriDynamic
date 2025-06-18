// frontend/src/pages/Projects.tsx
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react'; // Import the Search icon
import ProjectCard from '../components/ProjectCard'; // Assuming this component exists

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
// Use the specific endpoint for cards
const ARTICLES_CARDS_API_URL = `${API_BASE_URL}/articles/cards`;

// --- UPDATED INTERFACE ---
// This interface reflects the fields returned by the /api/articles/cards endpoint
// and matches the "fundamental" fields of your unified Article model for cards.
interface ContentItem {
  _id: string;
  title: string;
  description: string;
  image: string;
  author: string; // Will be the ID, you might want to populate it in backend for display name
  status: 'upcoming' | 'completed' | 'in-progress' | 'archived'; // Status is part of card view
  // 'contributors' is NOT returned by /articles/cards based on your specification,
  // but if you need it for search, you'll need to fetch it or remove it from search logic.
  // For this component, I'll keep it in the search logic, assuming it will be there.
  contributors?: string[];
  // published, createdAt, updatedAt are NOT returned by /articles/cards based on your specification
}

const Projects = () => {
  const [allFetchedCards, setAllFetchedCards] = useState<ContentItem[]>([]); // Stores all cards fetched, before status/search filters
  const [displayedProjects, setDisplayedProjects] = useState<ContentItem[]>([]); // The projects actually rendered after filters
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<
    'all' | 'completed' | 'in-progress' | 'upcoming' | 'archived'
  >('all');

  // --- 1. Fetch ALL card data from API on component mount ---
  // This useEffect now runs only once to get all the fundamental data for cards.
  useEffect(() => {
    const fetchAllCards = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch data from the specific cards endpoint
        const response = await axios.get<ContentItem[]>(ARTICLES_CARDS_API_URL);
        setAllFetchedCards(response.data); // Store all cards
      } catch (err) {
        console.error('Error fetching project cards:', err);
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.message || 'Failed to load project cards.');
        } else {
          setError('An unexpected error occurred while loading project cards.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAllCards();
  }, []); // Empty dependency array means this runs once on mount

  // --- 2. Apply client-side filters (tab and search) whenever base data, tab, or search term changes ---
  useEffect(() => {
    let result = allFetchedCards; // Start with all fetched card data

    // First, filter by activeTab (status) if not 'all'
    if (activeTab !== 'all') {
      result = result.filter(project => project.status === activeTab);
    }

    // Then, apply search filter if a searchTerm is present
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      result = result.filter(
        project =>
          project.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          project.description.toLowerCase().includes(lowerCaseSearchTerm) ||
          project.contributors?.some(contributor => // Ensure contributors is handled as optional
            contributor.toLowerCase().includes(lowerCaseSearchTerm)
          )
      );
    }
    setDisplayedProjects(result); // Update the list for rendering
  }, [allFetchedCards, activeTab, searchTerm]); // Dependencies for client-side filtering

  // Helper to check if any projects exist for a given status (based on ALL fetched cards)
  const hasProjectsForTab = useCallback((status: string) => {
    if (status === 'all') return allFetchedCards.length > 0;
    return allFetchedCards.some(project => project.status === status);
  }, [allFetchedCards]);

  if (loading) {
    return <div className="pt-24 pb-16 px-4 text-center text-xl text-gray-700">Loading projects...</div>;
  }

  if (error) {
    return (
      <div className="pt-24 pb-16 px-4 text-center text-xl text-red-600">
        <p>Error: {error}</p>
        <p className="text-gray-600 text-lg mt-4">Please try refreshing the page or contact support.</p>
      </div>
    );
  }

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
            <div className="flex space-x-2 sm:space-x-4 overflow-x-auto pb-2 custom-scrollbar">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                  activeTab === 'all'
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                All Projects
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                  activeTab === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Completed
              </button>
              <button
                onClick={() => setActiveTab('in-progress')}
                className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                  activeTab === 'in-progress'
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                In-Progress
              </button>
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                  activeTab === 'upcoming'
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Upcoming
              </button>
              <button
                onClick={() => setActiveTab('archived')}
                className={`px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap ${
                  activeTab === 'archived'
                    ? 'bg-green-100 text-green-800'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Archived
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Content */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {displayedProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {displayedProjects.map((project) => (
                <ProjectCard
                  key={project._id}
                  _id={project._id}
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  contributors={project.contributors || []} // Ensure contributors is always an array
                  status={project.status || 'upcoming'} // Ensure status has a default if missing
                  // Removed 'contentType' as it's no longer part of the unified model or returned by this endpoint
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No projects found matching your criteria.</p>
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