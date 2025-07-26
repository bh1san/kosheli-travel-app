
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getDocData } from '@/services/firestore';

interface LogoProps {
  className?: string;
  isAdmin?: boolean;
}

const DEFAULT_LOGO = '/images/logo.png';
const SETTINGS_DOC_ID = 'siteSettings';

export function Logo({ className, isAdmin = false }: LogoProps) {
  const [logoSrc, setLogoSrc] = useState(DEFAULT_LOGO);
  const href = isAdmin ? '/admin' : '/';

  useEffect(() => {
    async function fetchLogo() {
      const settings = await getDocData('settings', SETTINGS_DOC_ID);
      if (settings && settings.logoUrl) {
        setLogoSrc(settings.logoUrl);
      }
    }
    fetchLogo();
    
    // This is a bit of a hack to listen for storage changes from other tabs.
    // A more robust solution would use real-time Firestore listeners.
    const handleStorage = () => {
        fetchLogo();
    };
    window.addEventListener('storage', handleStorage);
    return () => {
        window.removeEventListener('storage', handleStorage);
    };
  }, []);

  return (
    <Link href={href} className={`flex items-center ${className}`}>
      <Image 
        src={logoSrc} 
        alt="Kosheli Travel & Tourism Logo" 
        width={180} 
        height={50} 
        priority
        key={logoSrc} // Force re-render on src change
      />
    </Link>
  );
}
