
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

const HERO_IMAGE_STORAGE_KEY = 'heroImageUrl';
const LOGO_IMAGE_STORAGE_KEY = 'logoImageUrl';
const DEFAULT_LOGO_IMAGE = '/images/logo.png';

export default function AdminContentPage() {
  const [heroImageUrl, setHeroImageUrl] = useState('https://placehold.co/1200x800.png');
  const [logoUrl, setLogoUrl] = useState(DEFAULT_LOGO_IMAGE);
  const { toast } = useToast();

  useEffect(() => {
    const savedHeroUrl = localStorage.getItem(HERO_IMAGE_STORAGE_KEY);
    if (savedHeroUrl) {
      setHeroImageUrl(savedHeroUrl);
    }
    const savedLogoUrl = localStorage.getItem(LOGO_IMAGE_STORAGE_KEY);
    if (savedLogoUrl) {
      setLogoUrl(savedLogoUrl);
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
      // This custom event will be picked up by other components
      window.dispatchEvent(new Event('storage'));
    }
  };

  const handleUpdateLogo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newUrl = formData.get('logoImageUrl') as string;
    
    if (newUrl) {
      setLogoUrl(newUrl);
      localStorage.setItem(LOGO_IMAGE_STORAGE_KEY, newUrl);
      toast({
        title: 'Logo Updated',
        description: 'The site logo has been updated successfully.',
      });
      // This custom event will be picked up by the Logo component
      window.dispatchEvent(new Event('storage'));
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

      <Card>
        <CardHeader>
          <CardTitle>Site Logo</CardTitle>
          <CardDescription>Update the main logo used in the site header. Paste an image URL below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Current Logo Preview:</Label>
            <div className="mt-2 rounded-lg border p-4 bg-muted/30 max-w-sm">
              <Image src={logoUrl} alt="Logo Preview" width={180} height={50} key={logoUrl} />
            </div>
          </div>
          <form onSubmit={handleUpdateLogo} className="space-y-2">
            <Label htmlFor="logoImageUrl">New Logo URL</Label>
            <div className="flex gap-2">
              <Input id="logoImageUrl" name="logoImageUrl" type="url" placeholder="https://..." required defaultValue={logoUrl} />
              <Button type="submit">Update Logo</Button>
            </div>
          </form>
        </CardContent>
      </Card>

    </div>
  );
}
