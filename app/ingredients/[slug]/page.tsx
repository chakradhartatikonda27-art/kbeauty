'use client';

import React from 'react';
import Link from 'next/link';
import { INGREDIENTS } from '@/data/ingredients';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import { ArrowLeft, Check, Sparkles } from 'lucide-react';

export default function IngredientDetailPage({ params }: { params: { slug: string } }) {
  const ingredient = INGREDIENTS.find(i => i.slug === params.slug) || INGREDIENTS[0];
  const matchingProducts = PRODUCTS.filter(p => ingredient.popularProducts.includes(p.id) || p.ingredients.some(i => i.toLowerCase().includes(ingredient.slug.replace('-', ' '))));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 space-y-12">
      <Link href="/ingredients" className="text-xs font-semibold uppercase text-brand-charcoal-light hover:text-brand-obsidian flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" /> Return to Ingredient Hub
      </Link>

      <div className="bg-white p-8 md:p-12 rounded-3xl border border-brand-grey-border space-y-6 shadow-subtle">
        <div className="space-y-2">
          <span className="badge-editorial bg-brand-rose text-white">{ingredient.koreanName}</span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-brand-obsidian">{ingredient.name}</h1>
        </div>

        <p className="text-xs md:text-sm text-brand-charcoal-light leading-relaxed max-w-3xl">
          {ingredient.description}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-brand-grey-border">
          <div className="space-y-2">
            <h3 className="font-serif text-base font-bold text-brand-obsidian">Who May Prefer It</h3>
            <p className="text-xs text-brand-charcoal-light">{ingredient.bestFor}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-base font-bold text-brand-obsidian">How to Use</h3>
            <p className="text-xs text-brand-charcoal-light">{ingredient.howToUse}</p>
          </div>

          <div className="space-y-2">
            <h3 className="font-serif text-base font-bold text-brand-obsidian">Pairs Well With</h3>
            <p className="text-xs text-brand-rose font-semibold">{ingredient.pairsWellWith.join(', ')}</p>
          </div>
        </div>
      </div>

      {/* Matching Products Catalog */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-brand-obsidian">
          Korean Formulations Containing {ingredient.name}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {matchingProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
