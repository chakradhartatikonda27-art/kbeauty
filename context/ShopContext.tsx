'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, SkinProfile, UserRoutine } from '@/types/ecommerce';
import { PRODUCTS } from '@/data/products';

interface ShopContextType {
  cart: CartItem[];
  wishlist: string[];
  userProfile: SkinProfile | null;
  savedRoutine: UserRoutine | null;
  isCartOpen: boolean;
  isAISearchOpen: boolean;
  isAIAssistantOpen: boolean;
  isSkinQuizOpen: boolean;
  announcementText: string;
  setAnnouncementText: (text: string) => void;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openAISearch: () => void;
  closeAISearch: () => void;
  openAIAssistant: () => void;
  closeAIAssistant: () => void;
  openSkinQuiz: () => void;
  closeSkinQuiz: () => void;
  setUserProfile: (profile: SkinProfile) => void;
  setSavedRoutine: (routine: UserRoutine) => void;
  cartSubtotal: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['boj-relief-sun', 'cosrx-snail-96-essence']);
  const [userProfile, setUserProfile] = useState<SkinProfile | null>(null);
  const [savedRoutine, setSavedRoutine] = useState<UserRoutine | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAISearchOpen, setIsAISearchOpen] = useState(false);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [isSkinQuizOpen, setIsSkinQuizOpen] = useState(false);
  const [announcementText, setAnnouncementText] = useState('FREE UK DELIVERY OVER £35 • FREE K-BEAUTY SAMPLES WITH EVERY ORDER');

  // Initial demo cart items
  useEffect(() => {
    setCart([
      { product: PRODUCTS[0], quantity: 1 },
      { product: PRODUCTS[1], quantity: 1 }
    ]);
  }, []);

  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        userProfile,
        savedRoutine,
        isCartOpen,
        isAISearchOpen,
        isAIAssistantOpen,
        isSkinQuizOpen,
        announcementText,
        setAnnouncementText,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isInWishlist,
        clearCart,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        openAISearch: () => setIsAISearchOpen(true),
        closeAISearch: () => setIsAISearchOpen(false),
        openAIAssistant: () => setIsAIAssistantOpen(true),
        closeAIAssistant: () => setIsAIAssistantOpen(false),
        openSkinQuiz: () => setIsSkinQuizOpen(true),
        closeSkinQuiz: () => setIsSkinQuizOpen(false),
        setUserProfile,
        setSavedRoutine,
        cartSubtotal
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
