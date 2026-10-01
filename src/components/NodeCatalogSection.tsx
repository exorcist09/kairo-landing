import React, { useState } from 'react';
import { 
  FileText, 
  Globe, 
  Network, 
  Webhook, 
  PlayCircle, 
  Bot, 
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
    Bot,
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
      {/* Header without subheading, reduced size */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight leading-tight">
          {KAIRO_SPEC.nodeCatalog.sectionTitle}
        </h2>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        {/* Category Tabs with border right and left only */}
        <div className="flex items-center border-l border-r border-white/20 divide-x divide-white/10 overflow-x-auto max-w-full">
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
              className={`px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === tab.id
                  ? 'text-white font-bold'
                  : 'text-zinc-600 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search Input without border */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search nodes..."
            className="w-full border-b border-zinc-600 pl-8 pr-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none font-mono"
          />
        </div>
      </div>

      {/* Seamless Continuous Cross-Section Grid without gaps and without hashes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10 bg-[#18181c] rounded-none">
        {filteredNodes.map(node => {
          const IconComp = iconMap[node.icon] || Bot;

          return (
            <div
              key={node.type}
              className="relative p-5 sm:p-6 border-r border-b border-white/10 hover:bg-[#202026] transition-colors flex flex-col justify-between group"
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
