import React from 'react';
import CabTypeSelector from '@/components/CabTypeSelector';
import PaymentMethodSelector from '@/components/PaymentMethodSelector';

const BookingStepOptions = ({
  cabType, setCabType,
  paymentMethod, setPaymentMethod,
  estimatedPrice,
}) => {
  return (
    <div className="space-y-6">
      <CabTypeSelector 
        selectedType={cabType} 
        onSelect={setCabType}
        estimatedPrice={estimatedPrice}
      />
      <PaymentMethodSelector 
        selectedMethod={paymentMethod} 
        onSelect={setPaymentMethod} 
      />
    </div>
  );
};

export default BookingStepOptions;