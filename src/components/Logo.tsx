import React, { useState } from 'react';
import officialLogo from '../assets/images/fresh_breeze_official_logo_1791042495694.jpg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', variant = 'default' }) => {
  const [imageError, setImageError] = useState(false);

  // Height mappings based on size
  const heightClasses = {
    sm: 'h-9 sm:h-10',
    md: 'h-11 sm:h-13',
    lg: 'h-14 sm:h-16',
  };

  const isDarkBg = variant === 'white';

  if (imageError) {
    /* Fallback vector emblem */
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <svg viewBox="0 0 200 200" className="w-10 h-10 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="82" stroke="#0284c7" strokeWidth="8" strokeDasharray="320 200" strokeLinecap="round" />
          <circle cx="100" cy="100" r="82" stroke="#22c55e" strokeWidth="8" strokeDasharray="130 390" strokeDashoffset="-320" strokeLinecap="round" />
          <path d="M62 78L100 48L138 78V82H62V78Z" fill="#0f3d6c" />
          <rect x="87" y="65" width="11" height="11" rx="1.5" fill="#38bdf8" />
          <rect x="102" y="65" width="11" height="11" rx="1.5" fill="#38bdf8" />
          <rect x="87" y="79" width="11" height="11" rx="1.5" fill="#38bdf8" />
          <rect x="102" y="79" width="11" height="11" rx="1.5" fill="#38bdf8" />
          <path d="M34 104C56 94 88 102 110 118" stroke="#0284c7" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="137" cy="100" rx="18" ry="24" fill="#0f3d6c" stroke="#38bdf8" strokeWidth="2.5" />
        </svg>
        <div className="flex flex-col text-left">
          <span className={`font-display font-black text-base uppercase tracking-tight ${isDarkBg ? 'text-white' : 'text-[#0f3d6c]'}`}>
            FRESH BREEZE
          </span>
          <span className="font-display font-bold text-[10px] uppercase tracking-widest text-emerald-500">
            AIR DUCT CLEANING USA
          </span>
        </div>
      </div>
    );
  }

  // When rendered on a dark background (such as the footer), enclose the original logo
  // in a crisp, rounded white badge so the original colors, text, and circular emblem pop
  // without any inversion or empty white placeholder box
  if (isDarkBg) {
    return (
      <div className={`inline-flex items-center ${className}`}>
        <div className="bg-white px-3 py-1.5 rounded-xl shadow-xs inline-flex items-center justify-center border border-white/20 hover:border-sky-400 transition-colors">
          <img
            src={officialLogo}
            alt="Fresh Breeze Air Duct Cleaning USA logo"
            onError={() => setImageError(true)}
            className={`${heightClasses[size]} w-auto object-contain shrink-0`}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center ${className}`}>
      <img
        src={officialLogo}
        alt="Fresh Breeze Air Duct Cleaning USA logo"
        onError={() => setImageError(true)}
        className={`${heightClasses[size]} w-auto object-contain shrink-0`}
      />
    </div>
  );
};
