
import React from 'react';

interface BackgroundImageProps {
  imageUrl: string;
  opacity?: number;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ 
  imageUrl, 
  opacity = 10 
}) => {
  return (
    <div 
      className={`absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-${opacity} -z-10`}
      style={{ backgroundImage: `url('${imageUrl}')` }}
    />
  );
};

export default BackgroundImage;
