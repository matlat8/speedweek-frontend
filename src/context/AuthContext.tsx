'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import swAPI from '@/api/axiosInstance';
import { useQuery } from '@tanstack/react-query';

interface AuthContextType {
  user: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useUser = () => useQuery({
  queryKey: ['user'],
  queryFn: async () => {
    const response = await swAPI.get('/users/me', { withCredentials: true });
    return response.data;
  },
});


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      console.log('Stored user:', storedUser);
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });

  useEffect(() => {
    console.log('User state changed:', user);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      console.log('User set in local storage:', user);
    } else {
      localStorage.removeItem('user');
      console.log('User removed from local storage');
    }
  }, [user]);

  const login = async (username: string, password: string) => {
    try {
      const params = new URLSearchParams();
      params.append('username', username);
      params.append('password', password);
  
      console.log('Sending login request with params:', params.toString());
  
      const response = await swAPI.post('/auth/cookie/login', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        withCredentials: true, // Ensure cookies are included in the request
      });
  
      if (response.status === 200 || response.status === 204) {
        // Assuming you need to fetch user data separately after login
        const userResponse = await swAPI.get('/users/me', { withCredentials: true });
        const userData = userResponse.data;
        setUser(userData);
      } else {
        console.error('Login failed with status:', response.status);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const checkAuthStatus = async () => {
    try {
      const response = await swAPI.get('/users/me', { withCredentials: true });
      if (response.status === 200) {
        console.log('User is still authenticated');
      } else {
        console.error('User is not authenticated, status:', response.status);
        // Unset user state if unauthorized
        if (response.status === 401) {
          console.log('User is unauthorized, logging out...');
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      if (error.response && error.response.status === 401) {
        console.log('User is unauthorized, logging out...');
        // Unset user state if unauthorized
        setUser(null);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(checkAuthStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}