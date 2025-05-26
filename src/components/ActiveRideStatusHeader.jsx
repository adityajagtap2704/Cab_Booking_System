import React from 'react';
import { CardTitle } from '@/components/ui/card';

const ActiveRideStatusHeader = ({ statusText }) => {
  return (
    <CardTitle className="flex justify-between items-center">
      <span>Ride Status</span>
      <span className="text-sm font-normal bg-white/20 px-3 py-1 rounded-full">
        {statusText}
      </span>
    </CardTitle>
  );
};

export default ActiveRideStatusHeader;