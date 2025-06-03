import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const BookingContext = createContext(null);

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [bookings, setBookings] = useState([]);
  const [activeRide, setActiveRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const storedBookings = localStorage.getItem(`cabgo-bookings-${user.id}`);
      if (storedBookings) {
        try {
          setBookings(JSON.parse(storedBookings));
        } catch (error) {
          console.error('Failed to parse bookings data:', error);
        }
      }

      const storedActiveRide = localStorage.getItem(`cabgo-active-ride-${user.id}`);
      if (storedActiveRide) {
        try {
          const parsedActiveRide = JSON.parse(storedActiveRide);
          // Ensure active ride is not completed or cancelled
          if (parsedActiveRide && parsedActiveRide.status !== 'completed' && parsedActiveRide.status !== 'cancelled') {
            setActiveRide(parsedActiveRide);
          } else {
            localStorage.removeItem(`cabgo-active-ride-${user.id}`);
          }
        } catch (error) {
          console.error('Failed to parse active ride data:', error);
        }
      }
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    if (user && bookings.length >= 0) { // Allow saving empty bookings array
      localStorage.setItem(`cabgo-bookings-${user.id}`, JSON.stringify(bookings));
    }
  }, [bookings, user]);

  useEffect(() => {
    if (user) {
      if (activeRide && activeRide.status !== 'completed' && activeRide.status !== 'cancelled') {
        localStorage.setItem(`cabgo-active-ride-${user.id}`, JSON.stringify(activeRide));
      } else {
        localStorage.removeItem(`cabgo-active-ride-${user.id}`);
      }
    }
  }, [activeRide, user]);

  const createBooking = (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: Date.now().toString(),
      userId: user.id,
      status: bookingData.isScheduled ? 'scheduled' : 'pending',
      createdAt: new Date().toISOString(),
      cancellationFee: 0,
      cancellationReason: null,
    };

    setBookings((prev) => [newBooking, ...prev]);
    
    if (!bookingData.isScheduled) {
      // Simulate finding a driver for immediate bookings
      setTimeout(() => {
        const updatedBooking = {
          ...newBooking,
          status: 'confirmed',
          driver: getRandomDriver(),
          estimatedArrival: new Date(Date.now() + 5 * 60000).toISOString(), 
        };
        
        setBookings((prev) => 
          prev.map((booking) => 
            booking.id === newBooking.id ? updatedBooking : booking
          )
        );
        
        setActiveRide(updatedBooking);
        
        toast({
          title: "Ride Confirmed!",
          description: `Your driver ${updatedBooking.driver.name} is on the way.`,
        });
      }, 3000);
    }

    toast({
      title: bookingData.isScheduled ? "Ride Scheduled" : "Booking Created",
      description: bookingData.isScheduled 
        ? `Your ride for ${bookingData.scheduledDate} at ${bookingData.scheduledTime} is confirmed.`
        : "Looking for drivers near you...",
    });
    
    return newBooking;
  };

  const cancelBooking = (bookingId, cancellationDetails) => {
    let feeApplied = 0;
    const { reason = "Cancelled by user", isLate = false } = cancellationDetails || {};

    if (isLate) { // Example: late cancellation fee
      feeApplied = 5.00; 
      toast({
        title: "Cancellation Fee Applied",
        description: `A fee of $${feeApplied.toFixed(2)} has been applied for late cancellation. (Mocked)`,
        variant: "destructive"
      });
    }

    setBookings((prev) => 
      prev.map((booking) => 
        booking.id === bookingId 
          ? { 
              ...booking, 
              status: 'cancelled', 
              cancelledAt: new Date().toISOString(),
              cancellationFee: feeApplied,
              cancellationReason: reason
            } 
          : booking
      )
    );
    
    if (activeRide && activeRide.id === bookingId) {
      setActiveRide(null);
    }
    
    toast({
      title: "Booking Cancelled",
      description: `Your booking has been cancelled. Reason: ${reason}.`,
    });
  };

  const completeRide = (bookingId, finalFare) => { // Driver now provides finalFare
    setBookings((prev) => 
      prev.map((booking) => 
        booking.id === bookingId 
          ? { ...booking, status: 'completed', completedAt: new Date().toISOString(), fare: finalFare } 
          : booking
      )
    );
    
    if (activeRide && activeRide.id === bookingId) {
        setActiveRide(null);
    }
    
    toast({
      title: "Ride Completed",
      description: `Thank you for riding with CabGo! Final fare: $${finalFare.toFixed(2)}`,
    });
  };

  const getRandomDriver = () => {
    const drivers = [
      { id: 'd1', name: 'John Doe', rating: 4.8, car: 'Toyota Camry', licensePlate: 'ABC123', avatar: 'https://i.pravatar.cc/150?img=7' },
      { id: 'd2', name: 'Jane Smith', rating: 4.9, car: 'Honda Civic', licensePlate: 'XYZ789', avatar: 'https://i.pravatar.cc/150?img=8' },
      { id: 'd3', name: 'Mike Johnson', rating: 4.7, car: 'Ford Focus', licensePlate: 'DEF456', avatar: 'https://i.pravatar.cc/150?img=9' },
      { id: 'd4', name: 'Sarah Williams', rating: 4.9, car: 'Hyundai Sonata', licensePlate: 'GHI789', avatar: 'https://i.pravatar.cc/150?img=10' },
    ];
    return drivers[Math.floor(Math.random() * drivers.length)];
  };

  const value = {
    bookings,
    activeRide,
    loading,
    createBooking,
    cancelBooking,
    completeRide,
    setActiveRide, 
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};
