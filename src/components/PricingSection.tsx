import React, { useState } from 'react';
import { Check, ArrowRight, Gift } from 'lucide-react';
import { KAIRO_SPEC, AUTH_URLS } from '../data/kairoSpec';

export default function PricingSection() {
  const [customCredits, setCustomCredits] = useState<number>(2500);

  const calculateCustomPrice = (credits: number) => {
    return Math.round(credits * 0.40);
  };

  const freePlan = KAIRO_SPEC.pricingSection.plans[0];
  const paidPlans = KAIRO_SPEC.pricingSection.plans.slice(1, 4); // Small, Medium, Large

  return (
    <section id="pricing" className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Header without subheading */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight leading-tight">
          {KAIRO_SPEC.pricingSection.title}
        </h2>
      </div>

      {/* Free Tier Above All Three - Sharp Technical Box */}
      <div className="border border-white/10 bg-[#18181c] p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono font-medium">
            <Gift className="w-3.5 h-3.5 text-zinc-400" />
            <span>100 WELCOME CREDITS INCLUDED</span>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
            <span>{freePlan.name}</span>
            <span className="text-zinc-400 font-mono text-base font-normal">({freePlan.priceDisplay} forever)</span>
          </h3>
          <p className="text-xs text-zinc-400 max-w-xl font-normal">
            Build and execute pipelines without spending a rupee. Includes 100 free welcome credits on sign up.
          </p>
        </div>

        <a
          href={AUTH_URLS.signUp}
          className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-white text-zinc-950 font-bold text-xs hover:bg-zinc-200 transition-all whitespace-nowrap active:scale-[0.98]"
        >
          <span>{freePlan.ctaText}</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>

      {/* Three Tiers with gaps between them, middle card bigger, no rounded */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-center">
        {paidPlans.map((plan) => (
          <div
            key={plan.id}
            className={`border transition-all duration-300 flex flex-col justify-between ${
              plan.popular 
                ? 'border-white bg-[#222228] p-7 sm:p-8 shadow-2xl scale-[1.04] z-10' 
                : 'border-white/10 bg-[#18181c] hover:border-white/20 p-6 sm:p-7 h-full'
            }`}
          >
            <div>
              {/* Popular Flag & Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                  {plan.name}
                </span>
                {plan.popular && (
                  <span className="px-2.5 py-1 bg-white text-zinc-950 font-mono text-[10px] font-extrabold shadow-sm">
                    MOST POPULAR
                  </span>
                )}
              </div>

              <p className="text-[11px] text-zinc-400 leading-normal mb-5 min-h-[30px] font-normal">
                {plan.tagline}
              </p>

              {/* Price Display */}
              <div className="mb-4">
                <div className="flex items-baseline gap-1">
                  <span className={`${plan.popular ? 'text-4xl' : 'text-3xl'} font-extrabold text-white font-mono tracking-tight`}>
                    {plan.priceDisplay}
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">
                    / {plan.period}
                  </span>
                </div>
                <div className="text-xs font-mono text-zinc-300 font-medium mt-1">
                  {plan.creditsDisplay}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2 pt-3 border-t border-white/5 mb-6">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                    <Check className="w-3.5 h-3.5 text-zinc-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={AUTH_URLS.signUp}
              className={`w-full group flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-xs transition-all active:scale-[0.98] ${
                plan.popular
                  ? 'bg-blue-600 hover:bg-blue-500 text-white'
                  : 'bg-zinc-800 hover:bg-zinc-700 text-white'
              }`}
            >
              <span>{plan.ctaText}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        ))}
      </div>

      {/* Custom Tier Dynamic Slider - Sharp Container, No Rounded */}
      <div className="border border-white/10 bg-[#18181c] p-6 sm:p-8 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
            Custom
            </span>
            <h3 className="text-lg font-bold text-white tracking-tight mt-4">
              Scale as You Grow (100 to 10,000 Credits)
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-normal">
              Adjust credit capacity for high-volume database syncs, background AI reasoning loops, and multi-tenant pipelines. Volume discounted at ₹0.40 per credit.
            </p>

            {/* Slider Controller */}
            <div className="pt-2 space-y-2">
              <div className="flex justify-between text-xs font-mono text-zinc-400">
                <span>100 Credits</span>
                <span className="text-white font-bold">{customCredits.toLocaleString()} Credits</span>
                <span>10,000 Credits</span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={customCredits}
                onChange={(e) => setCustomCredits(Number(e.target.value))}
                className="w-full h-2 bg-zinc-800 appearance-none cursor-pointer accent-zinc-400"
              />
            </div>
          </div>

          {/* Calculated Cost Box */}
          <div className="lg:col-span-5 bg-[#141416] border border-white/10 p-5 text-center space-y-3 mt-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
              Calculated Total
            </span>
            <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
              ₹{calculateCustomPrice(customCredits).toLocaleString()}
            </div>
            <p className="text-[11px] font-mono text-zinc-400">
              ~₹0.40 per credit • Zero monthly retainers
            </p>
            <a
              href={AUTH_URLS.signUp}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-all active:scale-[0.98]"
            >
              <span>Buy Credits</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Payment Provider & Security Note */}
      <div className="text-center font-mono text-xs text-zinc-500 flex flex-wrap items-center justify-center gap-4">
        <span>Frictionless payments via <strong>Razorpay</strong>: Credit/Debit Cards, NetBanking</span>
      </div>
    </section>
  );
}
