'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { PRODUCTS, BRANDS } from '@/data/products';
import { CONCERNS } from '@/data/concerns';
import ProductCard from '@/components/product/ProductCard';
import { Sparkles, ArrowRight, CheckCircle2, Star, ShieldCheck, HeartHandshake, Layers, Plus, Check } from 'lucide-react';

export default function HomePage() {
  const { openSkinQuiz, openAISearch, addToCart } = useShop();
  const [activeConcernFilter, setActiveConcernFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'AM' | 'PM'>('AM');

  // Interactive Routine Builder state
  const defaultAmItems = [PRODUCTS[4], PRODUCTS[2], PRODUCTS[3], PRODUCTS[6], PRODUCTS[0]]; // Cleanser, Toner, Ampoule, Moisturiser, SPF
  const defaultPmItems = [PRODUCTS[4], PRODUCTS[7], PRODUCTS[1], PRODUCTS[9], PRODUCTS[6]]; // Cleanser, Pore Pad, Mucin, Dark Spot Serum, Dynasty Cream

  const currentRoutine = activeTab === 'AM' ? defaultAmItems : defaultPmItems;
  const routineTotalPrice = currentRoutine.reduce((sum, item) => sum + item.price, 0);
  const bundleSavings = 12.00;
  const bundleDiscountedPrice = routineTotalPrice - bundleSavings;

  const [routineAdded, setRoutineAdded] = useState(false);

  const handleAddRoutineToBag = () => {
    currentRoutine.forEach(item => addToCart(item));
    setRoutineAdded(true);
    setTimeout(() => setRoutineAdded(false), 2000);
  };

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-brand-ivory overflow-hidden border-b border-brand-grey-border">
        {/* Background Editorial Visuals */}
        <div className="absolute inset-0 z-0 opacity-15">
          <Image
            src="https://images.unsplash.com/photo-1608248597263-00079e96048a?q=80&w=1600&auto=format&fit=crop"
            alt="Korean Skincare Editorial"
            fill
            priority
            className="object-cover object-center filter grayscale"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 py-16">
          <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-brand-grey-border shadow-subtle text-xs font-semibold uppercase tracking-wider text-brand-obsidian">
            <Sparkles className="w-3.5 h-3.5 text-brand-rose animate-spin-slow" />
            <span>2026 AI-Native Korean Skincare for UK Skin</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-brand-obsidian leading-[1.1]">
            K-BEAUTY,<br />
            <span className="text-brand-rose font-normal italic">MATCHED TO YOU.</span>
          </h1>

          <p className="text-sm sm:text-lg text-brand-charcoal-light max-w-2xl mx-auto font-normal leading-relaxed">
            Discover clinically-inspired Korean skincare selected around your skin, your concerns, and your goals. Formulated in Seoul, intelligently recommended for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={openSkinQuiz}
              className="w-full sm:w-auto bg-brand-obsidian text-white py-4 px-8 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-brand-rose transition-smooth shadow-float"
            >
              <Sparkles className="w-4 h-4 text-brand-rose" />
              <span>Start My Skin Match</span>
            </button>

            <Link
              href="/shop?filter=new"
              className="w-full sm:w-auto bg-white border border-brand-grey-border text-brand-obsidian py-4 px-8 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:border-brand-rose transition-smooth shadow-subtle"
            >
              <span>Shop New In</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Micro Trust Bar */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs text-brand-charcoal-light font-medium">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-700" /> 100% Authentic Seoul Formulas</span>
            <span className="flex items-center gap-1.5"><HeartHandshake className="w-4 h-4 text-brand-rose" /> Free UK Shipping Over £35</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-500 fill-amber-400" /> 4.9/5 from 12,000+ UK Reviews</span>
          </div>
        </div>
      </section>

      {/* SECTION 2 — QUICK SKIN DISCOVERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="badge-editorial bg-brand-blush text-brand-rose mb-2 inline-block">
              Targeted Skincare
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-obsidian">
              What does your skin need today?
            </h2>
          </div>
          <button onClick={openAISearch} className="text-xs font-semibold uppercase text-brand-rose hover:text-brand-obsidian flex items-center gap-1">
            Ask AI Assistant <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Interactive Categories Horizontal Pills */}
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {Object.values(CONCERNS).map((concern) => (
            <Link
              key={concern.slug}
              href={`/concerns/${concern.slug}`}
              className="group bg-white p-5 rounded-2xl border border-brand-grey-border min-w-[200px] hover:border-brand-rose hover:shadow-card transition-smooth flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-rose tracking-wider">{concern.tagline}</span>
                <h3 className="font-serif text-lg font-bold text-brand-obsidian group-hover:text-brand-rose transition-colors mt-1">
                  {concern.title}
                </h3>
              </div>
              <div className="pt-4 flex items-center justify-between text-xs text-brand-charcoal-light border-t border-brand-grey-border/60 mt-4">
                <span>{concern.productIds.length} Products</span>
                <ArrowRight className="w-4 h-4 text-brand-rose group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 3 — AI SKIN MATCH HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand-blush/80 via-brand-ivory to-white rounded-3xl border border-brand-blush-border p-8 md:p-14 shadow-card grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-full text-xs font-semibold uppercase text-brand-rose border border-brand-rose/30 shadow-subtle">
              <Sparkles className="w-3.5 h-3.5 text-brand-rose" /> Signature Feature
            </span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold text-brand-obsidian leading-tight">
              Meet your AI skincare match.
            </h2>
            <p className="text-sm md:text-base text-brand-charcoal-light leading-relaxed">
              Answer a few simple questions about your skin goals, sensitivity, and budget. Our clinical AI algorithm builds a complete custom 5-step Korean regimen.
            </p>

            {/* 3-Step Preview */}
            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-brand-grey-border/60 text-left">
              <div>
                <span className="font-serif text-xl font-bold text-brand-rose">01</span>
                <h4 className="text-xs font-bold text-brand-obsidian uppercase mt-1">Skin Profile</h4>
                <p className="text-[11px] text-brand-charcoal-light">Identify types & concerns</p>
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-brand-rose">02</span>
                <h4 className="text-xs font-bold text-brand-obsidian uppercase mt-1">Choose Goals</h4>
                <p className="text-[11px] text-brand-charcoal-light">Glass skin, acne, hydration</p>
              </div>
              <div>
                <span className="font-serif text-xl font-bold text-brand-rose">03</span>
                <h4 className="text-xs font-bold text-brand-obsidian uppercase mt-1">Matched Routine</h4>
                <p className="text-[11px] text-brand-charcoal-light">AM/PM step-by-step</p>
              </div>
            </div>

            <button
              onClick={openSkinQuiz}
              className="bg-brand-obsidian text-white py-4 px-8 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-brand-rose transition-smooth shadow-float"
            >
              <Sparkles className="w-4 h-4 text-brand-rose" />
              <span>Start My Skin Match Quiz</span>
            </button>
          </div>

          {/* AI Interface Preview Mockup */}
          <div className="bg-white rounded-2xl p-6 border border-brand-grey-border shadow-float space-y-4">
            <div className="flex items-center justify-between border-b border-brand-grey-border pb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-brand-rose text-white flex items-center justify-center font-bold text-xs">
                  AI
                </div>
                <div>
                  <h4 className="font-semibold text-xs text-brand-obsidian">Your Diagnostic Result</h4>
                  <span className="text-[10px] text-emerald-700 font-bold">96% COMPATIBILITY SCORE</span>
                </div>
              </div>
              <span className="badge-editorial bg-brand-grey text-brand-charcoal">Verified Formula</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="bg-brand-ivory p-3 rounded-lg border border-brand-grey-border flex items-center justify-between">
                <span>AM Step 1: Low-pH Cleanser</span>
                <strong className="text-brand-obsidian">Round Lab Dokdo</strong>
              </div>
              <div className="bg-brand-ivory p-3 rounded-lg border border-brand-grey-border flex items-center justify-between">
                <span>AM Step 2: Soothing Essence</span>
                <strong className="text-brand-obsidian">COSRX Snail 96</strong>
              </div>
              <div className="bg-brand-ivory p-3 rounded-lg border border-brand-grey-border flex items-center justify-between">
                <span>AM Step 3: Sun Protection</span>
                <strong className="text-brand-obsidian">Beauty of Joseon SPF</strong>
              </div>
            </div>

            <div className="p-3 bg-brand-blush/60 rounded-lg text-[11px] text-brand-charcoal text-center">
              ✓ Formulated for dry sensitive barriers • Free UK delivery eligible
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — TRENDING IN K-BEAUTY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="badge-editorial bg-brand-rose text-white mb-2 inline-block">
              Viral & Trending
            </span>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-obsidian">
              Trending in K-Beauty Right Now
            </h2>
          </div>
          <Link href="/shop" className="text-xs font-semibold uppercase text-brand-rose hover:text-brand-obsidian flex items-center gap-1">
            View All Trending <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Carousel Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {PRODUCTS.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION 5 — SHOP BY CONCERN EDITORIAL TILES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="badge-editorial bg-brand-grey text-brand-charcoal">Targeted Solutions</span>
          <h2 className="font-serif text-3xl font-bold text-brand-obsidian">Shop By Skin Concern</h2>
          <p className="text-xs text-brand-charcoal-light">Curated Korean formulations targeted to your exact skin state.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { title: 'ACNE', tagline: 'Calm + Clear', slug: 'acne', bg: 'bg-emerald-50 border-emerald-200' },
            { title: 'PIGMENTATION', tagline: 'Brighten + Even', slug: 'pigmentation', bg: 'bg-amber-50 border-amber-200' },
            { title: 'DRY SKIN', tagline: 'Deep Hydration', slug: 'dryness', bg: 'bg-blue-50 border-blue-200' },
            { title: 'SENSITIVE', tagline: 'Barrier First', slug: 'redness', bg: 'bg-rose-50 border-rose-200' },
            { title: 'DULLNESS', tagline: 'Glow Mode', slug: 'dullness', bg: 'bg-orange-50 border-orange-200' },
            { title: 'ANTI-AGEING', tagline: 'Slow Ageing', slug: 'anti-ageing', bg: 'bg-purple-50 border-purple-200' },
          ].map((tile, idx) => (
            <Link
              key={idx}
              href={`/concerns/${tile.slug}`}
              className={`p-6 rounded-2xl border text-center flex flex-col justify-between h-44 hover:shadow-card transition-smooth ${tile.bg}`}
            >
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-charcoal-light">{tile.tagline}</span>
              <h3 className="font-serif text-lg font-bold text-brand-obsidian">{tile.title}</h3>
              <span className="text-[11px] font-semibold uppercase text-brand-rose hover:underline">Explore →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 6 — BESTSELLERS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 border-b border-brand-grey-border pb-4">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-obsidian">
            UK Bestsellers
          </h2>
          <div className="flex gap-2">
            {['all', 'dryness', 'acne', 'pigmentation'].map((c) => (
              <button
                key={c}
                onClick={() => setActiveConcernFilter(c)}
                className={`text-xs font-semibold uppercase px-3 py-1.5 rounded-full transition-colors ${
                  activeConcernFilter === c
                    ? 'bg-brand-obsidian text-white'
                    : 'bg-brand-grey text-brand-charcoal hover:bg-brand-blush'
                }`}
              >
                {c === 'all' ? 'All Bestsellers' : c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {PRODUCTS.filter(p => activeConcernFilter === 'all' || p.concerns.includes(activeConcernFilter as any)).slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION 7 — "BUILD YOUR ROUTINE" INTERACTIVE BUILDER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-brand-grey-border p-8 md:p-12 shadow-card space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-brand-grey-border pb-6">
            <div>
              <span className="badge-editorial bg-brand-rose text-white mb-2 inline-block">
                Interactive Routine Builder
              </span>
              <h2 className="font-serif text-3xl font-bold text-brand-obsidian">
                Build Your Complete Korean Routine
              </h2>
            </div>

            {/* AM / PM Toggle */}
            <div className="flex bg-brand-grey p-1 rounded-full border border-brand-grey-border self-start">
              <button
                onClick={() => setActiveTab('AM')}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'AM' ? 'bg-brand-obsidian text-white shadow-subtle' : 'text-brand-charcoal hover:text-brand-rose'
                }`}
              >
                AM Regimen (5-Step)
              </button>
              <button
                onClick={() => setActiveTab('PM')}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                  activeTab === 'PM' ? 'bg-brand-obsidian text-white shadow-subtle' : 'text-brand-charcoal hover:text-brand-rose'
                }`}
              >
                PM Regimen (5-Step)
              </button>
            </div>
          </div>

          {/* Routine Steps List */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {currentRoutine.map((product, idx) => (
              <div key={product.id} className="bg-brand-ivory p-4 rounded-xl border border-brand-grey-border flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between text-[11px] font-bold text-brand-rose border-b border-brand-grey-border pb-2">
                  <span>STEP 0{idx + 1}</span>
                  <span className="capitalize">{product.category}</span>
                </div>

                <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-white border border-brand-grey-border">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-brand-charcoal-light">{product.brand}</span>
                  <h4 className="font-semibold text-xs text-brand-obsidian line-clamp-1">{product.name}</h4>
                  <span className="font-bold text-xs text-brand-obsidian mt-1 block">£{product.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bundle Price & Add All CTA */}
          <div className="bg-brand-blush/60 p-6 rounded-2xl border border-brand-blush-border flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-serif text-lg font-bold text-brand-obsidian">Complete {activeTab} Routine Bundle</h4>
              <p className="text-xs text-brand-charcoal-light">Save £12.00 when purchasing the complete 5-step regimen together.</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-xs line-through text-brand-charcoal-light block">£{routineTotalPrice.toFixed(2)}</span>
                <span className="font-bold text-xl text-brand-obsidian">£{bundleDiscountedPrice.toFixed(2)}</span>
              </div>

              <button
                onClick={handleAddRoutineToBag}
                className={`py-3.5 px-8 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-smooth shadow-float ${
                  routineAdded ? 'bg-emerald-700 text-white' : 'bg-brand-obsidian text-white hover:bg-brand-rose'
                }`}
              >
                {routineAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{routineAdded ? 'Routine Added to Bag!' : 'Add Entire Routine'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — FEATURED BRANDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="badge-editorial bg-brand-grey text-brand-charcoal">Seoul Authenticity</span>
          <h2 className="font-serif text-3xl font-bold text-brand-obsidian">Featured Brands</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {BRANDS.map(brand => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              className="group bg-white rounded-2xl border border-brand-grey-border overflow-hidden hover:shadow-card transition-smooth"
            >
              <div className="relative h-40 bg-brand-ivory">
                <Image src={brand.heroImage} alt={brand.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 space-y-2">
                <span className="text-[10px] font-bold uppercase text-brand-rose">{brand.origin}</span>
                <h3 className="font-serif text-xl font-bold text-brand-obsidian group-hover:text-brand-rose transition-colors">
                  {brand.name}
                </h3>
                <p className="text-xs text-brand-charcoal-light line-clamp-2 leading-relaxed">
                  {brand.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
