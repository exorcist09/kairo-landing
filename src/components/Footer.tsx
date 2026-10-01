import React from 'react';
import { Github } from 'lucide-react';
import { KAIRO_SPEC } from '../data/kairoSpec';

interface FooterProps {
  onOpenDocs: () => void;
}

export default function Footer({ onOpenDocs }: FooterProps) {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#docs') {
      e.preventDefault();
      onOpenDocs();
      return;
    }
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-white/10 bg-[#0e0e10] relative pt-16 pb-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Logo & Tagline */}
          <div className="md:col-span-2 space-y-3">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2 group focus:outline-none"
            >
              <img src="/Kairo.png" alt="Kairo" className="h-7 w-auto object-contain brightness-0 invert" />
            </a>

            <p className="text-xs text-white leading-relaxed max-w-sm">
              {KAIRO_SPEC.footer.tagline} Build, schedule, and orchestrate mission-critical background jobs with visual node graphs or Kai natural language prompts.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://github.com/exorcist09/kairo-v2"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-zinc-300 transition-colors p-1 inline-flex items-center gap-2"
                aria-label="GitHub Repository"
              >
                <Github className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">
              Product
            </h4>
            <ul className="space-y-2">
              {KAIRO_SPEC.footer.links.product.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleLinkClick(e, item.href)}
                    className="text-xs text-white hover:text-zinc-300 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-2.5">
            <h4 className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">
              Legal & Trust
            </h4>
            <ul className="space-y-2">
              {KAIRO_SPEC.footer.links.legal.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`${item.label}: All credentials in Kairo are isolated with AES-256 GCM encryption and tenant isolation.`);
                    }}
                    className="text-xs text-white hover:text-zinc-300 transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright line with white text */}
        <div className="flex items-center justify-start pt-6 gap-3 text-xs font-mono text-white text-right">
          <span>{KAIRO_SPEC.footer.copyright}</span>
        </div>
      </div>

      {/* Giant watermark */}
      <div className="absolute left-200 -bottom-15 sm:-bottom-16 inset-x-0 overflow-hidden select-none pointer-events-none text-center opacity-10">
        <span className="font-display font-extrabold text-[16vw] tracking-tighter text-white block leading-none">
          KAIRO
        </span>
      </div>
    </footer>
  );
}
