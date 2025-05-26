import React, { createContext, useState, useEffect, useContext } from 'react';
import { useToast } from '@/components/ui/use-toast';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('cabgo-user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('cabgo-user');
      }
    }
    setLoading(false);
  }, []);

  const login = (loginData, registeredUsers) => {
    const foundUser = registeredUsers.find(
      (u) => u.email === loginData.email && u.password === loginData.password
    );

    if (foundUser) {
      setUser(foundUser); // User object now contains the role from registration
      localStorage.setItem('cabgo-user', JSON.stringify(foundUser));
      toast({
        title: "Login Successful",
        description: `Welcome back, ${foundUser.name}!`,
      });
      return foundUser; 
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
      return null;
    }
  };

  const register = (userData) => {
    const newUser = {
      ...userData, // This includes the role selected during registration
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    const existingUsers = JSON.parse(localStorage.getItem('cabgo-registered-users') || '[]');
    existingUsers.push(newUser);
    localStorage.setItem('cabgo-registered-users', JSON.stringify(existingUsers));
    
    toast({
      title: "Registration Successful",
      description: "Your account has been created! Please log in.",
    });
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('cabgo-user');
    // Also clear registered users for full demo reset, optional
    // localStorage.removeItem('cabgo-registered-users'); 
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully.",
    });
  };

  const updateProfile = (updatedData) => {
    if (!user) return;
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('cabgo-user', JSON.stringify(updatedUser));
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};