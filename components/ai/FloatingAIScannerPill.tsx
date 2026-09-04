'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Scan } from 'lucide-react';
import { useShop } from '@/context/ShopContext';

export default function FloatingAIScannerPill() {
  const { openSkinQuiz } = useShop();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="fixed bottom-6 right-6 z-30 hidden sm:block"
    >
      <button
        onClick={openSkinQuiz}
        className="group relative flex items-center gap-3 bg-brand-obsidian/90 backdrop-blur-md text-white px-5 py-3 rounded-full border border-white/20 shadow-float hover:bg-brand-rose transition-all duration-300 overflow-hidden"
      >
        {/* Subtle Ambient Pulse Ring */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-rose/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="w-8 h-8 rounded-full bg-brand-rose/30 border border-brand-rose/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          <Scan className="w-4 h-4 text-white animate-pulse" />
        </div>

        <div className="text-left">
          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-blush group-hover:text-white">
            <Sparkles className="w-3 h-3 text-brand-rose group-hover:text-white animate-spin-slow" />
            <span>AI Skin Scan</span>
          </div>
          <span className="text-xs font-bold text-white block -mt-0.5">
            96% Routine Match
          </span>
        </div>
      </button>
    </motion.div>
  );
}
