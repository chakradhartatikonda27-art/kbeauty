'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useShop } from '@/context/ShopContext';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types/ecommerce';
import { Sparkles, X, Send, Bot, User, Check, ShoppingBag, Info } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  recommendations?: {
    product: Product;
    whyRecommended: string;
  }[];
}

export default function AISkinAssistantDrawer() {
  const { isAIAssistantOpen, closeAIAssistant, addToCart } = useShop();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hi! I'm your Seoul Match AI skincare advisor. Tell me about your skin goals, concerns, or budget, and I'll find exact authentic Korean matches for you.",
      recommendations: [
        {
          product: PRODUCTS[0],
          whyRecommended: 'Viral organic SPF that hydrates dry barriers without leaving white cast or clogging pores.'
        },
        {
          product: PRODUCTS[1],
          whyRecommended: '96% snail filtrate essence to repair texture and restore skin glow.'
        }
      ]
    }
  ]);
  const [input, setInput] = useState('');

  if (!isAIAssistantOpen) return null;

  const conversationStarters = [
    'My skin is very dry',
    'I keep getting breakouts',
    'I want brighter glass skin',
    'I have £50 budget for a routine'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query
    };

    // Simulate AI response logic with real products
    const lower = query.toLowerCase();
    let recs: { product: Product; whyRecommended: string }[] = [];
    let responseText = "Here are curated Korean skincare matches suited to your goal:";

    if (lower.includes('dry')) {
      recs = [
        { product: PRODUCTS[5], whyRecommended: '5D Hyaluronic acid complex delivers 24-hour hydration layers.' },
        { product: PRODUCTS[6], whyRecommended: 'Nourishing Hanbang Dynasty cream with Ginseng and Rice lipids.' }
      ];
      responseText = "For dry & dehydrated skin, micro-layering humectants and lipid moisturizers is key:";
    } else if (lower.includes('breakout') || lower.includes('acne')) {
      recs = [
        { product: PRODUCTS[2], whyRecommended: '77% Heartleaf toner calms redness and controls facial sebum.' },
        { product: PRODUCTS[3], whyRecommended: '100% Madagascan Centella soothes inflamed active blemishes.' }
      ];
      responseText = "For acne-prone or reactive skin, non-stripping soothing formulas work best:";
    } else if (lower.includes('50') || lower.includes('budget')) {
      recs = [
        { product: PRODUCTS[4], whyRecommended: 'Gentle pH balancing cleanser (£14.00)' },
        { product: PRODUCTS[3], whyRecommended: '100% Centella soothing ampoule (£16.50)' },
        { product: PRODUCTS[0], whyRecommended: 'Rice + Probiotics daily sunscreen (£15.50)' }
      ];
      responseText = "Here is a complete 3-step daily routine under your £50 budget (£46.00 total):";
    } else {
      recs = [
        { product: PRODUCTS[1], whyRecommended: 'Multi-benefit snail essence for barrier repair and dewiness.' },
        { product: PRODUCTS[9], whyRecommended: '5% Niacinamide serum to fade dark spots and even tone.' }
      ];
    }

    const aiMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: responseText,
      recommendations: recs
    };

    setMessages(prev => [...prev, userMsg, aiMsg]);
    setInput('');
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[450px] bg-brand-ivory border-l border-brand-grey-border shadow-float flex flex-col animate-in slide-in-from-right duration-300">
      {/* Drawer Header */}
      <div className="p-4 border-b border-brand-grey-border bg-brand-obsidian text-white flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-brand-rose/20 border border-brand-rose flex items-center justify-center text-brand-rose">
            <Sparkles className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <h3 className="font-serif text-sm font-bold tracking-wide">Skin Match AI Assistant</h3>
            <p className="text-[10px] text-white/70">Cosmetic Routine Guidance</p>
          </div>
        </div>
        <button
          onClick={closeAIAssistant}
          className="p-1 rounded-full hover:bg-white/10 text-white/80 transition-colors"
          aria-label="Close Assistant"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Safety Disclaimer Banner */}
      <div className="bg-brand-blush/80 border-b border-brand-blush-border p-2.5 px-4 text-[11px] text-brand-charcoal flex items-center gap-2">
        <Info className="w-4 h-4 text-brand-rose shrink-0" />
        <span>AI recommendations are for cosmetic skincare guidance only and are not medical advice.</span>
      </div>

      {/* Conversation Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'ai' && (
              <div className="w-7 h-7 rounded-full bg-brand-obsidian text-white flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div className={`max-w-[85%] space-y-3 ${msg.sender === 'user' ? 'bg-brand-obsidian text-white p-3 rounded-2xl rounded-tr-none text-xs' : 'bg-white border border-brand-grey-border p-3.5 rounded-2xl rounded-tl-none shadow-subtle text-xs text-brand-charcoal'}`}>
              <p className="leading-relaxed">{msg.text}</p>

              {/* Catalog Product Recommendation Cards */}
              {msg.recommendations && msg.recommendations.length > 0 && (
                <div className="space-y-2 pt-1">
                  {msg.recommendations.map(({ product, whyRecommended }) => (
                    <div
                      key={product.id}
                      className="bg-brand-ivory p-2.5 rounded-xl border border-brand-grey-border space-y-2 text-left"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="relative w-12 h-12 rounded-md overflow-hidden bg-white shrink-0 border border-brand-grey-border">
                          <Image
                            src={product.images[0]}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] uppercase font-bold text-brand-rose block truncate">{product.brand}</span>
                          <h5 className="font-semibold text-xs text-brand-obsidian truncate">{product.name}</h5>
                          <span className="font-bold text-xs text-brand-obsidian">£{product.price.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="text-[11px] bg-white p-2 rounded border border-brand-grey-border/60 text-brand-charcoal-light">
                        <strong className="text-brand-obsidian">Recommended because: </strong>
                        {whyRecommended}
                      </div>

                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-brand-obsidian text-white text-[11px] font-semibold py-1.5 rounded-md hover:bg-brand-rose transition-colors flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3 h-3" />
                        <span>Add to Bag (£{product.price.toFixed(2)})</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-full bg-brand-rose text-white flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Starter Prompts */}
      <div className="p-3 bg-brand-grey border-t border-brand-grey-border flex gap-1.5 overflow-x-auto no-scrollbar">
        {conversationStarters.map((starter, i) => (
          <button
            key={i}
            onClick={() => handleSend(starter)}
            className="bg-white border border-brand-grey-border text-brand-charcoal text-[11px] px-3 py-1.5 rounded-full hover:border-brand-rose hover:text-brand-rose whitespace-nowrap transition-colors shadow-subtle shrink-0"
          >
            {starter}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <div className="p-3 bg-white border-t border-brand-grey-border flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask AI about products, routines..."
          className="flex-1 text-xs bg-brand-grey py-2.5 px-3 rounded-full outline-none text-brand-obsidian border border-brand-grey-border focus:border-brand-rose"
        />
        <button
          onClick={() => handleSend()}
          className="bg-brand-rose text-white p-2.5 rounded-full hover:bg-brand-rose-dark transition-colors"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
