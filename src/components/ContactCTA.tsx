import React from 'react';
import { Sparkles, ArrowRight, Mail, Instagram, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { MAILTO_URL, INSTAGRAM_URL, INSTAGRAM_DM_URL } from '../utils/constants';

interface ContactCTAProps {
  onOpenQuote: () => void;
}

export const ContactCTA: React.FC<ContactCTAProps> = ({ onOpenQuote }) => {
  return (
    <section className="relative py-16 sm:py-20 bg-linear-to-b from-white via-sky-50/50 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden transition-colors duration-200">
      {/* Decorative gradient blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-gradient-to-r from-sky-400/10 via-emerald-400/15 to-sky-500/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto bg-linear-to-br from-slate-900 via-slate-850 to-sky-950 text-white rounded-3xl p-8 sm:p-12 md:p-14 border border-sky-400/20 shadow-[0_24px_60px_-15px_rgba(2,132,199,0.3),0_0_0_1px_rgba(255,255,255,0.08)_inset] relative overflow-hidden">
          {/* Subtle background airflow lines */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto relative z-10 space-y-4">
            {/* Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-emerald-300 text-xs font-bold uppercase tracking-wider border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-emerald-300" />
              <span>Fast &amp; Professional Home Service</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight font-display text-balance">
              Ready for a Fresher Home?
            </h2>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
              Get in touch with Fresh Breeze for a free quote on your cleaning service.
            </p>

            {/* Inclusions */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-sky-200/90 pt-1">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Air Duct Cleaning</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Dryer Vent Cleaning</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>HVAC Cleaning</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chimney Cleaning</span>
              </div>
            </div>

            {/* 3 Clear CTA Buttons */}
            <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              {/* 1. GET A FREE QUOTE */}
              <button
                onClick={onOpenQuote}
                className="w-full py-4 px-5 rounded-2xl bg-linear-to-r from-sky-500 via-sky-600 to-emerald-600 hover:from-sky-600 hover:to-emerald-700 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-[0_8px_20px_rgba(2,132,199,0.35)] hover:shadow-[0_12px_28px_rgba(2,132,199,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer border border-sky-400/30"
              >
                <span>GET A FREE QUOTE</span>
                <ArrowRight className="w-4 h-4 text-sky-200" />
              </button>

              {/* 2. EMAIL US */}
              <a
                href={MAILTO_URL}
                className="w-full py-4 px-5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-white/20 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-xs"
              >
                <Mail className="w-4 h-4 text-sky-300" />
                <span>EMAIL US</span>
              </a>

              {/* 3. MESSAGE US ON INSTAGRAM */}
              <a
                href={INSTAGRAM_DM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Fresh Breeze on Instagram DM"
                className="w-full py-4 px-5 rounded-2xl bg-linear-to-r from-purple-600/30 to-pink-600/30 hover:from-purple-600/45 hover:to-pink-600/45 text-white font-bold text-xs sm:text-sm uppercase tracking-wider border border-pink-400/30 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer backdrop-blur-xs"
              >
                <Instagram className="w-4 h-4 text-pink-300" />
                <span>CHAT ON INSTAGRAM</span>
              </a>
            </div>

            {/* Guarantee note */}
            <div className="pt-3 flex items-center justify-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Transparent, free quotes with zero obligation for residential homeowners</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
