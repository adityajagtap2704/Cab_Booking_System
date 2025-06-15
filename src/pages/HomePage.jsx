
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import HeroSection from '@/components/home/HeroSection';
import WelcomeSection from '@/components/home/WelcomeSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import CtaSection from '@/components/home/CtaSection';
import TopRatedDriversSection from '@/components/home/TopRatedDriversSection'; // New import
import { MapPin, Clock, Star, Shield } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const handleBookingNavigation = (path) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: path } } });
    } else {
      navigate(path);
    }
  };
  
  const handleBookWithDriver = (driverId) => {
    // This is a placeholder. In a real app, you might pre-fill booking details
    // or navigate to a special booking page for this driver.
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/booking', search: `?driverId=${driverId}` } } });
    } else {
      navigate(`/booking?driverId=${driverId}`);
    }
  };

  const features = [
    {
      icon: <MapPin className="h-6 w-6 text-blue-500" />,
      title: 'Easy Booking',
      description: 'Book a ride in just a few taps with our intuitive interface.',
    },
    {
      icon: <Clock className="h-6 w-6 text-blue-500" />,
      title: 'Real-time Tracking',
      description: 'Track your driver in real-time and know exactly when they will arrive.',
    },
    {
      icon: <Star className="h-6 w-6 text-blue-500" />,
      title: 'Top-rated Drivers',
      description: 'Our drivers are carefully selected and highly rated for your safety.',
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      title: 'Safe & Secure',
      description: 'Your safety is our priority with verified drivers and secure payments.',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Regular User',
      content: 'CabGo has made my daily commute so much easier. The drivers are always on time and professional.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Business Traveler',
      content: 'I use CabGo for all my business trips. The service is reliable and the app is very user-friendly.',
      rating: 4,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Student',
      content: 'As a student, I appreciate the affordable rates and the quick pickup times. Highly recommended!',
      rating: 5,
    },
  ];

  return (
    <div className="space-y-12">
      <HeroSection onBookNow={() => handleBookingNavigation('/booking')} onViewHistory={() => handleBookingNavigation('/history')} />
      {isAuthenticated && user && <WelcomeSection user={user} onBookNow={() => handleBookingNavigation('/booking')} />}
      <FeaturesSection features={features} />
      <HowItWorksSection />
      <TopRatedDriversSection onBookWithDriver={handleBookWithDriver} />
      <TestimonialsSection testimonials={testimonials} />
      <CtaSection onBookNow={() => handleBookingNavigation('/booking')} />
    </div>
  );
};

export default HomePage;