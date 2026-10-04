import React from 'react';
import { ArrowRight, Phone, ShieldCheck, Sparkles, Wind, CheckCircle2 } from 'lucide-react';
import heroTechnicianImg from '../assets/images/hero_air_duct_technician_1791041439373.jpg';

interface HeroProps {
  onOpenQuote: () => void;
  onOpenCallback: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onOpenCallback }) => {
  return (
    <section id="home" className="relative pt-6 pb-12 sm:pt-10 sm:pb-20 lg:pt-14 lg:pb-24 overflow-hidden bg-linear-to-b from-sky-50/50 via-white to-white">
      {/* Ambient background accents */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-sky-200/40 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 -ml-20 w-80 h-80 rounded-full bg-emerald-100/40 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-800 tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Fresh Breeze Air Duct Cleaning USA</span>
              <span className="text-slate-300" aria-hidden="true">·</span>
              <span className="text-emerald-700 font-semibold">Residential Air Duct Cleaning Specialists</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.3rem] font-extrabold text-slate-900 leading-[1.12] tracking-tight font-display text-balance">
              Cleaner Air. Healthier Home.{' '}
              <span className="bg-linear-to-r from-sky-600 via-sky-700 to-emerald-600 bg-clip-text text-transparent">
                Fresh Breeze.
              </span>
            </h1>

            {/* Subheadline with natural SEO keywords */}
            <h2 className="text-lg sm:text-xl font-semibold text-slate-700 tracking-tight">
              Professional Air Duct Cleaning Services, Dryer Vent Cleaning, HVAC &amp; Chimney Care.
            </h2>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Helping homeowners improve indoor air quality, airflow, and home comfort with residential air duct cleaning, dryer vent clearance, and complete HVAC maintenance.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
              <button
                onClick={onOpenQuote}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-linear-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-bold text-sm sm:text-base shadow-[0_8px_20px_rgba(2,132,199,0.25)] hover:shadow-[0_12px_28px_rgba(2,132,199,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>GET A FREE QUOTE</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenCallback}
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/90 text-slate-800 font-bold text-sm sm:text-base shadow-[0_4px_12px_rgba(15,23,42,0.06)] hover:shadow-[0_8px_20px_rgba(15,23,42,0.1)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Phone className="w-3.5 h-3.5 text-emerald-700" />
                </div>
                <span>REQUEST A CALLBACK</span>
              </button>
            </div>

            {/* Factual Trust Line */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-600 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Free Air Duct Cleaning Quote</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Professional Air Duct Cleaning</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Home Air Duct Cleaning Care</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-[0_24px_60px_-15px_rgba(2,132,199,0.25)] border-4 border-white bg-slate-900 aspect-16/11 sm:aspect-16/10 lg:aspect-4/3 transition-all duration-500 hover:shadow-[0_30px_70px_-15px_rgba(2,132,199,0.35)]">
                <img
                  src={heroTechnicianImg}
                  alt="Professional air duct cleaning technician"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />

                <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Pure Air Flow &amp; Ventilation Care</span>
                  </div>
                  <p className="text-xs text-slate-200 mt-0.5 line-clamp-1">
                    Specialized residential vacuum equipment &amp; rotary brush line agitation.
                  </p>
                </div>
              </div>

              {/* Floating Badge: Left */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-[0_12px_30px_rgba(15,23,42,0.12)] border border-slate-100/90 items-center gap-3 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-700 shrink-0">
                  <Wind className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900 leading-tight">Enhanced Airflow</p>
                  <p className="text-[11px] text-slate-500">Cleaner ducts &amp; vents</p>
                </div>
              </div>

              {/* Floating Badge: Right Top */}
              <div className="hidden sm:flex absolute -top-4 -right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-[0_12px_28px_rgba(15,23,42,0.1)] border border-slate-100/90 items-center gap-2.5 hover:-translate-y-1 transition-transform duration-300">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-slate-900 block leading-none">Homeowner Focused</span>
                  <span className="text-[10px] text-slate-500 font-medium">Reliable &amp; Thorough</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
