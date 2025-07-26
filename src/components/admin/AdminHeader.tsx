'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { Logo } from '../layout/Logo';

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="md:hidden" />
          <Logo isAdmin={true} />
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
