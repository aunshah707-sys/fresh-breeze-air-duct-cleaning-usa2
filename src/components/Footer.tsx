import React from 'react';
import { Logo } from './Logo';
import { Mail, Instagram, Facebook, ArrowUp, Phone, ShieldCheck } from 'lucide-react';
import { 
  BUSINESS_NAME, 
  BUSINESS_EMAIL, 
  MAILTO_URL, 
  INSTAGRAM_URL, 
  FACEBOOK_URL 
} from '../utils/constants';
import { trackContactClick, trackCtaClick } from '../utils/analytics';

interface FooterProps {
  onOpenQuote: () => void;
  onOpenCall: () => void;
  onOpenPrivacyPolicy: () => void;
  onOpenTerms: () => void;
  onNavigateToService?: (serviceSlug: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenQuote, 
  onOpenCall, 
  onOpenPrivacyPolicy,
  onOpenTerms,
  onNavigateToService,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#home" className="inline-block">
              <Logo variant="white" size="md" />
            </a>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Professional residential Air Duct Cleaning, Dryer Vent Cleaning, HVAC Cleaning and Chimney Cleaning services.
            </p>
            <div className="pt-1 text-xs font-semibold text-emerald-400">
              Air Duct Cleaning • Dryer Vent Cleaning • HVAC Cleaning • Chimney Cleaning
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactClick('instagram', 'Instagram Profile', 'Footer')}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-gradient-to-tr hover:from-purple-600 hover:to-pink-500 text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-xs"
                aria-label="Visit Fresh Breeze on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackContactClick('facebook', 'Facebook Page', 'Footer')}
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-[#1877F2] text-slate-300 hover:text-white flex items-center justify-center transition-all shadow-xs"
                aria-label="Visit Fresh Breeze on Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white transition-colors">
                  Why Fresh Breeze
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenQuote}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacyPolicy}
                  className="hover:text-white transition-colors text-left font-medium text-sky-400 hover:underline cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenTerms}
                  className="hover:text-white transition-colors text-left font-medium text-sky-400 hover:underline cursor-pointer"
                >
                  Terms &amp; Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a 
                  href="/services/air-duct-cleaning" 
                  onClick={(e) => {
                    if (onNavigateToService) {
                      e.preventDefault();
                      onNavigateToService('air-duct-cleaning');
                    }
                  }}
                  className="hover:text-sky-300 transition-colors"
                >
                  Air Duct Cleaning
                </a>
              </li>
              <li>
                <a 
                  href="/services/dryer-vent-cleaning" 
                  onClick={(e) => {
                    if (onNavigateToService) {
                      e.preventDefault();
                      onNavigateToService('dryer-vent-cleaning');
                    }
                  }}
                  className="hover:text-sky-300 transition-colors"
                >
                  Dryer Vent Cleaning
                </a>
              </li>
              <li>
                <a 
                  href="/services/hvac-cleaning" 
                  onClick={(e) => {
                    if (onNavigateToService) {
                      e.preventDefault();
                      onNavigateToService('hvac-cleaning');
                    }
                  }}
                  className="hover:text-sky-300 transition-colors"
                >
                  HVAC Cleaning
                </a>
              </li>
              <li>
                <a 
                  href="/services/chimney-cleaning" 
                  onClick={(e) => {
                    if (onNavigateToService) {
                      e.preventDefault();
                      onNavigateToService('chimney-cleaning');
                    }
                  }}
                  className="hover:text-sky-300 transition-colors"
                >
                  Chimney Cleaning
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Contact
            </h4>
            <div className="space-y-3.5 text-xs">
              {/* Clickable Business Email */}
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-medium">Business Email</span>
                <a
                  href={MAILTO_URL}
                  onClick={() => trackContactClick('email', BUSINESS_EMAIL, 'Footer')}
                  className="font-medium text-sky-300 hover:text-sky-200 transition-colors flex items-center gap-1.5 mt-1 break-all"
                  title="Click to email Fresh Breeze"
                >
                  <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{BUSINESS_EMAIL}</span>
                </a>
              </div>

              {/* Direct Phone Callback */}
              <div>
                <span className="text-[10px] text-slate-400 block uppercase font-medium">Direct Scheduling</span>
                <button
                  onClick={() => {
                    trackCtaClick('REQUEST A CALLBACK', 'Footer');
                    onOpenCall();
                  }}
                  className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5 mt-1 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>REQUEST A CALLBACK</span>
                </button>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    trackCtaClick('GET A FREE QUOTE', 'Footer');
                    onOpenQuote();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-linear-to-r from-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white font-bold text-xs text-center transition-all shadow-sm cursor-pointer"
                >
                  GET A FREE QUOTE
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Legal links */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} {BUSINESS_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-4 sm:gap-5 flex-wrap justify-center">
            <button
              onClick={onOpenPrivacyPolicy}
              className="text-slate-400 hover:text-slate-200 underline underline-offset-2 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700" aria-hidden="true">•</span>
            <button
              onClick={onOpenTerms}
              className="text-slate-400 hover:text-slate-200 underline underline-offset-2 transition-colors cursor-pointer"
            >
              Terms &amp; Conditions
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
