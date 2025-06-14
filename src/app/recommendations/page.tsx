'use client';

import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { RecommendationForm } from '@/components/recommendations/RecommendationForm';
import { RecommendationResults } from '@/components/recommendations/RecommendationResults';
import getPersonalizedRecommendations from '@/actions/recommendations'; // Changed to default import
import type { PersonalizedRecommendationsInput, PersonalizedRecommendationsOutput } from '@/ai/flows/personalized-recommendations';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

export default function RecommendationsPage() {
  const [results, setResults] = useState<PersonalizedRecommendationsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: PersonalizedRecommendationsInput) => {
    setIsLoading(true);
    setError(null);
    setResults(null);
    
    const response = await getPersonalizedRecommendations(data);

    if ('error' in response) {
      setError(response.error);
    } else {
      setResults(response);
    }
    setIsLoading(false);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <section className="text-center py-8 bg-card shadow-md rounded-lg">
          <h1 className="text-4xl font-bold font-headline text-primary">Personalized Travel Planner</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Let our AI craft the perfect Dubai itinerary for you. Just tell us your preferences!
          </p>
        </section>

        <RecommendationForm onSubmit={handleSubmit} isLoading={isLoading} />

        {error && (
          <Alert variant="destructive" className="max-w-lg mx-auto">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {results && <RecommendationResults results={results} />}
      </div>
    </MainLayout>
  );
}
