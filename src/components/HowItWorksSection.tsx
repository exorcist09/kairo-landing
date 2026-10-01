import React from 'react';
import { ArrowRight, Bot, Sliders, Play, LineChart } from 'lucide-react';
import { KAIRO_SPEC } from '../data/kairoSpec';

export default function HowItWorksSection() {
  const stepIcons = [Bot, Sliders, Play, LineChart];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Header without subheading */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
          How Kairo Powers Autonomous Pipelines
        </h2>
      </div>

      {/* 4 Steps Grid with corrected clean cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
        {KAIRO_SPEC.howItWorks.map((step, idx) => {
          const Icon = stepIcons[idx % stepIcons.length];
          return (
            <div
              key={step.step}
              className="rounded-2xl border border-white/10 bg-[#18181c] p-6 sm:p-7 flex flex-col justify-between h-full hover:border-white/20 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-2xl font-extrabold text-zinc-500 group-hover:text-zinc-300 transition-colors">
                    {step.step}
                  </span>
                  <Icon className="w-5 h-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                </div>

                <h3 className="text-lg font-bold text-white mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                <span>Step {idx + 1} of 4</span>
                {idx < 3 && <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
