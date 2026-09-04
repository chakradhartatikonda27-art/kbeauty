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
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 pb-safe"
    >
      <button
        onClick={openSkinQuiz}
        className="group relative flex items-center gap-2.5 sm:gap-3 bg-brand-obsidian/95 backdrop-blur-md text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-full border border-white/20 shadow-float hover:bg-brand-rose active:scale-95 transition-all duration-300 overflow-hidden touch-target"
        aria-label="Start AI Skin Scan"
      >
        {/* Subtle Ambient Pulse Ring */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-rose/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand-rose/30 border border-brand-rose/50 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          <Scan className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white animate-pulse" />
        </div>

        <div className="text-left">
          <div className="flex items-center gap-1 sm:gap-1.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-brand-blush group-hover:text-white">
            <Sparkles className="w-3 h-3 text-brand-rose group-hover:text-white animate-spin-slow" />
            <span>AI Skin Scan</span>
          </div>
          <span className="text-[11px] sm:text-xs font-bold text-white block -mt-0.5 whitespace-nowrap">
            96% Routine Match
          </span>
        </div>
      </button>
    </motion.div>
  );
}

