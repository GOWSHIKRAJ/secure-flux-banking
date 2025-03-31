
import { supabase } from "@/integrations/supabase/client";

export interface Customer {
  id: string;
  name: string;
  email: string;
  accountNumber: string;
  balance: number;
  lastLogin: Date;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  date: Date;
  amount: number;
  description: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
}

// Service methods that connect to Supabase
export const DatabaseService = {
  // Get all customers
  getAllCustomers: async (): Promise<Customer[]> => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*');
      
      if (error) {
        console.error('Error fetching customers:', error);
        throw error;
      }
      
      // Transform to our Customer interface
      return data.map(customer => ({
        id: customer.id,
        name: customer.name,
        email: customer.email,
        accountNumber: customer.account_number,
        balance: parseFloat(customer.balance),
        lastLogin: new Date(customer.last_login),
        transactions: [] // Will be loaded separately if needed
      }));
    } catch (error) {
      console.error('Failed to get customers:', error);
      throw error;
    }
  },

  // Get customer by email
  getCustomerByEmail: async (email: string): Promise<Customer | null> => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('email', email)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return null; // No customer found with this email
        }
        console.error('Error fetching customer by email:', error);
        throw error;
      }
      
      // Get transactions for this customer
      const { data: transactionsData, error: transactionsError } = await supabase
        .from('transactions')
        .select('*')
        .eq('customer_id', data.id);
        
      if (transactionsError) {
        console.error('Error fetching transactions:', transactionsError);
      }
      
      const transactions = transactionsError ? [] : transactionsData.map(t => ({
        id: t.id,
        date: new Date(t.created_at),
        amount: parseFloat(t.amount),
        description: t.description,
        type: t.type as 'deposit' | 'withdrawal' | 'transfer'
      }));
      
      return {
        id: data.id,
        name: data.name,
        email: data.email,
        accountNumber: data.account_number,
        balance: parseFloat(data.balance),
        lastLogin: new Date(data.last_login),
        transactions: transactions
      };
    } catch (error) {
      console.error('Failed to get customer by email:', error);
      throw error;
    }
  },

  // Get customer by account number
  getCustomerByAccountNumber: async (accountNumber: string): Promise<Customer | null> => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('account_number', accountNumber)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          return null; // No customer found with this account number
        }
        console.error('Error fetching customer by account number:', error);
        throw error;
      }
      
      return {
        id: data.id,
        name: data.name,
        email: data.email,
        accountNumber: data.account_number,
        balance: parseFloat(data.balance),
        lastLogin: new Date(data.last_login),
        transactions: [] // Will be loaded separately if needed
      };
    } catch (error) {
      console.error('Failed to get customer by account number:', error);
      throw error;
    }
  },

  // Add customer (saves to Supabase)
  addCustomer: async (customer: Omit<Customer, 'id' | 'transactions' | 'lastLogin'>): Promise<Customer> => {
    try {
      // Generate a random account number if not provided
      const accountNumber = customer.accountNumber || `${Math.floor(Math.random() * 10000000000)}`;
      
      const { data, error } = await supabase
        .from('customers')
        .insert([{
          name: customer.name,
          email: customer.email,
          account_number: accountNumber,
          balance: customer.balance || 1000, // Default starting balance
          password: 'password123' // In a real app, this would be properly hashed
        }])
        .select()
        .single();
      
      if (error) {
        console.error('Error adding customer:', error);
        throw error;
      }
      
      return {
        id: data.id,
        name: data.name,
        email: data.email,
        accountNumber: data.account_number,
        balance: parseFloat(data.balance),
        lastLogin: new Date(data.last_login),
        transactions: []
      };
    } catch (error) {
      console.error('Failed to add customer:', error);
      throw error;
    }
  },

  // Transfer money between accounts
  transferMoney: async (fromAccountNumber: string, toAccountNumber: string, amount: number, description: string): Promise<boolean> => {
    try {
      // Check if accounts exist
      const sender = await DatabaseService.getCustomerByAccountNumber(fromAccountNumber);
      const recipient = await DatabaseService.getCustomerByAccountNumber(toAccountNumber);
      
      if (!sender) {
        throw new Error('Sender account not found');
      }
      
      if (!recipient) {
        throw new Error('Recipient account not found');
      }
      
      if (sender.balance < amount) {
        throw new Error('Insufficient funds');
      }
      
      // Begin a transaction with Supabase
      // Note: Supabase doesn't support transactions via API directly, so we'll do multiple operations
      
      // Update sender's balance
      const { error: senderError } = await supabase
        .from('customers')
        .update({ balance: sender.balance - amount })
        .eq('id', sender.id);
        
      if (senderError) {
        console.error('Error updating sender balance:', senderError);
        throw senderError;
      }
      
      // Update recipient's balance
      const { error: recipientError } = await supabase
        .from('customers')
        .update({ balance: recipient.balance + amount })
        .eq('id', recipient.id);
        
      if (recipientError) {
        console.error('Error updating recipient balance:', recipientError);
        // Should ideally roll back the sender update here
        throw recipientError;
      }
      
      // Create transaction record for sender
      const { error: senderTransactionError } = await supabase
        .from('transactions')
        .insert([{
          customer_id: sender.id,
          amount: -amount,
          description: `Transfer to ${toAccountNumber}: ${description}`,
          type: 'transfer'
        }]);
        
      if (senderTransactionError) {
        console.error('Error creating sender transaction:', senderTransactionError);
      }
      
      // Create transaction record for recipient
      const { error: recipientTransactionError } = await supabase
        .from('transactions')
        .insert([{
          customer_id: recipient.id,
          amount: amount,
          description: `Transfer from ${fromAccountNumber}: ${description}`,
          type: 'transfer'
        }]);
        
      if (recipientTransactionError) {
        console.error('Error creating recipient transaction:', recipientTransactionError);
      }
      
      return true;
    } catch (error) {
      console.error('Transfer failed:', error);
      throw error;
    }
  },

  // Update customer
  updateCustomer: async (customer: Customer): Promise<Customer> => {
    try {
      const { error } = await supabase
        .from('customers')
        .update({
          name: customer.name,
          email: customer.email,
          account_number: customer.accountNumber,
          balance: customer.balance,
          last_login: new Date().toISOString()
        })
        .eq('id', customer.id);
        
      if (error) {
        console.error('Error updating customer:', error);
        throw error;
      }
      
      return customer;
    } catch (error) {
      console.error('Failed to update customer:', error);
      throw error;
    }
  },

  // Delete customer
  deleteCustomer: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', id);
        
      if (error) {
        console.error('Error deleting customer:', error);
        throw error;
      }
      
      return true;
    } catch (error) {
      console.error('Failed to delete customer:', error);
      throw error;
    }
  }
};
