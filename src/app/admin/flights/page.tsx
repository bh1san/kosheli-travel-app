
'use client';

import { useState } from 'react';
import { mockFlights } from '@/lib/mockData';
import type { Flight } from '@/types';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

export default function AdminFlightsPage() {
  const [flights, setFlights] = useState<Flight[]>(mockFlights);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // In a real app, these handlers would call an API
  const handleAddFlight = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newFlight: Flight = {
      id: `FL${Math.floor(Math.random() * 1000)}`,
      airline: formData.get('airline') as string,
      flightNumber: formData.get('flightNumber') as string,
      departureCity: formData.get('departureCity') as string,
      departureAirportCode: formData.get('departureAirportCode') as string,
      arrivalCity: formData.get('arrivalCity') as string,
      arrivalAirportCode: formData.get('arrivalAirportCode') as string,
      departureTime: new Date(formData.get('departureTime') as string).toISOString(),
      arrivalTime: new Date(formData.get('arrivalTime') as string).toISOString(),
      price: Number(formData.get('price')),
      duration: formData.get('duration') as string,
      stops: Number(formData.get('stops')),
      airlineLogoUrl: 'https://placehold.co/100x40.png',
    };
    setFlights([...flights, newFlight]);
    setIsDialogOpen(false);
  };

  const handleDeleteFlight = (id: string) => {
    setFlights(flights.filter(f => f.id !== id));
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">Manage Flights</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2" /> Add New Flight
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a New Flight</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddFlight} className="space-y-4">
              {/* Form fields for a new flight */}
              <div className="grid grid-cols-2 gap-4">
                <div><Label htmlFor="airline">Airline</Label><Input id="airline" name="airline" required /></div>
                <div><Label htmlFor="flightNumber">Flight Number</Label><Input id="flightNumber" name="flightNumber" required /></div>
                <div><Label htmlFor="departureCity">Departure City</Label><Input id="departureCity" name="departureCity" required /></div>
                <div><Label htmlFor="departureAirportCode">Departure Code</Label><Input id="departureAirportCode" name="departureAirportCode" required /></div>
                <div><Label htmlFor="arrivalCity">Arrival City</Label><Input id="arrivalCity" name="arrivalCity" required /></div>
                <div><Label htmlFor="arrivalAirportCode">Arrival Code</Label><Input id="arrivalAirportCode" name="arrivalAirportCode" required /></div>
                <div><Label htmlFor="departureTime">Departure Time</Label><Input id="departureTime" name="departureTime" type="datetime-local" required /></div>
                <div><Label htmlFor="arrivalTime">Arrival Time</Label><Input id="arrivalTime" name="arrivalTime" type="datetime-local" required /></div>
                <div><Label htmlFor="price">Price (AED)</Label><Input id="price" name="price" type="number" required /></div>
                <div><Label htmlFor="duration">Duration</Label><Input id="duration" name="duration" required /></div>
                <div><Label htmlFor="stops">Stops</Label><Input id="stops" name="stops" type="number" defaultValue={0} required /></div>
              </div>
              <Button type="submit" className="w-full">Add Flight</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card p-4 rounded-lg shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Airline</TableHead>
              <TableHead>Flight No.</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {flights.map((flight) => (
              <TableRow key={flight.id}>
                <TableCell>{flight.airline}</TableCell>
                <TableCell>{flight.flightNumber}</TableCell>
                <TableCell>{flight.departureAirportCode}</TableCell>
                <TableCell>{flight.arrivalAirportCode}</TableCell>
                <TableCell>{flight.price.toFixed(2)} AED</TableCell>
                <TableCell className="space-x-2">
                   <Button variant="outline" size="icon" disabled><Edit size={16} /></Button>
                   <Button variant="destructive" size="icon" onClick={() => handleDeleteFlight(flight.id)}><Trash2 size={16} /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
