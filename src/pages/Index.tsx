
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, Lock, Database, Server, CreditCard } from 'lucide-react';
import EncryptedData from '../components/EncryptedData';

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-banking-light to-blue-50 -z-10"></div>
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
                <Link 
                  to="/customer" 
                  className="inline-flex items-center space-x-2 bg-banking-DEFAULT text-white px-5 py-2.5 rounded-md font-medium transition-all hover:bg-banking-DEFAULT/90"
                >
                  <span>Try Customer Portal</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                
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
                <div className="encrypted-text overflow-hidden leading-relaxed">
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
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-banking-DEFAULT mb-4">Uncompromising Security</h2>
            <p className="text-banking-muted max-w-2xl mx-auto">
              Explore our revolutionary approach to banking security with fully homomorphic encryption.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-6 space-y-4">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-banking-accent/10 text-banking-accent mb-4">
                <Lock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-banking-DEFAULT">Fully Homomorphic Encryption</h3>
              <p className="text-banking-muted">
                Your data remains encrypted even during processing, ensuring complete protection against breaches.
              </p>
            </div>
            
            <div className="glass-card p-6 space-y-4">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-banking-accent/10 text-banking-accent mb-4">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-banking-DEFAULT">Secure Transactions</h3>
              <p className="text-banking-muted">
                All financial operations happen on encrypted data, with zero exposure of your sensitive information.
              </p>
            </div>
            
            <div className="glass-card p-6 space-y-4">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-banking-accent/10 text-banking-accent mb-4">
                <Server className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-banking-DEFAULT">Tamper-Proof Systems</h3>
              <p className="text-banking-muted">
                Advanced security measures detect and prevent unauthorized attempts to disable encryption.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Portal Previews */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-banking-DEFAULT mb-4">Three Secure Portals</h2>
            <p className="text-banking-muted max-w-2xl mx-auto">
              Experience different perspectives of our encrypted banking system.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link to="/customer" className="glass-card p-6 space-y-4 hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold text-banking-DEFAULT">Customer Portal</h3>
              <p className="text-banking-muted">
                View your encrypted balances and make secure transactions with complete privacy.
              </p>
              <div className="flex justify-end">
                <ArrowRight className="h-5 w-5 text-banking-accent" />
              </div>
            </Link>
            
            <Link to="/manager" className="glass-card p-6 space-y-4 hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold text-banking-DEFAULT">Manager Portal</h3>
              <p className="text-banking-muted">
                Monitor transactions and detect patterns without seeing sensitive customer data.
              </p>
              <div className="flex justify-end">
                <ArrowRight className="h-5 w-5 text-banking-accent" />
              </div>
            </Link>
            
            <Link to="/hacker" className="glass-card p-6 space-y-4 hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold text-banking-DEFAULT">Hacker Portal</h3>
              <p className="text-banking-muted">
                See how your data appears to attackers - completely encrypted and unusable.
              </p>
              <div className="flex justify-end">
                <ArrowRight className="h-5 w-5 text-banking-accent" />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
