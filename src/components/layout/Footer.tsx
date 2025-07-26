
import { MapPin, Phone, Clock } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-8 bg-muted/50 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-muted-foreground">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div className="md:col-span-1">
            <h3 className="text-lg font-headline font-semibold text-foreground mb-2">Kosheli Travel</h3>
            <p className="text-sm">Your Dubai travel expert, crafting unforgettable adventures.</p>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-lg font-headline font-semibold text-foreground mb-2">Contact Information</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MapPin size={16} className="text-primary"/>
                <span>Address: 2 Al Raffa St - Al Fahidi - Dubai</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Phone size={16} className="text-primary"/>
                <span>Phone: 04 353 8898</span>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Clock size={16} className="text-primary"/>
                <span>Hours: 9:00 AM – 10:30 PM (Everyday)</span>
              </div>
            </div>
          </div>
           <div className="md:col-span-1">
            <h3 className="text-lg font-headline font-semibold text-foreground mb-2">Company</h3>
            <div className="flex flex-col space-y-2 text-sm">
                <Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link>
                <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
                 <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Kosheli Travel. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
