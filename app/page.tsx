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
      {/* SECTION 1 — HERO WITH PROMOTED BEAUTY MODEL VIDEO SHOWCASE */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-brand-ivory border-b border-brand-grey-border py-12 md:py-20">
        {/* Background Ambient Video Layer */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/kbeauty_hero_editorial.jpg"
            className="object-cover w-full h-full opacity-15 filter grayscale contrast-125"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-skin-care-product-drops-41131-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-brand-ivory/90 via-brand-ivory/80 to-brand-ivory" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-full border border-brand-grey-border shadow-subtle text-xs font-semibold uppercase tracking-wider text-brand-obsidian"
              >
                <Sparkles className="w-4 h-4 text-brand-rose animate-spin-slow" />
                <span>2026 AI-Native Korean Skincare for UK Skin</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-serif text-4xl sm:text-6xl lg:text-6xl font-bold tracking-tight text-brand-obsidian leading-[1.08]"
              >
                K-BEAUTY,<br />
                <span className="text-brand-rose font-normal italic">MATCHED TO YOU.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-sm sm:text-base text-brand-charcoal-light max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed"
              >
                Discover clinically-inspired Korean skincare selected around your skin, your concerns, and your goals. Formulated in Seoul, intelligently matched for UK skin types.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <button
                  onClick={openSkinQuiz}
                  className="w-full sm:w-auto bg-brand-obsidian text-white py-4 px-8 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-brand-rose transition-smooth shadow-float group"
                >
                  <Sparkles className="w-4 h-4 text-brand-rose group-hover:rotate-12 transition-transform" />
                  <span>Start My Skin Match</span>
                </button>

                <Link
                  href="/shop?filter=new"
                  className="w-full sm:w-auto bg-white border border-brand-grey-border text-brand-obsidian py-4 px-8 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:border-brand-rose transition-smooth shadow-subtle group"
                >
                  <span>Shop New In</span>
                  <ArrowRight className="w-4 h-4 text-brand-rose group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-brand-charcoal-light font-medium"
              >
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-700" /> Authentic Seoul Formulas</span>
                <span className="flex items-center gap-1.5"><HeartHandshake className="w-4 h-4 text-brand-rose" /> Free UK Delivery &gt; £35</span>
                <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-amber-500 fill-amber-400" /> 4.9/5 from 12k Reviews</span>
              </motion.div>
            </div>

            {/* Right Column: Promoted Beauty Model Video Showcase Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative rounded-3xl overflow-hidden bg-brand-obsidian border-2 border-brand-grey-border shadow-float aspect-[4/5] max-w-md mx-auto group">
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  poster="/images/kbeauty_glass_skin_glow.jpg"
                  className="object-cover w-full h-full opacity-95 group-hover:scale-105 transition-transform duration-700"
                >
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-young-woman-applying-face-cream-41130-large.mp4" type="video/mp4" />
                  {/* Fallback Image if video element is not supported */}
                  <Image
                    src="/images/kbeauty_glass_skin_glow.jpg"
                    alt="Beauty Model Skincare Routine"
                    fill
                    className="object-cover"
                  />
                </video>

                {/* Live Badge Overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-brand-obsidian/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-wider text-white z-20">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>Routine Demo • 96% AI Match</span>
                </div>

                {/* Video Play/Pause & Mute Interactive Controls */}
                <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                  <button
                    onClick={togglePlay}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-brand-rose transition-colors"
                    aria-label="Toggle Video Playback"
                  >
                    {isPlaying ? <span className="w-2.5 h-2.5 bg-white rounded-xs" /> : <Play className="w-3.5 h-3.5 fill-white ml-0.5" />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center hover:bg-brand-rose transition-colors"
                    aria-label="Toggle Video Audio"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Bottom Shoppable Card Overlay */}
                <div className="absolute inset-x-4 bottom-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-brand-grey-border shadow-float space-y-2 z-20">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-brand-rose tracking-wider">Featured Promotion</span>
                    <span className="text-[11px] font-bold text-brand-obsidian">£15.50</span>
                  </div>
                  <h4 className="font-semibold text-xs text-brand-obsidian line-clamp-1">Relief Sun : Rice + Probiotics SPF50+</h4>
                  <p className="text-[11px] text-brand-charcoal-light line-clamp-1">Viral lightweight organic SPF with 30% rice extract.</p>
                  
                  <button
                    onClick={() => addToCart(PRODUCTS[0])}
                    className="w-full bg-brand-obsidian text-white py-2 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-brand-rose transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Quick Add • £15.50</span>
                  </button>
                </div>
              </div>
            </motion.div>

          </div>
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

        {/* Interactive Categories Horizontal Pills with Motion */}
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {Object.values(CONCERNS).map((concern, index) => (
            <motion.div
              key={concern.slug}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                href={`/concerns/${concern.slug}`}
                className="group bg-white p-5 rounded-2xl border border-brand-grey-border min-w-[210px] hover:border-brand-rose hover:shadow-card transition-smooth flex flex-col justify-between block h-full"
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
            </motion.div>
          ))}
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

      {/* SECTION: VIRAL TIKTOK BEAUTY MODEL REVIEWS & VIDEO SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-obsidian text-white rounded-3xl p-8 md:p-14 shadow-float space-y-10 border border-brand-charcoal-light/30">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
            <div>
              <span className="badge-editorial bg-brand-rose text-white mb-2 inline-block">
                ★ As Seen On TikTok & Instagram
              </span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold">
                Real Beauty Reviews & Routine Demos
              </h2>
            </div>
            <p className="text-xs text-white/70 max-w-md">
              Watch UK beauty creators demonstrate their step-by-step Korean glass skin routines with authentic products.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Main Featured Promoting Video Card */}
            <div className="lg:col-span-2 relative rounded-2xl overflow-hidden bg-brand-charcoal aspect-video md:aspect-[16/9] border border-white/10 shadow-card group">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full opacity-90 group-hover:scale-105 transition-transform duration-700"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-young-woman-applying-face-cream-41130-large.mp4" type="video/mp4" />
              </video>
              
              <div className="absolute inset-0 bg-gradient-to-t from-brand-obsidian via-brand-obsidian/40 to-transparent flex flex-col justify-end p-6 md:p-8 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full border-2 border-brand-rose overflow-hidden relative bg-brand-rose shrink-0">
                    <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" alt="Beauty Creator" fill className="object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">@jiwoo.beauty • London UK</h4>
                    <span className="text-[11px] text-brand-rose font-semibold">Verified K-Beauty Creator • 142k Followers</span>
                  </div>
                </div>

                <p className="text-xs md:text-sm font-medium text-white/90 leading-relaxed italic">
                  &ldquo;This BoJ sunscreen + Snail Mucin combo gave me actual glass skin in 7 days! No white cast, zero breakout flareups, just pure luminous hydration.&rdquo;
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs text-white/80 font-bold">
                    <span>Featured Product:</span>
                    <span className="bg-brand-rose/30 text-brand-rose px-2.5 py-1 rounded border border-brand-rose/40">
                      Relief Sun Rice SPF50+ (£15.50)
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(PRODUCTS[0])}
                    className="bg-brand-rose text-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-brand-rose-dark transition-colors flex items-center gap-1.5"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" /> Shop Featured SPF
                  </button>
                </div>
              </div>
            </div>

            {/* Secondary UGC Review Cards */}
            <div className="space-y-4">
              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full border border-brand-rose overflow-hidden relative shrink-0">
                    <Image src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop" alt="Chloe" fill className="object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-white">@chloe_skincare</h5>
                    <div className="flex text-amber-400 text-[10px]">★★★★★</div>
                  </div>
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  &ldquo;My acne redness completely calmed down after 3 days of using Anua Heartleaf toner. It is now a permanent step in my AM routine!&rdquo;
                </p>
                <button onClick={() => addToCart(PRODUCTS[2])} className="text-[11px] text-brand-rose font-bold uppercase hover:underline">
                  Shop Heartleaf Toner (£19.50) →
                </button>
              </div>

              <div className="bg-white/5 p-5 rounded-2xl border border-white/10 space-y-3 hover:bg-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full border border-brand-rose overflow-hidden relative shrink-0">
                    <Image src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop" alt="Maya" fill className="object-cover" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-white">@maya_kbeauty</h5>
                    <div className="flex text-amber-400 text-[10px]">★★★★★</div>
                  </div>
                </div>
                <p className="text-xs text-white/80 leading-relaxed">
                  &ldquo;The AI skin quiz matched me to products under £45 that actually repaired my broken barrier after over-exfoliating.&rdquo;
                </p>
                <button onClick={openSkinQuiz} className="text-[11px] text-brand-rose font-bold uppercase hover:underline">
                  Take AI Skin Quiz →
                </button>
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

      {/* SECTION 9 — FEATURED BRANDS */}
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
