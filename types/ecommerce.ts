export type SkinType = 'dry' | 'oily' | 'combination' | 'sensitive' | 'normal';

export type ConcernType = 
  | 'acne' 
  | 'pigmentation' 
  | 'dryness' 
  | 'redness' 
  | 'barrier' 
  | 'pores' 
  | 'anti-ageing' 
  | 'dullness';

export type RoutineStep = 
  | 'cleanser' 
  | 'toner' 
  | 'essence' 
  | 'serum' 
  | 'moisturiser' 
  | 'spf' 
  | 'treatment' 
  | 'mask' 
  | 'eye-care' 
  | 'lip-care';

export interface AIMetadata {
  aiSummary: string;
  aiBenefits: string[];
  compatibilityTags: string[];
  concernWeights: Record<ConcernType, number>; // 0 to 1 score
  skinTypeFit: Record<SkinType, boolean>;
  activeClashWarnings?: string[];
  idealRoutineTime: 'AM' | 'PM' | 'BOTH';
  matchScoreDefault: number;
}

export interface Product {
  id: string;
  brand: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number; // in GBP £
  compareAtPrice?: number;
  currency: 'GBP';
  images: string[];
  category: RoutineStep;
  skinTypes: SkinType[];
  concerns: ConcernType[];
  ingredients: string[]; // key ingredient names
  fullIngredients?: string;
  benefits: string[];
  howToUse: string;
  routineStep: RoutineStep;
  routineStepNumber: number;
  texture: string;
  size: string;
  vegan: boolean;
  crueltyFree: boolean;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  viral?: boolean;
  sale?: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  stock: number;
  aiMetadata: AIMetadata;
}

export interface Ingredient {
  slug: string;
  name: string;
  koreanName?: string;
  description: string;
  cosmeticBenefits: string[];
  bestFor: string;
  howToUse: string;
  pairsWellWith: string[];
  avoidPairingWith?: string[];
  popularProducts: string[]; // product IDs
}

export interface Brand {
  slug: string;
  name: string;
  origin: string; // e.g. "Seoul, South Korea"
  description: string;
  heroImage: string;
  logoUrl?: string;
  philosophy: string;
  keyIngredients: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface SkinProfile {
  skinType: SkinType;
  primaryConcerns: ConcernType[];
  secondaryConcerns: ConcernType[];
  sensitivity: 'low' | 'moderate' | 'high';
  budget: 'budget' | 'mid' | 'luxury'; // e.g. <£25, £25-£50, £50+
  complexity: 'simple' | 'balanced' | 'comprehensive'; // 3-step, 5-step, 7-step
  preferredIngredients: string[];
  avoidIngredients: string[];
}

export interface UserRoutine {
  am: Product[];
  pm: Product[];
  totalPrice: number;
  bundleSavings: number;
}

export interface Review {
  id: string;
  author: string;
  skinType: SkinType;
  concern: ConcernType;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
  helpfulCount: number;
  image?: string;
}

export interface RewardTier {
  name: 'Glow' | 'Radiance' | 'Icon';
  minPoints: number;
  benefits: string[];
  multiplier: number;
}
