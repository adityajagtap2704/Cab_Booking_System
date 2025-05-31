import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { CreditCard } from 'lucide-react';

const PaymentMethodDialog = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send this to your payment processor
    toast({
      title: "Card Added",
      description: "Your payment method has been added successfully.",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Add Card</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Card Number</Label>
            <Input 
              placeholder="1234 5678 9012 3456"
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Cardholder Name</Label>
            <Input 
              placeholder="John Doe"
              onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Expiry Date</Label>
              <Input 
                placeholder="MM/YY"
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>CVV</Label>
              <Input 
                type="password"
                placeholder="123"
                maxLength={3}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
              />
            </div>
          </div>
          <Button type="submit" className="w-full">Add Card</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentMethodDialog;
