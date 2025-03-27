
import React from 'react';

interface BackgroundImageProps {
  imageUrl: string;
  opacity?: number;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ 
  imageUrl, 
  opacity = 0.1 
}) => {
  return (
    <div 
      className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed -z-10"
      style={{ 
        backgroundImage: `url('${imageUrl}')`,
        opacity: opacity
      }}
    />
  );
};

export default BackgroundImage;
