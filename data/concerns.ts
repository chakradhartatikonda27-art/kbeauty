import { ConcernType } from '@/types/ecommerce';

export interface ConcernDetail {
  slug: ConcernType;
  title: string;
  tagline: string;
  description: string;
  heroImage: string;
  recommendedIngredients: string[];
  productIds: string[];
  faq: { q: string; a: string }[];
}

export const CONCERNS: Record<ConcernType, ConcernDetail> = {
  acne: {
    slug: 'acne',
    title: 'Acne & Breakout Care',
    tagline: 'Calm + Clear',
    description: 'Target active blemishes, soothe inflammation, and clear clogged pores without stripping your moisture barrier.',
    heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop',
    recommendedIngredients: ['Heartleaf', 'Centella Asiatica', 'Salicylic Acid (BHA)', 'Niacinamide'],
    productIds: ['anua-heartleaf-77-toner', 'skin1004-centella-ampoule', 'medicube-zero-pore-pad'],
    faq: [
      {
        q: 'Should I dry out active acne?',
        a: 'No. Traditional harsh drying treatments damage your skin barrier, triggering excess oil production. K-beauty focuses on soothing inflammation and hydrating while clearing pores.'
      },
      {
        q: 'Can heartleaf really calm acne?',
        a: 'Heartleaf (Houttuynia Cordata) has natural antibacterial and anti-inflammatory properties that calm angry breakouts gently.'
      }
    ]
  },
  pigmentation: {
    slug: 'pigmentation',
    title: 'Pigmentation & Dark Spots',
    tagline: 'Brighten + Even',
    description: 'Fade post-acne dark spots, sun spots, and hyperpigmentation with Korean brightening botanical extracts.',
    heroImage: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=1000&auto=format&fit=crop',
    recommendedIngredients: ['Niacinamide 5%', 'Rice Extract', 'Arbutin', 'Vitamin C', 'Glutathione'],
    productIds: ['axis-y-dark-spot-glow-serum', 'boj-relief-sun', 'beauty-of-joseon-dynasty-cream'],
    faq: [
      {
        q: 'How long does it take to fade post-acne marks?',
        a: 'With consistent daily use of Niacinamide and broad-spectrum daily SPF, initial brightening is visible in 4 to 6 weeks.'
      }
    ]
  },
  dryness: {
    slug: 'dryness',
    title: 'Dry & Dehydrated Skin',
    tagline: 'Deep Hydration',
    description: 'Quench thirsty skin layers with multi-weight hyaluronic acid, snail mucin, and rice lipids.',
    heroImage: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1000&auto=format&fit=crop',
    recommendedIngredients: ['Hyaluronic Acid', 'Snail Mucin', 'Rice Extract', 'Squalane', 'Ceramides'],
    productIds: ['torriden-dive-in-serum', 'cosrx-snail-96-essence', 'beauty-of-joseon-dynasty-cream'],
    faq: [
      {
        q: 'What is the difference between dry and dehydrated skin?',
        a: 'Dry skin lacks oil/lipids, while dehydrated skin lacks water. Korean layering routines address both simultaneously.'
      }
    ]
  },
  redness: {
    slug: 'redness',
    title: 'Redness & Sensitivity',
    tagline: 'Barrier First',
    description: 'Cool down flushing, environmental irritation, and compromised barriers with high-purity Cica & Heartleaf.',
    heroImage: 'https://images.unsplash.com/photo-1608248597263-00079e96048a?q=80&w=1000&auto=format&fit=crop',
    recommendedIngredients: ['Pure Centella Asiatica', 'Heartleaf', 'Panthenol', 'Allantoin'],
    productIds: ['skin1004-centella-ampoule', 'anua-heartleaf-77-toner', 'round-lab-dokdo-cleanser'],
    faq: [
      {
        q: 'Why does my skin flush easily?',
        a: 'A weakened moisture barrier allows irritants to trigger vascular sensitivity. Pure Centella restores shield integrity.'
      }
    ]
  },
  barrier: {
    slug: 'barrier',
    title: 'Barrier Repair',
    tagline: 'Fortify + Protect',
    description: 'Rebuild a broken skin barrier damaged by over-exfoliation or harsh weather conditions.',
    heroImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1000&auto=format&fit=crop',
    recommendedIngredients: ['Ceramides', 'Probiotics', 'Squalane', 'Panthenol', 'Rice Ferment'],
    productIds: ['boj-relief-sun', 'beauty-of-joseon-dynasty-cream', 'cosrx-snail-96-essence'],
    faq: [
      {
        q: 'How do I know if my skin barrier is damaged?',
        a: 'Tightness, stinging when applying gentle products, redness, and sudden breakouts are classic signs of a damaged barrier.'
      }
    ]
  },
  pores: {
    slug: 'pores',
    title: 'Pores & Sebum Control',
    tagline: 'Refine + Balance',
    description: 'Tighten enlarged pores and balance oil production without leaving your skin tight or dry.',
    heroImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1000&auto=format&fit=crop',
    recommendedIngredients: ['BHA (Salicylic Acid)', 'AHA (Lactic Acid)', 'Niacinamide', 'Deep Sea Water'],
    productIds: ['medicube-zero-pore-pad', 'round-lab-dokdo-cleanser', 'axis-y-dark-spot-glow-serum'],
    faq: [
      {
        q: 'Can pores actually shrink?',
        a: 'Pores cannot physically disappear, but clearing oxidized sebum and tightening surrounding collagen makes them look significantly smaller.'
      }
    ]
  },
  dullness: {
    slug: 'dullness',
    title: 'Dull Skin & Lack of Glow',
    tagline: 'Glow Mode',
    description: 'Transform tired skin into smooth, radiant glass skin with brightening ferments and hydrating essences.',
    heroImage: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000&auto=format&fit=crop',
    recommendedIngredients: ['Rice Ferment', 'Niacinamide', 'Snail Mucin', 'Ginseng'],
    productIds: ['cosrx-snail-96-essence', 'boj-relief-sun', 'axis-y-dark-spot-glow-serum'],
    faq: [
      {
        q: 'What gives Korean "Glass Skin"?',
        a: 'Glass skin is achieved through micro-layering hydration (essence + serum) paired with gentle cell renewal ferments.'
      }
    ]
  },
  'anti-ageing': {
    slug: 'anti-ageing',
    title: 'Slow Ageing & Elasticity',
    tagline: 'Slow Ageing',
    description: 'Preserve youthful bounce, firm dehydrative fine lines, and boost skin collagen with Ginseng & Peptides.',
    heroImage: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=1000&auto=format&fit=crop',
    recommendedIngredients: ['Ginseng', 'Adenosine', 'Peptides', 'Broad Spectrum Sunscreen'],
    productIds: ['beauty-of-joseon-dynasty-cream', 'boj-relief-sun', 'torriden-dive-in-serum'],
    faq: [
      {
        q: 'What is K-beauty "Slow Ageing"?',
        a: 'Instead of harsh reactive anti-wrinkle procedures, slow ageing focuses on preventative daily UV defense and deep cellular nutrition.'
      }
    ]
  }
};
