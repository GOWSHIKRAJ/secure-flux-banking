
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Lock, User, Eye, EyeOff, Fingerprint } from 'lucide-react';
import BiometricAuth from './BiometricAuth';
import { sendSecurityAlert } from '../../services/NotificationService';
import useAuth from '../../hooks/useAuth';

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
  const [phoneNumber, setPhoneNumber] = useState('+916379461979');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBiometric, setShowBiometric] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would connect to a backend
      // Here we'll simulate authentication with localStorage
      setTimeout(() => {
        if (mode === 'login') {
          // Manager login with specific credentials
          if (role === 'manager' && email === 'manager@gmail.com' && password === 'admin') {
            // Manager login success
            login({ role: 'manager', email, name: 'Bank Manager' });
            toast.success("Welcome back, Bank Manager");
            navigate('/manager');
          } else if (role === 'customer') {
            // Demo customer login with specific validation
            const customers = JSON.parse(localStorage.getItem('customers') || '[]');
            const customer = customers.find((c: any) => c.email === email && c.password === password);
            
            if (customer) {
              login({ role: 'customer', email, name: customer.name });
              toast.success(`Welcome back, ${customer.name}`);
              navigate('/customer');
            } else {
              toast.error("Invalid credentials");
              sendSecurityAlert({
                message: `Failed login attempt for customer account: ${email}`,
                type: 'security',
                phoneNumber: '+916379461979'
              });
            }
          } else {
            toast.error("Invalid credentials");
            
            if (role === 'manager') {
              // Send security alert for failed manager login
              sendSecurityAlert({
                message: `Failed login attempt to Manager Portal using email: ${email}`,
                type: 'login',
                phoneNumber: '+916379461979'
              });
            }
          }
        } else {
          // Register - store in localStorage
          if (role === 'customer') {
            const customers = JSON.parse(localStorage.getItem('customers') || '[]');
            
            // Check if email already exists
            if (customers.some((c: any) => c.email === email)) {
              toast.error("Account with this email already exists");
              setIsSubmitting(false);
              return;
            }
            
            // Add new customer
            const newCustomer = {
              id: Date.now().toString(),
              name,
              email,
              password,
              phoneNumber: phoneNumber || '+916379461979',
              balance: Math.floor(Math.random() * 10000) + 1000,
              accountNumber: `${Math.floor(Math.random() * 10000000000)}`,
              transactions: []
            };
            
            customers.push(newCustomer);
            localStorage.setItem('customers', JSON.stringify(customers));
            
            login({ role: 'customer', email, name });
            toast.success("Account created successfully");
            navigate('/customer');
          }
        }
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      toast.error("Authentication failed");
      
      // Send security alert
      sendSecurityAlert({
        message: "Authentication system error detected",
        type: 'security',
        phoneNumber: '+916379461979'
      });
      
      setIsSubmitting(false);
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  const handleBiometricSuccess = () => {
    // For demo, just log in as manager
    login({ role: 'manager', email: 'manager@gmail.com', name: 'Bank Manager' });
    toast.success("Biometric authentication successful");
    navigate('/manager');
  };
  
  if (showBiometric) {
    return (
      <BiometricAuth 
        onSuccess={handleBiometricSuccess} 
        onCancel={() => setShowBiometric(false)} 
      />
    );
  }
  
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
              placeholder={role === 'manager' ? 'manager@gmail.com' : 'your@email.com'}
              className="pl-10"
              required
            />
          </div>
          {role === 'manager' && (
            <p className="text-xs text-banking-muted mt-1">
              Use "manager@gmail.com" as email and "admin" as password for manager access
            </p>
          )}
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
              placeholder={role === 'manager' ? 'admin' : '••••••••'}
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
        
        {/* Phone number field for alerts */}
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-banking-DEFAULT">
            Phone Number (for security alerts)
          </label>
          <Input
            id="phone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+916379461979"
            className="pl-3"
          />
          <p className="text-xs text-banking-muted">
            We'll send security alerts to this number via WhatsApp
          </p>
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
        
        {role === 'manager' && (
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center mt-2"
            onClick={() => setShowBiometric(true)}
          >
            <Fingerprint className="h-4 w-4 mr-2" />
            <span>Use Biometric Authentication</span>
          </Button>
        )}
        
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
      </form>
    </div>
  );
};

export default AuthForm;
