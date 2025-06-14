
import type { Metadata } from 'next';
import '../globals.css'; // Admin shares global styles
import { AdminLayout } from '@/components/admin/AdminLayout';

export const metadata: Metadata = {
  title: 'Kosheli Travel - Admin Panel',
  description: 'Admin panel for Kosheli Travel.',
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminLayout>{children}</AdminLayout>;
}
