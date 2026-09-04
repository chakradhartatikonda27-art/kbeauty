'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { Search, ShoppingBag, Heart, User, Sparkles, ChevronDown, Menu, X, Home } from 'lucide-react';

export default function Header() {
  const {
    announcementText,
    cart,
    wishlist,
    openCart,
    openAISearch,
    openSkinQuiz
  } = useShop();

  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-brand-ivory border-b border-brand-grey-border/60 transition-smooth">
      {/* Announcement Bar */}
      <div className="bg-brand-obsidian text-white py-2 px-4 text-center text-xs tracking-wider font-medium flex justify-center items-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-brand-rose animate-pulse" />
        <span>{announcementText}</span>
        <span className="hidden md:inline-block opacity-40">|</span>
        <span className="hidden md:inline-block text-brand-rose">EXPRESS UK DELIVERY AVAILABLE</span>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-3">
        {/* Left: Mobile Toggle & Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-brand-charcoal p-2 hover:text-brand-rose transition-colors touch-target flex items-center justify-center"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <Link href="/" className="group flex flex-col">
            <span className="font-serif text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-brand-obsidian group-hover:text-brand-rose transition-colors">
              SEOUL LABS
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-brand-charcoal-light/70 font-semibold -mt-1">
              UNITED KINGDOM
            </span>
          </Link>
        </div>

        {/* Center: Intelligent AI Search Trigger */}
        <div className="hidden md:flex flex-1 max-w-lg mx-4 lg:mx-6">
          <button
            onClick={openAISearch}
            className="w-full bg-white border border-brand-grey-border rounded-full py-2.5 px-4 text-left text-sm text-brand-charcoal-light flex items-center justify-between hover:border-brand-rose/60 transition-smooth shadow-subtle group touch-target"
          >
            <div className="flex items-center gap-2.5">
              <Search className="w-4 h-4 text-brand-rose group-hover:scale-110 transition-transform" />
              <span className="text-brand-charcoal/70">Search products, ingredients, concerns...</span>
            </div>
            <kbd className="bg-brand-grey text-brand-charcoal-light text-[10px] font-mono px-2 py-0.5 rounded uppercase border border-brand-grey-border">
              Cmd + K
            </kbd>
          </button>
        </div>

        {/* Right: Actions (Account, Wishlist, Cart) */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
          <button
            onClick={openAISearch}
            className="md:hidden text-brand-charcoal p-2 hover:text-brand-rose transition-colors touch-target flex items-center justify-center"
            aria-label="Open AI Search"
          >
            <Search className="w-5 h-5" />
          </button>

          <Link
            href="/account"
            className="hidden sm:flex items-center gap-1.5 text-xs uppercase tracking-wider font-semibold text-brand-charcoal hover:text-brand-rose transition-colors p-1.5 min-h-[44px]"
          >
            <User className="w-5 h-5 stroke-[1.5]" />
            <span className="hidden xl:inline">Account</span>
          </Link>

          <Link
            href="/account?tab=wishlist"
            className="flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-brand-charcoal hover:text-brand-rose transition-colors p-1.5 relative min-h-[44px]"
          >
            <Heart className="w-5 h-5 stroke-[1.5]" />
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-0 bg-brand-rose text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {wishlist.length}
              </span>
            )}
            <span className="hidden xl:inline">Wishlist</span>
          </Link>

          {/* Bag Drawer Trigger */}
          <button
            onClick={openCart}
            className="flex items-center gap-2 bg-brand-obsidian text-white px-3.5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-brand-charcoal transition-smooth shadow-sm min-h-[40px] touch-target"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2]" />
            <span className="hidden xs:inline">Bag</span>
            <span className="bg-brand-rose text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
              {cartItemCount}
            </span>
          </button>
        </div>
      </div>

      {/* Navigation Bar & Editorial Mega Menu */}
      <nav className="hidden lg:block border-t border-brand-grey-border/40 bg-brand-ivory">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs font-medium uppercase tracking-wider">
          <div className="flex items-center gap-7 py-3">
            <Link href="/" className="hover:text-brand-rose transition-colors py-1 flex items-center gap-1 font-bold text-brand-obsidian">
              <Home className="w-3.5 h-3.5 text-brand-rose" /> Home
            </Link>

            <Link href="/shop" className="hover:text-brand-rose transition-colors py-1">
              Shop All
            </Link>

            {/* Skincare Mega Menu Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveMegaMenu('skincare')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link href="/shop?category=skincare" className="flex items-center gap-1 py-1 group-hover:text-brand-rose">
                Skincare <ChevronDown className="w-3.5 h-3.5" />
              </Link>
            </div>

            <Link href="/shop?category=cleanser" className="hover:text-brand-rose transition-colors py-1">
              Cleansers
            </Link>
            <Link href="/shop?category=serum" className="hover:text-brand-rose transition-colors py-1">
              Serums
            </Link>

            {/* Concerns Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setActiveMegaMenu('concerns')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link href="/shop" className="flex items-center gap-1 py-1 group-hover:text-brand-rose">
                Concerns <ChevronDown className="w-3.5 h-3.5" />
              </Link>
            </div>

            <Link href="/ingredients" className="hover:text-brand-rose transition-colors py-1">
              Ingredients
            </Link>

            <Link href="/shop?filter=bestseller" className="hover:text-brand-rose transition-colors py-1">
              Bestsellers
            </Link>

            <Link href="/journal" className="hover:text-brand-rose transition-colors py-1">
              Journal
            </Link>
          </div>

          {/* Visually Highlighted AI SKIN MATCH Item */}
          <button
            onClick={openSkinQuiz}
            className="flex items-center gap-2 bg-gradient-to-r from-brand-blush to-brand-grey text-brand-obsidian px-3.5 py-1.5 rounded-full border border-brand-rose/40 font-semibold hover:border-brand-rose hover:shadow-subtle transition-smooth"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-rose animate-spin-slow" />
            <span>AI Skin Match</span>
          </button>
        </div>

        {/* Mega Menu Overlay */}
        {activeMegaMenu && (
          <div
            className="absolute top-full left-0 w-full bg-white border-b border-brand-grey-border shadow-float py-8 px-12 transition-all duration-300 z-50"
            onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">
              {activeMegaMenu === 'skincare' && (
                <>
                  <div>
                    <h4 className="font-serif text-sm font-semibold uppercase text-brand-obsidian mb-3 pb-1 border-b border-brand-grey-border">
                      By Category
                    </h4>
                    <ul className="space-y-2 text-xs text-brand-charcoal-light font-normal capitalize">
                      <li><Link href="/shop?category=cleanser" className="hover:text-brand-rose">Cleansers</Link></li>
                      <li><Link href="/shop?category=toner" className="hover:text-brand-rose">Toners & Mists</Link></li>
                      <li><Link href="/shop?category=essence" className="hover:text-brand-rose">Essences</Link></li>
                      <li><Link href="/shop?category=serum" className="hover:text-brand-rose">Serums & Ampoules</Link></li>
                      <li><Link href="/shop?category=moisturiser" className="hover:text-brand-rose">Moisturisers</Link></li>
                      <li><Link href="/shop?category=spf" className="hover:text-brand-rose">Sunscreen (SPF)</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-serif text-sm font-semibold uppercase text-brand-obsidian mb-3 pb-1 border-b border-brand-grey-border">
                      Shop by Concern
                    </h4>
                    <ul className="space-y-2 text-xs text-brand-charcoal-light font-normal capitalize">
                      <li><Link href="/concerns/acne" className="hover:text-brand-rose">Acne & Breakouts</Link></li>
                      <li><Link href="/concerns/pigmentation" className="hover:text-brand-rose">Hyperpigmentation</Link></li>
                      <li><Link href="/concerns/dryness" className="hover:text-brand-rose">Dryness & Dehydration</Link></li>
                      <li><Link href="/concerns/redness" className="hover:text-brand-rose">Redness & Sensitivity</Link></li>
                      <li><Link href="/concerns/barrier" className="hover:text-brand-rose">Barrier Repair</Link></li>
                      <li><Link href="/concerns/pores" className="hover:text-brand-rose">Enlarged Pores</Link></li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-serif text-sm font-semibold uppercase text-brand-obsidian mb-3 pb-1 border-b border-brand-grey-border">
                      Featured Brands
                    </h4>
                    <ul className="space-y-2 text-xs text-brand-charcoal-light font-normal">
                      <li><Link href="/brands/beauty-of-joseon" className="hover:text-brand-rose">Beauty of Joseon</Link></li>
                      <li><Link href="/brands/cosrx" className="hover:text-brand-rose">COSRX</Link></li>
                      <li><Link href="/brands/anua" className="hover:text-brand-rose">Anua</Link></li>
                      <li><Link href="/brands/skin1004" className="hover:text-brand-rose">SKIN1004</Link></li>
                    </ul>
                  </div>

                  {/* Mega Menu Editorial Panel */}
                  <div className="bg-brand-ivory p-4 rounded-lg border border-brand-grey-border flex flex-col justify-between">
                    <div>
                      <span className="badge-editorial bg-brand-rose text-white mb-2 inline-block">
                        AI Skin Matching
                      </span>
                      <h5 className="font-serif text-base font-bold text-brand-obsidian mb-1">
                        Not sure where to start?
                      </h5>
                      <p className="text-xs text-brand-charcoal-light mb-3">
                        Take our 2-minute diagnostic skin quiz to get a clinically aligned Korean routine.
                      </p>
                    </div>
                    <button
                      onClick={openSkinQuiz}
                      className="text-xs font-semibold uppercase tracking-wider text-brand-rose hover:text-brand-obsidian transition-colors text-left"
                    >
                      Start Skin Quiz →
                    </button>
                  </div>
                </>
              )}

              {activeMegaMenu === 'concerns' && (
                <>
                  <div>
                    <h4 className="font-serif text-sm font-semibold uppercase text-brand-obsidian mb-3 pb-1 border-b border-brand-grey-border">
                      Skin Concerns
                    </h4>
                    <ul className="space-y-2 text-xs text-brand-charcoal-light font-normal">
                      <li><Link href="/concerns/acne" className="hover:text-brand-rose">Acne & Blemishes</Link></li>
                      <li><Link href="/concerns/pigmentation" className="hover:text-brand-rose">Dark Spots & Tone</Link></li>
                      <li><Link href="/concerns/dryness" className="hover:text-brand-rose">Dehydration</Link></li>
                      <li><Link href="/concerns/redness" className="hover:text-brand-rose">Flushed & Reactive</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-semibold uppercase text-brand-obsidian mb-3 pb-1 border-b border-brand-grey-border">
                      Barrier & Texture
                    </h4>
                    <ul className="space-y-2 text-xs text-brand-charcoal-light font-normal">
                      <li><Link href="/concerns/barrier" className="hover:text-brand-rose">Compromised Barrier</Link></li>
                      <li><Link href="/concerns/pores" className="hover:text-brand-rose">Enlarged Pores</Link></li>
                      <li><Link href="/concerns/dullness" className="hover:text-brand-rose">Dullness & Roughness</Link></li>
                      <li><Link href="/concerns/anti-ageing" className="hover:text-brand-rose">Slow Ageing</Link></li>
                    </ul>
                  </div>
                  <div className="col-span-2 bg-brand-blush/40 p-5 rounded-lg border border-brand-blush-border flex items-center justify-between">
                    <div>
                      <h5 className="font-serif text-lg font-bold text-brand-obsidian mb-1">
                        Concern-Based AI Recommendations
                      </h5>
                      <p className="text-xs text-brand-charcoal-light max-w-sm">
                        Tell our AI shopping assistant what your skin is experiencing and get tailored suggestions.
                      </p>
                    </div>
                    <button
                      onClick={openAISearch}
                      className="bg-brand-obsidian text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-brand-rose transition-colors whitespace-nowrap"
                    >
                      Ask AI Assistant
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Menu Drawer Sheet (Touch-optimized slide-over) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[105px] bottom-0 bg-brand-ivory/98 backdrop-blur-xl z-50 overflow-y-auto p-6 pb-24 shadow-2xl animate-fade-in border-b border-brand-grey-border">
          <div className="space-y-6 max-w-md mx-auto">
            {/* Quick Search Button */}
            <button
              onClick={() => { openAISearch(); setIsMobileMenuOpen(false); }}
              className="w-full bg-white border border-brand-grey-border rounded-full py-3 px-4 text-left text-sm text-brand-charcoal flex items-center justify-between shadow-subtle"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-brand-rose" />
                <span className="text-xs font-medium">Search products, concerns...</span>
              </div>
              <span className="text-[10px] bg-brand-rose text-white px-2 py-0.5 rounded-full font-bold uppercase">AI Search</span>
            </button>

            {/* Skin Quiz CTA */}
            <button
              onClick={() => { openSkinQuiz(); setIsMobileMenuOpen(false); }}
              className="w-full bg-gradient-to-r from-brand-blush to-brand-grey text-brand-obsidian py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-brand-rose/40 shadow-subtle"
            >
              <Sparkles className="w-4 h-4 text-brand-rose animate-spin-slow" />
              <span>Take AI Skin Match Quiz</span>
            </button>

            {/* Nav Links */}
            <div className="space-y-1 font-semibold text-sm divide-y divide-brand-grey-border/60">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2.5 py-3 font-bold text-brand-obsidian active:text-brand-rose">
                <Home className="w-4 h-4 text-brand-rose" /> Home
              </Link>
              <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-brand-charcoal active:text-brand-rose">Shop All Products</Link>
              <Link href="/shop?filter=bestseller" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-brand-charcoal active:text-brand-rose">Bestsellers</Link>
              <Link href="/concerns/acne" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-brand-charcoal active:text-brand-rose">Shop by Skin Concern</Link>
              <Link href="/ingredients" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-brand-charcoal active:text-brand-rose">Ingredients Guide</Link>
              <Link href="/journal" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-brand-charcoal active:text-brand-rose">K-Beauty Journal</Link>
              <Link href="/account" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 text-brand-charcoal active:text-brand-rose">My Account & Routine</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
