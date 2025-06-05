import { useState } from 'react';
import { X } from 'lucide-react';

interface Field {
  name: string;
  label: string;
  type: string;
  defaultValue: string;
  options?: { value: string; label: string }[];
  required?: boolean;
}

interface AdminFormProps {
  title: string;
  fields: Field[];
  onSubmit: (data: Record<string, string>) => void;
  onClose: () => void;
}

const AdminForm = ({ title, fields, onSubmit, onClose }: AdminFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue;
      return acc;
    }, {} as Record<string, string>)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50  items-center bg-green-200 m-10 overflow-y-auto rounded-3xl">
      
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-600 to-green-800">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button 
            onClick={onClose}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-2 ">
          {fields.map((field) => (
            <div key={field.name} className="flex mb-4 ">
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1 p-2">
                {field.label}
              </label>
              
              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  rows={4}
                  required={field.required}
                />
              ) : field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  required={field.required}
                >
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  required={field.required}
                />
              )}
            </div>
          ))}
          
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-md transition-colors duration-200"
            >
              Submit
            </button>
          </div>
        </form>
    
    </div>
  );
};

export default AdminForm;