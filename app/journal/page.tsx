'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { Sparkles, ArrowRight, BookOpen } from 'lucide-react';

export default function JournalPage() {
  const { openSkinQuiz } = useShop();

  const articles = [
    {
      id: '1',
      title: 'How to Build a Simple 5-Step Korean Skincare Routine for Beginners',
      category: 'Beginner Guide',
      readTime: '4 min read',
      excerpt: 'Struggling with 10-step routine overload? Here is how Seoul dermatologists simplify micro-layering for UK weather.',
      image: 'https://images.unsplash.com/photo-1608248597263-00079e96048a?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: '2',
      title: 'Centella Asiatica vs. Heartleaf: Which Botanical Soothes Redness Faster?',
      category: 'Skin Science',
      readTime: '6 min read',
      excerpt: 'We analyze the chemical active compounds of Cica and Houttuynia Cordata to help reactive skin types choose.',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: '3',
      title: 'Glass Skin Demystified: The Science of Humectants and Lipid Locks',
      category: 'K-Beauty Trends',
      readTime: '5 min read',
      excerpt: 'Why dewy skin requires balancing water humectants with plant squalane and probiotic ferments.',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="badge-editorial bg-brand-blush text-brand-rose">SEOUL LABS JOURNAL</span>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-brand-obsidian">
          The K-Beauty Skincare Magazine
        </h1>
        <p className="text-xs md:text-sm text-brand-charcoal-light">
          Evidence-based cosmetic science, ingredient deep dives, and routine guides for UK skin types.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map(art => (
          <div key={art.id} className="group bg-white rounded-2xl border border-brand-grey-border overflow-hidden shadow-subtle hover:shadow-card transition-smooth flex flex-col justify-between">
            <div className="space-y-4">
              <div className="relative h-48 bg-brand-ivory overflow-hidden">
                <Image src={art.image} alt={art.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-5 space-y-2">
                <div className="flex justify-between items-center text-[10px] uppercase font-bold text-brand-rose">
                  <span>{art.category}</span>
                  <span className="text-brand-charcoal-light font-normal">{art.readTime}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-obsidian group-hover:text-brand-rose transition-colors leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-brand-charcoal-light line-clamp-2 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>
            </div>
            <div className="p-5 pt-0">
              <button
                onClick={openSkinQuiz}
                className="text-xs font-semibold text-brand-rose hover:text-brand-obsidian flex items-center gap-1"
              >
                Build My Routine with AI →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
