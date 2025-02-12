import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { AuthContextType } from './authTypes'; // Import the AuthContext type

// Create the AuthContext with an initial null value
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null); // Manage user state

  // Load user from localStorage when the app starts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Function to handle user login
  const login = async (email: string, password: string) => {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password,
    });
    localStorage.setItem('user', JSON.stringify(res.data.user)); // Store user data in localStorage
    setUser(res.data.user); // Update state with logged-in user
  };

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem('user'); // Remove user data from localStorage
    setUser(null); // Clear user state
  };

  // Provide user data and auth functions to children components
  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
