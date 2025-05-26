
import React from 'react';
import { motion } from 'framer-motion';
import { Check, CreditCard, DollarSign, Smartphone } from 'lucide-react';

const paymentMethods = [
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: <CreditCard className="h-5 w-5" />,
    description: 'Pay with your saved card',
  },
  {
    id: 'cash',
    name: 'Cash',
    icon: <DollarSign className="h-5 w-5" />,
    description: 'Pay with cash after your ride',
  },
  {
    id: 'wallet',
    name: 'Digital Wallet',
    icon: <Smartphone className="h-5 w-5" />,
    description: 'Pay with your digital wallet',
  },
];

const PaymentMethodSelector = ({ selectedMethod, onSelect }) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Payment Method</h3>
      <div className="grid grid-cols-1 gap-3">
        {paymentMethods.map((method) => {
          const isSelected = selectedMethod === method.id;
          
          return (
            <motion.div
              key={method.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(method.id)}
              className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all ${
                isSelected 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200 hover:border-blue-200'
              }`}
            >
              <div className="flex items-center">
                <div className="mr-3 text-gray-600">{method.icon}</div>
                <div className="flex-grow">
                  <h4 className="font-medium">{method.name}</h4>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
                {isSelected && (
                  <div className="absolute top-2 right-2 h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
