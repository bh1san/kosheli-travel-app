import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  isAdmin?: boolean;
}

export function Logo({ className, isAdmin = false }: LogoProps) {
  const href = isAdmin ? '/admin' : '/';
  return (
    <Link href={href} className={`flex items-center ${className}`}>
      <Image 
        src="/images/logo.png" 
        alt="Kosheli Travel & Tourism Logo" 
        width={180} 
        height={50} 
        priority 
      />
    </Link>
  );
}
