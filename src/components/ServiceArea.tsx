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
    <section id="service-area" className="py-16 sm:py-20 bg-linear-to-b from-white via-sky-50/40 to-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-sky-100 shadow-xl overflow-hidden">
          <div className="p-8 sm:p-12 text-center">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-widest mb-3">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Nationwide Coverage</span>
            </div>

            {/* Headline as requested */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
              Serving Homeowners Across the USA
            </h2>

            {/* Mandatory instruction copy */}
            <p className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              We connect homeowners with dependable, high-standard air duct and dryer vent cleaning solutions.
            </p>

            <div className="mt-2 inline-block px-4 py-1.5 rounded-full bg-sky-50 text-sky-800 text-xs sm:text-sm font-semibold border border-sky-200/60">
              Contact us to confirm service availability in your area.
            </div>

            {/* Interactive ZIP / Location Box */}
            <div className="mt-8 max-w-lg mx-auto">
              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
                <div className="relative grow">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
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
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-slate-50/50 shadow-2xs"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 active:bg-sky-800 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0"
                >
                  <span>Check Availability</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {checkedResult && (
                <div className="mt-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{checkedResult}</span>
                </div>
              )}

              <p className="mt-3 text-[11px] text-slate-400">
                Residential service availability confirmed quickly with our local dispatch network.
              </p>
            </div>

            {/* Trust Points */}
            <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Residential Focus</h4>
                  <p className="text-[11px] text-slate-500">Dedicated equipment for single-family homes &amp; condos.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Upfront Scheduling</h4>
                  <p className="text-[11px] text-slate-500">Fast coordination with local technicians in your region.</p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Clear Pricing</h4>
                  <p className="text-[11px] text-slate-500">Quotes provided in advance before work starts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
