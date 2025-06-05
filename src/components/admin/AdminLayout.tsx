import { useState } from 'react';
import { Outlet, NavLink, Navigate } from 'react-router-dom';
import { Leaf, Users, MessageSquare, FileText, LogOut, Menu, X, User, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import AdminForm from './AdminForm';

const AdminLayout = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  const navLinks = [
    { name: 'Volunteers', path: '/admin/volunteers', icon: <Users className="h-5 w-5" /> },
    { name: 'Enquiries', path: '/admin/enquiries', icon: <MessageSquare className="h-5 w-5" /> },
    { name: 'Projects', path: '/admin/projects', icon: <FileText className="h-5 w-5" /> }
  ];

  return (
    <div className="flex h-screen bg-gray-100 pt-16">
      {/* Sidebar */}
      <div 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-green-800 text-white transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-auto pt-16`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center p-5 border-b border-green-700">
            <Leaf className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">Admin Panel</span>
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
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-white bg-green-700 hover:bg-green-900 rounded-md transition-colors duration-200"
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
              <img src="../../public/pictures/logo.png" alt="" width={170}height={100}/>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center mr-4">
                <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white">
                  <User className="h-5 w-5" />
                </div>
                <span className="ml-2 text-sm font-medium text-gray-700">Admin</span>
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
            { name: 'username', label: 'Username', type: 'text', defaultValue: 'admin' },
            { name: 'email', label: 'Email', type: 'email', defaultValue: 'admin@agridynamic.org' },
            { name: 'password', label: 'New Password', type: 'password', defaultValue: '' }
          ]}
          onSubmit={(data) => {
            console.log('Updated admin profile:', data);
            setShowSettingsModal(false);
          }}
          onClose={() => setShowSettingsModal(false)}
        />
      )}
    </div>
  );
};

export default AdminLayout;