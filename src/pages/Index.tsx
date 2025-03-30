
import React from 'react';
import BackgroundImage from '@/components/home/BackgroundImage';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import PortalPreviewsSection from '@/components/home/PortalPreviewsSection';
import SecuritySection from '@/components/home/SecuritySection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <BackgroundImage 
        imageUrl="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2400" 
        opacity={0.08}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 to-blue-50/60 -z-5"></div>
      <HeroSection />
      <FeaturesSection />
      <SecuritySection />
      <PortalPreviewsSection />
      <TestimonialsSection />
    </div>
  );
};

export default Index;
