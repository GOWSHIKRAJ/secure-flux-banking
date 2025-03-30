
import React from 'react';
import { Shield, CreditCard, Globe, Clock, Briefcase, LineChart } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-24 bg-white/95 backdrop-blur-sm">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-banking-dark mb-4 font-serif">Uncompromising Security and Service</h2>
          <p className="text-banking-muted max-w-3xl mx-auto text-lg">
            Experience the perfect blend of cutting-edge security and premium banking services tailored for discerning clients.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="glass-card p-8 shadow-premium hover:shadow-premium-hover transition-all duration-300">
            <div className="h-14 w-14 flex items-center justify-center rounded-full bg-banking-accent/10 text-banking-accent mb-6">
              <Shield className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold text-banking-dark mb-3">Fully Homomorphic Encryption</h3>
            <p className="text-banking-muted">
              Your data remains encrypted even during processing, ensuring complete protection against sophisticated breaches.
            </p>
          </div>
          
          <div className="glass-card p-8 shadow-premium hover:shadow-premium-hover transition-all duration-300">
            <div className="h-14 w-14 flex items-center justify-center rounded-full bg-banking-accent/10 text-banking-accent mb-6">
              <CreditCard className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold text-banking-dark mb-3">Premium Credit Cards</h3>
            <p className="text-banking-muted">
              Access our exclusive metal credit cards with unlimited cashback, concierge service, and global lounge access.
            </p>
          </div>
          
          <div className="glass-card p-8 shadow-premium hover:shadow-premium-hover transition-all duration-300">
            <div className="h-14 w-14 flex items-center justify-center rounded-full bg-banking-accent/10 text-banking-accent mb-6">
              <Globe className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold text-banking-dark mb-3">Global Banking Network</h3>
            <p className="text-banking-muted">
              Manage your assets across 160+ countries with zero foreign transaction fees and preferred exchange rates.
            </p>
          </div>
          
          <div className="glass-card p-8 shadow-premium hover:shadow-premium-hover transition-all duration-300">
            <div className="h-14 w-14 flex items-center justify-center rounded-full bg-banking-accent/10 text-banking-accent mb-6">
              <Clock className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold text-banking-dark mb-3">24/7 Dedicated Support</h3>
            <p className="text-banking-muted">
              Your personal financial advisor is available around the clock through our encrypted communication channels.
            </p>
          </div>
          
          <div className="glass-card p-8 shadow-premium hover:shadow-premium-hover transition-all duration-300">
            <div className="h-14 w-14 flex items-center justify-center rounded-full bg-banking-accent/10 text-banking-accent mb-6">
              <Briefcase className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold text-banking-dark mb-3">Private Wealth Management</h3>
            <p className="text-banking-muted">
              Tailored investment strategies with access to exclusive opportunities not available to retail investors.
            </p>
          </div>
          
          <div className="glass-card p-8 shadow-premium hover:shadow-premium-hover transition-all duration-300">
            <div className="h-14 w-14 flex items-center justify-center rounded-full bg-banking-accent/10 text-banking-accent mb-6">
              <LineChart className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-semibold text-banking-dark mb-3">Advanced Analytics</h3>
            <p className="text-banking-muted">
              Proprietary AI-powered financial insights and predictive modeling for your investment portfolio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
