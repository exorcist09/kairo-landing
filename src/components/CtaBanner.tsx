import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { AUTH_URLS } from '../data/kairoSpec';

export default function CtaBanner() {
  return (
    <section className="py-20 px-4 sm:px-6 max-w-5xl mx-auto relative text-center">
      {/* Background glow & mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] glow-blue-radial pointer-events-none -z-10" />

      <div className="double-bezel-outer">
        <div className="double-bezel-inner p-8 sm:p-12 lg:p-16 relative overflow-hidden bg-gradient-to-b from-[#0e1627] to-[#070b13]">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 bg-grid-tech opacity-30 pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>START IN UNDER 60 SECONDS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
              Ready to Build Autonomous Pipelines with Visual Precision?
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Experience the power of Kai AI and the drag-and-drop React Flow canvas. 100 free credits included with instant registration.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                id="footer-cta-register"
                href={AUTH_URLS.signUp}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 pl-6 pr-2 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-[0_0_25px_-5px_rgba(37,99,235,0.7)] hover:shadow-[0_0_35px_-2px_rgba(37,99,235,0.9)] transition-all duration-300 active:scale-[0.98]"
              >
                <span>Start Building Free</span>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </a>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                100 Free Credits Included
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                No Credit Card Required
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                AES-256 Encrypted Vault
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
