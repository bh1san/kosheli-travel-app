
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';

function ContactForm() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const itemName = searchParams.get('item');
  const itemPrice = searchParams.get('price');
  const itemType = searchParams.get('type');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      bookingItem: itemName,
      bookingPrice: itemPrice,
      bookingType: itemType,
    };

    // In a real app, this would be a server action that sends an email.
    console.log('New Booking Submission:', data);

    toast({
      title: 'Booking Inquiry Sent!',
      description: "Thank you for your interest. We will get back to you shortly.",
    });

    // Optionally reset the form
    (event.target as HTMLFormElement).reset();
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-center">Contact Us for Booking</CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Fill out the form below and we'll get back to you to finalize your booking.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {itemName && (
          <div className="mb-6 p-4 bg-primary/10 rounded-lg">
            <h3 className="font-semibold text-lg text-primary">Booking Details</h3>
            <p><span className="font-semibold">Item:</span> {itemName}</p>
            {itemPrice && <p><span className="font-semibold">Price:</span> {itemPrice} AED</p>}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" required />
            </div>
          </div>
          <div className="space-y-1">
            <Label htmlFor="phone">Phone Number (Optional)</Label>
            <Input id="phone" name="phone" type="tel" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="message">Your Message</Label>
            <Textarea id="message" name="message" placeholder="Any special requests or questions?" required />
          </div>
          <Button type="submit" className="w-full">
            <Send size={18} className="mr-2" />
            Submit Inquiry
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}


export default function ContactPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <section className="text-center py-8">
          <h1 className="text-4xl font-bold font-headline text-primary">Book Your Adventure</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We're excited to help you plan your trip. Let us know your details to get started.
          </p>
        </section>
        
        <Suspense fallback={<div>Loading form...</div>}>
          <ContactForm />
        </Suspense>
      </div>
    </MainLayout>
  );
}
