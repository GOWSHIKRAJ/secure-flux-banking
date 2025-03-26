
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Lock, User, Eye, EyeOff } from 'lucide-react';

type AuthMode = 'login' | 'register';
type UserRole = 'customer' | 'manager';

interface AuthFormProps {
  role: UserRole;
  defaultMode?: AuthMode;
}

const AuthForm: React.FC<AuthFormProps> = ({ role, defaultMode = 'login' }) => {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, this would connect to a backend
    // Here we'll simulate authentication with localStorage
    setTimeout(() => {
      if (mode === 'login') {
        // Demo login logic (simplified)
        if (role === 'manager' && email === 'manager@secureflux.com' && password === 'secure123') {
          // Manager login success
          localStorage.setItem('auth', JSON.stringify({ role: 'manager', email, name: 'Bank Manager' }));
          toast.success("Welcome back, Bank Manager");
          navigate('/manager');
        } else if (role === 'customer') {
          // Demo customer login - accept any credentials for demo
          localStorage.setItem('auth', JSON.stringify({ role: 'customer', email, name: email.split('@')[0] }));
          toast.success("Login successful");
          navigate('/customer');
        } else {
          toast.error("Invalid credentials");
        }
      } else {
        // Register - only for customers in this demo
        if (role === 'customer') {
          localStorage.setItem('auth', JSON.stringify({ role: 'customer', email, name: name || email.split('@')[0] }));
          toast.success("Account created successfully");
          navigate('/customer');
        }
      }
      setIsSubmitting(false);
    }, 1000);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-banking-DEFAULT">
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </h2>
        <p className="text-banking-muted mt-2">
          {role === 'customer' 
            ? 'Access your secure banking portal'
            : 'Manager authentication required'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'register' && (
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-banking-DEFAULT">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-banking-muted" />
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="pl-10"
                required
              />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-banking-DEFAULT">
            Email
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-banking-muted" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={role === 'manager' ? 'manager@secureflux.com' : 'your@email.com'}
              className="pl-10"
              required
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-banking-DEFAULT">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-banking-muted" />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={role === 'manager' ? 'secure123 (for demo)' : '••••••••'}
              className="pl-10 pr-10"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-banking-muted" />
              ) : (
                <Eye className="h-4 w-4 text-banking-muted" />
              )}
            </button>
          </div>
        </div>
        
        <Button
          type="submit"
          className="w-full bg-banking-accent hover:bg-banking-accent/90 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting 
            ? 'Processing...' 
            : mode === 'login' 
              ? 'Sign In' 
              : 'Create Account'}
        </Button>
        
        {role === 'customer' && (
          <div className="text-center mt-4">
            <p className="text-sm text-banking-muted">
              {mode === 'login' 
                ? "Don't have an account? " 
                : "Already have an account? "}
              <button
                type="button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                className="text-banking-accent hover:underline font-medium"
              >
                {mode === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
