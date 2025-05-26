import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const cancellationReasons = [
  { id: 'reason1', label: 'Driver is late' },
  { id: 'reason2', label: 'Changed my mind' },
  { id: 'reason3', label: 'Found another ride' },
  { id: 'reason4', label: 'Driver asked to cancel' },
  { id: 'other', label: 'Other' },
];

const RideCancellationDialog = ({ open, onOpenChange, onConfirmCancel, rideId }) => {
  const { toast } = useToast();
  const [reason, setReason] = useState('');
  const [otherReasonText, setOtherReasonText] = useState('');
  
  const isLateCancellation = () => {
    // Mock logic: Assume any cancellation for a confirmed ride might incur a fee
    // In a real app, this would depend on timing rules (e.g., >5 mins after confirmation)
    const ride = JSON.parse(localStorage.getItem(`cabgo-active-ride-${rideId?.userId}`)) || {};
    return ride.status === 'confirmed'; 
  };

  const handleConfirm = () => {
    if (!reason) {
      toast({ title: "Reason Required", description: "Please select a reason for cancellation.", variant: "destructive" });
      return;
    }
    if (reason === 'other' && !otherReasonText.trim()) {
      toast({ title: "Details Required", description: "Please specify your reason for cancellation.", variant: "destructive" });
      return;
    }
    
    const finalReason = reason === 'other' ? otherReasonText : cancellationReasons.find(r => r.id === reason)?.label;
    
    onConfirmCancel({ rideId, reason: finalReason, isLate: isLateCancellation() });
    setReason('');
    setOtherReasonText('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cancel Ride</DialogTitle>
          <DialogDescription>
            Are you sure you want to cancel this ride? 
            {isLateCancellation() && " A cancellation fee of $5.00 may apply."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label className="mb-2 block">Reason for Cancellation</Label>
            <RadioGroup value={reason} onValueChange={setReason}>
              {cancellationReasons.map((r) => (
                <div key={r.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={r.id} id={r.id} />
                  <Label htmlFor={r.id}>{r.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          {reason === 'other' && (
            <div>
              <Label htmlFor="otherReasonText">Please specify:</Label>
              <Textarea
                id="otherReasonText"
                value={otherReasonText}
                onChange={(e) => setOtherReasonText(e.target.value)}
                placeholder="Enter your reason here..."
                className="mt-1"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Keep Ride</Button>
          <Button variant="destructive" onClick={handleConfirm}>Confirm Cancellation</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RideCancellationDialog;