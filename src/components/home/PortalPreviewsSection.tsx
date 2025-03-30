
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, User, Briefcase, Shield } from 'lucide-react';

const PortalPreviewsSection = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50/90 to-blue-50/90 backdrop-blur-sm">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-banking-dark mb-4 font-serif">Exclusive Banking Portals</h2>
          <p className="text-banking-muted max-w-3xl mx-auto text-lg">
            Experience different perspectives of our fully encrypted banking ecosystem.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 group">
            <div className="h-40 bg-premium-gradient relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <User className="w-32 h-32 text-white" strokeWidth={1} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-semibold text-white">Client Portal</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-banking-muted mb-6">
                Access your encrypted accounts, execute secure transactions, and manage your wealth with complete privacy.
              </p>
              <Link 
                to="/customer" 
                className="inline-flex items-center text-banking-premium font-medium group-hover:underline"
              >
                <span>Access Portal</span>
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 group">
            <div className="h-40 bg-luxury-gradient relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <Briefcase className="w-32 h-32 text-white" strokeWidth={1} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-semibold text-white">Manager Portal</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-banking-muted mb-6">
                Monitor transactions and analytics without compromising client confidentiality through zero-knowledge proofs.
              </p>
              <Link 
                to="/manager" 
                className="inline-flex items-center text-banking-premium font-medium group-hover:underline"
              >
                <span>Access Portal</span>
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
          
          <div className="glass-card rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-300 group">
            <div className="h-40 bg-gradient-to-r from-red-600 to-red-800 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <Shield className="w-32 h-32 text-white" strokeWidth={1} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-2xl font-semibold text-white">Security Demo</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-banking-muted mb-6">
                Witness how your sensitive financial data appears to potential attackers - completely encrypted and unusable.
              </p>
              <Link 
                to="/hacker" 
                className="inline-flex items-center text-banking-premium font-medium group-hover:underline"
              >
                <span>View Demo</span>
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortalPreviewsSection;
