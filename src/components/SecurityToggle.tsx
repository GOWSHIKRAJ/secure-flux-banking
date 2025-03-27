
import React, { useState } from 'react';
import { Lock, Unlock, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { sendSecurityAlert } from '../services/NotificationService';

interface SecurityToggleProps {
  phoneNumber?: string;
}

const SecurityToggle: React.FC<SecurityToggleProps> = ({ phoneNumber }) => {
  const [isSecure, setIsSecure] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const handleToggle = async () => {
    if (isSecure) {
      setIsAnimating(true);
      
      // Security cannot actually be turned off
      setTimeout(async () => {
        toast.error("ALERT! Unauthorized encryption tampering detected!", {
          description: "System locked. Admin verification required.",
          duration: 6000,
        });
        
        // Send security alert via SMS
        await sendSecurityAlert({
          message: "ALERT! Unauthorized attempt to disable encryption detected.",
          type: 'security',
          phoneNumber: phoneNumber || '+916379461979'
        });
        
        setIsAnimating(false);
      }, 1000);
    } else {
      setIsSecure(true);
      toast.success("FHE Protection: ACTIVE", {
        description: "Your data is fully encrypted and secure.",
      });
    }
  };
  
  return (
    <button
      onClick={handleToggle}
      className={`
        flex items-center space-x-1 px-3 py-1.5 rounded-full 
        text-sm font-medium transition-all duration-300
        ${isSecure 
          ? 'bg-banking-success/10 text-banking-success border border-banking-success/20'
          : 'bg-banking-danger/10 text-banking-danger border border-banking-danger/20'
        }
        ${isAnimating ? 'animate-pulse' : ''}
      `}
    >
      {isSecure 
        ? <Lock className="h-3.5 w-3.5 mr-1.5" /> 
        : <Unlock className="h-3.5 w-3.5 mr-1.5" />
      }
      <span>
        {isSecure ? 'FHE Protection: ACTIVE' : 'PROTECTION DISABLED'}
      </span>
    </button>
  );
};

export default SecurityToggle;
