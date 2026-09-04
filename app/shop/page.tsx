'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS, BRANDS } from '@/data/products';
import { CONCERNS } from '@/data/concerns';
import ProductCard from '@/components/product/ProductCard';
import { Filter, SlidersHorizontal, ArrowUpDown, X, Check } from 'lucide-react';
import { SkinType, ConcernType, RoutineStep } from '@/types/ecommerce';

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const filterParam = searchParams.get('filter');

  const [selectedSkinType, setSelectedSkinType] = useState<string>('all');
  const [selectedConcern, setSelectedConcern] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [onlyVegan, setOnlyVegan] = useState(false);
  const [sortOption, setSortOption] = useState<string>('recommended');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory !== 'all') {
      list = list.filter(p => p.category === selectedCategory);
    }

    if (selectedSkinType !== 'all') {
      list = list.filter(p => p.skinTypes.includes(selectedSkinType as SkinType));
    }

    if (selectedConcern !== 'all') {
      list = list.filter(p => p.concerns.includes(selectedConcern as ConcernType));
    }

    if (selectedBrand !== 'all') {
      list = list.filter(p => p.brand.toLowerCase() === selectedBrand.toLowerCase());
    }

    if (onlyVegan) {
      list = list.filter(p => p.vegan);
    }

    if (filterParam === 'bestseller') {
      list = list.filter(p => p.bestseller);
    } else if (filterParam === 'new') {
      list = list.filter(p => p.newArrival || p.viral);
    }

    // Sort
    if (sortOption === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    }

    return list;
  }, [selectedCategory, selectedSkinType, selectedConcern, selectedBrand, onlyVegan, filterParam, sortOption]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Breadcrumb & Header */}
      <div className="space-y-3 mb-8 border-b border-brand-grey-border pb-6">
        <div className="flex items-center gap-2 text-xs text-brand-charcoal-light">
          <Link href="/" className="hover:text-brand-obsidian">Home</Link>
          <span>/</span>
          <span className="text-brand-obsidian font-semibold capitalize">{selectedCategory !== 'all' ? selectedCategory : 'Shop All Skincare'}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-obsidian capitalize">
              {selectedCategory !== 'all' ? `${selectedCategory} Products` : 'All Authentic Korean Skincare'}
            </h1>
            <p className="text-xs text-brand-charcoal-light mt-1">
              Showing {filteredProducts.length} authentic Korean formulas in stock in the UK.
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-white border border-brand-grey-border px-4 py-2 rounded-full text-xs font-semibold text-brand-obsidian shadow-subtle"
            >
              <SlidersHorizontal className="w-4 h-4 text-brand-rose" /> Filter & Sort
            </button>

            <div className="hidden lg:flex items-center gap-2 bg-white border border-brand-grey-border px-3 py-1.5 rounded-full text-xs text-brand-obsidian shadow-subtle">
              <ArrowUpDown className="w-3.5 h-3.5 text-brand-charcoal-light" />
              <span className="text-brand-charcoal-light">Sort:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="bg-transparent font-semibold outline-none cursor-pointer text-xs"
              >
                <option value="recommended">Recommended</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main PLP Layout: Sidebar Filter + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filter */}
        <div className="hidden lg:block space-y-6 bg-white p-6 rounded-2xl border border-brand-grey-border shadow-subtle h-fit">
          <div className="flex items-center justify-between border-b border-brand-grey-border pb-4">
            <h3 className="font-serif text-base font-bold text-brand-obsidian flex items-center gap-2">
              <Filter className="w-4 h-4 text-brand-rose" /> Filter Catalogue
            </h3>
            {(selectedSkinType !== 'all' || selectedConcern !== 'all' || selectedCategory !== 'all' || onlyVegan) && (
              <button
                onClick={() => {
                  setSelectedSkinType('all');
                  setSelectedConcern('all');
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                  setOnlyVegan(false);
                }}
                className="text-[11px] font-semibold text-brand-rose hover:underline"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Skin Type Filter */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase text-brand-obsidian tracking-wider">Skin Type</h4>
            <div className="space-y-1.5 text-xs text-brand-charcoal">
              {['all', 'dry', 'oily', 'combination', 'sensitive', 'normal'].map((st) => (
                <label key={st} className="flex items-center gap-2 cursor-pointer capitalize">
                  <input
                    type="radio"
                    name="skinType"
                    checked={selectedSkinType === st}
                    onChange={() => setSelectedSkinType(st)}
                    className="accent-brand-rose"
                  />
                  <span>{st === 'all' ? 'All Skin Types' : st}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Concern Filter */}
          <div className="space-y-2 pt-4 border-t border-brand-grey-border">
            <h4 className="text-xs font-bold uppercase text-brand-obsidian tracking-wider">Skin Concern</h4>
            <div className="space-y-1.5 text-xs text-brand-charcoal">
              {['all', 'acne', 'pigmentation', 'dryness', 'redness', 'barrier', 'pores', 'dullness'].map((c) => (
                <label key={c} className="flex items-center gap-2 cursor-pointer capitalize">
                  <input
                    type="radio"
                    name="concern"
                    checked={selectedConcern === c}
                    onChange={() => setSelectedConcern(c)}
                    className="accent-brand-rose"
                  />
                  <span>{c === 'all' ? 'All Concerns' : c}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Vegan Only Checkbox */}
          <div className="pt-4 border-t border-brand-grey-border">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-brand-obsidian">
              <input
                type="checkbox"
                checked={onlyVegan}
                onChange={(e) => setOnlyVegan(e.target.checked)}
                className="accent-brand-rose"
              />
              <span>100% Vegan Formulas Only</span>
            </label>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white p-12 rounded-2xl border border-brand-grey-border text-center space-y-4">
              <h3 className="font-serif text-xl font-bold text-brand-obsidian">No exact matches found</h3>
              <p className="text-xs text-brand-charcoal-light max-w-sm mx-auto">
                Try expanding your filters or clearing your selections to view all authentic formulas.
              </p>
              <button
                onClick={() => {
                  setSelectedSkinType('all');
                  setSelectedConcern('all');
                  setSelectedCategory('all');
                  setSelectedBrand('all');
                  setOnlyVegan(false);
                }}
                className="bg-brand-obsidian text-white text-xs font-semibold px-6 py-2.5 rounded-full hover:bg-brand-rose transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-brand-charcoal-light">Loading catalogue...</div>}>
      <ShopContent />
    </Suspense>
  );
}
