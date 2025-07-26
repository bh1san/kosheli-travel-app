
'use client';

import Image from 'next/image';
import type { Activity } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Star, Send } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface ActivityCardProps {
  activity: Activity;
}

export function ActivityCard({ activity }: ActivityCardProps) {

  const bookingLink = `/contact?type=activity&item=${encodeURIComponent(activity.name)}&price=${activity.price}`;

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0 relative">
        <Image
          src={activity.imageUrl}
          alt={activity.name}
          width={600}
          height={400}
          className="w-full h-48 object-cover"
          data-ai-hint={activity.dataAiHint || 'dubai activity'}
          key={activity.imageUrl}
        />
         <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm">
             {activity.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow space-y-2">
        <CardTitle className="text-xl font-headline">{activity.name}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin size={16} className="mr-1 text-primary" />
          <span>{activity.location}</span>
        </div>
        <CardDescription className="text-sm text-foreground/80 line-clamp-3">{activity.description}</CardDescription>
        <div className="flex items-center">
          <Star size={16} className="mr-1 text-yellow-400 fill-yellow-400" />
          <span className="text-sm font-semibold">{activity.rating.toFixed(1)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-muted/30 flex items-center justify-between">
        <div className="flex items-baseline text-primary">
          <span className="text-xl font-bold">{activity.price > 0 ? activity.price.toFixed(2) : 'Free'}</span>
           {activity.price > 0 && <span className="text-sm font-semibold ml-1">AED</span>}
        </div>
        <Button asChild variant="default" size="sm" aria-label={`Book ${activity.name} now`}>
          <Link href={bookingLink}>
            <Send size={16} className="mr-2" />
            Book Now
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
