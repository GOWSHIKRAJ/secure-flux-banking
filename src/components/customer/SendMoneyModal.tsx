
import React, { useState } from 'react';
import { X } from 'lucide-react';
import MoneyTransferForm from './MoneyTransferForm';

interface SendMoneyModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountNumber: string;
  onTransferComplete: () => void;
}

const SendMoneyModal: React.FC<SendMoneyModalProps> = ({ 
  isOpen, 
  onClose, 
  accountNumber,
  onTransferComplete
}) => {
  if (!isOpen) return null;

  const handleTransferComplete = () => {
    // Wait a bit before closing to show success state
    setTimeout(() => {
      onTransferComplete();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Send Money</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6">
          <MoneyTransferForm 
            customerAccountNumber={accountNumber} 
            onTransferComplete={handleTransferComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default SendMoneyModal;
