
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Phone, MessageSquare } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const DriverCard = ({ driver }) => {
  if (!driver) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
    >
      <div className="flex items-center space-x-4">
        <Avatar className="h-16 w-16 border-2 border-blue-500">
          <AvatarFallback className="text-lg bg-blue-100 text-blue-800">
            {driver.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <h3 className="font-bold text-lg">{driver.name}</h3>
          <div className="flex items-center mt-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-sm font-medium">{driver.rating}</span>
            <span className="mx-2 text-gray-300">•</span>
            <span className="text-sm text-gray-500">{driver.car}</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">License: {driver.licensePlate}</p>
        </div>
      </div>
      
      <div className="mt-4 flex space-x-2">
        <Button variant="outline" className="flex-1">
          <Phone className="h-4 w-4 mr-2" />
          Call
        </Button>
        <Button variant="outline" className="flex-1">
          <MessageSquare className="h-4 w-4 mr-2" />
          Message
        </Button>
      </div>
    </motion.div>
  );
};

export default DriverCard;
