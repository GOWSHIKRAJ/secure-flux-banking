
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DatabaseService } from '@/services/DatabaseService';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { sendSecurityAlert } from '@/services/NotificationService';
import useAuth from '@/hooks/useAuth';

interface MoneyTransferFormProps {
  customerAccountNumber: string;
  onTransferComplete: () => void;
}

const MoneyTransferForm: React.FC<MoneyTransferFormProps> = ({ 
  customerAccountNumber,
  onTransferComplete
}) => {
  const [toAccountNumber, setToAccountNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [verifyingAccount, setVerifyingAccount] = useState(false);
  const [recipientName, setRecipientName] = useState<string | null>(null);
  const [accountError, setAccountError] = useState<string | null>(null);
  const [transferStep, setTransferStep] = useState<'details' | 'confirm' | 'processing' | 'success'>('details');
  const { user } = useAuth();

  const handleAccountBlur = async () => {
    if (!toAccountNumber) {
      setRecipientName(null);
      setAccountError(null);
      return;
    }
    
    if (toAccountNumber === customerAccountNumber) {
      setRecipientName(null);
      setAccountError("You cannot transfer money to your own account");
      return;
    }
    
    try {
      setVerifyingAccount(true);
      const recipient = await DatabaseService.getCustomerByAccountNumber(toAccountNumber);
      if (recipient) {
        setRecipientName(recipient.name);
        setAccountError(null);
        
        // Show toast that account was found
        toast.success("Account verified", {
          description: `Found account belonging to ${recipient.name}`,
          icon: <CheckCircle2 className="h-4 w-4 text-green-500" />
        });
      } else {
        setRecipientName(null);
        setAccountError("Account number not found");
        
        // Show toast that account was not found
        toast.error("Account verification failed", {
          description: "The account number you entered could not be found",
          icon: <AlertCircle className="h-4 w-4 text-red-500" />
        });
      }
    } catch (error) {
      console.error("Error checking account:", error);
      setRecipientName(null);
      setAccountError("Error verifying account");
      
      toast.error("Verification error", {
        description: "There was an error verifying the account",
        icon: <AlertCircle className="h-4 w-4 text-red-500" />
      });
    } finally {
      setVerifyingAccount(false);
    }
  };
  
  const validateForm = () => {
    if (!toAccountNumber || !amount || !description) {
      toast.error("Missing information", {
        description: "Please fill in all fields"
      });
      return false;
    }
    
    if (toAccountNumber === customerAccountNumber) {
      toast.error("Invalid recipient", {
        description: "You cannot transfer money to your own account"
      });
      return false;
    }
    
    if (!recipientName) {
      toast.error("Invalid recipient", {
        description: "Please enter a valid recipient account number"
      });
      return false;
    }
    
    if (parseFloat(amount) <= 0) {
      toast.error("Invalid amount", {
        description: "Amount must be greater than 0"
      });
      return false;
    }
    
    return true;
  };
  
  const handleProceedToConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setTransferStep('confirm');
    }
  };
  
  const handleBackToDetails = () => {
    setTransferStep('details');
  };

  const handleSubmitTransfer = async () => {
    if (!validateForm()) return;
    
    setTransferStep('processing');
    setIsLoading(true);
    
    try {
      const transferAmount = parseFloat(amount);
      
      // If amount is large, send security alert
      if (transferAmount >= 1000) {
        await sendSecurityAlert({
          message: `Large transfer of $${transferAmount.toFixed(2)} to account ${toAccountNumber}`,
          type: 'transaction',
          phoneNumber: '+916379461979'
        });
      }
      
      await DatabaseService.transferMoney(
        customerAccountNumber,
        toAccountNumber,
        transferAmount,
        description
      );
      
      setTransferStep('success');
      
      toast.success("Transfer completed successfully", {
        description: `$${transferAmount.toFixed(2)} has been sent to ${recipientName}`,
        icon: <CheckCircle2 className="h-4 w-4 text-green-500" />
      });
      
      // Reset form after short delay
      setTimeout(() => {
        setToAccountNumber('');
        setAmount('');
        setDescription('');
        setRecipientName(null);
        setTransferStep('details');
        
        // Notify parent component to refresh data
        onTransferComplete();
      }, 3000);
      
    } catch (error: any) {
      console.error("Transfer error:", error);
      setTransferStep('details');
      
      toast.error("Transfer failed", {
        description: error.message || "An error occurred during the transfer",
        icon: <AlertCircle className="h-4 w-4 text-red-500" />
      });
      
      // Log security alert for failed transfer
      sendSecurityAlert({
        message: `Failed transfer attempt of $${parseFloat(amount).toFixed(2)} to account ${toAccountNumber}`,
        type: 'security',
        phoneNumber: '+916379461979'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Render different content based on current step
  if (transferStep === 'processing') {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <Loader2 className="h-12 w-12 text-banking-accent animate-spin mb-4" />
        <h3 className="text-xl font-semibold mb-2">Processing Your Transfer</h3>
        <p className="text-banking-muted text-center">
          Your funds are being transferred securely using fully homomorphic encryption.
          <br />This ensures your data remains encrypted throughout the entire process.
        </p>
      </div>
    );
  }
  
  if (transferStep === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Transfer Successful!</h3>
        <p className="text-banking-success font-medium text-lg mb-1">
          ${parseFloat(amount).toFixed(2)}
        </p>
        <p className="text-banking-muted mb-4">has been sent to {recipientName}</p>
        <p className="text-sm text-banking-muted text-center mb-6">
          Your transfer was processed securely using homomorphic encryption technology,
          keeping your financial data protected at all times.
        </p>
        <Button 
          className="w-full bg-banking-accent hover:bg-banking-accent/90"
          onClick={() => {
            setTransferStep('details');
            setToAccountNumber('');
            setAmount('');
            setDescription('');
            setRecipientName(null);
          }}
        >
          Make Another Transfer
        </Button>
      </div>
    );
  }
  
  if (transferStep === 'confirm') {
    return (
      <div className="space-y-6">
        <div className="border-b pb-4">
          <h3 className="text-lg font-semibold mb-2">Confirm Your Transfer</h3>
          <p className="text-banking-muted text-sm">
            Please review the details below before confirming your transfer.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-banking-muted">Amount</span>
              <span className="font-semibold">${parseFloat(amount).toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-banking-muted">To</span>
              <span className="font-medium">{recipientName}</span>
            </div>
            
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-banking-muted">Account</span>
              <span className="font-mono text-sm">{toAccountNumber}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm text-banking-muted">Description</span>
              <span className="text-sm">{description}</span>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={handleBackToDetails}
            >
              Back
            </Button>
            <Button 
              className="flex-1 bg-banking-accent hover:bg-banking-accent/90"
              onClick={handleSubmitTransfer}
              disabled={isLoading}
            >
              Confirm Transfer
            </Button>
          </div>
          
          <p className="text-xs text-banking-muted text-center mt-4">
            Your transfer will be processed using homomorphic encryption, ensuring your financial data
            remains encrypted even during processing.
          </p>
        </div>
      </div>
    );
  }
  
  // Default: Details step
  return (
    <form onSubmit={handleProceedToConfirm} className="space-y-4">
      <div>
        <label htmlFor="toAccount" className="block text-sm font-medium text-banking-DEFAULT mb-1">
          Recipient Account Number
        </label>
        <div className="relative">
          <Input
            id="toAccount"
            value={toAccountNumber}
            onChange={(e) => setToAccountNumber(e.target.value)}
            onBlur={handleAccountBlur}
            placeholder="Enter account number"
            className="w-full"
            required
          />
          {verifyingAccount && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 className="h-4 w-4 text-banking-muted animate-spin" />
            </div>
          )}
        </div>
        {recipientName && (
          <p className="mt-1 text-sm text-banking-success">Recipient: {recipientName}</p>
        )}
        {accountError && (
          <p className="mt-1 text-sm text-red-500">{accountError}</p>
        )}
      </div>
      
      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-banking-DEFAULT mb-1">
          Amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-banking-muted">$</span>
          <Input
            id="amount"
            type="number"
            min="0.01"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="pl-8"
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-banking-DEFAULT mb-1">
          Description
        </label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What's this payment for?"
          className="w-full"
          required
        />
      </div>
      
      <Button
        type="submit"
        className="w-full bg-banking-accent hover:bg-banking-accent/90"
        disabled={isLoading || !recipientName || !!accountError}
      >
        {isLoading ? "Processing..." : "Continue"}
      </Button>
      
      <div className="text-xs text-banking-muted text-center border-t pt-4 mt-4">
        <p>
          <span className="font-semibold">Security Notice:</span> This transfer is protected by Homomorphic Encryption,
          which means your data remains encrypted even during processing.
        </p>
      </div>
    </form>
  );
};

export default MoneyTransferForm;
