
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Filter, Search, ListChecks } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useBooking } from '@/contexts/BookingContext';
import { useAuth } from '@/contexts/AuthContext';
import RideCard from '@/components/RideCard';
import RideReviewDialog from '@/components/RideReviewDialog';
import { useToast } from '@/components/ui/use-toast';

const RideHistoryPage = () => {
  const navigate = useNavigate();
  const { bookings, loading: bookingsLoading, cancelBooking, completeRide } = useBooking();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [rideToReview, setRideToReview] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: { pathname: '/history' } } });
    }
  }, [isAuthenticated, navigate]);

  const filteredBookings = bookings
    .filter(booking => {
      if (filter === 'all') return true;
      return booking.status === filter;
    })
    .filter(booking => 
      booking.pickupLocation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.dropoffLocation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.driver && booking.driver.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const handleViewDetails = (ride) => {
    navigate(`/active-ride/${ride.id}`);
  };

  const handleCancelRide = (rideId) => {
    cancelBooking(rideId, { reason: "Cancelled from history page", isLate: false });
  };
  
  const handleMarkComplete = (rideId) => {
    const ride = bookings.find(b => b.id === rideId);
    if(ride) completeRide(rideId, ride.fare);
  };

  const handleOpenReviewDialog = (ride) => {
    if (ride.status !== 'completed') {
      toast({ title: "Cannot Review", description: "You can only review completed rides.", variant: "default" });
      return;
    }
    setRideToReview(ride);
    setIsReviewDialogOpen(true);
  };

  const handleSubmitReview = (reviewData) => {
    console.log("Review submitted (mock):", reviewData);
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });
    // In a real app, you would save this review to your backend
    // And potentially update the local booking data if it stores review status
  };

  if (bookingsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="ml-4 text-lg">Loading ride history...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold flex items-center"><Clock className="mr-2 h-8 w-8 text-blue-600" />Ride History</h1>
        <Button onClick={() => navigate('/booking')} className="bg-blue-600 hover:bg-blue-700">
          Book New Ride
        </Button>
      </div>

      <div className="mb-6 p-4 bg-white rounded-lg shadow-md border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <Input
              type="text"
              placeholder="Search by location or driver..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <Button variant="outline" className="flex items-center">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setFilter} className="mb-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
      </Tabs>

      {filteredBookings.length > 0 ? (
        <div className="space-y-6">
          <AnimatePresence>
            {filteredBookings.map((ride) => (
              <motion.div
                key={ride.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <RideCard 
                  ride={ride} 
                  onViewDetails={handleViewDetails}
                  onCancel={handleCancelRide}
                  onComplete={handleMarkComplete}
                />
                 <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 w-full" 
                  onClick={() => handleOpenReviewDialog(ride)}
                  disabled={ride.status !== 'completed'}
                >
                  <ListChecks className="mr-2 h-4 w-4" /> Rate Ride
                </Button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="text-center py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Clock className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">No Rides Found</h2>
            <p className="text-gray-500">
              {filter === 'all' && !searchTerm ? 'You haven\'t booked any rides yet.' : 'No rides match your current search or filter.'}
            </p>
            {filter === 'all' && !searchTerm && (
              <Button onClick={() => navigate('/booking')} className="mt-6">
                Book Your First Ride
              </Button>
            )}
          </motion.div>
        </div>
      )}

      {rideToReview && (
        <RideReviewDialog
          ride={rideToReview}
          open={isReviewDialogOpen}
          onOpenChange={setIsReviewDialogOpen}
          onSubmitReview={handleSubmitReview}
        />
      )}
    </motion.div>
  );
};

export default RideHistoryPage;