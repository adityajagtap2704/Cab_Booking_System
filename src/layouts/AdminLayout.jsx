import React, { useState }from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Car, FileText, LogOut, Menu, X, Settings } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const AdminLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: '/admin/users', label: 'Manage Users', icon: <Users className="h-5 w-5" /> },
    { path: '/admin/drivers', label: 'Manage Drivers', icon: <Users className="h-5 w-5" /> },
    { path: '/admin/cabs', label: 'Manage Cabs', icon: <Car className="h-5 w-5" /> },
    { path: '/admin/reports', label: 'Reports', icon: <FileText className="h-5 w-5" /> },
  ];

  const isActive = (path) => location.pathname === path || (path === '/admin' && location.pathname.startsWith('/admin/'));


  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}>
        <div className="px-4 mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">CabGo Admin</h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden text-white hover:bg-gray-700"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav>
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? "secondary" : "ghost"}
              className={`w-full justify-start text-left mb-2 ${isActive(item.path) ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              onClick={() => {
                navigate(item.path);
                setIsMobileMenuOpen(false);
              }}
            >
              {item.icon}
              <span className="ml-3">{item.label}</span>
            </Button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-left hover:bg-gray-700"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-3">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-md md:hidden">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">CabGo Admin</h1>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-gray-800 hover:bg-gray-100"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </header>
        <main className="flex-grow container mx-auto px-6 py-8 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;