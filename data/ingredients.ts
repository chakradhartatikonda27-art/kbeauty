import { Ingredient } from '@/types/ecommerce';

export const INGREDIENTS: Ingredient[] = [
  {
    slug: 'niacinamide',
    name: 'Niacinamide (Vitamin B3)',
    koreanName: '나이아신아마이드',
    description: 'A water-soluble vitamin that works with natural substances in skin to visibly minimize enlarged pores, tighten lax pores, improve uneven skin tone, soften fine lines, and strengthen a weakened surface.',
    cosmeticBenefits: [
      'Visibly refines enlarged pores',
      'Fades post-acne hyperpigmentation & dark spots',
      'Strengthens skin lipid barrier',
      'Regulates excess oil production'
    ],
    bestFor: 'Oily, combination, dull or acne-prone skin with visible pores or uneven tone.',
    howToUse: 'Can be used daily in AM and PM routines. Pairs exceptionally well with Hyaluronic Acid, Centella, and Squalane.',
    pairsWellWith: ['Hyaluronic Acid', 'Centella Asiatica', 'Squalane', 'Ceramides', 'Peptides'],
    avoidPairingWith: ['High-concentration L-Ascorbic Acid (Vitamin C) in the same step if skin flushes easily'],
    popularProducts: ['axis-y-dark-spot-glow-serum', 'boj-relief-sun', 'beauty-of-joseon-dynasty-cream']
  },
  {
    slug: 'centella-asiatica',
    name: 'Centella Asiatica (Cica)',
    koreanName: '병풀추출물',
    description: 'An ancient Asian herb revered in Korean medicine for its extraordinary anti-inflammatory and skin-healing properties. Contains active compounds like Madecassoside and Asiaticoside.',
    cosmeticBenefits: [
      'Rapidly cools down skin inflammation & flush redness',
      'Accelerates healing of active acne blemishes',
      'Reinforces compromised moisture barrier',
      'Provides antioxidant protection'
    ],
    bestFor: 'Sensitive, reactive, red, or acne-inflamed skin.',
    howToUse: 'Gentle enough to be used multiple times daily. Safe with all skincare actives including exfoliating acids and retinoids.',
    pairsWellWith: ['Hyaluronic Acid', 'Snail Mucin', 'Retinoids', 'AHA/BHA', 'Ceramides'],
    popularProducts: ['skin1004-centella-ampoule', 'anua-heartleaf-77-toner']
  },
  {
    slug: 'snail-mucin',
    name: 'Snail Secretion Filtrate',
    koreanName: '달팽이점액여과물',
    description: 'Rich in natural glycoproteins, hyaluronic acid, glycolic acid, and antimicrobial peptides. Harvested humanely in dark quiet environments to preserve nutrient density.',
    cosmeticBenefits: [
      'Delivers deep, long-lasting moisture plumping',
      'Smooths surface roughness and acne scar indentations',
      'Soothes irritated or sun-baked skin',
      'Enhances natural skin elasticity'
    ],
    bestFor: 'Dry, dehydrated, scarred, or barrier-compromised skin.',
    howToUse: 'Apply to damp skin directly after toner or cleansing for maximum hydration absorption.',
    pairsWellWith: ['Hyaluronic Acid', 'Niacinamide', 'Centella', 'Peptides'],
    popularProducts: ['cosrx-snail-96-essence']
  },
  {
    slug: 'hyaluronic-acid',
    name: 'Hyaluronic Acid',
    koreanName: '히알루론산',
    description: 'A powerful humectant capable of holding up to 1,000 times its weight in water, pulling hydration into the skin layers for a dewy plump glow.',
    cosmeticBenefits: [
      'Instant surface and multi-layer moisture lock',
      'Plumps up dehydrated fine lines',
      'Softens rough skin texture',
      'Improves elasticity'
    ],
    bestFor: 'All skin types, especially dehydrated skin.',
    howToUse: 'Apply to damp skin and seal immediately with a light moisturiser or emulsion.',
    pairsWellWith: ['Niacinamide', 'Centella', 'Ceramides', 'Snail Mucin'],
    popularProducts: ['torriden-dive-in-serum', 'round-lab-dokdo-cleanser']
  }
];
