
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Shield, ShieldAlert, Eye, EyeOff, Lock } from 'lucide-react';
import { sendSecurityAlert } from '@/services/NotificationService';

interface DecryptionControlsProps {
  isDecrypted: boolean;
  onToggle: (decrypted: boolean) => void;
}

const DecryptionControls: React.FC<DecryptionControlsProps> = ({ isDecrypted, onToggle }) => {
  const [isDecrypting, setIsDecrypting] = useState(false);
  
  const handleDecryptToggle = () => {
    setIsDecrypting(true);
    
    // Simulate a decryption attempt with a delay
    setTimeout(() => {
      onToggle(!isDecrypted);
      setIsDecrypting(false);
      
      if (!isDecrypted) {
        // Log attempted decryption
        sendSecurityAlert({
          message: "Security breach attempted: Decryption of sensitive data",
          type: 'security'
        });
      }
    }, 1500);
  };
  
  return (
    <div className="banking-card">
      <h2 className="banking-card-header flex items-center">
        <ShieldAlert className="h-5 w-5 text-red-500 mr-2" />
        <span>Security Testing Controls</span>
      </h2>
      
      <div className="p-6 bg-banking-light rounded-xl">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col space-y-3">
            <h3 className="text-lg font-medium text-banking-DEFAULT">Data Decryption Simulator</h3>
            <p className="text-sm text-banking-muted">
              This simulator demonstrates what happens when someone attempts to decrypt sensitive financial data.
              In a real system, multiple security measures would prevent this action.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-banking-muted/30 rounded-lg p-4 bg-banking-light/50">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <Lock className="h-5 w-5 text-banking-muted mr-2" />
                  <h4 className="font-medium text-banking-DEFAULT">Attempt Decryption</h4>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleDecryptToggle}
                  disabled={isDecrypting}
                  className="bg-red-600 hover:bg-red-700"
                >
                  {isDecrypting ? (
                    <>
                      <span className="animate-pulse">Decrypting...</span>
                    </>
                  ) : isDecrypted ? (
                    <>
                      <EyeOff className="h-4 w-4 mr-2" />
                      Hide Data
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Decrypt Data
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-banking-muted">
                Attempting to decrypt sensitive data will trigger security alerts and may lock the system.
              </p>
            </div>
            
            <div className="border border-banking-muted/30 rounded-lg p-4 bg-banking-light/50">
              <div className="flex items-center mb-2">
                <Shield className="h-5 w-5 text-banking-accent mr-2" />
                <h4 className="font-medium text-banking-DEFAULT">Security Status</h4>
              </div>
              
              <div className="flex items-center justify-between mt-3">
                <span className="text-sm text-banking-muted">Current Status:</span>
                <div className="flex items-center">
                  {isDecrypted ? (
                    <span className="text-red-500 font-medium flex items-center">
                      <ShieldAlert className="h-4 w-4 mr-1" />
                      Compromised
                    </span>
                  ) : (
                    <span className="text-green-500 font-medium flex items-center">
                      <Shield className="h-4 w-4 mr-1" />
                      Secure
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecryptionControls;
