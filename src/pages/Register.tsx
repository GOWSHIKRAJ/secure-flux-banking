
import React from 'react';
import AuthForm from '../components/auth/AuthForm';
import { Shield } from 'lucide-react';
import BackgroundImage from '@/components/home/BackgroundImage';

const Register = () => {
  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center py-12 px-4 relative">
      {/* Background Image - using elegant financial district image */}
      <BackgroundImage 
        imageUrl="https://images.unsplash.com/photo-1579621970590-9d624316904b?q=80&w=2400"
        opacity={0.1}
      />
      
      <div className="mb-8 text-center">
        <div className="flex justify-center">
          <Shield className="h-12 w-12 text-banking-accent" />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-banking-DEFAULT">Create Your Secure Account</h1>
        <p className="mt-2 text-banking-muted max-w-md">
          Join our exclusive banking platform and experience financial security like never before
        </p>
      </div>
      
      <div className="w-full max-w-md glass-card p-8 backdrop-blur-md shadow-xl rounded-lg border border-white/10">
        <AuthForm role="customer" defaultMode="register" />
      </div>
    </div>
  );
};

export default Register;
