
'use client';

import { Suspense } from 'react';
import { FlightList } from '@/components/flights/FlightList';
import { MainLayout } from '@/components/layout/MainLayout';
import { FlightSearchForm } from '@/components/flights/FlightSearchForm';

function SearchResults() {
  const searchParams = typeof window !== 'undefined' 
    ? new URLSearchParams(window.location.search) 
    : new URLSearchParams();
    
  const departure = searchParams.get('from') || '';
  const destination = searchParams.get('to') || '';
  const date = searchParams.get('date') || '';

  return (
    <>
      <section className="bg-card p-6 rounded-lg shadow-md">
        <FlightSearchForm initialState={{ departure, destination, date }}/>
      </section>
      
      <section>
        <h2 className="text-3xl font-headline font-semibold mb-6 text-center md:text-left">Available Flights</h2>
        <FlightList 
          departureQuery={departure}
          destinationQuery={destination}
          dateQuery={date}
        />
      </section>
    </>
  );
}

export default function FlightsPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <section className="text-center py-8 bg-card shadow-md rounded-lg">
          <h1 className="text-4xl font-bold font-headline text-primary">Find Your Perfect Flight</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore a wide range of flights to Dubai and other destinations. Enter your details to start your journey.
          </p>
        </section>

        <Suspense fallback={<div>Loading...</div>}>
          <SearchResults />
        </Suspense>
      </div>
    </MainLayout>
  );
}
