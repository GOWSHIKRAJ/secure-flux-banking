import React, { useState } from 'react';
import { Eye, EyeOff, AlertTriangle, Shield as ShieldIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Toaster } from '@/components/ui/sonner';
import DecryptionControls from '../components/hacker/DecryptionControls';
import EncryptedData from '../components/EncryptedData';
import { sendSecurityAlert } from '../services/NotificationService';

const HackerPortal = () => {
  const [isDecrypted, setIsDecrypted] = useState(false);
  
  const handleToggleDecryption = (decrypted: boolean) => {
    setIsDecrypted(decrypted);
  };
  
  return (
    <div className="min-h-screen bg-banking-page-gradient text-white py-20">
      <Toaster />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-banking-DEFAULT mb-4">
            Hacker Portal <span className="text-sm text-red-500">(DEMO ONLY)</span>
          </h1>
          <p className="text-lg text-banking-muted">
            Simulate decryption attempts and view encrypted data.
          </p>
        </div>
        
        <DecryptionControls 
          isDecrypted={isDecrypted}
          onToggle={handleToggleDecryption}
        />
        
        <div className="mt-12 space-y-6">
          <div className="banking-card">
            <h2 className="banking-card-header">
              <ShieldIcon className="h-5 w-5 text-banking-accent mr-2" />
              Account Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-banking-light rounded-xl">
              <div>
                <p className="text-sm text-banking-muted mb-1">Account Number</p>
                <p className="text-xl font-bold">
                  <EncryptedData 
                    originalValue="**** **** **** 1234"
                    isRevealed={isDecrypted}
                    className="text-banking-DEFAULT"
                  />
                </p>
              </div>
              
              <div>
                <p className="text-sm text-banking-muted mb-1">Balance</p>
                <p className="text-xl font-bold">
                  <EncryptedData 
                    originalValue="$12,000.00"
                    isRevealed={isDecrypted}
                    className="text-banking-DEFAULT"
                  />
                </p>
              </div>
              
              <div>
                <p className="text-sm text-banking-muted mb-1">Account Holder Name</p>
                <p className="text-xl font-bold">
                  <EncryptedData 
                    originalValue="John Doe"
                    isRevealed={isDecrypted}
                    className="text-banking-DEFAULT"
                  />
                </p>
              </div>
              
              <div>
                <p className="text-sm text-banking-muted mb-1">Routing Number</p>
                <p className="text-xl font-bold">
                  <EncryptedData 
                    originalValue="123456789"
                    isRevealed={isDecrypted}
                    className="text-banking-DEFAULT"
                  />
                </p>
              </div>
            </div>
          </div>
          
          <div className="banking-card">
            <h2 className="banking-card-header">
              <ShieldIcon className="h-5 w-5 text-banking-accent mr-2" />
              Recent Transactions
            </h2>
            
            <div className="space-y-3 p-6 bg-banking-light rounded-xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    <EncryptedData 
                      originalValue="Grocery Store"
                      isRevealed={isDecrypted}
                    />
                  </p>
                  <p className="text-sm text-banking-muted">
                    <EncryptedData 
                      originalValue="2023-08-15"
                      isRevealed={isDecrypted}
                    />
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="font-medium text-red-500">
                    <EncryptedData 
                      originalValue="-$85.00"
                      isRevealed={isDecrypted}
                    />
                  </p>
                  <p className="text-sm text-banking-muted">
                    <EncryptedData 
                      originalValue="Shopping"
                      isRevealed={isDecrypted}
                    />
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    <EncryptedData 
                      originalValue="Online Payment"
                      isRevealed={isDecrypted}
                    />
                  </p>
                  <p className="text-sm text-banking-muted">
                    <EncryptedData 
                      originalValue="2023-08-14"
                      isRevealed={isDecrypted}
                    />
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="font-medium text-green-500">
                    <EncryptedData 
                      originalValue="+$2,500.00"
                      isRevealed={isDecrypted}
                    />
                  </p>
                  <p className="text-sm text-banking-muted">
                    <EncryptedData 
                      originalValue="Salary"
                      isRevealed={isDecrypted}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackerPortal;
