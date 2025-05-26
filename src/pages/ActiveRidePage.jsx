
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useBooking } from '@/contexts/BookingContext';
import DriverCard from '@/components/DriverCard';
import ActiveRideMap from '@/components/ActiveRideMap';
import ActiveRideDetails from '@/components/ActiveRideDetails';
import ActiveRideActions from '@/components/ActiveRideActions';
import ActiveRideStatusHeader from '@/components/ActiveRideStatusHeader';
import InAppChat from '@/components/InAppChat';

const ActiveRidePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { bookings, activeRide, cancelBooking, completeRide } = useBooking();
  
  const [ride, setRide] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);
  const [estimatedArrival, setEstimatedArrival] = useState(null);
  const [rideStatus, setRideStatus] = useState('');
  const [progress, setProgress] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [showCancellationDialog, setShowCancellationDialog] = useState(false);


  useEffect(() => {
    const foundRide = bookings.find(booking => booking.id === id) || activeRide;
    
    if (foundRide) {
      setRide(foundRide);
      setRideStatus(foundRide.status);
      
      if (foundRide.estimatedArrival) {
        setEstimatedArrival(new Date(foundRide.estimatedArrival));
      }
      
      if (foundRide.status === 'confirmed' || foundRide.status === 'en_route') {
        const interval = setInterval(() => {
          setDriverLocation({
            lat: foundRide.pickupLocation.lat + (Math.random() * 0.01 - 0.005),
            lng: foundRide.pickupLocation.lng + (Math.random() * 0.01 - 0.005),
          });
          
          setProgress(prev => {
            const newProgress = prev + (foundRide.status === 'confirmed' ? 5 : 10); 
            if (newProgress >= 100) {
              clearInterval(interval);
              if (foundRide.status === 'confirmed') { 
                setRideStatus('en_route'); 
                setProgress(0); 
                toast({ title: "Driver has arrived!", description: "Your ride is starting." });
              } else if (foundRide.status === 'en_route') {
                completeRide(foundRide.id, foundRide.fare); 
                navigate('/history');
              }
              return foundRide.status === 'confirmed' ? 0 : 100; 
            }
            return newProgress;
          });
        }, 3000);
        
        return () => clearInterval(interval);
      }
    } else {
      toast({
        title: "Ride Not Found",
        description: "The requested ride could not be found.",
        variant: "destructive",
      });
      navigate('/booking');
    }
  }, [id, bookings, activeRide, navigate, toast, completeRide]);

  const handleCancelRide = (cancellationData) => {
    if (ride) {
      cancelBooking(ride.id, cancellationData); // Pass cancellation reason and fee info
      navigate('/history');
    }
  };

  const getStatusText = () => {
    switch (rideStatus) {
      case 'pending': return 'Looking for drivers...';
      case 'confirmed': return progress < 100 ? 'Driver is on the way' : 'Driver has arrived';
      case 'en_route': return 'Ride in progress';
      case 'completed': return 'Ride completed';
      case 'cancelled': return 'Ride cancelled';
      default: return 'Processing...';
    }
  };

  if (!ride) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Active Ride</h1>

        <Card className="mb-6 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <ActiveRideStatusHeader statusText={getStatusText()} />
          </CardHeader>
          <CardContent className="p-0">
            {(rideStatus === 'confirmed' || rideStatus === 'en_route') && (
              <div className="w-full bg-gray-200">
                <div 
                  className="bg-blue-600 h-2 transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            )}
            
            <ActiveRideMap 
              pickupLocation={ride.pickupLocation} 
              dropoffLocation={ride.dropoffLocation}
              driverLocation={driverLocation}
            />
            
            {ride.driver && (
              <div className="p-4 border-t">
                <DriverCard driver={ride.driver} />
              </div>
            )}
            
            <ActiveRideDetails ride={ride} estimatedArrival={estimatedArrival} />

            {showChat && ride.driver && (
                <div className="p-4 border-t">
                    <InAppChat participantName={ride.driver.name} participantAvatar={ride.driver.avatar} />
                </div>
            )}

          </CardContent>
          <CardFooter className="border-t p-4">
            <ActiveRideActions 
              rideStatus={rideStatus} 
              handleCancelRide={handleCancelRide}
              showCancellationDialog={showCancellationDialog}
              setShowCancellationDialog={setShowCancellationDialog}
              rideId={ride.id}
            />
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default ActiveRidePage;
