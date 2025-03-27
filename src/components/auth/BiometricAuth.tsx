
import React, { useState } from 'react';
import { Fingerprint, Camera, AlertTriangle, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface BiometricAuthProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const BiometricAuth: React.FC<BiometricAuthProps> = ({ onSuccess, onCancel }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanType, setScanType] = useState<'face' | 'fingerprint' | null>(null);
  
  const handleScan = (type: 'face' | 'fingerprint') => {
    setScanType(type);
    setIsScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      
      // For demo purposes, always succeed
      toast.success(`${type === 'face' ? 'Facial' : 'Fingerprint'} authentication successful`);
      onSuccess();
    }, 2500);
  };
  
  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold mb-2">Biometric Authentication</h3>
        <p className="text-banking-muted">Enhance security with biometric verification</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-banking-light rounded-lg p-4 text-center">
          <Button
            variant="outline"
            size="lg"
            className="w-full h-32 flex flex-col items-center justify-center"
            onClick={() => handleScan('face')}
            disabled={isScanning}
          >
            {isScanning && scanType === 'face' ? (
              <>
                <Loader2 className="h-10 w-10 mb-2 animate-spin text-banking-accent" />
                <span>Scanning face...</span>
              </>
            ) : (
              <>
                <Camera className="h-10 w-10 mb-2 text-banking-accent" />
                <span>Facial Recognition</span>
              </>
            )}
          </Button>
        </div>
        
        <div className="bg-banking-light rounded-lg p-4 text-center">
          <Button
            variant="outline"
            size="lg"
            className="w-full h-32 flex flex-col items-center justify-center"
            onClick={() => handleScan('fingerprint')}
            disabled={isScanning}
          >
            {isScanning && scanType === 'fingerprint' ? (
              <>
                <Loader2 className="h-10 w-10 mb-2 animate-spin text-banking-accent" />
                <span>Scanning fingerprint...</span>
              </>
            ) : (
              <>
                <Fingerprint className="h-10 w-10 mb-2 text-banking-accent" />
                <span>Fingerprint Scan</span>
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="bg-banking-light/50 p-3 rounded-lg text-sm text-banking-muted border border-banking-light">
        <div className="flex items-start">
          <AlertTriangle className="h-4 w-4 text-banking-muted mr-2 mt-0.5" />
          <p>This is a demonstration. In a real application, this would connect to your device's biometric sensors.</p>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default BiometricAuth;
