
import React, { useState } from 'react';
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
import { Eye, ArrowUpDown, Download, Filter, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CustomerDataTableProps {
  customers: Customer[];
  onViewCustomer: (customerId: string) => void;
}

const CustomerDataTable: React.FC<CustomerDataTableProps> = ({ 
  customers,
  onViewCustomer 
}) => {
  const [sortField, setSortField] = useState<keyof Customer | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const handleSort = (field: keyof Customer) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const sortedCustomers = [...customers].sort((a, b) => {
    if (!sortField) return 0;
    
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue) 
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  return (
    <Card className="shadow-lg border-0 overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b flex justify-between items-center">
        <h3 className="text-lg font-semibold text-banking-DEFAULT">Customer Accounts</h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="text-xs flex items-center gap-1 bg-white">
            <Filter className="h-3 w-3" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="text-xs flex items-center gap-1 bg-white">
            <Download className="h-3 w-3" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="text-xs flex items-center gap-1 bg-white">
            <RefreshCw className="h-3 w-3" />
            Refresh
          </Button>
        </div>
      </div>
      <div className="rounded-md border-0">
        <Table>
          <TableHeader className="bg-gradient-to-r from-gray-50 to-blue-50">
            <TableRow>
              <TableHead 
                className="cursor-pointer hover:bg-blue-50/50 transition-colors"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Name
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center">
                  Account Number
                </div>
              </TableHead>
              <TableHead className="hidden md:table-cell cursor-pointer hover:bg-blue-50/50 transition-colors"
                onClick={() => handleSort('email')}>
                <div className="flex items-center">
                  Email
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="text-right cursor-pointer hover:bg-blue-50/50 transition-colors"
                onClick={() => handleSort('balance')}>
                <div className="flex items-center justify-end">
                  Balance
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="hidden md:table-cell cursor-pointer hover:bg-blue-50/50 transition-colors"
                onClick={() => handleSort('lastLogin')}>
                <div className="flex items-center">
                  Last Login
                  <ArrowUpDown className="ml-1 h-3 w-3" />
                </div>
              </TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 bg-gray-50/50">
                  <div className="flex flex-col items-center justify-center text-banking-muted">
                    <RefreshCw className="h-8 w-8 mb-2 opacity-20" />
                    <p className="font-medium">No customer data available</p>
                    <p className="text-xs mt-1">Try refreshing or changing filters</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              sortedCustomers.map((customer) => (
                <TableRow key={customer.id} className="hover:bg-blue-50/30 transition-colors">
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell className="font-mono text-xs encrypted-text bg-banking-light/30 rounded px-2 py-1 mx-1 inline-block">
                    {customer.accountNumber}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{customer.email}</TableCell>
                  <TableCell className="text-right font-medium">
                    ${customer.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-banking-muted text-sm">
                    {formatDistance(new Date(customer.lastLogin), new Date(), { addSuffix: true })}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      onClick={() => onViewCustomer(customer.id)}
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 rounded-full bg-blue-50 hover:bg-blue-100 text-banking-accent"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {sortedCustomers.length > 0 && (
        <div className="p-4 border-t bg-gradient-to-r from-gray-50 to-blue-50 text-sm text-banking-muted flex justify-between items-center">
          <span>Showing {sortedCustomers.length} customers</span>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              1
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-banking-muted">
              2
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-banking-muted">
              3
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default CustomerDataTable;
