
// Mock database service that simulates customer data storage
// In a real application, this would connect to a backend database

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

// Mock database of customers
const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    accountNumber: '1234567890',
    balance: 5420.50,
    lastLogin: new Date('2023-10-15T08:30:00'),
    transactions: [
      {
        id: 't1',
        date: new Date('2023-10-10'),
        amount: 500,
        description: 'Salary',
        type: 'deposit',
      },
      {
        id: 't2',
        date: new Date('2023-10-12'),
        amount: 120.50,
        description: 'Grocery shopping',
        type: 'withdrawal',
      },
    ],
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    accountNumber: '0987654321',
    balance: 12750.75,
    lastLogin: new Date('2023-10-16T14:20:00'),
    transactions: [
      {
        id: 't3',
        date: new Date('2023-10-05'),
        amount: 1200,
        description: 'Freelance payment',
        type: 'deposit',
      },
      {
        id: 't4',
        date: new Date('2023-10-14'),
        amount: 450,
        description: 'Rent payment',
        type: 'withdrawal',
      },
    ],
  },
  {
    id: '3',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    accountNumber: '5678901234',
    balance: 8920.25,
    lastLogin: new Date('2023-10-14T11:45:00'),
    transactions: [
      {
        id: 't5',
        date: new Date('2023-10-08'),
        amount: 2500,
        description: 'Bonus',
        type: 'deposit',
      },
      {
        id: 't6',
        date: new Date('2023-10-11'),
        amount: 1000,
        description: 'Transfer to savings',
        type: 'transfer',
      },
    ],
  },
];

// Service methods
export const DatabaseService = {
  // Get all customers
  getAllCustomers: (): Promise<Customer[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCustomers);
      }, 500); // Simulate network delay
    });
  },

  // Get customer by ID
  getCustomerById: (id: string): Promise<Customer | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const customer = mockCustomers.find(c => c.id === id);
        resolve(customer);
      }, 300);
    });
  },

  // Add customer (in a real app, this would persist to a database)
  addCustomer: (customer: Omit<Customer, 'id'>): Promise<Customer> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newCustomer = {
          ...customer,
          id: `${mockCustomers.length + 1}`,
        };
        mockCustomers.push(newCustomer as Customer);
        resolve(newCustomer as Customer);
      }, 500);
    });
  },

  // Update customer
  updateCustomer: (customer: Customer): Promise<Customer> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = mockCustomers.findIndex(c => c.id === customer.id);
        if (index !== -1) {
          mockCustomers[index] = customer;
          resolve(customer);
        } else {
          reject(new Error('Customer not found'));
        }
      }, 500);
    });
  },

  // Delete customer
  deleteCustomer: (id: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = mockCustomers.findIndex(c => c.id === id);
        if (index !== -1) {
          mockCustomers.splice(index, 1);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  },
};
