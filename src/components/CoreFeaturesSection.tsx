import React from "react";
import { Workflow } from "lucide-react";
import InteractiveCanvas from "./InteractiveCanvas";

export default function CoreFeaturesSection() {
  return (
    <section
      id="features"
      className="py-20 sm:py-28 px-4 sm:px-6 max-w-6xl mx-auto relative"
    >
      {/* Header without subheading */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight leading-tight">
          Engineered for Visual Speed & Absolute Reliability
        </h2>
      </div>

      {/* Interactive Canvas Editor Spotlight (anchored with #editor) */}
      <div id="editor" className="mb-10 pt-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-4 gap-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400 text-[11px] font-mono font-semibold mb-2">
              <Workflow className="w-3 h-3 text-zinc-400" />
              <span>REACT FLOW POWERED</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight">
              Interactive Drag-and-Drop Workflow Canvas
            </h3>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 bg-[#18181c] border border-white/10 px-3 py-1.5 rounded-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Drag nodes • Live demo canvas</span>
          </div>
        </div>

        {/* Embedded Interactive Canvas */}
        <InteractiveCanvas />
      </div>
    </section>
  );
}
