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
      color: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      step: '02',
      title: 'Schedule Your Service',
      desc: 'Pick an appointment time that works for your schedule. Our technician arrives on time with commercial-grade cleaning equipment.',
      highlight: 'Convenient morning & afternoon arrival windows',
      icon: Calendar,
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      step: '03',
      title: 'Enjoy a Cleaner, Fresher Home',
      desc: 'Breathe easy with accumulated dust and lint removed from your ducts and dryer exhaust. Feel the difference in airflow and cleanliness.',
      highlight: 'Noticeable airflow improvement & fresher living spaces',
      icon: Home,
      color: 'bg-sky-50 text-sky-700 border-sky-200',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-widest mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Simple 3-Step Process</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
            How It Works
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
            Getting your air ducts and dryer vent cleaned is fast, straightforward, and stress-free.
          </p>
        </div>

        {/* Visual Timeline Grid */}
        <div className="relative">
          {/* Desktop connecting line between cards */}
          <div className="hidden lg:block absolute top-1/2 left-[15%] right-[15%] -translate-y-8 h-0.5 bg-linear-to-r from-sky-200 via-emerald-200 to-sky-200 -z-1" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-10">
            {steps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="relative bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.05)] hover:shadow-[0_20px_45px_-12px_rgba(2,132,199,0.18)] hover:-translate-y-2 hover:border-sky-300 transition-all duration-300 flex flex-col group"
                >
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-xs transition-transform group-hover:scale-105 ${item.color}`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="font-display font-extrabold text-3xl sm:text-4xl text-slate-200 group-hover:text-sky-300 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 font-display">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm text-slate-600 leading-relaxed grow">
                    {item.desc}
                  </p>

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item.highlight}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={onOpenQuote}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-linear-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-bold text-sm shadow-[0_8px_20px_rgba(2,132,199,0.25)] hover:shadow-[0_12px_28px_rgba(2,132,199,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <span>Start Step 1: Request Your Free Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
