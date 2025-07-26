
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { getDocData, saveDocData } from '@/services/firestore';

const DEFAULT_HERO_IMAGE = 'https://placehold.co/1200x800.png';
const DEFAULT_LOGO_IMAGE = '/images/logo.png';
const SETTINGS_DOC_ID = 'siteSettings';

export default function AdminContentPage() {
  const [heroImageUrl, setHeroImageUrl] = useState(DEFAULT_HERO_IMAGE);
  const [logoUrl, setLogoUrl] = useState(DEFAULT_LOGO_IMAGE);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchSettings() {
      const settings = await getDocData('settings', SETTINGS_DOC_ID);
      if (settings) {
        setHeroImageUrl(settings.heroImageUrl || DEFAULT_HERO_IMAGE);
        setLogoUrl(settings.logoUrl || DEFAULT_LOGO_IMAGE);
      }
    }
    fetchSettings();
  }, []);

  const handleUpdateHeroImage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newUrl = formData.get('heroImageUrl') as string;
    
    if (newUrl) {
      await saveDocData('settings', SETTINGS_DOC_ID, { heroImageUrl: newUrl });
      setHeroImageUrl(newUrl);
      toast({
        title: 'Content Updated',
        description: 'The hero banner image has been updated successfully.',
      });
    }
  };

  const handleUpdateLogo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newUrl = formData.get('logoImageUrl') as string;
    
    if (newUrl) {
      await saveDocData('settings', SETTINGS_DOC_ID, { logoUrl: newUrl });
      setLogoUrl(newUrl);
      toast({
        title: 'Logo Updated',
        description: 'The site logo has been updated successfully.',
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
