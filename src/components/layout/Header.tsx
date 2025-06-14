'use client';

import Link from 'next/link';
import { Plane, MapPin, Sparkles, ShoppingCart, Ticket, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState, useEffect } from 'react';

const NavLink = ({ href, children, icon, onClick }: { href: string; children: React.ReactNode; icon?: React.ReactNode, onClick?: () => void }) => (
  <Link href={href} passHref>
    <Button variant="ghost" className="text-foreground hover:bg-primary/10 flex items-center gap-2" onClick={onClick}>
      {icon}
      {children}
    </Button>
  </Link>
);

export function Header() {
  const { getItemCount } = useCart();
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setCartItemCount(getItemCount());
  }, [getItemCount, getItemCount()]); // Re-run effect when getItemCount or its return value changes


  const navItems = (
    <>
      <NavLink href="/flights" icon={<Plane size={18} />} onClick={() => setIsMobileMenuOpen(false)}>Flights</NavLink>
      <NavLink href="/activities" icon={<MapPin size={18} />} onClick={() => setIsMobileMenuOpen(false)}>Activities</NavLink>
      <NavLink href="/promotions" icon={<Ticket size={18} />} onClick={() => setIsMobileMenuOpen(false)}>Promotions</NavLink>
      <NavLink href="/recommendations" icon={<Sparkles size={18} />} onClick={() => setIsMobileMenuOpen(false)}>Recommendations</NavLink>
      <Link href="/cart" passHref>
        <Button variant="ghost" className="text-foreground hover:bg-primary/10 relative" onClick={() => setIsMobileMenuOpen(false)}>
          <ShoppingCart size={20} />
          {cartItemCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs">
              {cartItemCount}
            </Badge>
          )}
          <span className="sr-only">View Cart</span>
           <span className="ml-2 md:hidden">Cart</span>
        </Button>
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-primary">
            <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26ZM12.0006 15.968L16.2473 18.3451L15.2988 13.5718L18.8719 10.2918L14.039 9.69434L12.0006 5.27502L9.96214 9.69434L5.12921 10.2918L8.70237 13.5718L7.75386 18.3451L12.0006 15.968Z"></path>
          </svg>
          <h1 className="text-2xl font-bold font-headline text-primary">Tourista</h1>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-2">
          {navItems}
        </nav>

        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={24} />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-6">
              <nav className="flex flex-col space-y-4 mt-6">
                {navItems}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
