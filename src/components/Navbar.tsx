import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Phone, Menu, X, ArrowRight, MessageSquare } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { SMS_PHONE, SMS_PHONE_FORMATTED, SMS_URL } from '../utils/constants';

interface NavbarProps {
  onOpenQuote: () => void;
  onOpenCallback: () => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenQuote, 
  onOpenCallback,
  theme,
  onToggleTheme
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; href?: string; onClick?: () => void }[] = [
    { label: 'Home', href: '#home' },
    { label: 'Our Services', href: '#services' },
    { label: 'Why Fresh Breeze', href: '#why-us' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Service Areas', href: '#service-area' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', onClick: onOpenQuote },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 dark:bg-[#101A30]/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 dark:border-slate-800'
            : 'bg-white dark:bg-[#101A30] border-b border-slate-200/80 dark:border-slate-800'
        }`}
      >
        {/* Top Prominent SMS Text Us Bar (Desktop & Mobile) */}
        <div className="bg-slate-900 dark:bg-slate-950 text-white border-b border-slate-800/80 px-3 sm:px-6 lg:px-8 py-1.5 text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-end gap-2 sm:gap-4">
            <span className="text-slate-300 hidden sm:inline text-[11px] font-medium">
              Questions or Fast Estimate?
            </span>
            <a
              href={SMS_URL}
              className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-bold group"
              aria-label={`Text us at ${SMS_PHONE}`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
              <span className="bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider border border-emerald-500/30">
                TEXT US
              </span>
              <span className="font-mono text-xs sm:text-sm font-extrabold tracking-wide text-white group-hover:text-emerald-300 underline-offset-2 hover:underline">
                {SMS_PHONE_FORMATTED}
              </span>
            </a>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 sm:py-2.5">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Zone 1: Logo */}
            <a href="#home" className="group shrink-0 focus-visible:outline-sky-600 rounded-lg flex items-center">
              <Logo size="md" />
            </a>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => 
                link.onClick ? (
                  <button
                    key={link.label}
                    type="button"
                    onClick={link.onClick}
                    className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-sky-700 dark:hover:text-sky-400 transition-colors py-1 focus-visible:outline-sky-600 rounded cursor-pointer"
                  >
                    {link.label}
                  </button>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-sky-700 dark:hover:text-sky-400 transition-colors py-1 focus-visible:outline-sky-600 rounded"
                  >
                    {link.label}
                  </a>
                )
              )}
            </nav>

            {/* Zone 3: Primary Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
              {/* Light/Dark Mode Toggle (Desktop & Mobile) */}
              <ThemeToggle 
                theme={theme} 
                onToggle={onToggleTheme} 
              />

              {/* "TEXT US" SMS button */}
              <a
                href={SMS_URL}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] shadow-xs hover:shadow transition-all border border-emerald-500/30 whitespace-nowrap cursor-pointer"
                aria-label="Text us at (737) 282-1351"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-100 shrink-0" />
                <span>TEXT US:</span>
                <span className="font-mono font-bold text-emerald-100">
                  {SMS_PHONE_FORMATTED}
                </span>
              </a>

              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-bold text-white bg-linear-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 active:scale-[0.98] shadow-xs sm:shadow-sm hover:shadow transition-all focus-visible:outline-sky-600 whitespace-nowrap cursor-pointer"
              >
                <span>FREE QUOTE</span>
                <ArrowRight className="w-3.5 h-3.5 text-sky-200" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg sm:rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-sky-600 cursor-pointer flex items-center justify-center shrink-0"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-150">
            <div className="space-y-1">
              {navLinks.map((link) => 
                link.onClick ? (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      link.onClick!();
                    }}
                    className="w-full text-left block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-800 hover:text-sky-700 dark:hover:text-sky-400 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-sky-50 dark:hover:bg-slate-800 hover:text-sky-700 dark:hover:text-sky-400 transition-colors"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>

            <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
              {/* Theme toggle in mobile menu with label */}
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                  Appearance ({theme === 'dark' ? 'Dark Mode' : 'Light Mode'})
                </span>
                <ThemeToggle 
                  theme={theme} 
                  onToggle={onToggleTheme} 
                />
              </div>

              {/* Prominent Mobile "TEXT US" SMS button */}
              <a
                href={SMS_URL}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-xs transition-colors border border-emerald-500/30"
                aria-label={`Text us at ${SMS_PHONE}`}
              >
                <MessageSquare className="w-4 h-4 text-emerald-100" />
                <span>TEXT US: {SMS_PHONE_FORMATTED}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-sky-600 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span>GET A FREE QUOTE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Floating Mobile Bottom CTA */}
      <aside 
        aria-label="Mobile quick quote CTA"
        className="md:hidden fixed bottom-4 left-4 right-4 z-40 pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-500"
      >
        <div className="pointer-events-auto max-w-sm mx-auto flex items-center gap-2 p-1.5 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md rounded-2xl shadow-[0_12px_32px_rgba(0,0,0,0.35)] border border-sky-400/25">
          <a
            href={SMS_URL}
            aria-label="Text us at (737) 282-1351"
            className="p-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl active:scale-95 flex items-center justify-center shrink-0 shadow-xs transition-transform cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-white" />
          </a>
          <button
            onClick={onOpenQuote}
            className="grow py-3 px-4 bg-linear-to-r from-sky-500 via-sky-600 to-emerald-600 hover:from-sky-600 hover:to-emerald-700 text-white rounded-xl font-extrabold text-xs tracking-wider flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.99] transition-transform cursor-pointer"
          >
            <span>GET A FREE QUOTE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>
    </>
  );
};
