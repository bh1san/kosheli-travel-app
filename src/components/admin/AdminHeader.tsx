
'use client';

import Link from 'next/link';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <Link href="/admin" className="flex items-center gap-2">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-primary">
              <path d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26ZM12.0006 15.968L16.2473 18.3451L15.2988 13.5718L18.8719 10.2918L14.039 9.69434L12.0006 5.27502L9.96214 9.69434L5.12921 10.2918L8.70237 13.5718L7.75386 18.3451L12.0006 15.968Z"></path>
            </svg>
            <h1 className="text-xl font-bold font-headline text-primary">Kosheli Travel Admin</h1>
          </Link>
        </div>
        <div>
          {/* Placeholder for future logout or user profile */}
          <Button variant="ghost" size="sm" onClick={() => alert("Logout functionality to be implemented.")}>
            <LogOut size={16} className="mr-2"/>
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
