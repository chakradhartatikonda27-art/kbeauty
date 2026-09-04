'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { PRODUCTS, BRANDS } from '@/data/products';
import { CONCERNS } from '@/data/concerns';
import ProductCard from '@/components/product/ProductCard';
import { Sparkles, ArrowRight, Star, ShieldCheck, HeartHandshake, Plus, Check, Play, Zap, RefreshCw, ShoppingBag, Volume2, VolumeX } from 'lucide-react';

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

  const tickerItems = [
    '🔥 TIKTOK VIRAL K-BEAUTY DROPS',
    '✨ 96% AI SKIN MATCH ACCURACY',
    '🎁 FREE DELUXE SAMPLES WITH EVERY ORDER',
    '⚡ UK EXPRESS 24H DISPATCH AVAILABLE',
    '🛡️ 100% AUTHENTIC SEOUL FORMULATIONS',
    '🇬🇧 UK VAT & TAXES INCLUDED IN PRICES',
    '🌿 100% CRUELTY-FREE CERTIFIED BRANDS'
  ];

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="space-y-16 md:space-y-24 pb-16 overflow-hidden">
      {/* SECTION 1 — CLEAN EDITORIAL HERO */}
      <section className="relative min-h-[65vh] sm:min-h-[75vh] flex items-center justify-center bg-brand-ivory border-b border-brand-grey-border py-10 sm:py-16 md:py-24">
        {/* Background Subtle Ambient Texture */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="/images/kbeauty_hero_editorial.jpg"
            alt="SEOUL LABS Editorial"
            fill
            className="object-cover opacity-10 filter blur-xs"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-ivory/95 via-brand-ivory/90 to-brand-ivory" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 sm:space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-brand-grey-border shadow-subtle text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-brand-obsidian"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-rose animate-spin-slow" />
            <span>2026 AI-Native Korean Skincare for UK Skin</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-brand-obsidian leading-[1.08]"
          >
            K-BEAUTY,<br />
            <span className="text-brand-rose font-normal italic">MATCHED TO YOU.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg text-brand-charcoal-light max-w-2xl mx-auto font-normal leading-relaxed px-2"
          >
            Discover clinically-inspired Korean skincare selected around your skin, your concerns, and your goals. Formulated in Seoul, intelligently matched for UK skin.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2"
          >
            <button
              onClick={openSkinQuiz}
              className="w-full sm:w-auto bg-brand-obsidian text-white py-3.5 sm:py-4 px-8 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-brand-rose transition-smooth shadow-float group touch-target"
            >
              <Sparkles className="w-4 h-4 text-brand-rose group-hover:rotate-12 transition-transform" />
              <span>Start My Skin Match</span>
            </button>

            <Link
              href="/shop?filter=new"
              className="w-full sm:w-auto bg-white border border-brand-grey-border text-brand-obsidian py-3.5 sm:py-4 px-8 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:border-brand-rose transition-smooth shadow-subtle group touch-target"
            >
              <span>Shop New In</span>
              <ArrowRight className="w-4 h-4 text-brand-rose group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="pt-6 sm:pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-[11px] sm:text-xs text-brand-charcoal-light font-medium border-t border-brand-grey-border/40 max-w-xl mx-auto"
          >
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" /> 100% Authentic Seoul Formulas</span>
            <span className="flex items-center gap-1.5"><HeartHandshake className="w-4 h-4 text-brand-rose shrink-0" /> Free UK Shipping Over £35</span>
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-500 fill-amber-400 shrink-0" /> 4.9/5 from 12,000+ UK Reviews</span>
          </motion.div>
        </div>
      </section>

      {/* INFINITE MOTION SCROLLING MARQUEE AD BANNER */}
      <div className="bg-brand-obsidian text-white py-3.5 border-y border-brand-charcoal-light/30 overflow-hidden relative shadow-subtle">
        <div className="flex w-max animate-marquee space-x-12 text-xs uppercase tracking-widest font-semibold text-brand-blush">
          {[...tickerItems, ...tickerItems].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3 shrink-0">
              <span>{item}</span>
              <span className="text-brand-rose opacity-60">•</span>
            </div>
          ))}
        </div>
      </div>

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

        {/* Interactive Categories Cards with Modern Framer Motion & High-Res Photography */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Object.values(CONCERNS).map((concern, index) => {
            // Map each concern to a high-res image
            const imageMap: Record<string, string> = {
              acne: '/images/anua_heartleaf_toner.jpg',
              pigmentation: '/images/axisy_dark_spot_serum.jpg',
              dryness: '/images/cosrx_snail_mucin.jpg',
              redness: '/images/skin1004_ampoule.jpg',
              barrier: '/images/boj_relief_sun.jpg',
              pores: '/images/kbeauty_glass_skin_glow.jpg',
              dullness: '/images/laneige_lip_mask.jpg',
              'anti-ageing': '/images/kbeauty_hero_editorial.jpg',
            };

            const imageSrc = imageMap[concern.slug] || '/images/kbeauty_glass_skin_glow.jpg';

            return (
              <motion.div
                key={concern.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative rounded-2xl overflow-hidden shadow-card border border-brand-grey-border aspect-[4/5] block"
              >
                <Link href={`/concerns/${concern.slug}`} className="block w-full h-full">
                  {/* Background High-Res Image with Framer Motion Zoom */}
                  <Image
                    src={imageSrc}
                    alt={concern.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Overlay Mask */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian/90 via-brand-obsidian/40 to-transparent transition-opacity duration-300" />

                  {/* Top Category Tag */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/90 backdrop-blur-md text-brand-rose px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-subtle border border-brand-rose/20">
                      {concern.tagline}
                    </span>
                  </div>

                  {/* Bottom Text Overlay */}
                  <div className="absolute inset-x-4 bottom-4 z-10 space-y-2">
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-brand-blush transition-colors">
                      {concern.title}
                    </h3>

                    <div className="flex items-center justify-between text-xs text-white/80 pt-2 border-t border-white/20">
                      <span className="font-medium">{concern.productIds.length} Clinical Formulas</span>
                      <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-brand-rose transition-colors">
                        <ArrowRight className="w-3.5 h-3.5 text-white group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3 — AI SKIN MATCH HERO FEATURE WITH GENERATED EDITORIAL PHOTO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-brand-blush/80 via-brand-ivory to-white rounded-3xl border border-brand-blush-border p-8 md:p-14 shadow-card grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-1.5 bg-white px-3 py-1 rounded-full text-xs font-semibold uppercase text-brand-rose border border-brand-rose/30 shadow-subtle">
              <Sparkles className="w-3.5 h-3.5 text-brand-rose" /> Signature AI Feature
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

          {/* Real Generated Editorial Photography Container */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-float border border-brand-grey-border">
            <Image
              src="/images/kbeauty_hero_editorial.jpg"
              alt="Luxury Korean Skincare Formulations"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian/80 via-transparent to-transparent flex items-end p-6">
              <div className="text-white space-y-1">
                <span className="text-[10px] uppercase font-bold text-brand-rose tracking-wider">Seoul Editorial Edit</span>
                <h4 className="font-serif text-lg font-bold">Intelligent Botanical Nutrition</h4>
                <p className="text-xs text-white/80">Clinically matched for UK moisture barrier recovery.</p>
              </div>
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {PRODUCTS.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION: ULTRA-LUXURY BEAUTY REVIEWS & INTERACTIVE ROUTINE DEMOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-obsidian text-white rounded-3xl p-6 md:p-12 shadow-float space-y-10 border border-brand-charcoal-light/30 relative overflow-hidden">
          {/* Subtle Ambient Background Gradient Glow */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-rose/20 rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-blush/10 rounded-full filter blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 bg-brand-rose/20 text-brand-rose px-3.5 py-1.5 rounded-full border border-brand-rose/40 text-[11px] font-bold uppercase tracking-wider">
                <Star className="w-3.5 h-3.5 fill-brand-rose" />
                <span>Verified UK Beauty Creator Stories</span>
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight">
                Real Beauty Reviews & Routine Demos
              </h2>
            </div>
            <p className="text-xs md:text-sm text-white/70 max-w-md leading-relaxed">
              Watch UK skincare creators demonstrate their step-by-step Korean glass skin routines with authentic formulations.
            </p>
          </div>

          {/* Main Showcase Layout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Showcase Player: Main Creator Feature */}
            <div className="lg:col-span-7 relative rounded-3xl overflow-hidden bg-brand-charcoal aspect-[4/3] border-2 border-white/15 shadow-float group">
              {/* Background Poster & Video Stream */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={PRODUCTS[0].images[0] || "/images/kbeauty_glass_skin_glow.jpg"}
                  alt="Beauty Creator Routine Demo"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster="/images/kbeauty_glass_skin_glow.jpg"
                  className="object-cover w-full h-full opacity-90 relative z-10"
                >
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-young-woman-applying-face-cream-41130-large.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/30 to-transparent z-15" />
              </div>

              {/* Top Bar: Creator Info & Live Tag */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                <div className="flex items-center gap-3 bg-brand-obsidian/85 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/20">
                  <div className="w-8 h-8 rounded-full border border-brand-rose overflow-hidden relative shrink-0">
                    <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" alt="Jiwoo Beauty" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white">@jiwoo.beauty • London UK</h4>
                    <span className="text-[10px] text-brand-rose font-semibold">142k Followers</span>
                  </div>
                </div>

                <div className="bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-emerald-400/40 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                  <span>Glass Skin Routine</span>
                </div>
              </div>

              {/* Bottom Interactive Content Overlay */}
              <div className="absolute inset-x-4 bottom-4 z-20 space-y-4">
                <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl border border-brand-grey-border shadow-float text-brand-obsidian space-y-3">
                  <p className="text-xs md:text-sm font-medium text-brand-obsidian leading-relaxed italic">
                    &ldquo;This BoJ sunscreen + Snail Mucin combo gave me actual glass skin in 7 days! No white cast, zero breakout flareups, just pure luminous hydration.&rdquo;
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-brand-grey-border/60">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-brand-ivory border border-brand-grey-border shrink-0">
                        <Image src="/images/boj_relief_sun.jpg" alt="Relief Sun SPF" fill className="object-cover" />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase font-bold text-brand-rose tracking-wider">Featured in Video</span>
                        <h5 className="font-bold text-xs line-clamp-1">Relief Sun : Rice + Probiotics SPF50+</h5>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(PRODUCTS[0])}
                      className="bg-brand-obsidian text-white text-xs font-semibold px-4 py-2.5 rounded-full hover:bg-brand-rose transition-colors flex items-center justify-center gap-1.5 shrink-0 shadow-subtle"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Quick Add • £15.50</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right List: Interactive Review Cards */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-brand-rose/40 space-y-4 hover:bg-white/15 transition-all shadow-subtle">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border-2 border-brand-rose overflow-hidden relative shrink-0">
                      <Image src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop" alt="Chloe" fill className="object-cover" />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-white">@chloe_skincare</h5>
                      <span className="text-[11px] text-white/70">Manchester, UK • Verified Review</span>
                    </div>
                  </div>
                  <div className="flex text-amber-400 text-xs">★★★★★</div>
                </div>

                <p className="text-xs text-white/90 leading-relaxed">
                  &ldquo;My acne redness completely calmed down after 3 days of using Anua Heartleaf toner. It is now a permanent step in my AM routine!&rdquo;
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-brand-blush">Matched for Sensitive & Acne Skin</span>
                  <button onClick={() => addToCart(PRODUCTS[2])} className="text-xs font-bold text-brand-rose hover:text-white uppercase flex items-center gap-1">
                    Shop Toner (£19.50) →
                  </button>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 space-y-4 hover:bg-white/10 transition-all">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full border border-brand-rose overflow-hidden relative shrink-0">
                      <Image src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop" alt="Maya" fill className="object-cover" />
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-white">@maya_kbeauty</h5>
                      <span className="text-[11px] text-white/70">Edinburgh, UK • Verified Review</span>
                    </div>
                  </div>
                  <div className="flex text-amber-400 text-xs">★★★★★</div>
                </div>

                <p className="text-xs text-white/90 leading-relaxed">
                  &ldquo;The AI skin quiz matched me to products under £45 that actually repaired my broken barrier after over-exfoliating.&rdquo;
                </p>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-brand-blush">Barrier Repair Routine</span>
                  <button onClick={openSkinQuiz} className="text-xs font-bold text-brand-rose hover:text-white uppercase flex items-center gap-1">
                    Start Skin Match →
                  </button>
                </div>
              </div>
            </div>

          </div>
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
            { title: 'ACNE', tagline: 'Calm + Clear', slug: 'acne', image: '/images/anua_heartleaf_toner.jpg' },
            { title: 'PIGMENTATION', tagline: 'Brighten + Even', slug: 'pigmentation', image: '/images/axisy_dark_spot_serum.jpg' },
            { title: 'DRY SKIN', tagline: 'Deep Hydration', slug: 'dryness', image: '/images/cosrx_snail_mucin.jpg' },
            { title: 'SENSITIVE', tagline: 'Barrier First', slug: 'redness', image: '/images/skin1004_ampoule.jpg' },
            { title: 'DULLNESS', tagline: 'Glow Mode', slug: 'dullness', image: '/images/laneige_lip_mask.jpg' },
            { title: 'ANTI-AGEING', tagline: 'Slow Ageing', slug: 'anti-ageing', image: '/images/kbeauty_hero_editorial.jpg' },
          ].map((tile, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative rounded-2xl overflow-hidden shadow-subtle border border-brand-grey-border h-48 block group"
            >
              <Link href={`/concerns/${tile.slug}`} className="block w-full h-full p-4 flex flex-col justify-between relative z-10">
                <Image
                  src={tile.image}
                  alt={tile.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian/90 via-brand-obsidian/40 to-transparent z-0" />
                <span className="relative z-10 text-[9px] uppercase font-bold tracking-widest text-brand-rose bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full border border-brand-rose/20 w-max shadow-subtle">
                  {tile.tagline}
                </span>
                <div className="relative z-10">
                  <h3 className="font-serif text-lg font-bold text-white group-hover:text-brand-blush transition-colors">{tile.title}</h3>
                  <span className="text-[11px] font-semibold uppercase text-white/80 group-hover:text-brand-rose transition-colors flex items-center gap-1 mt-1">
                    Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 6 — BESTSELLERS CAROUSEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8 border-b border-brand-grey-border pb-4">
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-obsidian">
            UK Bestsellers
          </h2>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {['all', 'dryness', 'acne', 'pigmentation'].map((c) => (
              <button
                key={c}
                onClick={() => setActiveConcernFilter(c)}
                className={`text-[11px] sm:text-xs font-semibold uppercase px-3 py-1.5 rounded-full transition-colors whitespace-nowrap touch-target flex items-center justify-center ${
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
            {currentRoutine.map((product, idx) => (
              <div key={product.id} className="bg-brand-ivory p-3 sm:p-4 rounded-xl border border-brand-grey-border flex flex-col justify-between space-y-2 sm:space-y-3">
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-brand-rose border-b border-brand-grey-border pb-1.5">
                  <span>STEP 0{idx + 1}</span>
                  <span className="capitalize text-[9px] sm:text-[10px] opacity-80">{product.category}</span>
                </div>

                <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-white border border-brand-grey-border">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                </div>

                <div>
                  <span className="text-[9px] sm:text-[10px] uppercase font-bold text-brand-charcoal-light">{product.brand}</span>
                  <h4 className="font-semibold text-xs text-brand-obsidian line-clamp-1">{product.name}</h4>
                  <span className="font-bold text-xs text-brand-obsidian mt-1 block">£{product.price.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bundle Price & Add All CTA */}
          <div className="bg-brand-blush/60 p-5 sm:p-6 rounded-2xl border border-brand-blush-border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6">
            <div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-brand-obsidian">Complete {activeTab} Routine Bundle</h4>
              <p className="text-xs text-brand-charcoal-light">Save £12.00 when purchasing the complete 5-step regimen together.</p>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 pt-2 sm:pt-0 border-t sm:border-0 border-brand-grey-border/40">
              <div className="text-left sm:text-right">
                <span className="text-xs line-through text-brand-charcoal-light block">£{routineTotalPrice.toFixed(2)}</span>
                <span className="font-bold text-lg sm:text-xl text-brand-obsidian">£{bundleDiscountedPrice.toFixed(2)}</span>
              </div>

              <button
                onClick={handleAddRoutineToBag}
                className={`py-3 sm:py-3.5 px-6 sm:px-8 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-smooth shadow-float touch-target ${
                  routineAdded ? 'bg-emerald-700 text-white' : 'bg-brand-obsidian text-white hover:bg-brand-rose'
                }`}
              >
                {routineAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                <span>{routineAdded ? 'Added to Bag!' : 'Add Routine'}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — GLASS SKIN LIFESTYLE SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-brand-obsidian text-white p-8 md:p-14 min-h-[400px] flex items-center shadow-float">
          <Image
            src="/images/kbeauty_glass_skin_glow.jpg"
            alt="Glass Skin Glow Lifestyle"
            fill
            className="object-cover opacity-35"
          />
          <div className="relative z-10 space-y-4 max-w-xl">
            <span className="badge-editorial bg-brand-rose text-white">The Seoul Glow Standard</span>
            <h2 className="font-serif text-3xl md:text-5xl font-bold">Glass Skin, Simplified.</h2>
            <p className="text-xs md:text-sm text-white/80 leading-relaxed">
              Achieve deep, luminous hydration without clogging pores or causing flushing. Intelligently matched to your skin profile.
            </p>
            <button
              onClick={openSkinQuiz}
              className="bg-white text-brand-obsidian text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-full hover:bg-brand-rose hover:text-white transition-colors"
            >
              Get Glass Skin Routine →
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 9 — ROTATABLE BRAND LOGOS TICKER & FEATURED BRANDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="badge-editorial bg-brand-rose text-white">Seoul Authenticity Guaranteed</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-obsidian">
            Official Partner K-Beauty Brands
          </h2>
          <p className="text-xs text-brand-charcoal-light">Sourced 100% direct from certified Seoul beauty laboratories.</p>
        </div>

        {/* ROTATABLE LEFT-TO-RIGHT INFINITE BRAND LOGO MARQUEE */}
        <div className="bg-brand-obsidian text-white py-6 rounded-3xl border border-brand-grey-border shadow-float overflow-hidden relative group">
          <div className="flex w-max animate-marquee space-x-8 text-xs font-semibold">
            {[
              { name: 'Beauty of Joseon', slug: 'beauty-of-joseon', icon: '🌿', tagline: 'Hanbang Science' },
              { name: 'COSRX', slug: 'cosrx', icon: '🐌', tagline: 'Minimalist Active' },
              { name: 'Anua', slug: 'anua', icon: '🍃', tagline: '77% Heartleaf' },
              { name: 'SKIN1004', slug: 'skin1004', icon: '🌾', tagline: 'Madagascar Centella' },
              { name: 'Round Lab', slug: 'round-lab', icon: '💧', tagline: 'Birch Juice SPF' },
              { name: 'Laneige', slug: 'laneige', icon: '🍓', tagline: 'Berry Lip Care' },
              { name: 'AXIS-Y', slug: 'axis-y', icon: '✨', tagline: '5% Niacinamide' },
              { name: 'Haruharu', slug: 'haruharu', icon: '🌾', tagline: 'Black Rice Ferment' },
              { name: 'Medicube', slug: 'medicube', icon: '🎯', tagline: 'Zero Pore Care' },
              { name: 'Torriden', slug: 'torriden', icon: '💦', tagline: 'Dive-In Hydration' },
              // Duplicate for infinite seamless scrolling loop
              { name: 'Beauty of Joseon', slug: 'beauty-of-joseon', icon: '🌿', tagline: 'Hanbang Science' },
              { name: 'COSRX', slug: 'cosrx', icon: '🐌', tagline: 'Minimalist Active' },
              { name: 'Anua', slug: 'anua', icon: '🍃', tagline: '77% Heartleaf' },
              { name: 'SKIN1004', slug: 'skin1004', icon: '🌾', tagline: 'Madagascar Centella' },
              { name: 'Round Lab', slug: 'round-lab', icon: '💧', tagline: 'Birch Juice SPF' },
              { name: 'Laneige', slug: 'laneige', icon: '🍓', tagline: 'Berry Lip Care' },
              { name: 'AXIS-Y', slug: 'axis-y', icon: '✨', tagline: '5% Niacinamide' },
              { name: 'Haruharu', slug: 'haruharu', icon: '🌾', tagline: 'Black Rice Ferment' },
            ].map((brand, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.08, y: -2 }}
                className="shrink-0"
              >
                <Link
                  href={`/brands/${brand.slug}`}
                  className="flex items-center gap-3 bg-white/10 hover:bg-brand-rose px-5 py-3 rounded-2xl border border-white/20 transition-all shadow-subtle group/brand"
                >
                  <span className="text-lg">{brand.icon}</span>
                  <div>
                    <span className="font-serif font-bold text-sm text-white group-hover/brand:text-white block line-clamp-1">
                      {brand.name}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-brand-blush group-hover/brand:text-white/80 block">
                      {brand.tagline}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Featured Brands Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-4">
          {BRANDS.map(brand => (
            <motion.div
              key={brand.slug}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
            >
              <Link
                href={`/brands/${brand.slug}`}
                className="group bg-white rounded-2xl border border-brand-grey-border overflow-hidden hover:shadow-card transition-smooth block h-full flex flex-col justify-between"
              >
                <div className="relative h-44 bg-brand-ivory overflow-hidden">
                  <Image
                    src={brand.heroImage}
                    alt={brand.name}
                    fill
                    className="object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian/80 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 text-[9px] font-bold uppercase tracking-wider bg-white/90 text-brand-rose px-2.5 py-1 rounded-full border border-brand-rose/20 backdrop-blur-md">
                    {brand.origin}
                  </span>
                </div>
                <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-brand-obsidian group-hover:text-brand-rose transition-colors">
                      {brand.name}
                    </h3>
                    <p className="text-xs text-brand-charcoal-light line-clamp-2 leading-relaxed mt-1">
                      {brand.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-brand-grey-border/60 flex items-center justify-between text-xs font-semibold uppercase text-brand-rose group-hover:text-brand-obsidian">
                    <span>Explore Lineup</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
