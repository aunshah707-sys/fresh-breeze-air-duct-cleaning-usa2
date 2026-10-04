import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  FileText, 
  CalendarClock, 
  CreditCard, 
  RefreshCw, 
  AlertTriangle, 
  UserCheck, 
  ShieldAlert, 
  Globe, 
  Mail, 
  Phone,
  CheckCircle2
} from 'lucide-react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { updateDocumentSEO } from '../utils/seo';
import { BUSINESS_NAME, BUSINESS_EMAIL, MAILTO_URL } from '../utils/constants';

interface TermsAndConditionsProps {
  onBackToHome: () => void;
  onOpenCall?: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ 
  onBackToHome,
  onOpenCall,
  theme,
  onToggleTheme 
}) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    updateDocumentSEO({
      title: `Terms & Conditions | ${BUSINESS_NAME}`,
      description: 'Terms and conditions for residential cleaning services, estimates, and appointments with Fresh Breeze Air Duct Cleaning USA.',
      canonicalPath: '/terms',
    });
    return () => {
      updateDocumentSEO({
        title: 'Fresh Breeze Air Duct Cleaning USA | Air Duct & Vent Cleaning',
        description: 'Fresh Breeze provides professional air duct cleaning, dryer vent cleaning, HVAC cleaning, and chimney cleaning services across the USA. Request a free quote today.',
        canonicalPath: '/',
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-sky-700 dark:hover:text-sky-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-3">
            {theme && onToggleTheme && (
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            )}
            <a href="#home" onClick={(e) => { e.preventDefault(); onBackToHome(); }}>
              <Logo size="sm" />
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-10 md:p-12 space-y-10">
          
          {/* Header Title */}
          <div className="border-b border-slate-200 dark:border-slate-800 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 text-xs font-semibold mb-3 border border-sky-100 dark:border-sky-800/80">
              <FileText className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span>Standard Service Agreement</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
              Terms &amp; Conditions
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              Last updated: October 2026 • {BUSINESS_NAME}
            </p>
          </div>

          {/* Introduction */}
          <section className="space-y-3">
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Welcome to <strong className="text-slate-900 dark:text-white">{BUSINESS_NAME}</strong>. These Terms &amp; Conditions govern the use of our website, service inquiry tools, and the residential cleaning services provided by our team, including air duct cleaning, dryer vent cleaning, HVAC cleaning, and chimney cleaning.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              By accessing our website, requesting a quote, scheduling an appointment, or receiving services from {BUSINESS_NAME}, you acknowledge that you have read, understood, and agree to be bound by these general terms.
            </p>
          </section>

          {/* 1. Service Terms */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
              <FileText className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <h2>1. Service Terms</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {BUSINESS_NAME} offers specialized residential ventilation, ductwork, dryer vent, HVAC component, and chimney cleaning solutions. All services are performed in accordance with standard industry practices, manufacturer recommendations where applicable, and our standard operating procedures.
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Our technicians inspect the accessible portions of the designated system before and during service.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Services are intended for cleaning and maintenance of existing, structurally sound ventilation systems.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Any pre-existing structural issues, severe rust, duct collapse, or hazardous conditions will be reported to the homeowner.</span>
              </li>
            </ul>
          </section>

          {/* 2. Appointments & Scheduling */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
              <CalendarClock className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <h2>2. Appointments &amp; Scheduling</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Service appointments and arrival windows are scheduled through our online forms, direct telephone communication, or email correspondence. While we make every effort to arrive within designated arrival time windows, unforeseen factors such as inclement weather, heavy traffic, or extended prior jobs may occasionally cause delays. Our team will communicate any necessary scheduling adjustments promptly.
            </p>
          </section>

          {/* 3. Pricing & Payments */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
              <CreditCard className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <h2>3. Pricing &amp; Payments</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Estimates provided via our online quote form or telephone consultations are based on the information supplied by the customer regarding home size, number of vents, furnace units, and duct layout. Final pricing is confirmed with the homeowner on-site prior to commencing work.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Payment is due upon successful completion of the agreed-upon services on the day of work, unless alternate arrangements have been agreed to in advance. We accept standard payment methods as communicated by our dispatch team.
            </p>
          </section>

          {/* 4. Cancellations & Rescheduling */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
              <RefreshCw className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <h2>4. Cancellations &amp; Rescheduling</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We understand that schedules change. If you need to reschedule or cancel a service appointment, we kindly ask for reasonable advance notice prior to your scheduled arrival window so that we may adjust our technicians' routes accordingly. You may reschedule by contacting us directly by phone or email.
            </p>
          </section>

          {/* 5. Service Limitations */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
              <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h2>5. Service Limitations</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Our cleaning procedures are limited to accessible ductwork, vents, registers, and components. {BUSINESS_NAME} is not responsible for cleaning areas that are physically inaccessible, sealed inside permanent wall structures without access panels, or in unsafe condition.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Air duct cleaning is a maintenance service to remove accumulated dust, particulates, and debris; it does not replace professional HVAC mechanical repairs, system redesign, or major ductwork reconstruction.
            </p>
          </section>

          {/* 6. Customer Responsibilities */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
              <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h2>6. Customer Responsibilities</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              To allow our technicians to work safely and efficiently, customers are responsible for:
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/60 p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Providing safe, unobstructed access to all vents, furnace rooms, utility closets, dryer areas, and chimneys.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Ensuring that an adult authorized to approve service and payment is present on the premises during work.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>Securing pets and clearing fragile items from immediate work paths.</span>
              </li>
            </ul>
          </section>

          {/* 7. Liability & Disclaimers */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
              <ShieldAlert className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <h2>7. Liability &amp; Disclaimers</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {BUSINESS_NAME} carries standard general liability insurance and operates with professional equipment and trained personnel.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              To the fullest extent permitted by applicable law, {BUSINESS_NAME} shall not be liable for pre-existing system damage, degraded or brittle flex ducting that fails under normal handling, pre-existing mechanical malfunctions of HVAC units or clothes dryers, or indirect or consequential damages. If any accidental damage occurs during the performance of services due to our direct negligence, it must be reported to our management within forty-eight (48) hours of service completion for inspection.
            </p>
          </section>

          {/* 8. Website Use */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
              <Globe className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <h2>8. Website Use &amp; Intellectual Property</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              All content on this website, including text, graphics, logos, images, and software, is the property of {BUSINESS_NAME} or its content suppliers and is protected by copyright and intellectual property laws. You agree to use the website solely for lawful purposes, such as learning about our services, requesting quotes, or contacting our dispatch team.
            </p>
          </section>

          {/* 9. Contact Information */}
          <section className="space-y-4">
            <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
              <Mail className="w-5 h-5 text-sky-600 dark:text-sky-400" />
              <h2>9. Contact Information</h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              If you have any questions regarding these Terms &amp; Conditions or wish to discuss an upcoming service appointment, please contact us:
            </p>
            <div className="bg-slate-50 dark:bg-slate-800/70 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700 space-y-3 text-xs sm:text-sm">
              <div className="font-bold text-slate-900 dark:text-white">{BUSINESS_NAME}</div>
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                <Mail className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                <span>Email: </span>
                <a 
                  href={MAILTO_URL} 
                  className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium underline underline-offset-2"
                >
                  {BUSINESS_EMAIL}
                </a>
              </div>
              {onOpenCall && (
                <div className="pt-2">
                  <button
                    onClick={onOpenCall}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-semibold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Request Callback Dispatch</span>
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Back button at the bottom */}
          <div className="border-t border-slate-200 dark:border-slate-800 pt-6 flex justify-between items-center">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              © {new Date().getFullYear()} {BUSINESS_NAME}
            </span>
          </div>

        </div>
      </main>
    </div>
  );
};
