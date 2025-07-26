import type { Flight, Activity, Promotion, TeamMember, Visa } from '@/types';

export const mockFlights: Flight[] = [
  {
    id: 'FL001',
    airline: 'Emirates',
    airlineLogoUrl: 'https://placehold.co/100x40.png', 
    flightNumber: 'EK203',
    departureCity: 'New York',
    departureAirportCode: 'JFK',
    arrivalCity: 'Dubai',
    arrivalAirportCode: 'DXB',
    departureTime: '2024-09-15T22:00:00Z',
    arrivalTime: '2024-09-16T18:00:00Z',
    duration: '14h 0m',
    price: 3120, // AED
    stops: 0,
  },
  {
    id: 'FL002',
    airline: 'Qatar Airways',
    airlineLogoUrl: 'https://placehold.co/100x40.png',
    flightNumber: 'QR706',
    departureCity: 'London',
    departureAirportCode: 'LHR',
    arrivalCity: 'Dubai',
    arrivalAirportCode: 'DXB',
    departureTime: '2024-09-16T14:30:00Z',
    arrivalTime: '2024-09-17T00:45:00Z',
    duration: '7h 15m',
    price: 2200, // AED
    stops: 0,
  },
  {
    id: 'FL003',
    airline: 'British Airways',
    airlineLogoUrl: 'https://placehold.co/100x40.png',
    flightNumber: 'BA105',
    departureCity: 'London',
    departureAirportCode: 'LHR',
    arrivalCity: 'Dubai',
    arrivalAirportCode: 'DXB',
    departureTime: '2024-09-18T21:00:00Z',
    arrivalTime: '2024-09-19T07:10:00Z',
    duration: '7h 10m',
    price: 2275, // AED
    stops: 0,
  },
  {
    id: 'FL004',
    airline: 'Lufthansa',
    airlineLogoUrl: 'https://placehold.co/100x40.png',
    flightNumber: 'LH630',
    departureCity: 'Frankfurt',
    departureAirportCode: 'FRA',
    arrivalCity: 'Dubai',
    arrivalAirportCode: 'DXB',
    departureTime: '2024-09-20T15:00:00Z',
    arrivalTime: '2024-09-20T23:05:00Z',
    duration: '6h 5m',
    price: 2020, // AED
    stops: 0,
  },
  {
    id: 'FL005',
    airline: 'Flydubai',
    airlineLogoUrl: 'https://placehold.co/100x40.png',
    flightNumber: 'FZ573',
    departureCity: 'Dubai',
    departureAirportCode: 'DXB',
    arrivalCity: 'Kathmandu',
    arrivalAirportCode: 'KTM',
    departureTime: '2024-10-10T11:40:00Z',
    arrivalTime: '2024-10-10T17:45:00Z',
    duration: '4h 20m',
    price: 1100, // AED
    stops: 0,
  },
    {
    id: 'FL006',
    airline: 'Himalaya Airlines',
    airlineLogoUrl: 'https://placehold.co/100x40.png',
    flightNumber: 'H9566',
    departureCity: 'Dubai',
    departureAirportCode: 'DXB',
    arrivalCity: 'Kathmandu',
    arrivalAirportCode: 'KTM',
    departureTime: '2024-10-11T04:45:00Z',
    arrivalTime: '2024-10-11T10:50:00Z',
    duration: '4h 20m',
    price: 950, // AED - This is the cheapest one
    stops: 0,
  },
];

export const mockActivities: Activity[] = [
  {
    id: 'ACT001',
    name: 'Desert Safari with BBQ Dinner',
    description: 'Experience the thrill of dune bashing, enjoy a traditional BBQ dinner, and watch cultural performances under the stars.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'desert safari',
    price: 275, // AED
    location: 'Dubai Desert Conservation Reserve',
    rating: 4.8,
    category: 'Adventure',
  },
  {
    id: 'ACT002',
    name: 'Burj Khalifa Observation Deck',
    description: "Visit the world's tallest building and enjoy panoramic views of Dubai from the 'At the Top' observation deck.",
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'dubai skyline',
    price: 550, // AED
    location: 'Downtown Dubai',
    rating: 4.9,
    category: 'Sightseeing',
  },
  {
    id: 'ACT003',
    name: 'Dubai Mall & Fountain Show',
    description: 'Shop at one of the world\'s largest malls and witness the spectacular Dubai Fountain show.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'shopping mall',
    price: 0, 
    location: 'Downtown Dubai',
    rating: 4.7,
    category: 'Shopping & Entertainment',
  },
  {
    id: 'ACT004',
    name: 'Dhow Cruise Dinner in Dubai Marina',
    description: 'Enjoy a relaxing evening cruise along the Dubai Marina, complete with a buffet dinner and live entertainment.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'cruise ship',
    price: 220, // AED
    location: 'Dubai Marina',
    rating: 4.5,
    category: 'Dining & Cruise',
  },
  {
    id: 'ACT005',
    name: 'Ski Dubai Snow Park',
    description: 'Experience winter in the desert at Ski Dubai, featuring an indoor ski resort and snow park.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'skiing snow',
    price: 330, // AED
    location: 'Mall of the Emirates',
    rating: 4.6,
    category: 'Adventure',
  }
];

export const mockPromotions: Promotion[] = [
  {
    id: 'PROMO001',
    title: 'Early Bird Flight Discount!',
    description: 'Book your flights to Dubai 60 days in advance and get 15% off.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'travel discount',
    discountPercentage: 15,
    validUntil: '2024-12-31',
    type: 'flight',
  },
  {
    id: 'PROMO002',
    title: 'Summer Activity Bonanza',
    description: 'Enjoy 20% off on select Dubai outdoor activities this summer. Use code SUMMERFUN.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'special offer',
    discountPercentage: 20,
    discountCode: 'SUMMERFUN',
    validUntil: '2024-08-31',
    type: 'activity',
  },
  {
    id: 'PROMO003',
    title: 'Dubai Explorer Package',
    description: 'Flight + 3-night hotel + Desert Safari starting from $999!',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'travel package',
    validUntil: '2024-10-31',
    type: 'package',
  },
];

export const mockTeamMembers: TeamMember[] = [
  {
    id: 'TM001',
    name: 'John Doe',
    role: 'CEO & Founder',
    bio: 'With over 20 years of experience in the travel industry, John leads our team with a passion for creating unforgettable journeys.',
    imageUrl: 'https://placehold.co/400x400.png',
    socials: {
      linkedin: 'https://linkedin.com/in/johndoe',
      twitter: 'https://twitter.com/johndoe',
    },
  },
  {
    id: 'TM002',
    name: 'Jane Smith',
    role: 'Head of Operations',
    bio: 'Jane ensures that every aspect of your trip is seamless, from booking to your return home. Her attention to detail is second to none.',
    imageUrl: 'https://placehold.co/400x400.png',
    socials: {
      linkedin: 'https://linkedin.com/in/janesmith',
      twitter: 'https://twitter.com/janesmith',
    },
  },
  {
    id: 'TM003',
    name: 'Peter Jones',
    role: 'Lead Travel Consultant',
    bio: 'Peter is our Dubai expert. He has lived in the city for over a decade and knows all the hidden gems to make your trip special.',
    imageUrl: 'https://placehold.co/400x400.png',
    socials: {
      linkedin: 'https://linkedin.com/in/peterjones',
      twitter: 'https://twitter.com/peterjones',
    },
  },
];

export const mockVisas: Visa[] = [
  { id: 'VISA001', name: 'Tourist Visa (30 Days)', description: 'Single entry visa for tourism purposes.', destination: 'uae' },
  { id: 'VISA002', name: 'Tourist Visa (60 Days)', description: 'Extended tourist visa for longer stays.', destination: 'uae' },
  { id: 'VISA003', name: 'Schengen Tourist Visa', description: 'Visa for travel across the European Schengen area.', destination: 'europe' },
];
