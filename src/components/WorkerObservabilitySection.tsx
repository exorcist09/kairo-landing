import React, { useState } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  Code2, 
  Play
} from 'lucide-react';
import { KAIRO_SPEC } from '../data/kairoSpec';

export default function WorkerObservabilitySection() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'payload'>('terminal');
  const [isCopied, setIsCopied] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    "[05:46:01.002] [DISPATCHER] Worker cluster ready. Concurrency: 64",
    "[05:46:01.018] [INBOUND] Event received: stripe.charge.captured (evt_3Mabc8812)",
    "[05:46:01.031] [ROUTER] Traversing DAG: 4 nodes, 3 directed edges, 0 deadlocks",
    "[05:46:01.054] [NODE_1: STRIPE] 200 OK | Latency: 12ms",
    "[05:46:01.248] [NODE_2: OPENAI] Prompt resolved | Latency: 184ms",
    "[05:46:01.278] [NODE_3: POSTGRES] UPSERT INTO orders committed | Latency: 28ms",
    "[05:46:01.296] [NODE_4: SLACK] Webhook dispatched to #sales-notifications | Latency: 16ms",
    "[05:46:01.300] [WORKER] Execution finished in 240ms. Status: COMPLETED_SUCCESS"
  ]);

  const mockPayload = {
    executionId: "exec_kairo_989f018a",
    status: "COMPLETED",
    totalDurationMs: 240,
    creditsDeducted: 7,
    steps: [
      { node: "Stripe Webhook", status: "SUCCESS", latencyMs: 12, cost: 1 },
      { node: "GPT-4 Reasoning", status: "SUCCESS", latencyMs: 184, cost: 3 },
      { node: "PostgreSQL Insert", status: "SUCCESS", latencyMs: 28, cost: 2 },
      { node: "Slack Alert", status: "SUCCESS", latencyMs: 16, cost: 1 }
    ]
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(mockPayload, null, 2));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSimulateEvent = () => {
    if (isStreaming) return;
    setIsStreaming(true);
    const newTimestamp = new Date().toISOString().slice(11, 23);
    const newLogs = [
      `[${newTimestamp}] [INBOUND] Event received: github.push (ref/heads/main)`,
      `[${newTimestamp}] [VAULT] Injected repository secret key (AES-256) in 1.1ms`,
      `[${newTimestamp}] [WORKER] Pipeline execution finished in 186ms. Status: COMPLETED_SUCCESS`
    ];

    setLogs(prev => [...newLogs, ...prev.slice(0, 6)]);
    setTimeout(() => {
      setIsStreaming(false);
    }, 700);
  };

  return (
    <section id="worker" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] glow-blue-radial pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full inline-block mb-3">
          Observability & Telemetry
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight leading-tight">
          Battle-Tested Execution Engine & Worker
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-2 font-normal">
          {KAIRO_SPEC.workerAndObservabilitySection.subtitle}
        </p>
      </div>

      {/* 4 Feature Pillars Compact Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {KAIRO_SPEC.workerAndObservabilitySection.features.map((feat, i) => (
          <div key={i} className="p-3.5 rounded-xl border border-white/8 bg-[#090d16] flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-2 inline-block">
                {feat.badge}
              </span>
              <h4 className="text-xs font-bold text-white mb-1 tracking-tight">
                {feat.title}
              </h4>
              <p className="text-[11px] text-slate-400 leading-normal line-clamp-2">
                {feat.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Compact Worker Console */}
      <div className="rounded-xl border border-white/10 bg-[#090d16] p-4 sm:p-5">
        {/* Top Bar with Tabs and Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/8">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('terminal')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeTab === 'terminal'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Logs</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('payload')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                activeTab === 'payload'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Payload</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              99.4% Uptime
            </span>

            <button
              type="button"
              onClick={handleSimulateEvent}
              disabled={isStreaming}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-all"
            >
              <Play className={`w-3 h-3 ${isStreaming ? 'animate-spin text-blue-400' : ''}`} />
              <span>Trigger Test</span>
            </button>
          </div>
        </div>

        {/* View Container */}
        <div className="mt-3 p-3.5 rounded-lg bg-[#060910] border border-white/5 font-mono text-xs overflow-hidden">
          {activeTab === 'terminal' ? (
            <div className="space-y-1 max-h-52 overflow-y-auto scrollbar-none text-[11px]">
              {logs.map((log, index) => {
                const isSuccess = log.includes('COMPLETED_SUCCESS') || log.includes('200 OK');
                const isNode = log.includes('[NODE_');
                return (
                  <div
                    key={index}
                    className={`leading-relaxed ${
                      isSuccess ? 'text-emerald-400 font-bold' : isNode ? 'text-cyan-300' : 'text-slate-300'
                    }`}
                  >
                    {log}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="relative">
              <button
                type="button"
                onClick={handleCopy}
                className="absolute top-1 right-1 flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] transition-colors"
              >
                {isCopied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
              <pre className="max-h-52 overflow-y-auto scrollbar-none text-slate-300 text-[10px] leading-relaxed">
                {JSON.stringify(mockPayload, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
