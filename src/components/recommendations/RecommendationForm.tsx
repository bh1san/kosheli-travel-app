'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Calendar, DollarSign, ListChecks } from 'lucide-react';

const recommendationFormSchema = z.object({
  travelDates: z.string().min(1, { message: 'Travel dates are required.' }),
  budget: z.coerce.number().min(0, { message: 'Budget must be a positive number.' }),
  interests: z.string().min(1, { message: 'Please list at least one interest.' }),
});

type RecommendationFormValues = z.infer<typeof recommendationFormSchema>;

interface RecommendationFormProps {
  onSubmit: (data: RecommendationFormValues) => void;
  isLoading: boolean;
}

export function RecommendationForm({ onSubmit, isLoading }: RecommendationFormProps) {
  const form = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationFormSchema),
    defaultValues: {
      travelDates: '',
      budget: undefined, // Let placeholder show
      interests: '',
    },
  });

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-headline text-center flex items-center justify-center gap-2">
          <Sparkles className="text-primary h-7 w-7" />
          Get Personalized Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="travelDates"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><Calendar size={16}/>Travel Dates</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 2024-12-25 to 2025-01-05" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="budget"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><DollarSign size={16}/>Budget (USD)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 1500" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="interests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1"><ListChecks size={16}/>Interests</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., history, beaches, nightlife, adventure sports"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Getting Recommendations...
                </>
              ) : (
                <>
                  <Sparkles size={18} className="mr-2" />
                  Find My Trip
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
