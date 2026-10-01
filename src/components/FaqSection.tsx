import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { KAIRO_SPEC } from '../data/kairoSpec';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* Left Column: Heading without subheading */}
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight leading-tight">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Right Column: Questions Accordion with only upper border & smooth animation */}
        <div className="lg:col-span-8 border-b border-white/10">
          {KAIRO_SPEC.faq.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className="border-t border-white/10 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left py-5 sm:py-6 flex items-center justify-between gap-4 focus:outline-none cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-base sm:text-lg text-white group-hover:text-zinc-200 transition-colors tracking-tight">
                    {item.question}
                  </span>
                  <Plus
                    className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-300 ease-out group-hover:text-white ${
                      isOpen ? 'rotate-45 text-white' : ''
                    }`}
                  />
                </button>

                {/* Smooth CSS Grid Row expansion */}
                <div
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
