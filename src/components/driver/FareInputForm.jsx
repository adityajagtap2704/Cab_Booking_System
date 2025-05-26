import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DollarSign } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const FareInputForm = ({ rideId, onSubmitFare }) => {
  const [fare, setFare] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fareValue = parseFloat(fare);
    if (isNaN(fareValue) || fareValue <= 0) {
      toast({
        title: 'Invalid Fare',
        description: 'Please enter a valid positive fare amount.',
        variant: 'destructive',
      });
      return;
    }
    onSubmitFare(rideId, fareValue);
    setFare('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border-t">
      <h3 className="text-lg font-semibold">Enter Final Fare</h3>
      <div className="space-y-1">
        <Label htmlFor="fareAmount">Fare Amount</Label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            id="fareAmount"
            type="number"
            step="0.01"
            placeholder="Enter fare (e.g., 15.50)"
            value={fare}
            onChange={(e) => setFare(e.target.value)}
            className="pl-10"
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full">
        Submit Fare & Complete Ride
      </Button>
    </form>
  );
};

export default FareInputForm;