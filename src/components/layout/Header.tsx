'use client';

import Link from 'next/link';
import { Plane, MapPin, Sparkles, Ticket, Menu, Send, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from 'react';
import { Logo } from './Logo';

const NavLink = ({ href, children, icon, onClick }: { href: string; children: React.ReactNode; icon?: React.ReactNode, onClick?: () => void }) => (
  <Link href={href} passHref>
    <Button variant="ghost" className="text-foreground hover:bg-primary/10 flex items-center gap-2 justify-start" onClick={onClick}>
      {icon}
      {children}
    </Button>
  </Link>
);

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = (
    <>
      <NavLink href="/flights" icon={<Plane size={18} />} onClick={() => setIsMobileMenuOpen(false)}>Flights</NavLink>
      <NavLink href="/activities" icon={<MapPin size={18} />} onClick={() => setIsMobileMenuOpen(false)}>Activities</NavLink>
      <NavLink href="/promotions" icon={<Ticket size={18} />} onClick={() => setIsMobileMenuOpen(false)}>Promotions</NavLink>
      <NavLink href="/visa" icon={<FileText size={18} />} onClick={() => setIsMobileMenuOpen(false)}>Visa Services</NavLink>
      <NavLink href="/recommendations" icon={<Sparkles size={18} />} onClick={() => setIsMobileMenuOpen(false)}>Recommendations</NavLink>
      <NavLink href="/contact" icon={<Send size={18} />} onClick={() => setIsMobileMenuOpen(false)}>Contact</NavLink>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />
        
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
               <div className="mb-6">
                 <Logo />
               </div>
              <nav className="flex flex-col space-y-2">
                {navItems}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
