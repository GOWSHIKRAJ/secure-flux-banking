
import React from 'react';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { Customer } from '@/services/DatabaseService';
import { formatDistance } from 'date-fns';
import { Eye } from 'lucide-react';

interface CustomerDataTableProps {
  customers: Customer[];
  onViewCustomer: (customerId: string) => void;
}

const CustomerDataTable: React.FC<CustomerDataTableProps> = ({ 
  customers,
  onViewCustomer 
}) => {
  return (
    <div className="rounded-md border glass">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Account Number</TableHead>
            <TableHead className="hidden md:table-cell">Email</TableHead>
            <TableHead className="text-right">Balance</TableHead>
            <TableHead className="hidden md:table-cell">Last Login</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                No customer data available
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell className="encrypted-text">{customer.accountNumber}</TableCell>
                <TableCell className="hidden md:table-cell">{customer.email}</TableCell>
                <TableCell className="text-right">
                  ${customer.balance.toFixed(2)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDistance(new Date(customer.lastLogin), new Date(), { addSuffix: true })}
                </TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => onViewCustomer(customer.id)}
                    className="inline-flex items-center justify-center p-1 rounded-full bg-blue-50 hover:bg-blue-100 text-banking-accent"
                  >
                    <Eye className="h-4 w-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerDataTable;
