
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Plane, User, Mail, Phone, Globe, FileText, Calendar, Upload, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import applyForVisaAction from '@/actions/visa';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import type { VisaFormValues } from '@/types/visa';
import { visaFormSchema } from '@/types/visa';

const uaeVisaTypes = [
    "Tourist Visa (30/60 Days)",
    "Visit Visa (90 Days)",
    "Transit Visa (48/96 Hours)",
    "Student Visa",
    "Investor Visa",
    "Remote Work Visa",
];

const europeVisaTypes = [
    "Schengen Tourist Visa (Type C)",
    "Business Visa",
    "Visitor Visa (Family/Friends)",
    "Student Visa (Type D)",
    "Work Visa",
];


export default function VisaPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

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

  const fileRef = form.register("passportCopy");

  const onSubmit = async (data: VisaFormValues) => {
    setIsLoading(true);
    setFormError(null);

    const file = data.passportCopy[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const base64String = reader.result as string;
      
      const applicationData = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        nationality: data.nationality,
        destination: data.destination,
        visaType: data.visaType,
        travelDates: data.travelDates,
        notes: data.notes,
        passportDataUri: base64String,
      };

      try {
        const result = await applyForVisaAction(applicationData);

        if (result.error) {
          throw new Error(result.error);
        }
        
        toast({
          title: 'Visa Application Submitted!',
          description: result.confirmationMessage || "We will review it and contact you shortly.",
        });

        form.reset();
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
        setFormError(errorMessage);
        toast({
            variant: "destructive",
            title: "Submission Failed",
            description: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
        setFormError("Failed to read the passport file. Please try again.");
        setIsLoading(false);
    };
    
    reader.readAsDataURL(file);
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

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-headline">Available UAE Visas</CardTitle>
                    <CardDescription>We provide expert processing for various UAE visa types.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {uaeVisaTypes.map(visa => (
                            <li key={visa} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>{visa}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
             <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-headline">Available Europe (Schengen) Visas</CardTitle>
                    <CardDescription>Streamline your application for Schengen area countries.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        {europeVisaTypes.map(visa => (
                            <li key={visa} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>{visa}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </section>

        <Card className="w-full max-w-3xl mx-auto shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-center">Visa Application Form</CardTitle>
            <CardDescription className="text-center">Please fill out the form accurately.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                 {formError && (
                  <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{formError}</AlertDescription>
                  </Alert>
                )}
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
                        <FormControl><Input type="file" {...fileRef} /></FormControl>
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
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Submitting...' : 'Submit Application'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
