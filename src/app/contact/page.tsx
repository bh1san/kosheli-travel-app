
'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Send, MessageSquare } from 'lucide-react';
import { useFormState, useFormStatus } from 'react-dom';
import { submitComment } from '@/actions/testimonials';

function BookingInquiryForm() {
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


function CommentSubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Submitting...' : 'Submit Comment'}
        </Button>
    );
}

function CommentForm() {
    const { toast } = useToast();
    const [state, formAction] = useFormState(async (prevState: any, formData: FormData) => {
        const result = await submitComment(prevState, formData);
        if (result.success) {
            toast({
                title: 'Comment Submitted!',
                description: "Thank you for your feedback. It will be reviewed by our team.",
            });
            // Returning success to reset the form
            return { success: true, message: null };
        }
        return result;
    }, { success: false, message: null });

    // This effect will run when the form is successfully submitted
    // The key is a trick to force the form to re-render and reset
    const formRef = React.useRef<HTMLFormElement>(null);
    React.useEffect(() => {
        if (state.success) {
            formRef.current?.reset();
        }
    }, [state.success]);


    return (
        <Card className="w-full max-w-2xl mx-auto shadow-xl mt-12">
            <CardHeader>
                <CardTitle className="text-2xl font-headline text-center">Leave a Comment</CardTitle>
                <CardDescription className="text-center text-muted-foreground">
                    Share your experience with us! Your feedback may be featured on our homepage.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form ref={formRef} action={formAction} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="commenter-name">Your Name</Label>
                            <Input id="commenter-name" name="name" required />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="commenter-location">Location (e.g., City, Country)</Label>
                            <Input id="commenter-location" name="location" required />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="comment">Your Comment</Label>
                        <Textarea id="comment" name="quote" placeholder="Tell us about your trip..." required />
                    </div>
                    {state.message && !state.success && (
                      <p className="text-sm text-destructive">{state.message}</p>
                    )}
                    <CommentSubmitButton />
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
          <h1 className="text-4xl font-bold font-headline text-primary">Get In Touch</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            We're here to help you plan your trip or answer any questions.
          </p>
        </section>
        
        <Suspense fallback={<div>Loading form...</div>}>
          <BookingInquiryForm />
        </Suspense>
        
        <CommentForm />

      </div>
    </MainLayout>
  );
}
