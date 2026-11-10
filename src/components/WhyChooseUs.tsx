import React from 'react';
import { 
  Sparkles, 
  UserCheck, 
  Home, 
  CalendarCheck, 
  Receipt, 
  CheckCircle,
  ArrowRight 
} from 'lucide-react';

interface WhyChooseUsProps {
  onOpenQuote: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenQuote }) => {
  const points = [
    {
      title: 'Professional Service',
      description:
        'Trained technicians using specialized commercial-grade vacuum equipment, rotary brushes, and residential care practices.',
      icon: UserCheck,
    },
    {
      title: 'Thorough Cleaning',
      description:
        'We clean the full length of your ventilation, ductwork, dryer exhaust, and chimney systems — never just surface dusting.',
      icon: Sparkles,
    },
    {
      title: 'Convenient Scheduling',
      description:
        'Flexible appointment windows with timely confirmation and arrival notices that fit around your family schedule.',
      icon: CalendarCheck,
    },
    {
      title: 'Homeowner Focused',
      description:
        'Careful treatment of your living space with drop cloths, corner guards, and HEPA particulate containment.',
      icon: Home,
    },
    {
      title: 'Free Quotes',
      description:
        'Clear, straightforward pricing with transparent scopes provided upfront before any cleaning begins.',
      icon: Receipt,
    },
    {
      title: 'Quality Work',
      description:
        'Systematic cleaning verified across all registers, vents, and flue pathways for reliable airflow and safety.',
      icon: CheckCircle,
    },
  ];

  return (
    <section id="why-us" className="py-16 sm:py-24 bg-gradient-to-b from-white via-sky-50/50 to-white dark:from-slate-950 dark:via-[#091427] dark:to-slate-950 relative w-full max-w-full overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display text-balance">
            Why Homeowners Choose Fresh Breeze
          </h2>
          <p className="mt-3 text-xs sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            We focus on what matters most: cleaner air, thorough workmanship, and dependable customer service.
          </p>
        </div>

        {/* 6 Factual Service Cards in Liquid Glass Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full max-w-full">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl rounded-3xl p-5 sm:p-6 border border-white/90 dark:border-white/10 shadow-[0_8px_24px_rgba(2,132,199,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_36px_rgba(2,132,199,0.15)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col group w-full min-w-0"
              >
                <div className="flex items-center justify-between mb-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-50 to-sky-100 dark:from-slate-800 dark:to-slate-800/80 border border-sky-100 dark:border-slate-700 flex items-center justify-center text-sky-600 dark:text-sky-300 transition-transform group-hover:scale-105 shrink-0 shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-emerald-500 font-black text-lg">✓</span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
                  {pt.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed grow">
                  {pt.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-10 sm:mt-12 text-center">
          <button
            onClick={onOpenQuote}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-sky-500 via-sky-600 to-emerald-500 hover:from-sky-400 hover:via-sky-500 hover:to-emerald-400 text-white font-extrabold text-xs sm:text-sm shadow-[0_8px_24px_rgba(2,132,199,0.35)] hover:shadow-[0_12px_32px_rgba(16,185,129,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer border border-white/20"
          >
            <span>Request Your Free Quote</span>
            <ArrowRight className="w-4 h-4 text-emerald-100" />
          </button>
        </div>
      </div>
    </section>
  );
};
