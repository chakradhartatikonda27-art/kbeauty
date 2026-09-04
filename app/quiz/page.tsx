'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { evaluateSkinQuiz, AISkinQuizResult } from '@/lib/ai/service';
import { SkinType, ConcernType } from '@/types/ecommerce';
import { Sparkles, Check, ArrowRight, ArrowLeft, RefreshCw, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function QuizPage() {
  const { setUserProfile, setSavedRoutine, addToCart } = useShop();

  const [step, setStep] = useState(1);
  const [skinType, setSkinType] = useState<SkinType>('dry');
  const [primaryConcern, setPrimaryConcern] = useState<ConcernType>('dryness');
  const [secondaryConcern, setSecondaryConcern] = useState<ConcernType>('redness');
  const [sensitivity, setSensitivity] = useState<'low' | 'moderate' | 'high'>('moderate');
  const [budget, setBudget] = useState<'budget' | 'mid' | 'luxury'>('mid');
  const [complexity, setComplexity] = useState<'simple' | 'balanced' | 'comprehensive'>('balanced');
  const [result, setResult] = useState<AISkinQuizResult | null>(null);
  const [routineAdded, setRoutineAdded] = useState(false);

  const totalSteps = 6;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Evaluate AI quiz
      const evaluated = evaluateSkinQuiz({
        skinType,
        primaryConcern,
        secondaryConcern,
        sensitivity,
        budget,
        complexity
      });
      setResult(evaluated);
      setUserProfile(evaluated.profile);
      setSavedRoutine(evaluated.recommendedRoutine);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleAddRoutineToBag = () => {
    if (!result) return;
    const amUnique = result.recommendedRoutine.am;
    const pmUnique = result.recommendedRoutine.pm;
    const allItems = Array.from(new Set([...amUnique, ...pmUnique]));
    allItems.forEach(item => addToCart(item));
    setRoutineAdded(true);
    setTimeout(() => setRoutineAdded(false), 2000);
  };

  return (
    <div className="min-h-[85vh] max-w-4xl mx-auto px-4 py-8 md:py-16">
      {/* Quiz Progress Header */}
      {!result && (
        <div className="mb-10 space-y-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xs font-semibold uppercase text-brand-charcoal-light hover:text-brand-obsidian flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" /> Exit Quiz
            </Link>
            <span className="text-xs font-bold text-brand-rose">
              STEP 0{step} / 0{totalSteps}
            </span>
          </div>

          <div className="w-full bg-brand-grey-border rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-brand-rose h-full transition-all duration-300 rounded-full"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* QUESTION 1: SKIN TYPE */}
      {step === 1 && !result && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="text-center space-y-2">
            <span className="badge-editorial bg-brand-blush text-brand-rose">Question 01</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-obsidian">
              How does your skin usually feel after cleansing?
            </h1>
            <p className="text-xs text-brand-charcoal-light">Select the option that best describes your natural skin feel.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { type: 'dry', title: 'Tight / Dry / Flaky', desc: 'Lacks oil & water, prone to tightness and fine dehydrated lines.' },
              { type: 'oily', title: 'Oily / Shiny', desc: 'Excess sebum across entire face, prone to enlarged pores & shine.' },
              { type: 'combination', title: 'Combination', desc: 'Oily T-zone (forehead, nose) with dry or normal cheeks.' },
              { type: 'sensitive', title: 'Sensitive / Reactive', desc: 'Easily flushes red, stings with harsh products or temperature changes.' },
              { type: 'normal', title: 'Balanced / Normal', desc: 'Generally comfortable without excessive oiliness or tightness.' }
            ].map(option => (
              <button
                key={option.type}
                onClick={() => setSkinType(option.type as SkinType)}
                className={`p-5 rounded-2xl border text-left transition-smooth flex items-start justify-between ${
                  skinType === option.type
                    ? 'border-brand-rose bg-brand-blush/40 shadow-card'
                    : 'border-brand-grey-border bg-white hover:border-brand-rose/60'
                }`}
              >
                <div>
                  <h3 className="font-serif text-lg font-bold text-brand-obsidian">{option.title}</h3>
                  <p className="text-xs text-brand-charcoal-light mt-1">{option.desc}</p>
                </div>
                <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${skinType === option.type ? 'border-brand-rose bg-brand-rose text-white' : 'border-brand-grey-border'}`}>
                  {skinType === option.type && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* QUESTION 2: PRIMARY CONCERN */}
      {step === 2 && !result && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="text-center space-y-2">
            <span className="badge-editorial bg-brand-blush text-brand-rose">Question 02</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-obsidian">
              What is your primary skincare concern?
            </h1>
            <p className="text-xs text-brand-charcoal-light">Choose the #1 condition you want to target.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'acne', label: 'Acne & Breakouts', tag: 'Calm + Clear' },
              { id: 'pigmentation', label: 'Dark Spots', tag: 'Brighten' },
              { id: 'dryness', label: 'Dehydration', tag: 'Hydrate' },
              { id: 'redness', label: 'Redness', tag: 'Calm' },
              { id: 'barrier', label: 'Damaged Barrier', tag: 'Fortify' },
              { id: 'pores', label: 'Enlarged Pores', tag: 'Refine' },
              { id: 'dullness', label: 'Dull Skin', tag: 'Glow' },
              { id: 'anti-ageing', label: 'Slow Ageing', tag: 'Firm' }
            ].map(c => (
              <button
                key={c.id}
                onClick={() => setPrimaryConcern(c.id as ConcernType)}
                className={`p-4 rounded-xl border text-center transition-smooth flex flex-col justify-between h-32 ${
                  primaryConcern === c.id
                    ? 'border-brand-rose bg-brand-blush/60 shadow-card'
                    : 'border-brand-grey-border bg-white hover:border-brand-rose/60'
                }`}
              >
                <span className="text-[10px] uppercase font-bold text-brand-rose">{c.tag}</span>
                <h4 className="font-serif text-base font-bold text-brand-obsidian">{c.label}</h4>
                <div className={`w-4 h-4 rounded-full border mx-auto flex items-center justify-center ${primaryConcern === c.id ? 'border-brand-rose bg-brand-rose text-white' : 'border-brand-grey-border'}`}>
                  {primaryConcern === c.id && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* QUESTION 3: SECONDARY CONCERN */}
      {step === 3 && !result && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="text-center space-y-2">
            <span className="badge-editorial bg-brand-blush text-brand-rose">Question 03</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-obsidian">
              Select a secondary skincare goal.
            </h1>
            <p className="text-xs text-brand-charcoal-light">Choose another target for your customized formula.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { id: 'pigmentation', label: 'Hyperpigmentation' },
              { id: 'redness', label: 'Facial Redness' },
              { id: 'barrier', label: 'Barrier Repair' },
              { id: 'pores', label: 'Pore Tightening' },
              { id: 'dullness', label: 'Radiance Boost' },
              { id: 'dryness', label: 'Lipid Moisture' }
            ].map(c => (
              <button
                key={c.id}
                onClick={() => setSecondaryConcern(c.id as ConcernType)}
                className={`p-4 rounded-xl border text-center transition-smooth h-28 flex flex-col justify-between ${
                  secondaryConcern === c.id
                    ? 'border-brand-rose bg-brand-blush/60 shadow-card'
                    : 'border-brand-grey-border bg-white hover:border-brand-rose/60'
                }`}
              >
                <h4 className="font-serif text-sm font-bold text-brand-obsidian">{c.label}</h4>
                <div className={`w-4 h-4 rounded-full border mx-auto flex items-center justify-center ${secondaryConcern === c.id ? 'border-brand-rose bg-brand-rose text-white' : 'border-brand-grey-border'}`}>
                  {secondaryConcern === c.id && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* QUESTION 4: SENSITIVITY LEVEL */}
      {step === 4 && !result && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="text-center space-y-2">
            <span className="badge-editorial bg-brand-blush text-brand-rose">Question 04</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-obsidian">
              How reactive is your skin to active ingredients?
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { val: 'low', title: 'Low Sensitivity', desc: 'Tolerates exfoliants, Vitamin C, and retinoids without issue.' },
              { val: 'moderate', title: 'Moderate Sensitivity', desc: 'Occasionally flushes or tingles with active products.' },
              { val: 'high', title: 'High Sensitivity / Fragile', desc: 'Requires fragrance-free, hypoallergenic Centella & Heartleaf formulas.' }
            ].map(s => (
              <button
                key={s.val}
                onClick={() => setSensitivity(s.val as any)}
                className={`p-5 rounded-2xl border text-left transition-smooth flex flex-col justify-between ${
                  sensitivity === s.val
                    ? 'border-brand-rose bg-brand-blush/60 shadow-card'
                    : 'border-brand-grey-border bg-white hover:border-brand-rose/60'
                }`}
              >
                <div>
                  <h3 className="font-serif text-base font-bold text-brand-obsidian">{s.title}</h3>
                  <p className="text-xs text-brand-charcoal-light mt-2">{s.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* QUESTION 5: BUDGET */}
      {step === 5 && !result && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="text-center space-y-2">
            <span className="badge-editorial bg-brand-blush text-brand-rose">Question 05</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-obsidian">
              What is your target budget for your routine?
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { val: 'budget', title: 'Budget Friendly', desc: 'Under £50 total routine cost' },
              { val: 'mid', title: 'Balanced Value', desc: '£50 - £85 total routine cost' },
              { val: 'luxury', title: 'Luxury Hanbang', desc: '£85+ premium formulations' }
            ].map(b => (
              <button
                key={b.val}
                onClick={() => setBudget(b.val as any)}
                className={`p-5 rounded-2xl border text-left transition-smooth flex flex-col justify-between ${
                  budget === b.val
                    ? 'border-brand-rose bg-brand-blush/60 shadow-card'
                    : 'border-brand-grey-border bg-white hover:border-brand-rose/60'
                }`}
              >
                <div>
                  <h3 className="font-serif text-base font-bold text-brand-obsidian">{b.title}</h3>
                  <p className="text-xs text-brand-charcoal-light mt-2">{b.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* QUESTION 6: COMPLEXITY */}
      {step === 6 && !result && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <div className="text-center space-y-2">
            <span className="badge-editorial bg-brand-blush text-brand-rose">Question 06</span>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-brand-obsidian">
              How many steps do you prefer in your routine?
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { val: 'simple', title: 'Minimalist (3-Step)', desc: 'Cleanser, Moisturiser, Sunscreen' },
              { val: 'balanced', title: 'Classic K-Beauty (5-Step)', desc: 'Cleanser, Toner, Essence/Serum, Moisturiser, Sunscreen' },
              { val: 'comprehensive', title: 'Full Glass-Skin Regimen', desc: 'Double cleanse, Essence, Serum, Treatment, Moisturiser, Lip Care' }
            ].map(c => (
              <button
                key={c.val}
                onClick={() => setComplexity(c.val as any)}
                className={`p-5 rounded-2xl border text-left transition-smooth flex flex-col justify-between ${
                  complexity === c.val
                    ? 'border-brand-rose bg-brand-blush/60 shadow-card'
                    : 'border-brand-grey-border bg-white hover:border-brand-rose/60'
                }`}
              >
                <div>
                  <h3 className="font-serif text-base font-bold text-brand-obsidian">{c.title}</h3>
                  <p className="text-xs text-brand-charcoal-light mt-2">{c.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Controls */}
      {!result && (
        <div className="mt-10 flex items-center justify-between border-t border-brand-grey-border pt-6">
          <button
            onClick={handleBack}
            disabled={step === 1}
            className="text-xs font-semibold uppercase text-brand-charcoal-light hover:text-brand-obsidian disabled:opacity-40 flex items-center gap-1"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <button
            onClick={handleNext}
            className="bg-brand-obsidian text-white py-3.5 px-8 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-brand-rose transition-smooth shadow-subtle"
          >
            <span>{step === totalSteps ? 'Generate Routine' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* RESULTS DISPLAY */}
      {result && (
        <div className="space-y-10 animate-in fade-in duration-500">
          <div className="bg-gradient-to-br from-brand-blush/80 to-white p-8 rounded-3xl border border-brand-blush-border space-y-4 shadow-card text-center">
            <span className="badge-editorial bg-brand-rose text-white inline-block">
              Your Diagnostic Skin Profile
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-bold text-brand-obsidian">
              Your Personalized 5-Step K-Beauty Regimen
            </h1>
            <p className="text-xs md:text-sm text-brand-charcoal-light max-w-xl mx-auto">
              {result.routineExplanation}
            </p>
          </div>

          {/* AM & PM Routine Breakdown */}
          <div className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-brand-obsidian border-b border-brand-grey-border pb-2">
              AM Regimen (Morning Protection)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              {result.recommendedRoutine.am.map((product, i) => (
                <div key={i} className="bg-white p-3 rounded-xl border border-brand-grey-border space-y-2 text-xs">
                  <span className="text-[10px] font-bold text-brand-rose block">STEP 0{i + 1}</span>
                  <div className="relative aspect-square rounded-md overflow-hidden bg-brand-ivory">
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  </div>
                  <h4 className="font-semibold text-brand-obsidian line-clamp-1">{product.name}</h4>
                  <span className="font-bold block">£{product.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bundle Summary & Add to Bag */}
          <div className="bg-brand-obsidian text-white p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-float">
            <div>
              <span className="text-xs uppercase font-bold text-brand-rose">Exclusive Quiz Bundle Discount</span>
              <h3 className="font-serif text-xl md:text-2xl font-bold mt-1">Complete Routine: £{result.totalPrice.toFixed(2)}</h3>
              <p className="text-xs text-white/70">You save £{result.bundleSavings.toFixed(2)} + unlocked Free UK Shipping 🎁</p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleAddRoutineToBag}
                className={`py-4 px-8 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center gap-2 transition-smooth ${
                  routineAdded ? 'bg-emerald-600 text-white' : 'bg-brand-rose text-white hover:bg-brand-rose-dark'
                }`}
              >
                {routineAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                <span>{routineAdded ? 'Added to Bag!' : 'Add Entire Routine'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
