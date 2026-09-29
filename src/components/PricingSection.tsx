import React, { useState } from 'react';
import { Check, Sparkles, ArrowUpRight, Sliders, Gift } from 'lucide-react';
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
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[400px] glow-blue-radial pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full inline-block mb-3">
          Transparent Pay-As-You-Go
        </span>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
          {KAIRO_SPEC.pricingSection.title}
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-3 font-normal">
          {KAIRO_SPEC.pricingSection.subtitle}
        </p>
      </div>

      {/* Free Tier Above All Three */}
      <div className="double-bezel-outer mb-8">
        <div className="double-bezel-inner p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-blue-950/30 via-slate-900/60 to-emerald-950/30">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              <Gift className="w-3.5 h-3.5" />
              <span>100 WELCOME CREDITS INCLUDED</span>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
              <span>{freePlan.name}</span>
              <span className="text-emerald-400 font-mono text-base font-normal">({freePlan.priceDisplay} forever)</span>
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Build and execute pipelines without spending a rupee. Includes 100 free welcome credits on sign up.
            </p>
          </div>

          <a
            href={AUTH_URLS.signUp}
            className="group inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all whitespace-nowrap active:scale-[0.98]"
          >
            <span>{freePlan.ctaText}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Three Tiers in ONE Row: Small, Medium, Large */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {paidPlans.map((plan) => (
          <div
            key={plan.id}
            className={`double-bezel-outer group transition-all duration-300 ${
              plan.popular ? 'border-blue-500/50 shadow-[0_0_25px_-5px_rgba(37,99,235,0.35)]' : 'hover:border-blue-500/30'
            }`}
          >
            <div
              className={`double-bezel-inner p-6 sm:p-7 flex flex-col justify-between h-full ${
                plan.popular ? 'bg-[#0f172a]' : ''
              }`}
            >
              <div>
                {/* Popular Flag & Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-white font-mono uppercase tracking-wider">
                    {plan.name}
                  </span>
                  {plan.popular && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-500 text-white font-mono text-[9px] font-extrabold shadow-sm">
                      MOST POPULAR
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-400 leading-normal mb-5 min-h-[30px]">
                  {plan.tagline}
                </p>

                {/* Price Display */}
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
                      {plan.priceDisplay}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      / {plan.period}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-blue-400 font-semibold mt-1">
                    {plan.creditsDisplay}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 pt-3 border-t border-white/5 mb-6">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={AUTH_URLS.signUp}
                className={`w-full group flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold text-xs transition-all active:scale-[0.98] ${
                  plan.popular
                    ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                <span>{plan.ctaText}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Tier Dynamic Slider (like it is right now) */}
      <div className="double-bezel-outer mb-8">
        <div className="double-bezel-inner p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
                  Custom Tier • Dynamic Credit Slider
                </span>
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Scale as You Grow (100 to 10,000 Credits)
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Adjust credit capacity for high-volume database syncs, background AI reasoning loops, and multi-tenant pipelines. Volume discounted at ₹0.40 per credit.
              </p>

              {/* Slider Controller */}
              <div className="pt-2 space-y-2">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>100 Credits</span>
                  <span className="text-blue-400 font-bold">{customCredits.toLocaleString()} Credits</span>
                  <span>10,000 Credits</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="10000"
                  step="100"
                  value={customCredits}
                  onChange={(e) => setCustomCredits(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
              </div>
            </div>

            {/* Calculated Cost Box */}
            <div className="lg:col-span-5 bg-[#070b13] border border-white/8 rounded-2xl p-5 text-center space-y-3">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block">
                Calculated Total
              </span>
              <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
                ₹{calculateCustomPrice(customCredits).toLocaleString()}
              </div>
              <p className="text-[11px] font-mono text-emerald-400">
                ~₹0.40 per credit • Zero monthly retainers
              </p>
              <a
                href={AUTH_URLS.signUp}
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all active:scale-[0.98]"
              >
                <span>Configure & Buy Credits</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Provider & Security Note */}
      <div className="text-center font-mono text-xs text-slate-500 flex flex-wrap items-center justify-center gap-4">
        <span>Frictionless payments via <strong>Razorpay</strong>: Credit/Debit Cards, NetBanking</span>
      </div>
    </section>
  );
}
