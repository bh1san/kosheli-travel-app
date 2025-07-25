'use client';

import Link from 'next/link';
import { Plane, MapPin, Sparkles, ShoppingCart, Ticket, Menu, Globe, Paperclip } from 'lucide-react';
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
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
           <div className="flex flex-col items-start leading-none">
             <h1 className="text-2xl font-bold font-headline text-primary">Kosheli</h1>
             <p className="text-xs font-semibold text-primary/80 tracking-widest">TRAVEL & TOURISM</p>
           </div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1">
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
