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
    <section id="why-us" className="py-16 sm:py-24 bg-slate-50/70 border-y border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-widest mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Factual Service Standards</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
            Why Homeowners Choose Fresh Breeze
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
            We focus on what matters most: cleaner air, thorough workmanship, and dependable customer service.
          </p>
        </div>

        {/* 6 Factual Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {points.map((pt, idx) => {
            const Icon = pt.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-[0_4px_16px_rgba(15,23,42,0.04)] hover:shadow-[0_16px_36px_-10px_rgba(2,132,199,0.16)] hover:-translate-y-1.5 hover:border-sky-300 transition-all duration-300 flex flex-col group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700 transition-transform group-hover:scale-105">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-emerald-600 font-bold text-lg">✓</span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-display">
                  {pt.title}
                </h3>

                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed grow">
                  {pt.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenQuote}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-[0_8px_20px_rgba(2,132,199,0.25)] hover:shadow-[0_12px_28px_rgba(2,132,199,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <span>Request Your Free Quote</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
