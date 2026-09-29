import React, { useState } from 'react';
import { 
  Sparkles, 
  Send, 
  ArrowRight, 
  Cpu, 
  CheckCircle2, 
  ShieldCheck, 
  DollarSign, 
  Bot, 
  Terminal,
  Zap,
  RefreshCw,
  GitBranch
} from 'lucide-react';
import { KAIRO_SPEC } from '../data/kairoSpec';

export default function KaiAssistantSection() {
  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeOutput, setActiveOutput] = useState(KAIRO_SPEC.kaiAssistantSpotlight.samplePrompts[0]);

  const handleSelectSample = (index: number) => {
    setSelectedPromptIndex(index);
    const sample = KAIRO_SPEC.kaiAssistantSpotlight.samplePrompts[index];
    setCustomPrompt(sample.prompt);
    simulateGeneration(sample);
  };

  const simulateGeneration = (sampleData: typeof KAIRO_SPEC.kaiAssistantSpotlight.samplePrompts[0]) => {
    setIsGenerating(true);
    setTimeout(() => {
      setActiveOutput(sampleData);
      setIsGenerating(false);
    }, 600);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      setActiveOutput({
        prompt: customPrompt,
        outcome: `Synthesized custom pipeline: Trigger → AI Parser → Action Handler with full DAG validation.`,
        nodes: ["Custom Trigger", "AI Reasoning (Gemini)", "Data Transformer", "Endpoint Dispatch"],
        cost: "3 credits / run"
      });
      setIsGenerating(false);
    }, 800);
  };

  return (
    <section id="kai-ai" className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Background AI Quantum Glow Mesh */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] glow-ai-radial pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
          {KAIRO_SPEC.kaiAssistantSpotlight.title}
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-4 font-normal max-w-2xl mx-auto">
          {KAIRO_SPEC.kaiAssistantSpotlight.description}
        </p>
      </div>

      {/* Interactive Prompt-to-Workflow Simulator (Double-Bezel Architecture) */}
      <div className="double-bezel-outer mb-10">
        <div className="double-bezel-inner p-6 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left side: Prompt input & presets */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-2">
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
                          ? 'border-cyan-500/50 bg-cyan-950/30 text-white shadow-[0_0_15px_-3px_rgba(34,211,238,0.2)]'
                          : 'border-white/5 bg-[#070b13] text-slate-400 hover:text-slate-200 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-mono text-[10px] text-cyan-400 mb-1">
                        <Bot className="w-3 h-3" />
                        <span>PROMPT PRESET 0{idx + 1}</span>
                      </div>
                      "{sample.prompt}"
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side: Live Synthesized DAG & Reasoning Terminal */}
            <div className="mt-8 lg:col-span-7 bg-[#070b13] border border-white/8 rounded-2xl p-5 sm:p-6 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/8">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                    Kai Neural Synthesis Engine
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">
                  Est. Run Cost: <strong className="text-emerald-400">{activeOutput.cost}</strong>
                </span>
              </div>

              {/* Synthesis Status / Outcome */}
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
                <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-1">
                  Generated Architecture
                </span>
                <p className="text-xs text-white font-medium leading-relaxed">
                  {isGenerating ? 'Kai is reasoning across schema dependencies and selecting optimal nodes...' : activeOutput.outcome}
                </p>
              </div>

              {/* Visual Nodes Preview Flow */}
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-3">
                  Wired Pipeline Nodes ({activeOutput.nodes.length} Steps)
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {activeOutput.nodes.map((nodeName, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isGenerating
                          ? 'border-white/5 bg-slate-900/40 opacity-50'
                          : 'border-white/10 bg-[#0c1220] shadow-sm'
                      }`}
                    >
                      <span className="text-[9px] font-mono text-cyan-400 block mb-1">
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
      </div>

      {/* Assistant Capabilities Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {KAIRO_SPEC.kaiAssistantSpotlight.assistantCapabilities.map((cap, idx) => (
          <div key={idx} className="double-bezel-outer">
            <div className="double-bezel-inner p-6 h-full flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-base font-bold text-white tracking-tight mb-2">
                  {cap.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {cap.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
