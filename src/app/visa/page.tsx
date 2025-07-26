
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Plane, User, Mail, Phone, Globe, FileText, Calendar, Upload } from 'lucide-react';

const visaFormSchema = z.object({
  fullName: z.string().min(1, 'Full name is required.'),
  email: z.string().email('Invalid email address.'),
  phone: z.string().optional(),
  nationality: z.string().min(1, 'Nationality is required.'),
  destination: z.enum(['uae', 'europe'], { required_error: 'Please select a destination.' }),
  visaType: z.string().min(1, 'Visa type is required.'),
  travelDates: z.string().min(1, 'Travel dates are required.'),
  passportCopy: z.any().optional(), // In a real app, handle file uploads securely
  notes: z.string().optional(),
});

type VisaFormValues = z.infer<typeof visaFormSchema>;

export default function VisaPage() {
  const { toast } = useToast();

  const form = useForm<VisaFormValues>({
    resolver: zodResolver(visaFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      nationality: '',
      visaType: '',
      travelDates: '',
      notes: '',
    },
  });

  const onSubmit = (data: VisaFormValues) => {
    // In a real application, this would be a server action
    // that securely handles form data and file uploads.
    console.log('New Visa Application:', data);

    toast({
      title: 'Visa Application Submitted!',
      description: "Thank you for submitting your application. We will review it and contact you shortly.",
    });

    form.reset();
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <section className="text-center py-8 bg-card shadow-md rounded-lg">
          <h1 className="text-4xl font-bold font-headline text-primary">Visa Application Services</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Apply for your travel visa to the UAE or European countries with our expert assistance.
          </p>
        </section>

        <Card className="w-full max-w-3xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-center">Visa Application Form</CardTitle>
            <CardDescription className="text-center">Please fill out the form accurately.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><User size={14} className="mr-1" /> Full Name</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Globe size={14} className="mr-1" /> Nationality</FormLabel>
                        <FormControl><Input {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Mail size={14} className="mr-1" /> Email Address</FormLabel>
                        <FormControl><Input type="email" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Phone size={14} className="mr-1" /> Phone Number</FormLabel>
                        <FormControl><Input type="tel" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="destination"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Plane size={14} className="mr-1" /> Destination</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select a destination" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="uae">United Arab Emirates (UAE)</SelectItem>
                            <SelectItem value="europe">European Countries (Schengen)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="visaType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><FileText size={14} className="mr-1" /> Visa Type</FormLabel>
                        <FormControl><Input placeholder="e.g., Tourist, Business" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="travelDates"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Calendar size={14} className="mr-1" /> Planned Travel Dates</FormLabel>
                        <FormControl><Input placeholder="e.g., 2024-12-10 to 2024-12-20" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <FormField
                    control={form.control}
                    name="passportCopy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center"><Upload size={14} className="mr-1" /> Passport Copy</FormLabel>
                        <FormControl><Input type="file" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Notes</FormLabel>
                      <FormControl><Textarea placeholder="Any additional information or questions?" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">Submit Application</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
