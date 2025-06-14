'use client';

import type { CartItem, Flight, Activity } from '@/types';
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Flight | Activity, itemType: 'flight' | 'activity') => void;
  removeFromCart: (itemId: string, itemType: 'flight' | 'activity') => void;
  updateQuantity: (itemId: string, itemType: 'flight' | 'activity', quantity: number) => void;
  getTotalPrice: () => number;
  clearCart: () => void;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = useCallback((item: Flight | Activity, itemType: 'flight' | 'activity') => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (ci) => ci.details.id === item.id && ci.itemType === itemType
      );
      if (existingItem) {
        return prevItems.map((ci) =>
          ci.details.id === item.id && ci.itemType === itemType
            ? { ...ci, quantity: ci.quantity + 1 }
            : ci
        );
      }
      return [...prevItems, { itemType, details: item, quantity: 1 } as CartItem];
    });
    toast({
      title: "Added to Cart",
      description: `${itemType === 'flight' ? (item as Flight).airline + ' Flight' : (item as Activity).name} added to your cart.`,
      variant: "default",
      duration: 3000,
    });
  }, [toast]);

  const removeFromCart = useCallback((itemId: string, itemType: 'flight' | 'activity') => {
    setCartItems((prevItems) =>
      prevItems.filter((ci) => !(ci.details.id === itemId && ci.itemType === itemType))
    );
     toast({
      title: "Item Removed",
      description: `Item removed from your cart.`,
      variant: "default",
      duration: 3000,
    });
  }, [toast]);

  const updateQuantity = useCallback((itemId: string, itemType: 'flight' | 'activity', quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId, itemType);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((ci) =>
        ci.details.id === itemId && ci.itemType === itemType
          ? { ...ci, quantity }
          : ci
      )
    );
  }, [removeFromCart]);

  const getTotalPrice = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.details.price * item.quantity, 0);
  }, [cartItems]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);
  
  const getItemCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, getTotalPrice, clearCart, getItemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
