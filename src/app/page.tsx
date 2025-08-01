

'use client';

import { useState, useEffect, useRef } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { mockFlights } from '@/lib/mockData'; // Flights are still mock
import type { Promotion, Activity, Flight, TeamMember } from '@/types';
import { PromotionList } from '@/components/promotions/PromotionList';
import { ActivityCard } from '@/components/activities/ActivityCard';
import { FlightCard } from '@/components/flights/FlightCard';
import { Plane, MapPin, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { FlightSearchForm } from '@/components/flights/FlightSearchForm';
import { TeamMemberCard } from '@/components/team/TeamMemberCard';
import { getData, getDocData } from '@/services/firestore';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Testimonials } from '@/components/testimonials/Testimonials';

const DEFAULT_HERO_IMAGES = [
  { url: 'https://placehold.co/1200x800.png', alt: 'Beautiful view of Dubai', dataAiHint: 'dubai cityscape' },
  { url: 'https://placehold.co/1200x800.png', alt: 'Desert safari adventure', dataAiHint: 'dubai desert' },
  { url: 'https://placehold.co/1200x800.png', alt: 'Luxury hotel in Dubai', dataAiHint: 'dubai hotel' },
];
const SETTINGS_DOC_ID = 'siteSettings';

export default function HomePage() {
  const [heroImages, setHeroImages] = useState(DEFAULT_HERO_IMAGES);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()]);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      
      const settings = await getDocData('settings', SETTINGS_DOC_ID);
      if (settings && Array.isArray(settings.heroImages) && settings.heroImages.length > 0) {
        setHeroImages(settings.heroImages.map((img: any) => ({
            url: img.url,
            alt: img.alt || 'Dubai view',
            dataAiHint: img.dataAiHint || 'dubai cityscape',
        })));
      }

      const promotionsData = await getData<Promotion>('promotions');
      const activitiesData = await getData<Activity>('activities');
      const teamData = await getData<TeamMember>('team');

      setPromotions(promotionsData);
      setActivities(activitiesData);
      setTeamMembers(teamData);
      setFlights(mockFlights);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const featuredPromotions = promotions.slice(0, 3);
  const featuredActivities = activities.slice(0, 3);
  
  const cheapestFlightToNepal = flights.filter(
    (flight) =>
      flight.departureAirportCode === 'DXB' &&
      flight.arrivalAirportCode === 'KTM'
  ).reduce((cheapest, current) => 
    (cheapest === null || current.price < cheapest.price) ? current : cheapest, 
    null as Flight | null
  );

  if (isLoading) {
    return <MainLayout><div className="text-center">Loading site data...</div></MainLayout>;
  }

  return (
    <MainLayout>
      <div className="space-y-12">
        <section className="relative h-[calc(100vh-15rem)] min-h-[400px] md:h-[calc(100vh-20rem)] rounded-xl overflow-hidden shadow-2xl group">
          <div className="absolute inset-0 bg-black/30 z-10" />
          <div className="overflow-hidden h-full" ref={emblaRef}>
            <div className="flex h-full">
              {heroImages.map((img, index) => (
                <div className="relative flex-[0_0_100%] h-full" key={index}>
                  <Image 
                    src={img.url} 
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    className="filter blur-sm scale-110"
                    aria-hidden="true"
                    key={`${img.url}-bg`}
                  />
                  <Image 
                    src={img.url} 
                    alt={img.alt}
                    layout="fill"
                    objectFit="contain"
                    priority={index === 0}
                    data-ai-hint={img.dataAiHint}
                    key={img.url}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6">
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
          <Button
            onClick={scrollPrev}
            className="absolute z-30 left-4 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 p-0 opacity-0 group-hover:opacity-70 transition-opacity"
            variant="outline"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={scrollNext}
            className="absolute z-30 right-4 top-1/2 -translate-y-1/2 rounded-full h-10 w-10 p-0 opacity-0 group-hover:opacity-70 transition-opacity"
            variant="outline"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </section>
        
        <section className="-mt-20 relative z-10 mx-auto w-full max-w-5xl px-4">
          <FlightSearchForm />
           <p className="text-center text-xs text-muted-foreground mt-2">
            Live prices as shown on <Link href="https://www.skyscanner.ae/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">skyscanner.ae</Link>
          </p>
        </section>

        <PromotionList promotions={featuredPromotions} title="Today's Top Deals" />

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

        <Testimonials />

        <section className="py-8">
          <h2 className="text-3xl font-headline font-semibold mb-6 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map(member => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>

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
