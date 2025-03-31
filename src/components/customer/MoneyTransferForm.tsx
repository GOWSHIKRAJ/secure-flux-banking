
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { DatabaseService } from '@/services/DatabaseService';
import { CheckCircle2, AlertCircle } from 'lucide-react';
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
  const [recipientName, setRecipientName] = useState<string | null>(null);
  const [accountError, setAccountError] = useState<string | null>(null);
  const { user } = useAuth();

  const handleAccountBlur = async () => {
    if (!toAccountNumber || toAccountNumber === customerAccountNumber) {
      setRecipientName(null);
      setAccountError(toAccountNumber === customerAccountNumber ? 
        "You cannot transfer money to your own account" : null);
      return;
    }
    
    try {
      const recipient = await DatabaseService.getCustomerByAccountNumber(toAccountNumber);
      if (recipient) {
        setRecipientName(recipient.name);
        setAccountError(null);
      } else {
        setRecipientName(null);
        setAccountError("Account number not found");
      }
    } catch (error) {
      console.error("Error checking account:", error);
      setRecipientName(null);
      setAccountError("Error verifying account");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!toAccountNumber || !amount || !description) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (toAccountNumber === customerAccountNumber) {
      toast.error("You cannot transfer money to your own account");
      return;
    }
    
    if (!recipientName) {
      toast.error("Please enter a valid recipient account number");
      return;
    }
    
    if (parseFloat(amount) <= 0) {
      toast.error("Amount must be greater than 0");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const transferAmount = parseFloat(amount);
      
      // If amount is large, send security alert
      if (transferAmount >= 1000) {
        sendSecurityAlert({
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
      
      toast.success("Transfer completed successfully", {
        description: `$${transferAmount.toFixed(2)} has been sent to ${recipientName}`,
        icon: <CheckCircle2 className="h-4 w-4 text-green-500" />
      });
      
      // Reset form
      setToAccountNumber('');
      setAmount('');
      setDescription('');
      setRecipientName(null);
      
      // Notify parent component to refresh data
      onTransferComplete();
    } catch (error: any) {
      console.error("Transfer error:", error);
      
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

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="toAccount" className="block text-sm font-medium text-banking-DEFAULT mb-1">
          Recipient Account Number
        </label>
        <Input
          id="toAccount"
          value={toAccountNumber}
          onChange={(e) => setToAccountNumber(e.target.value)}
          onBlur={handleAccountBlur}
          placeholder="Enter account number"
          className="w-full"
          required
        />
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
        {isLoading ? "Processing..." : "Send Money"}
      </Button>
    </form>
  );
};

export default MoneyTransferForm;
