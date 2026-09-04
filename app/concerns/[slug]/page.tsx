'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CONCERNS } from '@/data/concerns';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import { ArrowLeft, Sparkles, HelpCircle } from 'lucide-react';
import { ConcernType } from '@/types/ecommerce';

export default function ConcernDetailPage({ params }: { params: { slug: string } }) {
  const concernKey = (params.slug as ConcernType) || 'acne';
  const concern = CONCERNS[concernKey] || CONCERNS['acne'];

  const matchedProducts = PRODUCTS.filter(p => p.concerns.includes(concernKey) || concern.productIds.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 space-y-12">
      <Link href="/shop" className="text-xs font-semibold uppercase text-brand-charcoal-light hover:text-brand-obsidian flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>

      {/* Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-brand-obsidian text-white p-8 md:p-14 min-h-[350px] flex items-center shadow-float">
        <Image src={concern.heroImage} alt={concern.title} fill className="object-cover opacity-20 filter grayscale" />
        <div className="relative z-10 space-y-4 max-w-2xl">
          <span className="badge-editorial bg-brand-rose text-white">{concern.tagline}</span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold">{concern.title}</h1>
          <p className="text-xs md:text-sm text-white/80 leading-relaxed">{concern.description}</p>

          <div className="pt-2 flex flex-wrap gap-2">
            {concern.recommendedIngredients.map((ing, i) => (
              <span key={i} className="bg-white/10 text-white text-xs px-3 py-1 rounded-full border border-white/20">
                ★ {ing}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Product Catalog Matches */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-brand-obsidian">
          Clinically-Inspired Formulations for {concern.title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {matchedProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* FAQs Section */}
      {concern.faq && (
        <div className="bg-white p-8 rounded-2xl border border-brand-grey-border space-y-6 shadow-subtle">
          <h3 className="font-serif text-xl font-bold text-brand-obsidian flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-brand-rose" /> Frequently Asked Questions
          </h3>
          <div className="space-y-4 text-xs">
            {concern.faq.map((item, idx) => (
              <div key={idx} className="border-b border-brand-grey-border/60 pb-3 space-y-1">
                <h4 className="font-bold text-brand-obsidian">{item.q}</h4>
                <p className="text-brand-charcoal-light leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
