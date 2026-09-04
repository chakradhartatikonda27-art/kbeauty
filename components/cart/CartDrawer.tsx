'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { aiCheckCartRoutine } from '@/lib/ai/service';
import { X, Trash2, Plus, Minus, Gift, ArrowRight, AlertTriangle, Sparkles, ShieldCheck } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    cartSubtotal
  } = useShop();

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 35.00;
  const deliveryProgress = Math.min((cartSubtotal / freeDeliveryThreshold) * 100, 100);
  const remainingForFreeDelivery = freeDeliveryThreshold - cartSubtotal;

  // Run Smart Cart AI Routine Checker
  const cartProducts = cart.map(item => item.product);
  const routineCheck = aiCheckCartRoutine(cartProducts);

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[460px] bg-brand-ivory border-l border-brand-grey-border shadow-float flex flex-col animate-in slide-in-from-right duration-300">
      {/* Cart Header */}
      <div className="p-4 border-b border-brand-grey-border bg-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="font-serif text-lg font-bold text-brand-obsidian">Your Shopping Bag</h3>
          <span className="bg-brand-grey text-brand-charcoal text-xs font-semibold px-2 py-0.5 rounded-full">
            {cart.reduce((sum, item) => sum + item.quantity, 0)} items
          </span>
        </div>
        <button
          onClick={closeCart}
          className="p-1.5 rounded-full hover:bg-brand-grey text-brand-charcoal transition-colors"
          aria-label="Close cart"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Dynamic Free UK Shipping & Rewards Meter */}
      <div className="bg-brand-blush/60 p-4 border-b border-brand-blush-border space-y-2">
        <div className="flex justify-between text-xs font-semibold text-brand-obsidian">
          {remainingForFreeDelivery > 0 ? (
            <span>
              Add <strong className="text-brand-rose">£{remainingForFreeDelivery.toFixed(2)}</strong> more for <strong>FREE UK Delivery</strong>
            </span>
          ) : (
            <span className="text-emerald-700 flex items-center gap-1 font-bold">
              <Gift className="w-4 h-4 text-emerald-600 animate-bounce" /> FREE UK Delivery Unlocked! + Free K-Sample 🎁
            </span>
          )}
        </div>
        <div className="w-full bg-white rounded-full h-2 overflow-hidden border border-brand-blush-border">
          <div
            className="bg-gradient-to-r from-brand-rose to-brand-rose-dark h-full transition-all duration-500 rounded-full"
            style={{ width: `${deliveryProgress}%` }}
          />
        </div>
      </div>

      {/* Smart Cart AI Routine Checker Notification */}
      {(routineCheck.warnings.length > 0 || routineCheck.suggestions.length > 0) && (
        <div className="bg-white p-3 px-4 border-b border-brand-grey-border space-y-2">
          {routineCheck.warnings.map((warn, i) => (
            <div key={i} className="text-xs text-amber-800 bg-amber-50 p-2 rounded border border-amber-200 flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{warn}</span>
            </div>
          ))}
          {routineCheck.suggestions.map((sug, i) => (
            <div key={i} className="text-xs text-brand-obsidian bg-brand-grey p-2 rounded border border-brand-grey-border flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-brand-rose shrink-0 mt-0.5" />
              <span>{sug}</span>
            </div>
          ))}
        </div>
      )}

      {/* Cart Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-brand-grey flex items-center justify-center text-brand-charcoal-light">
              <Gift className="w-8 h-8 stroke-[1.25]" />
            </div>
            <h4 className="font-serif text-lg font-bold text-brand-obsidian">Your routine starts here.</h4>
            <p className="text-xs text-brand-charcoal-light max-w-xs">
              Discover authentic Korean skincare matched to your exact skin goals.
            </p>
            <button
              onClick={closeCart}
              className="bg-brand-obsidian text-white text-xs font-semibold uppercase tracking-wider px-6 py-3 rounded-full hover:bg-brand-rose transition-colors shadow-subtle"
            >
              Explore Catalogue
            </button>
          </div>
        ) : (
          cart.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="bg-white p-3.5 rounded-xl border border-brand-grey-border flex gap-3.5 shadow-subtle"
            >
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-brand-ivory shrink-0 border border-brand-grey-border">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-brand-rose block">{product.brand}</span>
                    <h5 className="font-semibold text-xs text-brand-obsidian truncate">{product.name}</h5>
                    <span className="text-[11px] text-brand-charcoal-light">{product.size}</span>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-brand-charcoal-light hover:text-red-500 transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center border border-brand-grey-border rounded-full bg-brand-grey">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1 px-2 text-brand-charcoal hover:text-brand-rose transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-xs font-bold px-2">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-1 px-2 text-brand-charcoal hover:text-brand-rose transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-xs text-brand-obsidian">
                      £{(product.price * quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Cart Summary & Checkout Footer */}
      {cart.length > 0 && (
        <div className="p-4 border-t border-brand-grey-border bg-white space-y-3">
          <div className="space-y-1.5 text-xs text-brand-charcoal-light">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-brand-obsidian">£{cartSubtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>UK Standard Shipping</span>
              <span className="font-semibold text-emerald-700">
                {cartSubtotal >= freeDeliveryThreshold ? 'FREE' : '£3.95'}
              </span>
            </div>
            <div className="flex justify-between pt-1 border-t border-brand-grey-border font-bold text-sm text-brand-obsidian">
              <span>Estimated Total (inc VAT)</span>
              <span>£{(cartSubtotal + (cartSubtotal >= freeDeliveryThreshold ? 0 : 3.95)).toFixed(2)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            onClick={closeCart}
            className="w-full bg-brand-obsidian text-white py-3.5 px-4 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-brand-rose transition-smooth shadow-subtle"
          >
            <span>Proceed to Secure Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center justify-center gap-4 text-[10px] text-brand-charcoal-light pt-1">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> UK Tax Included</span>
            <span>•</span>
            <span>Klarna & Clearpay Available</span>
          </div>
        </div>
      )}
    </div>
  );
}
