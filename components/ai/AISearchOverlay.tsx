'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { aiSearch, AISearchResult } from '@/lib/ai/service';
import { Search, X, Sparkles, Check, ArrowRight, Tag } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';

export default function AISearchOverlay() {
  const { isAISearchOpen, openAISearch, closeAISearch } = useShop();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<AISearchResult | null>(null);

  // Keyboard shortcut listener (Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isAISearchOpen) closeAISearch();
        else openAISearch();
      }
      if (e.key === 'Escape' && isAISearchOpen) {
        closeAISearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAISearchOpen, openAISearch, closeAISearch]);

  // Execute AI search on query change
  useEffect(() => {
    if (query.trim().length > 2) {
      const searchRes = aiSearch(query);
      setResult(searchRes);
    } else {
      setResult(null);
    }
  }, [query]);

  if (!isAISearchOpen) return null;

  const popularPrompts = [
    'I need something for dry sensitive skin',
    'Best Korean SPF under £20',
    'I want glass skin glow',
    'Calm redness and acne breakouts',
    'Products with Niacinamide but gentle',
    'Build me a simple 3-step routine'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-brand-obsidian/70 backdrop-blur-sm flex items-start justify-center pt-8 md:pt-20 px-4 animate-in fade-in duration-200">
      <div className="bg-brand-ivory w-full max-w-4xl rounded-2xl shadow-float border border-brand-grey-border overflow-hidden flex flex-col max-h-[85vh]">
        {/* Search Header Input */}
        <div className="p-4 md:p-6 border-b border-brand-grey-border flex items-center gap-3 bg-white">
          <Sparkles className="w-5 h-5 text-brand-rose animate-spin-slow shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask AI: 'Dry sensitive skin under £25' or 'Glass skin serum'..."
            className="w-full text-sm md:text-base bg-transparent border-none outline-none font-medium text-brand-obsidian placeholder:text-brand-charcoal-light/50"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs font-semibold uppercase text-brand-charcoal-light hover:text-brand-obsidian px-2"
            >
              Clear
            </button>
          )}
          <button
            onClick={closeAISearch}
            className="p-1.5 rounded-full hover:bg-brand-grey text-brand-charcoal transition-colors shrink-0"
            aria-label="Close AI Search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Natural Language Prompt Suggestions */}
          {!result && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal-light mb-3 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-rose" /> Natural Language AI Suggestions
                </h4>
                <div className="flex flex-wrap gap-2">
                  {popularPrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuery(prompt)}
                      className="bg-white border border-brand-grey-border hover:border-brand-rose px-3.5 py-2 rounded-full text-xs text-brand-charcoal font-medium hover:text-brand-rose transition-smooth text-left shadow-subtle flex items-center gap-2 group"
                    >
                      <span>{prompt}</span>
                      <ArrowRight className="w-3 h-3 text-brand-rose opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Ingredients & Concerns Quick Filter */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-brand-grey-border">
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-brand-obsidian mb-2">
                    Popular Ingredients
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {['Niacinamide', 'Centella Asiatica', 'Snail Mucin', 'Hyaluronic Acid', 'Rice Ferment'].map((ing, i) => (
                      <button
                        key={i}
                        onClick={() => setQuery(`Products containing ${ing}`)}
                        className="bg-brand-grey text-brand-charcoal text-[11px] px-2.5 py-1 rounded-md hover:bg-brand-blush hover:text-brand-rose transition-colors"
                      >
                        {ing}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-brand-grey-border">
                  <h5 className="text-xs font-semibold uppercase tracking-wider text-brand-obsidian mb-2">
                    Popular Concerns
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {['Acne & Breakouts', 'Pigmentation', 'Dryness', 'Redness', 'Enlarged Pores'].map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setQuery(`Skincare for ${c}`)}
                        className="bg-brand-grey text-brand-charcoal text-[11px] px-2.5 py-1 rounded-md hover:bg-brand-blush hover:text-brand-rose transition-colors"
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AI Search Results & Rationale */}
          {result && (
            <div className="space-y-6">
              {/* AI Intent Summary & Matched Rationales */}
              <div className="bg-brand-blush/60 p-4 rounded-xl border border-brand-blush-border space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-rose flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" /> AI Intent Analysis
                  </span>
                  <span className="text-[11px] text-brand-charcoal-light">{result.products.length} Products Matched</span>
                </div>
                <p className="text-xs font-medium text-brand-obsidian">{result.intentSummary}</p>

                {/* Matched Because Rationales */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {result.matchedBecause.map((reason, idx) => (
                    <span
                      key={idx}
                      className="bg-white text-brand-charcoal text-[11px] font-semibold px-2.5 py-1 rounded-full border border-brand-rose/30 flex items-center gap-1 text-brand-rose"
                    >
                      <Check className="w-3 h-3 stroke-[3]" /> {reason}
                    </span>
                  ))}
                </div>
              </div>

              {/* Matched Product Cards Grid */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-charcoal-light mb-4">
                  Recommended Matches
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {result.products.map(product => (
                    <div key={product.id} onClick={closeAISearch}>
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-brand-grey border-t border-brand-grey-border flex items-center justify-between text-xs text-brand-charcoal-light">
          <span>AI-native search powered by Seoul Labs Recommendation Engine</span>
          <span className="hidden sm:inline">Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
}
