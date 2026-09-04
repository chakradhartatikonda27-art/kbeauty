'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/ecommerce';
import { useShop } from '@/context/ShopContext';
import { Heart, Star, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [isAdded, setIsAdded] = useState(false);
  const isSaved = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative bg-white rounded-xl border border-brand-grey-border overflow-hidden hover:shadow-card hover:border-brand-rose/40 transition-smooth flex flex-col justify-between">
      {/* Top Image Container */}
      <Link href={`/product/${product.slug}`} className="block relative aspect-square bg-brand-ivory overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.bestseller && (
            <span className="badge-editorial bg-brand-obsidian text-white shadow-subtle">
              Bestseller
            </span>
          )}
          {product.viral && (
            <span className="badge-editorial bg-brand-rose text-white shadow-subtle">
              Viral
            </span>
          )}
          {product.vegan && !product.bestseller && !product.viral && (
            <span className="badge-editorial bg-brand-accent text-white shadow-subtle">
              Vegan
            </span>
          )}
        </div>

        {/* Wishlist Heart Action */}
        <button
          onClick={handleWishlist}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all z-10 ${
            isSaved
              ? 'bg-brand-rose text-white shadow-sm'
              : 'bg-white/90 text-brand-charcoal hover:bg-white hover:text-brand-rose shadow-subtle'
          }`}
          aria-label="Toggle Wishlist"
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white stroke-white' : 'stroke-[1.75]'}`} />
        </button>

        {/* Quick Add Hover Overlay */}
        <div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block">
          <button
            onClick={handleQuickAdd}
            className={`w-full py-2.5 px-3 rounded-lg font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-smooth shadow-subtle ${
              isAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-brand-obsidian text-white hover:bg-brand-rose'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Added to Bag</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add • £{product.price.toFixed(2)}</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Details Section */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 space-y-2">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-brand-rose">
            <span>{product.brand}</span>
            <span className="text-[10px] text-brand-charcoal-light/70 capitalize font-normal">{product.size}</span>
          </div>

          {/* Title */}
          <Link href={`/product/${product.slug}`} className="block mt-1">
            <h3 className="font-semibold text-xs sm:text-sm text-brand-obsidian line-clamp-2 hover:text-brand-rose transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Short Descriptor */}
          {!compact && (
            <p className="text-[11px] text-brand-charcoal-light line-clamp-1 mt-1 font-normal">
              {product.shortDescription}
            </p>
          )}
        </div>

        {/* Rating & Pricing Row */}
        <div className="pt-2 border-t border-brand-grey-border/60 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <div className="flex text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500" />
            </div>
            <span className="text-xs font-bold text-brand-obsidian">{product.rating.toFixed(1)}</span>
            <span className="text-[10px] text-brand-charcoal-light font-normal">({product.reviewCount})</span>
          </div>

          {/* Price display in GBP £ */}
          <div className="flex items-baseline gap-1.5">
            {product.compareAtPrice && (
              <span className="text-[11px] line-through text-brand-charcoal-light/60 font-normal">
                £{product.compareAtPrice.toFixed(2)}
              </span>
            )}
            <span className="font-bold text-xs sm:text-sm text-brand-obsidian">
              £{product.price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Mobile Quick Add Button */}
        <div className="sm:hidden pt-2">
          <button
            onClick={handleQuickAdd}
            className={`w-full py-2 px-3 rounded-lg font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-smooth ${
              isAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-brand-obsidian text-white active:bg-brand-rose'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3 h-3 stroke-[3]" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3" />
                <span>Add to Bag</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
