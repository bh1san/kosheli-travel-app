
'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Search, Calendar, PlaneTakeoff, PlaneLanding, Check } from "lucide-react";
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { mockFlights } from '@/lib/mockData';

interface FlightSearchFormProps {
  onSearch?: (params: { departure: string; destination: string; date: string }) => void;
  className?: string;
  initialState?: { departure: string; destination: string; date: string };
}

type Airport = { value: string; label: string };

export function FlightSearchForm({ onSearch, className, initialState }: FlightSearchFormProps) {
  const router = useRouter();
  const [departure, setDeparture] = useState(initialState?.departure || '');
  const [destination, setDestination] = useState(initialState?.destination || '');
  const [date, setDate] = useState(initialState?.date || '');

  const [departureOpen, setDepartureOpen] = useState(false);
  const [destinationOpen, setDestinationOpen] = useState(false);

  const airports = useMemo(() => {
    const allAirports = new Map<string, string>();
    mockFlights.forEach(flight => {
      const departureLabel = `${flight.departureCity} (${flight.departureAirportCode})`;
      if (!allAirports.has(flight.departureAirportCode)) {
        allAirports.set(flight.departureAirportCode, departureLabel);
      }
      const arrivalLabel = `${flight.arrivalCity} (${flight.arrivalAirportCode})`;
      if (!allAirports.has(flight.arrivalAirportCode)) {
        allAirports.set(flight.arrivalAirportCode, arrivalLabel);
      }
    });
    return Array.from(allAirports, ([code, label]) => ({ value: label, label: label }));
  }, []);

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

  const AirportSelector = ({
    value,
    onSelect,
    open,
    setOpen,
    placeholder,
  }: {
    value: string;
    onSelect: (value: string) => void;
    open: boolean;
    setOpen: (open: boolean) => void;
    placeholder: string;
  }) => (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {value ? airports.find(a => a.value.toLowerCase() === value.toLowerCase())?.label : placeholder}
          <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search airport..." />
          <CommandList>
            <CommandEmpty>No airport found.</CommandEmpty>
            <CommandGroup>
              {airports.map((airport) => (
                <CommandItem
                  key={airport.value}
                  value={airport.value}
                  onSelect={(currentValue) => {
                    onSelect(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === airport.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {airport.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );

  return (
    <Card className={cn("shadow-lg", className)}>
      <CardContent className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
          <div className="space-y-1">
            <label htmlFor="departure-home" className="flex items-center text-sm font-medium text-foreground mb-1">
              <PlaneTakeoff size={16} className="mr-2 text-primary" /> From
            </label>
            <AirportSelector
              value={departure}
              onSelect={setDeparture}
              open={departureOpen}
              setOpen={setDepartureOpen}
              placeholder="Select departure airport"
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="destination-home" className="flex items-center text-sm font-medium text-foreground mb-1">
              <PlaneLanding size={16} className="mr-2 text-primary" /> To
            </label>
            <AirportSelector
              value={destination}
              onSelect={setDestination}
              open={destinationOpen}
              setOpen={setDestinationOpen}
              placeholder="Select destination airport"
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
