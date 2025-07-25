
'use client';

import { useState } from 'react';
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

export default function AdminPromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>(mockPromotions);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [promotionType, setPromotionType] = useState<'flight' | 'activity' | 'package'>('package');

  const handleAddPromotion = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newPromotion: Promotion = {
      id: `PROMO${Math.floor(Math.random() * 1000)}`,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      imageUrl: formData.get('imageUrl') as string || 'https://placehold.co/600x400.png',
      discountPercentage: Number(formData.get('discountPercentage')),
      discountCode: formData.get('discountCode') as string,
      validUntil: new Date(formData.get('validUntil') as string).toISOString(),
      type: promotionType,
    };
    setPromotions([...promotions, newPromotion]);
    setIsDialogOpen(false);
  };

  const handleDeletePromotion = (id: string) => {
    setPromotions(promotions.filter(p => p.id !== id));
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">Manage Promotions</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" /> Add New Promotion
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New Promotion</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddPromotion} className="space-y-4">
              <div><Label htmlFor="title">Title</Label><Input id="title" name="title" required /></div>
              <div><Label htmlFor="description">Description</Label><Textarea id="description" name="description" required /></div>
              <div><Label htmlFor="imageUrl">Image URL</Label><Input id="imageUrl" name="imageUrl" placeholder="https://placehold.co/600x400.png" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label htmlFor="discountPercentage">Discount %</Label><Input id="discountPercentage" name="discountPercentage" type="number" /></div>
                <div><Label htmlFor="discountCode">Discount Code</Label><Input id="discountCode" name="discountCode" /></div>
                <div><Label htmlFor="validUntil">Valid Until</Label><Input id="validUntil" name="validUntil" type="date" required /></div>
                <div>
                    <Label htmlFor="type">Type</Label>
                    <Select onValueChange={(value) => setPromotionType(value as any)} defaultValue={promotionType}>
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="flight">Flight</SelectItem>
                            <SelectItem value="activity">Activity</SelectItem>
                            <SelectItem value="package">Package</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
              </div>
              <Button type="submit" className="w-full">Add Promotion</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card p-4 rounded-lg shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
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
                <TableCell>{promo.title}</TableCell>
                <TableCell>{promo.type}</TableCell>
                <TableCell>{promo.discountPercentage ? `${promo.discountPercentage}%` : 'N/A'}</TableCell>
                <TableCell>{new Date(promo.validUntil).toLocaleDateString()}</TableCell>
                <TableCell className="space-x-2">
                   <Button variant="outline" size="icon" disabled><Edit size={16} /></Button>
                   <Button variant="destructive" size="icon" onClick={() => handleDeletePromotion(promo.id)}><Trash2 size={16} /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
