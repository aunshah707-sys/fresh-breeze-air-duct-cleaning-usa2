import React, { useState } from 'react';
import { MapPin, Search, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ServiceAreaProps {
  onCheckZip: (zipOrLocation: string) => void;
}

export const ServiceArea: React.FC<ServiceAreaProps> = ({ onCheckZip }) => {
  const [query, setQuery] = useState('');
  const [checkedResult, setCheckedResult] = useState<string | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setCheckedResult(`Inquiry started for "${query}". Please complete your quote request below.`);
    onCheckZip(query.trim());
  };

  return (
    <section id="service-area" className="py-16 sm:py-20 bg-linear-to-b from-white via-sky-50/40 to-white dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 relative transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-900 rounded-3xl border border-sky-100 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="p-8 sm:p-12 text-center">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-widest mb-3">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Nationwide Coverage</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display text-balance">
              Serving Homeowners Across the USA
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              We connect homeowners with dependable, high-standard air duct and dryer vent cleaning solutions.
            </p>

            <div className="mt-2 inline-block px-4 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 text-xs sm:text-sm font-semibold border border-sky-200/60 dark:border-sky-800/60">
              Contact us to confirm service availability in your area.
            </div>

            {/* Interactive ZIP / Location Box */}
            <div className="mt-8 max-w-lg mx-auto">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                <div className="relative grow">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setCheckedResult(null);
                    }}
                    placeholder="Enter your 5-Digit ZIP or City, State"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-slate-50/50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <span>Check Availability</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {checkedResult && (
                <div className="mt-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{checkedResult}</span>
                </div>
              )}

              <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">
                Residential service availability confirmed quickly with our local dispatch network.
              </p>
            </div>

            {/* Trust Points */}
            <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">Residential Focus</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Dedicated equipment for single-family homes &amp; condos.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">Upfront Scheduling</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Fast coordination with local technicians in your region.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">Clear Pricing</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Quotes provided in advance before work starts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
