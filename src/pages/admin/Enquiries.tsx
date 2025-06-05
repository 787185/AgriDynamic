import { useState } from 'react';
import { Edit, Trash } from 'lucide-react';
import AdminForm from '../../components/admin/AdminForm';
import { enquiries as initialEnquiries } from '../../data';

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [editingEnquiry, setEditingEnquiry] = useState<null | { id: number; name: string; email: string; message: string; date: string }>(null);
  
  const handleEdit = (data: Record<string, string>) => {
    if (!editingEnquiry) return;
    
    setEnquiries(enquiries.map(enquiry => 
      enquiry.id === editingEnquiry.id
        ? { 
            ...enquiry, 
            name: data.name, 
            email: data.email, 
            message: data.message 
          }
        : enquiry
    ));
    
    setEditingEnquiry(null);
  };
  
  const handleDelete = (id: number) => {
    setEnquiries(enquiries.filter(enquiry => enquiry.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Enquiries</h1>
      </div>
      
      {/* Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-fit divide-y divide-gray-200">
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
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {enquiries.map((enquiry) => (
              <tr key={enquiry.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {enquiry.id}
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
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {enquiry.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingEnquiry(enquiry)}
                      className="text-green-700 hover:text-green-900"
                      aria-label={`Edit enquiry from ${enquiry.name}`}
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(enquiry.id)}
                      className="text-red-600 hover:text-red-800"
                      aria-label={`Delete enquiry from ${enquiry.name}`}
                    >
                      <Trash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
            {enquiries.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  No enquiries found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Edit Form */}
      {editingEnquiry && (
        <AdminForm
          title="Edit Enquiry"
          fields={[
            { name: 'name', label: 'Name', type: 'text', defaultValue: editingEnquiry.name, required: true },
            { name: 'email', label: 'Email', type: 'email', defaultValue: editingEnquiry.email, required: true },
            { name: 'message', label: 'Message', type: 'textarea', defaultValue: editingEnquiry.message, required: true }
          ]}
          onSubmit={handleEdit}
          onClose={() => setEditingEnquiry(null)}
        />
      )}
    </div>
  );
};

export default Enquiries;