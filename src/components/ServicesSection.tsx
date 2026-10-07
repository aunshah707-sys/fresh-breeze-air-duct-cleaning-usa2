import React from 'react';
import { Wind, Flame, Cpu, Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA } from './ServiceDetailModal';

interface ServicesSectionProps {
  onLearnMore: (serviceId: string) => void;
  onSelectServiceForQuote: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onLearnMore,
  onSelectServiceForQuote,
}) => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wind':
        return <Wind className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-500 dark:text-amber-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
      default:
        return <Wind className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-white dark:bg-slate-950 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-widest mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Professional Cleaning Solutions</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display text-balance">
            Our Cleaning Services
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Specialized residential air duct cleaning, dryer vent cleaning, HVAC cleaning, and chimney cleaning services to keep your home comfortable, energy-efficient, and safe.
          </p>
        </div>

        {/* The 4 Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-[0_4px_20px_rgba(15,23,42,0.06)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_45px_-12px_rgba(2,132,199,0.2)] hover:-translate-y-2 hover:border-sky-300 dark:hover:border-sky-500/50 transition-all duration-300 overflow-hidden"
            >
              {/* Card Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  loading="lazy"
                  width={400}
                  height={240}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                
                {/* Icon Badge */}
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs flex items-center justify-center shadow-md border border-slate-100 dark:border-slate-800">
                  {getServiceIcon(service.iconName)}
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[11px] font-semibold text-emerald-300 tracking-wider uppercase">
                    Fresh Breeze Service
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 sm:p-6 flex flex-col grow">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors">
                  <a
                    href={`/services/${service.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onLearnMore(service.id);
                    }}
                  >
                    {service.title}
                  </a>
                </h3>
                
                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed grow">
                  {service.tagline}
                </p>

                {/* Key Points Preview */}
                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                  {service.whatIncluded.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-2 flex items-center gap-2">
                  <a
                    href={`/services/${service.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onLearnMore(service.id);
                    }}
                    className="w-1/2 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-sky-700 dark:hover:text-sky-300 hover:bg-sky-50/60 dark:hover:bg-slate-800 hover:border-sky-200 dark:hover:border-slate-600 transition-all text-center cursor-pointer block"
                  >
                    Details
                  </a>
                  <button
                    onClick={() => onSelectServiceForQuote(service.title)}
                    className="w-1/2 py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white text-xs font-bold shadow-xs hover:shadow transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
