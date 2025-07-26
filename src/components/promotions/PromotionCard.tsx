
import Image from 'next/image';
import type { Promotion } from '@/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag, Calendar, Ticket } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface PromotionCardProps {
  promotion: Promotion;
}

export function PromotionCard({ promotion }: PromotionCardProps) {
  const getLinkForPromotion = (type: 'flight' | 'activity' | 'package') => {
    switch (type) {
      case 'flight': return '/flights';
      case 'activity': return '/activities';
      case 'package': return '/#packages'; // Or a dedicated packages page
      default: return '/';
    }
  }

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <CardHeader className="p-0 relative">
        <Image
          src={promotion.imageUrl}
          alt={promotion.title}
          width={600}
          height={300}
          className="w-full h-48 object-cover"
          data-ai-hint={promotion.dataAiHint || 'travel promotion'}
          key={promotion.imageUrl}
        />
        {promotion.discountPercentage && (
          <Badge variant="destructive" className="absolute top-2 left-2 text-base px-2 py-1">
            {promotion.discountPercentage}% OFF
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 flex-grow space-y-2">
        <CardTitle className="text-xl font-headline">{promotion.title}</CardTitle>
        <CardDescription className="text-sm text-foreground/80 line-clamp-2">{promotion.description}</CardDescription>
        <div className="flex items-center text-xs text-muted-foreground pt-1">
          <Calendar size={14} className="mr-1 text-primary" />
          <span>Valid until: {new Date(promotion.validUntil).toLocaleDateString()}</span>
        </div>
        {promotion.discountCode && (
          <div className="flex items-center text-xs text-muted-foreground">
            <Tag size={14} className="mr-1 text-primary" />
            <span>Code: <strong className="text-accent">{promotion.discountCode}</strong></span>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 bg-muted/30">
        <Button asChild variant="default" size="sm" className="w-full" aria-label={`View details for ${promotion.title}`}>
          <Link href={getLinkForPromotion(promotion.type)}>
            <Ticket size={16} className="mr-2" />
            View Offer
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
