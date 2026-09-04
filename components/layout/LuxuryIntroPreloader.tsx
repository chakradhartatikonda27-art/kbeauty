'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function LuxuryIntroPreloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user already saw preloader in this session
    const hasSeen = sessionStorage.getItem('seoul_labs_preloader_seen');
    if (hasSeen) {
      setLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem('seoul_labs_preloader_seen', 'true');
    }, 1600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-50 bg-brand-obsidian text-white flex flex-col items-center justify-center p-6 select-none"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute w-96 h-96 bg-brand-rose/20 rounded-full filter blur-3xl pointer-events-none animate-pulse-slow" />

          <div className="relative z-10 text-center space-y-5 max-w-md">
            {/* Top Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/20 text-[10px] font-bold uppercase tracking-widest text-brand-rose"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
              <span>Seoul • London • 2026 AI-Native</span>
            </motion.div>

            {/* Brand Title */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-1"
            >
              <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white">
                SEOUL LABS
              </h1>
              <span className="text-[10px] tracking-[0.35em] uppercase text-brand-blush font-bold block">
                UNITED KINGDOM
              </span>
            </motion.div>

            {/* Rose Gold Animated Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="w-24 h-0.5 bg-gradient-to-r from-transparent via-brand-rose to-transparent mx-auto rounded-full"
            />

            {/* Sub-tagline */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xs text-white/70 tracking-wider font-medium uppercase"
            >
              Intelligent Korean Skincare Formulations
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
