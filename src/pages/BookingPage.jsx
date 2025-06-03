import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useBooking } from '@/contexts/BookingContext';
import BookingStepLocation from '@/components/booking/BookingStepLocation';
import BookingStepOptions from '@/components/booking/BookingStepOptions';
import BookingStepConfirmation from '@/components/booking/BookingStepConfirmation';
import { calculateDistance, calculateFare } from '@/lib/utils';

const BookingPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { createBooking } = useBooking();
  const { toast } = useToast();

  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);
  const [cabType, setCabType] = useState('economy');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [distance, setDistance] = useState(0);
  const [fare, setFare] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/booking' } } });
      toast({
        title: "Authentication Required",
        description: "Please log in to book a ride.",
        variant: "destructive",
      });
    }
  }, [isAuthenticated, navigate, toast]);

  useEffect(() => {
    if (pickupLocation && dropoffLocation) {
      const calculatedDistance = calculateDistance(
        pickupLocation.lat, pickupLocation.lng,
        dropoffLocation.lat, dropoffLocation.lng
      );
      setDistance(calculatedDistance);
      const calculatedFare = calculateFare(calculatedDistance, cabType);
      setFare(calculatedFare);
    }
  }, [pickupLocation, dropoffLocation, cabType]);

  const handleBookNow = () => {
    if (!pickupLocation || !dropoffLocation) {
      toast({
        title: "Missing Information",
        description: "Please select both pickup and dropoff locations.",
        variant: "destructive",
      });
      return;
    }
    if (isScheduled && (!scheduledDate || !scheduledTime)) {
      toast({
        title: "Missing Schedule Info",
        description: "Please select a date and time for your scheduled ride.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    const bookingData = {
      pickupLocation, dropoffLocation, cabType, paymentMethod, fare, distance,
      isScheduled, scheduledDate: isScheduled ? scheduledDate : null, scheduledTime: isScheduled ? scheduledTime : null,
    };
    const booking = createBooking(bookingData);
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/active-ride/${booking.id}`);
    }, 2000);
  };

  const nextStep = () => {
    if (currentStep === 1 && (!pickupLocation || !dropoffLocation)) {
      toast({
        title: "Missing Information",
        description: "Please select both pickup and dropoff locations.",
        variant: "destructive",
      });
      return;
    }
    if (currentStep === 1 && isScheduled && (!scheduledDate || !scheduledTime)) {
      toast({
        title: "Missing Schedule Info",
        description: "Please select a date and time if scheduling for later.",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => setCurrentStep(currentStep - 1);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BookingStepLocation
            pickupLocation={pickupLocation}
            setPickupLocation={setPickupLocation}
            dropoffLocation={dropoffLocation}
            setDropoffLocation={setDropoffLocation}
            isScheduled={isScheduled}
            setIsScheduled={setIsScheduled}
            scheduledDate={scheduledDate}
            setScheduledDate={setScheduledDate}
            scheduledTime={scheduledTime}
            setScheduledTime={setScheduledTime}
          />
        );
      case 2:
        return (
          <BookingStepOptions
            cabType={cabType}
            setCabType={setCabType}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            estimatedPrice={fare / (cabType === 'economy' ? 1 : (cabType === 'comfort' ? 1.5 : (cabType === 'premium' ? 2 : 2.5)))}
          />
        );
      case 3:
        return (
          <BookingStepConfirmation
            pickupLocation={pickupLocation}
            dropoffLocation={dropoffLocation}
            cabType={cabType}
            paymentMethod={paymentMethod}
            distance={distance}
            fare={fare}
            isScheduled={isScheduled}
            scheduledDate={scheduledDate}
            scheduledTime={scheduledTime}
          />
        );
      default:
        return null;
    }
  };

  const stepTitles = ["Enter Locations & Time", "Select Ride Options", "Confirm Booking"];

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Book a Ride</h1>
        <Card className="mb-6">
          <CardHeader className="pb-4">
            <CardTitle>
              {distance > 0 && (
                <div className="text-sm text-gray-500">
                  Distance: {distance} km | Estimated Fare: ₹{fare}
                </div>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>{renderStepContent()}</CardContent>
          <CardFooter className="flex justify-between">
            {currentStep > 1 ? (
              <Button variant="outline" onClick={prevStep}>Back</Button>
            ) : (
              <div></div> 
            )}
            {currentStep < 3 ? (
              <Button onClick={nextStep}>Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
            ) : (
              <Button onClick={handleBookNow} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                {isLoading ? (
                  <><div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>Processing...</>
                ) : (
                  isScheduled ? 'Schedule Ride' : 'Confirm Booking'
                )}
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default BookingPage;