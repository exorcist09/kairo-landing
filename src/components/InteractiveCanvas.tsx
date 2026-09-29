import React, { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Play,
  Search,
  Plus,
  Minus,
  Maximize2,
  Lock,
  Unlock,
  FileText,
  Zap,
  Globe,
  Network,
  Webhook,
  Terminal,
  Sparkles,
  Brain,
  Database,
  Mail,
  MessageSquare,
  Clock,
  Trash2,
} from "lucide-react";

interface CanvasNode {
  id: string;
  name: string;
  category: "trigger" | "execution";
  icon: React.ElementType;
  x: number;
  y: number;
  cost: number;
  status: "idle" | "running" | "success";
  placeholder?: string;
  hasTerminal?: boolean;
}

interface CanvasEdge {
  id: string;
  from: string;
  to: string;
  dashed?: boolean;
}

export default function InteractiveCanvas() {
  const [isExecuting, setIsExecuting] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Streamlined node list (reduced count for clean visual presentation)
  const [nodes, setNodes] = useState<CanvasNode[]>([
    {
      id: "node-text",
      name: "Text Node",
      category: "trigger",
      icon: FileText,
      x: 35,
      y: 40,
      cost: 0,
      status: "idle",
      placeholder: "Type text here...",
    },
    {
      id: "node-form-1",
      name: "Google Form",
      category: "trigger",
      icon: FileText,
      x: 180,
      y: 160,
      cost: 1,
      status: "idle",
    },
    {
      id: "node-ai-1",
      name: "AI",
      category: "execution",
      icon: Sparkles,
      x: 330,
      y: 160,
      cost: 3,
      status: "idle",
    },
    {
      id: "node-postgres",
      name: "PostgreSQL Database",
      category: "execution",
      icon: Database,
      x: 480,
      y: 220,
      cost: 2,
      status: "idle",
    },
    {
      id: "node-slack",
      name: "Slack Notification",
      category: "execution",
      icon: MessageSquare,
      x: 640,
      y: 220,
      cost: 1,
      status: "idle",
    },
    {
      id: "node-output",
      name: "Output Node",
      category: "execution",
      icon: Terminal,
      x: 770,
      y: 100,
      cost: 0,
      status: "idle",
      hasTerminal: true,
    },
  ]);

  const [edges] = useState<CanvasEdge[]>([
    { id: "e1", from: "node-text", to: "node-form-1", dashed: true },
    { id: "e2", from: "node-form-1", to: "node-ai-1" },
    { id: "e3", from: "node-ai-1", to: "node-postgres" },
    { id: "e4", from: "node-ai-1", to: "node-output", dashed: true },
    { id: "e5", from: "node-postgres", to: "node-slack" },
    { id: "e6", from: "node-slack", to: "node-output" },
  ]);

  const canvasRef = useRef<HTMLDivElement>(null);

  // Execute simulation
  const handleExecute = async () => {
    if (isExecuting) return;
    setIsExecuting(true);

    const seq = [
      "node-text",
      "node-form-1",
      "node-ai-1",
      "node-postgres",
      "node-slack",
      "node-output",
    ];

    setNodes((prev) => prev.map((n) => ({ ...n, status: "idle" })));

    for (let i = 0; i < seq.length; i++) {
      const currentId = seq[i];
      setNodes((prev) =>
        prev.map((n) => (n.id === currentId ? { ...n, status: "running" } : n))
      );
      await new Promise((r) => setTimeout(r, 280));
      setNodes((prev) =>
        prev.map((n) => (n.id === currentId ? { ...n, status: "success" } : n))
      );
    }

    await new Promise((r) => setTimeout(r, 600));
    setIsExecuting(false);
  };

  // Node Dragging
  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    if (isLocked) return;
    e.stopPropagation();
    setSelectedNodeId(nodeId);
    setDraggingNodeId(nodeId);

    const node = nodes.find((n) => n.id === nodeId);
    if (node) {
      setDragOffset({
        x: e.clientX - node.x,
        y: e.clientY - node.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingNodeId || isLocked) return;
    e.preventDefault();

    const canvasBounds = canvasRef.current?.getBoundingClientRect();
    if (canvasBounds) {
      let newX = e.clientX - dragOffset.x;
      let newY = e.clientY - dragOffset.y;

      newX = Math.max(10, Math.min(newX, canvasBounds.width - 160));
      newY = Math.max(10, Math.min(newY, canvasBounds.height - 130));

      setNodes((prev) =>
        prev.map((n) => (n.id === draggingNodeId ? { ...n, x: newX, y: newY } : n))
      );
    }
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
  };

  useEffect(() => {
    if (draggingNodeId) {
      window.addEventListener("mouseup", handleMouseUp);
      return () => window.removeEventListener("mouseup", handleMouseUp);
    }
  }, [draggingNodeId]);

  const sidebarItems = [
    {
      category: "TRIGGER NODES",
      items: [
        { name: "Text Node", icon: FileText, cost: 0, desc: "Enter or edit text directly on ..." },
        { name: "Manual Trigger", icon: Zap, cost: 0, desc: "Run workflow manually on de..." },
        { name: "Browser Trigger", icon: Globe, cost: 0, desc: "Enter browser URL to search..." },
        { name: "HTTP Request", icon: Network, cost: 0, desc: "Enter browser URL to trigger ..." },
        { name: "Webhook Trigger", icon: Webhook, cost: 1, desc: "Receive HTTP payload from e..." },
      ],
    },
    {
      category: "EXECUTION NODES",
      items: [
        { name: "Output Node", icon: Terminal, cost: 0, desc: "Capture and display executio..." },
        { name: "AI", icon: Sparkles, cost: 3, desc: "Generate text, extract data, o..." },
        { name: "Google Gemini", icon: Brain, cost: 2, desc: "Multi-modal reasoning and t..." },
        { name: "PostgreSQL Database", icon: Database, cost: 2, desc: "Execute SQL queries, inserts,..." },
      ],
    },
  ];

  const handleAddFromSidebar = (item: { name: string; icon: React.ElementType; cost: number }) => {
    const newId = `node-${Date.now().toString().slice(-4)}`;
    const newNode: CanvasNode = {
      id: newId,
      name: item.name,
      category: item.cost === 0 ? "trigger" : "execution",
      icon: item.icon,
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 150,
      cost: item.cost,
      status: "idle",
      hasTerminal: item.name === "Output Node",
    };
    setNodes((prev) => [...prev, newNode]);
    setSelectedNodeId(newId);
  };

  const getCurve = (fromNode: CanvasNode, toNode: CanvasNode) => {
    const fromWidth = fromNode.hasTerminal ? 140 : 130;
    const fromX = fromNode.x + fromWidth;
    const fromY = fromNode.y + 35;
    const toX = toNode.x;
    const toY = toNode.y + 35;

    const dx = Math.abs(toX - fromX) * 0.5;
    return `M ${fromX} ${fromY} C ${fromX + dx} ${fromY}, ${toX - dx} ${toY}, ${toX} ${toY}`;
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#070a11] overflow-hidden shadow-2xl text-slate-200 font-sans select-none">
      {/* Top Header Bar */}
      <div className="h-14 px-4 bg-[#090d16] border-b border-white/8 flex items-center justify-between">
        {/* Left: Back button */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
        </button>

        {/* Center: Editor Badge (Worker toggle removed as requested) */}
        <div className="flex items-center bg-[#070b13] px-3.5 py-1 rounded-full border border-white/8 text-xs font-semibold text-white">
          <span>Editor</span>
        </div>

        {/* Right: Execute button only (Save button removed as requested) */}
        <div className="flex items-center">
          <button
            type="button"
            onClick={handleExecute}
            disabled={isExecuting}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-sm shadow-blue-600/30 transition-all active:scale-[0.98] disabled:opacity-60 cursor-pointer"
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isExecuting ? "animate-spin" : ""}`} />
            <span>Execute demo</span>
          </button>
        </div>
      </div>

      {/* Main Body: Left Sidebar + Canvas Workspace */}
      <div className="flex h-[520px] relative">
        {/* Left Sidebar: Node Library */}
        <div className="w-56 shrink-0 bg-[#080c14] border-r border-white/8 p-3 flex flex-col justify-between overflow-y-auto scrollbar-none">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-white tracking-wider">
                <div className="flex items-center gap-1.5">
                  <span>NODE LIBRARY</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-white/10 text-slate-300 font-mono">
                    12
                  </span>
                </div>
                <Search className="w-3.5 h-3.5 text-slate-400 cursor-pointer hover:text-white" />
              </div>
              <p className="text-[10px] text-slate-500 mt-1">
                Drag to canvas or click to add
              </p>
            </div>

            {sidebarItems.map((cat) => (
              <div key={cat.category} className="space-y-1.5">
                <span className="text-[9px] font-mono font-bold text-slate-500 tracking-wider">
                  {cat.category}
                </span>

                <div className="space-y-1">
                  {cat.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.name}
                        type="button"
                        onClick={() => handleAddFromSidebar(item)}
                        className="w-full text-left p-2 rounded-xl border border-white/5 bg-[#0a0f1d] hover:border-blue-500/40 hover:bg-blue-950/20 transition-all flex items-start gap-2 group cursor-pointer"
                      >
                        <div className="w-6 h-6 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5 group-hover:scale-105">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[11px] font-bold text-white truncate">
                              {item.name}
                            </span>
                            <span className="text-[9px] font-mono px-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              {item.cost}
                            </span>
                          </div>
                          <p className="text-[9px] text-slate-500 truncate mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Right Canvas Area with black dot grid */}
        <div
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          className="flex-1 relative bg-[#070a11] bg-dot-matrix overflow-hidden"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: "top left" }}
        >
          {/* Connecting SVG Wires */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {edges.map((edge) => {
              const fromNode = nodes.find((n) => n.id === edge.from);
              const toNode = nodes.find((n) => n.id === edge.to);
              if (!fromNode || !toNode) return null;

              const isFlowing =
                isExecuting &&
                (fromNode.status === "running" || fromNode.status === "success");

              return (
                <g key={edge.id}>
                  <path
                    d={getCurve(fromNode, toNode)}
                    fill="none"
                    stroke="#05080f"
                    strokeWidth="5"
                  />
                  <path
                    d={getCurve(fromNode, toNode)}
                    fill="none"
                    stroke={isFlowing ? "#38bdf8" : "#2563eb"}
                    strokeWidth="2"
                    strokeDasharray={edge.dashed ? "4 4" : undefined}
                    className={isFlowing ? "animate-beam" : ""}
                  />
                </g>
              );
            })}
          </svg>

          {/* Nodes */}
          {nodes.map((node) => {
            const Icon = node.icon;
            const isSelected = selectedNodeId === node.id;
            const isRunning = node.status === "running";
            const isSuccess = node.status === "success";

            return (
              <div
                key={node.id}
                onMouseDown={(e) => handleMouseDown(e, node.id)}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  touchAction: "none",
                }}
                className={`absolute rounded-xl border transition-shadow cursor-grab active:cursor-grabbing z-20 ${
                  node.hasTerminal
                    ? "w-44 bg-[#090e1a] border-white/10"
                    : "w-36 bg-[#0a0f1d] border-white/10"
                } ${
                  isSelected
                    ? "ring-2 ring-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                    : "hover:border-white/20"
                } ${
                  isRunning
                    ? "border-cyan-400 bg-blue-950/40 shadow-[0_0_15px_rgba(56,189,248,0.3)]"
                    : isSuccess
                    ? "border-emerald-500/50"
                    : ""
                }`}
              >
                {/* Node Header */}
                <div className="p-2 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-4 h-4 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                      <Icon className="w-2.5 h-2.5" />
                    </div>
                    <span className="text-[11px] font-bold text-white truncate">
                      {node.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <Clock className="w-2.5 h-2.5" />
                    <Trash2
                      className="w-2.5 h-2.5 hover:text-red-400 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setNodes((prev) => prev.filter((n) => n.id !== node.id));
                      }}
                    />
                  </div>
                </div>

                {/* Node Inner Content */}
                <div className="p-2">
                  {node.placeholder ? (
                    <div className="p-1.5 bg-[#05080f] rounded border border-white/5 text-[10px] font-mono text-slate-400">
                      {node.placeholder}
                    </div>
                  ) : node.hasTerminal ? (
                    <div className="p-2 bg-[#05080f] rounded-lg border border-white/5 text-[10px] font-mono space-y-0.5">
                      <span className="text-slate-500 block text-[8px] uppercase">
                        Output Payload
                      </span>
                      <div className="text-emerald-400 font-bold">
                        {"{"} "status": 200 {"}"}
                      </div>
                      <div className="text-cyan-300">
                        {"{"} "result": "ready" {"}"}
                      </div>
                    </div>
                  ) : (
                    <div className="text-[10px] font-mono text-slate-400 flex items-center justify-between">
                      <span>Status:</span>
                      <span
                        className={`font-bold ${
                          isSuccess
                            ? "text-emerald-400"
                            : isRunning
                            ? "text-cyan-300 animate-pulse"
                            : "text-slate-500"
                        }`}
                      >
                        {isSuccess ? "200 OK" : isRunning ? "Running..." : "Idle"}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Floating Controls (Bottom Left): +, -, Fit, Lock */}
          <div className="absolute left-4 bottom-4 flex flex-col bg-[#090d16] border border-white/10 rounded-xl p-1 shadow-xl z-30">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(z + 0.1, 1.4))}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              title="Zoom In"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(z - 0.1, 0.7))}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              title="Zoom Out"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(1)}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              title="Fit View"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setIsLocked(!isLocked)}
              className={`p-1.5 rounded-lg transition-colors ${
                isLocked ? "text-amber-400 bg-amber-400/10" : "text-slate-400 hover:text-white hover:bg-white/5"
              }`}
              title={isLocked ? "Unlock Canvas" : "Lock Canvas"}
            >
              {isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Floating Minimap */}
          <div className="absolute right-4 bottom-4 w-32 h-20 bg-[#090d16]/90 border border-white/10 rounded-xl p-2 shadow-xl backdrop-blur-md pointer-events-none z-30">
            <div className="w-full h-full relative">
              {nodes.map((node) => (
                <div
                  key={`minimap-${node.id}`}
                  style={{
                    left: `${(node.x / 900) * 100}%`,
                    top: `${(node.y / 400) * 100}%`,
                  }}
                  className={`absolute w-2.5 h-1.5 rounded-xs ${
                    node.id === "node-output" ? "bg-blue-500 w-3 h-2" : "bg-blue-600/70"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
