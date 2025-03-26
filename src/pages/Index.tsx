
import React from 'react';
import BackgroundImage from '@/components/home/BackgroundImage';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import PortalPreviewsSection from '@/components/home/PortalPreviewsSection';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <BackgroundImage imageUrl="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2400" />
      <HeroSection />
      <FeaturesSection />
      <PortalPreviewsSection />
    </div>
  );
};

export default Index;
