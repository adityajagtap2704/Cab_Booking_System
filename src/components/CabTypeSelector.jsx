
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const cabTypes = [
  {
    id: 'economy',
    name: 'Economy',
    description: 'Affordable rides for everyday use',
    icon: '🚗',
    price: 1.0,
    eta: '3-5',
  },
  {
    id: 'comfort',
    name: 'Comfort',
    description: 'Spacious vehicles with extra legroom',
    icon: '🚙',
    price: 1.5,
    eta: '4-6',
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Luxury vehicles with professional drivers',
    icon: '🚘',
    price: 2.0,
    eta: '5-8',
  },
  {
    id: 'xl',
    name: 'XL',
    description: 'Vehicles with extra capacity for groups',
    icon: '🚐',
    price: 2.5,
    eta: '6-10',
  },
];

const CabTypeSelector = ({ selectedType, onSelect, estimatedPrice }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Select Ride Type</h3>
      <div className="grid grid-cols-1 gap-3">
        {cabTypes.map((type) => {
          const isSelected = selectedType === type.id;
          const calculatedPrice = (estimatedPrice * type.price).toFixed(2);
          
          return (
            <motion.div
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(type.id)}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <div className="flex items-center">
                <div className="text-2xl mr-3">{type.icon}</div>
                <div className="flex-grow">
                  <h4 className="font-medium">{type.name}</h4>
                  <p className="text-sm text-gray-500">{type.description}</p>
                  <p className="text-xs text-gray-400 mt-1">{type.eta} min arrival time</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${calculatedPrice}</p>
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default CabTypeSelector;
