import React, { useState, useEffect } from 'react';
import { 
  Send, 
  CheckCircle2, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Wrench, 
  Calendar, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  X, 
  RotateCcw,
  Tag,
  ShieldCheck
} from 'lucide-react';
import { 
  getServiceRegularPrice, 
  PROMO_COUPON_CODE, 
  PricingResult,
  calculatePricing 
} from '../../lib/pricing';
import { trackLeadSubmission } from '../utils/analytics';

interface FreeQuoteFormProps {
  initialService?: string;
  initialLocation?: string;
  appliedPromo?: string;
  onClearPromo?: () => void;
  isModal?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

export const FreeQuoteForm: React.FC<FreeQuoteFormProps> = ({
  initialService = '',
  initialLocation = '',
  appliedPromo = '',
  isModal = false,
  isOpen = false,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    zipCode: '',
    serviceNeeded: 'Air Duct Cleaning',
    email: '',
    preferredDate: '',
    message: '',
  });

  const [showOptionalDetails, setShowOptionalDetails] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [quoteReferenceId, setQuoteReferenceId] = useState('');
  const [submittedPricing, setSubmittedPricing] = useState<PricingResult | null>(null);

  // Determine active coupon (e.g. FRESH40 passed via Claim Offer)
  const activeCoupon = (appliedPromo && appliedPromo.trim()) 
    ? (appliedPromo.toUpperCase().includes('FRESH40') || appliedPromo.includes('40') ? PROMO_COUPON_CODE : appliedPromo.trim().toUpperCase())
    : null;

  // Update initial service if changed
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceNeeded: initialService }));
    }
  }, [initialService]);

  // Update initial location (ZIP) if changed
  useEffect(() => {
    if (initialLocation) {
      setFormData((prev) => ({ ...prev, zipCode: initialLocation }));
    }
  }, [initialLocation]);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    } else if (cleanPhone.length < 7) {
      newErrors.phone = 'Please provide a valid phone number.';
    }

    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP Code is required.';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email format.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const generatedId = `FB-${Math.floor(100000 + Math.random() * 900000)}`;
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.name.trim(),
          phone: formData.phone.trim(),
          zipCode: formData.zipCode.trim(),
          cityState: formData.zipCode.trim(),
          serviceNeeded: formData.serviceNeeded,
          email: formData.email.trim() || undefined,
          preferredDate: formData.preferredDate || undefined,
          message: formData.message.trim() || undefined,
          quoteReferenceId: generatedId,
          couponCode: activeCoupon || undefined,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const refId = result.quoteReferenceId || generatedId;
        setQuoteReferenceId(refId);
        if (result.pricing) {
          setSubmittedPricing(result.pricing);
        } else if (activeCoupon) {
          setSubmittedPricing(calculatePricing(formData.serviceNeeded, activeCoupon));
        }
        setIsSubmitted(true);
        trackLeadSubmission({
          leadType: 'quote',
          service: formData.serviceNeeded,
          location: formData.zipCode,
          quoteId: refId,
          hasDiscount: !!activeCoupon,
          value: result.pricing?.finalPrice,
        });
      } else {
        setSubmitError(
          result.error || 'Submission could not be completed. Please call us directly at (737) 282-1351.'
        );
      }
    } catch (err: any) {
      console.error('Quote submission error:', err);
      setSubmitError('Unable to connect to the server. Please check your connection or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmitError(null);
    setSubmittedPricing(null);
    setFormData({
      name: '',
      phone: '',
      zipCode: '',
      serviceNeeded: 'Air Duct Cleaning',
      email: '',
      preferredDate: '',
      message: '',
    });
    setErrors({});
    setShowOptionalDetails(false);
  };

  const idPrefix = isModal ? 'modal-quote' : 'inline-quote';

  const formBody = (
    <div className="w-full text-[#0f172a] dark:text-slate-100">
      {isSubmitted ? (
        /* Clean Confirmation State */
        <div className="p-5 sm:p-8 text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="inline-block px-3 py-1 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 rounded-full text-xs font-semibold mb-2 border border-emerald-200 dark:border-emerald-800">
            Request #{quoteReferenceId}
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] dark:text-white font-display">
            Quote Request Received
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            Thank you, <strong className="text-[#0f172a] dark:text-white">{formData.name}</strong>. We received your request for <strong className="text-[#0f172a] dark:text-white">{formData.serviceNeeded}</strong> (ZIP {formData.zipCode}).
          </p>

          {submittedPricing && (
            <div className="mt-4 max-w-sm mx-auto bg-white dark:bg-slate-800 rounded-xl p-3.5 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-1.5 shadow-xs">
              <div className="flex justify-between text-slate-600 dark:text-slate-300">
                <span>Regular Price</span>
                <span className={submittedPricing.couponValid ? "line-through text-slate-400" : "font-bold text-slate-900 dark:text-white"}>
                  ${submittedPricing.regularPrice.toFixed(2)}
                </span>
              </div>
              {submittedPricing.couponValid && (
                <>
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>40% Offer Discount</span>
                    <span>-${submittedPricing.discountAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-sm pt-1.5 border-t border-slate-200 dark:border-slate-700 text-[#0f172a] dark:text-white">
                    <span>Your Estimate</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-display text-base">
                      ${submittedPricing.finalPrice.toFixed(2)}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}

          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            Our team will contact you at <strong>{formData.phone}</strong> shortly with your upfront estimate and scheduling options.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-sky-600 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close
              </button>
            )}
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Submit Another</span>
            </button>
          </div>
        </div>
      ) : (
        /* Single-step Compact Form */
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3.5">
          {/* Active Promo Notification (if passed) */}
          {activeCoupon && (
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-medium">
              <Tag className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>40% OFF Special Applied (<strong className="font-mono">{activeCoupon}</strong>)</span>
            </div>
          )}

          {/* 4 Required Fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Full Name */}
            <div>
              <label htmlFor={`${idPrefix}-name`} className="block text-xs font-bold text-[#0f172a] dark:text-slate-200 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <input
                  id={`${idPrefix}-name`}
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. John Miller"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-sm text-[#0f172a] dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-colors ${
                    errors.name ? 'border-red-400 bg-red-50/50' : 'border-slate-200 dark:border-slate-700'
                  }`}
                />
              </div>
              {errors.name && <p className="mt-1 text-[11px] text-red-600 dark:text-red-400">{errors.name}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor={`${idPrefix}-phone`} className="block text-xs font-bold text-[#0f172a] dark:text-slate-200 mb-1">
                Phone Number *
              </label>
              <input
                id={`${idPrefix}-phone`}
                type="tel"
                name="phone"
                required
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-sm text-[#0f172a] dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-colors ${
                  errors.phone ? 'border-red-400 bg-red-50/50' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
              {errors.phone && <p className="mt-1 text-[11px] text-red-600 dark:text-red-400">{errors.phone}</p>}
            </div>

            {/* ZIP Code */}
            <div>
              <label htmlFor={`${idPrefix}-zip`} className="block text-xs font-bold text-[#0f172a] dark:text-slate-200 mb-1">
                ZIP Code *
              </label>
              <input
                id={`${idPrefix}-zip`}
                type="text"
                name="zipCode"
                required
                placeholder="e.g. 78701"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                className={`w-full px-3.5 py-2.5 rounded-xl border bg-white dark:bg-slate-800 text-sm text-[#0f172a] dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-colors ${
                  errors.zipCode ? 'border-red-400 bg-red-50/50' : 'border-slate-200 dark:border-slate-700'
                }`}
              />
              {errors.zipCode && <p className="mt-1 text-[11px] text-red-600 dark:text-red-400">{errors.zipCode}</p>}
            </div>

            {/* Service Needed (Clean Service Names ONLY, no prices) */}
            <div>
              <label htmlFor={`${idPrefix}-service`} className="block text-xs font-bold text-[#0f172a] dark:text-slate-200 mb-1">
                Service Needed *
              </label>
              <select
                id={`${idPrefix}-service`}
                name="serviceNeeded"
                value={formData.serviceNeeded}
                onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm text-[#0f172a] dark:text-white font-medium focus:outline-hidden focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-colors cursor-pointer"
              >
                <option value="Air Duct Cleaning">Air Duct Cleaning</option>
                <option value="Dryer Vent Cleaning">Dryer Vent Cleaning</option>
                <option value="Chimney Cleaning">Chimney Cleaning</option>
                <option value="HVAC Cleaning">HVAC Cleaning</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Expandable "Add more details (optional)" Section */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowOptionalDetails(!showOptionalDetails)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 dark:text-sky-400 hover:text-sky-800 dark:hover:text-sky-300 py-1 transition-colors cursor-pointer select-none"
              aria-expanded={showOptionalDetails}
            >
              <span>Add more details (optional)</span>
              {showOptionalDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {showOptionalDetails && (
              <div className="mt-2.5 p-3.5 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Email */}
                  <div>
                    <label htmlFor={`${idPrefix}-email`} className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                      Email Address (Optional)
                    </label>
                    <input
                      id={`${idPrefix}-email`}
                      type="email"
                      name="email"
                      placeholder="e.g. name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-[#0f172a] dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500/30"
                    />
                    {errors.email && <p className="mt-1 text-[11px] text-red-600">{errors.email}</p>}
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label htmlFor={`${idPrefix}-date`} className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                      Preferred Date (Optional)
                    </label>
                    <input
                      id={`${idPrefix}-date`}
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-[#0f172a] dark:text-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/30"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor={`${idPrefix}-message`} className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                    Message / Notes (Optional)
                  </label>
                  <textarea
                    id={`${idPrefix}-message`}
                    name="message"
                    rows={2}
                    placeholder="Tell us about your home (e.g. number of vents, last cleaned date)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm text-[#0f172a] dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500/30"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Submit Error */}
          {submitError && (
            <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-xs">
              {submitError}
            </div>
          )}

          {/* Blue-Green Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-sky-600 via-sky-600 to-emerald-600 hover:from-sky-500 hover:to-emerald-500 text-white font-bold text-sm sm:text-base tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting Request...</span>
                </span>
              ) : (
                <>
                  <span>Request My Free Quote</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-3 mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              <span>🔒 100% Privacy Protected</span>
              <span>•</span>
              <span>No Obligation</span>
              <span>•</span>
              <span>Fast Response</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );

  // If rendering inside a modal popup
  if (isModal) {
    if (!isOpen) return null;

    return (
      <div 
        className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-dialog-title"
      >
        <div 
          className="relative w-full max-w-lg bg-[#f0f7fc] dark:bg-slate-900 rounded-3xl shadow-2xl border border-sky-100 dark:border-slate-800 overflow-hidden my-auto max-h-[92dvh] flex flex-col text-left"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-5 pt-4 pb-3 sm:px-6 sm:pt-5 border-b border-sky-100 dark:border-slate-800 flex items-start justify-between shrink-0 bg-white/70 dark:bg-slate-900/80 backdrop-blur-md">
            <div>
              <h2 id="quote-dialog-title" className="text-xl sm:text-2xl font-extrabold text-[#0f172a] dark:text-white font-display">
                Get a Free Quote
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                Tell us what you need.
              </p>
            </div>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close quote form"
                className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0 ml-3"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Form scrollable container */}
          <div className="overflow-y-auto grow">
            {formBody}
          </div>
        </div>
      </div>
    );
  }

  // Inline Form on Page
  return (
    <section id="quote-form" className="py-12 sm:py-20 bg-linear-to-b from-white via-sky-50/50 to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950 scroll-mt-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] dark:text-white font-display">
            Get a Free Quote
          </h2>
          <p className="mt-1 text-xs sm:text-base text-slate-600 dark:text-slate-300">
            Tell us what you need.
          </p>
        </div>

        <div className="bg-[#f0f7fc] dark:bg-slate-900 rounded-3xl border border-sky-100 dark:border-slate-800 shadow-lg overflow-hidden">
          {formBody}
        </div>
      </div>
    </section>
  );
};
