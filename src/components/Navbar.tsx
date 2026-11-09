import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';
import { Phone, Menu, X, ArrowRight, MessageSquare, MessageCircle } from 'lucide-react';
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
    { label: 'Reviews', href: '#customer-feedback' },
    { label: 'Why Fresh Breeze', href: '#why-us' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Service Areas', href: '#service-area' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', onClick: onOpenQuote },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full transition-all duration-300">
        {/* SECTION 2: SLIM BLUE GLASS CONTACT BAR ABOVE MAIN NAVIGATION */}
        {/* Displays ONLY: TEXT US | 📞 (737) 282-1351. No hours, no Mon-Fri schedule */}
        <div className="w-full bg-gradient-to-r from-sky-600 via-sky-700 to-sky-800 dark:from-slate-900 dark:via-sky-950 dark:to-slate-900 text-white shadow-xs backdrop-blur-md border-b border-white/15 px-3 py-1.5 transition-colors">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 sm:gap-4 text-xs">
            {/* TEXT US button with green gradient pill */}
            <a
              href={SMS_URL}
              className="inline-flex items-center gap-1.5 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-white font-extrabold text-[11px] sm:text-xs shadow-[0_2px_8px_rgba(16,185,129,0.35)] border border-emerald-300/40 active:scale-95 transition-all"
              aria-label={`Text us at ${SMS_PHONE_FORMATTED}`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-white fill-current" />
              <span>TEXT US</span>
            </a>

            {/* Subtle Divider */}
            <span className="text-white/40 font-light select-none text-xs sm:text-sm" aria-hidden="true">|</span>

            {/* Clickable Phone Number */}
            <a
              href="tel:+17372821351"
              className="inline-flex items-center gap-1.5 text-white hover:text-sky-200 transition-colors font-bold text-xs sm:text-sm tracking-wide"
              aria-label="Call Fresh Breeze at (737) 282-1351"
            >
              <Phone className="w-3.5 h-3.5 text-sky-200 fill-current shrink-0" />
              <span className="font-semibold">{SMS_PHONE_FORMATTED}</span>
            </a>
          </div>
        </div>

        {/* SECTION 3: FLOATING GLASS NAVIGATION BAR */}
        <div className="px-2 sm:px-4 lg:px-8 py-2">
          <nav
            aria-label="Main Navigation"
            className={`max-w-7xl mx-auto px-3 sm:px-5 py-2 sm:py-2.5 rounded-2xl sm:rounded-full transition-all duration-300 ${
              isScrolled
                ? 'bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border border-white/90 dark:border-white/10 shadow-[0_12px_36px_rgba(2,132,199,0.12)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.6)]'
                : 'bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl border border-white/80 dark:border-white/10 shadow-[0_8px_30px_rgba(2,132,199,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)]'
            }`}
          >
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              {/* Left: Fresh Breeze Logo */}
              <a href="#home" className="group shrink-0 focus-visible:outline-sky-600 rounded-lg flex items-center min-w-0">
                <Logo size="md" />
              </a>

              {/* Center: Desktop Navigation Links */}
              <div className="hidden lg:flex items-center gap-6">
                {navLinks.map((link) => 
                  link.onClick ? (
                    <button
                      key={link.label}
                      type="button"
                      onClick={link.onClick}
                      className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors py-1 focus-visible:outline-sky-600 rounded cursor-pointer whitespace-nowrap"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      className="text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors py-1 focus-visible:outline-sky-600 rounded whitespace-nowrap"
                    >
                      {link.label}
                    </a>
                  )
                )}
              </div>

              {/* Right: Glass Controls matching approved reference */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* 1. Sun/Moon Light-Dark Mode Toggle */}
                <ThemeToggle 
                  theme={theme} 
                  onToggle={onToggleTheme}
                  className="rounded-full! border-white/90! dark:border-white/10! bg-white/80! dark:bg-slate-800/80! shadow-xs hover:shadow-sm" 
                />

                {/* 2. Chat / Callback Icon Glass Button */}
                <button
                  type="button"
                  onClick={onOpenCallback}
                  className="p-2 sm:p-2.5 rounded-full border border-white/90 dark:border-white/10 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 hover:text-sky-600 dark:hover:text-sky-300 transition-all shadow-xs cursor-pointer focus-visible:outline-sky-500 shrink-0"
                  aria-label="Request a callback or chat"
                  title="Request a callback"
                >
                  <MessageCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-sky-600 dark:text-sky-400" />
                </button>

                {/* 3. FREE QUOTE Gradient Pill Button */}
                <button
                  onClick={onOpenQuote}
                  className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full text-xs font-extrabold text-white bg-gradient-to-r from-sky-500 via-sky-600 to-emerald-500 hover:from-sky-400 hover:via-sky-500 hover:to-emerald-400 active:scale-[0.98] shadow-[0_4px_16px_rgba(2,132,199,0.35)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.45)] transition-all focus-visible:outline-sky-600 whitespace-nowrap cursor-pointer shrink-0 border border-white/20"
                >
                  <span>FREE QUOTE</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-100" />
                </button>

                {/* 4. Hamburger Menu Glass Button (Mobile & Tablet) */}
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 sm:p-2.5 rounded-full border border-white/90 dark:border-white/10 bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 transition-colors focus-visible:outline-sky-600 cursor-pointer flex items-center justify-center shrink-0 shadow-xs"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
                </button>
              </div>
            </div>
          </nav>

          {/* Mobile menu glass dropdown */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-2 max-w-7xl mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl rounded-3xl border border-white/90 dark:border-white/10 shadow-[0_20px_40px_rgba(2,132,199,0.15)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.7)] px-4 pt-3 pb-5 animate-in slide-in-from-top-2 duration-200">
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
                      className="w-full text-left block px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-sky-50/80 dark:hover:bg-slate-800/80 hover:text-sky-700 dark:hover:text-sky-400 transition-colors cursor-pointer"
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-sky-50/80 dark:hover:bg-slate-800/80 hover:text-sky-700 dark:hover:text-sky-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  )
                )}
              </div>

              <div className="pt-3.5 mt-2.5 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    Appearance ({theme === 'dark' ? 'Dark Mode' : 'Light Mode'})
                  </span>
                  <ThemeToggle 
                    theme={theme} 
                    onToggle={onToggleTheme} 
                  />
                </div>

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
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>GET A FREE QUOTE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Floating Mobile Bottom CTA */}
      <aside 
        aria-label="Mobile quick quote CTA"
        className="md:hidden fixed left-3 right-3 sm:left-4 sm:right-4 z-30 pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[calc(100vw-1.5rem)] mx-auto bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))]"
      >
        <div className="pointer-events-auto max-w-sm mx-auto w-full flex items-center gap-2 p-1.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-[0_12px_32px_rgba(2,132,199,0.25)] border border-white/80 dark:border-white/10">
          <a
            href={SMS_URL}
            aria-label={`Text us at ${SMS_PHONE_FORMATTED}`}
            className="p-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl active:scale-95 flex items-center justify-center shrink-0 shadow-xs transition-transform cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-white fill-current" />
          </a>
          <button
            onClick={onOpenQuote}
            className="grow min-w-0 py-2.5 px-3 sm:px-4 bg-gradient-to-r from-sky-500 via-sky-600 to-emerald-500 hover:from-sky-600 hover:to-emerald-600 text-white rounded-xl font-extrabold text-xs tracking-wider flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.99] transition-transform cursor-pointer"
          >
            <span className="truncate">GET A FREE QUOTE</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>
      </aside>
    </>
  );
};
