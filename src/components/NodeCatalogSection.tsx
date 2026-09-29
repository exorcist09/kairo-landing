import React, { useState } from 'react';
import { 
  FileText, 
  Globe, 
  Network, 
  Webhook, 
  PlayCircle, 
  Sparkles, 
  Brain, 
  Database, 
  Mail, 
  MessageSquare, 
  CheckSquare, 
  Terminal, 
  Search 
} from 'lucide-react';
import { KAIRO_SPEC, CatalogNode } from '../data/kairoSpec';

export default function NodeCatalogSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const iconMap: Record<string, React.ElementType> = {
    FileText,
    Globe,
    Network,
    Webhook,
    PlayCircle,
    Sparkles,
    Brain,
    Database,
    Mail,
    MessageSquare,
    CheckSquare,
    Terminal
  };

  const allNodes: (CatalogNode & { categoryTitle: string })[] = [];
  KAIRO_SPEC.nodeCatalog.categories.forEach(cat => {
    cat.nodes.forEach(n => {
      allNodes.push({ ...n, categoryTitle: cat.categoryTitle });
    });
  });

  const filteredNodes = allNodes.filter(node => {
    const matchesCategory = 
      activeCategory === 'all' || 
      (activeCategory === 'triggers' && node.categoryTitle.includes('Triggers')) ||
      (activeCategory === 'ai' && node.categoryTitle.includes('Intelligence')) ||
      (activeCategory === 'actions' && node.categoryTitle.includes('Actions'));

    const matchesSearch = 
      node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      node.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="integrations" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto relative">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] glow-blue-radial pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full inline-block mb-3">
          Node Ecosystem
        </span>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight leading-tight">
          {KAIRO_SPEC.nodeCatalog.sectionTitle}
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-2 font-normal">
          {KAIRO_SPEC.nodeCatalog.sectionSubtitle}
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/80 border border-white/8 backdrop-blur-md overflow-x-auto max-w-full">
          {[
            { id: 'all', label: 'All Nodes' },
            { id: 'triggers', label: 'Triggers' },
            { id: 'ai', label: 'AI' },
            { id: 'actions', label: 'Actions & DB' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === tab.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search nodes..."
            className="w-full bg-[#0a0f1d] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
          />
        </div>
      </div>

      {/* Nodes Compact Grid (No dialog, no inspect link, no free tags) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {filteredNodes.map(node => {
          const IconComp = iconMap[node.icon] || Sparkles;

          return (
            <div
              key={node.type}
              className="p-4 rounded-xl border border-white/8 bg-[#090d16] hover:border-white/15 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    {node.categoryTitle}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {node.cost} {node.costUnit}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <IconComp className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      {node.name}
                    </h4>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {node.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
