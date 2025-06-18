// components/LoginModal.tsx
import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

interface LoginModalProps {
  onClose: () => void;
}

// It's a good practice to use the environment variable for the API URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const LoginModal = ({ onClose }: LoginModalProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // Initialize with null, not 'null' string
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors (set to null, not 'null' string)
    setLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`, // Use environment variable for flexibility
        { email, password }
      );

      // --- CRUCIAL DEBUGGING LOGS ---
      console.log('LoginModal: Full Axios Response:', response);
      console.log('LoginModal: Backend Response Data (response.data):', response.data);
      // --- END DEBUGGING LOGS ---

      // Assuming your backend responds with a token and user data on success
      const { token, user } = response.data; // This destructuring will make `token` undefined if not present in response.data

      // Check if token and user data are present before calling login
      if (token && user) {
        login(token, user);
        onClose();
        navigate('/admin');
      } else {
        // This means the backend response was successful (200 OK) but didn't contain token/user as expected
        setError('Login successful, but server response missing token or user data.');
        console.error('LoginModal: Server response structure unexpected:', response.data);
      }

    } catch (err: any) {
      console.error('LoginModal: Login error caught in catch block:', err); // Log the full error object

      let errorMessage = 'Login failed. Please try again.'; // Default error message

      // Check if it's an Axios error and has a response from the server
      if (axios.isAxiosError(err) && err.response) {
        // Your backend uses 'message', not 'msg' for error details
        errorMessage = err.response.data.message || errorMessage;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-700 to-green-900">
          <h2 className="text-xl font-bold text-white">Admin Login</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-green-700 hover:bg-green-800 text-white rounded-3xl transition-colors duration-200"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;