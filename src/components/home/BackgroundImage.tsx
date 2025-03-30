
import React from 'react';

interface BackgroundImageProps {
  imageUrl: string;
  opacity?: number;
  overlay?: boolean;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ 
  imageUrl, 
  opacity = 0.15,
  overlay = true
}) => {
  return (
    <div className="fixed inset-0 -z-10">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ 
          backgroundImage: `url('${imageUrl}')`,
          opacity: opacity
        }}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-br from-banking-dark/20 via-banking-dark/10 to-banking-light/10"></div>
      )}
    </div>
  );
};

export default BackgroundImage;
