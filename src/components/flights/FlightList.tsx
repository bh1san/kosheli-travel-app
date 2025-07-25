
'use client';

import { useState, useEffect } from 'react';
import type { Flight } from '@/types';
import { FlightCard } from './FlightCard';
import { mockFlights } from '@/lib/mockData';

interface FlightListProps {
  departureQuery?: string;
  destinationQuery?: string;
  dateQuery?: string;
}

export function FlightList({ departureQuery = '', destinationQuery = '', dateQuery = '' }: FlightListProps) {
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);

  useEffect(() => {
    let tempFlights = mockFlights;
    
    const departure = departureQuery.toLowerCase().trim();
    if (departure) {
      tempFlights = tempFlights.filter(flight =>
        (flight.departureCity?.toLowerCase().includes(departure)) ||
        (flight.departureAirportCode?.toLowerCase().includes(departure))
      );
    }

    const destination = destinationQuery.toLowerCase().trim();
    if (destination) {
      tempFlights = tempFlights.filter(flight =>
        (flight.arrivalCity?.toLowerCase().includes(destination)) ||
        (flight.arrivalAirportCode?.toLowerCase().includes(destination))
      );
    }

    if (dateQuery) {
      tempFlights = tempFlights.filter(flight => {
        if (!flight.departureTime) return false;
        try {
          const flightDepartureDate = new Date(flight.departureTime).toISOString().split('T')[0];
          return flightDepartureDate === dateQuery;
        } catch (e) {
          return false;
        }
      });
    }
    
    // If no search params, show all flights
    if (!departure && !destination && !dateQuery) {
      setFilteredFlights(mockFlights);
    } else {
      setFilteredFlights(tempFlights);
    }
  }, [departureQuery, destinationQuery, dateQuery]);

  if (filteredFlights.length === 0) {
    return <p className="text-center text-muted-foreground py-10">No flights match your search criteria. Please try different options.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredFlights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
}
