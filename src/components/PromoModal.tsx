import React, { useState, useEffect } from 'react';
import { X, Sparkles, Tag, ArrowRight, ShieldCheck, CheckCircle2, Clock, Copy, Check } from 'lucide-react';
import { useCountdown } from '../utils/useCountdown';
import { PROMO_COUPON_CODE } from '../../lib/pricing';

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
    setIsOpen(false);
    onClaimOffer(PROMO_COUPON_CODE);
  };

  const handleCopyCode = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(PROMO_COUPON_CODE);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = PROMO_COUPON_CODE;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/35 dark:bg-slate-950/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in overflow-y-auto w-full"
      role="dialog"
      aria-modal="true"
      aria-label="November Special — 40% OFF"
      onClick={handleClose}
    >
      <div 
        className="relative w-[90vw] max-w-[380px] max-h-[75dvh] bg-white/85 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(2,132,199,0.25),inset_0_1px_1px_rgba(255,255,255,0.95)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.7)] border border-white/90 dark:border-white/10 overflow-hidden transform transition-all duration-300 animate-in zoom-in-95 scale-100 text-left my-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Liquid Glass Gradient Header */}
        <div className="relative pt-4 pb-3 px-5 text-center bg-gradient-to-br from-sky-500/90 via-sky-600/90 to-emerald-600/90 text-white shrink-0 border-b border-white/20">
          {/* Close Button */}
          <button
            onClick={handleClose}
            aria-label="Close promotion dialog"
            className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-black/20 hover:bg-black/35 text-white flex items-center justify-center transition-colors backdrop-blur-xs cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-white"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Special Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10.5px] font-extrabold uppercase tracking-wider mb-1 border border-white/30">
            <Sparkles className="w-3 h-3 text-emerald-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>NOVEMBER SPECIAL</span>
          </div>

          {/* 40% OFF */}
          <div className="text-3xl sm:text-4xl font-black tracking-tight font-display text-white drop-shadow-sm leading-none py-0.5">
            40% OFF
          </div>

          <p className="text-white/95 font-bold text-xs mt-0.5 drop-shadow-xs">
            Save 40% on Your Cleaning Service
          </p>

          {/* Coupon Code Pill */}
          <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-xs text-white">
            <span className="text-white/80 font-medium text-[11px]">Code:</span>
            <span className="font-mono font-extrabold tracking-wider bg-white/25 px-1.5 py-0.5 rounded text-white text-xs">
              {PROMO_COUPON_CODE}
            </span>
            <button
              onClick={handleCopyCode}
              type="button"
              className="p-1 hover:bg-white/20 rounded transition-colors text-white/90 hover:text-white cursor-pointer"
              title="Copy coupon code"
              aria-label="Copy coupon code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Scrollable Content Body with Compact Spacing */}
        <div className="p-4 space-y-3 overflow-y-auto grow min-w-0 bg-white/60 dark:bg-slate-900/60">
          
          {/* Compact Live Countdown Display */}
          <div className="p-2.5 rounded-2xl bg-sky-50/70 dark:bg-slate-800/60 border border-sky-100 dark:border-slate-700/80 text-center">
            <div className="flex items-center justify-center gap-1.5 text-[10.5px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider mb-1.5">
              <Clock className="w-3 h-3 text-sky-600 dark:text-sky-400" />
              <span>Offer Ends In</span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 max-w-[240px] mx-auto text-center">
              <div className="bg-white/90 dark:bg-slate-800 rounded-lg py-1 px-1 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                <span className="block text-sm font-black text-slate-900 dark:text-white font-mono leading-none">
                  {countdown.days}
                </span>
                <span className="block text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase mt-0.5">Days</span>
              </div>
              <div className="bg-white/90 dark:bg-slate-800 rounded-lg py-1 px-1 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                <span className="block text-sm font-black text-slate-900 dark:text-white font-mono leading-none">
                  {String(countdown.hours).padStart(2, '0')}
                </span>
                <span className="block text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase mt-0.5">Hours</span>
              </div>
              <div className="bg-white/90 dark:bg-slate-800 rounded-lg py-1 px-1 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                <span className="block text-sm font-black text-slate-900 dark:text-white font-mono leading-none">
                  {String(countdown.minutes).padStart(2, '0')}
                </span>
                <span className="block text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase mt-0.5">Mins</span>
              </div>
              <div className="bg-white/90 dark:bg-slate-800 rounded-lg py-1 px-1 border border-slate-200/80 dark:border-slate-700 shadow-2xs">
                <span className="block text-sm font-black text-sky-600 dark:text-sky-400 font-mono leading-none">
                  {String(countdown.seconds).padStart(2, '0')}
                </span>
                <span className="block text-[9px] font-bold text-slate-500 dark:text-slate-400 uppercase mt-0.5">Secs</span>
              </div>
            </div>
          </div>

          {/* Value Inclusions */}
          <div className="bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 rounded-xl p-2.5 space-y-1.5 text-[11px] text-slate-700 dark:text-slate-200">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Air Duct ($149.40), Dryer ($149.40) &amp; Chimney ($167.40)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>100% Free upfront quote &amp; zero obligation</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-1.5 pt-1">
            {/* Primary Claim Button (Cyan to Emerald gradient) */}
            <button
              onClick={handleClaim}
              className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-sky-500 via-sky-600 to-emerald-500 hover:from-sky-400 hover:via-sky-500 hover:to-emerald-400 active:scale-[0.99] text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-[0_4px_16px_rgba(2,132,199,0.35)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.45)] transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/20"
            >
              <Tag className="w-4 h-4 text-emerald-100" />
              <span>Claim Your Offer</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-100" />
            </button>

            {/* Maybe Later */}
            <button
              onClick={handleClose}
              className="w-full py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors text-center cursor-pointer"
            >
              Maybe Later
            </button>
          </div>

          {/* Guarantee */}
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 dark:text-slate-400 text-center pt-0.5">
            <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
            <span>Honest, upfront residential pricing across the USA</span>
          </div>
        </div>
      </div>
    </div>
  );
};
