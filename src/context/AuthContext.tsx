// frontend/src/context/AuthContext.ts
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported

interface UserType {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean; // Add if you have an isAdmin field
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  login: (token: string, userData: UserType) => void; // Updated to accept token and user data
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define API_BASE_URL for AuthContext as well
const API_BASE_URL_AUTH = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const PROFILE_FETCH_URL = `${API_BASE_URL_AUTH}/auth/profile`; // Endpoint to fetch user profile

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Start loading true to check auth status
  const navigate = useNavigate();

  // This useEffect runs once on component mount to check for an existing token
  useEffect(() => {
    const loadUser = async () => {
      console.log('AuthContext USEEFFECT: 1. loadUser function started.');
      const token = localStorage.getItem('token');
      console.log('AuthContext USEEFFECT: 2. Token found in localStorage:', token); // <-- THIS IS KEY

      if (token) {
        try {
          // Explicitly add Authorization header for fetching profile
          const config = {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          };
          console.log('AuthContext USEEFFECT: 3. Making GET /api/auth/profile request...');
          // Fetch user profile using the token (this validates the token on the backend)
          const response = await axios.get(PROFILE_FETCH_URL, config);
          setIsAuthenticated(true);
          setUser(response.data);
          console.log('AuthContext USEEFFECT: 4. User data fetched successfully. Token is valid.');
        } catch (error) {
          console.error('AuthContext USEEFFECT: 5. Token validation FAILED. Error details:', error); // <-- THIS IS THE CRITICAL LOG
          localStorage.removeItem('token'); // Clear token if validation fails
          console.log('AuthContext USEEFFECT: 6. Token removed from localStorage due to error.');
          setIsAuthenticated(false);
          setUser(null);
        }
      } else {
        console.log('AuthContext USEEFFECT: 2.1. No token found in localStorage initially.');
      }
      setLoading(false);
      console.log('AuthContext USEEFFECT: 7. loadUser finished. IsAuthenticated:', isAuthenticated);
    };
    loadUser();
  }, []); // Empty dependency array means this runs once on mount

  // This login function is called from your LoginModal
  const login = (token: string, userData: UserType) => { // Now accepts token and user data
    console.log('AuthContext LOGIN: 1. Login function called.');
    console.log('AuthContext LOGIN: 2. Received token to save:', token);
    if (token) { // Ensure token is not undefined or null
      localStorage.setItem('token', token); // <--- THIS LINE ACTUALLY SAVES THE TOKEN
      console.log('AuthContext LOGIN: 3. Token ATTEMPTED TO BE SAVED to localStorage.');
    } else {
      console.error('AuthContext LOGIN: 3. Received null/empty token, NOT SAVING.');
    }
    setIsAuthenticated(true);
    setUser(userData); // Set the user data in context
    navigate('/admin'); // Navigate after setting state
    console.log('AuthContext LOGIN: 4. navigate to /admin called.');
  };

  const logout = () => {
    console.log('AuthContext LOGOUT: Calling logout function.');
    localStorage.removeItem('token'); // Clear token on logout
    setIsAuthenticated(false);
    setUser(null);
    navigate('/'); // Redirect to home/login page
    console.log('AuthContext LOGOUT: Token removed, state cleared, navigated to /.');
  };

  const contextValue: AuthContextType = {
    isAuthenticated,
    user,
    setUser, // Expose setUser for AdminLayout to update user details
    login,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};