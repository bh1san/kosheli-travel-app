import { PromotionList } from '@/components/promotions/PromotionList';
import { MainLayout } from '@/components/layout/MainLayout';
import { mockPromotions } from '@/lib/mockData';

export default function PromotionsPage() {
  const promotions = mockPromotions;

  return (
    <MainLayout>
      <div className="space-y-8">
        <section className="text-center py-8 bg-card shadow-md rounded-lg">
          <h1 className="text-4xl font-bold font-headline text-primary">Exclusive Deals & Promotions</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't miss out on our latest offers for flights and activities. Save big on your next adventure!
          </p>
        </section>
        
        <PromotionList promotions={promotions} title="All Current Promotions"/>
      </div>
    </MainLayout>
  );
}
