import React from 'react';
import { Lock, KeyRound, BookOpen, Layers, ShieldCheck, Database, Check } from 'lucide-react';
import { KAIRO_SPEC } from '../data/kairoSpec';

export default function SecurityArchitectureSection() {
  const pillarIcons = [Lock, KeyRound, BookOpen, Layers];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] glow-blue-radial pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full inline-block mb-4">
          Vault & Infrastructure
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
          {KAIRO_SPEC.securityAndArchitecture.title}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-4 font-normal max-w-2xl mx-auto">
          Built for zero-leak credential isolation and high-concurrency event throughput.
        </p>
      </div>

      {/* 4 Pillars Grid (Double-Bezel) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {KAIRO_SPEC.securityAndArchitecture.pillars.map((pillar, idx) => {
          const Icon = pillarIcons[idx % pillarIcons.length];
          return (
            <div key={pillar.title} className="double-bezel-outer group hover:border-emerald-500/30 transition-all duration-300">
              <div className="double-bezel-inner p-6 sm:p-7 flex flex-col justify-between h-full">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Standard</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
