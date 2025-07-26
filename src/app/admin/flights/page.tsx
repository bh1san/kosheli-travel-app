
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
import { format } from 'date-fns';

export default function AdminFlightsPage() {
  const [flights, setFlights] = useState<Flight[]>(mockFlights);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingFlight, setEditingFlight] = useState<Flight | null>(null);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const flightData: Omit<Flight, 'id' | 'airlineLogoUrl'> = {
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
    };

    if (editingFlight) {
      setFlights(flights.map(f => f.id === editingFlight.id ? { ...f, ...flightData } : f));
    } else {
      const newFlight: Flight = {
        ...flightData,
        id: `FL${Math.floor(Math.random() * 1000)}`,
        airlineLogoUrl: 'https://placehold.co/100x40.png',
      };
      setFlights([...flights, newFlight]);
    }
    closeDialog();
  };

  const handleEditClick = (flight: Flight) => {
    setEditingFlight(flight);
    setIsDialogOpen(true);
  };
  
  const handleDeleteFlight = (id: string) => {
    setFlights(flights.filter(f => f.id !== id));
  };
  
  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingFlight(null);
  };

  const openAddDialog = () => {
    setEditingFlight(null);
    setIsDialogOpen(true);
  }

  const formatDateTimeForInput = (dateString: string) => {
    if (!dateString) return '';
    // Format to "yyyy-MM-ddThh:mm" which is required by datetime-local input
    return format(new Date(dateString), "yyyy-MM-dd'T'HH:mm");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-headline">Manage Flights</h1>
        <Dialog open={isDialogOpen} onOpenChange={(isOpen) => { if (!isOpen) closeDialog(); else setIsDialogOpen(true); }}>
          <DialogTrigger asChild>
            <Button onClick={openAddDialog}>
              <PlusCircle className="mr-2" /> Add New Flight
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingFlight ? 'Edit Flight' : 'Add a New Flight'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><Label htmlFor="airline">Airline</Label><Input id="airline" name="airline" required defaultValue={editingFlight?.airline} /></div>
                <div><Label htmlFor="flightNumber">Flight Number</Label><Input id="flightNumber" name="flightNumber" required defaultValue={editingFlight?.flightNumber} /></div>
                <div><Label htmlFor="departureCity">Departure City</Label><Input id="departureCity" name="departureCity" required defaultValue={editingFlight?.departureCity} /></div>
                <div><Label htmlFor="departureAirportCode">Departure Code</Label><Input id="departureAirportCode" name="departureAirportCode" required defaultValue={editingFlight?.departureAirportCode} /></div>
                <div><Label htmlFor="arrivalCity">Arrival City</Label><Input id="arrivalCity" name="arrivalCity" required defaultValue={editingFlight?.arrivalCity} /></div>
                <div><Label htmlFor="arrivalAirportCode">Arrival Code</Label><Input id="arrivalAirportCode" name="arrivalAirportCode" required defaultValue={editingFlight?.arrivalAirportCode} /></div>
                <div><Label htmlFor="departureTime">Departure Time</Label><Input id="departureTime" name="departureTime" type="datetime-local" required defaultValue={editingFlight ? formatDateTimeForInput(editingFlight.departureTime) : ''}/></div>
                <div><Label htmlFor="arrivalTime">Arrival Time</Label><Input id="arrivalTime" name="arrivalTime" type="datetime-local" required defaultValue={editingFlight ? formatDateTimeForInput(editingFlight.arrivalTime) : ''} /></div>
                <div><Label htmlFor="price">Price (AED)</Label><Input id="price" name="price" type="number" required defaultValue={editingFlight?.price} /></div>
                <div><Label htmlFor="duration">Duration</Label><Input id="duration" name="duration" required defaultValue={editingFlight?.duration} /></div>
                <div><Label htmlFor="stops">Stops</Label><Input id="stops" name="stops" type="number" defaultValue={editingFlight?.stops ?? 0} required /></div>
              </div>
              <Button type="submit" className="w-full">{editingFlight ? 'Save Changes' : 'Add Flight'}</Button>
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
                   <Button variant="outline" size="icon" onClick={() => handleEditClick(flight)}><Edit size={16} /></Button>
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
