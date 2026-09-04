'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { PRODUCTS } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import { User, Sparkles, Heart, Award, Calendar, Check, ArrowRight, RefreshCw, Gift, Copy } from 'lucide-react';

export default function AccountPage() {
  const { userProfile, wishlist, savedRoutine, addToCart, openSkinQuiz } = useShop();
  const [activeTab, setActiveTab] = useState<'profile' | 'routine' | 'tracker' | 'wishlist' | 'rewards'>('profile');
  const [copiedReferral, setCopiedReferral] = useState(false);

  const [streakDays, setStreakDays] = useState([true, true, true, true, true, false, false]);

  const toggleStreakDay = (idx: number) => {
    setStreakDays(prev => prev.map((d, i) => (i === idx ? !d : d)));
  };

  const copyReferralLink = () => {
    navigator.clipboard?.writeText?.('https://seoul-labs.co.uk/invite/EMMA-SEOUL5');
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-8">
      {/* Account Welcome Header */}
      <div className="bg-gradient-to-r from-brand-blush/80 via-brand-ivory to-white p-6 md:p-8 rounded-3xl border border-brand-blush-border flex flex-col md:flex-row items-center justify-between gap-6 shadow-subtle">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-brand-obsidian text-white flex items-center justify-center font-serif text-xl font-bold">
            E
          </div>
          <div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-brand-obsidian">Hello, Emma</h1>
            <p className="text-xs text-brand-charcoal-light">K-Beauty Club Member • <strong>Radiance Tier</strong> (450 Points)</p>
          </div>
        </div>

        <button
          onClick={openSkinQuiz}
          className="bg-brand-obsidian text-white text-xs font-semibold uppercase tracking-wider px-5 py-2.5 rounded-full hover:bg-brand-rose transition-colors flex items-center gap-1.5"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-rose" />
          <span>Retake AI Skin Quiz</span>
        </button>
      </div>

      {/* Account Navigation Tabs */}
      <div className="flex gap-2 border-b border-brand-grey-border overflow-x-auto no-scrollbar pb-1 text-xs font-bold uppercase tracking-wider">
        {[
          { id: 'profile', label: 'My Skin Profile', icon: User },
          { id: 'routine', label: 'My Saved Routine', icon: Sparkles },
          { id: 'tracker', label: 'Routine Tracker', icon: Calendar },
          { id: 'wishlist', label: `Wishlist (${wishlist.length})`, icon: Heart },
          { id: 'rewards', label: 'K-Beauty Club', icon: Award }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3 px-4 border-b-2 transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-brand-rose text-brand-rose'
                : 'border-transparent text-brand-charcoal-light hover:text-brand-obsidian'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* TAB 1: MY SKIN PROFILE */}
      {activeTab === 'profile' && (
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-brand-grey-border space-y-6 shadow-subtle">
          <div className="flex items-center justify-between border-b border-brand-grey-border pb-4">
            <div>
              <h2 className="font-serif text-xl font-bold text-brand-obsidian">Your Diagnostic Profile</h2>
              <p className="text-xs text-brand-charcoal-light">Used by AI Search and PDP Compatibility Score Generator.</p>
            </div>
            <button onClick={openSkinQuiz} className="text-xs font-bold uppercase text-brand-rose hover:underline">
              Update Profile
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
            <div className="bg-brand-ivory p-4 rounded-xl border border-brand-grey-border">
              <span className="text-[10px] uppercase font-bold text-brand-rose">Skin Type</span>
              <h4 className="font-serif text-lg font-bold text-brand-obsidian mt-1 capitalize">
                {userProfile?.skinType || 'Dry / Dehydrated'}
              </h4>
            </div>

            <div className="bg-brand-ivory p-4 rounded-xl border border-brand-grey-border">
              <span className="text-[10px] uppercase font-bold text-brand-rose">Primary Concern</span>
              <h4 className="font-serif text-lg font-bold text-brand-obsidian mt-1 capitalize">
                {userProfile?.primaryConcerns[0] || 'Dryness & Barrier'}
              </h4>
            </div>

            <div className="bg-brand-ivory p-4 rounded-xl border border-brand-grey-border">
              <span className="text-[10px] uppercase font-bold text-brand-rose">Sensitivity</span>
              <h4 className="font-serif text-lg font-bold text-brand-obsidian mt-1 capitalize">
                {userProfile?.sensitivity || 'Moderate'}
              </h4>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MY SAVED ROUTINE */}
      {activeTab === 'routine' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-brand-grey-border flex items-center justify-between">
            <div>
              <h2 className="font-serif text-xl font-bold text-brand-obsidian">Saved AM & PM Regimen</h2>
              <p className="text-xs text-brand-charcoal-light">Replenish your full routine in one click.</p>
            </div>
            <button
              onClick={() => PRODUCTS.slice(0, 4).forEach(p => addToCart(p))}
              className="bg-brand-obsidian text-white text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-brand-rose transition-colors"
            >
              Reorder All Products
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PRODUCTS.slice(0, 4).map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ROUTINE TRACKER */}
      {activeTab === 'tracker' && (
        <div className="bg-white p-6 md:p-8 rounded-2xl border border-brand-grey-border space-y-6 shadow-subtle">
          <div>
            <h2 className="font-serif text-xl font-bold text-brand-obsidian">7-Day Consistency Tracker</h2>
            <p className="text-xs text-brand-charcoal-light">Check off your AM & PM skincare routines to earn K-Beauty Club reward points.</p>
          </div>

          <div className="grid grid-cols-7 gap-3 text-center">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
              <button
                key={day}
                onClick={() => toggleStreakDay(idx)}
                className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                  streakDays[idx]
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-900 shadow-subtle'
                    : 'border-brand-grey-border bg-brand-ivory text-brand-charcoal-light'
                }`}
              >
                <span className="text-xs font-bold">{day}</span>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${streakDays[idx] ? 'bg-emerald-600 text-white' : 'bg-brand-grey-border text-brand-charcoal-light'}`}>
                  {streakDays[idx] ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : idx + 1}
                </div>
              </button>
            ))}
          </div>

          <div className="p-4 bg-brand-blush/60 rounded-xl border border-brand-blush-border flex items-center justify-between text-xs text-brand-charcoal">
            <span>🔥 Current Streak: <strong>5 Days Active</strong></span>
            <span className="font-bold text-brand-rose">+50 Loyalty Points Earned</span>
          </div>
        </div>
      )}

      {/* TAB 4: WISHLIST */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          <h2 className="font-serif text-xl font-bold text-brand-obsidian">Your Saved Favourites</h2>
          {wishlist.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-brand-grey-border">
              <p className="text-xs text-brand-charcoal-light">Your future favourites live here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PRODUCTS.filter(p => wishlist.includes(p.id)).map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 5: K-BEAUTY CLUB REWARDS */}
      {activeTab === 'rewards' && (
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-brand-obsidian to-brand-charcoal text-white p-8 rounded-3xl space-y-4 shadow-float">
            <div className="flex justify-between items-center">
              <span className="badge-editorial bg-brand-rose text-white">Radiance Tier</span>
              <span className="text-xs text-white/70">450 / 500 Points to Icon Tier</span>
            </div>
            <h2 className="font-serif text-3xl font-bold">450 Loyalty Points</h2>
            <p className="text-xs text-white/80">Available Vouchers: <strong>£10.00 Off Voucher Ready</strong></p>
          </div>

          {/* Referral Generator */}
          <div className="bg-white p-6 rounded-2xl border border-brand-grey-border space-y-4 shadow-subtle">
            <div>
              <h3 className="font-serif text-lg font-bold text-brand-obsidian">Give £5, Get £5 Referral</h3>
              <p className="text-xs text-brand-charcoal-light">Share your invite link with friends. They get £5 off their first order over £30, and you earn £5 credit.</p>
            </div>

            <div className="flex items-center gap-2 max-w-md">
              <input
                type="text"
                readOnly
                value="https://seoul-labs.co.uk/invite/EMMA-SEOUL5"
                className="bg-brand-ivory text-xs p-3 border border-brand-grey-border rounded-lg outline-none flex-1 font-mono text-brand-obsidian"
              />
              <button
                onClick={copyReferralLink}
                className="bg-brand-obsidian text-white text-xs font-semibold px-4 py-3 rounded-lg hover:bg-brand-rose transition-colors flex items-center gap-1.5"
              >
                {copiedReferral ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedReferral ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
