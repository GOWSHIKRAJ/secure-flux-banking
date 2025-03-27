
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
    <div className="fixed inset-0 -z-10">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ 
          backgroundImage: `url('${imageUrl}')`,
          opacity: opacity
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-slate-100/30"></div>
    </div>
  );
};

export default BackgroundImage;
