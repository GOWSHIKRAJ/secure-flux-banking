
import React from 'react';
import { Lock, Database, Server } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-white/90 backdrop-blur-sm">
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
  );
};

export default FeaturesSection;
