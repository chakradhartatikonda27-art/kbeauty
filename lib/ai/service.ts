import { Product, SkinProfile, UserRoutine, ConcernType, SkinType } from '@/types/ecommerce';
import { PRODUCTS } from '@/data/products';

export interface AISearchResult {
  products: Product[];
  matchedBecause: string[];
  intentSummary: string;
  suggestedRoutine?: string[];
}

export interface AIRoutineCheckResult {
  isCompatible: boolean;
  warnings: string[];
  suggestions: string[];
}

export interface AISkinQuizResult {
  profile: SkinProfile;
  recommendedRoutine: UserRoutine;
  routineExplanation: string;
  totalPrice: number;
  bundleSavings: number;
}

/**
 * AI Natural Language Search Service
 */
export function aiSearch(query: string): AISearchResult {
  const q = query.toLowerCase().trim();
  let matchedProducts = [...PRODUCTS];
  const matchedBecause: string[] = [];
  let intentSummary = 'Matched products based on catalog analysis';

  // 1. Natural Language Intent Parsers
  const isDry = q.includes('dry') || q.includes('dehydrated') || q.includes('flaky');
  const isSensitive = q.includes('sensitive') || q.includes('redness') || q.includes('reactive') || q.includes('soothing');
  const isAcne = q.includes('acne') || q.includes('breakout') || q.includes('blemish') || q.includes('pimple');
  const isGlassSkin = q.includes('glass skin') || q.includes('glow') || q.includes('dewy') || q.includes('radiant');
  const isPores = q.includes('pore') || q.includes('blackhead') || q.includes('sebum') || q.includes('oily');
  const isNiacinamide = q.includes('niacinamide');
  const isCentella = q.includes('centella') || q.includes('cica');
  const isSnail = q.includes('snail');
  const isSerum = q.includes('serum') || q.includes('ampoule');
  const isRoutine = q.includes('routine') || q.includes('build');

  // Price budget parsing (e.g. "under £25", "under 20")
  const priceMatch = q.match(/under\s*£?(\d+)/i) || q.match(/less\s*than\s*£?(\d+)/i);
  let maxPrice: number | null = null;
  if (priceMatch) {
    maxPrice = parseFloat(priceMatch[1]);
  }

  // Filter & scoring
  if (maxPrice !== null) {
    matchedProducts = matchedProducts.filter(p => p.price <= maxPrice!);
    matchedBecause.push(`Under your £${maxPrice} budget`);
  }

  if (isDry) {
    matchedProducts = matchedProducts.filter(p => p.skinTypes.includes('dry') || p.concerns.includes('dryness'));
    matchedBecause.push('Hydrating & Moisture-locking');
  }

  if (isSensitive) {
    matchedProducts = matchedProducts.filter(p => p.skinTypes.includes('sensitive') || p.concerns.includes('redness') || p.concerns.includes('barrier'));
    matchedBecause.push('Suitable for sensitive / reactive skin');
    matchedBecause.push('Barrier-supporting');
  }

  if (isAcne) {
    matchedProducts = matchedProducts.filter(p => p.concerns.includes('acne') || p.tags.includes('ACNE SAFE'));
    matchedBecause.push('Non-comedogenic & blemish soothing');
  }

  if (isGlassSkin) {
    matchedProducts = matchedProducts.filter(p => p.tags.includes('GLASS SKIN') || p.tags.includes('DEWY GLOW') || p.concerns.includes('dullness'));
    matchedBecause.push('Dewy glass-skin finish');
  }

  if (isPores) {
    matchedProducts = matchedProducts.filter(p => p.concerns.includes('pores') || p.skinTypes.includes('oily'));
    matchedBecause.push('Seals & clarifies pores');
  }

  if (isNiacinamide) {
    matchedProducts = matchedProducts.filter(p => p.ingredients.some(i => i.toLowerCase().includes('niacinamide')));
    matchedBecause.push('Contains gentle Niacinamide');
  }

  if (isCentella) {
    matchedProducts = matchedProducts.filter(p => p.ingredients.some(i => i.toLowerCase().includes('centella')));
    matchedBecause.push('Infused with Madagascan Centella');
  }

  if (isSnail) {
    matchedProducts = matchedProducts.filter(p => p.ingredients.some(i => i.toLowerCase().includes('snail')));
    matchedBecause.push('Pure Snail Mucin extract');
  }

  if (isSerum) {
    matchedProducts = matchedProducts.filter(p => p.category === 'serum');
  }

  // Fallback if filter narrowed down too much
  if (matchedProducts.length === 0) {
    matchedProducts = PRODUCTS.slice(0, 4);
    intentSummary = `Showing recommended bestsellers matching "${query}"`;
  } else {
    intentSummary = `AI matched ${matchedProducts.length} items for "${query}"`;
  }

  if (matchedBecause.length === 0) {
    matchedBecause.push('Authentic Korean formula');
    matchedBecause.push('UK fast delivery eligible');
    matchedBecause.push('High rating score');
  }

  return {
    products: matchedProducts,
    matchedBecause,
    intentSummary,
    suggestedRoutine: isRoutine ? ['round-lab-dokdo-cleanser', 'anua-heartleaf-77-toner', 'skin1004-centella-ampoule', 'boj-relief-sun'] : undefined
  };
}

/**
 * AI PDP Match Generator
 */
export function calculatePDPScore(product: Product, profile?: SkinProfile): { score: number; reasons: string[] } {
  if (!profile) {
    return {
      score: product.aiMetadata.matchScoreDefault,
      reasons: [
        `Ideal for ${product.skinTypes.slice(0, 2).join(' & ')} skin types`,
        `Targets ${product.concerns.slice(0, 2).join(' & ')}`,
        'Formulated with high purity active ingredients',
        'Cruelty-free formulation'
      ]
    };
  }

  let score = 75;
  const reasons: string[] = [];

  // Skin type fit
  if (product.skinTypes.includes(profile.skinType)) {
    score += 12;
    reasons.push(`Formulated for your ${profile.skinType.toUpperCase()} skin type`);
  }

  // Concern overlap
  const concernMatch = product.concerns.filter(c => profile.primaryConcerns.includes(c) || profile.secondaryConcerns.includes(c));
  if (concernMatch.length > 0) {
    score += 10;
    reasons.push(`Directly targets your primary concern: ${concernMatch[0].toUpperCase()}`);
  }

  // Sensitivity safe
  if (profile.sensitivity === 'high' && (product.skinTypes.includes('sensitive') || product.tags.includes('SENSITIVE APPROVED'))) {
    score += 5;
    reasons.push('Hypoallergenic & delicate skin approved');
  }

  return {
    score: Math.min(score, 99),
    reasons: reasons.slice(0, 4)
  };
}

/**
 * Smart Cart AI Routine Compatibility & Gap Checker
 */
export function aiCheckCartRoutine(cartProducts: Product[]): AIRoutineCheckResult {
  const warnings: string[] = [];
  const suggestions: string[] = [];

  if (cartProducts.length === 0) {
    return { isCompatible: true, warnings: [], suggestions: [] };
  }

  const categories = cartProducts.map(p => p.category);
  const hasCleanser = categories.includes('cleanser');
  const hasSerum = categories.includes('serum') || categories.includes('essence');
  const hasMoisturiser = categories.includes('moisturiser');
  const hasSPF = categories.includes('spf');

  // Check for routine gaps
  if (hasCleanser && hasSerum && hasMoisturiser && !hasSPF) {
    suggestions.push('Your daily AM routine is missing broad-spectrum SPF to protect your skin barrier.');
  }

  // Check for exfoliant clashes
  const chemicalExfoliants = cartProducts.filter(p => p.ingredients.some(i => i.toLowerCase().includes('bha') || i.toLowerCase().includes('aha') || i.toLowerCase().includes('salicylic')));
  if (chemicalExfoliants.length >= 2) {
    warnings.push('Routine check: Multiple active exfoliating treatments detected. To protect your moisture barrier, consider using these on alternate days.');
  }

  return {
    isCompatible: warnings.length === 0,
    warnings,
    suggestions
  };
}

/**
 * AI 7-Step Skin Quiz Evaluator
 */
export function evaluateSkinQuiz(answers: {
  skinType: SkinType;
  primaryConcern: ConcernType;
  secondaryConcern: ConcernType;
  sensitivity: 'low' | 'moderate' | 'high';
  budget: 'budget' | 'mid' | 'luxury';
  complexity: 'simple' | 'balanced' | 'comprehensive';
}): AISkinQuizResult {
  const profile: SkinProfile = {
    skinType: answers.skinType,
    primaryConcerns: [answers.primaryConcern],
    secondaryConcerns: [answers.secondaryConcern],
    sensitivity: answers.sensitivity,
    budget: answers.budget,
    complexity: answers.complexity,
    preferredIngredients: ['Centella Asiatica', 'Hyaluronic Acid', 'Niacinamide'],
    avoidIngredients: []
  };

  // Build tailored AM & PM Routine
  const am: Product[] = [];
  const pm: Product[] = [];

  // Step 1: Cleanser
  const cleanser = PRODUCTS.find(p => p.category === 'cleanser') || PRODUCTS[4];
  am.push(cleanser);
  pm.push(cleanser);

  // Step 2: Toner / Essence
  if (answers.primaryConcern === 'acne' || answers.primaryConcern === 'redness') {
    const toner = PRODUCTS.find(p => p.id === 'anua-heartleaf-77-toner') || PRODUCTS[2];
    am.push(toner);
    pm.push(toner);
  } else {
    const essence = PRODUCTS.find(p => p.id === 'cosrx-snail-96-essence') || PRODUCTS[1];
    am.push(essence);
    pm.push(essence);
  }

  // Step 3: Targeted Serum
  if (answers.primaryConcern === 'pigmentation') {
    const spotSerum = PRODUCTS.find(p => p.id === 'axis-y-dark-spot-glow-serum') || PRODUCTS[9];
    am.push(spotSerum);
    pm.push(spotSerum);
  } else if (answers.primaryConcern === 'dryness') {
    const hydrateSerum = PRODUCTS.find(p => p.id === 'torriden-dive-in-serum') || PRODUCTS[5];
    am.push(hydrateSerum);
    pm.push(hydrateSerum);
  } else {
    const centellaSerum = PRODUCTS.find(p => p.id === 'skin1004-centella-ampoule') || PRODUCTS[3];
    am.push(centellaSerum);
    pm.push(centellaSerum);
  }

  // Step 4: Moisturiser
  const moisturiser = PRODUCTS.find(p => p.category === 'moisturiser') || PRODUCTS[6];
  am.push(moisturiser);
  pm.push(moisturiser);

  // Step 5: AM Sunscreen
  const spf = PRODUCTS.find(p => p.category === 'spf') || PRODUCTS[0];
  am.push(spf);

  // Unique products calculation
  const allUniqueProducts = Array.from(new Set([...am, ...pm]));
  const totalPrice = allUniqueProducts.reduce((sum, p) => sum + p.price, 0);
  const bundleSavings = 12.00; // Bundle discount

  return {
    profile,
    recommendedRoutine: {
      am,
      pm,
      totalPrice: totalPrice - bundleSavings,
      bundleSavings
    },
    routineExplanation: `Specially crafted 5-step regimen for ${answers.skinType.toUpperCase()} skin targeting ${answers.primaryConcern.toUpperCase()}. Formulated to balance lipid hydration while calming reactive sensitivity.`,
    totalPrice: totalPrice - bundleSavings,
    bundleSavings
  };
}
