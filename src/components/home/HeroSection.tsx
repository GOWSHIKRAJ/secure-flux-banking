
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Lock, CreditCard, UserPlus } from 'lucide-react';
import EncryptedData from '../EncryptedData';
import useAuth from '@/hooks/useAuth';

const HeroSection = () => {
  const { isAuthenticated, user } = useAuth();
  
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-banking-light to-blue-50 opacity-80 -z-10"></div>
      <div className="container max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 animate-slide-right">
            <div className="inline-flex items-center space-x-2 bg-banking-accent/10 text-banking-accent px-4 py-1.5 rounded-full text-sm font-medium">
              <Lock className="h-4 w-4" />
              <span>Military-Grade Banking Security</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-banking-dark font-serif">
              Premium Banking with
              <span className="text-banking-premium block mt-2">Unbreakable</span>
              <span className="text-banking-premium">Encryption</span>
            </h1>
            
            <p className="text-xl text-banking-muted max-w-lg">
              Experience the future of secure banking with homomorphic encryption that maintains your privacy without compromising functionality.
            </p>
            
            <div className="flex flex-wrap gap-4">
              {isAuthenticated && user?.role === 'customer' ? (
                <Link 
                  to="/customer" 
                  className="inline-flex items-center space-x-2 bg-premium-gradient text-white px-8 py-4 rounded-lg font-medium shadow-premium transition-all hover:shadow-premium-hover hover:-translate-y-0.5"
                >
                  <span>Access Your Account</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="inline-flex items-center space-x-2 bg-premium-gradient text-white px-8 py-4 rounded-lg font-medium shadow-premium transition-all hover:shadow-premium-hover hover:-translate-y-0.5"
                  >
                    <span>Sign In</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                  
                  <Link 
                    to="/register" 
                    className="inline-flex items-center space-x-2 bg-white border border-banking-premium/20 text-banking-premium px-8 py-4 rounded-lg font-medium transition-all hover:bg-banking-premium/5"
                  >
                    <UserPlus className="h-5 w-5 mr-1" />
                    <span>Create Account</span>
                  </Link>
                </>
              )}
            </div>
          </div>
          
          <div className="relative animate-slide-left">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-200/20 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-300/20 rounded-full filter blur-3xl"></div>
            
            <div className="glass-card p-8 md:p-10 space-y-8 shadow-premium hover:shadow-premium-hover transition-all duration-500 relative z-10">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-banking-muted font-medium uppercase tracking-wider">Available Balance</p>
                  <h3 className="text-3xl font-bold mt-1">
                    <EncryptedData originalValue="$1,250,500.00" isRevealed={true} />
                  </h3>
                </div>
                <div className="flex-shrink-0">
                  <Shield className="h-8 w-8 text-banking-premium" />
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-banking-muted font-medium">Platinum Trading Account</p>
                  <span className="text-sm font-medium text-banking-dark">$875,200.00</span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="bg-banking-platinum h-full rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-banking-muted mr-3" />
                    <div>
                      <span className="text-sm font-medium block">Tesla Inc. Investment</span>
                      <span className="text-xs text-banking-muted">Securities Purchase</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium">-$25,400.00</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-banking-muted mr-3" />
                    <div>
                      <span className="text-sm font-medium block">Quarterly Dividend</span>
                      <span className="text-xs text-banking-muted">AAPL + MSFT</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-banking-success">+$12,750.00</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-banking-muted mr-3" />
                    <div>
                      <span className="text-sm font-medium block">Private Jet Charter</span>
                      <span className="text-xs text-banking-muted">NetJets Inc.</span>
                    </div>
                  </div>
                  <span className="text-sm font-medium">-$48,500.00</span>
                </div>
              </div>
            </div>
            
            {/* Encrypted data overlay */}
            <div className="absolute -bottom-6 right-6 glass-card p-5 rotate-3 text-xs max-w-[300px] shadow-premium">
              <p className="font-semibold text-banking-dark mb-2">Encrypted Data Protection:</p>
              <div className="encrypted-text overflow-hidden leading-relaxed font-mono">
                <EncryptedData originalValue="account_id" /> : <EncryptedData originalValue="plat_acct_7281" /><br />
                <EncryptedData originalValue="balance" /> : <EncryptedData originalValue="1250500.00" /><br />
                <EncryptedData originalValue="transaction" /> : <EncryptedData originalValue="inv_purchase" /><br />
                <EncryptedData originalValue="amount" /> : <EncryptedData originalValue="25400.00" /><br />
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
