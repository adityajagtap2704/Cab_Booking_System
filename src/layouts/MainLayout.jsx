import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  User, 
  Clock, 
  MapPin, 
  Menu, 
  X, 
  LogOut,
  LogIn as LogInIcon
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { BookingProvider } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';

const MainLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleNavigate = (path) => {
    if ((path === '/booking' || path === '/history' || path === '/profile') && !isAuthenticated) {
      navigate('/login', { state: { from: location } });
    } else {
      navigate(path);
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { path: '/booking', label: 'Book a Ride', icon: <MapPin className="h-5 w-5" /> },
    { path: '/history', label: 'Ride History', icon: <Clock className="h-5 w-5" /> },
    { path: '/profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <BookingProvider>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="font-bold text-2xl cursor-pointer"
                onClick={() => navigate('/')}
              >
                CabGo
              </motion.div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "secondary" : "ghost"}
                  className={`flex items-center space-x-2 ${isActive(item.path) ? 'bg-white/20' : 'hover:bg-white/10'}`}
                  onClick={() => handleNavigate(item.path)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Button>
              ))}
              
              {isAuthenticated ? (
                <Button 
                  variant="outline" 
                  className="bg-white/10 hover:bg-white/20 border-white/20"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5 mr-2" />
                  Logout
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 border-white/20"
                  onClick={handleLogin}
                >
                  <LogInIcon className="h-5 w-5 mr-2" />
                  Login / Sign Up
                </Button>
              )}
            </nav>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:bg-white/10"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </header>
        
        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white shadow-lg absolute top-16 left-0 right-0 z-40"
          >
            <div className="flex flex-col p-4 space-y-3">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className="flex justify-start items-center space-x-2 w-full"
                  onClick={() => handleNavigate(item.path)}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Button>
              ))}
              
              {isAuthenticated ? (
                <Button 
                  variant="destructive" 
                  className="flex justify-start items-center space-x-2 w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Button>
              ) : (
                <Button
                  variant="default"
                  className="flex justify-start items-center space-x-2 w-full"
                  onClick={handleLogin}
                >
                  <LogInIcon className="h-5 w-5" />
                  <span>Login / Sign Up</span>
                </Button>
              )}
            </div>
          </motion.div>
        )}
        
        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 py-6">
          <Outlet />
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-100 border-t">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <span className="text-gray-600 text-sm">© 2025 CabGo. All rights reserved.</span>
              </div>
              <div className="flex space-x-4">
                <span className="text-gray-600 text-sm cursor-pointer hover:text-blue-600">Terms of Service</span>
                <span className="text-gray-600 text-sm cursor-pointer hover:text-blue-600">Privacy Policy</span>
                <span className="text-gray-600 text-sm cursor-pointer hover:text-blue-600">Contact Us</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </BookingProvider>
  );
};

export default MainLayout;