export interface Flight {
  id: string;
  airline: string;
  airlineLogoUrl?: string;
  flightNumber: string;
  departureCity: string;
  departureAirportCode: string;
  arrivalCity: string;
  arrivalAirportCode: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  stops: number;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  location: string;
  rating: number;
  category: string;
  dataAiHint?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  discountPercentage?: number;
  discountCode?: string;
  validUntil: string;
  type: 'flight' | 'activity' | 'package';
  dataAiHint?: string;
}

export type CartItem = (
  | { itemType: 'flight'; details: Flight }
  | { itemType: 'activity'; details: Activity }
) & { quantity: number };
