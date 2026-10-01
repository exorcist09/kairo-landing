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
      {/* Header without subheading */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
          {KAIRO_SPEC.nodeCatalog.sectionTitle}
        </h2>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#18181c] border border-white/10 overflow-x-auto max-w-full">
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
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search nodes..."
            className="w-full bg-[#18181c] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-400 font-mono"
          />
        </div>
      </div>

      {/* Nodes Compact Grid with dark gray icons without background */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {filteredNodes.map(node => {
          const IconComp = iconMap[node.icon] || Sparkles;

          return (
            <div
              key={node.type}
              className="p-4 sm:p-5 rounded-2xl border border-white/10 bg-[#18181c] hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    {node.categoryTitle}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    {node.cost} {node.costUnit}
                  </span>
                </div>

                <div className="flex items-center gap-2.5 mb-2">
                  <IconComp className="w-4 h-4 text-zinc-400 shrink-0" />
                  <h4 className="text-xs font-bold text-white">
                    {node.name}
                  </h4>
                </div>

                <p className="text-[11px] text-zinc-400 leading-relaxed font-normal">
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
