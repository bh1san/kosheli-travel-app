
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  isAdmin?: boolean;
}

const LOGO_IMAGE_STORAGE_KEY = 'logoImageUrl';
const DEFAULT_LOGO = '/images/logo.png';

export function Logo({ className, isAdmin = false }: LogoProps) {
  const [logoSrc, setLogoSrc] = useState(DEFAULT_LOGO);
  const href = isAdmin ? '/admin' : '/';

  useEffect(() => {
    const handleStorageChange = () => {
      const savedLogo = localStorage.getItem(LOGO_IMAGE_STORAGE_KEY);
      setLogoSrc(savedLogo || DEFAULT_LOGO);
    };

    // Initial load
    handleStorageChange();

    // Listen for changes from other tabs/windows, or our custom event
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
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
