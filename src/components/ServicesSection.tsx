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
        return <Wind className="w-5 h-5 text-sky-600" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-amber-500" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-emerald-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-sky-600" />;
      default:
        return <Wind className="w-5 h-5 text-sky-600" />;
    }
  };

  return (
    <section id="services" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-widest mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Professional Cleaning Solutions</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
            Our Cleaning Services
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
            Specialized residential air duct cleaning, dryer vent cleaning, HVAC cleaning, and chimney cleaning services to keep your home comfortable, energy-efficient, and safe.
          </p>
        </div>

        {/* The 4 Main Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col bg-white rounded-3xl border border-slate-200/90 shadow-[0_4px_20px_rgba(15,23,42,0.06)] hover:shadow-[0_20px_45px_-12px_rgba(2,132,199,0.2)] hover:-translate-y-2 hover:border-sky-300 transition-all duration-300 overflow-hidden"
            >
              {/* Card Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950/60 via-slate-950/10 to-transparent" />
                
                {/* Icon Badge */}
                <div className="absolute top-3 left-3 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-xs flex items-center justify-center shadow-md">
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
                <h3 className="text-xl font-bold text-slate-900 font-display group-hover:text-sky-700 transition-colors">
                  {service.title}
                </h3>
                
                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed grow">
                  {service.tagline}
                </p>

                {/* Key Points Preview */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                  {service.whatIncluded.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-500">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                      <span className="line-clamp-1">{item}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-2 flex items-center gap-2">
                  <button
                    onClick={() => onLearnMore(service.id)}
                    className="w-1/2 py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:text-sky-700 hover:bg-sky-50/60 hover:border-sky-200 transition-all text-center cursor-pointer"
                  >
                    Details
                  </button>
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
