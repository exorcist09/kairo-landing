import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CoreFeaturesSection from './components/CoreFeaturesSection';
import NodeCatalogSection from './components/NodeCatalogSection';
import KaiAssistantSection from './components/KaiAssistantSection';
import HowItWorksSection from './components/HowItWorksSection';
import PricingSection from './components/PricingSection';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import DocsPage from './components/DocsPage';

export default function App() {
  const [isDocsOpen, setIsDocsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#121214] text-zinc-100 font-sans selection:bg-zinc-800 selection:text-white antialiased overflow-x-hidden relative">
      {/* Floating Island Navigation */}
      <Navbar onOpenDocs={() => setIsDocsOpen(true)} />

      {/* Main Landing Sections */}
      <main>
        {/* 1. Hero Section */}
        <HeroSection />

        {/* 2. Core Features & Interactive Canvas Editor */}
        <CoreFeaturesSection />

        {/* 3. Node Catalog & Integrations Explorer */}
        <NodeCatalogSection />

        {/* 4. Kai AI Assistant Spotlight */}
        <KaiAssistantSection />

        {/* 5. How Kairo Powers Autonomous Pipelines */}
        <HowItWorksSection />

        {/* 6. Pricing Section */}
        <PricingSection />

        {/* 7. Frequently Asked Questions */}
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
