import { useState, useEffect } from 'react';
import { Edit, Trash } from 'lucide-react';
import AdminForm from '../../components/admin/AdminForm'; // Assuming this component exists and handles generic form logic
import axios from 'axios'; // Import axios

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const ENQUIRIES_API_URL = `${API_BASE_URL}/enquiries`; // New backend endpoint for enquiries

// Define interface to match the Enquiry model from your backend
interface EnquiryItem {
  _id: string; // MongoDB's unique ID
  name: string;
  email: string;
  message: string;
  status: 'new' | 'read' | 'responded' | 'archived'; // Add status field from backend model
  createdAt: string; // Timestamp from backend
  updatedAt: string; // Timestamp from backend
}

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingEnquiry, setEditingEnquiry] = useState<EnquiryItem | null>(null);
  
  // Function to fetch enquiries from the backend
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

  // Fetch enquiries when the component mounts
  useEffect(() => {
    fetchEnquiries();
  }, []); // Empty dependency array ensures it runs only once on mount

  // Handle edit submission
  const handleEdit = async (data: Record<string, string>) => {
    if (!editingEnquiry) return;

    // Construct the payload for the PUT request
    const payload = {
      name: data.name,
      email: data.email,
      message: data.message,
      status: data.status, // Include status update
    };

    try {
      // Send PUT request to update the enquiry by its _id
      const response = await axios.put(`${ENQUIRIES_API_URL}/${editingEnquiry._id}`, payload);
      
      // Update the state with the response from the backend
      setEnquiries(enquiries.map(enquiry => 
        enquiry._id === editingEnquiry._id
          ? { ...enquiry, ...response.data } // Merge updated data from response
          : enquiry
      ));
      setEditingEnquiry(null); // Close the edit form
    } catch (err) {
      console.error('Error updating enquiry:', err);
      alert('Failed to update enquiry. Check console for details.');
    }
  };
  
  // Handle delete operation
  const handleDelete = async (id: string) => { // ID type changed to string for MongoDB _id
    if (window.confirm('Are you sure you want to delete this enquiry? This cannot be undone.')) {
      try {
        // Send DELETE request to the backend
        await axios.delete(`${ENQUIRIES_API_URL}/${id}`);
        // Filter out the deleted enquiry from the state
        setEnquiries(enquiries.filter(enquiry => enquiry._id !== id));
      } catch (err) {
        console.error('Error deleting enquiry:', err);
        alert('Failed to delete enquiry. Check console for details.');
      }
    }
  };

  if (loading) {
    return (
      <div className="pt-16 pb-16 px-4 text-center text-xl text-gray-700">Loading enquiries...</div>
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
    <div className="p-4 sm:p-6 lg:p-8"> {/* Added padding for better layout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
      </div>
      
      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden"> {/* Changed m-5 to overflow-hidden */}
        <div className="overflow-x-auto"> {/* Ensures table is scrollable on smaller screens */}
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
                  <tr key={enquiry._id}> {/* Use _id for key */}
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
                        'bg-yellow-100 text-yellow-800' // Fallback or another status like archived
                      }`}>
                        {enquiry.status.charAt(0).toUpperCase() + enquiry.status.slice(1).replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(enquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        {/* <button
                          onClick={() => setEditingEnquiry(enquiry)}
                          className="text-green-700 hover:text-green-900 p-1 rounded-full hover:bg-green-100"
                          aria-label={`Edit enquiry from ${enquiry.name}`}
                        >
                          <Edit className="h-5 w-5" />
                        </button> */}
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
      
      {/* Edit Form */}
      {editingEnquiry && (
        <AdminForm
          title="Edit Enquiry"
          fields={[
            { name: 'name', label: 'Name', type: 'text', defaultValue: editingEnquiry.name, required: true },
            { name: 'email', label: 'Email', type: 'email', defaultValue: editingEnquiry.email, required: true },
            { name: 'message', label: 'Message', type: 'textarea', defaultValue: editingEnquiry.message, required: true },
            { 
              name: 'status', 
              label: 'Status', 
              type: 'select', // Use 'select' type for dropdown
              defaultValue: editingEnquiry.status, 
              options: [ // Provide options for the select dropdown
                { value: 'new', label: 'New' },
                { value: 'read', label: 'Read' },
                { value: 'responded', label: 'Responded' },
                { value: 'archived', label: 'Archived' },
              ],
              required: true 
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