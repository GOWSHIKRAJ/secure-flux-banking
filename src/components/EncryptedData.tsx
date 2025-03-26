
import React, { useState, useEffect } from 'react';

interface EncryptedDataProps {
  originalValue: string | number;
  length?: number;
  isRevealed?: boolean;
  className?: string;
}

// Generate realistic looking encrypted data
const generateEncryptedValue = (originalValue: string | number, length?: number): string => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-';
  const stringValue = String(originalValue);
  
  // Get deterministic but random-looking value based on original
  const valueLength = length || Math.max(stringValue.length * 2, 8);
  let result = '';
  
  for (let i = 0; i < valueLength; i++) {
    // Use a "hash" of the original string and position to choose character
    const charIndex = (stringValue.charCodeAt(i % stringValue.length) * (i + 1)) % chars.length;
    result += chars[charIndex];
  }
  
  return result;
};

const EncryptedData: React.FC<EncryptedDataProps> = ({ 
  originalValue, 
  length, 
  isRevealed = false,
  className = ''
}) => {
  const [encryptedValue, setEncryptedValue] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    setEncryptedValue(generateEncryptedValue(originalValue, length));
  }, [originalValue, length]);
  
  const displayValue = isRevealed || isHovering ? originalValue : encryptedValue;
  
  return (
    <span 
      className={`encrypted-text relative font-mono ${className} ${isRevealed || isHovering ? 'text-foreground font-medium' : 'text-banking-muted'}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isHovering && !isRevealed && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded shadow-lg z-10 whitespace-nowrap">
          Decrypted: {originalValue}
        </div>
      )}
      {displayValue}
    </span>
  );
};

export default EncryptedData;
