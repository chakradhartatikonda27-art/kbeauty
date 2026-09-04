'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import { Star, Check, ShoppingBag, ArrowLeft, Sparkles } from 'lucide-react';

export default function ComparePage() {
  const { addToCart } = useShop();

  const p1 = PRODUCTS[0]; // BoJ Sunscreen
  const p2 = PRODUCTS[1]; // COSRX Snail
  const p3 = PRODUCTS[5]; // Torriden Serum

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 space-y-8">
      <div className="flex items-center justify-between border-b border-brand-grey-border pb-4">
        <div>
          <Link href="/shop" className="text-xs font-semibold uppercase text-brand-charcoal-light hover:text-brand-obsidian flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Return to Shop
          </Link>
          <h1 className="font-serif text-3xl font-bold text-brand-obsidian mt-1">Side-by-Side Product Comparison</h1>
        </div>
        <span className="badge-editorial bg-brand-rose text-white">Comparing 3 Products</span>
      </div>

      {/* Comparison Table Grid */}
      <div className="bg-white rounded-2xl border border-brand-grey-border overflow-x-auto shadow-subtle">
        <table className="w-full text-xs text-left border-collapse">
          <thead>
            <tr className="border-b border-brand-grey-border bg-brand-ivory">
              <th className="p-4 w-48 font-serif text-sm font-bold text-brand-obsidian">Feature</th>
              {[p1, p2, p3].map(p => (
                <th key={p.id} className="p-4 min-w-[220px]">
                  <div className="space-y-2">
                    <div className="relative aspect-square w-24 h-24 rounded-lg overflow-hidden border border-brand-grey-border bg-white mx-auto">
                      <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-brand-rose block text-center">{p.brand}</span>
                    <h3 className="font-semibold text-xs text-brand-obsidian text-center line-clamp-2">{p.name}</h3>
                    <button
                      onClick={() => addToCart(p)}
                      className="w-full bg-brand-obsidian text-white py-2 rounded-full font-semibold text-[11px] hover:bg-brand-rose transition-colors flex items-center justify-center gap-1"
                    >
                      <ShoppingBag className="w-3 h-3" /> Add • £{p.price.toFixed(2)}
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-grey-border">
            <tr>
              <td className="p-4 font-bold text-brand-obsidian bg-brand-ivory">Price (GBP £)</td>
              {[p1, p2, p3].map(p => (
                <td key={p.id} className="p-4 font-bold text-sm text-brand-obsidian">£{p.price.toFixed(2)}</td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-bold text-brand-obsidian bg-brand-ivory">Routine Step</td>
              {[p1, p2, p3].map(p => (
                <td key={p.id} className="p-4 uppercase font-semibold text-brand-rose">Step {p.routineStepNumber} ({p.category})</td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-bold text-brand-obsidian bg-brand-ivory">Key Active Ingredients</td>
              {[p1, p2, p3].map(p => (
                <td key={p.id} className="p-4">{p.ingredients.join(', ')}</td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-bold text-brand-obsidian bg-brand-ivory">Texture & Feel</td>
              {[p1, p2, p3].map(p => (
                <td key={p.id} className="p-4 font-medium">{p.texture}</td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-bold text-brand-obsidian bg-brand-ivory">Volume / Size</td>
              {[p1, p2, p3].map(p => (
                <td key={p.id} className="p-4">{p.size}</td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-bold text-brand-obsidian bg-brand-ivory">Customer Rating</td>
              {[p1, p2, p3].map(p => (
                <td key={p.id} className="p-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span className="font-bold">{p.rating.toFixed(1)}</span>
                    <span className="text-brand-charcoal-light">({p.reviewCount})</span>
                  </div>
                </td>
              ))}
            </tr>

            <tr>
              <td className="p-4 font-bold text-brand-obsidian bg-brand-ivory">AI Compatibility Score</td>
              {[p1, p2, p3].map(p => (
                <td key={p.id} className="p-4">
                  <span className="bg-brand-rose text-white font-bold text-[11px] px-2.5 py-1 rounded-full inline-flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> {p.aiMetadata.matchScoreDefault}% Match
                  </span>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
