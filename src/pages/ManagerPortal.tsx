import React, { useState } from 'react';
import { BarChart3, AlertTriangle, Users, TrendingUp, TrendingDown, ArrowUpRight, Shield, Search, LogIn, Fingerprint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EncryptedData from '../components/EncryptedData';
import useAuth from '../hooks/useAuth';
import { Button } from '@/components/ui/button';

const ManagerPortal = () => {
  const [timeframe, setTimeframe] = useState('week');
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const customerList = [
    { id: 1, name: 'John Smith', accountNum: '******3456', status: 'Active', riskScore: 'Low' },
    { id: 2, name: 'Emma Johnson', accountNum: '******7890', status: 'Active', riskScore: 'Low' },
    { id: 3, name: 'Michael Brown', accountNum: '******2345', status: 'Inactive', riskScore: 'Medium' },
    { id: 4, name: 'Sophia Williams', accountNum: '******6789', status: 'Active', riskScore: 'Low' },
    { id: 5, name: 'David Miller', accountNum: '******1234', status: 'Under Review', riskScore: 'High' },
  ];
  
  // Simulated metrics
  const metrics = {
    totalTransactions: 2458,
    totalValue: '$1,245,890.00',
    averageValue: '$506.87',
    growth: '+12.4%'
  };
  
  // Simulated alerts
  const alerts = [
    { id: 1, type: 'Fraud Detection', message: 'Unusual activity detected on account ******6789', severity: 'high', time: '14 minutes ago' },
    { id: 2, type: 'System Alert', message: 'Encryption system successfully updated to version 3.5.2', severity: 'low', time: '2 hours ago' },
    { id: 3, type: 'Security Alert', message: 'Multiple failed login attempts for user ID ******45', severity: 'medium', time: '3 hours ago' },
  ];

  // Navigate to login
  const navigateToLogin = () => {
    navigate('/login?role=manager');
  };
  
  // Navigate to biometric auth
  const navigateToBiometric = () => {
    navigate('/login?role=manager');
  };
  
  // Check if the user is authenticated and is a manager
  if (!isAuthenticated || user?.role !== 'manager') {
    return (
      <div className="portal-container">
        <div className="portal-header">
          <h1 className="portal-heading">Manager Portal</h1>
          <p className="portal-subheading">
            Secure access required for bank management personnel
          </p>
        </div>
        
        <div className="w-full max-w-md mx-auto glass-card p-8 backdrop-blur-md">
          <div className="space-y-6">
            <div className="text-center">
              <Shield className="h-12 w-12 text-banking-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-banking-DEFAULT mb-2">Manager Authentication Required</h2>
              <p className="text-banking-muted mb-6">
                This secure area requires manager credentials to access customer data and system monitoring.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <Button 
                className="w-full bg-banking-accent hover:bg-banking-accent/90 text-white flex items-center justify-center"
                onClick={navigateToLogin}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Manager Sign In
              </Button>
              
              <Button 
                variant="outline"
                className="w-full flex items-center justify-center"
                onClick={navigateToBiometric}
              >
                <Fingerprint className="h-4 w-4 mr-2" />
                Biometric Authentication
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="portal-container">
      <div className="portal-header">
        <h1 className="portal-heading">Manager Portal</h1>
        <p className="portal-subheading">
          Monitor transactions and detect patterns while preserving customer privacy
        </p>
      </div>
      
      {/* Top metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div className="banking-card p-5">
          <p className="text-sm text-banking-muted mb-1">Total Transactions</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">{metrics.totalTransactions}</p>
            <TrendingUp className="h-5 w-5 text-banking-success" />
          </div>
        </div>
        
        <div className="banking-card p-5">
          <p className="text-sm text-banking-muted mb-1">Total Value</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">
              <EncryptedData originalValue={metrics.totalValue} />
            </p>
            <TrendingUp className="h-5 w-5 text-banking-success" />
          </div>
        </div>
        
        <div className="banking-card p-5">
          <p className="text-sm text-banking-muted mb-1">Average Value</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold">
              <EncryptedData originalValue={metrics.averageValue} />
            </p>
            <TrendingDown className="h-5 w-5 text-banking-muted" />
          </div>
        </div>
        
        <div className="banking-card p-5">
          <p className="text-sm text-banking-muted mb-1">Growth Rate</p>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-bold text-banking-success">{metrics.growth}</p>
            <ArrowUpRight className="h-5 w-5 text-banking-success" />
          </div>
        </div>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Transaction Analytics */}
          <div className="banking-card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="banking-card-header mb-0">
                <BarChart3 className="h-5 w-5 text-banking-accent mr-2" />
                Transaction Analytics
              </h2>
              
              <div className="flex space-x-2">
                <button 
                  className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                    timeframe === 'week' 
                      ? 'bg-banking-accent text-white' 
                      : 'bg-banking-light text-banking-DEFAULT hover:bg-banking-light/70'
                  }`}
                  onClick={() => setTimeframe('week')}
                >
                  Week
                </button>
                <button 
                  className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                    timeframe === 'month' 
                      ? 'bg-banking-accent text-white' 
                      : 'bg-banking-light text-banking-DEFAULT hover:bg-banking-light/70'
                  }`}
                  onClick={() => setTimeframe('month')}
                >
                  Month
                </button>
                <button 
                  className={`px-3 py-1.5 text-sm rounded-md transition-all ${
                    timeframe === 'year' 
                      ? 'bg-banking-accent text-white' 
                      : 'bg-banking-light text-banking-DEFAULT hover:bg-banking-light/70'
                  }`}
                  onClick={() => setTimeframe('year')}
                >
                  Year
                </button>
              </div>
            </div>
            
            {/* Placeholder for chart */}
            <div className="bg-banking-light rounded-lg p-6 h-64 flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-10 w-10 text-banking-muted mx-auto mb-2" />
                <p className="text-banking-muted">
                  Transaction volume chart visualization
                  <br />(Data is processed in encrypted form)
                </p>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-banking-muted text-center">
              <p>All analytics are performed on encrypted data using homomorphic encryption.</p>
              <p>Raw customer financial data is never exposed.</p>
            </div>
          </div>
          
          {/* Customer List */}
          <div className="banking-card">
            <div className="flex justify-between items-center mb-6">
              <h2 className="banking-card-header mb-0">
                <Users className="h-5 w-5 text-banking-accent mr-2" />
                Customer Accounts
              </h2>
              
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-banking-muted" />
                <input 
                  type="text" 
                  placeholder="Search accounts" 
                  className="pl-9 pr-4 py-2 rounded-md bg-banking-light focus:outline-none focus:ring-1 focus:ring-banking-accent text-sm"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-banking-light">
                    <th className="px-4 py-3 text-sm font-medium text-banking-muted">Customer</th>
                    <th className="px-4 py-3 text-sm font-medium text-banking-muted">Account</th>
                    <th className="px-4 py-3 text-sm font-medium text-banking-muted">Status</th>
                    <th className="px-4 py-3 text-sm font-medium text-banking-muted">Risk Score</th>
                    <th className="px-4 py-3 text-sm font-medium text-banking-muted">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customerList.map((customer) => (
                    <tr key={customer.id} className="border-b border-banking-light hover:bg-banking-light/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="font-medium">
                          <EncryptedData originalValue={customer.name} />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-banking-muted">{customer.accountNum}</td>
                      <td className="px-4 py-3">
                        <span className={`
                          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${customer.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : customer.status === 'Inactive' 
                              ? 'bg-gray-100 text-gray-800'
                              : 'bg-red-100 text-red-800'
                          }
                        `}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`
                          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${customer.riskScore === 'Low' 
                            ? 'bg-green-100 text-green-800' 
                            : customer.riskScore === 'Medium' 
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }
                        `}>
                          {customer.riskScore}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-banking-accent hover:text-banking-accent/80 font-medium text-sm">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          {/* Security Alerts */}
          <div className="banking-card">
            <h2 className="banking-card-header">
              <AlertTriangle className="h-5 w-5 text-banking-accent mr-2" />
              Security Alerts
            </h2>
            
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`
                    p-4 rounded-lg border space-y-2
                    ${alert.severity === 'high' 
                      ? 'bg-red-50 border-red-200' 
                      : alert.severity === 'medium' 
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'bg-blue-50 border-blue-200'
                    }
                  `}
                >
                  <div className="flex justify-between">
                    <span className="font-medium">{alert.type}</span>
                    <span className="text-xs text-banking-muted">{alert.time}</span>
                  </div>
                  <p className="text-sm">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Encryption Status */}
          <div className="banking-card">
            <h2 className="banking-card-header">
              <Shield className="h-5 w-5 text-banking-accent mr-2" />
              Encryption Status
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-banking-success/10 border border-banking-success/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-banking-success">FHE System</p>
                  <span className="text-xs bg-banking-success text-white px-2 py-1 rounded-full">Active</span>
                </div>
                <p className="text-xs text-banking-muted mt-1">Running Microsoft SEAL v4.0.0</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Encrypted Operations Today</p>
                  <p className="text-sm text-banking-accent font-medium">12,543</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Database Encryption</p>
                  <p className="text-sm text-banking-success font-medium">100%</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Security Alerts</p>
                  <p className="text-sm font-medium">3</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Last System Update</p>
                  <p className="text-sm text-banking-muted">Today, 02:15 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerPortal;
