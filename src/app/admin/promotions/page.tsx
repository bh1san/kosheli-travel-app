
'use client';

import { useState, useEffect } from 'react';
import { mockPromotions } from '@/lib/mockData';
import type { Promotion } from '@/types';
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
import { format } from 'date-fns';
import Image from 'next/image';
import { getData, savePromotion, deletePromotion } from '@/services/firestore';

export default function AdminPromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null);

  useEffect(() => {
    async function fetchPromotions() {
      setIsLoading(true);
      let data = await getData<Promotion>('promotions');
      if (data.length === 0) {
        await Promise.all(mockPromotions.map(promo => savePromotion(promo)));
        data = mockPromotions;
      }
      setPromotions(data);
      setIsLoading(false);
    }
    fetchPromotions();
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let promoData: Promotion;

    if (editingPromotion) {
      promoData = {
        ...editingPromotion,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        imageUrl: formData.get('imageUrl') as string,
        discountPercentage: Number(formData.get('discountPercentage')),
        discountCode: formData.get('discountCode') as string,
        validUntil: new Date(formData.get('validUntil') as string).toISOString(),
        type: formData.get('type') as 'flight' | 'activity' | 'package',
      };
    } else {
      promoData = {
        id: `PROMO${Date.now()}`,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        imageUrl: formData.get('imageUrl') as string || 'https://placehold.co/600x400.png',
        discountPercentage: Number(formData.get('discountPercentage')),
        discountCode: formData.get('discountCode') as string,
        validUntil: new Date(formData.get('validUntil') as string).toISOString(),
        type: formData.get('type') as 'flight' | 'activity' | 'package',
      };
    }
    
    await savePromotion(promoData);
    const updatedPromotions = await getData<Promotion>('promotions');
    setPromotions(updatedPromotions);
    
    closeDialog();
  };

  const handleEditClick = (promotion: Promotion) => {
    setEditingPromotion(promotion);
    setIsDialogOpen(true);
  };

  const handleDeletePromotion = async (id: string) => {
     if(confirm('Are you sure you want to delete this promotion?')) {
        await deletePromotion(id);
        setPromotions(promotions.filter(p => p.id !== id));
     }
  };
  
  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingPromotion(null);
  };

  const openAddDialog = () => {
    setEditingPromotion(null);
    setIsDialogOpen(true);
  };

  const formatDateForInput = (dateString: string | undefined) => {
    if (!dateString) return '';
    return format(new Date(dateString), 'yyyy-MM-dd');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">Manage Promotions</h1>
        <Dialog open={isDialogOpen} onOpenChange={(isOpen) => {if(!isOpen) closeDialog()}}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <PlusCircle className="mr-2" /> Add New Promotion
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingPromotion ? 'Edit Promotion' : 'Add a New Promotion'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div><Label htmlFor="title">Title</Label><Input id="title" name="title" required defaultValue={editingPromotion?.title}/></div>
              <div><Label htmlFor="description">Description</Label><Textarea id="description" name="description" required defaultValue={editingPromotion?.description} /></div>
              <div><Label htmlFor="imageUrl">Image URL</Label><Input id="imageUrl" name="imageUrl" placeholder="https://placehold.co/600x400.png" defaultValue={editingPromotion?.imageUrl} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label htmlFor="discountPercentage">Discount %</Label><Input id="discountPercentage" name="discountPercentage" type="number" defaultValue={editingPromotion?.discountPercentage} /></div>
                <div><Label htmlFor="discountCode">Discount Code</Label><Input id="discountCode" name="discountCode" defaultValue={editingPromotion?.discountCode} /></div>
                <div><Label htmlFor="validUntil">Valid Until</Label><Input id="validUntil" name="validUntil" type="date" required defaultValue={formatDateForInput(editingPromotion?.validUntil)} /></div>
                <div>
                    <Label htmlFor="type">Type</Label>
                     <Select name="type" defaultValue={editingPromotion?.type || 'package'}>
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="flight">Flight</SelectItem>
                            <SelectItem value="activity">Activity</SelectItem>
                            <SelectItem value="package">Package</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
              </div>
              <Button type="submit" className="w-full">{editingPromotion ? 'Save Changes' : 'Add Promotion'}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card p-4 rounded-lg shadow-md">
        {isLoading ? (
          <p>Loading promotions...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Valid Until</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promotions.map((promo) => (
                <TableRow key={promo.id}>
                  <TableCell>
                    <Image src={promo.imageUrl} alt={promo.title} width={80} height={50} className="rounded-md object-cover" key={promo.imageUrl}/>
                  </TableCell>
                  <TableCell>{promo.title}</TableCell>
                  <TableCell>{promo.type}</TableCell>
                  <TableCell>{promo.discountPercentage ? `${promo.discountPercentage}%` : 'N/A'}</TableCell>
                  <TableCell>{new Date(promo.validUntil).toLocaleDateString()}</TableCell>
                  <TableCell className="space-x-2">
                     <Button variant="outline" size="icon" onClick={() => handleEditClick(promo)}><Edit size={16} /></Button>
                     <Button variant="destructive" size="icon" onClick={() => handleDeletePromotion(promo.id)}><Trash2 size={16} /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
