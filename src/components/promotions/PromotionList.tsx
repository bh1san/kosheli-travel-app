import type { Promotion } from '@/types';
import { PromotionCard } from './PromotionCard';

interface PromotionListProps {
  promotions: Promotion[];
  title?: string;
}

export function PromotionList({ promotions, title = "Special Offers" }: PromotionListProps) {
  if (promotions.length === 0) {
    return <p className="text-center text-muted-foreground">No promotions available at the moment.</p>;
  }
  return (
    <section className="py-8">
      {title && <h2 className="text-3xl font-headline font-semibold mb-6 text-center md:text-left">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promotions.map((promotion) => (
          <PromotionCard key={promotion.id} promotion={promotion} />
        ))}
      </div>
    </section>
  );
}
