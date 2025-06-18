// frontend/src/pages/ProjectArticle.tsx
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const ARTICLES_API_URL = `${API_BASE_URL}/articles`; // This endpoint will fetch the full article details

// --- REMOVED DetailedProjectContent INTERFACE ---
// The fields are now directly on ContentItem

// --- UPDATED ContentItem INTERFACE ---
// This now directly reflects the single, unified Article model structure from the backend
interface ContentItem {
  _id: string;
  title: string;
  description: string;
  image: string;
  author: { _id: string; name: string; email: string; } | string; // Expect populated author or just ID
  published: boolean;
  createdAt: string;
  updatedAt?: string;
  // Removed contentType: 'article' | 'project'; as it's no longer in the model
  contributors?: string[]; // Optional, as some articles might not have them
  status?: 'upcoming' | 'completed' | 'in-progress' | 'archived'; // Optional, as some articles might not have them
  
  // These fields are now directly on the ContentItem
  background?: string;
  methodology?: string;
  results?: string; // Corrected to 'results' as per backend schema
  conclusions?: string;
  recommendations?: string;
  application?: string; // Matches 'application' in the backend model
  // Removed 'body' and 'tags' as they were not in the final unified model fields
}

const ProjectArticle = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) {
        setError('Project/Article ID is missing from the URL.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);

        // --- FETCHING ALL FIELDS FROM THE UNIFIED ENDPOINT ---
        const response = await axios.get<ContentItem>(`${ARTICLES_API_URL}/${id}`);
        const fetchedContent = response.data;

        // --- SIMPLIFIED VALIDATION ---
        // Since we have a single model, we primarily check if the entry exists.
        // The frontend can then decide how to render based on the presence of specific fields
        // (e.g., if 'status' is 'completed' to show full detail, otherwise show a "coming soon" message).
        // I've removed the `contentType` check because the backend no longer sends it.
        // The `detailedProjectContent` check is also removed as fields are flat.

        // You might still want to apply a client-side filter here if you ONLY
        // want to show *completed* projects on this page. If the page is meant
        // for *any* detailed article (whether project or not, completed or not),
        // then remove this `if` block as well.
        if (fetchedContent.status !== 'completed' && fetchedContent.status !== 'in-progress') {
            setError('This project/article is not yet completed or in-progress, or its detailed content is not publicly available.');
            setProject(null);
        } else {
            setProject(fetchedContent);
        }
      } catch (err) {
        console.error('Error fetching project/article:', err);
        if (axios.isAxiosError(err) && err.response) {
          setError(err.response.data.message || 'Failed to load project/article details.');
        } else {
          setError('An unexpected error occurred while loading project/article details.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]); // Dependency on ID ensures re-fetch if ID changes

  // --- ERROR AND LOADING STATES ---
  if (loading) {
    return (
      <div className="pt-24 pb-16 px-4 text-center text-xl text-gray-700">
        Loading project/article details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Error Loading Content</h1>
          <p className="text-xl text-red-600 mb-8">{error}</p>
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

  // --- NO PROJECT / NOT AVAILABLE MESSAGE ---
  // Consolidated check to display a user-friendly message if the project isn't found
  // or doesn't meet the display criteria (e.g., if status isn't 'completed' or 'in-progress').
  // You might want to adjust these conditions based on what you consider "displayable".
  if (!project) {
    return (
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Content Not Found / Not Available</h1>
          <p className="text-xl text-gray-600 mb-8">
            The content you're looking for either doesn't exist, or its detailed version is not currently available for public viewing.
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

  // --- RENDER PROJECT/ARTICLE DETAILS ---
  // Access content fields directly from the project object
  return (
    <div className="pt-16">
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold uppercase">{project.title}</h1>
          <div className="mt-2 text-sm text-green-100">
            <span>Contributors: {project.contributors?.join(', ') || 'N/A'}</span>
          </div>
          {/* Display author name if populated */}
          {typeof project.author !== 'string' && (
            <div className="mt-1 text-sm text-green-100">
              <span>Author: {project.author.name}</span>
            </div>
          )}
        </div>
      </div>

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
          {/* Render sections only if content is available for them */}
          {project.background && (
            <section>
              <h2 className="text-xl font-bold text-green-700 mb-2">Background</h2>
              <p className="text-gray-700">{project.background}</p>
            </section>
          )}

          {project.methodology && (
            <section>
              <h2 className="text-xl font-bold text-green-700 mb-2">Methodology</h2>
              <p className="text-gray-700">{project.methodology}</p>
            </section>
          )}

          {project.results && (
            <section>
              <h2 className="text-xl font-bold text-green-700 mb-2">Main Results</h2>
              <p className="text-gray-700">{project.results}</p>
            </section>
          )}

          {project.conclusions && (
            <section>
              <h2 className="text-xl font-bold text-green-700 mb-2">Conclusions</h2>
              <p className="text-gray-700">{project.conclusions}</p>
            </section>
          )}

          {project.recommendations && (
            <section>
              <h2 className="text-xl font-bold text-green-700 mb-2">Recommendations</h2>
              <p className="text-gray-700">{project.recommendations}</p>
            </section>
          )}

          {project.application && (
            <section className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-green-700 mb-2">Application at AgriDynamic</h2>
              <p className="text-gray-700">{project.application}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectArticle;