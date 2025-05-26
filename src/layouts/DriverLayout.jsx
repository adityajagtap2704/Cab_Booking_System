import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, DollarSign, UserCircle, LogOut, Menu, X, Power } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const DriverLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/driver', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: '/driver/earnings', label: 'Earnings', icon: <DollarSign className="h-5 w-5" /> },
    { path: '/driver/profile', label: 'Profile', icon: <UserCircle className="h-5 w-5" /> },
  ];

  const isActive = (path) => location.pathname === path || (path === '/driver' && location.pathname.startsWith('/driver/'));

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className={`bg-slate-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-20`}>
        <div className="px-4 mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">CabGo Driver</h2>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMobileMenuOpen(false)}
            className="md:hidden text-white hover:bg-slate-700"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        <nav>
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant={isActive(item.path) ? "secondary" : "ghost"}
              className={`w-full justify-start text-left mb-2 ${isActive(item.path) ? 'bg-slate-700' : 'hover:bg-slate-700'}`}
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
        <div className="px-4 mt-auto">
          <div className="flex items-center space-x-2 mb-4 p-2 bg-slate-700 rounded-md">
            <Switch 
              id="availability-toggle" 
              checked={isOnline} 
              onCheckedChange={setIsOnline}
              className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200"
            />
            <Label htmlFor="availability-toggle" className="text-sm">
              {isOnline ? 'Online' : 'Offline'}
            </Label>
          </div>
          <Button 
            variant="ghost" 
            className="w-full justify-start text-left hover:bg-slate-700"
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
            <h1 className="text-xl font-bold text-slate-800">CabGo Driver</h1>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-slate-800 hover:bg-gray-100"
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

export default DriverLayout;