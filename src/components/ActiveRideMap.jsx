import React from 'react';
import Map from '@/components/Map';

const ActiveRideMap = ({ pickupLocation, dropoffLocation, driverLocation }) => {
  return (
    <div className="p-4">
      <Map 
        pickupLocation={pickupLocation} 
        dropoffLocation={dropoffLocation}
        driverLocation={driverLocation}
      />
    </div>
  );
};

export default ActiveRideMap;