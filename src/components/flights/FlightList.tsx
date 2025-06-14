import type { Flight } from '@/types';
import { FlightCard } from './FlightCard';

interface FlightListProps {
  flights: Flight[];
}

export function FlightList({ flights }: FlightListProps) {
  if (flights.length === 0) {
    return <p className="text-center text-muted-foreground">No flights available at the moment. Please check back later.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {flights.map((flight) => (
        <FlightCard key={flight.id} flight={flight} />
      ))}
    </div>
  );
}
