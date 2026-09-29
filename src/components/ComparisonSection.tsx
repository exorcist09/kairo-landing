import React from 'react';
import { XCircle, CheckCircle2, Shield, Eye, DollarSign, Workflow } from 'lucide-react';
import { KAIRO_SPEC } from '../data/kairoSpec';

export default function ComparisonSection() {
  const icons = [Workflow, Eye, DollarSign, Shield];

  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto relative">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] glow-blue-radial pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full inline-block mb-4">
          Architectural Edge
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
          {KAIRO_SPEC.comparisonSection.title}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-4 font-normal max-w-2xl mx-auto">
          {KAIRO_SPEC.comparisonSection.subtitle}
        </p>
      </div>

      {/* Comparison Grid with Double-Bezel cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {KAIRO_SPEC.comparisonSection.comparison.map((item, index) => {
          const Icon = icons[index % icons.length];
          return (
            <div key={item.aspect} className="double-bezel-outer group hover:border-blue-500/30 transition-all duration-300">
              <div className="double-bezel-inner p-6 sm:p-7 flex flex-col justify-between h-full">
                {/* Header */}
                <div className="flex items-center gap-3 pb-5 border-b border-white/8">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Aspect {index + 1}</span>
                    <h3 className="text-lg font-bold text-white tracking-tight">{item.aspect}</h3>
                  </div>
                </div>

                {/* Content Comparison */}
                <div className="space-y-4 pt-5">
                  {/* Traditional */}
                  <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-400 block mb-1">
                        Traditional Tools / Raw Scripts
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {item.traditional}
                      </p>
                    </div>
                  </div>

                  {/* Kairo */}
                  <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/30 shadow-[0_0_15px_-3px_rgba(37,99,235,0.15)] flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                        With Kairo
                      </span>
                      <p className="text-xs text-white leading-relaxed font-medium">
                        {item.kairo}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
