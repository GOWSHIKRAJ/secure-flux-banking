
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, User, BarChart3, ShieldAlert } from 'lucide-react';
import SecurityToggle from './SecurityToggle';

const Navigation: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    { 
      path: '/customer', 
      label: 'Customer Portal', 
      icon: <User className="h-4 w-4 mr-1" /> 
    },
    { 
      path: '/manager', 
      label: 'Manager Portal', 
      icon: <BarChart3 className="h-4 w-4 mr-1" /> 
    },
    { 
      path: '/hacker', 
      label: 'Hacker Portal', 
      icon: <ShieldAlert className="h-4 w-4 mr-1" /> 
    }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-10 transition-all duration-200 ${
        scrolled ? 'glass shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-banking-DEFAULT font-semibold text-xl"
          >
            <Shield className="h-5 w-5 text-banking-accent" />
            <span>SecureFlux</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all-fast ${
                  location.pathname === item.path
                    ? 'bg-banking-accent text-white'
                    : 'text-banking-DEFAULT hover:bg-secondary'
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            ))}
          </div>
          
          <div className="flex items-center space-x-4">
            <SecurityToggle />
            
            <div className="md:hidden">
              {/* Mobile menu button would go here */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
