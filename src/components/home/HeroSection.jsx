import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const HeroSection = ({ onBookNow, onViewHistory }) => {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl transform -skew-y-2"></div>
      <div className="relative py-12 px-6 rounded-2xl overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center text-white"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Your Ride, Your Way
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Book a cab in seconds, travel in comfort, and reach your destination safely.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-blue-50"
              onClick={onBookNow}
            >
              Book a Ride Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/20"
              onClick={onViewHistory}
            >
              View Ride History
            </Button>
          </div>
        </motion.div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <div className="cab-animation">
            <div className="text-4xl">🚕</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;