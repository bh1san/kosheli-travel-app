
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { getDocData, saveDocData } from '@/services/firestore';
import { Trash2 } from 'lucide-react';
import { arrayRemove, arrayUnion } from 'firebase/firestore';

const DEFAULT_LOGO_IMAGE = '/images/logo.png';
const SETTINGS_DOC_ID = 'siteSettings';

interface HeroImage {
  id: string;
  url: string;
  dataAiHint?: string;
}

export default function AdminContentPage() {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [logoUrl, setLogoUrl] = useState(DEFAULT_LOGO_IMAGE);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSettings() {
      setIsLoading(true);
      const settings = await getDocData('settings', SETTINGS_DOC_ID);
      if (settings) {
        setHeroImages(settings.heroImages || []);
        setLogoUrl(settings.logoUrl || DEFAULT_LOGO_IMAGE);
      }
      setIsLoading(false);
    }
    fetchSettings();
  }, []);

  const handleAddHeroImage = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newUrl = formData.get('heroImageUrl') as string;
    
    if (newUrl) {
      const newImage: HeroImage = {
        id: `img-${Date.now()}`,
        url: newUrl,
        dataAiHint: 'dubai cityscape', // Default hint
      };
      
      await saveDocData('settings', SETTINGS_DOC_ID, { 
        heroImages: arrayUnion(newImage) 
      });

      setHeroImages(prev => [...prev, newImage]);
      
      toast({
        title: 'Image Added',
        description: 'The new hero banner image has been added.',
      });
      (event.target as HTMLFormElement).reset();
    }
  };

  const handleDeleteHeroImage = async (imageToDelete: HeroImage) => {
    if (confirm('Are you sure you want to delete this banner image?')) {
        await saveDocData('settings', SETTINGS_DOC_ID, {
            heroImages: arrayRemove(imageToDelete)
        });
        setHeroImages(prev => prev.filter(img => img.id !== imageToDelete.id));
        toast({
            title: 'Image Deleted',
            description: 'The banner image has been removed.',
            variant: 'destructive'
        });
    }
  }

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
          <CardDescription>Manage the images that appear in your homepage slider.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label>Current Banner Images:</Label>
            {isLoading ? (
                <p>Loading images...</p>
            ) : heroImages.length > 0 ? (
                <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {heroImages.map((image) => (
                    <div key={image.id} className="relative group border rounded-lg overflow-hidden">
                    <Image src={image.url} alt="Hero Banner Preview" width={300} height={200} className="object-cover aspect-video" />
                    <Button 
                        variant="destructive" 
                        size="icon" 
                        className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleDeleteHeroImage(image)}
                    >
                        <Trash2 size={16} />
                        <span className="sr-only">Delete Image</span>
                    </Button>
                    </div>
                ))}
                </div>
            ) : (
                <p className="text-muted-foreground mt-2">No custom banner images uploaded. The site will use default placeholders.</p>
            )}
          </div>
          <form onSubmit={handleAddHeroImage} className="space-y-2 pt-4 border-t">
            <Label htmlFor="heroImageUrl">Add New Image URL</Label>
            <div className="flex gap-2">
              <Input id="heroImageUrl" name="heroImageUrl" type="url" placeholder="https://..." required />
              <Button type="submit">Add Image</Button>
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
