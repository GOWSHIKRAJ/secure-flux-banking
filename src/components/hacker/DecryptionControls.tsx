
import React, { useState } from 'react';
import { Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sendSecurityAlert } from '../../services/NotificationService';

interface DecryptionControlsProps {
  isDecrypted: boolean;
  onToggle: (state: boolean) => void;
}

const DecryptionControls: React.FC<DecryptionControlsProps> = ({ 
  isDecrypted, 
  onToggle 
}) => {
  const [isHacking, setIsHacking] = useState(false);
  
  const handleToggle = () => {
    onToggle(!isDecrypted);
  };
  
  const handleForcedDecryption = async () => {
    setIsHacking(true);
    
    // Simulate a hacking attempt with failure
    setTimeout(async () => {
      // Send security alert
      await sendSecurityAlert({
        message: "CRITICAL ALERT! Brute force decryption attempt detected.",
        type: 'security'
      });
      
      setIsHacking(false);
    }, 2000);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <button
          onClick={handleToggle}
          className={`
            flex items-center space-x-3 px-5 py-3 rounded-full 
            transition-all duration-300 border
            ${isDecrypted 
              ? 'bg-banking-danger/10 border-banking-danger/20 text-banking-danger' 
              : 'bg-banking-success/10 border-banking-success/20 text-banking-success'
            }
          `}
        >
          {isDecrypted ? (
            <>
              <EyeOff className="h-5 w-5 mr-2" />
              <span>Showing Decrypted Data (Insecure)</span>
            </>
          ) : (
            <>
              <Eye className="h-5 w-5 mr-2" />
              <span>Showing Encrypted Data (Secure)</span>
            </>
          )}
        </button>
        
        <Button
          variant="destructive"
          className="flex items-center"
          disabled={isHacking}
          onClick={handleForcedDecryption}
        >
          {isHacking ? (
            <span className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 animate-pulse" />
              Breaking Encryption...
            </span>
          ) : (
            <span className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Force Decryption (Brute Force)
            </span>
          )}
        </Button>
      </div>
      
      {isDecrypted && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-600">
          <p className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Warning: You are viewing decrypted data. This is only possible in this demo.
          </p>
          <p className="text-xs mt-1">In a real FHE-protected system, decryption would be impossible without the private keys.</p>
        </div>
      )}
    </div>
  );
};

export default DecryptionControls;
