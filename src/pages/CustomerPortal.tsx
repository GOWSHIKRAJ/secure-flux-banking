import React, { useState } from 'react';
import { Shield, ArrowRight, CreditCard, Clock, Send, PiggyBank, DollarSign, UserPlus, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EncryptedData from '../components/EncryptedData';
import ActionButton from '../components/customer/ActionButton';
import { toast } from 'sonner';
import { sendSecurityAlert } from '../services/NotificationService';
import useAuth from '../hooks/useAuth';
import { Button } from '@/components/ui/button';

const CustomerPortal = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const transactions = [
    { 
      id: 1, 
      merchant: 'Grocery Store', 
      amount: -120.45, 
      date: '2023-06-08', 
      category: 'Shopping' 
    },
    { 
      id: 2, 
      merchant: 'Monthly Salary', 
      amount: 3500.00, 
      date: '2023-06-01', 
      category: 'Income' 
    },
    { 
      id: 3, 
      merchant: 'Electric Company', 
      amount: -85.20, 
      date: '2023-06-05', 
      category: 'Utilities' 
    },
    { 
      id: 4, 
      merchant: 'Online Streaming', 
      amount: -14.99, 
      date: '2023-06-04', 
      category: 'Entertainment' 
    },
    { 
      id: 5, 
      merchant: 'Side Project', 
      amount: 250.00, 
      date: '2023-06-07', 
      category: 'Income' 
    }
  ];
  
  const handleSendMoney = () => {
    toast.info("Send Money Feature", {
      description: "This would open a transfer form in a real application.",
    });
  };
  
  const handleApplyForLoan = () => {
    toast.info("Loan Application", {
      description: "This would open a loan application form in a real application.",
    });
  };
  
  const handlePayBills = () => {
    toast.info("Bill Payment", {
      description: "This would open a bill payment form in a real application.",
    });
  };
  
  const handleLargeTransaction = () => {
    sendSecurityAlert({
      message: "Large transaction initiated: $5,000.00 to Account *****4321",
      type: 'transaction'
    });
    
    toast.success("Transaction initiated", {
      description: "A security alert has been sent to your registered mobile number",
    });
  };
  
  const navigateToLogin = () => {
    navigate('/login');
  };
  
  const navigateToRegister = () => {
    navigate('/register');
  };
  
  if (!isAuthenticated) {
    return (
      <div className="portal-container">
        <div className="portal-header">
          <h1 className="portal-heading">Customer Portal</h1>
          <p className="portal-subheading">
            Please sign in or create an account to access your secure banking dashboard
          </p>
        </div>
        
        <div className="w-full max-w-md mx-auto glass-card p-8 backdrop-blur-md">
          <div className="space-y-6">
            <div className="text-center">
              <Shield className="h-12 w-12 text-banking-accent mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-banking-DEFAULT mb-2">Secure Access Required</h2>
              <p className="text-banking-muted mb-6">
                Your financial data is protected with homomorphic encryption technology.
                Please authenticate to access your account.
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <Button 
                className="w-full bg-banking-accent hover:bg-banking-accent/90 text-white flex items-center justify-center"
                onClick={navigateToLogin}
              >
                <LogIn className="h-4 w-4 mr-2" />
                Sign In to Your Account
              </Button>
              
              <Button 
                variant="outline"
                className="w-full flex items-center justify-center"
                onClick={navigateToRegister}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Create New Account
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
        <h1 className="portal-heading">Customer Portal</h1>
        <p className="portal-subheading">
          Your secure banking dashboard with fully encrypted data
        </p>
      </div>
      
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="banking-card">
            <h2 className="banking-card-header">
              <Shield className="h-5 w-5 text-banking-accent mr-2" />
              Your Secure Balance
            </h2>
            
            <div className="bg-banking-light rounded-xl p-6">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-sm text-banking-muted mb-1">Available Balance</p>
                  <p className="text-3xl font-bold">
                    <EncryptedData 
                      originalValue="$24,500.00" 
                      isRevealed={true} 
                      className="text-banking-DEFAULT"
                    />
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-banking-muted mb-1">Encrypted Value</p>
                  <p className="text-sm font-mono">
                    <EncryptedData 
                      originalValue="$24,500.00" 
                      className="text-banking-muted"
                    />
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <ActionButton 
                icon={Send} 
                label="Send Money" 
                action={handleSendMoney} 
              />
              
              <ActionButton 
                icon={CreditCard} 
                label="Pay Bills" 
                action={handlePayBills} 
              />
              
              <ActionButton 
                icon={PiggyBank} 
                label="Save" 
              />
              
              <ActionButton 
                icon={DollarSign} 
                label="Invest" 
              />
            </div>
          </div>
          
          <div className="banking-card">
            <h2 className="banking-card-header">
              <Clock className="h-5 w-5 text-banking-accent mr-2" />
              Recent Transactions
            </h2>
            
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div 
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-banking-light rounded-lg hover:bg-banking-light/70 transition-all"
                  onMouseEnter={() => setHoveredCard(transaction.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div>
                    <p className="font-medium">
                      {hoveredCard === transaction.id ? (
                        transaction.merchant
                      ) : (
                        <EncryptedData originalValue={transaction.merchant} />
                      )}
                    </p>
                    <p className="text-sm text-banking-muted">
                      {hoveredCard === transaction.id ? (
                        transaction.date
                      ) : (
                        <EncryptedData originalValue={transaction.date} />
                      )}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className={`font-medium ${transaction.amount > 0 ? 'text-banking-success' : ''}`}>
                      {hoveredCard === transaction.id ? (
                        `${transaction.amount > 0 ? '+' : ''}$${Math.abs(transaction.amount).toFixed(2)}`
                      ) : (
                        <EncryptedData 
                          originalValue={`${transaction.amount > 0 ? '+' : ''}$${Math.abs(transaction.amount).toFixed(2)}`}
                        />
                      )}
                    </p>
                    <p className="text-sm text-banking-muted">
                      {hoveredCard === transaction.id ? (
                        transaction.category
                      ) : (
                        <EncryptedData originalValue={transaction.category} />
                      )}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-right">
              <button className="inline-flex items-center text-banking-accent hover:text-banking-accent/80 font-medium text-sm">
                <span>View All Transactions</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="banking-card">
            <h2 className="banking-card-header">
              <Shield className="h-5 w-5 text-banking-accent mr-2" />
              Security Status
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-banking-success/10 border border-banking-success/20 rounded-lg flex items-center">
                <div className="h-8 w-8 flex items-center justify-center rounded-full bg-banking-success/20 text-banking-success mr-3">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-banking-success">FHE Protection Active</p>
                  <p className="text-xs text-banking-muted">All data encrypted at rest and in transit</p>
                </div>
              </div>
              
              <div className="p-4 bg-banking-light rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Last Login</p>
                  <p className="text-sm text-banking-muted">Today, 09:45 AM</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">Device</p>
                  <p className="text-sm text-banking-muted">MacBook Pro</p>
                </div>
                
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">IP Address</p>
                  <p className="text-sm text-banking-muted">
                    <EncryptedData originalValue="192.168.1.155" />
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="banking-card">
            <h2 className="banking-card-header">Quick Actions</h2>
            
            <div className="space-y-3">
              <button 
                className="w-full flex items-center justify-between p-3 rounded-lg bg-banking-light hover:bg-banking-light/70 transition-all"
                onClick={handleApplyForLoan}
              >
                <span className="font-medium">Apply for Loan</span>
                <ArrowRight className="h-4 w-4 text-banking-accent" />
              </button>
              
              <button 
                className="w-full flex items-center justify-between p-3 rounded-lg bg-banking-light hover:bg-banking-light/70 transition-all"
                onClick={handlePayBills}
              >
                <span className="font-medium">Pay Credit Card</span>
                <ArrowRight className="h-4 w-4 text-banking-accent" />
              </button>
              
              <button 
                className="w-full flex items-center justify-between p-3 rounded-lg bg-banking-light hover:bg-banking-light/70 transition-all"
                onClick={handleLargeTransaction}
              >
                <span className="font-medium">Transfer Large Amount</span>
                <ArrowRight className="h-4 w-4 text-banking-accent" />
              </button>
              
              <button 
                className="w-full flex items-center justify-between p-3 rounded-lg bg-banking-light hover:bg-banking-light/70 transition-all"
              >
                <span className="font-medium">View Statements</span>
                <ArrowRight className="h-4 w-4 text-banking-accent" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPortal;
