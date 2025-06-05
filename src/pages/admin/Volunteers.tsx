import { useState } from 'react';
import { Plus, Edit, Trash } from 'lucide-react';
import AdminForm from '../../components/admin/AdminForm';
import { volunteers as initialVolunteers } from '../../data';

const Volunteers = () => {
  const [volunteers, setVolunteers] = useState(initialVolunteers);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingVolunteer, setEditingVolunteer] = useState<null | { id: number; firstName: string; lastName: string; email: string }>(null);
  
  const handleCreate = (data: Record<string, string>) => {
    const newVolunteer = {
      id: volunteers.length > 0 ? Math.max(...volunteers.map(v => v.id)) + 1 : 1,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email
    };
    
    setVolunteers([...volunteers, newVolunteer]);
    setShowCreateForm(false);
  };
  
  const handleEdit = (data: Record<string, string>) => {
    if (!editingVolunteer) return;
    
    setVolunteers(volunteers.map(volunteer => 
      volunteer.id === editingVolunteer.id
        ? { 
            ...volunteer, 
            firstName: data.firstName, 
            lastName: data.lastName, 
            email: data.email 
          }
        : volunteer
    ));
    
    setEditingVolunteer(null);
  };
  
  const handleDelete = (id: number) => {
    setVolunteers(volunteers.filter(volunteer => volunteer.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Volunteers</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-md transition-colors duration-200 flex items-center"
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
                First Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email Address
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {volunteers.map((volunteer) => (
              <tr key={volunteer.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {volunteer.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {volunteer.firstName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {volunteer.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {volunteer.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingVolunteer(volunteer)}
                      className="text-green-700 hover:text-green-900"
                      aria-label={`Edit ${volunteer.firstName} ${volunteer.lastName}`}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(volunteer.id)}
                      className="text-red-600 hover:text-red-800"
                      aria-label={`Delete ${volunteer.firstName} ${volunteer.lastName}`}
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
            {volunteers.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                  No volunteers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Create Form */}
      {showCreateForm && (
        <AdminForm
          title="Add New Volunteer"
          fields={[
            { name: 'firstName', label: 'First Name', type: 'text', defaultValue: '', required: true },
            { name: 'lastName', label: 'Last Name', type: 'text', defaultValue: '', required: true },
            { name: 'email', label: 'Email Address', type: 'email', defaultValue: '', required: true }
          ]}
          onSubmit={handleCreate}
          onClose={() => setShowCreateForm(false)}
        />
      )}
      
      {/* Edit Form */}
      {editingVolunteer && (
        <AdminForm
          title="Edit Volunteer"
          fields={[
            { name: 'firstName', label: 'First Name', type: 'text', defaultValue: editingVolunteer.firstName, required: true },
            { name: 'lastName', label: 'Last Name', type: 'text', defaultValue: editingVolunteer.lastName, required: true },
            { name: 'email', label: 'Email Address', type: 'email', defaultValue: editingVolunteer.email, required: true }
          ]}
          onSubmit={handleEdit}
          onClose={() => setEditingVolunteer(null)}
        />
      )}
    </div>
  );
};

export default Volunteers;