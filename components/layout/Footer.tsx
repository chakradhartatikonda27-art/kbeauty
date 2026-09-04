'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, RotateCcw, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-obsidian text-white border-t border-brand-charcoal-light/30 pt-16 pb-24 lg:pb-12">
      {/* UK Trust Indicators Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 text-brand-rose">
            <Truck className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h4 className="text-xs uppercase font-semibold tracking-wider text-white mb-1">Free UK Delivery</h4>
          <p className="text-[11px] text-white/60">On all UK orders over £35</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 text-brand-rose">
            <ShieldCheck className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h4 className="text-xs uppercase font-semibold tracking-wider text-white mb-1">100% Authentic K-Beauty</h4>
          <p className="text-[11px] text-white/60">Sourced directly from Seoul</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 text-brand-rose">
            <Sparkles className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h4 className="text-xs uppercase font-semibold tracking-wider text-white mb-1">Free Deluxe Samples</h4>
          <p className="text-[11px] text-white/60">Included with every single order</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mb-3 text-brand-rose">
            <RotateCcw className="w-5 h-5 stroke-[1.5]" />
          </div>
          <h4 className="text-xs uppercase font-semibold tracking-wider text-white mb-1">30-Day Hassle-Free Returns</h4>
          <p className="text-[11px] text-white/60">UK returns center support</p>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand & Newsletter Column */}
        <div className="lg:col-span-2 space-y-4">
          <span className="font-serif text-2xl font-bold tracking-tight text-white block">
            SEOUL LABS UK
          </span>
          <p className="text-xs text-white/70 max-w-sm leading-relaxed">
            Korean beauty, intelligently matched to you. Blending Seoul&apos;s leading skincare formulations with AI routine alignment for UK skin types.
          </p>

          {/* Newsletter Input */}
          <div className="pt-2">
            <h5 className="text-xs uppercase font-semibold tracking-wider text-white mb-2">
              Join the K-Beauty Club & Get 10% Off
            </h5>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 max-w-md">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="bg-white/10 border border-white/20 rounded-full py-2.5 px-4 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-brand-rose flex-1"
              />
              <button
                type="submit"
                className="bg-brand-rose text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-brand-rose-dark transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* SHOP */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase font-semibold tracking-wider text-brand-rose">Shop</h4>
          <ul className="space-y-2 text-xs text-white/70 font-normal">
            <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link href="/shop?category=cleanser" className="hover:text-white transition-colors">Cleansers</Link></li>
            <li><Link href="/shop?category=serum" className="hover:text-white transition-colors">Serums & Ampoules</Link></li>
            <li><Link href="/shop?category=spf" className="hover:text-white transition-colors">Sun Care (SPF)</Link></li>
            <li><Link href="/shop?filter=bestseller" className="hover:text-white transition-colors">Bestsellers</Link></li>
          </ul>
        </div>

        {/* DISCOVER */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase font-semibold tracking-wider text-brand-rose">Discover AI</h4>
          <ul className="space-y-2 text-xs text-white/70 font-normal">
            <li><Link href="/quiz" className="hover:text-white transition-colors flex items-center gap-1.5"><Sparkles className="w-3 h-3 text-brand-rose" /> AI Skin Quiz</Link></li>
            <li><Link href="/ingredients" className="hover:text-white transition-colors">Ingredient Library</Link></li>
            <li><Link href="/concerns/acne" className="hover:text-white transition-colors">Concern Solutions</Link></li>
            <li><Link href="/journal" className="hover:text-white transition-colors">Skincare Journal</Link></li>
            <li><Link href="/compare" className="hover:text-white transition-colors">Product Comparator</Link></li>
          </ul>
        </div>

        {/* HELP & LEGAL */}
        <div className="space-y-3">
          <h4 className="text-xs uppercase font-semibold tracking-wider text-brand-rose">Help & Info</h4>
          <ul className="space-y-2 text-xs text-white/70 font-normal">
            <li><Link href="/account" className="hover:text-white transition-colors">Track Order</Link></li>
            <li><Link href="/account?tab=rewards" className="hover:text-white transition-colors">Loyalty Rewards</Link></li>
            <li><span className="cursor-pointer hover:text-white">UK Delivery & Taxes</span></li>
            <li><span className="cursor-pointer hover:text-white">Authenticity Guarantee</span></li>
            <li><span className="cursor-pointer hover:text-white">Privacy & Terms</span></li>
          </ul>
        </div>
      </div>

      {/* Cosmetic AI Disclaimer & Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 mt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-[11px] text-white/40 gap-4">
        <p>© 2026 SEOUL LABS UK LTD. All Rights Reserved. Prices include UK VAT.</p>
        <p className="max-w-xl text-center md:text-right">
          Disclaimer: AI skin recommendations are for cosmetic skincare guidance only and do not constitute medical advice or dermatological diagnosis.
        </p>
      </div>
    </footer>
  );
}
