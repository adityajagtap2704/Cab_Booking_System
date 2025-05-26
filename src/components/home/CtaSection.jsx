import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const CtaSection = ({ onBookNow }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl p-8 text-center text-white"
    >
      <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
      <p className="text-xl mb-6 max-w-2xl mx-auto">
        Join thousands of satisfied users who rely on CabGo for their daily transportation needs.
      </p>
      <Button
        size="lg"
        className="bg-white text-blue-700 hover:bg-blue-50"
        onClick={onBookNow}
      >
        Book Your First Ride
      </Button>
    </motion.section>
  );
};

export default CtaSection;