
import React, { useState } from 'react';
import { Lock, Key, AlertTriangle, ShieldAlert } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { sendSecurityAlert } from '@/services/NotificationService';

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showEmergencyForm, setShowEmergencyForm] = useState(false);
  const [emergencyKey, setEmergencyKey] = useState('');
  const [error, setError] = useState('');
  
  const maxAttempts = 3;
  const managerPassword = 'admin';
  const emergencyUnlockKey = 'manager13';
  
  const handleUnlockAttempt = () => {
    if (password === managerPassword) {
      sendSecurityAlert({
        message: "System unlocked successfully with manager credentials",
        type: 'security',
      });
      setError('');
      onUnlock();
      return;
    }
    
    // Incorrect password
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    
    if (newAttempts >= maxAttempts) {
      setShowEmergencyForm(true);
      sendSecurityAlert({
        message: `CRITICAL: Maximum unlock attempts (${maxAttempts}) reached. Emergency unlock required.`,
        type: 'security',
      });
    } else {
      setError(`Incorrect password. ${maxAttempts - newAttempts} attempts remaining.`);
      sendSecurityAlert({
        message: `Failed system unlock attempt. ${newAttempts}/${maxAttempts} attempts used.`,
        type: 'security',
      });
    }
    
    setPassword('');
  };
  
  const handleEmergencyUnlock = () => {
    if (emergencyKey === emergencyUnlockKey) {
      sendSecurityAlert({
        message: "System unlocked using EMERGENCY KEY",
        type: 'security',
      });
      setError('');
      onUnlock();
    } else {
      setError('Invalid emergency key');
      sendSecurityAlert({
        message: "Failed emergency unlock attempt with invalid key",
        type: 'security',
      });
      setEmergencyKey('');
    }
  };
  
  return (
    <div className="fixed inset-0 bg-banking-dark bg-opacity-95 flex flex-col items-center justify-center z-50 backdrop-blur-md p-4">
      <div className="relative w-full max-w-md">
        <div className="absolute -top-40 left-1/2 transform -translate-x-1/2">
          <Lock className="h-32 w-32 text-red-500 animate-pulse" />
        </div>
        
        <div className="bg-banking-light rounded-xl p-8 shadow-premium border border-banking-muted mt-20">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-red-500 mb-2">SYSTEM LOCKED</h2>
            <p className="text-banking-muted flex items-center justify-center">
              <AlertTriangle className="h-4 w-4 text-red-500 mr-2" />
              Unauthorized decryption attempt detected
            </p>
          </div>
          
          {!showEmergencyForm ? (
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-banking-DEFAULT mb-1">
                  Manager Credentials Required
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-banking-muted" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter manager password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                <p className="text-xs text-banking-muted mt-2">
                  Note: Use "admin" for manager password in this demo
                </p>
              </div>
              
              <Button 
                onClick={handleUnlockAttempt}
                className="w-full bg-banking-accent hover:bg-banking-accent/90"
              >
                Unlock System
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded p-3 mb-4">
                <p className="text-red-500 text-sm flex items-center">
                  <ShieldAlert className="h-4 w-4 mr-2" />
                  Maximum attempts reached. Emergency unlock required.
                </p>
              </div>
              
              <div>
                <label htmlFor="emergency-key" className="block text-sm font-medium text-banking-DEFAULT mb-1">
                  Emergency Unlock Key
                </label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-banking-muted" />
                  <Input
                    id="emergency-key"
                    type="password"
                    placeholder="Enter emergency key"
                    value={emergencyKey}
                    onChange={(e) => setEmergencyKey(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                <p className="text-xs text-banking-muted mt-2">
                  Note: Use "manager13" as the emergency key in this demo
                </p>
              </div>
              
              <Button 
                onClick={handleEmergencyUnlock}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Emergency Unlock
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 text-center max-w-md">
        <p className="text-white/70 text-sm">
          This system has been locked for security purposes. Only authorized personnel can unlock it.
          All unlock attempts are logged and reported.
        </p>
      </div>
    </div>
  );
};

export default LockScreen;
