'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BRANDS, PRODUCTS } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function BrandDetailPage({ params }: { params: { slug: string } }) {
  const brand = BRANDS.find(b => b.slug === params.slug) || BRANDS[0];
  const brandProducts = PRODUCTS.filter(p => p.brand.toLowerCase() === brand.name.toLowerCase());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 space-y-12">
      <Link href="/shop" className="text-xs font-semibold uppercase text-brand-charcoal-light hover:text-brand-obsidian flex items-center gap-1">
        <ArrowLeft className="w-4 h-4" /> Back to Shop
      </Link>

      {/* Brand Hero */}
      <div className="relative rounded-3xl overflow-hidden bg-brand-obsidian text-white p-8 md:p-14 min-h-[350px] flex items-center shadow-float">
        <Image src={brand.heroImage} alt={brand.name} fill className="object-cover opacity-25" />
        <div className="relative z-10 space-y-4 max-w-2xl">
          <span className="badge-editorial bg-brand-rose text-white">{brand.origin}</span>
          <h1 className="font-serif text-3xl md:text-5xl font-bold">{brand.name}</h1>
          <p className="text-xs md:text-sm text-white/80 leading-relaxed">{brand.description}</p>
          <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-xs">
            <strong className="text-brand-rose block mb-1">Brand Philosophy:</strong>
            <p className="italic">{brand.philosophy}</p>
          </div>
        </div>
      </div>

      {/* Brand Catalog */}
      <div className="space-y-6">
        <h2 className="font-serif text-2xl font-bold text-brand-obsidian">
          Shop Authentic {brand.name} Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {brandProducts.map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
