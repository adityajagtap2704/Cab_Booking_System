import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import HeroSection from '@/components/home/HeroSection';
import WelcomeSection from '@/components/home/WelcomeSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import CtaSection from '@/components/home/CtaSection';
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

  return (
    <div className="space-y-12">
      <HeroSection onBookNow={() => handleBookingNavigation('/booking')} onViewHistory={() => handleBookingNavigation('/history')} />
      {isAuthenticated && user && <WelcomeSection user={user} onBookNow={() => handleBookingNavigation('/booking')} />}
      <FeaturesSection features={features} />
      <HowItWorksSection />
      <CtaSection onBookNow={() => handleBookingNavigation('/booking')} />
    </div>
  );
};

export default HomePage;