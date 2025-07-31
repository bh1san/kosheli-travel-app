

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
  longDescription?: string;
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

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface Visa {
    id: string;
    name: string;
    description: string;
    destination: 'uae' | 'europe';
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  quote: string;
  imageUrl: string;
}

export type CartItem = (
  | { itemType: 'flight'; details: Flight }
  | { itemType: 'activity'; details: Activity }
) & { quantity: number };

