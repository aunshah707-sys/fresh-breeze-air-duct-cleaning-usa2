import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, ArrowRight, MessageSquare } from 'lucide-react';
import { SMS_URL, SMS_PHONE_FORMATTED } from '../utils/constants';

interface FAQItem {
  question: string;
  answer: string;
  serviceSlug?: string;
  serviceLabel?: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How often should residential air duct cleaning be performed?',
    answer:
      'Most homeowners schedule residential air duct cleaning every 3 to 5 years under normal conditions. However, homes with indoor pets, family members with dust allergies, recent remodeling (drywall dust or sanding), or homes in high-dust regions benefit from professional air duct cleaning inspections every 2 to 3 years to maintain optimal indoor air quality.',
    serviceSlug: 'air-duct-cleaning',
    serviceLabel: 'Air Duct Cleaning',
  },
  {
    question: 'What do your professional air duct cleaning services include?',
    answer:
      'Our comprehensive air duct cleaning services cover the entire home ventilation system: inspecting all accessible supply vents and return grilles, agitating accumulated dust and debris using rotary mechanical brushing equipment, and extracting loose particulates into high-powered negative-air HEPA collection units so dust does not escape into your living space.',
    serviceSlug: 'air-duct-cleaning',
    serviceLabel: 'Air Duct Cleaning',
  },
  {
    question: 'Why are dryer vent cleaning services important for homeowners?',
    answer:
      'While the lint trap inside your dryer captures large fibers, fine lint bypasses the screen and accumulates inside the exhaust vent line. Professional dryer vent cleaning services restore unrestricted exhaust airflow, shorten drying times, lower energy bills, and significantly reduce the risk of lint-related residential fire hazards.',
    serviceSlug: 'dryer-vent-cleaning',
    serviceLabel: 'Dryer Vent Cleaning',
  },
  {
    question: 'What is included in HVAC cleaning services?',
    answer:
      'Our HVAC cleaning services focus on key internal components that collect fine dust and grime over seasons of operation. This includes cleaning the air handler cabinet, inspecting and brushing the blower motor wheel, cleaning accessible evaporator coil surfaces, and ensuring unobstructed airflow through your central heating and cooling unit.',
    serviceSlug: 'hvac-cleaning',
    serviceLabel: 'HVAC Cleaning',
  },
  {
    question: 'How often are chimney cleaning services recommended?',
    answer:
      'Annual chimney cleaning services and fireplace flue sweeps are recommended for any home that burns wood or fuel regularly. Sweeping removes soot and flammable creosote deposits that build up along flue liner walls, ensuring smoke and fumes draft safely outdoors instead of back into your home.',
    serviceSlug: 'chimney-cleaning',
    serviceLabel: 'Chimney Cleaning',
  },
  {
    question: 'How do I get a free air duct cleaning quote?',
    answer:
      'You can request a free air duct cleaning quote online anytime using our 30-second estimate form, or click "TEXT US" in our header to speak with our dispatch team. All quotes are 100% free and transparent with zero sales pressure or hidden fees.',
  },
  {
    question: 'How long does home air duct cleaning take?',
    answer:
      'A thorough cleaning for a typical single-family home (around 1,500 to 2,500 square feet with 10 to 15 vents) usually takes approximately 2 to 3 hours. Technicians take care to protect your floors and furnishings throughout the visit.',
  },
];

interface FAQSectionProps {
  onOpenQuote: () => void;
  onOpenCall: () => void;
  onNavigateToService?: (serviceSlug: string) => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ 
  onOpenQuote, 
  onOpenCall,
  onNavigateToService 
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-linear-to-b from-white via-sky-50/40 to-white dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 relative w-full max-w-full overflow-hidden transition-colors duration-200">
      {/* Decorative atmospheric blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-sky-400/10 via-emerald-400/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 glass-pill px-3.5 py-1.5 rounded-full text-xs font-bold text-sky-800 dark:text-sky-300 uppercase tracking-widest mb-3.5 shadow-2xs">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display text-balance">
            Got Questions About Duct &amp; Vent Cleaning?
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Here are clear, honest answers to the questions homeowners ask us most often about our cleaning services.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-3.5 w-full max-w-full">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-300 overflow-hidden w-full max-w-full ${
                  isOpen
                    ? 'glass-surface border border-sky-300/80 dark:border-sky-500/50 shadow-[0_12px_32px_rgba(2,132,199,0.12),0_0_0_1px_rgba(255,255,255,0.9)_inset] dark:shadow-[0_12px_32px_rgba(0,0,0,0.4)] -translate-y-0.5'
                    : 'bg-white/70 dark:bg-slate-900/60 backdrop-blur-md border border-white/80 dark:border-white/10 shadow-2xs hover:shadow-[0_6px_20px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 hover:border-sky-200/80 dark:hover:border-slate-700'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-4 sm:py-5 px-4 sm:px-6 text-left flex items-center justify-between gap-3 sm:gap-4 cursor-pointer focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 font-display min-w-0 pr-1">
                    {faq.question}
                  </h3>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-linear-to-r from-sky-500 to-emerald-500 text-white rotate-180 shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100/80 dark:border-white/10 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                    {faq.serviceSlug && onNavigateToService && (
                      <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-white/10 flex items-center">
                        <button
                          type="button"
                          onClick={() => onNavigateToService(faq.serviceSlug!)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 transition-colors cursor-pointer group"
                        >
                          <span>Learn more about our {faq.serviceLabel} service</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FAQ Bottom Help Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl glass-surface border border-white/80 dark:border-white/10 shadow-[0_16px_40px_rgba(2,132,199,0.08),0_0_0_1px_rgba(255,255,255,0.9)_inset] dark:shadow-[0_16px_40px_rgba(0,0,0,0.4)] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white font-display">
              Have a specific question about your home?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">
              Our residential team is ready to answer questions and schedule a convenient appointment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <a
              href={SMS_URL}
              className="glass-pill w-full sm:w-auto px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              aria-label="Text us at (737) 282-1351"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>TEXT US: {SMS_PHONE_FORMATTED}</span>
            </a>
            <button
              onClick={onOpenQuote}
              className="btn-gradient-primary w-full sm:w-auto px-5 py-2.5 rounded-2xl text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>GET A FREE QUOTE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
