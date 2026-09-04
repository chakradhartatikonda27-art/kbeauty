'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PRODUCTS } from '@/data/products';
import { useShop } from '@/context/ShopContext';
import { calculatePDPScore } from '@/lib/ai/service';
import ProductCard from '@/components/product/ProductCard';
import { Star, Heart, ShoppingBag, Check, ShieldCheck, Truck, Sparkles, Clock, Layers, Info } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = PRODUCTS.find(p => p.slug === params.slug) || PRODUCTS[0];
  const { addToCart, toggleWishlist, isInWishlist, userProfile } = useShop();

  const [selectedImage, setSelectedImage] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [activeIngredientModal, setActiveIngredientModal] = useState<string | null>(null);

  const isSaved = isInWishlist(product.id);
  const aiScore = calculatePDPScore(product, userProfile || undefined);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 space-y-16">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-brand-charcoal-light">
        <Link href="/" className="hover:text-brand-obsidian">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-brand-obsidian">Shop</Link>
        <span>/</span>
        <span className="text-brand-obsidian font-semibold truncate">{product.name}</span>
      </div>

      {/* Above Fold Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Left: Gallery */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-brand-ivory border border-brand-grey-border shadow-card">
            <Image
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              fill
              priority
              className="object-cover"
            />

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {product.bestseller && (
                <span className="badge-editorial bg-brand-obsidian text-white shadow-subtle">
                  Bestseller
                </span>
              )}
              {product.viral && (
                <span className="badge-editorial bg-brand-rose text-white shadow-subtle">
                  TikTok Viral
                </span>
              )}
              {product.vegan && (
                <span className="badge-editorial bg-brand-accent text-white shadow-subtle">
                  Vegan Formula
                </span>
              )}
            </div>
          </div>

          {/* Thumbnail Gallery Row */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx ? 'border-brand-rose shadow-subtle' : 'border-brand-grey-border opacity-70'
                  }`}
                >
                  <Image src={img} alt="Thumbnail" fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Add Actions */}
        <div className="space-y-6">
          <div>
            <span className="text-xs uppercase font-bold text-brand-rose tracking-wider">{product.brand}</span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-obsidian mt-1 leading-tight">
              {product.name}
            </h1>
            <p className="text-xs text-brand-charcoal-light mt-2">{product.shortDescription}</p>
          </div>

          {/* Rating & Review */}
          <div className="flex items-center gap-3 text-xs border-y border-brand-grey-border py-3">
            <div className="flex items-center text-amber-500 gap-1">
              <Star className="w-4 h-4 fill-amber-400 stroke-amber-500" />
              <span className="font-bold text-brand-obsidian">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-brand-charcoal-light">Based on {product.reviewCount} verified UK customer reviews</span>
          </div>

          {/* Pricing & UK Installment */}
          <div className="space-y-1">
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl font-bold text-brand-obsidian">
                £{product.price.toFixed(2)}
              </span>
              {product.compareAtPrice && (
                <span className="text-sm line-through text-brand-charcoal-light/60">
                  £{product.compareAtPrice.toFixed(2)}
                </span>
              )}
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                In Stock — UK Dispatch
              </span>
            </div>
            <p className="text-[11px] text-brand-charcoal-light">
              Pay in 3 interest-free installments of <strong>£{(product.price / 3).toFixed(2)}</strong> with Klarna or Clearpay.
            </p>
          </div>

          {/* AI Match Compatibility Card */}
          <div className="bg-gradient-to-r from-brand-blush/80 to-white p-4 rounded-xl border border-brand-blush-border space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-rose flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> AI Compatibility Match
              </span>
              <span className="bg-brand-rose text-white font-bold text-xs px-2.5 py-0.5 rounded-full">
                {aiScore.score}% MATCH
              </span>
            </div>
            <ul className="text-xs space-y-1 text-brand-charcoal">
              {aiScore.reasons.map((r, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-brand-rose shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Add to Bag Actions */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-4 px-6 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-smooth shadow-float ${
                isAdded ? 'bg-emerald-700 text-white' : 'bg-brand-obsidian text-white hover:bg-brand-rose'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • £{product.price.toFixed(2)}</span>
                </>
              )}
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-4 rounded-full border transition-all ${
                isSaved ? 'bg-brand-rose border-brand-rose text-white' : 'border-brand-grey-border bg-white text-brand-charcoal hover:border-brand-rose'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-white stroke-white' : ''}`} />
            </button>
          </div>

          {/* UK Delivery & Guarantees */}
          <div className="space-y-2 pt-4 border-t border-brand-grey-border text-xs text-brand-charcoal-light">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-brand-rose" />
              <span>Free Express UK Delivery on orders over £35</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-brand-rose" />
              <span>100% Guaranteed Authentic Korean Import</span>
            </div>
          </div>
        </div>
      </div>

      {/* Below Fold Tabs & Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-10 border-t border-brand-grey-border">
        {/* Why You'll Love It & Ingredients */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-serif text-2xl font-bold text-brand-obsidian mb-4">Why You&apos;ll Love It</h2>
            <ul className="space-y-2.5 text-xs text-brand-charcoal leading-relaxed">
              {product.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-brand-rose shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interactive Key Ingredient Chips */}
          <div>
            <h2 className="font-serif text-2xl font-bold text-brand-obsidian mb-3">Key Ingredients</h2>
            <div className="flex flex-wrap gap-2">
              {product.ingredients.map((ing, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIngredientModal(ing)}
                  className="bg-brand-ivory border border-brand-grey-border hover:border-brand-rose text-brand-obsidian text-xs font-semibold px-3.5 py-2 rounded-full flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-brand-rose" />
                  <span>{ing}</span>
                  <Info className="w-3 h-3 opacity-40" />
                </button>
              ))}
            </div>
          </div>

          {/* How to Use & Routine Position */}
          <div className="bg-white p-6 rounded-2xl border border-brand-grey-border space-y-3">
            <h3 className="font-serif text-lg font-bold text-brand-obsidian flex items-center gap-2">
              <Layers className="w-5 h-5 text-brand-rose" /> How to Apply
            </h3>
            <p className="text-xs text-brand-charcoal-light leading-relaxed">{product.howToUse}</p>
            <div className="text-xs font-bold uppercase text-brand-rose pt-2 border-t border-brand-grey-border/60">
              Routine Position: Step {product.routineStepNumber} ({product.routineStep.toUpperCase()})
            </div>
          </div>
        </div>

        {/* Sidebar Product Specifications */}
        <div className="bg-brand-ivory p-6 rounded-2xl border border-brand-grey-border space-y-4 h-fit text-xs">
          <h3 className="font-serif text-lg font-bold text-brand-obsidian">Formula Specs</h3>
          <div className="space-y-2 border-t border-brand-grey-border pt-3">
            <div className="flex justify-between">
              <span className="text-brand-charcoal-light">Texture</span>
              <strong className="text-brand-obsidian">{product.texture}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-charcoal-light">Volume</span>
              <strong className="text-brand-obsidian">{product.size}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-charcoal-light">Ideal Time</span>
              <strong className="text-brand-obsidian">{product.aiMetadata.idealRoutineTime}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-charcoal-light">Cruelty-Free</span>
              <strong className="text-emerald-700 font-bold">Yes</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
