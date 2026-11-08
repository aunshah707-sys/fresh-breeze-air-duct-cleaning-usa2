import React from 'react';
import { FileEdit, Calendar, Home, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HowItWorksProps {
  onOpenQuote: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenQuote }) => {
  const steps = [
    {
      step: '01',
      title: 'Request Your Free Quote',
      desc: 'Fill out our simple online form or give us a call. Tell us about your home and which ventilation services you need.',
      highlight: 'Fast online response & zero sales pressure',
      icon: FileEdit,
      color: 'bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    },
    {
      step: '02',
      title: 'Schedule Your Service',
      desc: 'Pick an appointment time that works for your schedule. Our technician arrives on time with commercial-grade cleaning equipment.',
      highlight: 'Convenient morning & afternoon arrival windows',
      icon: Calendar,
      color: 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    },
    {
      step: '03',
      title: 'Enjoy a Cleaner, Fresher Home',
      desc: 'Breathe easy with accumulated dust and lint removed from your ducts and dryer exhaust. Feel the difference in airflow and cleanliness.',
      highlight: 'Noticeable airflow improvement & fresher living spaces',
      icon: Home,
      color: 'bg-sky-50 dark:bg-sky-950/70 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-gradient-to-b from-white via-sky-50/40 to-white dark:from-slate-950 dark:via-[#091427] dark:to-slate-950 relative overflow-hidden w-full max-w-full transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/90 dark:border-white/10 text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-widest mb-3 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Simple 3-Step Process</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display text-balance">
            How It Works
          </h2>
          <p className="mt-3 text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Getting your air ducts and dryer vent cleaned is fast, straightforward, and stress-free.
          </p>
        </div>

        {/* Visual Timeline Grid */}
        <div className="relative w-full max-w-full">
          {/* Desktop connecting line between cards */}
          <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] -translate-y-8 h-0.5 bg-gradient-to-r from-sky-200 via-emerald-200 to-sky-200 dark:from-sky-900/50 dark:via-emerald-900/50 dark:to-sky-900/50 -z-1" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 w-full max-w-full">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="relative bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/90 dark:border-white/10 shadow-[0_8px_24px_rgba(2,132,199,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_36px_rgba(2,132,199,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col group w-full min-w-0"
                >
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100 dark:from-slate-800 dark:to-slate-800/80 border border-sky-100 dark:border-slate-700 flex items-center justify-center text-sky-600 dark:text-sky-300 shadow-2xs transition-transform group-hover:scale-105 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-display font-extrabold text-3xl sm:text-4xl text-sky-200 dark:text-slate-700 group-hover:text-sky-400 dark:group-hover:text-sky-300 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white font-display">
                    {item.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed grow">
                    {item.desc}
                  </p>

                  <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      <span>{item.highlight}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick CTA */}
        <div className="mt-10 sm:mt-12 text-center">
          <button
            onClick={onOpenQuote}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-sky-500 via-sky-600 to-emerald-500 hover:from-sky-400 hover:via-sky-500 hover:to-emerald-400 text-white font-extrabold text-xs sm:text-sm shadow-[0_8px_24px_rgba(2,132,199,0.35)] hover:shadow-[0_12px_32px_rgba(16,185,129,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer border border-white/20"
          >
            <span>Start Step 1: Request Your Free Quote</span>
            <ArrowRight className="w-4 h-4 text-emerald-100 shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
};
