
'use client';

import { useState } from 'react';
import type { Flight } from '@/types';
import { FlightList } from '@/components/flights/FlightList';
import { MainLayout } from '@/components/layout/MainLayout';
import { mockFlights } from '@/lib/mockData';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function FlightsPage() {
  const [departureSearch, setDepartureSearch] = useState('');
  const [destinationSearch, setDestinationSearch] = useState('');
  const [dateSearch, setDateSearch] = useState('');
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>(mockFlights);

  const handleSearchFlights = () => {
    let tempFlights = mockFlights;

    const departureQuery = departureSearch.toLowerCase().trim();
    if (departureQuery) {
      tempFlights = tempFlights.filter(flight =>
        (flight.departureCity && typeof flight.departureCity === 'string' && flight.departureCity.toLowerCase().includes(departureQuery)) ||
        (flight.departureAirportCode && typeof flight.departureAirportCode === 'string' && flight.departureAirportCode.toLowerCase().includes(departureQuery))
      );
    }

    const destinationQuery = destinationSearch.toLowerCase().trim();
    if (destinationQuery) {
      tempFlights = tempFlights.filter(flight =>
        (flight.arrivalCity && typeof flight.arrivalCity === 'string' && flight.arrivalCity.toLowerCase().includes(destinationQuery)) ||
        (flight.arrivalAirportCode && typeof flight.arrivalAirportCode === 'string' && flight.arrivalAirportCode.toLowerCase().includes(destinationQuery))
      );
    }

    if (dateSearch) {
      tempFlights = tempFlights.filter(flight => {
        if (!flight.departureTime || typeof flight.departureTime !== 'string') {
          return false;
        }
        try {
          const flightDepartureDate = new Date(flight.departureTime).toISOString().split('T')[0];
          return flightDepartureDate === dateSearch;
        } catch (e) {
          // If date parsing fails, exclude the flight
          return false;
        }
      });
    }
    setFilteredFlights(tempFlights);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <section className="text-center py-8 bg-card shadow-md rounded-lg">
          <h1 className="text-4xl font-bold font-headline text-primary">Find Your Perfect Flight</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore a wide range of flights to Dubai and other destinations. Enter your details to start your journey.
          </p>
        </section>

        <section className="bg-card p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label htmlFor="departure" className="block text-sm font-medium text-foreground mb-1">From</label>
              <Input 
                type="text" 
                id="departure" 
                placeholder="e.g., New York (JFK)" 
                className="font-body"
                value={departureSearch}
                onChange={(e) => setDepartureSearch(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-foreground mb-1">To</label>
              <Input 
                type="text" 
                id="destination" 
                placeholder="e.g., Dubai (DXB)" 
                className="font-body"
                value={destinationSearch}
                onChange={(e) => setDestinationSearch(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="departure-date" className="block text-sm font-medium text-foreground mb-1">Departure Date</label>
              <Input 
                type="date" 
                id="departure-date" 
                className="font-body"
                value={dateSearch}
                onChange={(e) => setDateSearch(e.target.value)}
              />
            </div>
            <Button 
              className="w-full lg:w-auto font-body" 
              aria-label="Search flights"
              onClick={handleSearchFlights}
            >
              <Search size={18} className="mr-2" />
              Search Flights
            </Button>
          </div>
        </section>
        
        <section>
          <h2 className="text-3xl font-headline font-semibold mb-6 text-center md:text-left">Available Flights</h2>
          <FlightList flights={filteredFlights} />
        </section>
      </div>
    </MainLayout>
  );
}
