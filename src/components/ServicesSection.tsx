import React from 'react';
import { ArrowRight, Calendar, Star, Wind } from 'lucide-react';
import { SERVICES_DATA } from './ServiceDetailModal';
import airDuctVentImg from '../assets/images/service_card_air_duct_1794168553947.jpg';
import dryerVentImg from '../assets/images/service_card_dryer_1794168554771.jpg';
import hvacUnitImg from '../assets/images/service_card_hvac_1794168554397.jpg';
import chimneyMasonryImg from '../assets/images/service_card_chimney_1794168555276.jpg';

interface ServicesSectionProps {
  onLearnMore: (serviceId: string) => void;
  onSelectServiceForQuote: (serviceTitle: string) => void;
  onClaimOffer?: (couponCode?: string) => void;
  onViewAllReviews?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onLearnMore,
  onSelectServiceForQuote,
  onClaimOffer,
  onViewAllReviews,
}) => {
  // Service images matching approved reference
  const getReferenceCardImage = (id: string) => {
    switch (id) {
      case 'air-duct-cleaning':
        return airDuctVentImg;
      case 'dryer-vent-cleaning':
        return dryerVentImg;
      case 'hvac-cleaning':
        return hvacUnitImg;
      case 'chimney-cleaning':
        return chimneyMasonryImg;
      default:
        return airDuctVentImg;
    }
  };

  const getDisplayTitle = (id: string, defaultTitle: string) => {
    if (id === 'chimney-cleaning') return 'Chimney Sweeping';
    return defaultTitle;
  };

  const handleClaimSpecial = () => {
    if (onClaimOffer) {
      onClaimOffer('FRESH40');
    } else {
      onSelectServiceForQuote('Air Duct Cleaning');
    }
  };

  return (
    <section 
      id="services" 
      className="pt-8 sm:pt-16 pb-12 sm:pb-16 scroll-mt-28 bg-gradient-to-b from-white via-sky-50/40 to-white dark:from-slate-950 dark:via-[#091427] dark:to-slate-950 relative w-full max-w-full overflow-hidden transition-colors duration-300"
    >
      {/* Soft ambient atmospheric glow */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-sky-200/40 dark:bg-sky-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-emerald-100/40 dark:bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full max-w-full space-y-8 sm:space-y-12">
        
        {/* Section Header matching Reference */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 text-left">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-widest mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs" />
              <span>Residential Ventilation Solutions</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
              Our Services
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md">
            Specialized residential air duct cleaning, dryer vent clearance, HVAC cleaning &amp; chimney sweeping.
          </p>
        </div>

        {/* 4 Service Cards Grid (Matching approved reference image) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 w-full max-w-full">
          {SERVICES_DATA.map((service) => {
            const cardImg = getReferenceCardImage(service.id);
            const title = getDisplayTitle(service.id, service.title);

            return (
              <div
                key={service.id}
                onClick={() => onLearnMore(service.id)}
                className="group relative flex flex-col justify-between bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl rounded-2xl sm:rounded-3xl border border-white/90 dark:border-white/10 shadow-[0_8px_24px_rgba(2,132,199,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)] hover:shadow-[0_16px_36px_rgba(2,132,199,0.18)] hover:-translate-y-1.5 transition-all duration-300 p-3 sm:p-4 cursor-pointer overflow-hidden"
              >
                {/* Image Container with delicate frosted reflection */}
                <div className="relative aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-sky-50 to-white dark:from-slate-800 dark:to-slate-900 border border-white/60 dark:border-white/5 shadow-inner">
                  <img
                    src={cardImg}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Card Title and Circle Arrow Button */}
                <div className="mt-3 sm:mt-4 pt-1 flex items-center justify-between gap-1.5">
                  <h3 className="text-xs sm:text-base font-bold text-slate-900 dark:text-white font-display group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors leading-tight">
                    {title}
                  </h3>

                  {/* Circular Blue Arrow Button */}
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-sky-50 dark:bg-slate-800 border border-sky-200 dark:border-sky-800 flex items-center justify-center text-sky-600 dark:text-sky-300 group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600 transition-all shrink-0 shadow-2xs">
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* NOVEMBER SPECIAL PROMOTIONAL GLASS CARD (Matching approved reference image) */}
        <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl rounded-3xl sm:rounded-[2.5rem] border border-white/90 dark:border-white/10 shadow-[0_20px_45px_rgba(2,132,199,0.12),inset_0_1px_1px_rgba(255,255,255,0.95)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.6)] p-4 sm:p-8 lg:p-10 overflow-hidden">
          {/* Subtle leaves decoration in the background */}
          <div className="absolute -top-6 -left-6 w-24 sm:w-36 h-24 sm:h-36 opacity-35 dark:opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" fill="none" className="w-full h-full text-emerald-500">
              <path d="M10 80 C 15 30, 60 20, 90 10 C 80 50, 60 75, 10 80 Z" fill="currentColor" />
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-8 items-center">
            
            {/* Left Column: Air Duct Vent Diffuser Illustration */}
            <div className="md:col-span-4 lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-xs sm:max-w-sm rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_12px_30px_rgba(2,132,199,0.18)] border-2 border-white/90 dark:border-white/10 aspect-4/3 sm:aspect-square bg-gradient-to-br from-sky-50 via-white to-sky-100 dark:from-slate-800 dark:to-slate-900">
                <img
                  src={airDuctVentImg}
                  alt="Whole house air duct cleaning vent with pure airflow"
                  loading="lazy"
                  width={500}
                  height={400}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/20 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-3 right-3 text-white text-[11px] font-bold flex items-center gap-1.5 drop-shadow-xs">
                  <Wind className="w-3.5 h-3.5 text-sky-200" />
                  <span>Pure Airflow • Zero Dust</span>
                </div>
              </div>
            </div>

            {/* Right Column: Offer Details & Huge Price Callout */}
            <div className="md:col-span-8 lg:col-span-7 space-y-3 sm:space-y-4 text-left">
              {/* November Special Badge Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-sky-600 text-white text-[11px] sm:text-xs font-extrabold uppercase tracking-wider shadow-sm">
                <Calendar className="w-3.5 h-3.5 text-white" />
                <span>NOVEMBER SPECIAL</span>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display tracking-tight">
                Whole House Air Duct Cleaning
              </h3>

              {/* Pricing Row with Strikethrough & Big Green Price */}
              <div className="flex items-center justify-between gap-4 flex-wrap pt-1">
                <div>
                  <span className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 block">
                    Regular Price: <span className="line-through">$359</span>
                  </span>
                  <div className="text-3xl sm:text-5xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight font-display">
                    $215.40
                  </div>
                </div>

                {/* 40% OFF Green Pill Badge */}
                <div className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white font-black text-center shadow-md border border-emerald-400/40">
                  <span className="block text-lg sm:text-2xl leading-none">40%</span>
                  <span className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-100">OFF</span>
                </div>
              </div>

              {/* Claim Your Offer Button */}
              <div className="pt-2">
                <button
                  onClick={handleClaimSpecial}
                  className="w-full py-3.5 sm:py-4 px-6 rounded-full bg-gradient-to-r from-sky-500 via-sky-600 to-emerald-500 hover:from-sky-400 hover:via-sky-500 hover:to-emerald-400 active:scale-[0.99] text-white font-extrabold text-sm sm:text-base tracking-wide shadow-[0_8px_24px_rgba(2,132,199,0.35)] hover:shadow-[0_12px_32px_rgba(16,185,129,0.45)] transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-white/20"
                >
                  <span>Claim Your Offer</span>
                  <ArrowRight className="w-4 h-4 text-emerald-100" />
                </button>
              </div>

              <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center sm:text-left">
                Coupon code <span className="font-mono font-bold text-slate-700 dark:text-slate-200">FRESH40</span> automatically applied. Valid for residential homes across the USA.
              </p>
            </div>

          </div>
        </div>

        {/* WHAT HOMEOWNERS SAY (Matching approved reference image) */}
        <div className="pt-2 flex items-center justify-between gap-3 text-left">
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-emerald-500 fill-emerald-500" />
            <h3 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
              What Homeowners Say
            </h3>
          </div>

          <button
            type="button"
            onClick={onViewAllReviews}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors cursor-pointer"
            aria-label="View all customer reviews gallery"
          >
            <span>View All Reviews</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
