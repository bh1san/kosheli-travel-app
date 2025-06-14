
'use client';
import type { ReactNode } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AdminHeader } from './AdminHeader';
import { AdminSidebar } from './AdminSidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSidebar />
      <SidebarInset>
        <div className="flex min-h-screen flex-col bg-muted/20">
          <AdminHeader />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <footer className="py-4 bg-muted/50 mt-auto">
            <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
              &copy; {new Date().getFullYear()} Kosheli Travel Admin Panel
            </div>
          </footer>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
