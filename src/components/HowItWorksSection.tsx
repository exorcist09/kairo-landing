import React from 'react';
import { ArrowRight, Bot, Sliders, Play, LineChart } from 'lucide-react';
import { KAIRO_SPEC } from '../data/kairoSpec';

export default function HowItWorksSection() {
  const stepIcons = [Bot, Sliders, Play, LineChart];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 w-[450px] h-[450px] glow-blue-radial pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full inline-block mb-4">
          Lifecycle & Flow
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
          How Kairo Powers Autonomous Pipelines
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-4 font-normal max-w-2xl mx-auto">
          From first spark of an idea to high-frequency production executions in four straightforward steps.
        </p>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {KAIRO_SPEC.howItWorks.map((step, idx) => {
          const Icon = stepIcons[idx % stepIcons.length];
          return (
            <div key={step.step} className="double-bezel-outer group hover:border-blue-500/30 transition-all duration-300">
              <div className="double-bezel-inner p-6 sm:p-7 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-2xl font-extrabold text-blue-500/80 group-hover:text-blue-400 transition-colors">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Step {idx + 1} of 4</span>
                  {idx < 3 && <ArrowRight className="w-3.5 h-3.5 text-blue-400/60" />}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
