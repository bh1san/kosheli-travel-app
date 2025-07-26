
'use client';

import { useState, useEffect } from 'react';
import type { Activity } from '@/types';
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
import { getData, saveActivity, deleteActivity } from '@/services/firestore';
import { mockActivities } from '@/lib/mockData';

export default function AdminActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  useEffect(() => {
    async function fetchActivities() {
      setIsLoading(true);
      let data = await getData<Activity>('activities');
      if (data.length === 0) {
        // If no data, seed with mock data
        await Promise.all(mockActivities.map(activity => saveActivity(activity)));
        data = mockActivities;
      }
      setActivities(data);
      setIsLoading(false);
    }
    fetchActivities();
  }, []);

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    let activityData: Activity;

    if (editingActivity) {
      activityData = {
        ...editingActivity,
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        imageUrl: formData.get('imageUrl') as string,
        price: Number(formData.get('price')),
        location: formData.get('location') as string,
        rating: Number(formData.get('rating')),
        category: formData.get('category') as string,
      };
    } else {
      activityData = {
        id: `ACT${Date.now()}`,
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        imageUrl: formData.get('imageUrl') as string || 'https://placehold.co/600x400.png',
        price: Number(formData.get('price')),
        location: formData.get('location') as string,
        rating: Number(formData.get('rating')),
        category: formData.get('category') as string,
      };
    }

    await saveActivity(activityData);
    
    // Refresh data
    const updatedActivities = await getData<Activity>('activities');
    setActivities(updatedActivities);
    
    closeDialog();
  };
  
  const handleEditClick = (activity: Activity) => {
    setEditingActivity(activity);
    setIsDialogOpen(true);
  };

  const handleDeleteActivity = async (id: string) => {
    if(confirm('Are you sure you want to delete this activity?')) {
      await deleteActivity(id);
      setActivities(activities.filter(a => a.id !== id));
    }
  };
  
  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingActivity(null);
  };
  
  const openAddDialog = () => {
    setEditingActivity(null);
    setIsDialogOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">Manage Activities</h1>
        <Dialog open={isDialogOpen} onOpenChange={(isOpen) => { if(!isOpen) closeDialog()}}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <PlusCircle className="mr-2" /> Add New Activity
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingActivity ? 'Edit Activity' : 'Add a New Activity'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div><Label htmlFor="name">Name</Label><Input id="name" name="name" required defaultValue={editingActivity?.name} /></div>
              <div><Label htmlFor="description">Description</Label><Textarea id="description" name="description" required defaultValue={editingActivity?.description} /></div>
              <div><Label htmlFor="imageUrl">Image URL</Label><Input id="imageUrl" name="imageUrl" placeholder="https://placehold.co/600x400.png" defaultValue={editingActivity?.imageUrl} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><Label htmlFor="price">Price (AED)</Label><Input id="price" name="price" type="number" required defaultValue={editingActivity?.price} /></div>
                <div><Label htmlFor="location">Location</Label><Input id="location" name="location" required defaultValue={editingActivity?.location} /></div>
                <div><Label htmlFor="rating">Rating (1-5)</Label><Input id="rating" name="rating" type="number" step="0.1" min="1" max="5" required defaultValue={editingActivity?.rating} /></div>
                <div><Label htmlFor="category">Category</Label><Input id="category" name="category" required defaultValue={editingActivity?.category} /></div>
              </div>
              <Button type="submit" className="w-full">{editingActivity ? 'Save Changes' : 'Add Activity'}</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card p-4 rounded-lg shadow-md">
        {isLoading ? (
          <p>Loading activities...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>
                    <Image src={activity.imageUrl} alt={activity.name} width={80} height={50} className="rounded-md object-cover" key={activity.imageUrl}/>
                  </TableCell>
                  <TableCell>{activity.name}</TableCell>
                  <TableCell>{activity.category}</TableCell>
                  <TableCell>{activity.price.toFixed(2)} AED</TableCell>
                  <TableCell className="space-x-2">
                     <Button variant="outline" size="icon" onClick={() => handleEditClick(activity)}><Edit size={16} /></Button>
                     <Button variant="destructive" size="icon" onClick={() => handleDeleteActivity(activity.id)}><Trash2 size={16} /></Button>
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
