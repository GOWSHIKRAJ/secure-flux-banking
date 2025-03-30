
import React from 'react';
import { Shield, Lock, Database, FileKey, Eye, EyeOff } from 'lucide-react';

const SecuritySection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-white/90 via-blue-50/30 to-white/80 backdrop-blur-sm">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-banking-dark mb-4 font-serif">Enterprise-Grade Security</h2>
          <p className="text-banking-muted max-w-3xl mx-auto text-lg">
            We employ military-grade encryption technologies to ensure your financial data remains completely secure and private.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass-card p-8 shadow-premium hover:shadow-premium-hover transition-all duration-300">
            <div className="h-14 w-14 flex items-center justify-center rounded-full bg-banking-premium/10 text-banking-premium mb-6">
              <Shield className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold text-banking-dark mb-3">Advanced Encryption</h3>
            <p className="text-banking-muted">
              Your financial data is protected by 256-bit AES encryption, the same standard used by governments and military organizations.
            </p>
          </div>
          
          <div className="glass-card p-8 shadow-premium hover:shadow-premium-hover transition-all duration-300">
            <div className="h-14 w-14 flex items-center justify-center rounded-full bg-banking-premium/10 text-banking-premium mb-6">
              <FileKey className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold text-banking-dark mb-3">Quantum-Safe Cryptography</h3>
            <p className="text-banking-muted">
              Our systems implement post-quantum cryptographic algorithms that can resist attacks from future quantum computers.
            </p>
          </div>
          
          <div className="glass-card p-8 shadow-premium hover:shadow-premium-hover transition-all duration-300">
            <div className="h-14 w-14 flex items-center justify-center rounded-full bg-banking-premium/10 text-banking-premium mb-6">
              <Database className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold text-banking-dark mb-3">Secure SQL Database</h3>
            <p className="text-banking-muted">
              Customer data is stored in highly-secure SQL databases with multiple encryption layers and constant monitoring.
            </p>
          </div>
          
          <div className="glass-card p-8 shadow-premium hover:shadow-premium-hover transition-all duration-300">
            <div className="h-14 w-14 flex items-center justify-center rounded-full bg-banking-premium/10 text-banking-premium mb-6">
              <Lock className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold text-banking-dark mb-3">Homomorphic Encryption</h3>
            <p className="text-banking-muted">
              Process financial calculations on encrypted data without ever decrypting it, providing mathematical privacy.
            </p>
          </div>
          
          <div className="glass-card p-8 shadow-premium hover:shadow-premium-hover transition-all duration-300">
            <div className="h-14 w-14 flex items-center justify-center rounded-full bg-banking-premium/10 text-banking-premium mb-6">
              <EyeOff className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold text-banking-dark mb-3">Zero-Knowledge Proofs</h3>
            <p className="text-banking-muted">
              Validate transactions without revealing sensitive information, ensuring complete data isolation.
            </p>
          </div>
          
          <div className="glass-card p-8 shadow-premium hover:shadow-premium-hover transition-all duration-300">
            <div className="h-14 w-14 flex items-center justify-center rounded-full bg-banking-premium/10 text-banking-premium mb-6">
              <Eye className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold text-banking-dark mb-3">24/7 Monitoring</h3>
            <p className="text-banking-muted">
              Continuous surveillance of all systems with AI-powered anomaly detection to prevent unauthorized access.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
