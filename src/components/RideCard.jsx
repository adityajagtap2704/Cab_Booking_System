
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, User, Car, DollarSign } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate, formatCurrency } from '@/lib/utils';

const RideCard = ({ ride, onViewDetails, onCancel, onComplete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden border-2 hover:shadow-lg transition-shadow duration-300">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-bold">
              {ride.pickupLocation.name} → {ride.dropoffLocation.name}
            </CardTitle>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ride.status)}`}>
              {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
            </span>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Pickup</p>
                <p className="text-sm text-gray-500">{ride.pickupLocation.name}</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Dropoff</p>
                <p className="text-sm text-gray-500">{ride.dropoffLocation.name}</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <Clock className="h-4 w-4 text-gray-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Date & Time</p>
                <p className="text-sm text-gray-500">{formatDate(ride.createdAt)}</p>
              </div>
            </div>
            {ride.driver && (
              <div className="flex items-start space-x-2">
                <User className="h-4 w-4 text-gray-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Driver</p>
                  <p className="text-sm text-gray-500">{ride.driver.name} ({ride.driver.rating}★)</p>
                </div>
              </div>
            )}
            {ride.driver && (
              <div className="flex items-start space-x-2">
                <Car className="h-4 w-4 text-gray-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Vehicle</p>
                  <p className="text-sm text-gray-500">{ride.driver.car} ({ride.driver.licensePlate})</p>
                </div>
              </div>
            )}
            <div className="flex items-start space-x-2">
              <DollarSign className="h-4 w-4 text-gray-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium">Fare</p>
                <p className="text-sm text-gray-500">{formatCurrency(ride.fare)}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between pt-2">
          <Button variant="outline" size="sm" onClick={() => onViewDetails(ride)}>
            View Details
          </Button>
          {ride.status === 'pending' || ride.status === 'confirmed' ? (
            <Button variant="destructive" size="sm" onClick={() => onCancel(ride.id)}>
              Cancel Ride
            </Button>
          ) : null}
          {ride.status === 'confirmed' && (
            <Button variant="default" size="sm" onClick={() => onComplete(ride.id)}>
              Complete Ride
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default RideCard;
