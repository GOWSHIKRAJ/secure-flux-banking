
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pb-12 pt-20">
        {children || <Outlet />}
      </main>
      <footer className="py-6 border-t border-slate-200">
        <div className="container max-w-6xl mx-auto px-4 text-center text-sm text-banking-muted">
          <p>Secure-Flux Banking • Powered by Homomorphic Encryption</p>
          <p className="mt-1 text-xs">All data shown is encrypted at rest and in transit</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
