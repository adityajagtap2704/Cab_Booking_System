import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import LocationSearch from '@/components/LocationSearch';
import Map from '@/components/Map';

const BookingStepLocation = ({
  pickupLocation, setPickupLocation,
  dropoffLocation, setDropoffLocation,
  isScheduled, setIsScheduled,
  scheduledDate, setScheduledDate,
  scheduledTime, setScheduledTime,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <LocationSearch 
          placeholder="Enter pickup location" 
          onSelect={setPickupLocation} 
        />
        <LocationSearch 
          placeholder="Enter dropoff location" 
          onSelect={setDropoffLocation} 
        />
      </div>
      
      {pickupLocation && dropoffLocation && (
        <Map 
          pickupLocation={pickupLocation} 
          dropoffLocation={dropoffLocation} 
        />
      )}
      
      <div className="flex items-center space-x-2">
        <Switch 
          id="schedule-ride" 
          checked={isScheduled}
          onCheckedChange={setIsScheduled}
        />
        <Label htmlFor="schedule-ride">Schedule for later</Label>
      </div>
      
      {isScheduled && (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="scheduled-date">Date</Label>
            <div className="relative">
              <input
                id="scheduled-date"
                type="date"
                className="w-full p-2 border rounded-md pl-10"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="scheduled-time">Time</Label>
            <div className="relative">
              <input
                id="scheduled-time"
                type="time"
                className="w-full p-2 border rounded-md pl-10"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
              />
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingStepLocation;