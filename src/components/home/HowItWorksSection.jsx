import React from 'react';
import { motion } from 'framer-motion';

const HowItWorksSection = () => {
  const steps = [
    { number: 1, title: 'Enter Location', description: 'Enter your pickup and dropoff locations to get started.' },
    { number: 2, title: 'Select Ride Type', description: 'Choose from economy, comfort, premium, or XL rides.' },
    { number: 3, title: 'Confirm & Ride', description: 'Confirm your booking and track your driver in real-time.' },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-gray-50 p-8 rounded-xl"
    >
      <h2 className="text-3xl font-bold text-center mb-10">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step) => (
          <div key={step.number} className="text-center">
            <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
              {step.number}
            </div>
            <h3 className="text-xl font-bold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default HowItWorksSection;