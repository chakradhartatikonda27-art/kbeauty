'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { INGREDIENTS } from '@/data/ingredients';
import { Sparkles, Search, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function IngredientsHubPage() {
  const [query, setQuery] = useState('');
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);

  const filteredIngredients = INGREDIENTS.filter(ing =>
    ing.name.toLowerCase().includes(query.toLowerCase()) ||
    ing.description.toLowerCase().includes(query.toLowerCase())
  );

  const handleAskAI = () => {
    if (!aiQuestion.trim()) return;
    const lower = aiQuestion.toLowerCase();
    if (lower.includes('niacinamide') && lower.includes('retinol')) {
      setAiAnswer('Yes! Niacinamide and Retinol are an extraordinary pair. Niacinamide helps soothe the moisture barrier and reduces potential flaking or irritation often associated with retinol use.');
    } else if (lower.includes('pdrn')) {
      setAiAnswer('PDRN (Polydeoxyribonucleotide) is a skin-revitalizing compound used in modern K-beauty to support skin density, smooth fine dehydrative texture, and improve skin resilience.');
    } else {
      setAiAnswer(`For ${aiQuestion}, Korean formulations combine humectant hydration with quiet botanical anti-inflammatories to support cosmetic skin balance.`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <span className="badge-editorial bg-brand-blush text-brand-rose">Korean Ingredient Science</span>
        <h1 className="font-serif text-3xl md:text-5xl font-bold text-brand-obsidian">
          The K-Beauty Ingredient Encyclopedia
        </h1>
        <p className="text-xs md:text-sm text-brand-charcoal-light leading-relaxed">
          Demystifying formulas in simple, plain language. Understand active cosmetic benefits before building your routine.
        </p>

        {/* Search */}
        <div className="relative max-w-md mx-auto pt-2">
          <Search className="w-4 h-4 text-brand-rose absolute left-4 top-6" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ingredients (e.g. Niacinamide, Centella)..."
            className="w-full bg-white border border-brand-grey-border rounded-full py-3 pl-11 pr-4 text-xs font-medium outline-none focus:border-brand-rose shadow-subtle text-brand-obsidian"
          />
        </div>
      </div>

      {/* AI Ingredient Assistant */}
      <div className="bg-gradient-to-r from-brand-blush/80 to-white p-6 md:p-8 rounded-3xl border border-brand-blush-border space-y-4 shadow-subtle max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-xs font-bold uppercase text-brand-rose">
          <Sparkles className="w-4 h-4 text-brand-rose animate-spin-slow" />
          <span>Ask AI Ingredient Advisor</span>
        </div>
        <p className="text-xs text-brand-charcoal-light">Ask any question about mixing ingredients or cosmetic functionality:</p>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={aiQuestion}
            onChange={(e) => setAiQuestion(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
            placeholder="e.g. 'Can I use Niacinamide with Retinol?' or 'What does PDRN do?'"
            className="flex-1 bg-white border border-brand-grey-border rounded-full py-2.5 px-4 text-xs outline-none focus:border-brand-rose text-brand-obsidian"
          />
          <button
            onClick={handleAskAI}
            className="bg-brand-obsidian text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-brand-rose transition-colors"
          >
            Ask AI
          </button>
        </div>

        {aiAnswer && (
          <div className="bg-white p-4 rounded-xl border border-brand-grey-border text-xs text-brand-charcoal space-y-1">
            <strong className="text-brand-obsidian block">AI Guidance:</strong>
            <p className="leading-relaxed">{aiAnswer}</p>
          </div>
        )}
      </div>

      {/* Ingredients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredIngredients.map(ing => (
          <Link
            key={ing.slug}
            href={`/ingredients/${ing.slug}`}
            className="group bg-white p-6 rounded-2xl border border-brand-grey-border hover:border-brand-rose hover:shadow-card transition-smooth space-y-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] uppercase font-bold text-brand-rose">{ing.koreanName}</span>
                <h3 className="font-serif text-xl font-bold text-brand-obsidian group-hover:text-brand-rose transition-colors">
                  {ing.name}
                </h3>
              </div>
              <ArrowRight className="w-5 h-5 text-brand-rose group-hover:translate-x-1 transition-transform" />
            </div>

            <p className="text-xs text-brand-charcoal-light line-clamp-2 leading-relaxed">{ing.description}</p>

            <div className="border-t border-brand-grey-border/60 pt-3 text-xs">
              <strong className="text-brand-obsidian block mb-1">Key Cosmetic Benefits:</strong>
              <div className="flex flex-wrap gap-1.5">
                {ing.cosmeticBenefits.map((b, i) => (
                  <span key={i} className="bg-brand-ivory text-brand-charcoal text-[11px] px-2.5 py-1 rounded border border-brand-grey-border">
                    ✓ {b}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
