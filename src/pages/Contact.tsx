import { useState } from 'react';
import { Mail, Send } from 'lucide-react';
import axios from 'axios'; // Import axios for HTTP requests

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const ENQUIRIES_API_URL = `${API_BASE_URL}/enquiries`; // Define the new API endpoint

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  // Added 'submitting' state to manage UI feedback during API call
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error' | 'submitting'>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => { // Made the function async
    e.preventDefault();
    setFormStatus('submitting'); // Indicate that submission is in progress

    try {
      // Send the form data to the backend endpoint
      const response = await axios.post(ENQUIRIES_API_URL, formData);
      console.log('Enquiry submitted successfully:', response.data);
      setFormStatus('success'); // Set status to success
      
      // Reset form fields
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (err: any) { // Use 'any' or check for AxiosError more specifically
      console.error('Error submitting enquiry:', err);
      let errorMessage = 'There was an error sending your message. Please try again.';
      if (axios.isAxiosError(err) && err.response && err.response.data && err.response.data.message) {
          // Use the specific error message from the backend if available
          errorMessage = err.response.data.message;
      }
      setFormStatus('error');
      // You might want to display errorMessage to the user
    } finally {
      // Clear status message after 5 seconds, regardless of success or error
      setTimeout(() => {
        setFormStatus(null);
      }, 5000);
    }
  };
  
  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    setFormStatus(null); // Clear any existing status messages
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 to-green-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Leave a Message</h1>
          <p className="text-xl max-w-3xl mx-auto">
            If you believe in transforming lives through smart, inclusive agriculture
          </p>
        </div>
      </div>
      
      {/* Contact Form Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="flex justify-center">
              <div className="rounded-lg overflow-hidden shadow-lg max-w-md">
                <img 
                  src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                  alt="Contact Us" 
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            {/* Form */}
            <div>
              <div className="bg-white rounded-2xl shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Mail className="h-6 w-6 mr-2 text-green-700" />
                  Leave Us a Message
                </h2>
                
                {/* Form Status Messages */}
                {formStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md">
                    Your message has been sent successfully! We'll get back to you soon.
                  </div>
                )}
                
                {formStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
                    There was an error sending your message. Please try again.
                  </div>
                )}

                {formStatus === 'submitting' && (
                  <div className="mb-6 p-4 bg-blue-100 text-blue-700 rounded-md animate-pulse">
                    Sending your message...
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Your name"
                      disabled={formStatus === 'submitting'} // Disable input when submitting
                    />
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Your email address"
                      disabled={formStatus === 'submitting'} // Disable input when submitting
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Your message"
                      disabled={formStatus === 'submitting'} // Disable input when submitting
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={handleClear}
                      disabled={formStatus === 'submitting'} // Disable clear while submitting
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-3xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Clear Form
                    </button>
                    
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'} // Disable submit while submitting
                      className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-3xl transition-colors duration-200 flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {formStatus === 'submitting' ? 'Sending...' : 'Submit'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact Information (remains unchanged) */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Get in Touch</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-700 mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600">info@agridynamic.org</p>
              <p className="text-gray-600">support@agridynamic.org</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-700 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600">+237 123 456 789</p>
              <p className="text-gray-600">+237 987 654 321</p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg shadow-md text-center">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-green-700 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Visit Us</h3>
              <p className="text-gray-600">North West Region Cameroon</p>
              <p className="text-gray-600">BP 02 Ndop</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;