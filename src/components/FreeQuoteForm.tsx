import React, { useState, useEffect, useCallback } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Calendar, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Wrench, 
  MessageSquare, 
  Sparkles, 
  RotateCcw, 
  Clock, 
  AlertCircle, 
  X,
  Tag,
  ShieldCheck
} from 'lucide-react';
import { useCountdown } from '../utils/useCountdown';
import { 
  getServiceRegularPrice, 
  PROMO_COUPON_CODE, 
  EXPIRED_MESSAGE,
  PricingResult,
  calculatePricing 
} from '../../lib/pricing';
import { trackLeadSubmission, trackCouponApplied } from '../utils/analytics';

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
  onClearPromo,
  isModal = false,
  isOpen = false,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    cityState: '',
    serviceNeeded: 'Air Duct Cleaning',
    preferredDate: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [quoteReferenceId, setQuoteReferenceId] = useState('');
  const [submittedPricing, setSubmittedPricing] = useState<PricingResult | null>(null);

  // Coupon state
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false);
  const [serverPricing, setServerPricing] = useState<PricingResult | null>(null);

  // Live countdown synced with America/New_York
  const countdown = useCountdown();

  // Validate coupon directly with server endpoint
  const validateCouponWithServer = useCallback(async (codeToValidate: string, service: string) => {
    const code = codeToValidate.trim().toUpperCase();
    if (!code) {
      setAppliedCoupon(null);
      setServerPricing(null);
      setCouponError(null);
      return;
    }

    setIsValidatingCoupon(true);
    setCouponError(null);

    try {
      const response = await fetch('/api/validate-coupon', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ couponCode: code, service }),
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      const data: PricingResult = await response.json();
      setServerPricing(data);

      if (data.couponExpired) {
        setAppliedCoupon(null);
        setCouponError(EXPIRED_MESSAGE);
      } else if (data.couponValid) {
        const validCode = data.couponCode || code;
        setAppliedCoupon(validCode);
        setCouponError(null);
        trackCouponApplied(validCode, service, data.discountAmount);
      } else {
        setAppliedCoupon(null);
        setCouponError(data.message || 'Invalid coupon code.');
      }
    } catch {
      // In case of network glitch, use strict fallback validator
      const fallback = calculatePricing(service, code, Date.now());
      setServerPricing(fallback);
      if (fallback.couponExpired) {
        setAppliedCoupon(null);
        setCouponError(EXPIRED_MESSAGE);
      } else if (fallback.couponValid) {
        setAppliedCoupon(fallback.couponCode || code);
        setCouponError(null);
      } else {
        setAppliedCoupon(null);
        setCouponError(fallback.message || 'Invalid coupon code.');
      }
    } finally {
      setIsValidatingCoupon(false);
    }
  }, []);

  // Update service if prop changes
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceNeeded: initialService }));
    }
  }, [initialService]);

  // Update location if prop changes
  useEffect(() => {
    if (initialLocation) {
      setFormData((prev) => ({ ...prev, cityState: initialLocation }));
    }
  }, [initialLocation]);

  // Auto-apply or validate coupon when appliedPromo prop is provided
  useEffect(() => {
    if (appliedPromo) {
      const code = appliedPromo.toUpperCase().includes('FRESHOCT') || appliedPromo.includes('40%')
        ? PROMO_COUPON_CODE
        : appliedPromo.toUpperCase();

      setCouponInput(code);
      validateCouponWithServer(code, formData.serviceNeeded);
    }
  }, [appliedPromo, formData.serviceNeeded, validateCouponWithServer]);

  // Revalidate pricing when service selection changes if coupon is applied
  useEffect(() => {
    if (appliedCoupon) {
      validateCouponWithServer(appliedCoupon, formData.serviceNeeded);
    }
  }, [formData.serviceNeeded, appliedCoupon, validateCouponWithServer]);

  // If countdown fires expiry while user is viewing the page, strictly expire the coupon
  useEffect(() => {
    if (countdown.isExpired && appliedCoupon) {
      setAppliedCoupon(null);
      setCouponError(EXPIRED_MESSAGE);
      setServerPricing(calculatePricing(formData.serviceNeeded, '', Date.now()));
    }
  }, [countdown.isExpired, appliedCoupon, formData.serviceNeeded]);

  const handleApplyCoupon = () => {
    if (!couponInput.trim()) return;
    validateCouponWithServer(couponInput, formData.serviceNeeded);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput('');
    setCouponError(null);
    setServerPricing(null);
    if (onClearPromo) {
      onClearPromo();
    }
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide a valid phone number for quote follow-up.';
    } else if (formData.phone.replace(/\D/g, '').length < 7) {
      newErrors.phone = 'Please provide a complete phone number.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email format (e.g. name@example.com).';
    }

    if (!formData.cityState.trim()) {
      newErrors.cityState = 'Please provide your City & State or ZIP code.';
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
          email: formData.email.trim(),
          cityState: formData.cityState.trim(),
          serviceNeeded: formData.serviceNeeded,
          preferredDate: formData.preferredDate || undefined,
          message: formData.message.trim() || undefined,
          quoteReferenceId: generatedId,
          couponCode: appliedCoupon || undefined,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        const refId = result.quoteReferenceId || generatedId;
        setQuoteReferenceId(refId);
        if (result.pricing) {
          setSubmittedPricing(result.pricing);
        }
        setIsSubmitted(true);
        trackLeadSubmission({
          leadType: 'quote',
          service: formData.serviceNeeded,
          location: formData.cityState,
          quoteId: refId,
          hasDiscount: !!appliedCoupon,
          value: result.pricing?.finalPrice,
        });
      } else {
        setSubmitError(
          result.error || 'Email delivery failed. The request could not be sent to our team at this time. Please call us directly.'
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
      email: '',
      cityState: '',
      serviceNeeded: 'Air Duct Cleaning',
      preferredDate: '',
      message: '',
    });
    setErrors({});
  };

  // Compute active prices
  const baseRegularPrice = getServiceRegularPrice(formData.serviceNeeded);
  const currentRegularPrice = serverPricing?.regularPrice ?? baseRegularPrice;
  const isDiscountActive = Boolean(appliedCoupon && serverPricing?.couponValid && !serverPricing?.couponExpired && !countdown.isExpired);
  const currentDiscountAmount = isDiscountActive && serverPricing ? serverPricing.discountAmount : 0;
  const currentFinalPrice = isDiscountActive && serverPricing ? serverPricing.finalPrice : currentRegularPrice;

  const formContent = (
    <div className={isModal ? "p-6 sm:p-7 space-y-5" : ""}>
      {isSubmitted ? (
        /* Success Screen */
        <div className="p-8 sm:p-12 text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mx-auto mb-6 shadow-xs border border-emerald-200 dark:border-emerald-800">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="inline-block px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 rounded-full text-xs font-semibold mb-3 border border-emerald-200 dark:border-emerald-800">
            Quote Request ID: #{quoteReferenceId}
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-display">
            Thank You, {formData.name}!
          </h3>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
            We have received your quote request for <strong className="text-slate-900 dark:text-white">{formData.serviceNeeded}</strong> in <strong className="text-slate-900 dark:text-white">{formData.cityState}</strong>.
          </p>

          {/* Pricing Confirmation Box */}
          <div className="mt-6 max-w-md mx-auto bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs text-left space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center justify-between">
              <span>Server-Approved Pricing Breakdown</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </h4>

            {submittedPricing && submittedPricing.couponValid ? (
              <div className="space-y-1.5 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Regular Price</span>
                  <span className="line-through">${submittedPricing.regularPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                  <span>October Discount (40%)</span>
                  <span>-${submittedPricing.discountAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-900 dark:text-white font-extrabold text-sm sm:text-base pt-1.5 border-t border-slate-200 dark:border-slate-800">
                  <span>Your Price</span>
                  <span className="text-emerald-700 dark:text-emerald-400 text-lg font-black font-display">
                    ${submittedPricing.finalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="pt-1 text-[11px] text-emerald-700 dark:text-emerald-300 flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Promo code {submittedPricing.couponCode} applied successfully!</span>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-900 dark:text-white font-bold text-sm sm:text-base">
                  <span>Regular Price</span>
                  <span className="text-slate-900 dark:text-white font-display font-bold">
                    ${(submittedPricing?.regularPrice ?? currentRegularPrice).toFixed(2)}
                  </span>
                </div>
                {submittedPricing?.couponExpired && (
                  <p className="text-[11px] text-rose-700 dark:text-rose-400 font-medium">
                    Note: {EXPIRED_MESSAGE} Regular price applies.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* What happens next box */}
          <div className="mt-6 max-w-md mx-auto bg-slate-50 dark:bg-slate-850 rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 text-left space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              What Happens Next?
            </h4>
            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                <p>Our coordinator checks local technician routes in your area.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                <p>We send you an upfront pricing breakdown and confirm your preferred time slot via email and phone ({formData.phone}).</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                <p>No obligation to book. Work only begins after you approve the estimate.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
              >
                Close Window
              </button>
            )}
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Submit Another Request</span>
            </button>
          </div>
        </div>
      ) : (
        /* The High-Converting Quote Form */
        <form onSubmit={handleSubmit} className={isModal ? "space-y-5" : "p-6 sm:p-10 space-y-6"}>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {/* Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. John Miller"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 bg-slate-50/50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
                  errors.name
                    ? 'border-red-300 dark:border-red-500/60 focus:ring-red-400 bg-red-50/30'
                    : 'border-slate-300 dark:border-slate-700 focus:ring-sky-500 focus:border-transparent'
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 bg-slate-50/50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
                  errors.phone
                    ? 'border-red-300 dark:border-red-500/60 focus:ring-red-400 bg-red-50/30'
                    : 'border-slate-300 dark:border-slate-700 focus:ring-sky-500 focus:border-transparent'
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.phone}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 bg-slate-50/50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
                  errors.email
                    ? 'border-red-300 dark:border-red-500/60 focus:ring-red-400 bg-red-50/30'
                    : 'border-slate-300 dark:border-slate-700 focus:ring-sky-500 focus:border-transparent'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>

            {/* City / State */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                City / State or ZIP *
              </label>
              <input
                type="text"
                name="cityState"
                required
                placeholder="e.g. Austin, TX or 78701"
                value={formData.cityState}
                onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 bg-slate-50/50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 ${
                  errors.cityState
                    ? 'border-red-300 dark:border-red-500/60 focus:ring-red-400 bg-red-50/30'
                    : 'border-slate-300 dark:border-slate-700 focus:ring-sky-500 focus:border-transparent'
                }`}
              />
              {errors.cityState && (
                <p className="mt-1 text-xs text-red-600 dark:text-red-400">{errors.cityState}</p>
              )}
            </div>

            {/* Service Needed Dropdown */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                Service Needed *
              </label>
              <select
                value={formData.serviceNeeded}
                onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-slate-50/50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 font-medium"
              >
                <option value="Air Duct Cleaning">Air Duct Cleaning ($249)</option>
                <option value="Dryer Vent Cleaning">Dryer Vent Cleaning ($249)</option>
                <option value="Chimney Cleaning">Chimney Cleaning ($279)</option>
                <option value="HVAC Cleaning">HVAC Cleaning ($249)</option>
                <option value="Other">Other ($249)</option>
              </select>
            </div>

            {/* Preferred Date */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                Preferred Date
              </label>
              <input
                type="date"
                name="preferredDate"
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-slate-50/50 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
              />
            </div>
          </div>

          {/* Pricing & Coupon Section */}
          <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-850/80 p-4 sm:p-5 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider block">
                  Upfront Pricing &amp; Promotion
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Verified residential pricing for {formData.serviceNeeded}
                </span>
              </div>

              {/* Live Countdown Badge */}
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                countdown.isExpired 
                  ? 'bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800' 
                  : 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {countdown.isExpired ? 'Offer Expired' : `October Special: ${countdown.formatted}`}
                </span>
              </div>
            </div>

            {/* Coupon Code Input & Status */}
            <div className="space-y-2">
              {!appliedCoupon ? (
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative grow">
                    <Tag className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Have a coupon code? (e.g. FRESHOCT)"
                      value={couponInput}
                      onChange={(e) => {
                        setCouponInput(e.target.value.toUpperCase());
                        setCouponError(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleApplyCoupon();
                        }
                      }}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs sm:text-sm font-mono uppercase bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={isValidatingCoupon || !couponInput.trim()}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-sky-600 hover:bg-slate-800 dark:hover:bg-sky-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer shrink-0"
                  >
                    {isValidatingCoupon ? 'Checking...' : 'Apply Code'}
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100 text-xs sm:text-sm animate-in fade-in">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div>
                      <span className="font-extrabold font-mono text-emerald-900 dark:text-emerald-200 bg-emerald-200/80 dark:bg-emerald-900/80 px-2 py-0.5 rounded text-xs mr-2 border border-emerald-300 dark:border-emerald-700">
                        {appliedCoupon}
                      </span>
                      <span className="font-semibold text-emerald-900 dark:text-emerald-200">
                        October Special — 40% OFF Applied!
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCoupon}
                    className="text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 text-xs font-bold px-2.5 py-1 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 rounded-lg cursor-pointer transition-colors"
                    title="Remove coupon"
                  >
                    Remove
                  </button>
                </div>
              )}

              {/* Error display (e.g. October offer has expired) */}
              {couponError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/70 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  <span className="font-medium">{couponError}</span>
                </div>
              )}
            </div>

            {/* Strict Pricing Display */}
            <div className="pt-2 border-t border-slate-200/80 dark:border-slate-800 space-y-1.5 text-xs sm:text-sm">
              {appliedCoupon && isDiscountActive ? (
                <>
                  <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                    <span>Regular Price</span>
                    <span className="line-through">${currentRegularPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400 font-semibold">
                    <span>October Discount (40%)</span>
                    <span>-${currentDiscountAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-900 dark:text-white font-extrabold text-sm sm:text-base pt-1.5 border-t border-dashed border-slate-300 dark:border-slate-700">
                    <span>Your Price</span>
                    <span className="text-emerald-700 dark:text-emerald-400 text-lg sm:text-xl font-display font-black">
                      ${currentFinalPrice.toFixed(2)}
                    </span>
                  </div>
                </>
              ) : (
                /* Before applying the coupon, show ONLY the regular price */
                <div className="flex items-center justify-between text-slate-900 dark:text-white font-bold text-sm sm:text-base">
                  <span>Regular Price</span>
                  <span className="text-slate-900 dark:text-white text-base sm:text-lg font-display font-bold">
                    ${currentRegularPrice.toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              Message / Home Details (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Tell us about your home (e.g. approximate square footage, number of vents, last cleaned date, or specific symptoms like dusty vents)..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-slate-50/50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2 space-y-3">
            {submitError && (
              <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/70 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 text-xs flex items-center gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-xl bg-linear-to-r from-sky-600 via-sky-700 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 text-white font-extrabold text-base shadow-[0_8px_20px_rgba(2,132,199,0.25)] hover:shadow-[0_12px_28px_rgba(2,132,199,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Processing Your Request...</span>
                </span>
              ) : (
                <>
                  <span>REQUEST MY FREE QUOTE</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
            <div className="flex items-center justify-center gap-4 mt-3 text-[11px] text-slate-400 dark:text-slate-500 font-medium">
              <span>🔒 100% Privacy Protected</span>
              <span>·</span>
              <span>No Obligation</span>
              <span>·</span>
              <span>Fast Response</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );

  if (isModal) {
    if (!isOpen) return null;

    return (
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/50 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300"
        onClick={onClose}
      >
        <div 
          className="relative w-full max-w-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl shadow-[0_24px_60px_-12px_rgba(15,23,42,0.35),0_1px_2px_rgba(0,0,0,0.06),0_0_0_1px_rgba(255,255,255,0.9)_inset] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)] border border-white/70 dark:border-slate-800 overflow-hidden my-auto max-h-[92vh] flex flex-col transform transition-all duration-300 animate-in zoom-in-95 text-left"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-linear-to-r from-sky-600/92 via-sky-700/92 to-emerald-700/92 backdrop-blur-md px-6 py-5 text-white relative shrink-0 border-b border-white/20 shadow-xs">
            {onClose && (
              <button 
                onClick={onClose}
                aria-label="Close dialog"
                className="absolute top-4 right-4 p-2 rounded-xl text-white/90 hover:text-white bg-white/10 hover:bg-white/25 backdrop-blur-xs transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
            <div className="flex items-center gap-2 text-sky-200 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-emerald-300" />
              Fresh Breeze Dispatch
            </div>
            <h3 className="text-xl font-bold mt-1 text-white font-display">
              Request a Free Quote
            </h3>
            <p className="text-sky-100 text-xs mt-1">
              Complete this 30-second form. Our residential team will confirm availability and deliver a transparent estimate.
            </p>
          </div>

          <div className="overflow-y-auto bg-transparent">
            {formContent}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="quote-form" className="py-16 sm:py-24 bg-white dark:bg-slate-950 relative scroll-mt-10 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-widest mb-2.5">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>Free, No-Obligation Estimate</span>
              <Sparkles className="w-4 h-4 text-emerald-500" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display text-balance">
              Request Your Free Air Duct Quote
            </h2>
            <p className="mt-3.5 text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
              Complete this 30-second form. Our residential team will confirm service availability and deliver a prompt, transparent estimate.
            </p>
          </div>

          {/* Form Card or Success Screen */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-[0_20px_50px_rgba(15,23,42,0.1),0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden transition-shadow duration-300">
            {formContent}
          </div>
        </div>
      </div>
    </section>
  );
};
