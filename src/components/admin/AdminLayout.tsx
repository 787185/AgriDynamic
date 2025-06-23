import { useState, useEffect } from 'react';
import { Outlet, NavLink, Navigate } from 'react-router-dom';
import { Users, MessageSquare, FileText, LogOut, Menu, X, User, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AdminForm from './AdminForm';
import axios from 'axios'; // Keep axios import for direct calls

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const PROFILE_API_URL = `${API_BASE_URL}/auth/profile`; // Matches backend route: /api/auth/profile

const AdminLayout = () => {
  const { isAuthenticated, logout, user, setUser } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Set initial form values from the authenticated user
  const initialUserSettings = user ? {
    username: user.name,
    email: user.email,
    password: '', // Password field for new password, not old
  } : { username: '', email: '', password: '' };

  useEffect(() => {
    // Clear success/error messages after a few seconds
    if (success || error) {
      const timer = setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success, error]);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const navLinks = [
    { name: 'Volunteers', path: '/admin/volunteers', icon: <Users className="h-5 w-5" /> },
    { name: 'Enquiries', path: '/admin/enquiries', icon: <MessageSquare className="h-5 w-5" /> },
    { name: 'Projects', path: '/admin/projects', icon: <FileText className="h-5 w-5" /> }
  ];

  // Function to handle the form submission for updating profile
  const handleUpdateProfile = async (formData: { username: string; email: string; password?: string }) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      // Get the token from local storage
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication token not found. Please log in again.');
        setLoading(false);
        return;
      }

      // Prepare the data to be sent to the backend
      // No need to send user ID from frontend here, backend gets it from the token
      const updateData: { name: string; email: string; password?: string } = {
        name: formData.username,
        email: formData.email,
      };
      if (formData.password) { // Only send password if it's provided (user wants to change it)
        updateData.password = formData.password;
      }

      // Define configuration for the axios request, including the Authorization header
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // <--- Re-added Authorization header
        },
      };

      // Make the API call using axios directly
      const response = await axios.put(PROFILE_API_URL, updateData, config);

      // Update user in AuthContext with the new data from the response
      setUser(response.data); // Assuming backend sends back the updated user data (without password hash)

      setSuccess('Profile updated successfully!');
      setShowSettingsModal(false);
    } catch (err: any) {
      console.error('Error updating profile:', err);
      if (axios.isAxiosError(err) && err.response) {
        // If the backend requires admin role and user isn't admin, it might be 403 Forbidden
        // If token is invalid or expired, backend might return 401 Unauthorized
        setError(err.response.data.message || 'Failed to update profile. Please try again.');
      } else {
        setError('An unexpected error occurred during profile update.');
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-green-800 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-auto pt-16 `}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center p-5 border-b border-green-700">
            <span className="text-4xl font-bold">Admin DashBoard</span>
            
          </div>

          <nav className="flex-grow py-4">
            <ul className="space-y-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? 'bg-green-900 text-white underline underline-offset-4'
                          : 'text-green-100 hover:bg-green-700 hover:text-white'
                      }`
                    }
                  >
                    {link.icon}
                    <span className="ml-3">{link.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-green-700">
            <button
              onClick={logout}
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-white bg-green-700 hover:bg-green-900 rounded-3xl transition-colors duration-200"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top navigation */}
        <header className="bg-white shadow-sm z-20">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden text-gray-500 focus:outline-none"
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            <div className="flex items-center">
              <img src="/pictures/logo.png" alt="" width={170} height={100} />
            </div>

            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white">
                  <User className="h-5 w-5" />
                </div>
                {/* Display dynamic user name */}
                <span className="ml-2 text-sm font-medium text-gray-700">{user?.name || 'Admin'}</span>
              </div>

              <button
                onClick={() => setShowSettingsModal(true)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Display success/error messages */}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mx-4 mt-2" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> {success}</span>
          </div>
        )}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mx-4 mt-2" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <AdminForm
          title="Edit Admin Profile"
          fields={[
            { name: 'username', label: 'Username', type: 'text', defaultValue: initialUserSettings.username },
            { name: 'email', label: 'Email', type: 'email', defaultValue: initialUserSettings.email },
            { name: 'password', label: 'New Password (optional)', type: 'password', defaultValue: '' } // <--- No oldPassword field, now an optional new password
          ]}
          onSubmit={handleUpdateProfile}
          onClose={() => setShowSettingsModal(false)}
          loading={loading}
        />
      )}
    </div>
  );
};

export default AdminLayout;