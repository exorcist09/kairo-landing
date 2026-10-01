import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { KAIRO_SPEC, AUTH_URLS } from '../data/kairoSpec';

interface NavbarProps {
  onOpenDocs: () => void;
}

export default function Navbar({ onOpenDocs }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#docs') {
      e.preventDefault();
      onOpenDocs();
      setMobileMenuOpen(false);
      return;
    }
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className={`pointer-events-auto w-full max-w-7xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-b-2xl rounded-t-none border-x border-b border-t-0 ${
          isScrolled
            ? 'bg-[#18181c]/90 backdrop-blur-xl border-white/10 shadow-[0_12px_24px_-10px_rgba(0,0,0,0.5)] py-2.5 px-4 sm:px-7'
            : 'bg-[#18181c]/75 backdrop-blur-md border-white/10 py-3 px-4 sm:px-8'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo & Version Badge */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg p-1"
          >
            <div className="flex items-center gap-2">
              <img src="/Kairo.png" alt="Kairo" className="h-6 w-auto object-contain" />
              <span className="text-[8px] font-mono font-medium px-1.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                {KAIRO_SPEC.navigation.logo.badge}
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {KAIRO_SPEC.navigation.navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white rounded-full hover:bg-white/5 transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-400"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              id="nav-signin-btn"
              href={AUTH_URLS.signIn}
              className="text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 rounded-full hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-blue-400"
            >
              Sign In
            </a>
            <a
              id="nav-start-free-btn"
              href={AUTH_URLS.signUp}
              className="group relative inline-flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all duration-300 active:scale-[0.98]"
            >
              <span>Start Free</span>
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </a>
          </div>

          {/* Mobile Hamburger Morph */}
          <button
            id="mobile-nav-toggle"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <div className="w-5 h-4 relative flex flex-col justify-between">
              <span
                className={`w-full h-0.5 bg-current rounded transition-all duration-300 ease-out ${
                  mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current rounded transition-all duration-300 ease-out ${
                  mobileMenuOpen ? 'opacity-0 translate-x-2' : ''
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current rounded transition-all duration-300 ease-out ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
            {KAIRO_SPEC.navigation.navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 mt-2 border-t border-white/10 flex flex-col gap-2">
              <a
                href={AUTH_URLS.signIn}
                className="w-full text-center py-2 text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                Sign In
              </a>
              <a
                href={AUTH_URLS.signUp}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition-all"
              >
                <span>Start Free</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
