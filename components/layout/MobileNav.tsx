'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useShop } from '@/context/ShopContext';
import { Home, Grid, Sparkles, Heart, ShoppingBag } from 'lucide-react';

export default function MobileNav() {
  const pathname = usePathname();
  const { cart, wishlist, openCart, openSkinQuiz } = useShop();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-brand-grey-border shadow-float px-4 py-2 flex items-center justify-around text-[10px] font-medium text-brand-charcoal">
      <Link
        href="/"
        className={`flex flex-col items-center gap-1 p-1 ${pathname === '/' ? 'text-brand-rose font-bold' : 'text-brand-charcoal-light'}`}
      >
        <Home className="w-5 h-5 stroke-[1.75]" />
        <span>Home</span>
      </Link>

      <Link
        href="/shop"
        className={`flex flex-col items-center gap-1 p-1 ${pathname === '/shop' ? 'text-brand-rose font-bold' : 'text-brand-charcoal-light'}`}
      >
        <Grid className="w-5 h-5 stroke-[1.75]" />
        <span>Shop</span>
      </Link>

      {/* AI Match Core Floating Action */}
      <button
        onClick={openSkinQuiz}
        className="flex flex-col items-center justify-center bg-gradient-to-tr from-brand-rose to-brand-rose-dark text-white rounded-full w-12 h-12 -mt-5 shadow-lg border-2 border-white transition-transform active:scale-95"
      >
        <Sparkles className="w-5 h-5 animate-pulse" />
        <span className="text-[9px] font-bold tracking-tight uppercase -mt-0.5">Match</span>
      </button>

      <Link
        href="/account?tab=wishlist"
        className={`flex flex-col items-center gap-1 p-1 relative ${pathname?.includes('wishlist') ? 'text-brand-rose font-bold' : 'text-brand-charcoal-light'}`}
      >
        <Heart className="w-5 h-5 stroke-[1.75]" />
        {wishlist.length > 0 && (
          <span className="absolute top-0 right-2 bg-brand-rose text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
            {wishlist.length}
          </span>
        )}
        <span>Wishlist</span>
      </Link>

      <button
        onClick={openCart}
        className="flex flex-col items-center gap-1 p-1 relative text-brand-charcoal-light"
      >
        <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
        {cartCount > 0 && (
          <span className="absolute top-0 right-2 bg-brand-obsidian text-white text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-bold">
            {cartCount}
          </span>
        )}
        <span>Bag</span>
      </button>
    </nav>
  );
}
