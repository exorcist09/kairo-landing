import React, { useState, useEffect } from "react";
import {
  Sparkles,
  ArrowUpRight,
  Play,
  CheckCircle2,
  Webhook,
  Database,
  MessageSquare,
} from "lucide-react";
import { KAIRO_SPEC, AUTH_URLS } from "../data/kairoSpec";

export default function HeroSection() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const nodes = [
    {
      id: "node-1",
      type: "WEBHOOK",
      label: "Stripe Webhook",
      desc: "invoice.payment_succeeded",
      status: "200 OK",
      cost: "1 credit",
      latency: "12ms",
      icon: Webhook,
      color: "border-emerald-500/40 text-emerald-400 bg-emerald-500/10",
    },
    {
      id: "node-2",
      type: "OPENAI",
      label: "GPT-4 Reasoning",
      desc: "Analyze customer sentiment",
      status: "Analyzed",
      cost: "3 credits",
      latency: "184ms",
      icon: Sparkles,
      color: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10",
    },
    {
      id: "node-3",
      type: "POSTGRES",
      label: "PostgreSQL Insert",
      desc: "UPSERT INTO subscriptions",
      status: "Committed",
      cost: "2 credits",
      latency: "28ms",
      icon: Database,
      color: "border-blue-500/40 text-blue-400 bg-blue-500/10",
    },
    {
      id: "node-4",
      type: "SLACK",
      label: "Slack Alert",
      desc: "POST #sales-wins notification",
      status: "Delivered",
      cost: "1 credit",
      latency: "16ms",
      icon: MessageSquare,
      color: "border-purple-500/40 text-purple-400 bg-purple-500/10",
    },
  ];

  // Auto-running continuous simulation loop without any button
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % nodes.length);
    }, 1400);

    return () => clearInterval(interval);
  }, [nodes.length]);

  return (
    <section className="relative pt-44 pb-28 sm:pt-52 sm:pb-36 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center text-center mt-20">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[500px] glow-blue-radial pointer-events-none -z-10" />

      {/* Main Headline */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white max-w-4xl leading-[1.08] mb-6">
        Build Complex Workflows with{" "}
        <span className="text-3xl sm:text-5xl lg:text-6xl bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
          Visual Precision & AI
        </span>
      </h1>

      {/* Reduced Subheading */}
      <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
        Build, schedule, and orchestrate mission-critical background jobs with an intuitive visual canvas or autonomous AI prompts.
      </p>

      {/* CTA Group */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-md mx-auto mb-4 mt-6">
        <a
          id="hero-primary-cta"
          href={AUTH_URLS.signUp}
          className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 pl-6 pr-2 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-[0_0_25px_-5px_rgba(37,99,235,0.6)] hover:shadow-[0_0_35px_-2px_rgba(37,99,235,0.8)] transition-all duration-300 active:scale-[0.98]"
        >
          <span>{KAIRO_SPEC.heroSection.ctaGroup.primary.text}</span>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </a>

        <a
          id="hero-demo-cta"
          href="#editor"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById("editor");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900/90 hover:bg-slate-800/90 border border-slate-700/70 hover:border-slate-600 text-slate-200 font-semibold text-sm transition-all active:scale-[0.98]"
        >
          <Play className="w-4 h-4 text-blue-400 fill-blue-400/20" />
          <span>{KAIRO_SPEC.heroSection.ctaGroup.secondary.text}</span>
        </a>
      </div>

      <p className="text-xs text-slate-500 font-mono mb-4">
        {KAIRO_SPEC.heroSection.ctaGroup.primary.note}
      </p>

      {/* Live Continuous Auto-Run Workflow Preview (Seamless blend with page, extra top margin) */}
      <div className="w-full max-w-5xl text-left mt-10 sm:mt-14">
        {/* 4 Connected Floating Nodes */}
        <div className="relative overflow-x-auto scrollbar-none py-4 px-2">
          <div className="relative min-w-[680px] grid grid-cols-4 gap-3 sm:gap-4 items-center">
            {nodes.map((node, index) => {
              const IconComponent = node.icon;
              const isNodeActive = activeStep === index;
              const isNodePast = activeStep > index;

              return (
                <div key={node.id} className="relative flex flex-col items-center mt-17">
                  {/* Node Card */}
                  <div
                    className={`w-full p-3.5 rounded-xl border transition-all duration-500 ${
                      isNodeActive
                        ? "border-blue-400 bg-blue-950/40 shadow-[0_0_24px_rgba(37,99,235,0.35)] scale-[1.03]"
                        : isNodePast
                        ? "border-white/10 bg-slate-900/60 shadow-sm"
                        : "border-white/5 bg-slate-900/30 opacity-70"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span>
                       
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {node.cost}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-1">
                      <IconComponent
                        className={`w-3.5 h-3.5 ${
                          isNodeActive ? "text-cyan-400 animate-pulse" : "text-blue-400"
                        }`}
                      />
                      <h4 className="text-xs font-bold text-white truncate font-sans">
                        {node.label}
                      </h4>
                    </div>

                    <p className="text-[11px] text-slate-400 mb-2.5 truncate font-mono">
                      {node.desc}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono">
                      <span className="inline-flex items-center gap-1 text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        {node.status}
                      </span>
                      <span className="text-slate-400">{node.latency}</span>
                    </div>
                  </div>

                  {/* Flow connecting beam */}
                  {index < nodes.length - 1 && (
                    <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                      <div
                        className={`w-4 h-0.5 transition-all duration-300 ${
                          isNodeActive || isNodePast
                            ? "bg-blue-400 shadow-[0_0_8px_#38bdf8]"
                            : "bg-slate-800"
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
