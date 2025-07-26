
'use client';

import { useState } from 'react';
import { mockVisas } from '@/lib/mockData';
import type { Visa } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function AdminVisaPage() {
  const [visas, setVisas] = useState<Visa[]>(mockVisas);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVisa, setEditingVisa] = useState<Visa | null>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const visaData: Omit<Visa, 'id'> = {
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      destination: formData.get('destination') as 'uae' | 'europe',
    };

    if (editingVisa) {
      setVisas(visas.map(v => v.id === editingVisa.id ? { ...visaData, id: v.id } : v));
    } else {
      const newVisa: Visa = {
        id: `VISA${Math.floor(Math.random() * 1000)}`,
        ...visaData,
      };
      setVisas([...visas, newVisa]);
    }
    
    closeDialog();
  };
  
  const handleEditClick = (visa: Visa) => {
    setEditingVisa(visa);
    setIsDialogOpen(true);
  };

  const handleDeleteVisa = (id: string) => {
    setVisas(visas.filter(v => v.id !== id));
  };
  
  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingVisa(null);
  };

  const openAddDialog = () => {
    setEditingVisa(null);
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">Manage Visa Types</h1>
        <Dialog open={isDialogOpen} onOpenChange={(isOpen) => { if (!isOpen) closeDialog(); else setIsDialogOpen(true); }}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <PlusCircle className="mr-2" /> Add New Visa Type
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingVisa ? 'Edit Visa Type' : 'Add a New Visa Type'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div><Label htmlFor="name">Visa Name</Label><Input id="name" name="name" required defaultValue={editingVisa?.name} /></div>
              <div><Label htmlFor="description">Description</Label><Textarea id="description" name="description" required defaultValue={editingVisa?.description} /></div>
              <div>
                <Label htmlFor="destination">Destination</Label>
                <Select name="destination" defaultValue={editingVisa?.destination || 'uae'}>
                    <SelectTrigger><SelectValue/></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="uae">UAE</SelectItem>
                        <SelectItem value="europe">Europe (Schengen)</SelectItem>
                    </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">{editingVisa ? 'Save Changes' : 'Add Visa Type'}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card p-4 rounded-lg shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Visa Name</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visas.map((visa) => (
              <TableRow key={visa.id}>
                <TableCell>{visa.name}</TableCell>
                <TableCell className="capitalize">{visa.destination}</TableCell>
                <TableCell className="space-x-2">
                   <Button variant="outline" size="icon" onClick={() => handleEditClick(visa)}><Edit size={16} /></Button>
                   <Button variant="destructive" size="icon" onClick={() => handleDeleteVisa(visa.id)}><Trash2 size={16} /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
