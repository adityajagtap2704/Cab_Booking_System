import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, MessageSquare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RideCancellationDialog from '@/components/RideCancellationDialog';

const ActiveRideActions = ({ rideStatus, handleCancelRide, showCancellationDialog, setShowCancellationDialog, rideId }) => {
  const navigate = useNavigate();

  if (rideStatus === 'completed' || rideStatus === 'cancelled') {
    return (
      <Button 
        className="w-full" 
        onClick={() => navigate('/history')}
      >
        View Ride History
      </Button>
    );
  }

  return (
    <div className="w-full flex flex-col sm:flex-row gap-3">
      {rideStatus === 'confirmed' && (
        <>
          <Button className="flex-1" variant="outline">
            <Phone className="mr-2 h-4 w-4" />
            Call Driver
          </Button>
          <Button className="flex-1" variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" />
            Message Driver
          </Button>
        </>
      )}
      {(rideStatus === 'pending' || rideStatus === 'confirmed') && (
        <Button 
          className="flex-1" 
          variant="destructive"
          onClick={() => setShowCancellationDialog(true)}
        >
          <X className="mr-2 h-4 w-4" />
          Cancel Ride
        </Button>
      )}
      <RideCancellationDialog
        open={showCancellationDialog}
        onOpenChange={setShowCancellationDialog}
        onConfirmCancel={() => {
          handleCancelRide();
          setShowCancellationDialog(false);
        }}
        rideId={rideId}
      />
    </div>
  );
};

export default ActiveRideActions;