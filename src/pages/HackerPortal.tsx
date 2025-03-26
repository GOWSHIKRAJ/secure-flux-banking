
import React, { useState } from 'react';
import { ShieldAlert, Database, Server, Eye, EyeOff, AlertTriangle, Shield, Code, ArrowRight } from 'lucide-react';
import EncryptedData from '../components/EncryptedData';
import { Button } from '@/components/ui/button';

const HackerPortal = () => {
  const [showDecrypted, setShowDecrypted] = useState(false);
  const [currentView, setCurrentView] = useState<'basic' | 'advanced'>('basic');
  const [attemptedHack, setAttemptedHack] = useState(false);
  
  // Encrypted data examples
  const databaseData = [
    { table: 'accounts', columns: ['id', 'user_id', 'balance', 'account_type', 'created_at'] },
    { table: 'transactions', columns: ['id', 'account_id', 'amount', 'type', 'merchant', 'timestamp'] },
    { table: 'users', columns: ['id', 'name', 'email', 'phone', 'address', 'created_at'] },
  ];
  
  // Simulated "stolen" data
  const stolenData = {
    accounts: [
      { id: 1, user_id: 567, balance: 24500.00, account_type: 'checking', created_at: '2022-03-15T14:23:45Z' },
      { id: 2, user_id: 890, balance: 156780.25, account_type: 'savings', created_at: '2021-08-04T09:12:30Z' },
      { id: 3, user_id: 123, balance: 4275.50, account_type: 'checking', created_at: '2022-11-22T16:45:10Z' },
    ],
    transactions: [
      { id: 101, account_id: 1, amount: -120.45, type: 'debit', merchant: 'Grocery Store', timestamp: '2023-06-08T15:32:10Z' },
      { id: 102, account_id: 1, amount: 3500.00, type: 'credit', merchant: 'Employer Inc', timestamp: '2023-06-01T09:00:00Z' },
      { id: 103, account_id: 2, amount: -85.20, type: 'debit', merchant: 'Electric Company', timestamp: '2023-06-05T12:15:00Z' },
    ]
  };
  
  const toggleDecryption = () => {
    setShowDecrypted(!showDecrypted);
  };
  
  const simulateHackAttempt = () => {
    setAttemptedHack(true);
    setTimeout(() => {
      // Reset after 3 seconds
      setAttemptedHack(false);
    }, 3000);
  };
  
  return (
    <div className="portal-container">
      <div className="portal-header">
        <h1 className="portal-heading">Hacker View <span className="text-banking-danger">(Demo)</span></h1>
        <p className="portal-subheading">
          This simulates what a hacker would see if they breached the system
        </p>
      </div>
      
      {/* Warning banner */}
      <div className="banking-card bg-banking-danger/10 border border-banking-danger/20 mb-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-6 w-6 text-banking-danger" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-banking-danger mb-1">Security Demonstration</h3>
            <p className="text-sm text-banking-DEFAULT">
              This page demonstrates how all sensitive data in our banking system is fully encrypted using homomorphic encryption.
              Even if a hacker breaches the database, they can only see encrypted values that are completely useless without the encryption keys.
            </p>
            <p className="text-sm font-medium mt-2">
              Toggle the switch below to compare encrypted vs. decrypted data.
            </p>
          </div>
        </div>
      </div>
      
      {/* View type toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-banking-light p-1 rounded-lg flex">
          <button
            onClick={() => setCurrentView('basic')}
            className={`px-4 py-2 rounded ${
              currentView === 'basic' 
                ? 'bg-white shadow text-banking-DEFAULT' 
                : 'text-banking-muted'
            }`}
          >
            Basic View
          </button>
          <button
            onClick={() => setCurrentView('advanced')}
            className={`px-4 py-2 rounded ${
              currentView === 'advanced' 
                ? 'bg-white shadow text-banking-DEFAULT' 
                : 'text-banking-muted'
            }`}
          >
            Advanced (SQL View)
          </button>
        </div>
      </div>
      
      {/* Encryption toggle */}
      <div className="flex justify-center mb-8">
        <button
          onClick={toggleDecryption}
          className={`
            flex items-center space-x-3 px-5 py-3 rounded-full 
            transition-all duration-300 border
            ${showDecrypted 
              ? 'bg-banking-danger/10 border-banking-danger/20 text-banking-danger' 
              : 'bg-banking-success/10 border-banking-success/20 text-banking-success'
            }
          `}
        >
          {showDecrypted ? (
            <>
              <EyeOff className="h-5 w-5 mr-2" />
              <span>Showing Decrypted Data (Insecure)</span>
            </>
          ) : (
            <>
              <Eye className="h-5 w-5 mr-2" />
              <span>Showing Encrypted Data (Secure)</span>
            </>
          )}
        </button>
      </div>
      
      {currentView === 'basic' ? (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Database Structure */}
          <div className="banking-card">
            <h2 className="banking-card-header">
              <Database className="h-5 w-5 text-banking-accent mr-2" />
              Database Structure
            </h2>
            
            <div className="space-y-4">
              {databaseData.map((table) => (
                <div key={table.table} className="bg-banking-light rounded-lg p-4">
                  <p className="font-mono font-semibold mb-2">{table.table}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {table.columns.map((column) => (
                      <div key={column} className="bg-white p-2 rounded text-xs font-mono">
                        {column}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* "Stolen" Data */}
          <div className="space-y-6">
            <div className="banking-card">
              <h2 className="banking-card-header">
                <ShieldAlert className="h-5 w-5 text-banking-danger mr-2" />
                "Stolen" Account Data
              </h2>
              
              <div className="bg-banking-light rounded-lg p-4 overflow-x-auto font-mono text-sm">
                <pre className="whitespace-pre-wrap">
                  {showDecrypted ? (
                    JSON.stringify(stolenData.accounts, null, 2)
                  ) : (
                    `[
  {
    "id": 1,
    "user_id": "${<EncryptedData originalValue="567" />}",
    "balance": "${<EncryptedData originalValue="24500.00" />}",
    "account_type": "${<EncryptedData originalValue="checking" />}",
    "created_at": "${<EncryptedData originalValue="2022-03-15T14:23:45Z" />}"
  },
  {
    "id": 2,
    "user_id": "${<EncryptedData originalValue="890" />}",
    "balance": "${<EncryptedData originalValue="156780.25" />}",
    "account_type": "${<EncryptedData originalValue="savings" />}",
    "created_at": "${<EncryptedData originalValue="2021-08-04T09:12:30Z" />}"
  },
  {
    "id": 3,
    "user_id": "${<EncryptedData originalValue="123" />}",
    "balance": "${<EncryptedData originalValue="4275.50" />}",
    "account_type": "${<EncryptedData originalValue="checking" />}",
    "created_at": "${<EncryptedData originalValue="2022-11-22T16:45:10Z" />}"
  }
]`
                  )}
                </pre>
              </div>
            </div>
            
            <div className="banking-card">
              <h2 className="banking-card-header">
                <ShieldAlert className="h-5 w-5 text-banking-danger mr-2" />
                "Stolen" Transaction Data
              </h2>
              
              <div className="bg-banking-light rounded-lg p-4 overflow-x-auto font-mono text-sm">
                <pre className="whitespace-pre-wrap">
                  {showDecrypted ? (
                    JSON.stringify(stolenData.transactions, null, 2)
                  ) : (
                    `[
  {
    "id": 101,
    "account_id": 1,
    "amount": "${<EncryptedData originalValue="-120.45" />}",
    "type": "${<EncryptedData originalValue="debit" />}",
    "merchant": "${<EncryptedData originalValue="Grocery Store" />}",
    "timestamp": "${<EncryptedData originalValue="2023-06-08T15:32:10Z" />}"
  },
  {
    "id": 102,
    "account_id": 1,
    "amount": "${<EncryptedData originalValue="3500.00" />}",
    "type": "${<EncryptedData originalValue="credit" />}",
    "merchant": "${<EncryptedData originalValue="Employer Inc" />}",
    "timestamp": "${<EncryptedData originalValue="2023-06-01T09:00:00Z" />}"
  },
  {
    "id": 103,
    "account_id": 2,
    "amount": "${<EncryptedData originalValue="-85.20" />}",
    "type": "${<EncryptedData originalValue="debit" />}",
    "merchant": "${<EncryptedData originalValue="Electric Company" />}",
    "timestamp": "${<EncryptedData originalValue="2023-06-05T12:15:00Z" />}"
  }
]`
                  )}
                </pre>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Advanced SQL View */
        <div className="banking-card mb-8">
          <h2 className="banking-card-header">
            <Code className="h-5 w-5 text-banking-danger mr-2" />
            SQL Query Attempt
          </h2>
          
          <div className="space-y-4">
            <div className="bg-banking-light rounded-lg p-4">
              <div className="font-mono text-sm mb-2 text-banking-muted">
                # Hacker's SQL query:
              </div>
              <div className="bg-slate-800 text-white p-4 rounded font-mono text-sm whitespace-pre overflow-x-auto">
                {`SELECT a.id, a.user_id, a.balance, a.account_type, 
       t.amount, t.merchant, t.timestamp
FROM accounts a
JOIN transactions t ON a.id = t.account_id
WHERE a.balance > 10000;`}
              </div>
            </div>
            
            <div className="bg-banking-light rounded-lg p-4">
              <div className="font-mono text-sm mb-2 text-banking-muted">
                # Query results:
              </div>
              <div className="bg-slate-800 text-white p-4 rounded font-mono text-sm whitespace-pre overflow-x-auto">
                {showDecrypted ? 
                `id | user_id | balance    | account_type | amount   | merchant      | timestamp
---+---------+------------+--------------+----------+---------------+------------------------
1  | 567     | 24500.00   | checking     | -120.45  | Grocery Store | 2023-06-08T15:32:10Z
1  | 567     | 24500.00   | checking     | 3500.00  | Employer Inc  | 2023-06-01T09:00:00Z
2  | 890     | 156780.25  | savings      | -85.20   | Electric Co   | 2023-06-05T12:15:00Z

(3 rows returned)`
                : 
                `id | user_id                   | balance                     | account_type               | amount                      | merchant                   | timestamp
---+---------------------------+-----------------------------+---------------------------+-----------------------------+---------------------------+---------------------------
1  | ${<EncryptedData originalValue="567" />}      | ${<EncryptedData originalValue="24500.00" />}      | ${<EncryptedData originalValue="checking" />}      | ${<EncryptedData originalValue="-120.45" />}      | ${<EncryptedData originalValue="Grocery Store" />}      | ${<EncryptedData originalValue="2023-06-08T15:32:10Z" />}
1  | ${<EncryptedData originalValue="567" />}      | ${<EncryptedData originalValue="24500.00" />}      | ${<EncryptedData originalValue="checking" />}      | ${<EncryptedData originalValue="3500.00" />}      | ${<EncryptedData originalValue="Employer Inc" />}      | ${<EncryptedData originalValue="2023-06-01T09:00:00Z" />}
2  | ${<EncryptedData originalValue="890" />}      | ${<EncryptedData originalValue="156780.25" />}      | ${<EncryptedData originalValue="savings" />}      | ${<EncryptedData originalValue="-85.20" />}      | ${<EncryptedData originalValue="Electric Co" />}      | ${<EncryptedData originalValue="2023-06-05T12:15:00Z" />}

ERROR: Cannot compare encrypted values without decryption key`}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Hack attempt simulator */}
      <div className="banking-card mt-8 bg-slate-800 text-white">
        <h2 className="text-lg font-bold mb-3 flex items-center">
          <ShieldAlert className="h-5 w-5 text-red-400 mr-2" />
          Hack Attempt Simulator
        </h2>
        
        <div className="space-y-4">
          <p className="text-sm opacity-80">
            Try to run a simulated hack to steal customer data or manipulate the database
          </p>
          
          <div className="flex space-x-4">
            <Button 
              variant="destructive" 
              className="bg-red-600 hover:bg-red-700" 
              onClick={simulateHackAttempt}
              disabled={attemptedHack}
            >
              <Code className="mr-2 h-4 w-4" />
              <span>Run SQL Injection Attack</span>
            </Button>
            
            <Button 
              variant="destructive" 
              className="bg-red-600 hover:bg-red-700" 
              onClick={simulateHackAttempt}
              disabled={attemptedHack}
            >
              <Server className="mr-2 h-4 w-4" />
              <span>Attempt Database Dump</span>
            </Button>
          </div>
          
          {attemptedHack && (
            <div className="mt-4 bg-red-900/40 p-4 rounded-md text-sm border border-red-500 animate-pulse">
              <div className="font-mono">
                <p className="text-red-300">ERROR: Unable to decrypt data</p>
                <p className="text-red-300">ERROR: Homomorphic encryption prevents raw access</p>
                <p className="text-red-300">ERROR: Access attempt logged and reported</p>
                <p className="text-white mt-2">
                  System protected by FHE (Fully Homomorphic Encryption)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Security Explanation */}
      <div className="banking-card mt-8">
        <h2 className="banking-card-header">
          <Shield className="h-5 w-5 text-banking-accent mr-2" />
          How Homomorphic Encryption Protects Your Data
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-banking-light p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Always Encrypted</h3>
            <p className="text-sm text-banking-muted">
              Your sensitive data (balances, transactions, personal info) is encrypted at all times, even during processing.
            </p>
          </div>
          
          <div className="bg-banking-light p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Computation on Encrypted Data</h3>
            <p className="text-sm text-banking-muted">
              Fully Homomorphic Encryption allows the bank to perform computations (additions, transfers) without ever decrypting your data.
            </p>
          </div>
          
          <div className="bg-banking-light p-4 rounded-lg">
            <h3 className="font-medium text-lg mb-2">Hacker-Proof</h3>
            <p className="text-sm text-banking-muted">
              Even with full database access, hackers can only see encrypted gibberish that's mathematically impossible to decode without keys.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HackerPortal;
