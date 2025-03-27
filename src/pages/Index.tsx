
import React from 'react';
import BackgroundImage from '@/components/home/BackgroundImage';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import PortalPreviewsSection from '@/components/home/PortalPreviewsSection';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <BackgroundImage 
        imageUrl="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2400" 
        opacity={0.05}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-slate-50/50 -z-5"></div>
      <HeroSection />
      <FeaturesSection />
      <PortalPreviewsSection />
    </div>
  );
};

export default Index;
