// components/LoginModal.tsx
import { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  const [email, setEmail] = useState(''); // Changed from username to email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const { login } = useAuth(); // `login` function in AuthContext should save the token
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => { // Made it async
    e.preventDefault();
    setError('');
    setLoading(true); // Start loading

    if (!email || !password) { // Check for email and password
      setError('Please enter both email and password');
      setLoading(false);
      return;
    }

    try {
      // Make API call to your backend login endpoint
      const response = await axios.post(
        'https://agridynamic-backend.onrender.com/api/auth/login', // Your backend login endpoint
        { email, password } // Send email and password
      );

      // Assuming your backend responds with a token and user data on success
      const { token, user } = response.data;

      // Call the login function from your AuthContext to store the token/user state
      login(token, user); // Adjust `useAuth().login` to accept token and user if needed
      onClose();
      navigate('/admin'); // Navigate to admin dashboard on successful login

    } catch (err: any) {
      // Handle login errors from the backend
      const errorMessage = err.response && err.response.data && err.response.data.msg
        ? err.response.data.msg
        : 'Login failed. Please try again.';
      setError(errorMessage);
      console.error('Login error:', err);
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
              id="email" // Changed from username to email
              type="email" // Changed type to email
              value={email} // Changed state variable
              onChange={(e) => setEmail(e.target.value)} // Changed setter
              className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email" // Changed placeholder
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
              disabled={loading} // Disable button while loading
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