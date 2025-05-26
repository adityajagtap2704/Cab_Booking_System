import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from '@/layouts/MainLayout';
import AdminLayout from '@/layouts/AdminLayout';
import DriverLayout from '@/layouts/DriverLayout';

// Pages
import HomePage from '@/pages/HomePage';
import BookingPage from '@/pages/BookingPage';
import ProfilePage from '@/pages/ProfilePage';
import RideHistoryPage from '@/pages/RideHistoryPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ActiveRidePage from '@/pages/ActiveRidePage';

// Admin Pages
import AdminDashboardPage from '@/pages/admin/AdminDashboardPage';
import ManageUsersPage from '@/pages/admin/ManageUsersPage';
import ManageDriversPage from '@/pages/admin/ManageDriversPage';
import ManageCabsPage from '@/pages/admin/ManageCabsPage';
import AdminReportsPage from '@/pages/admin/AdminReportsPage';

// Driver Pages
import DriverDashboardPage from '@/pages/driver/DriverDashboardPage';
import DriverEarningsPage from '@/pages/driver/DriverEarningsPage';
import DriverProfilePage from '@/pages/driver/DriverProfilePage';


// Context
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const ProtectedRoute = ({ children, allowedRoles, bookingRoute = false }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">CabGo</h1>
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (bookingRoute || (allowedRoles && allowedRoles.length > 0)) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  } else {
    // User is authenticated
    if (allowedRoles && user && user.role && !allowedRoles.includes(user.role)) {
      // User's role is not in the allowedRoles list
      return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }
    // If allowedRoles is not defined, or user's role is in allowedRoles, or it's a booking route for an authenticated user, allow access.
  }
  
  return children;
};

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6 text-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Unauthorized Access</h1>
      <p className="text-lg text-gray-700 mb-8">You do not have the necessary permissions to view this page.</p>
      <Button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700">Go to Homepage</Button>
    </div>
  );
};


function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">CabGo</h1>
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public and Passenger Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route 
              path="booking" 
              element={
                <ProtectedRoute allowedRoles={['passenger', 'driver', 'admin']} bookingRoute>
                  <BookingPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="profile" 
              element={
                <ProtectedRoute allowedRoles={['passenger', 'driver', 'admin']}>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="history" 
              element={
                <ProtectedRoute allowedRoles={['passenger', 'driver', 'admin']}>
                  <RideHistoryPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="active-ride/:id" 
              element={
                <ProtectedRoute allowedRoles={['passenger', 'driver', 'admin']}>
                  <ActiveRidePage />
                </ProtectedRoute>
              } 
            />
          </Route>

          {/* Driver Routes */}
          <Route 
            path="/driver" 
            element={
              <ProtectedRoute allowedRoles={['driver']}>
                <DriverLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DriverDashboardPage />} />
            <Route path="earnings" element={<DriverEarningsPage />} />
            <Route path="profile" element={<DriverProfilePage />} />
          </Route>

          {/* Admin Routes */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboardPage />} />
            <Route path="users" element={<ManageUsersPage />} />
            <Route path="drivers" element={<ManageDriversPage />} />
            <Route path="cabs" element={<ManageCabsPage />} />
            <Route path="reports" element={<AdminReportsPage />} />
          </Route>
          
          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Other Routes */}
          <Route path="/unauthorized" element={<UnauthorizedPage />} /> 
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </AnimatePresence>
    </AuthProvider>
  );
}

export default App;