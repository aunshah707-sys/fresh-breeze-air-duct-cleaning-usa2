import React from 'react';
import { ArrowRight, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';
import { trackContactClick } from '../utils/analytics';
import heroHomeImg from '../assets/images/hero_residential_home_1794168553732.jpg';
import heroTechnicianImg from '../assets/images/hero_air_duct_technician.webp';

interface HeroProps {
  onOpenQuote: () => void;
  onOpenCallback: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => {
  return (
    <section 
      id="home" 
      className="relative pt-3 pb-8 sm:pt-6 sm:pb-16 lg:pt-8 lg:pb-24 overflow-hidden w-full max-w-full bg-gradient-to-b from-sky-100/60 via-sky-50/30 to-white dark:from-[#091427] dark:via-[#0c1a33] dark:to-slate-950 transition-colors duration-300"
    >
      {/* Ambient background atmosphere - soft sky blue with subtle natural accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 sm:w-[32rem] h-80 sm:h-[32rem] rounded-full bg-sky-200/50 dark:bg-sky-600/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 -ml-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-emerald-100/50 dark:bg-emerald-600/10 blur-3xl pointer-events-none" />

      {/* Decorative subtle leaves hints in corners */}
      <div className="absolute top-6 left-4 sm:left-12 w-16 sm:w-24 h-16 sm:h-24 opacity-30 dark:opacity-10 pointer-events-none select-none">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-emerald-600">
          <path d="M10 80 C 15 30, 60 20, 90 10 C 80 50, 60 75, 10 80 Z" fill="currentColor" />
        </svg>
      </div>
      <div className="absolute top-12 right-4 sm:right-16 w-20 sm:w-28 h-20 sm:h-28 opacity-25 dark:opacity-10 pointer-events-none select-none rotate-45">
        <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-emerald-500">
          <path d="M10 80 C 15 30, 60 20, 90 10 C 80 50, 60 75, 10 80 Z" fill="currentColor" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10 w-full max-w-full">
        {/* Main Hero Card Container with Liquid Glass Surface */}
        <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl rounded-3xl sm:rounded-[2.5rem] border border-white/85 dark:border-white/10 shadow-[0_16px_40px_rgba(2,132,199,0.1),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.5)] p-4 sm:p-8 lg:p-10 transition-all">
          <div className="grid grid-cols-12 gap-3 sm:gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Copy & Benefit Badges */}
            <div className="col-span-7 sm:col-span-7 lg:col-span-7 space-y-2.5 sm:space-y-4 lg:space-y-5 text-left">
              {/* Kicker Tag: Frosted glass pill with emerald dot */}
              <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/85 dark:bg-slate-800/85 backdrop-blur-md border border-white/90 dark:border-white/10 text-[10px] sm:text-xs font-bold text-slate-800 dark:text-slate-100 shadow-xs max-w-full">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-emerald-500 shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                <span className="truncate">FRESH BREEZE AIR DUCT CLEANING USA</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-lg sm:text-3xl lg:text-[2.75rem] font-extrabold text-slate-900 dark:text-white leading-[1.15] tracking-tight font-display text-balance">
                Professional Air Duct &amp; Dryer Vent Cleaning
              </h1>

              {/* Subheadline & description */}
              <div className="space-y-1">
                <h2 className="text-xs sm:text-lg lg:text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Cleaner Air. Healthier Home.
                </h2>
                <p className="text-[11px] sm:text-xs lg:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl line-clamp-2 sm:line-clamp-none">
                  Residential air duct cleaning, dryer vent cleaning, HVAC cleaning &amp; chimney sweeping.
                </p>
              </div>

              {/* Translucent Glass Benefit Badges */}
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2.5 pt-0.5">
                {/* 1. Licensed & Insured */}
                <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/90 dark:border-white/10 shadow-2xs text-[10px] sm:text-xs font-bold text-slate-800 dark:text-slate-100">
                  <ShieldCheck className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Licensed &amp; Insured</span>
                </div>

                {/* 2. Same-Day Service */}
                <div className="inline-flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/90 dark:border-white/10 shadow-2xs text-[10px] sm:text-xs font-bold text-slate-800 dark:text-slate-100">
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Same-Day Service</span>
                </div>
              </div>
            </div>

            {/* Right Column: Beautiful Suburban Home Visual (matching approved reference) */}
            <div className="col-span-5 sm:col-span-5 lg:col-span-5 lg:row-span-3 relative h-full flex items-center justify-center">
              <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_12px_32px_rgba(2,132,199,0.18)] border-2 sm:border-4 border-white/90 dark:border-white/15 bg-white aspect-4/5 sm:aspect-4/3 lg:aspect-4/3 group">
                <img
                  src={heroHomeImg}
                  alt="Beautiful residential American family home with clean indoor ventilation"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  width={1200}
                  height={900}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle bottom glass overlay banner */}
                <div className="absolute inset-x-0 bottom-0 p-1.5 sm:p-3 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent text-white">
                  <div className="flex items-center justify-between gap-1 text-[9px] sm:text-xs">
                    <span className="font-bold text-emerald-300 truncate">
                      Residential Home
                    </span>
                    <span className="hidden sm:inline text-white/90 font-medium">
                      USA Nationwide
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Action Buttons (spans below on mobile, sits under badges on desktop) */}
            <div className="col-span-12 lg:col-span-7 flex flex-row items-center gap-2 sm:gap-4 pt-1 sm:pt-2">
              {/* Primary: GET A FREE QUOTE (Cyan-blue to Emerald gradient) */}
              <button
                onClick={onOpenQuote}
                className="grow sm:grow-0 px-3.5 sm:px-7 py-2.5 sm:py-3.5 rounded-full bg-gradient-to-r from-sky-500 via-sky-600 to-emerald-500 hover:from-sky-400 hover:via-sky-500 hover:to-emerald-400 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_8px_24px_rgba(2,132,199,0.35)] hover:shadow-[0_12px_30px_rgba(16,185,129,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer border border-white/25 shrink-0 min-w-0"
              >
                <span className="truncate">GET A FREE QUOTE</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-100 shrink-0" />
              </button>

              {/* Secondary: 📞 (737) 282-1351 (Liquid glass call button) */}
              <a
                href="tel:+17372821351"
                onClick={() => trackContactClick('phone', '+17372821351', 'Hero Call Button')}
                className="grow sm:grow-0 px-3 sm:px-6 py-2.5 sm:py-3.5 rounded-full bg-white/85 dark:bg-slate-800/85 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-md border border-white/90 dark:border-white/10 text-slate-800 dark:text-slate-100 font-bold text-xs sm:text-sm shadow-xs hover:shadow transition-all flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer whitespace-nowrap min-w-0"
                aria-label="Call Fresh Breeze at (737) 282-1351"
              >
                <span className="shrink-0 text-xs sm:text-sm">📞</span>
                <span className="truncate">(737) 282-1351</span>
              </a>
            </div>

            {/* Factual trust points strip */}
            <div className="col-span-12 lg:col-span-7 flex flex-wrap items-center gap-x-3.5 sm:gap-x-5 gap-y-1 text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium pt-0.5">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Free Upfront Estimate</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-sky-600 dark:text-sky-400 shrink-0" />
                <span>HEPA Negative-Air Extraction</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Zero Hidden Fees</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
