import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { TrendingUp, Clock, Shield } from 'lucide-react';

const WelcomeSection = ({ user, onBookNow }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100"
    >
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-blue-800 mb-2">Welcome back, {user.name}!</h2>
          <p className="text-blue-600 mb-4">Ready for your next ride?</p>
          <Button
            onClick={onBookNow}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Book Now
          </Button>
        </div>
        <div className="mt-6 md:mt-0">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2 text-blue-700" />
              <p className="text-sm text-blue-600">Quick Booking</p>
            </div>
            <div className="text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 text-blue-700" />
              <p className="text-sm text-blue-600">24/7 Service</p>
            </div>
            <div className="text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-blue-700" />
              <p className="text-sm text-blue-600">Safe Rides</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default WelcomeSection;