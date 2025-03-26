
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Lock, CreditCard, UserPlus } from 'lucide-react';
import EncryptedData from '../EncryptedData';
import useAuth from '@/hooks/useAuth';

const HeroSection = () => {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-banking-light to-blue-50 opacity-80 -z-10"></div>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-slide-right">
            <div className="inline-flex items-center space-x-2 bg-banking-accent/10 text-banking-accent px-3 py-1 rounded-full text-sm font-medium">
              <Lock className="h-3.5 w-3.5" />
              <span>Next-Generation Banking Security</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-banking-DEFAULT">
              Banking with<br />
              <span className="text-banking-accent">Unbreakable</span><br />
              Encryption
            </h1>
            
            <p className="text-lg text-banking-muted max-w-lg">
              Experience the future of secure banking with homomorphic encryption that keeps your data encrypted even during processing.
            </p>
            
            <div className="flex flex-wrap gap-4">
              {isAuthenticated && user?.role === 'customer' ? (
                <Link 
                  to="/customer" 
                  className="inline-flex items-center space-x-2 bg-banking-DEFAULT text-white px-5 py-2.5 rounded-md font-medium transition-all hover:bg-banking-DEFAULT/90"
                >
                  <span>Go to Customer Portal</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="inline-flex items-center space-x-2 bg-banking-DEFAULT text-white px-5 py-2.5 rounded-md font-medium transition-all hover:bg-banking-DEFAULT/90"
                  >
                    <span>Sign In</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  
                  <Link 
                    to="/register" 
                    className="inline-flex items-center space-x-2 bg-white border border-banking-DEFAULT/20 text-banking-DEFAULT px-5 py-2.5 rounded-md font-medium transition-all hover:bg-banking-DEFAULT/5"
                  >
                    <UserPlus className="h-4 w-4 mr-1" />
                    <span>Create Account</span>
                  </Link>
                </>
              )}
              
              <Link 
                to="/hacker" 
                className="inline-flex items-center space-x-2 bg-white border border-banking-DEFAULT/20 text-banking-DEFAULT px-5 py-2.5 rounded-md font-medium transition-all hover:bg-banking-DEFAULT/5"
              >
                <span>Hacker View Demo</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          
          <div className="relative animate-slide-left">
            <div className="glass-card p-6 md:p-8 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-banking-muted">Current Balance</p>
                  <h3 className="text-2xl font-bold">
                    <EncryptedData originalValue="$24,500.00" isRevealed={true} />
                  </h3>
                </div>
                <div className="flex-shrink-0">
                  <Shield className="h-6 w-6 text-banking-accent" />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 text-banking-muted mr-2" />
                    <span className="text-sm">Morning Coffee</span>
                  </div>
                  <span className="text-sm font-medium">-$4.50</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 text-banking-muted mr-2" />
                    <span className="text-sm">Salary Deposit</span>
                  </div>
                  <span className="text-sm font-medium text-banking-success">+$2,750.00</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-md">
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 text-banking-muted mr-2" />
                    <span className="text-sm">Electric Bill</span>
                  </div>
                  <span className="text-sm font-medium">-$85.20</span>
                </div>
              </div>
            </div>
            
            {/* Encrypted data overlay */}
            <div className="absolute -bottom-4 right-4 glass-card p-4 rotate-3 text-xs max-w-[280px]">
              <p className="font-medium text-banking-DEFAULT mb-2">What hackers see:</p>
              <div className="encrypted-text overflow-hidden leading-relaxed font-mono">
                <EncryptedData originalValue="account_balance" /> : <EncryptedData originalValue="$24,500.00" /><br />
                <EncryptedData originalValue="transaction" /> : <EncryptedData originalValue="coffee_shop" /><br />
                <EncryptedData originalValue="amount" /> : <EncryptedData originalValue="$4.50" /><br />
                <EncryptedData originalValue="timestamp" /> : <EncryptedData originalValue="2023-06-05T09:32:14Z" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
