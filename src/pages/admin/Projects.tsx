// frontend/src/pages/admin/Projects.tsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash } from 'lucide-react';
import AdminForm from '../../components/admin/AdminForm'; // Ensure this path is correct

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const ARTICLES_API_URL = `${API_BASE_URL}/articles`;

interface AdminContentItem {
  _id: string;
  title: string;
  description: string;
  image: string;
  // author: { _id: string; name: string; email: string; } | string; // Ensure this is commented out or removed if not in schema
  published: boolean;
  createdAt: string;
  updatedAt?: string;
  contributors?: [];
  status: 'upcoming' | 'completed' | 'in-progress' | 'archived';
  background?: string;
  methodology?: string;
  results?: string;
  conclusions?: string;
  recommendations?: string;
  application?: string;
}

const Projects = () => {
  const [projects, setProjects] = useState<AdminContentItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProject, setEditingProject] = useState<AdminContentItem | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<AdminContentItem[]>(ARTICLES_API_URL);
      setProjects(response.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Failed to load projects.');
      } else {
        setError('An unexpected error occurred while loading projects.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // --- HANDLE CREATE ---
  const handleCreate = async ({ formData, imageFile, imageUrlInput }: { formData: Record<string, string>; imageFile: File | null; imageUrlInput: string }) => {
    // You should use the raw formData.contributors string now that the backend parses it.
    // So, remove the `contributorsArray` creation and JSON.stringify.
    // const contributorsArray = formData.contributors ? formData.contributors.split(',').map(c => c.trim()) : [];

    let backendStatus = formData.status;
    if (formData.status === 'incomplete') {
      backendStatus = 'upcoming';
    }

    const dataToSend = new FormData();

    // Append all form data fields
    for (const key in formData) {
      if (key === 'image') {
        // Handle image separately below
        continue;
      }
      // Special handling for contributors to send raw string
      if (key === 'contributors') {
          dataToSend.append('contributors', formData[key]); // Send as raw comma-separated string
      } else if (key === 'status') {
          dataToSend.append('status', backendStatus); // Use the adjusted status
      }
      else {
        dataToSend.append(key, formData[key]);
      }
    }
    // No need to append 'status' or 'contributors' here again.
    // dataToSend.append('contributors', JSON.stringify(contributorsArray)); // REMOVE THIS LINE
    // dataToSend.append('status', backendStatus); // REMOVE THIS LINE

    dataToSend.append('published', 'false'); // Always default to false for create

    if (imageFile) {
      dataToSend.append('image', imageFile); // Append the actual file
    } else if (imageUrlInput) {
      dataToSend.append('image', imageUrlInput); // Append the URL string
    } else {
      alert('Please provide an image URL or upload an image file.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      await axios.post(ARTICLES_API_URL, dataToSend);

      setShowCreateForm(false);
      await fetchProjects();
    } catch (err) {
      console.error('Error creating project:', err);
      if (axios.isAxiosError(err) && err.response) {
        alert(`Error creating project: ${err.response.data.message || 'Server error'}`);
      } else {
        alert('An unexpected error occurred during creation.');
      }
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLE EDIT ---
  const handleEdit = async ({ formData, imageFile, imageUrlInput }: { formData: Record<string, string>; imageFile: File | null; imageUrlInput: string }) => {
    if (!editingProject) return;

    // You should use the raw formData.contributors string now that the backend parses it.
    // So, remove the `contributorsArray` creation and JSON.stringify.
    // const contributorsArray = formData.contributors ? formData.contributors.split(',').map(c => c.trim()) : [];

    const dataToSend = new FormData();

    // Append all form data fields
    for (const key in formData) {
      if (key === 'image') {
        // Handle image separately below
        continue;
      }
      // Special handling for contributors to send raw string
      if (key === 'contributors') {
          dataToSend.append('contributors', formData[key]); // Send as raw comma-separated string
      } else {
        dataToSend.append(key, formData[key]);
      }
    }
    // No need to append 'contributors' or 'status' here again.
    // dataToSend.append('contributors', JSON.stringify(contributorsArray)); // REMOVE THIS LINE
    // dataToSend.append('status', formData.status); // REMOVE THIS LINE

    dataToSend.append('published', String(editingProject.published)); // Keep existing published status

    if (imageFile) {
      dataToSend.append('image', imageFile); // Append the actual file
    } else if (imageUrlInput !== editingProject.image) { // Only send URL if it has changed
      dataToSend.append('image', imageUrlInput);
    }
    // If no new file and URL hasn't changed, 'image' field is not appended to FormData,
    // so the backend won't update it (it will retain the existing image).

    try {
      setLoading(true);
      await axios.put(`${ARTICLES_API_URL}/${editingProject._id}`, dataToSend);

      setEditingProject(null);
      await fetchProjects();
    } catch (err) {
      console.error('Error updating project:', err);
      if (axios.isAxiosError(err) && err.response) {
        alert(`Error updating project: ${err.response.data.message || 'Server error'}`);
      } else {
        alert('An unexpected error occurred during update.');
      }
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLE DELETE ---
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    try {
      setLoading(true);
      await axios.delete(`${ARTICLES_API_URL}/${id}`);
      await fetchProjects();
    } catch (err) {
      console.error('Error deleting project:', err);
      if (axios.isAxiosError(err) && err.response) {
        alert(`Error deleting project: ${err.response.data.message || 'Server error'}`);
      } else {
        alert('An unexpected error occurred during deletion.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-4 text-center text-gray-700">Loading projects...</div>;
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Projects/Articles</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-3xl transition-colors duration-200 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-lg ">
        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto ">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project/Article Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {projects.map((project) => (
              <tr key={project._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {project._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {project.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    project.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : project.status === 'in-progress'
                      ? 'bg-blue-100 text-blue-800'
                      : project.status === 'upcoming'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingProject(project)}
                      className="text-green-700 hover:text-green-900"
                      aria-label={`Edit ${project.title}`}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(project._id)}
                      className="text-red-600 hover:text-red-800"
                      aria-label={`Delete ${project.title}`}
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {projects.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  No projects/articles found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <AdminForm
          title="Add New Project/Article"
          fields={[
            { name: 'title', label: 'Title', type: 'text', defaultValue: '', required: true },
            { name: 'description', label: 'Brief Description', type: 'textarea', defaultValue: '', required: true },
            { name: 'image', label: 'Image', type: 'imageUpload', defaultValue: '', required: true },
            { name: 'contributors', label: 'Contributors (comma-separated)', type: 'text', defaultValue: '' },
            {
              name: 'status',
              label: 'Status',
              type: 'select',
              defaultValue: 'upcoming',
              options: [
                { value: 'upcoming', label: 'Upcoming' },
                { value: 'in-progress', label: 'In-Progress' },
                { value: 'completed', label: 'Completed' },
                { value: 'archived', label: 'Archived' }
              ],
              required: true
            },
            { name: 'background', label: 'Background', type: 'textarea', defaultValue: '' },
            { name: 'methodology', label: 'Methodology', type: 'textarea', defaultValue: '' },
            { name: 'results', label: 'Main Results', type: 'textarea', defaultValue: '' },
            { name: 'conclusions', label: 'Conclusions', type: 'textarea', defaultValue: '' },
            { name: 'recommendations', label: 'Recommendations', type: 'textarea', defaultValue: '' },
            { name: 'application', label: 'Application at AgriDynamic', type: 'textarea', defaultValue: '' }
          ]}
          onSubmit={handleCreate}
          onClose={() => setShowCreateForm(false)}
        />
      )}

      {/* Edit Form */}
      {editingProject && (
        <AdminForm
          title="Edit Project/Article"
          fields={[
            { name: 'title', label: 'Title', type: 'text', defaultValue: editingProject.title, required: true },
            { name: 'description', label: 'Brief Description', type: 'textarea', defaultValue: editingProject.description, required: true },
            { name: 'image', label: 'Image', type: 'imageUpload', defaultValue: editingProject.image, required: true },
            { name: 'contributors', label: 'Contributors (comma-separated)', type: 'text', defaultValue: editingProject.contributors?.join(', ') || '' },
            {
              name: 'status',
              label: 'Status',
              type: 'select',
              defaultValue: editingProject.status,
              options: [
                { value: 'upcoming', label: 'Upcoming' },
                { value: 'in-progress', label: 'In-Progress' },
                { value: 'completed', label: 'Completed' },
                { value: 'archived', label: 'Archived' }
              ],
              required: true
            },
            { name: 'background', label: 'Background', type: 'textarea', defaultValue: editingProject.background || '' },
            { name: 'methodology', label: 'Methodology', type: 'textarea', defaultValue: editingProject.methodology || '' },
            { name: 'results', label: 'Main Results', type: 'textarea', defaultValue: editingProject.results || '' },
            { name: 'conclusions', label: 'Conclusions', type: 'textarea', defaultValue: editingProject.conclusions || '' },
            { name: 'recommendations', label: 'Recommendations', type: 'textarea', defaultValue: editingProject.recommendations || '' },
            { name: 'application', label: 'Application at AgriDynamic', type: 'textarea', defaultValue: editingProject.application || '' }
          ]}
          onSubmit={handleEdit}
          onClose={() => setEditingProject(null)}
          initialImageUrl={editingProject.image}
        />
      )}
    </div>
  );
};

export default Projects;