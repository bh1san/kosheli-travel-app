
'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Edit, Trash2 } from 'lucide-react';

// In a real app, this data would come from your user management system (e.g., Firebase Auth)
const mockUsers = [
    { id: 'USR001', name: 'John Doe', email: 'john.doe@example.com', role: 'Customer', joinedDate: '2024-01-15' },
    { id: 'USR002', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Customer', joinedDate: '2024-02-20' },
    { id: 'USR003', name: 'Admin User', email: 'admin@kosheli.com', role: 'Admin', joinedDate: '2024-01-01' },
];


export default function AdminUsersPage() {
  // User state and handlers would be here in a real app
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">Manage Users</h1>
        {/* Add User button would go here */}
      </div>

      <div className="bg-card p-4 rounded-lg shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.joinedDate}</TableCell>
                <TableCell className="space-x-2">
                   <Button variant="outline" size="icon" disabled><Edit size={16} /></Button>
                   <Button variant="destructive" size="icon" disabled><Trash2 size={16} /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
