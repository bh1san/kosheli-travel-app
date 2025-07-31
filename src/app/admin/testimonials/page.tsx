

'use client';

import { useState, useEffect } from 'react';
import type { Testimonial } from '@/types';
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
import Image from 'next/image';
import { getData, saveTestimonial, deleteTestimonial } from '@/services/firestore';
import { mockTestimonials } from '@/lib/mockData';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      setIsLoading(true);
      let data = await getData<Testimonial>('testimonials');
      if (data.length === 0) {
        // If no data, seed with mock data
        await Promise.all(mockTestimonials.map(testimonial => saveTestimonial(testimonial)));
        data = mockTestimonials;
      }
      setTestimonials(data);
      setIsLoading(false);
    }
    fetchTestimonials();
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    let testimonialData: Testimonial;

    if (editingTestimonial) {
      testimonialData = {
        ...editingTestimonial,
        name: formData.get('name') as string,
        location: formData.get('location') as string,
        quote: formData.get('quote') as string,
        imageUrl: formData.get('imageUrl') as string,
      };
    } else {
      testimonialData = {
        id: `TEST${Date.now()}`,
        name: formData.get('name') as string,
        location: formData.get('location') as string,
        quote: formData.get('quote') as string,
        imageUrl: formData.get('imageUrl') as string || 'https://placehold.co/100x100.png',
      };
    }

    await saveTestimonial(testimonialData);
    
    // Refresh data
    const updatedTestimonials = await getData<Testimonial>('testimonials');
    setTestimonials(updatedTestimonials);
    
    closeDialog();
  };
  
  const handleEditClick = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setIsDialogOpen(true);
  };

  const handleDeleteTestimonial = async (id: string) => {
    if(confirm('Are you sure you want to delete this testimonial?')) {
      await deleteTestimonial(id);
      setTestimonials(testimonials.filter(t => t.id !== id));
    }
  };
  
  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingTestimonial(null);
  };
  
  const openAddDialog = () => {
    setEditingTestimonial(null);
    setIsDialogOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">Manage Testimonials</h1>
        <Dialog open={isDialogOpen} onOpenChange={(isOpen) => { if(!isOpen) closeDialog()}}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <PlusCircle className="mr-2" /> Add New Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add a New Testimonial'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div><Label htmlFor="name">Name</Label><Input id="name" name="name" required defaultValue={editingTestimonial?.name} /></div>
              <div><Label htmlFor="location">Location (e.g. city, country)</Label><Input id="location" name="location" required defaultValue={editingTestimonial?.location} /></div>
              <div><Label htmlFor="quote">Quote</Label><Textarea id="quote" name="quote" rows={5} required defaultValue={editingTestimonial?.quote} /></div>
              <div><Label htmlFor="imageUrl">Image URL</Label><Input id="imageUrl" name="imageUrl" placeholder="https://placehold.co/100x100.png" defaultValue={editingTestimonial?.imageUrl} /></div>
              <Button type="submit" className="w-full">{editingTestimonial ? 'Save Changes' : 'Add Testimonial'}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card p-4 rounded-lg shadow-md">
        {isLoading ? (
          <p>Loading testimonials...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Quote</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((testimonial) => (
                <TableRow key={testimonial.id}>
                  <TableCell>
                    <Image src={testimonial.imageUrl} alt={testimonial.name} width={60} height={60} className="rounded-full object-cover" key={testimonial.imageUrl}/>
                  </TableCell>
                  <TableCell>{testimonial.name}</TableCell>
                  <TableCell className="max-w-sm truncate">{testimonial.quote}</TableCell>
                  <TableCell className="space-x-2">
                     <Button variant="outline" size="icon" onClick={() => handleEditClick(testimonial)}><Edit size={16} /></Button>
                     <Button variant="destructive" size="icon" onClick={() => handleDeleteTestimonial(testimonial.id)}><Trash2 size={16} /></Button>
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
