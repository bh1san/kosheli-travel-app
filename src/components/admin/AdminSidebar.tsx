
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Plane, ActivitySquare, TicketPercent, Settings, LogOut, Users, Image as ImageIcon, Users2, FileText } from 'lucide-react';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard /> },
  { href: '/admin/flights', label: 'Flights', icon: <Plane /> },
  { href: '/admin/activities', label: 'Activities', icon: <ActivitySquare /> },
  { href: '/admin/promotions', label: 'Promotions', icon: <TicketPercent /> },
  { href: '/admin/users', label: 'Users', icon: <Users /> },
  { href: '/admin/content', label: 'Content', icon: <ImageIcon /> },
  { href: '/admin/visa', label: 'Visa', icon: <FileText /> },
  { href: '/admin/team', label: 'Team', icon: <Users2 /> },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="sidebar" side="left">
      <SidebarHeader className="hidden md:flex items-center justify-between p-3 border-b">
         {/* Could add a logo or title here if sidebar is expanded */}
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))}
                tooltip={{ children: item.label, side: 'right', align: 'center' }}
              >
                <Link href={item.href}>
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-2 mt-auto border-t">
        <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => alert("Logout functionality to be implemented.")}>
          <LogOut size={16} className="mr-2" />
          <span className="group-data-[collapsible=icon]:hidden">Logout</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
