// frontend/src/pages/admin/Enquiries.tsx
import { useState, useEffect } from 'react';
import { Edit, Loader, Trash } from 'lucide-react';
import AdminForm from '../../components/admin/AdminForm';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const ENQUIRIES_API_URL = `${API_BASE_URL}/enquiries`;

interface EnquiryItem {
  _id: string;
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'responded' | 'archived';
  createdAt: string;
  updatedAt: string;
}

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingEnquiry, setEditingEnquiry] = useState<EnquiryItem | null>(null);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<EnquiryItem[]>(ENQUIRIES_API_URL);
      setEnquiries(response.data);
    } catch (err: any) {
      console.error('Error fetching enquiries:', err);
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Failed to load enquiries.');
      } else {
        setError('An unexpected error occurred while loading enquiries.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleEdit = async (data: Record<string, any>) => {
    if (!editingEnquiry) return;

    // --- ADD THESE CONSOLE.LOGS ---
    console.log('1. Data received by handleEdit (from AdminForm):', data);
    // --- END ADD ---

    const payload = {
    name: data.formData.name,
    email: data.formData.email,
    message: data.formData.message,
    status: data.formData.status,
    replyMessage: data.formData.replyMessage || '',
  };

    // --- ADD THESE CONSOLE.LOGS ---
    console.log('2. Payload being sent to backend (from Enquiries.tsx):', payload);
    // --- END ADD ---

    try {
      const response = await axios.put(`${ENQUIRIES_API_URL}/${editingEnquiry._id}`, payload);
      setEnquiries(enquiries.map(enquiry =>
        enquiry._id === editingEnquiry._id
          ? { ...enquiry, ...response.data }
          : enquiry
      ));
      setEditingEnquiry(null);
    } catch (err) {
      console.error('Error updating enquiry:', err);
      if (axios.isAxiosError(err) && err.response) {
        alert(`Failed to update enquiry: ${err.response.data.message || 'Server error'}`);
      } else {
        alert('An unexpected error occurred while updating the enquiry.');
      }
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this enquiry? This cannot be undone.')) {
      try {
        await axios.delete(`${ENQUIRIES_API_URL}/${id}`);
        setEnquiries(enquiries.filter(enquiry => enquiry._id !== id));
      } catch (err) {
        console.error('Error deleting enquiry:', err);
        if (axios.isAxiosError(err) && err.response) {
          alert(`Failed to delete enquiry: ${err.response.data.message || 'Server error'}`);
        } else {
          alert('An unexpected error occurred while deleting the enquiry.');
        }
      }
    }
  };

  if (loading) {
    return (
      <div className="pt-16 pb-16 px-4 text-center text-xl text-gray-700">
        <div className='flex justify-center text-4xl'>
            Loading   <Loader className='animate-spin h-10 w-10'/>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-16 pb-16 px-4 text-center text-xl text-red-600">
        <p>Error: {error}</p>
        <p className="text-gray-600 text-lg mt-4">Could not load enquiries. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Message
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {enquiries.length > 0 ? (
                enquiries.map((enquiry) => (
                  // FIX: Ensure no whitespace text nodes directly inside <tr> or between <td>s
                  <tr key={enquiry._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {enquiry._id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {enquiry.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {enquiry.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                      {enquiry.message}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        enquiry.status === 'new' ? 'bg-blue-100 text-blue-800' :
                        enquiry.status === 'read' ? 'bg-gray-100 text-gray-800' :
                        enquiry.status === 'responded' ? 'bg-green-100 text-green-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1).replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(enquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => setEditingEnquiry(enquiry)}
                          className="text-green-700 hover:text-green-900 p-1 rounded-full hover:bg-green-100"
                          aria-label={`Edit enquiry from ${enquiry.name}`}
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(enquiry._id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100"
                          aria-label={`Delete enquiry from ${enquiry.name}`}
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No enquiries found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {editingEnquiry && (
        <AdminForm
          title="Edit Enquiry"
          fields={[
            { name: 'name', label: 'Name', type: 'text', defaultValue: editingEnquiry.name, required: true, readOnly: true },
            { name: 'email', label: 'Email', type: 'email', defaultValue: editingEnquiry.email, required: true, readOnly: true },
            { name: 'message', label: 'Message', type: 'textarea', defaultValue: editingEnquiry.message, required: true, readOnly: true, rows: 5 },
            {
              name: 'status',
              label: 'Status',
              type: 'select',
              defaultValue: editingEnquiry.status,
              options: [
                { value: 'new', label: 'New' },
                { value: 'read', label: 'Read' },
                { value: 'responded', label: 'Responded' },
                { value: 'archived', label: 'Archived' },
              ],
              required: true
            },
            {
              name: 'replyMessage',
              label: 'Reply to User (Optional)',
              type: 'textarea',
              defaultValue: '',
              placeholder: 'Type your message to the user here. An email will be sent upon saving.',
              rows: 5
            },
          ]}
          onSubmit={handleEdit}
          onClose={() => setEditingEnquiry(null)}
        />
      )}
    </div>
  );
};

export default Enquiries;