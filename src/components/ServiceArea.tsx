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
    <section id="service-area" className="py-16 sm:py-24 bg-linear-to-b from-sky-50/30 via-white to-sky-50/40 dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 relative w-full max-w-full overflow-hidden transition-colors duration-200">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-sky-400/10 via-emerald-400/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full relative z-10">
        <div className="max-w-4xl mx-auto glass-surface rounded-3xl border border-white/80 dark:border-white/10 shadow-[0_20px_50px_rgba(2,132,199,0.08),0_1px_2px_rgba(0,0,0,0.04),0_0_0_1px_rgba(255,255,255,0.9)_inset] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden w-full max-w-full">
          <div className="p-6 sm:p-10 md:p-12 text-center w-full max-w-full">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 glass-pill px-3.5 py-1.5 rounded-full text-xs font-bold text-sky-800 dark:text-sky-300 uppercase tracking-widest mb-3.5 shadow-2xs">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Nationwide Coverage</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight font-display text-balance">
              Serving Homeowners Across the USA
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              We connect homeowners with dependable, high-standard air duct and dryer vent cleaning solutions.
            </p>

            <div className="mt-3 inline-block px-3.5 sm:px-4 py-1.5 rounded-full bg-white/70 dark:bg-sky-950/60 backdrop-blur-md text-sky-800 dark:text-sky-300 text-xs sm:text-sm font-semibold border border-sky-200/70 dark:border-sky-800/60 text-center max-w-full shadow-2xs">
              Contact us to confirm service availability in your area.
            </div>

            {/* Interactive ZIP / Location Box */}
            <div className="mt-8 max-w-lg mx-auto w-full">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5 w-full">
                <div className="relative grow min-w-0">
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
                    placeholder="Enter 5-Digit ZIP or City, State"
                    aria-label="Search service availability by 5-digit ZIP code or City, State"
                    className="w-full pl-10 pr-4 py-3.5 rounded-2xl border border-white/90 dark:border-slate-700 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-400/40 focus:border-sky-500 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 shadow-2xs transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="btn-gradient-primary w-full sm:w-auto px-6 py-3.5 rounded-2xl text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                >
                  <span>Check Availability</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {checkedResult && (
                <div className="mt-3.5 p-3.5 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/80 backdrop-blur-md border border-emerald-300/80 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 text-xs flex items-center gap-2.5 animate-in fade-in shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="font-medium">{checkedResult}</span>
                </div>
              )}

              <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400">
                Residential service availability confirmed quickly with our local dispatch network.
              </p>
            </div>

            {/* Trust Points */}
            <div className="mt-10 pt-8 border-t border-slate-200/60 dark:border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left w-full">
              <div className="glass-surface p-3.5 rounded-2xl border border-white/80 dark:border-white/10 flex items-start gap-2.5 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">Residential Focus</h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">Dedicated equipment for single-family homes &amp; condos.</p>
                </div>
              </div>
              <div className="glass-surface p-3.5 rounded-2xl border border-white/80 dark:border-white/10 flex items-start gap-2.5 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">Upfront Scheduling</h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">Fast coordination with local technicians in your region.</p>
                </div>
              </div>
              <div className="glass-surface p-3.5 rounded-2xl border border-white/80 dark:border-white/10 flex items-start gap-2.5 shadow-2xs">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white">Clear Pricing</h3>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">Quotes provided in advance before work starts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
