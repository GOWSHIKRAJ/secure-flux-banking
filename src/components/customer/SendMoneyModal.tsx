
import React, { useState } from 'react';
import { X, Shield } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div 
        className="w-full max-w-md bg-white rounded-lg shadow-xl" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <Shield className="h-5 w-5 text-banking-accent mr-2" />
            <h2 className="text-xl font-semibold">Secure Money Transfer</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close"
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
