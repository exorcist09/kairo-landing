import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Bot, 
  UserIcon
} from 'lucide-react';
import { KAIRO_SPEC } from '../data/kairoSpec';

export default function KaiAssistantSection() {
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeOutput, setActiveOutput] = useState(KAIRO_SPEC.kaiAssistantSpotlight.samplePrompts[0]);

  const handleSelectSample = (index: number) => {
    setSelectedPromptIndex(index);
    const sample = KAIRO_SPEC.kaiAssistantSpotlight.samplePrompts[index];
    simulateGeneration(sample);
  };

  const simulateGeneration = (sampleData: typeof KAIRO_SPEC.kaiAssistantSpotlight.samplePrompts[0]) => {
    setIsGenerating(true);
    setTimeout(() => {
      setActiveOutput(sampleData);
      setIsGenerating(false);
    }, 600);
  };

  return (
    <section id="kai-ai" className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Header without subheading */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
          {KAIRO_SPEC.kaiAssistantSpotlight.title}
        </h2>
      </div>

      {/* Interactive Prompt-to-Workflow Simulator (Clean Single-Card Container) */}
      <div className="rounded-2xl border border-white/10 bg-[#18181c] p-6 sm:p-8 lg:p-10 mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left side: Prompt input & presets */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider block mb-2">
                Sample Prompts 
              </span>
              <div className="space-y-2.5 mt-5">
                {KAIRO_SPEC.kaiAssistantSpotlight.samplePrompts.map((sample, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSample(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer ${
                      selectedPromptIndex === idx
                        ? 'border-zinc-500 bg-[#222226] text-white shadow-sm'
                        : 'border-white/5 bg-[#141416] text-zinc-400 hover:text-zinc-200 hover:border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400 mb-1">
                      <UserIcon className="w-3.5 h-3.5 text-zinc-400" />
                    </div>
                    "{sample.prompt}"
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right side: Live Synthesized DAG & Reasoning Terminal */}
          <div className="mt-8 lg:col-span-7 bg-[#141416] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                  Kai
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                Est. Run Cost: <strong className="text-zinc-200">{activeOutput.cost}</strong>
              </span>
            </div>

            {/* Synthesis Status / Outcome */}
            <div className="p-4 rounded-xl bg-[#1c1c20] border border-white/10">
              <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider block mb-1">
                Generated Architecture
              </span>
              <p className="text-xs text-white font-medium leading-relaxed">
                {isGenerating ? 'Kai is reasoning across schema dependencies and selecting optimal nodes...' : activeOutput.outcome}
              </p>
            </div>

            {/* Visual Nodes Preview Flow */}
            <div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block mb-3">
                Wired Pipeline Nodes ({activeOutput.nodes.length} Steps)
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {activeOutput.nodes.map((nodeName, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      isGenerating
                        ? 'border-white/5 bg-[#18181c]/50 opacity-50'
                        : 'border-white/10 bg-[#18181c] shadow-sm'
                    }`}
                  >
                    <span className="text-[9px] font-mono text-zinc-400 block mb-1">
                      STEP 0{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-white block truncate">
                      {nodeName}
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400 mt-1 inline-flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Ready
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Assistant Capabilities Cards without background on icons and no double-bezel */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {KAIRO_SPEC.kaiAssistantSpotlight.assistantCapabilities.map((cap, idx) => (
          <div
            key={idx}
            className="rounded-2xl border border-white/10 bg-[#18181c] hover:border-white/20 transition-all p-6 h-full flex flex-col justify-between group"
          >
            <div>
              <Sparkles className="w-5 h-5 text-zinc-400 mb-4" />
              <h4 className="text-base font-bold text-white tracking-tight mb-2">
                {cap.title}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                {cap.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
