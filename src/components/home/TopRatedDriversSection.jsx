import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockTopDrivers = [
  { id: 'd1', name: 'Michael L.', rating: 4.9, car: 'Toyota Prius', avatar: 'https://i.pravatar.cc/150?img=1' },
  { id: 'd2', name: 'Sarah B.', rating: 4.8, car: 'Honda Civic', avatar: 'https://i.pravatar.cc/150?img=2' },
  { id: 'd3', name: 'David K.', rating: 4.8, car: 'Tesla Model 3', avatar: 'https://i.pravatar.cc/150?img=3' },
];

const TopRatedDriversSection = ({ onBookWithDriver }) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="py-8"
    >
      <h2 className="text-3xl font-bold text-center mb-10">Meet Our Top Drivers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockTopDrivers.map((driver, index) => (
          <motion.div
            key={driver.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index + 0.7 }}
            className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex flex-col items-center text-center"
          >
            <Avatar className="h-24 w-24 mb-4 border-4 border-blue-200">
              <AvatarImage src={driver.avatar} alt={driver.name} />
              <AvatarFallback>{driver.name.substring(0,1)}</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold mb-1">{driver.name}</h3>
            <div className="flex items-center mb-1">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 mr-1" />
              <span className="text-lg font-semibold">{driver.rating}</span>
            </div>
            <p className="text-sm text-gray-600 mb-3">{driver.car}</p>
            <Button onClick={() => onBookWithDriver(driver.id)} size="sm">Book with {driver.name.split(' ')[0]}</Button>
          </motion.div>
        ))}
      </div>
       <p className="text-center text-xs text-muted-foreground mt-4">
        Driver rating suggestions are based on availability and proximity. This is a UI mockup.
      </p>
    </motion.section>
  );
};

export default TopRatedDriversSection;