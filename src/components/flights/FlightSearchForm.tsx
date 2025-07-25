
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, PlaneTakeoff, PlaneLanding } from "lucide-react";
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface FlightSearchFormProps {
  onSearch?: (params: { departure: string; destination: string; date: string }) => void;
  className?: string;
  initialState?: { departure: string; destination: string; date: string };
}

export function FlightSearchForm({ onSearch, className, initialState }: FlightSearchFormProps) {
  const router = useRouter();
  const [departure, setDeparture] = useState(initialState?.departure || '');
  const [destination, setDestination] = useState(initialState?.destination || '');
  const [date, setDate] = useState(initialState?.date || '');

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ departure, destination, date });
    } else {
      const query = new URLSearchParams({
        from: departure,
        to: destination,
        date: date,
      }).toString();
      router.push(`/flights?${query}`);
    }
  };

  return (
    <Card className={cn("shadow-lg", className)}>
      <CardContent className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="space-y-1">
            <label htmlFor="departure-home" className="flex items-center text-sm font-medium text-foreground mb-1">
              <PlaneTakeoff size={16} className="mr-2 text-primary" /> From
            </label>
            <Input 
              type="text" 
              id="departure-home" 
              placeholder="e.g., New York (JFK)" 
              className="font-body"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="destination-home" className="flex items-center text-sm font-medium text-foreground mb-1">
              <PlaneLanding size={16} className="mr-2 text-primary" /> To
            </label>
            <Input 
              type="text" 
              id="destination-home" 
              placeholder="e.g., Dubai (DXB)" 
              className="font-body"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="departure-date-home" className="flex items-center text-sm font-medium text-foreground mb-1">
               <Calendar size={16} className="mr-2 text-primary" /> Departure Date
            </label>
            <Input 
              type="date" 
              id="departure-date-home" 
              className="font-body"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <Button 
            className="w-full lg:w-auto font-body" 
            aria-label="Search flights"
            onClick={handleSearch}
          >
            <Search size={18} className="mr-2" />
            Search Flights
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
