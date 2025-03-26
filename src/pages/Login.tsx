
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthForm from '../components/auth/AuthForm';
import { Shield } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const role = new URLSearchParams(location.search).get('role') as 'customer' | 'manager' || 'customer';
  
  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center py-12 px-4">
      <div className="mb-8 text-center">
        <div className="flex justify-center">
          <Shield className="h-12 w-12 text-banking-accent" />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-banking-DEFAULT">
          {role === 'manager' ? 'Manager Access' : 'Welcome to SecureFlux'}
        </h1>
        <p className="mt-2 text-banking-muted max-w-md">
          {role === 'manager' 
            ? 'Secure login for bank management personnel'
            : 'The most secure banking platform with homomorphic encryption'}
        </p>
      </div>
      
      <div className="w-full max-w-md glass-card p-8">
        <AuthForm role={role} defaultMode="login" />
      </div>
    </div>
  );
};

export default Login;
