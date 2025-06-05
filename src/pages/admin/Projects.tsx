import { useState } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import AdminForm from '../../components/admin/AdminForm';
import { projects as initialProjects } from '../../data';

const Projects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProject, setEditingProject] = useState<null | any>(null);
  
  const handleCreate = (data: Record<string, string>) => {
    const contributorsArray = data.contributors.split(',').map(c => c.trim());
    
    const newProject = {
      id: projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1,
      title: data.title,
      description: data.description,
      image: data.image,
      contributors: contributorsArray,
      status: data.status as 'completed' | 'incomplete',
      content: data.status === 'completed' ? {
        background: data.background,
        methodology: data.methodology,
        results: data.results,
        conclusions: data.conclusions,
        recommendations: data.recommendations,
        application: data.application
      } : undefined
    };
    
    setProjects([...projects, newProject]);
    setShowCreateForm(false);
  };
  
  const handleEdit = (data: Record<string, string>) => {
    if (!editingProject) return;
    
    const contributorsArray = data.contributors.split(',').map(c => c.trim());
    
    setProjects(projects.map(project => 
      project.id === editingProject.id
        ? { 
            ...project, 
            title: data.title,
            description: data.description,
            image: data.image,
            contributors: contributorsArray,
            status: data.status as 'completed' | 'incomplete',
            content: data.status === 'completed' ? {
              background: data.background,
              methodology: data.methodology,
              results: data.results,
              conclusions: data.conclusions,
              recommendations: data.recommendations,
              application: data.application
            } : undefined
         }
        : project
    ));
    
    setEditingProject(null);
  };
  
  const handleDelete = (id: number) => {
    setProjects(projects.filter(project => project.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-xl transition-colors duration-200 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create
        </button>
      </div>
      
      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Project Title
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
              <tr key={project.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {project.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {project.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    project.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status === 'completed' ? 'Completed' : 'Upcoming'}
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
                      onClick={() => handleDelete(project.id)}
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
                  No projects found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Create Form */}
      
      {showCreateForm && (
        <AdminForm
          title="Add New Project"
          fields={[
            { name: 'title', label: 'Project Title', type: 'text', defaultValue: '', required: true },
            { name: 'description', label: 'Brief Description', type: 'textarea', defaultValue: '', required: true },
            { name: 'image', label: 'Image URL', type: 'text', defaultValue: 'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', required: true },
            { name: 'contributors', label: 'Contributors (comma-separated)', type: 'text', defaultValue: '', required: true },
            { 
              name: 'status', 
              label: 'Status', 
              type: 'select', 
              defaultValue: 'incomplete',
              options: [
                { value: 'completed', label: 'Completed' },
                { value: 'incomplete', label: 'Upcoming' }
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
          title="Edit Project"
          fields={[
            { name: 'title', label: 'Project Title', type: 'text', defaultValue: editingProject.title, required: true },
            { name: 'description', label: 'Brief Description', type: 'textarea', defaultValue: editingProject.description, required: true },
            { name: 'image', label: 'Image URL', type: 'text', defaultValue: editingProject.image, required: true },
            { name: 'contributors', label: 'Contributors (comma-separated)', type: 'text', defaultValue: editingProject.contributors.join(', '), required: true },
            { 
              name: 'status', 
              label: 'Status', 
              type: 'select', 
              defaultValue: editingProject.status,
              options: [
                { value: 'completed', label: 'Completed' },
                { value: 'incomplete', label: 'Upcoming' }
              ],
              required: true 
            },
            { name: 'background', label: 'Background', type: 'textarea', defaultValue: editingProject.content?.background || '' },
            { name: 'methodology', label: 'Methodology', type: 'textarea', defaultValue: editingProject.content?.methodology || '' },
            { name: 'results', label: 'Main Results', type: 'textarea', defaultValue: editingProject.content?.results || '' },
            { name: 'conclusions', label: 'Conclusions', type: 'textarea', defaultValue: editingProject.content?.conclusions || '' },
            { name: 'recommendations', label: 'Recommendations', type: 'textarea', defaultValue: editingProject.content?.recommendations || '' },
            { name: 'application', label: 'Application at AgriDynamic', type: 'textarea', defaultValue: editingProject.content?.application || '' }
          ]}
          onSubmit={handleEdit}
          onClose={() => setEditingProject(null)}
        />
      )}
    </div>
  );
};

export default Projects;