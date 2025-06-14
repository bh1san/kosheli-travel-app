import { MainLayout } from '@/components/layout/MainLayout';
import { CartView } from '@/components/cart/CartView';

export default function CartPage() {
  return (
    <MainLayout>
      <div className="space-y-8">
        <section className="text-center py-8">
          <h1 className="text-4xl font-bold font-headline text-primary">Your Shopping Cart</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Review your selected flights and activities before proceeding to checkout.
          </p>
        </section>
        
        <CartView />
      </div>
    </MainLayout>
  );
}
