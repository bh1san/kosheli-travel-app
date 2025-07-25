
'use client';

import Image from 'next/image';
import type { Flight } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Plane, ArrowRight, Clock, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';

interface FlightCardProps {
  flight: Flight;
}

export function FlightCard({ flight }: FlightCardProps) {
  const { addToCart } = useCart();
  const [formattedDepartureTime, setFormattedDepartureTime] = useState<string | null>(null);
  const [formattedArrivalTime, setFormattedArrivalTime] = useState<string | null>(null);

  useEffect(() => {
    // Perform date formatting on the client side to avoid hydration mismatch
    const departureDateTime = new Date(flight.departureTime);
    const arrivalDateTime = new Date(flight.arrivalTime);
    setFormattedDepartureTime(format(departureDateTime, 'MMM d, HH:mm'));
    setFormattedArrivalTime(format(arrivalDateTime, 'MMM d, HH:mm'));
  }, [flight.departureTime, flight.arrivalTime]);

  const handleAddToCart = () => {
    addToCart(flight, 'flight');
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-4 bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {flight.airlineLogoUrl && (
              <Image 
                src={flight.airlineLogoUrl} 
                alt={`${flight.airline} logo`} 
                width={80} 
                height={30} 
                className="object-contain"
                data-ai-hint="airline logo" 
              />
            )}
            <CardTitle className="text-lg font-headline">{flight.airline}</CardTitle>
          </div>
          <Badge variant={flight.stops === 0 ? "default" : "secondary"} className={flight.stops === 0 ? "bg-green-500 text-white" : ""}>
            {flight.stops === 0 ? 'Direct' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground">{flight.flightNumber}</p>
      </CardHeader>
      <CardContent className="p-4 flex-grow space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex flex-col items-start">
            <span className="font-semibold text-lg">{flight.departureAirportCode}</span>
            <span className="text-muted-foreground text-xs">{flight.departureCity}</span>
            <span className="text-xs">{formattedDepartureTime || 'Loading...'}</span>
          </div>
          <ArrowRight size={20} className="text-primary mx-2" />
          <div className="flex flex-col items-end">
            <span className="font-semibold text-lg">{flight.arrivalAirportCode}</span>
            <span className="text-muted-foreground text-xs">{flight.arrivalCity}</span>
            <span className="text-xs">{formattedArrivalTime || 'Loading...'}</span>
          </div>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock size={16} className="mr-2 text-primary" />
          <span>Duration: {flight.duration}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-muted/30 flex items-center justify-between">
        <div className="flex items-baseline text-primary">
          <span className="text-xl font-bold">{flight.price.toFixed(2)}</span>
          <span className="text-sm font-semibold ml-1">AED</span>
        </div>
        <Button onClick={handleAddToCart} variant="default" size="sm" aria-label={`Add ${flight.airline} flight to cart`}>
          <ShoppingCart size={16} className="mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
