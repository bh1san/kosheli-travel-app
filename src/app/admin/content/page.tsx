
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const HERO_IMAGE_STORAGE_KEY = 'heroImageUrl';

export default function AdminContentPage() {
  const [heroImageUrl, setHeroImageUrl] = useState('https://placehold.co/1200x800.png');
  const { toast } = useToast();

  useEffect(() => {
    const savedUrl = localStorage.getItem(HERO_IMAGE_STORAGE_KEY);
    if (savedUrl) {
      setHeroImageUrl(savedUrl);
    }
  }, []);

  const handleUpdateHeroImage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newUrl = formData.get('heroImageUrl') as string;
    
    if (newUrl) {
      setHeroImageUrl(newUrl);
      localStorage.setItem(HERO_IMAGE_STORAGE_KEY, newUrl);
      toast({
        title: 'Content Updated',
        description: 'The hero banner image has been updated successfully.',
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Manage Site Content</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Homepage Hero Banner</CardTitle>
          <CardDescription>Update the main image on the homepage. Paste an image URL below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Current Image Preview:</Label>
            <div className="mt-2 rounded-lg overflow-hidden border aspect-video max-w-lg relative">
              <Image src={heroImageUrl} alt="Hero Banner Preview" layout="fill" objectFit="cover" key={heroImageUrl} />
            </div>
          </div>
          <form onSubmit={handleUpdateHeroImage} className="space-y-2">
            <Label htmlFor="heroImageUrl">New Image URL</Label>
            <div className="flex gap-2">
              <Input id="heroImageUrl" name="heroImageUrl" type="url" placeholder="https://..." required defaultValue={heroImageUrl} />
              <Button type="submit">Update Image</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Placeholder for other content management, e.g., activity/promotion images */}
      <Card>
        <CardHeader>
          <CardTitle>Other Images</CardTitle>
          <CardDescription>Management for other images can be added here.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This section is a placeholder for future functionality.</p>
        </CardContent>
      </Card>
    </div>
  );
}
