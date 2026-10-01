import React, { useState, useEffect } from "react";
import { Play, Pause, Maximize2, RotateCcw } from "lucide-react";
import InteractiveCanvas from "./InteractiveCanvas";

export default function CoreFeaturesSection() {
  const [activeTab, setActiveTab] = useState<"editor" | "video">("editor");
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(24);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 300);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <section
      id="features"
      className="py-20 sm:py-28 px-4 sm:px-6 max-w-[1520px] mx-auto relative"
    >
      {/* Header without subheading, strictly one line */}
      <div className="text-center max-w-5xl mx-auto mb-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight leading-tight sm:whitespace-nowrap">
          Engineered for Visual Speed & Absolute Reliability
        </h2>
      </div>

      {/* Selector Tab: Editor vs Video */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center border-l border-r border-white/20 divide-x divide-white/10">
          <button
            type="button"
            onClick={() => setActiveTab("editor")}
            className={`px-6 py-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "editor"
                ? "text-white font-bold bg-white/10"
                : "text-zinc-500 hover:text-white hover:bg-white/5"
            }`}
          >
            Editor
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("video")}
            className={`px-6 py-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "video"
                ? "text-white font-bold bg-white/10"
                : "text-zinc-500 hover:text-white hover:bg-white/5"
            }`}
          >
            Video
          </button>
        </div>
      </div>

      {activeTab === "editor" ? (
        /* Interactive Canvas Editor Spotlight (anchored with #editor) */
        <div id="editor" className="mb-10 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-2 gap-3 mx-1.5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5  bg-white/5 border border-white/10 text-zinc-400 text-[11px] font-mono font-semibold mb-2">
                <span>REACT FLOW POWERED</span>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 bg-[#18181c] border border-white/10 px-2.5 py-0.5 ">
              <span>Interactive Drag-and-Drop Workflow Canvas</span>
            </div>
          </div>

          {/* Embedded Interactive Canvas */}
          <InteractiveCanvas />
        </div>
      ) : (
        /* Video Walkthrough Showcase */
        <div id="video-demo" className="mb-10 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-2 gap-3 mx-1.5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/5 border border-white/10 text-zinc-400 text-[11px] font-mono font-semibold mb-2">
                <span>PRODUCT WALKTHROUGH</span>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 bg-[#18181c] border border-white/10 px-2.5 py-0.5">
              <span>90-Second Visual Automation Tour</span>
            </div>
          </div>

          {/* Video Player Container */}
          <div className="w-full rounded-xl border border-white/10 bg-[#18181c] overflow-hidden shadow-2xl relative select-none">
            {/* Top Bar */}
            <div className="h-14 px-4 bg-[#141416] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex items-center px-3.5 py-1 text-xs font-semibold text-white/40 font-mono">
                  <span>Video Demo</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-emerald-400 animate-pulse" : "bg-zinc-600"}`} />
                <span>{isPlaying ? "Playing Walkthrough" : "Ready to Watch"}</span>
              </div>
            </div>

            {/* Video Canvas Stage */}
            <div className="relative h-[560px] sm:h-[600px] lg:h-[630px] bg-[#121214] bg-dot-matrix flex items-center justify-center overflow-hidden">
              {/* Simulated Workflow Visual Backdrop */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none px-6">
                <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-4 rounded-lg bg-[#18181c] border border-white/10 space-y-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Trigger Event</span>
                    <div className="text-sm font-bold text-white">Stripe Webhook</div>
                    <div className="text-xs text-zinc-400 font-mono">invoice.payment_succeeded</div>
                  </div>
                  <div className="p-4 rounded-lg bg-[#18181c] border border-white/10 space-y-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">AI Reasoning</span>
                    <div className="text-sm font-bold text-white">GPT-4 Cognitive Eval</div>
                    <div className="text-xs text-zinc-400 font-mono">Extract structured churn risk</div>
                  </div>
                  <div className="p-4 rounded-lg bg-[#18181c] border border-white/10 space-y-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Action Dispatch</span>
                    <div className="text-sm font-bold text-white">PostgreSQL Upsert</div>
                    <div className="text-xs text-zinc-400 font-mono">Committed in 14ms</div>
                  </div>
                </div>
              </div>

              {/* Big Center Play / Pause Button */}
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="relative z-20 group p-6 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 backdrop-blur-md shadow-2xl transition-all active:scale-95 cursor-pointer flex items-center justify-center"
                aria-label={isPlaying ? "Pause Video" : "Play Video"}
              >
                {isPlaying ? (
                  <Pause className="w-10 h-10 text-white fill-white" />
                ) : (
                  <Play className="w-10 h-10 text-white fill-white translate-x-0.5" />
                )}
              </button>

              {/* Bottom Video Controls Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#141416] via-[#141416]/80 to-transparent z-20 flex flex-col gap-2">
                {/* Progress Bar */}
                <div
                  className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden cursor-pointer"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    setProgress(Math.round((clickX / rect.width) * 100));
                  }}
                >
                  <div
                    className="h-full bg-white transition-all duration-150"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Control Icons & Time */}
                <div className="flex items-center justify-between text-xs font-mono text-zinc-300">
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="hover:text-white cursor-pointer"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setProgress(0)}
                      className="hover:text-white cursor-pointer"
                      title="Restart"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                    <span>
                      {Math.floor((progress * 0.9) / 60)}:
                      {String(Math.floor((progress * 0.9) % 60)).padStart(2, "0")} / 1:30
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-400">
                      1080p 60FPS
                    </span>
                    <Maximize2 className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
