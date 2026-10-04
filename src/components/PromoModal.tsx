import React, { useState, useEffect } from 'react';
import { X, Sparkles, Tag, ArrowRight, ShieldCheck, CheckCircle2, Clock, Copy, Check } from 'lucide-react';
import { useCountdown } from '../utils/useCountdown';
import { PROMO_COUPON_CODE, EXPIRED_MESSAGE } from '../../lib/pricing';

interface PromoModalProps {
  onClaimOffer: (couponCode?: string) => void;
}

export const PromoModal: React.FC<PromoModalProps> = ({ onClaimOffer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const countdown = useCountdown();

  useEffect(() => {
    // Check if user has already seen or closed the promo in this session
    try {
      const hasSeenPromo = sessionStorage.getItem('fresh_breeze_promo_shown');
      if (hasSeenPromo) {
        return;
      }
    } catch {
      // Ignore sessionStorage errors in restricted environments
    }

    // Show after 2.5 second delay
    const timer = setTimeout(() => {
      setIsOpen(true);
      try {
        sessionStorage.setItem('fresh_breeze_promo_shown', 'true');
      } catch {
        // Ignore
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleClaim = () => {
    if (countdown.isExpired) return;
    setIsOpen(false);
    onClaimOffer(PROMO_COUPON_CODE);
  };

  const handleCopyCode = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      navigator.clipboard.writeText(PROMO_COUPON_CODE);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/45 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="October Special — 40% OFF"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-md sm:max-w-lg bg-white/92 backdrop-blur-xl rounded-3xl shadow-[0_24px_60px_-12px_rgba(2,132,199,0.3),0_0_0_1px_rgba(255,255,255,0.9)_inset] border border-white/80 overflow-hidden transform transition-all duration-300 animate-in zoom-in-95 scale-100 text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Subtle decorative background breeze & airflow pattern */}
        <div className="absolute top-0 right-0 left-0 h-48 bg-linear-to-br from-sky-600 via-sky-700 to-emerald-700 pointer-events-none overflow-hidden">
          {/* Airflow waves overlay */}
          <svg 
            className="absolute inset-0 w-full h-full opacity-20" 
            viewBox="0 0 400 180" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path d="M-20 60 C 80 20, 180 120, 320 50 C 370 20, 420 80, 450 60" stroke="#ffffff" strokeWidth="14" strokeLinecap="round" />
            <path d="M-20 110 C 90 60, 200 160, 340 90 C 390 60, 440 120, 460 90" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />
            <path d="M-20 150 C 100 100, 220 180, 360 120 C 400 100, 440 140, 470 120" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
          </svg>
          {/* Subtle animated floating sparkle dots */}
          <div className="absolute top-6 left-8 w-2 h-2 rounded-full bg-white/70 animate-ping" />
          <div className="absolute top-12 right-16 w-1.5 h-1.5 rounded-full bg-emerald-200/80 animate-pulse" />
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close promotion dialog"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/25 hover:bg-black/40 text-white flex items-center justify-center transition-colors backdrop-blur-xs cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header content inside the colored banner */}
        <div className="relative pt-6 px-6 sm:px-8 text-center text-white">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-sky-100 text-xs font-bold uppercase tracking-wider shadow-inner mb-1.5 border border-white/20">
            <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>October Special</span>
          </div>

          {/* Large, 3D-styled 40% OFF */}
          <div className="py-0.5">
            <span className="block text-5xl sm:text-6xl font-black tracking-tight font-display text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
              40% OFF
            </span>
          </div>

          <p className="text-white/95 font-bold text-sm sm:text-base mt-0.5 tracking-tight drop-shadow-xs">
            Save 40% on Your Cleaning Service
          </p>

          {/* Coupon Code Pill */}
          <div className="mt-2.5 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-xs text-white">
            <span className="text-white/80 font-medium">Coupon Code:</span>
            <span className="font-mono font-extrabold tracking-wider bg-white/25 px-2 py-0.5 rounded text-white text-xs sm:text-sm">
              {PROMO_COUPON_CODE}
            </span>
            <button
              onClick={handleCopyCode}
              type="button"
              className="ml-1 p-1 hover:bg-white/20 rounded transition-colors text-white/90 hover:text-white cursor-pointer"
              title="Copy coupon code"
              aria-label="Copy coupon code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Card Body */}
        <div className="relative bg-white pt-5 pb-6 sm:pb-7 px-6 sm:px-8 mt-3 rounded-t-3xl shadow-[0_-8px_20px_rgba(0,0,0,0.06)] space-y-4">
          
          {/* Live Countdown Display */}
          <div className={`p-3.5 rounded-2xl border text-center transition-all ${
            countdown.isExpired 
              ? 'bg-rose-50 border-rose-200 text-rose-800' 
              : 'bg-slate-50 border-slate-200/90 text-slate-800'
          }`}>
            <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider mb-2">
              <Clock className={`w-3.5 h-3.5 ${countdown.isExpired ? 'text-rose-600' : 'text-sky-600'}`} />
              <span>
                {countdown.isExpired ? 'Offer Expired' : 'October Promotion Ends In'}
              </span>
            </div>

            {countdown.isExpired ? (
              <div className="space-y-1">
                <span className="inline-block px-3 py-1 rounded-full bg-rose-100 text-rose-800 font-extrabold text-sm sm:text-base">
                  Offer Expired
                </span>
                <p className="text-xs text-rose-700 font-medium">
                  {EXPIRED_MESSAGE}
                </p>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
                  <div className="bg-white rounded-xl p-2 shadow-xs border border-slate-200/80">
                    <span className="block text-lg sm:text-xl font-black text-slate-900 font-mono">
                      {countdown.days}
                    </span>
                    <span className="block text-[10px] font-bold text-slate-500 uppercase">Days</span>
                  </div>
                  <div className="bg-white rounded-xl p-2 shadow-xs border border-slate-200/80">
                    <span className="block text-lg sm:text-xl font-black text-slate-900 font-mono">
                      {String(countdown.hours).padStart(2, '0')}
                    </span>
                    <span className="block text-[10px] font-bold text-slate-500 uppercase">Hours</span>
                  </div>
                  <div className="bg-white rounded-xl p-2 shadow-xs border border-slate-200/80">
                    <span className="block text-lg sm:text-xl font-black text-slate-900 font-mono">
                      {String(countdown.minutes).padStart(2, '0')}
                    </span>
                    <span className="block text-[10px] font-bold text-slate-500 uppercase">Mins</span>
                  </div>
                  <div className="bg-white rounded-xl p-2 shadow-xs border border-slate-200/80">
                    <span className="block text-lg sm:text-xl font-black text-sky-600 font-mono">
                      {String(countdown.seconds).padStart(2, '0')}
                    </span>
                    <span className="block text-[10px] font-bold text-slate-500 uppercase">Secs</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Expires October 31, 2026 at 11:59:59 PM EDT (America/New_York)
                </p>
              </div>
            )}
          </div>

          {/* Value inclusions pill list */}
          <div className="bg-sky-50/70 border border-sky-100 rounded-2xl p-3.5 space-y-2 text-xs sm:text-sm text-slate-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Valid on Air Duct ($149.40), Dryer Vent ($149.40) &amp; Chimney ($167.40)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Free quote with zero obligation for homeowners</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-1">
            {/* Primary Claim Button */}
            {countdown.isExpired ? (
              <button
                disabled
                className="w-full py-4 px-6 rounded-2xl bg-slate-300 text-slate-500 font-extrabold text-base tracking-wide cursor-not-allowed flex items-center justify-center gap-2 border border-slate-300"
              >
                <span>Offer Expired</span>
              </button>
            ) : (
              <button
                onClick={handleClaim}
                className="w-full py-4 px-6 rounded-2xl bg-linear-to-r from-emerald-600 via-emerald-600 to-sky-600 hover:from-emerald-700 hover:via-emerald-700 hover:to-sky-700 active:scale-[0.99] text-white font-extrabold text-base tracking-wide shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:shadow-emerald-600/30 transition-all flex items-center justify-center gap-2.5 cursor-pointer border border-emerald-500/30"
              >
                <Tag className="w-5 h-5 text-emerald-200" />
                <span>CLAIM 40% OFF WITH FRESHOCT</span>
                <ArrowRight className="w-4 h-4 text-emerald-100" />
              </button>
            )}

            {/* Second Option: Maybe Later */}
            <button
              onClick={handleClose}
              className="w-full py-2 text-xs sm:text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors text-center cursor-pointer"
            >
              Maybe Later
            </button>
          </div>

          {/* Trust guarantee badge */}
          <div className="pt-0.5 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Honest, upfront pricing for residential homeowners across the USA</span>
          </div>
        </div>
      </div>
    </div>
  );
};
