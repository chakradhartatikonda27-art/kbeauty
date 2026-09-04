'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useShop } from '@/context/ShopContext';
import { ShieldCheck, Check, ArrowRight, Lock, CreditCard } from 'lucide-react';

export default function CheckoutPage() {
  const { cart, cartSubtotal, clearCart } = useShop();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isOrdered, setIsOrdered] = useState(false);

  const freeDeliveryThreshold = 35.00;
  const shippingCost = cartSubtotal >= freeDeliveryThreshold ? 0 : 3.95;
  const grandTotal = cartSubtotal + shippingCost;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOrdered(true);
    clearCart();
  };

  if (isOrdered) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-brand-obsidian">Order Confirmed!</h1>
        <p className="text-xs text-brand-charcoal-light">
          Thank you for shopping with SEOUL LABS UK. Order <strong>#UK-{Math.floor(100000 + Math.random() * 900000)}</strong> has been placed successfully and is preparing for dispatch.
        </p>
        <div className="bg-brand-ivory p-6 rounded-2xl border border-brand-grey-border text-xs text-left space-y-2">
          <div className="flex justify-between"><span>Delivery Method:</span><strong>UK Royal Mail Tracked 24</strong></div>
          <div className="flex justify-between"><span>Estimated Delivery:</span><strong>Tomorrow by 3 PM</strong></div>
          <div className="flex justify-between"><span>Total Paid (inc VAT):</span><strong>£{grandTotal.toFixed(2)}</strong></div>
        </div>
        <Link
          href="/"
          className="inline-block bg-brand-obsidian text-white text-xs font-semibold uppercase tracking-wider px-8 py-3.5 rounded-full hover:bg-brand-rose transition-colors"
        >
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form (Steps) */}
        <div className="lg:col-span-7 space-y-8">
          <div className="border-b border-brand-grey-border pb-4">
            <h1 className="font-serif text-2xl font-bold text-brand-obsidian">UK Express Checkout</h1>
            <p className="text-xs text-brand-charcoal-light">Complete your order with UK dispatch.</p>
          </div>

          <form onSubmit={handlePlaceOrder} className="space-y-6">
            {/* Step 1: Information */}
            <div className="bg-white p-6 rounded-2xl border border-brand-grey-border space-y-4">
              <h3 className="font-serif text-base font-bold text-brand-obsidian flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-rose text-white text-xs flex items-center justify-center font-bold">1</span>
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input required type="email" placeholder="Email Address *" className="text-xs p-3 bg-brand-ivory border border-brand-grey-border rounded-lg outline-none focus:border-brand-rose" />
                <input required type="tel" placeholder="UK Phone Number *" className="text-xs p-3 bg-brand-ivory border border-brand-grey-border rounded-lg outline-none focus:border-brand-rose" />
              </div>
            </div>

            {/* Step 2: Shipping */}
            <div className="bg-white p-6 rounded-2xl border border-brand-grey-border space-y-4">
              <h3 className="font-serif text-base font-bold text-brand-obsidian flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-rose text-white text-xs flex items-center justify-center font-bold">2</span>
                UK Shipping Address
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <input required type="text" placeholder="First Name *" className="text-xs p-3 bg-brand-ivory border border-brand-grey-border rounded-lg outline-none focus:border-brand-rose" />
                  <input required type="text" placeholder="Last Name *" className="text-xs p-3 bg-brand-ivory border border-brand-grey-border rounded-lg outline-none focus:border-brand-rose" />
                </div>
                <input required type="text" placeholder="Street Address *" className="text-xs p-3 bg-brand-ivory border border-brand-grey-border rounded-lg outline-none focus:border-brand-rose" />
                <div className="grid grid-cols-2 gap-3">
                  <input required type="text" placeholder="Town / City *" className="text-xs p-3 bg-brand-ivory border border-brand-grey-border rounded-lg outline-none focus:border-brand-rose" />
                  <input required type="text" placeholder="UK Postcode (e.g. SW1A 1AA) *" className="text-xs p-3 bg-brand-ivory border border-brand-grey-border rounded-lg outline-none focus:border-brand-rose uppercase" />
                </div>
              </div>
            </div>

            {/* Step 3: Payment */}
            <div className="bg-white p-6 rounded-2xl border border-brand-grey-border space-y-4">
              <h3 className="font-serif text-base font-bold text-brand-obsidian flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-brand-rose text-white text-xs flex items-center justify-center font-bold">3</span>
                Payment Options
              </h3>
              <div className="space-y-2 text-xs">
                <label className="flex items-center gap-3 p-3 bg-brand-ivory border border-brand-rose rounded-lg cursor-pointer font-semibold">
                  <input type="radio" name="payment" defaultChecked className="accent-brand-rose" />
                  <CreditCard className="w-4 h-4 text-brand-rose" />
                  <span>Credit / Debit Card (Visa, Mastercard, Amex)</span>
                </label>
                <label className="flex items-center gap-3 p-3 bg-brand-ivory border border-brand-grey-border rounded-lg cursor-pointer">
                  <input type="radio" name="payment" className="accent-brand-rose" />
                  <span>Klarna • Pay in 30 Days or 3 Installments</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-brand-obsidian text-white py-4 px-6 rounded-full font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-brand-rose transition-smooth shadow-float"
            >
              <Lock className="w-4 h-4 text-brand-rose" />
              <span>Pay £{grandTotal.toFixed(2)} & Place Order</span>
            </button>
          </form>
        </div>

        {/* Right Summary */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-brand-grey-border shadow-subtle h-fit space-y-4">
          <h3 className="font-serif text-lg font-bold text-brand-obsidian border-b border-brand-grey-border pb-3">Order Summary</h3>

          <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-3 text-xs border-b border-brand-grey-border/60 pb-3">
                <div className="relative w-14 h-14 rounded overflow-hidden bg-brand-ivory shrink-0 border border-brand-grey-border">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-brand-obsidian truncate">{product.name}</h5>
                  <span className="text-[11px] text-brand-charcoal-light">Qty: {quantity}</span>
                </div>
                <span className="font-bold">£{(product.price * quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="space-y-2 text-xs pt-2">
            <div className="flex justify-between"><span>Subtotal</span><span>£{cartSubtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>UK Shipping</span><span>{shippingCost === 0 ? 'FREE' : `£${shippingCost.toFixed(2)}`}</span></div>
            <div className="flex justify-between font-bold text-sm border-t border-brand-grey-border pt-2 text-brand-obsidian">
              <span>Total Due (inc VAT)</span>
              <span>£{grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
