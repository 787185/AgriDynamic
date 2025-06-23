import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import React from 'react';

interface Field {
  name: string;
  label: string;
  type: string;
  defaultValue: string | string[];
  options?: { value: string; label: string }[];
  required?: boolean;
  readOnly?: boolean; // <--- NEW: Add readOnly property
  rows?: number; // <--- NEW: Add rows for textarea
  placeholder?: string;
}

interface AdminFormProps {
  title: string;
  fields: Field[];
  onSubmit: (data:  { formData: Record<string, string>; imageFile: File | null; imageUrlInput: string }) => void;
  onClose: () => void;
  initialImageUrl?: string;
}

const AdminForm = ({ title, fields, onSubmit, onClose, initialImageUrl }: AdminFormProps) => {
  const [formData, setFormData] = useState<Record<string, any>>(() => { // Use 'any' here for flexibility
    const initialData: Record<string, any> = {}; // Use any for initial data
    fields.forEach(field => {
      // Initialize based on field type and defaultValue
      if (field.type === 'select' && Array.isArray(field.defaultValue)) {
        // Handle select with multi-select capability (though not implemented here, type allows)
        initialData[field.name] = field.defaultValue[0] || ''; // Take first option or empty
      } else if (field.defaultValue !== undefined && field.defaultValue !== null) {
        initialData[field.name] = String(field.defaultValue);
      } else {
        initialData[field.name] = '';
      }
    });
    return initialData;
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrlInput, setImageUrlInput] = useState<string>(initialImageUrl || ''); 

  useEffect(() => {
    // Update formData when fields prop changes (e.g., when editingEnquiry changes)
    const newFormData: Record<string, any> = {};
    fields.forEach(field => {
      if (field.type === 'select' && Array.isArray(field.defaultValue)) {
        newFormData[field.name] = field.defaultValue[0] || '';
      } else if (field.defaultValue !== undefined && field.defaultValue !== null) {
        newFormData[field.name] = String(field.defaultValue);
      } else {
        newFormData[field.name] = '';
      }
    });
    setFormData(newFormData);
    
    if (initialImageUrl) {
      setImageUrlInput(initialImageUrl);
    } else {
      setImageUrlInput('');
    }
    setImageFile(null); // Clear file selection on form open/reset
  }, [fields, initialImageUrl]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImageUrlInput(''); // Clear URL input if a file is selected
    }
  };

  const handleImageUrlInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrlInput(e.target.value);
    setImageFile(null); // Clear file input if URL is entered
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Pass all relevant data to the parent's onSubmit
    onSubmit({ formData, imageFile, imageUrlInput });
  };

  const baseInputClassName = "w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500";
  const readOnlyInputClassName = "bg-gray-100 cursor-not-allowed";
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-200 bg-opacity-90 m-10 overflow-y-auto rounded-3xl">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-600 to-green-800 rounded-t-lg">
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {fields.map((field) => (
            <div key={field.name} className="flex flex-col mb-4">
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
                {field.label}:
              </label>

              
              {field.type === 'imageUpload' ? (
                <div className="border p-4 rounded-md bg-gray-50">
                  <div className="flex items-center space-x-4 mb-2">
                    <input
                      type="file"
                      id={`${field.name}File`} // Unique ID for file input
                      onChange={handleFileChange}
                      accept="image/*"
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                    />
                    <span>OR</span>
                    <input
                      type="url"
                      id={`${field.name}Url`} // Unique ID for URL input
                      name={field.name} // Still use field.name for this input to pass its value in formData
                      placeholder={field.placeholder || "Enter image URL"}
                      value={imageUrlInput}
                      onChange={handleImageUrlInputChange}
                      className={`${baseInputClassName} ${field.readOnly ? readOnlyInputClassName : ''} block w-full border border-gray-300 rounded-md shadow-sm p-2`}
                      required={field.required && !imageFile ? true : false} 
                      readOnly={field.readOnly} 
                    />
                  </div>
                  {(imageFile || imageUrlInput) && (
                    <div className="mt-4">
                      <p className="text-sm font-medium text-gray-700">Image Preview:</p>
                      <img
                        src={imageFile ? URL.createObjectURL(imageFile) : imageUrlInput}
                        alt="Preview"
                        className="mt-2 max-w-xs h-auto rounded-md shadow"
                      />
                    </div>
                  )}
                </div>
              ) : field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`${baseInputClassName} ${field.readOnly ? readOnlyInputClassName : ''} w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500`}
                  rows={field.rows || 4}
                  required={field.required}
                  readOnly={field.readOnly}
                  placeholder={field.placeholder}
                />
              ) : field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`${baseInputClassName} ${field.readOnly ? readOnlyInputClassName : ''} w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500`}
                  required={field.required}
                  disabled={field.readOnly}
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
                  className={`${baseInputClassName} ${field.readOnly ? readOnlyInputClassName : ''} w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500`}
                  required={field.required}
                  readOnly={field.readOnly} 
                  placeholder={field.placeholder}
                  
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
    </div>
  );
};

export default AdminForm;