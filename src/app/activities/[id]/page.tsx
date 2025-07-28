
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getDocData } from '@/services/firestore';
import type { Activity } from '@/types';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin, Star, Send } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';

export default function ActivityDetailPage() {
  const { id } = useParams();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchActivity() {
      if (typeof id !== 'string') return;
      setIsLoading(true);
      const activityData = await getDocData('activities', id) as Activity | null;
      setActivity(activityData);
      setIsLoading(false);
    }
    fetchActivity();
  }, [id]);

  if (isLoading) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto">
          <Skeleton className="w-full h-96 rounded-lg" />
          <div className="mt-8 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-20 w-full" />
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!activity) {
    return <MainLayout><p className="text-center">Activity not found.</p></MainLayout>;
  }

  const bookingLink = `/contact?type=activity&item=${encodeURIComponent(activity.name)}&price=${activity.price}`;

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto">
        <Card className="overflow-hidden shadow-xl">
          <CardHeader className="p-0">
            <div className="relative w-full h-64 md:h-96">
                <Image
                    src={activity.imageUrl}
                    alt={activity.name}
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full"
                    data-ai-hint={activity.dataAiHint || 'dubai activity'}
                    key={activity.imageUrl}
                />
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <CardTitle className="text-3xl md:text-4xl font-headline text-primary">{activity.name}</CardTitle>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
              <div className="flex items-center">
                <MapPin size={16} className="mr-1.5 text-primary" />
                <span>{activity.location}</span>
              </div>
              <div className="flex items-center">
                <Star size={16} className="mr-1.5 text-yellow-400 fill-yellow-400" />
                <span className="font-semibold text-foreground">{activity.rating.toFixed(1)}</span>
                <span className="ml-1">rating</span>
              </div>
               <div className="flex items-baseline text-primary font-bold text-xl">
                  <span>{activity.price > 0 ? activity.price.toFixed(2) : 'Free'}</span>
                  {activity.price > 0 && <span className="text-sm font-semibold ml-1.5">AED</span>}
               </div>
            </div>
            
            <div className="border-t pt-4">
                <CardDescription className="text-base text-foreground/90 whitespace-pre-wrap">
                    {activity.longDescription || activity.description}
                </CardDescription>
            </div>

            <div className="pt-4">
                <Button asChild size="lg" className="w-full md:w-auto">
                    <Link href={bookingLink}>
                        <Send size={18} className="mr-2" />
                        Book This Activity
                    </Link>
                </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
