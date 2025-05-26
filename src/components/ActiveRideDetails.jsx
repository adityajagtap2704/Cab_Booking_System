import React from 'react';
import { MapPin, Clock } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const ActiveRideDetails = ({ ride, estimatedArrival }) => {
  if (!ride) return null;

  return (
    <div className="p-4 border-t">
      <h3 className="font-semibold text-lg mb-3">Ride Details</h3>
      <div className="space-y-3">
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <p className="font-medium">Pickup Location</p>
            <p className="text-gray-600">{ride.pickupLocation.name}</p>
          </div>
        </div>
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-red-500 mt-0.5" />
          <div>
            <p className="font-medium">Dropoff Location</p>
            <p className="text-gray-600">{ride.dropoffLocation.name}</p>
          </div>
        </div>
        {estimatedArrival && (
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
            <div>
              <p className="font-medium">Estimated Arrival</p>
              <p className="text-gray-600">
                {estimatedArrival.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        )}
        <div className="flex items-start space-x-3">
          <div className="h-5 w-5 flex items-center justify-center text-green-500 mt-0.5">
            $
          </div>
          <div>
            <p className="font-medium">Fare</p>
            <p className="text-gray-600">{formatCurrency(ride.fare)}</p>
          </div>
        </div>
         {ride.isScheduled && ride.scheduledDate && ride.scheduledTime && (
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <p className="font-medium">Scheduled For</p>
              <p className="text-gray-600">{ride.scheduledDate} at {ride.scheduledTime}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveRideDetails;