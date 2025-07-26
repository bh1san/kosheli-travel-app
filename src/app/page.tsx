
'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { mockPromotions, mockActivities, mockFlights, mockTeamMembers } from '@/lib/mockData';
import { PromotionList } from '@/components/promotions/PromotionList';
import { ActivityCard } from '@/components/activities/ActivityCard';
import { FlightCard } from '@/components/flights/FlightCard';
import { Plane, MapPin, Sparkles } from 'lucide-react';
import { FlightSearchForm } from '@/components/flights/FlightSearchForm';
import { TeamMemberCard } from '@/components/team/TeamMemberCard';

const HERO_IMAGE_STORAGE_KEY = 'heroImageUrl';
const DEFAULT_HERO_IMAGE = 'https://placehold.co/1200x800.png';

export default function HomePage() {
  const [heroImageUrl, setHeroImageUrl] = useState(DEFAULT_HERO_IMAGE);

  useEffect(() => {
    const savedUrl = localStorage.getItem(HERO_IMAGE_STORAGE_KEY);
    if (savedUrl) {
      setHeroImageUrl(savedUrl);
    }
  }, []);

  const featuredPromotions = mockPromotions.slice(0, 3);
  const featuredActivities = mockActivities.slice(0, 3);
  
  // Find the cheapest flight from Dubai to Nepal (Kathmandu)
  const flightsToNepal = mockFlights.filter(
    (flight) =>
      flight.departureAirportCode === 'DXB' &&
      flight.arrivalAirportCode === 'KTM'
  );
  
  const cheapestFlightToNepal = flightsToNepal.length > 0 
    ? flightsToNepal.reduce((cheapest, current) => 
        current.price < cheapest.price ? current : cheapest
      ) 
    : null;

  const teamMembers = mockTeamMembers.slice(0, 3);

  return (
    <MainLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="relative h-[calc(100vh-15rem)] min-h-[400px] md:h-[calc(100vh-20rem)] rounded-xl overflow-hidden shadow-2xl">
          <Image 
            src={heroImageUrl} 
            alt="Beautiful view of Dubai"
            layout="fill"
            objectFit="cover"
            priority
            data-ai-hint="dubai cityscape"
            key={heroImageUrl}
          />
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-headline text-white drop-shadow-lg">
              Discover Dubai with <span className="text-primary">Kosheli Travel</span>
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-slate-200 max-w-2xl drop-shadow-md">
              Your ultimate gateway to unforgettable flights and adventures in the heart of the Emirates.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/flights">
                  <Plane size={20} className="mr-2" />
                  Book Flights
                </Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/activities">
                  <MapPin size={20} className="mr-2" />
                  Explore Activities
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Flight Search Section */}
        <section className="-mt-20 relative z-10 mx-auto w-full max-w-5xl px-4">
          <FlightSearchForm />
           <p className="text-center text-xs text-muted-foreground mt-2">
            Live prices as shown on <Link href="https://www.skyscanner.ae/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">skyscanner.ae</Link>
          </p>
        </section>

        {/* Featured Promotions */}
        <PromotionList promotions={featuredPromotions} title="Today's Top Deals" />

        {/* Featured Activities */}
        <section className="py-8">
          <h2 className="text-3xl font-headline font-semibold mb-6 text-center">Popular Dubai Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredActivities.map(activity => (
              <ActivityCard key={activity.id} activity={activity} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/activities">View All Activities</Link>
            </Button>
          </div>
        </section>
        
        {/* Featured Flights */}
         <section className="py-8">
          <h2 className="text-3xl font-headline font-semibold mb-6 text-center">Featured Flight to Nepal</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {cheapestFlightToNepal ? (
              <FlightCard key={cheapestFlightToNepal.id} flight={cheapestFlightToNepal} />
            ) : (
              <p className="text-center md:col-span-2 text-muted-foreground">No flights to Nepal are available at this time.</p>
            )}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/flights">Search All Flights</Link>
            </Button>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-8">
          <h2 className="text-3xl font-headline font-semibold mb-6 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map(member => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* Personalized Recommendations CTA */}
        <section className="py-12 bg-card rounded-lg shadow-lg text-center">
          <Sparkles className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-headline font-semibold mb-3">Need Trip Ideas?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Let our AI assistant craft personalized flight and activity suggestions based on your preferences.
          </p>
          <Button asChild size="lg">
            <Link href="/recommendations">Get Personalized Tips</Link>
          </Button>
        </section>
      </div>
    </MainLayout>
  );
}
