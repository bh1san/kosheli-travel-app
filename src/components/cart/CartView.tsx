'use client';

import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Trash2, PlusCircle, MinusCircle, ShoppingCart, CreditCard } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";

export function CartView() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    // In a real app, this would navigate to a checkout page and integrate with a payment gateway.
    toast({
      title: "Checkout Initiated",
      description: "This is a demo. Payment processing is not implemented.",
      variant: "default",
      duration: 5000,
    });
    // Optionally, clear cart after checkout attempt
    // clearCart(); 
  };
  
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-10">
        <ShoppingCart size={64} className="mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2 font-headline">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-6">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild>
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {cartItems.map((item) => (
          <Card key={`${item.itemType}-${item.details.id}`} className="flex flex-col md:flex-row overflow-hidden shadow-md">
            <div className="md:w-1/4 p-4 flex items-center justify-center">
              {item.itemType === 'flight' && item.details.airlineLogoUrl && (
                <Image src={item.details.airlineLogoUrl} alt={item.details.airline} width={100} height={40} className="object-contain" data-ai-hint="airline logo"/>
              )}
              {item.itemType === 'activity' && (
                <Image src={item.details.imageUrl} alt={item.details.name} width={150} height={100} className="object-cover rounded-md" data-ai-hint="activity image"/>
              )}
            </div>
            <div className="flex-grow p-4 space-y-2">
              <h3 className="text-lg font-semibold font-headline">
                {item.itemType === 'flight' ? `${item.details.airline} Flight` : item.details.name}
              </h3>
              {item.itemType === 'flight' && (
                <p className="text-sm text-muted-foreground">
                  {item.details.departureAirportCode} to {item.details.arrivalAirportCode}
                </p>
              )}
              <p className="text-lg font-semibold text-primary">{item.details.price.toFixed(2)} AED</p>
            </div>
            <div className="p-4 flex flex-col md:flex-row items-center justify-between md:w-1/3 space-y-2 md:space-y-0 md:space-x-2 bg-muted/30">
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.details.id, item.itemType, item.quantity - 1)} aria-label="Decrease quantity">
                  <MinusCircle size={18} />
                </Button>
                <Input type="number" value={item.quantity} readOnly className="w-12 text-center" aria-label="Item quantity"/>
                <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.details.id, item.itemType, item.quantity + 1)} aria-label="Increase quantity">
                  <PlusCircle size={18} />
                </Button>
              </div>
              <Button variant="outline" size="icon" onClick={() => removeFromCart(item.details.id, item.itemType)} aria-label="Remove item">
                <Trash2 size={18} className="text-destructive" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="lg:col-span-1">
        <Card className="shadow-xl sticky top-24">
          <CardHeader>
            <CardTitle className="text-2xl font-headline text-center">Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{getTotalPrice().toFixed(2)} AED</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & Fees</span>
              <span>Calculated at checkout</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>{getTotalPrice().toFixed(2)} AED</span>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button className="w-full" onClick={handleCheckout} aria-label="Proceed to Checkout">
              <CreditCard size={18} className="mr-2" />
              Proceed to Checkout
            </Button>
            <Button variant="outline" className="w-full" onClick={clearCart} aria-label="Clear cart">
              Clear Cart
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
