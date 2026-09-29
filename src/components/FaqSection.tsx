import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { KAIRO_SPEC } from '../data/kairoSpec';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 max-w-4xl mx-auto relative">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-3 font-normal">
          Clear answers about architecture, security, credits, and execution guarantees.
        </p>
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {KAIRO_SPEC.faq.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'border-blue-500/40 bg-[#0d1322] shadow-[0_0_20px_rgba(37,99,235,0.15)]'
                  : 'border-white/8 bg-[#0a0f1d] hover:border-white/15'
              }`}
            >
              <button
                type="button"
                onClick={() => toggleAccordion(idx)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-sm sm:text-base text-white tracking-tight">
                  {item.question}
                </span>
                <div
                  className={`w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-blue-600/20 border-blue-500/30 text-blue-400' : 'text-slate-400'
                  }`}
                >
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
