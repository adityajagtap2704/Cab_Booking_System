
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, DollarSign, CheckCircle, XCircle, PlayCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import InAppChat from '@/components/InAppChat';
import FareInputForm from '@/components/driver/FareInputForm';

const DriverDashboardPage = () => {
  const { toast } = useToast();
  const [isOnline, setIsOnline] = useState(false);
  const [currentRide, setCurrentRide] = useState(null);
  const [showChat, setShowChat] = useState(false);

  const mockRide = {
    id: 'ride123',
    passengerName: 'Alice Wonderland',
    passengerAvatar: 'https://i.pravatar.cc/150?img=5',
    pickup: '123 Main St, Anytown',
    dropoff: '456 Oak Ave, Anytown',
    estimatedFare: 15.75, // Driver doesn't set this initially
    status: 'pending_acceptance', // pending_acceptance, pending_pickup, en_route, awaiting_fare, completed
  };

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
    toast({
      title: `You are now ${!isOnline ? 'Online' : 'Offline'}`,
      description: !isOnline ? 'Ready to accept rides.' : 'You will not receive new ride requests.',
    });
    if (isOnline) setCurrentRide(null); 
  };

  const simulateIncomingRide = () => {
    if (!isOnline) {
        toast({ title: "You are Offline", description: "Go online to receive ride requests.", variant: "destructive"});
        return;
    }
    setCurrentRide({...mockRide, status: 'pending_acceptance'});
    toast({ title: "New Ride Request!", description: `From ${mockRide.passengerName}` });
  };

  const acceptRide = () => {
    setCurrentRide(prev => ({ ...prev, status: 'pending_pickup' }));
    toast({ title: "Ride Accepted", description: `Picking up ${mockRide.passengerName}` });
  };
  
  const startRide = () => {
    setCurrentRide(prev => ({ ...prev, status: 'en_route' }));
    toast({ title: "Ride Started", description: `En route to ${mockRide.dropoff}` });
  };
  
  const arrivedAtDestination = () => {
    setCurrentRide(prev => ({ ...prev, status: 'awaiting_fare'}));
    toast({title: "Arrived at Destination", description: "Please enter the final fare."});
  };

  const submitFareAndComplete = (rideId, finalFare) => {
    setCurrentRide(prev => ({ ...prev, status: 'completed', finalFare }));
    toast({ title: "Ride Completed", description: `Fare: $${finalFare.toFixed(2)} recorded.` });
    // In a real app, this would be sent to backend and then earnings updated
    // For now, we just simulate it
    setTimeout(() => setCurrentRide(null), 3000); 
  };

  const cancelRide = () => {
    const rideId = currentRide.id;
    // Mock cancellation fee for driver cancelling
    const cancellationFee = 2.00; 
    toast({ title: "Ride Cancelled by You", description: `A fee of $${cancellationFee.toFixed(2)} might be applied.`, variant: "destructive" });
    setCurrentRide(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Driver Dashboard</h1>
        <div className="flex items-center space-x-2 p-3 bg-white rounded-lg shadow">
          <Switch 
            id="availability-toggle-dashboard" 
            checked={isOnline} 
            onCheckedChange={toggleOnlineStatus}
            className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-200"
          />
          <Label htmlFor="availability-toggle-dashboard" className="text-sm font-medium">
            {isOnline ? 'Online - Accepting Rides' : 'Offline'}
          </Label>
        </div>
      </div>

      {currentRide ? (
        <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
          <CardHeader>
            <CardTitle>Current Ride: {currentRide.status.replace('_', ' ').toUpperCase()}</CardTitle>
            <CardDescription className="text-blue-100">Passenger: {currentRide.passengerName}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center"><MapPin className="mr-2 h-5 w-5" /> Pickup: {currentRide.pickup}</div>
            <div className="flex items-center"><MapPin className="mr-2 h-5 w-5" /> Dropoff: {currentRide.dropoff}</div>
            {currentRide.finalFare ? (
                 <div className="flex items-center"><DollarSign className="mr-2 h-5 w-5" /> Final Fare: ${currentRide.finalFare.toFixed(2)}</div>
            ) : (
                 <div className="flex items-center"><DollarSign className="mr-2 h-5 w-5" /> Estimated Fare: ${currentRide.estimatedFare.toFixed(2)}</div>
            )}
            
            {currentRide.status === 'pending_acceptance' && (
              <Button onClick={acceptRide} className="w-full mt-4 bg-green-500 hover:bg-green-600">
                Accept Ride
              </Button>
            )}
            {currentRide.status === 'pending_pickup' && (
              <Button onClick={startRide} className="w-full mt-4 bg-green-500 hover:bg-green-600">
                <PlayCircle className="mr-2 h-4 w-4" /> Start Ride
              </Button>
            )}
            {currentRide.status === 'en_route' && (
              <Button onClick={arrivedAtDestination} className="w-full mt-4 bg-yellow-500 hover:bg-yellow-600 text-black">
                <CheckCircle className="mr-2 h-4 w-4" /> Arrived at Destination
              </Button>
            )}
             {currentRide.status === 'awaiting_fare' && (
              <FareInputForm rideId={currentRide.id} onSubmitFare={submitFareAndComplete} />
            )}

            {currentRide.status !== 'completed' && currentRide.status !== 'awaiting_fare' && (
              <Button onClick={cancelRide} variant="destructive" className="w-full mt-2">
                <XCircle className="mr-2 h-4 w-4" /> Cancel Ride
              </Button>
            )}
            {currentRide.status === 'completed' && (
              <p className="text-center font-semibold text-lg mt-4">Ride Completed!</p>
            )}
            
            {(currentRide.status === 'pending_pickup' || currentRide.status === 'en_route') && (
                 <Button onClick={() => setShowChat(!showChat)} variant="outline" className="w-full mt-2 text-blue-600 border-blue-200 hover:bg-blue-50">
                    <MessageSquare className="mr-2 h-4 w-4" /> {showChat ? 'Hide Chat' : 'Chat with Passenger'}
                </Button>
            )}
            {showChat && (currentRide.status === 'pending_pickup' || currentRide.status === 'en_route') && (
                <div className="mt-4">
                    <InAppChat participantName={currentRide.passengerName} participantAvatar={currentRide.passengerAvatar} />
                </div>
            )}

          </CardContent>
        </Card>
      ) : isOnline ? (
        <Card>
          <CardHeader>
            <CardTitle>Waiting for Ride Requests</CardTitle>
            <CardDescription>You are online and will be notified of new ride requests.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button onClick={simulateIncomingRide} className="animate-pulse">Simulate Incoming Ride</Button>
            <p className="text-sm text-muted-foreground mt-2">(This is a test button)</p>
             <p className="text-xs text-muted-foreground mt-4">
              Driver auto-reassignment: If you don't accept a ride within a short time (e.g., 30 seconds), it may be reassigned to another driver. (Backend logic)
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>You are Offline</CardTitle>
            <CardDescription>Toggle your status to online to start receiving ride requests.</CardDescription>
          </CardHeader>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0.00</div>
            <p className="text-xs text-muted-foreground">(Earnings will update after rides. Mock data.)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Rides (Today)</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">(Mock data)</p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};

export default DriverDashboardPage;