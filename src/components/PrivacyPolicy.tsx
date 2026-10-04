import React, { useEffect } from 'react';
import { ArrowLeft, Shield, Lock, Eye, Mail, Server, Phone, CheckCircle2 } from 'lucide-react';
import { Logo } from './Logo';
import { BUSINESS_EMAIL, MAILTO_URL } from '../utils/constants';

interface PrivacyPolicyProps {
  onBackToHome: () => void;
}

export const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBackToHome }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Privacy Policy | Fresh Breeze Air Duct Cleaning USA';
    return () => {
      document.title = 'Fresh Breeze Air Duct Cleaning USA | Air Duct, Dryer Vent, HVAC & Chimney Cleaning';
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-sky-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <a href="#home" onClick={(e) => { e.preventDefault(); onBackToHome(); }}>
            <Logo size="sm" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 md:p-12 space-y-8">
          {/* Header */}
          <div className="border-b border-slate-200 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold mb-3 border border-sky-100">
              <Shield className="w-3.5 h-3.5 text-sky-600" />
              <span>Customer Privacy &amp; Data Transparency</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Last updated: October 2026 • Fresh Breeze Air Duct Cleaning USA
            </p>
          </div>

          {/* Introduction */}
          <section className="space-y-3">
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              At <strong className="text-slate-900">Fresh Breeze Air Duct Cleaning USA</strong>, we value your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains what information we collect when you visit our website, request a quote, or ask for a callback, and how that information is handled.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 font-display">
              <Eye className="w-5 h-5 text-sky-600" />
              <h2>1. Information We Collect</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When you submit a contact form, request a callback, or ask for a free cleaning estimate on our website, we may collect the following personal details:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Full Name:</strong> To address you personally and identify your service inquiry.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Phone Number:</strong> To call you back or text appointment confirmations regarding your quote.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Email Address:</strong> To deliver your written cleaning estimates and respond to questions.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Service Request Information:</strong> Selected service (Air Duct Cleaning, Dryer Vent Cleaning, HVAC Cleaning, or Chimney Cleaning), preferred callback times, city, state, or ZIP code, and any optional notes you provide.</span>
              </li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 font-display">
              <Server className="w-5 h-5 text-emerald-600" />
              <h2>2. How Your Information Is Used</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We use the collected details strictly for legitimate residential service operations:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 pl-2">
              <li>Processing and delivering your requested free cleaning quote.</li>
              <li>Returning phone calls at your requested callback time.</li>
              <li>Communicating technician availability in your local neighborhood.</li>
              <li>Answering questions submitted through our online contact forms and email.</li>
            </ul>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We do <strong>not</strong> sell, rent, or trade your personal information to third-party telemarketers or advertisers.
            </p>
          </section>

          {/* Handling Callback and Quote Requests */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 font-display">
              <Phone className="w-5 h-5 text-sky-600" />
              <h2>3. Handling Callback and Quote Requests</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              When you submit a "Request a Callback" or "Free Quote" form, your details are securely transmitted to our dispatch team via our private server. This enables our residential service coordinator to review your request and contact you directly with accurate pricing.
            </p>
          </section>

          {/* Cookies and Storage */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 font-display">
              <Lock className="w-5 h-5 text-emerald-600" />
              <h2>4. Cookies &amp; Browser Storage</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our website uses basic session storage (such as remembering whether the promotional popup was viewed during your visit) to prevent repetitive interruptions. We do not use intrusive tracking cookies to follow your activity across unrelated websites.
            </p>
          </section>

          {/* Third-Party Services and Social Links */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 font-display">
              <Mail className="w-5 h-5 text-sky-600" />
              <h2>5. Third-Party Services &amp; Social Links</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our website includes links to our official social media channels (Instagram and Facebook). When you click these external links, their respective privacy policies apply. We encourage you to review the privacy notices of external platforms.
            </p>
          </section>

          {/* Data Security */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 font-display">
              <Shield className="w-5 h-5 text-emerald-600" />
              <h2>6. Data Security</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We employ standard encryption (HTTPS/SSL) across our website and server-side processing to help protect your contact details from unauthorized access, alteration, or disclosure.
            </p>
          </section>

          {/* User Choices */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 font-display">
              <CheckCircle2 className="w-5 h-5 text-sky-600" />
              <h2>7. User Choices &amp; Managing Your Information</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              You are free to browse our website without submitting any personal information. If you have submitted a request and wish to update your details or request deletion from our records, simply reach out to us at our business email address below.
            </p>
          </section>

          {/* Contact Information */}
          <section className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 font-display">
              <Mail className="w-5 h-5 text-emerald-600" />
              <h2>8. Contact Us Regarding Privacy</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              If you have any questions about this Privacy Policy or how your service request is handled, please contact us at:
            </p>
            <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-100 text-xs sm:text-sm text-slate-800">
              <p className="font-bold text-slate-900">Fresh Breeze Air Duct Cleaning USA</p>
              <p className="mt-1">
                Email:{' '}
                <a
                  href={MAILTO_URL}
                  className="font-bold text-sky-700 hover:text-sky-800 underline underline-offset-2"
                >
                  {BUSINESS_EMAIL}
                </a>
              </p>
              <p className="text-slate-500 text-xs mt-1">Air Duct, Dryer Vent, HVAC &amp; Chimney Cleaning Services</p>
            </div>
          </section>

          {/* Back button at bottom */}
          <div className="pt-6 text-center">
            <button
              onClick={onBackToHome}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
            >
              ← Back to Main Website
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
