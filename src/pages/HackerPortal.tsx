
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
    
    // If someone tries to decrypt data, send an alert
    if (decrypted) {
      sendSecurityAlert({
        message: "ALERT: Attempt to decrypt sensitive data detected in hacker portal",
        type: 'security',
        phoneNumber: '+916379461979'
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-banking-page-gradient text-white py-20">
      <Toaster />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-banking-DEFAULT mb-4">
            Security Testing Portal <span className="text-sm text-red-500">(DEMO ONLY)</span>
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
              Customer Database (Encrypted)
            </h2>
            
            <div className="space-y-3 p-6 bg-banking-light rounded-xl">
              <div className="overflow-x-auto">
                <table className="w-full min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-banking-muted">ID</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-banking-muted">Name</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-banking-muted">Email</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-banking-muted">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <tr key={index} className="hover:bg-banking-light/70">
                        <td className="px-4 py-3 text-sm">
                          <EncryptedData originalValue={`CUST${1000 + index}`} isRevealed={false} />
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <EncryptedData 
                            originalValue={[
                              "John Smith", 
                              "Emma Johnson", 
                              "Michael Brown", 
                              "Sarah Davis", 
                              "Robert Wilson"
                            ][index]} 
                            isRevealed={false} 
                          />
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <EncryptedData 
                            originalValue={[
                              "john.smith@example.com",
                              "emma.j@example.com",
                              "mbrown@example.com",
                              "sarah.d@example.com",
                              "robert.w@example.com"
                            ][index]} 
                            isRevealed={false} 
                          />
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <EncryptedData 
                            originalValue={[
                              "$24,500.00",
                              "$18,275.50",
                              "$32,100.25",
                              "$9,450.75",
                              "$15,890.00"
                            ][index]} 
                            isRevealed={false} 
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
                <p className="flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Security Notice: All attempts to access encrypted data are logged and monitored.
                </p>
                <p className="text-xs mt-1">
                  Any unauthorized attempt to decrypt this data will trigger security alerts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackerPortal;
