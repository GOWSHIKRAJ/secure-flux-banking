
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { Shield } from 'lucide-react';
import BackgroundImage from '@/components/home/BackgroundImage';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = new URLSearchParams(location.search).get('role') as 'customer' | 'manager' || 'customer';
  
  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center py-12 px-4 relative">
      {/* Background Image */}
      <BackgroundImage 
        imageUrl={role === 'manager' 
          ? "https://images.unsplash.com/photo-1622126807280-9b5b32b28e77?q=80&w=2400" 
          : "https://images.unsplash.com/photo-1607944024060-0450380ddd33?q=80&w=2400"
        }
        opacity={0.05}
      />
      
      <div className="mb-8 text-center">
        <div className="flex justify-center">
          <Shield className="h-12 w-12 text-banking-accent" />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-banking-DEFAULT">
          {role === 'manager' ? 'Manager Access' : 'Welcome Back'}
        </h1>
        <p className="mt-2 text-banking-muted max-w-md">
          {role === 'manager' 
            ? 'Secure login for bank management personnel. Use "manager" and "admin" credentials.'
            : 'Access your secure banking dashboard with state-of-the-art encryption'}
        </p>
      </div>
      
      <div className="w-full max-w-md glass-card p-8 backdrop-blur-md">
        <AuthForm role={role} defaultMode="login" />
      </div>
    </div>
  );
};

export default Login;
