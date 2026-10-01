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
  Bot,
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

  // Streamlined node list (spaced for large canvas presentation)
  const [nodes, setNodes] = useState<CanvasNode[]>([
    {
      id: "node-text",
      name: "Text Node",
      category: "trigger",
      icon: FileText,
      x: 60,
      y: 70,
      cost: 0,
      status: "idle",
      placeholder: "Type text here...",
    },
    {
      id: "node-form-1",
      name: "Google Form",
      category: "trigger",
      icon: FileText,
      x: 250,
      y: 220,
      cost: 1,
      status: "idle",
    },
    {
      id: "node-ai-1",
      name: "AI Reasoning",
      category: "execution",
      icon: Bot,
      x: 470,
      y: 220,
      cost: 3,
      status: "idle",
    },
    {
      id: "node-postgres",
      name: "PostgreSQL Database",
      category: "execution",
      icon: Database,
      x: 690,
      y: 330,
      cost: 2,
      status: "idle",
    },
    {
      id: "node-slack",
      name: "Slack Alert",
      category: "execution",
      icon: MessageSquare,
      x: 910,
      y: 330,
      cost: 1,
      status: "idle",
    },
    {
      id: "node-output",
      name: "Output Node",
      category: "execution",
      icon: Terminal,
      x: 1090,
      y: 160,
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

    // Reset status
    setNodes((prev) => prev.map((n) => ({ ...n, status: "idle" })));

    for (let i = 0; i < seq.length; i++) {
      const id = seq[i];
      setNodes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, status: "running" } : n))
      );
      await new Promise((r) => setTimeout(r, 600));
      setNodes((prev) =>
        prev.map((n) => (n.id === id ? { ...n, status: "success" } : n))
      );
    }

    setIsExecuting(false);
  };

  // Node Dragging Logic
  const handleMouseDown = (e: React.MouseEvent, nodeId: string) => {
    if (isLocked) return;
    setSelectedNodeId(nodeId);
    setDraggingNodeId(nodeId);

    const node = nodes.find((n) => n.id === nodeId);
    if (!node || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    setDragOffset({
      x: (e.clientX - rect.left) / zoomLevel - node.x,
      y: (e.clientY - rect.top) / zoomLevel - node.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingNodeId || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const newX = (e.clientX - rect.left) / zoomLevel - dragOffset.x;
    const newY = (e.clientY - rect.top) / zoomLevel - dragOffset.y;

    setNodes((prev) =>
      prev.map((n) =>
        n.id === draggingNodeId
          ? {
              ...n,
              x: Math.max(10, Math.min(newX, 1400)),
              y: Math.max(10, Math.min(newY, 650)),
            }
          : n
      )
    );
  };

  const handleMouseUp = () => {
    setDraggingNodeId(null);
  };

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    return () => window.removeEventListener("mouseup", handleMouseUp);
  }, []);

  // Left sidebar items
  const sidebarItems = [
    {
      category: "TRIGGER NODES",
      items: [
        { name: "Text Node", icon: FileText, cost: 0, desc: "Send plain text / string..." },
        { name: "Google Form", icon: FileText, cost: 1, desc: "Extract responses on..." },
        { name: "Webhook Trigger", icon: Webhook, cost: 1, desc: "Receive HTTP payload from e..." },
      ],
    },
    {
      category: "EXECUTION NODES",
      items: [
        { name: "Output Node", icon: Terminal, cost: 0, desc: "Capture and display executio..." },
        { name: "AI Reasoning", icon: Bot, cost: 3, desc: "Generate text, extract data, o..." },
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
      category: "execution",
      icon: item.icon,
      x: 150 + Math.random() * 200,
      y: 100 + Math.random() * 200,
      cost: item.cost,
      status: "idle",
      hasTerminal: item.name === "Output Node",
    };
    setNodes((prev) => [...prev, newNode]);
    setSelectedNodeId(newId);
  };

  const getCurve = (fromNode: CanvasNode, toNode: CanvasNode) => {
    const fromWidth = fromNode.hasTerminal ? 180 : 160;
    const fromX = fromNode.x + fromWidth;
    const fromY = fromNode.y + 35;
    const toX = toNode.x;
    const toY = toNode.y + 35;

    const dx = Math.abs(toX - fromX) * 0.5;
    return `M ${fromX} ${fromY} C ${fromX + dx} ${fromY}, ${toX - dx} ${toY}, ${toX} ${toY}`;
  };

  return (
    <div className="w-full rounded-xl border border-white/10 bg-[#18181c] overflow-hidden shadow-2xl text-zinc-200 font-sans select-none">
      {/* Top Header Bar */}
      <div className="h-14 px-4 bg-[#141416] border-b border-white/10 flex items-center justify-between">
        {/* Left spacer */}
        <div className="w-24" />

        {/* Center: Editor Badge */}
        <div className="flex items-center  px-3.5 py-1 rounded-lg border border-white/10 text-xs font-semibold text-white">
          <span>Editor</span>
        </div>

        {/* Right: Execute Button */}
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
      <div className="flex h-[560px] sm:h-[600px] lg:h-[630px] relative">
        {/* Left Sidebar: Node Library */}
        <div className="w-64 shrink-0 bg-[#141416] border-r border-white/10 p-3.5 flex flex-col justify-between overflow-y-auto scrollbar-none">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-bold text-white tracking-wider">
                <div className="flex items-center gap-1.5">
                  <span>NODE LIBRARY</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/10 text-zinc-300 font-mono">
                    12
                  </span>
                </div>
                <Search className="w-3.5 h-3.5 text-zinc-400 cursor-pointer hover:text-white" />
              </div>
              <p className="text-[10px] text-zinc-500 mt-1">
                Drag to canvas or click to add
              </p>
            </div>

            {sidebarItems.map((cat) => (
              <div key={cat.category} className="space-y-1.5">
                <span className="text-[9px] font-mono font-bold text-zinc-500 tracking-wider uppercase">
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
                        className="w-full text-left p-2.5 rounded-lg border border-white/5 bg-[#18181c] hover:border-zinc-500 hover:bg-[#202026] transition-all flex items-start gap-2.5 group cursor-pointer"
                      >
                        <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-zinc-300 shrink-0 mt-0.5 group-hover:text-white">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-[11px] font-bold text-white truncate">
                              {item.name}
                            </span>
                            <span className="text-[9px] font-mono px-1 rounded bg-white/5 text-zinc-400 border border-white/10">
                              {item.cost}
                            </span>
                          </div>
                          <p className="text-[10px] text-zinc-500 truncate mt-0.5 font-normal">
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

        {/* Right Canvas Area with grey dot grid */}
        <div
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          className="flex-1 relative bg-[#121214] bg-dot-matrix overflow-hidden"
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
                    stroke="#18181c"
                    strokeWidth="5"
                  />
                  <path
                    d={getCurve(fromNode, toNode)}
                    fill="none"
                    stroke={isFlowing ? "#ffffff" : "#3f3f46"}
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
                className={`absolute rounded-lg border transition-all cursor-grab active:cursor-grabbing z-20 ${
                  node.hasTerminal
                    ? "w-48 bg-[#18181c] border-white/10"
                    : "w-40 bg-[#18181c] border-white/10"
                } ${
                  isSelected
                    ? "border-white ring-1 ring-white/40 shadow-2xl bg-[#222228]"
                    : "hover:border-zinc-400"
                } ${
                  isRunning
                    ? "border-zinc-300 bg-[#222228] shadow-[0_0_15px_rgba(255,255,255,0.08)]"
                    : isSuccess
                    ? "border-white/30 bg-[#1e1e24]"
                    : ""
                }`}
              >
                {/* Node Header */}
                <div className="p-2.5 border-b border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div className="w-5 h-5 rounded bg-white/5 border border-white/10 text-zinc-300 flex items-center justify-center shrink-0">
                      <Icon className="w-3 h-3" />
                    </div>
                    <span className="text-[11px] font-bold text-white truncate">
                      {node.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-[10px] text-zinc-500">
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
                <div className="p-2.5">
                  {node.placeholder ? (
                    <div className="p-1.5 bg-[#121214] rounded border border-white/10 text-[10px] font-mono text-zinc-400">
                      {node.placeholder}
                    </div>
                  ) : node.hasTerminal ? (
                    <div className="p-2 bg-[#121214] rounded border border-white/10 text-[10px] font-mono space-y-0.5">
                      <span className="text-zinc-500 block text-[8px] uppercase">
                        Output Payload
                      </span>
                      <div className="text-white font-bold">
                        {"{"} "status": 200 {"}"}
                      </div>
                      <div className="text-zinc-400">
                        {"{"} "result": "ready" {"}"}
                      </div>
                    </div>
                  ) : (
                    <div className="text-[10px] font-mono text-zinc-400 flex items-center justify-between">
                      <span>Status:</span>
                      <span
                        className={`font-bold ${
                          isSuccess
                            ? "text-white"
                            : isRunning
                            ? "text-zinc-300 animate-pulse"
                            : "text-zinc-500"
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
          <div className="absolute left-4 bottom-4 flex flex-col bg-[#18181c] border border-white/10 rounded-lg p-1 shadow-xl z-30">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(z + 0.1, 1.4))}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded transition-colors"
              title="Zoom In"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(z - 0.1, 0.7))}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded transition-colors"
              title="Zoom Out"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(1)}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-white/5 rounded transition-colors"
              title="Fit View"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setIsLocked(!isLocked)}
              className={`p-1.5 rounded transition-colors ${
                isLocked ? "text-white bg-white/10" : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
              title={isLocked ? "Unlock Canvas" : "Lock Canvas"}
            >
              {isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Floating Minimap */}
          <div className="absolute right-4 bottom-4 w-36 h-24 bg-[#18181c]/90 border border-white/10 rounded-lg p-2 shadow-xl backdrop-blur-md pointer-events-none z-30">
            <div className="w-full h-full relative">
              {nodes.map((node) => (
                <div
                  key={`minimap-${node.id}`}
                  style={{
                    left: `${(node.x / 1300) * 100}%`,
                    top: `${(node.y / 600) * 100}%`,
                  }}
                  className={`absolute w-3 h-2 rounded-xs ${
                    node.id === "node-output" ? "bg-white" : "bg-zinc-600"
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
