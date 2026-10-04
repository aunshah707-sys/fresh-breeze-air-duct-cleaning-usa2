import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, ArrowRight } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'How often should residential air duct cleaning be performed?',
    answer:
      'Most homeowners schedule residential air duct cleaning every 3 to 5 years under normal conditions. However, homes with indoor pets, family members with dust allergies, recent remodeling (drywall dust or sanding), or homes in high-dust regions benefit from professional air duct cleaning inspections every 2 to 3 years to maintain optimal indoor air quality.',
  },
  {
    question: 'What do your professional air duct cleaning services include?',
    answer:
      'Our comprehensive air duct cleaning services cover the entire home ventilation system: inspecting all accessible supply vents and return grilles, agitating accumulated dust and debris using rotary mechanical brushing equipment, and extracting loose particulates into high-powered negative-air HEPA collection units so dust does not escape into your living space.',
  },
  {
    question: 'Why are dryer vent cleaning services important for homeowners?',
    answer:
      'While the lint trap inside your dryer captures large fibers, fine lint bypasses the screen and accumulates inside the exhaust vent line. Professional dryer vent cleaning services restore unrestricted exhaust airflow, shorten drying times, lower energy bills, and significantly reduce the risk of lint-related residential fire hazards.',
  },
  {
    question: 'What is included in HVAC cleaning services?',
    answer:
      'Our HVAC cleaning services focus on key internal components that collect fine dust and grime over seasons of operation. This includes cleaning the air handler cabinet, inspecting and brushing the blower motor wheel, cleaning accessible evaporator coil surfaces, and ensuring unobstructed airflow through your central heating and cooling unit.',
  },
  {
    question: 'How often are chimney cleaning services recommended?',
    answer:
      'Annual chimney cleaning services and fireplace flue sweeps are recommended for any home that burns wood or fuel regularly. Sweeping removes soot and flammable creosote deposits that build up along flue liner walls, ensuring smoke and fumes draft safely outdoors instead of back into your home.',
  },
  {
    question: 'How do I get a free air duct cleaning quote?',
    answer:
      'You can request a free air duct cleaning quote online anytime using our 30-second estimate form, or click "REQUEST A CALLBACK" in our header to speak with our dispatch team. All quotes are 100% free and transparent with zero sales pressure or hidden fees.',
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
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenQuote, onOpenCall }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-widest mb-2.5">
            <HelpCircle className="w-4 h-4 text-emerald-600" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
            Got Questions About Duct &amp; Vent Cleaning?
          </h2>
          <p className="mt-3.5 text-sm sm:text-base text-slate-600 leading-relaxed">
            Here are clear, honest answers to the questions homeowners ask us most often about our cleaning services.
          </p>
        </div>

        {/* FAQ Accordions */}
        <div className="space-y-3.5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'border-sky-300/90 bg-white shadow-[0_8px_25px_rgba(2,132,199,0.1)] -translate-y-0.5'
                    : 'border-slate-200/90 bg-white shadow-xs hover:shadow-[0_4px_16px_rgba(15,23,42,0.06)] hover:-translate-y-0.5 hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-4 sm:py-5 px-5 sm:px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 font-display">
                    {faq.question}
                  </h3>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-sky-600 text-white rotate-180'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/60 animate-in fade-in duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* FAQ Bottom Help Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h4 className="text-base font-bold text-slate-900 font-display">
              Have a specific question about your home?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Our residential team is ready to answer questions and schedule a convenient appointment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto shrink-0">
            <button
              onClick={onOpenCall}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>REQUEST A CALLBACK</span>
            </button>
            <button
              onClick={onOpenQuote}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
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
