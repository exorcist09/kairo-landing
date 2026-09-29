import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CoreFeaturesSection from './components/CoreFeaturesSection';
import NodeCatalogSection from './components/NodeCatalogSection';
import KaiAssistantSection from './components/KaiAssistantSection';
import HowItWorksSection from './components/HowItWorksSection';
import PricingSection from './components/PricingSection';
import SecurityArchitectureSection from './components/SecurityArchitectureSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import DocsPage from './components/DocsPage';

export default function App() {
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 font-sans selection:bg-blue-600/30 selection:text-white antialiased overflow-x-hidden relative">
      {/* Dynamic Cyber-Technical Ambient Glow Orbs */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-600/10 via-transparent to-transparent pointer-events-none -z-10 blur-3xl" />
      <div className="fixed top-1/3 -left-40 w-[600px] h-[600px] bg-indigo-600/5 rounded-full pointer-events-none -z-10 blur-3xl" />
      <div className="fixed bottom-1/4 -right-40 w-[600px] h-[600px] bg-cyan-600/5 rounded-full pointer-events-none -z-10 blur-3xl" />

      {/* Floating Island Navigation */}
      <Navbar onOpenDocs={() => setIsDocsOpen(true)} />

      {/* Main Landing Sections */}
      <main>
        {/* 1. Hero with Announcement, Metrics & Live Preview Canvas */}
        <HeroSection />

        {/* 2. Core Features & Interactive Canvas Editor (#features, #editor) */}
        <CoreFeaturesSection />

        {/* 3. Node Catalog & Integrations Explorer (#integrations) */}
        <NodeCatalogSection />

        {/* 4. Kai AI Assistant Spotlight & Prompt Synthesizer (#kai-ai) */}
        <KaiAssistantSection />

        {/* 5. How Kairo Works (4 Steps) */}
        <HowItWorksSection />

        {/* 6. Credit-Based Pricing & Dynamic Slider (#pricing) */}
        <PricingSection />

        {/* 7. Security & Resilient Architecture Pillars */}
        <SecurityArchitectureSection />

        {/* 8. Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* Global Footer */}
      <Footer onOpenDocs={() => setIsDocsOpen(true)} />

      {/* Docs Modal Overlay */}
      {isDocsOpen && (
        <DocsPage onClose={() => setIsDocsOpen(false)} />
      )}
    </div>
  );
}
