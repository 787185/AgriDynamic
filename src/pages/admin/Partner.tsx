import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash, Loader } from 'lucide-react';
import AdminForm from '../../components/admin/AdminForm'; // Ensure this path is correct

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const PARTNERS_API_URL = `${API_BASE_URL}/partners`; // Changed API endpoint to partners


interface Partner {
  _id: string;
  name: string;
  logo: string; 
  link: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
}

const Partners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);

  // --- FETCH PARTNERS ---
  const fetchPartners = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Partner[]>(PARTNERS_API_URL);
      setPartners(response.data);
    } catch (err) {
      console.error('Error fetching partners:', err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Failed to load partners.');
      } else {
        setError('An unexpected error occurred while loading partners.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  // --- HANDLE CREATE ---
  const handleCreate = async ({ formData, imageFile, imageUrlInput }: { formData: Record<string, string>; imageFile: File | null; imageUrlInput: string }) => {
    setLoading(true);
    setError(null);

    const dataToSend = new FormData();

    // Append all form data fields
    for (const key in formData) {
      if (key === 'logo') { // 'logo' is the image field for partners
        continue; // Handle logo separately below
      }
      dataToSend.append(key, formData[key]);
    }

    if (imageFile) {
      dataToSend.append('logo', imageFile); // Append the actual file for logo
    } else if (imageUrlInput) {
      dataToSend.append('logo', imageUrlInput); // Append the URL string for logo
    } else {
      // This alert message matches the one in Projects.tsx for image validation
      alert('Please provide a logo URL or upload a logo image file.');
      setLoading(false);
      return;
    }

    try {
      await axios.post(PARTNERS_API_URL, dataToSend);
      setShowCreateForm(false);
      await fetchPartners(); // Refresh list
    } catch (err) {
      console.error('Error creating partner:', err);
      if (axios.isAxiosError(err) && err.response) {
        alert(`Error creating partner: ${err.response.data.message || 'Server error'}`);
      } else {
        alert('An unexpected error occurred during creation.');
      }
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLE EDIT ---
  const handleEdit = async ({ formData, imageFile, imageUrlInput }: { formData: Record<string, string>; imageFile: File | null; imageUrlInput: string }) => {
    if (!editingPartner) return;

    setLoading(true);
    setError(null);

    const dataToSend = new FormData();

    // Append all form data fields
    for (const key in formData) {
      if (key === 'logo') { // 'logo' is the image field for partners
        continue; // Handle logo separately below
      }
      dataToSend.append(key, formData[key]);
    }

    if (imageFile) {
      dataToSend.append('logo', imageFile); // Append the actual file for logo
    } else if (imageUrlInput !== editingPartner.logo) { // Only send URL if it has changed
      dataToSend.append('logo', imageUrlInput);
    }
    // If no new file and URL hasn't changed, 'logo' field is not appended, retaining existing.

    try {
      await axios.put(`${PARTNERS_API_URL}/${editingPartner._id}`, dataToSend);
      setEditingPartner(null);
      await fetchPartners(); // Refresh list
    } catch (err) {
      console.error('Error updating partner:', err);
      if (axios.isAxiosError(err) && err.response) {
        alert(`Error updating partner: ${err.response.data.message || 'Server error'}`);
      } else {
        alert('An unexpected error occurred during update.');
      }
    } finally {
      setLoading(false);
    }
  };

  // --- HANDLE DELETE ---
  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this partner?')) return;

    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${PARTNERS_API_URL}/${id}`);
      await fetchPartners(); // Refresh list
    } catch (err) {
      console.error('Error deleting partner:', err);
      if (axios.isAxiosError(err) && err.response) {
        alert(`Error deleting partner: ${err.response.data.message || 'Server error'}`);
      } else {
        alert('An unexpected error occurred during deletion.');
      }
    } finally {
      setLoading(false);
    }
  };

  // --- FORM FIELD DEFINITIONS ---
  // NO useMemo used, as per your instruction.
  // This array will be re-created on every render, potentially impacting AdminForm's internal state.
  const partnerFields = [
    { name: 'name', label: 'Partner Name', type: 'text', defaultValue: '', required: true, placeholder: 'Enter partner name' },
    { name: 'logo', label: 'Logo', type: 'imageUpload', defaultValue: '', required: true }, // Matches AdminForm's 'imageUpload' type
    { name: 'link', label: 'Website URL', type: 'url', defaultValue: '', placeholder: 'https://example.com' },
    { name: 'description', label: 'Description', type: 'textarea', defaultValue: '', rows: 4, placeholder: 'Brief description of the partner' },
  ];

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-700">
        <div className="flex justify-center text-4xl">
          Loading <Loader className="animate-spin h-10 w-10 ml-2" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-center text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Manage Partners</h1>
        <button
          onClick={() => setShowCreateForm(true)}
          className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-3xl transition-colors duration-200 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Partner
        </button>
      </div>

      {/* Partners Table */}
      <div className="bg-white shadow-md rounded-lg ">
        <table className="min-w-full divide-y divide-gray-200 overflow-x-auto ">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Partner Name
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Website
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {partners.map((partner) => (
              <tr key={partner._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {partner._id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {partner.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <a href={partner.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {partner.link}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingPartner(partner)}
                      className="text-green-700 hover:text-green-900"
                      aria-label={`Edit ${partner.name}`}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(partner._id)}
                      className="text-red-600 hover:text-red-800"
                      aria-label={`Delete ${partner.name}`}
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {partners.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  No partners found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <AdminForm
          title="Add New Partner"
          fields={partnerFields}
          onSubmit={handleCreate}
          onClose={() => setShowCreateForm(false)}
          initialImageUrl={''} // Explicitly pass empty string for new creation
        />
      )}

      {/* Edit Form */}
      {editingPartner && (
        <AdminForm
          title="Edit Partner"
          // Map over partnerFields to set dynamic default values for editing
          fields={partnerFields.map(field => ({
            ...field,
            defaultValue: editingPartner[field.name as keyof Partner] !== undefined
                          ? String(editingPartner[field.name as keyof Partner])
                          : field.defaultValue,
          }))}
          onSubmit={handleEdit}
          onClose={() => setEditingPartner(null)}
          initialData={editingPartner} // Pass the entire editingPartner object
          initialImageUrl={editingPartner.logo} // Pass the existing logo URL
        />
      )}
    </div>
  );
};

export default Partners;