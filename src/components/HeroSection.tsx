import React, { useState, useEffect } from "react";
import {
  Bot,
  ArrowRight,
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
      label: "Webhook",
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
      label: "AI Reasoning",
      desc: "Analyze customer sentiment",
      status: "Analyzed",
      cost: "3 credits",
      latency: "184ms",
      icon: Bot,
      color: "border-cyan-500/40 text-cyan-400 bg-cyan-500/10",
    },
    {
      id: "node-3",
      type: "POSTGRES",
      label: "Database Insert",
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
      label: "Inbox Alert",
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
      setActiveStep((prev) => (prev + 1) % (nodes.length + 1));
    }, 1400);

    return () => clearInterval(interval);
  }, [nodes.length]);

  return (
    <section className="relative isolate pt-44 pb-28 sm:pt-52 sm:pb-36 px-4 sm:px-6 max-w-6xl mx-auto flex flex-col items-center text-center mt-20">
      {/* Background Dots with smooth fading effect toward the editor */}
      <div
        className="hero-dot-pattern pointer-events-none absolute -top-44 left-1/2 -translate-x-1/2 w-screen h-[1150px] -z-10"
        aria-hidden="true"
      />

      {/* Main Headline without gradient */}
      <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white max-w-4xl leading-[1.08] mb-8">
        Build Complex Workflows with Visual Precision & AI
      </h1>

      {/* CTA Group */}
      <div className="mt-3 flex flex-col sm:flex-row items-center justify-center w-full max-w-md mx-auto mb-4 gap-2 ">
        <a
          id="hero-primary-cta"
          href={AUTH_URLS.signUp}
          className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-6 py-3 bg-blue-600 hover:bg-blue-500 border border-white/10 hover:border-zinc-500 text-white font-semibold text-sm transition-all duration-300 active:scale-[0.98] rounded-sm"
        >
          <span>{KAIRO_SPEC.heroSection.ctaGroup.primary.text}</span>
          <ArrowRight className="w-4 h-4 text-white group-hover:text-white transition-all group-hover:translate-x-1" />
        </a>

        <a
          id="hero-demo-cta"
          href="#editor"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById("editor");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#18181c] hover:bg-[#202026] border border-white/10 hover:border-zinc-500 text-zinc-200 font-semibold text-sm transition-all active:scale-[0.98] rounded-sm"
        >
          <Play className="w-4 h-4 text-zinc-400 fill-zinc-400/20" />
          <span>{KAIRO_SPEC.heroSection.ctaGroup.secondary.text}</span>
        </a>
      </div>

      <p className="text-[10px] text-zinc-500 font-mono mb-4">
        {KAIRO_SPEC.heroSection.ctaGroup.primary.note}
      </p>

      {/* Live Continuous Auto-Run Workflow Preview (Seamless blend with page, extra top margin) */}
      <div className=" w-full max-w-5xl text-left mt-10 sm:mt-14">
        {/* 4 Connected Floating Nodes */}
        <div className="mt-5 relative overflow-x-auto scrollbar-none py-4 px-2">
          <div className="relative min-w-[680px] grid grid-cols-4 gap-3 sm:gap-4 items-center">
            {nodes.map((node, index) => {
              const IconComponent = node.icon;
              const isNodeActive = activeStep === index;
              const isNodePast = activeStep > index;

              return (
                <div key={node.id} className="relative flex flex-col items-center mt-17">
                  {/* Node Card */}
                  <div
                    className={`w-full p-3.5 rounded-sm border transition-all duration-500 ${
                      isNodeActive
                        ? "border-zinc-400 bg-[#222226] scale-[1.02]"
                        : isNodePast
                        ? "border-white/10 bg-[#18181c]"
                        : "border-white/5 bg-[#18181c]/70 opacity-70"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span />
                      <span className="text-[10px] font-mono text-zinc-400">
                        {node.cost}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-1">
                      <IconComponent
                        className={`w-3.5 h-3.5 ${
                          isNodeActive ? "text-zinc-200" : "text-zinc-400"
                        }`}
                      />
                      <h4 className="text-xs font-bold text-white truncate font-sans">
                        {node.label}
                      </h4>
                    </div>

                    <p className="text-[11px] text-zinc-400 mb-2.5 truncate font-mono">
                      {node.desc}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[10px] font-mono">
                      {isNodePast ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold transition-all duration-300">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>{node.status}</span>
                        </span>
                      ) : isNodeActive ? (
                        <span className="inline-flex items-center gap-1.5 text-zinc-200 font-medium transition-all duration-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                          <span>Running...</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-zinc-600 transition-all duration-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                          <span>{node.status}</span>
                        </span>
                      )}
                      <span className={isNodePast ? "text-zinc-400" : "text-zinc-600"}>{node.latency}</span>
                    </div>
                  </div>

                  {/* Flow connecting beam */}
                  {index < nodes.length - 1 && (
                    <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                      <div
                        className={`w-4 h-0.5 transition-all duration-300 ${
                          isNodeActive || isNodePast
                            ? "bg-zinc-400"
                            : "bg-zinc-800"
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
