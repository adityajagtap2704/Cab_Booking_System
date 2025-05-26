import React from 'react';
import Map from '@/components/Map';

const BookingStepConfirmation = ({
  pickupLocation, dropoffLocation,
  cabType, paymentMethod,
  distance, fare,
  isScheduled, scheduledDate, scheduledTime,
}) => {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-lg mb-2">Ride Summary</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Pickup:</span>
            <span className="font-medium">{pickupLocation?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Dropoff:</span>
            <span className="font-medium">{dropoffLocation?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Distance:</span>
            <span className="font-medium">{distance.toFixed(2)} km</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Cab Type:</span>
            <span className="font-medium capitalize">{cabType}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Payment Method:</span>
            <span className="font-medium capitalize">{paymentMethod}</span>
          </div>
          {isScheduled && (
            <div className="flex justify-between">
              <span className="text-gray-600">Scheduled For:</span>
              <span className="font-medium">{scheduledDate} at {scheduledTime}</span>
            </div>
          )}
          <div className="border-t pt-2 mt-2">
            <div className="flex justify-between font-bold">
              <span>Total Fare:</span>
              <span>${fare.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <Map 
        pickupLocation={pickupLocation} 
        dropoffLocation={dropoffLocation} 
      />
    </div>
  );
};

export default BookingStepConfirmation;