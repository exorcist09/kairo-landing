import React from 'react';
import { 
  Workflow, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  CreditCard 
} from 'lucide-react';
import { KAIRO_SPEC } from '../data/kairoSpec';
import InteractiveCanvas from './InteractiveCanvas';

export default function CoreFeaturesSection() {
  const featureIcons = {
    'visual-canvas': Workflow,
    'kai-ai-copilot': Sparkles,
    'execution-engine': Zap,
    'credential-vault': ShieldCheck,
    'credit-billing': CreditCard
  };

  return (
    <section id="features" className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Background glow */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] glow-blue-radial pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
          Engineered for Visual Speed & Absolute Reliability
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-3 font-normal">
          Every layer of Kairo is built around developer productivity, sub-millisecond execution times, and zero mystery billing.
        </p>
      </div>

      {/* Interactive Canvas Editor Spotlight (anchored with #editor) */}
      <div id="editor" className="mb-10 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[11px] font-mono font-semibold mb-2">
              <Workflow className="w-3 h-3" />
              <span>REACT FLOW POWERED</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
              Interactive Drag-and-Drop Workflow Canvas
            </h3>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400 bg-[#090d16] border border-white/10 px-3 py-1.5 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Drag nodes • Live demo canvas</span>
          </div>
        </div>

        {/* Embedded Interactive Canvas */}
        <InteractiveCanvas />
      </div>

      {/* 4 Very Short Compact Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        {KAIRO_SPEC.coreFeatures.slice(1).map((feat) => {
          const IconComponent = featureIcons[feat.id as keyof typeof featureIcons] || Sparkles;

          return (
            <div
              key={feat.id}
              className="p-3.5 rounded-xl border border-white/8 bg-[#090d16] hover:border-blue-500/30 hover:bg-[#0c1220] transition-all flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate tracking-tight">
                    {feat.title}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400 truncate block">
                    {feat.badge}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
