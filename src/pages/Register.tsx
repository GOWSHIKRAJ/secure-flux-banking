
import React from 'react';
import AuthForm from '../components/auth/AuthForm';
import { Shield } from 'lucide-react';

const Register = () => {
  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center py-12 px-4 relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-5 -z-10"
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2400')" }}>
      </div>
      
      <div className="mb-8 text-center">
        <div className="flex justify-center">
          <Shield className="h-12 w-12 text-banking-accent" />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-banking-DEFAULT">Create Your Secure Account</h1>
        <p className="mt-2 text-banking-muted max-w-md">
          Join SecureFlux and experience the future of secure banking
        </p>
      </div>
      
      <div className="w-full max-w-md glass-card p-8 backdrop-blur-md">
        <AuthForm role="customer" defaultMode="register" />
      </div>
    </div>
  );
};

export default Register;
