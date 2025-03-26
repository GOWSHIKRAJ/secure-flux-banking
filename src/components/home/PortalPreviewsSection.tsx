
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const PortalPreviewsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50/90 to-blue-50/90 backdrop-blur-sm">
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
  );
};

export default PortalPreviewsSection;
