import React, { useState, useEffect } from 'react';
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
  X
} from 'lucide-react';

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

  // Update form if props change (e.g. from service card or ZIP checker)
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, serviceNeeded: initialService }));
    }
  }, [initialService]);

  useEffect(() => {
    if (initialLocation) {
      setFormData((prev) => ({ ...prev, cityState: initialLocation }));
    }
  }, [initialLocation]);

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
          serviceNeeded: appliedPromo ? `${formData.serviceNeeded} (${appliedPromo})` : formData.serviceNeeded,
          preferredDate: formData.preferredDate || undefined,
          message: formData.message.trim() || undefined,
          quoteReferenceId: generatedId,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setQuoteReferenceId(result.quoteReferenceId || generatedId);
        setIsSubmitted(true);
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

  const formContent = (
    <div className={isModal ? "p-6 sm:p-7 space-y-5" : ""}>
      {isSubmitted ? (
        /* Success Screen */
        <div className="p-8 sm:p-12 text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-semibold mb-3 border border-emerald-200">
            Quote Request ID: #{quoteReferenceId}
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Thank You, {formData.name}!
          </h3>

          <p className="mt-3 text-sm sm:text-base text-slate-600 max-w-lg mx-auto">
            We have received your quote request for <strong className="text-slate-900">{formData.serviceNeeded}</strong> in <strong className="text-slate-900">{formData.cityState}</strong>.
          </p>

          {/* What happens next box */}
          <div className="mt-8 max-w-md mx-auto bg-slate-50 rounded-2xl p-6 border border-slate-200/80 text-left space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-sky-600" />
              What Happens Next?
            </h4>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                <p>Our coordinator checks local technician routes in your area.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                <p>We send you an upfront pricing breakdown and confirm your preferred time slot via email and phone ({formData.phone}).</p>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                <p>No obligation to book. Work only begins after you approve the estimate.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm transition-all cursor-pointer"
              >
                Close Window
              </button>
            )}
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Submit Another Request</span>
            </button>
          </div>
        </div>
      ) : (
        /* The High-Converting Quote Form */
        <form onSubmit={handleSubmit} className={isModal ? "space-y-5" : "p-6 sm:p-10 space-y-6"}>
                {appliedPromo && (
                  <div className="p-4 rounded-2xl bg-linear-to-r from-emerald-50 via-emerald-100/60 to-sky-50 border-2 border-emerald-500/40 flex items-center justify-between gap-3 text-xs sm:text-sm text-emerald-950 animate-in fade-in shadow-xs">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-extrabold text-xs tracking-wider shadow-xs">
                        40% OFF
                      </span>
                      <span className="font-bold">
                        Special Offer Applied: 40% OFF Promotion is locked into your quote!
                      </span>
                    </div>
                    {onClearPromo && (
                      <button
                        type="button"
                        onClick={onClearPromo}
                        className="text-slate-400 hover:text-slate-700 p-1 text-xs font-bold"
                        title="Remove promotion"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-sky-600" />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. John Miller"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 bg-slate-50/50 ${
                        errors.name
                          ? 'border-red-300 focus:ring-red-400 bg-red-50/30'
                          : 'border-slate-300 focus:ring-sky-500 focus:border-transparent'
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-sky-600" />
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 bg-slate-50/50 ${
                        errors.phone
                          ? 'border-red-300 focus:ring-red-400 bg-red-50/30'
                          : 'border-slate-300 focus:ring-sky-500 focus:border-transparent'
                      }`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-sky-600" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 bg-slate-50/50 ${
                        errors.email
                          ? 'border-red-300 focus:ring-red-400 bg-red-50/30'
                          : 'border-slate-300 focus:ring-sky-500 focus:border-transparent'
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                    )}
                  </div>

                  {/* City / State */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-sky-600" />
                      City / State or ZIP *
                    </label>
                    <input
                      type="text"
                      name="cityState"
                      required
                      placeholder="e.g. Austin, TX or 78701"
                      value={formData.cityState}
                      onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                      className={`w-full px-4 py-3 rounded-xl border text-sm transition-all focus:outline-hidden focus:ring-2 bg-slate-50/50 ${
                        errors.cityState
                          ? 'border-red-300 focus:ring-red-400 bg-red-50/30'
                          : 'border-slate-300 focus:ring-sky-500 focus:border-transparent'
                      }`}
                    />
                    {errors.cityState && (
                      <p className="mt-1 text-xs text-red-600">{errors.cityState}</p>
                    )}
                  </div>

                  {/* Service Needed Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-sky-600" />
                      Service Needed *
                    </label>
                    <select
                      value={formData.serviceNeeded}
                      onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-slate-50/50 font-medium text-slate-800"
                    >
                      <option value="Air Duct Cleaning">Air Duct Cleaning</option>
                      <option value="Dryer Vent Cleaning">Dryer Vent Cleaning</option>
                      <option value="HVAC Cleaning">HVAC Cleaning</option>
                      <option value="Chimney Cleaning">Chimney Cleaning</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-sky-600" />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-slate-50/50 text-slate-700"
                    />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
                    Message / Home Details (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your home (e.g. approximate square footage, number of vents, last cleaned date, or specific symptoms like dusty vents)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-slate-50/50"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2 space-y-3">
                  {submitError && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2.5 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
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
                  <div className="flex items-center justify-center gap-4 mt-3 text-[11px] text-slate-400 font-medium">
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
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/40 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300"
        onClick={onClose}
      >
        <div 
          className="relative w-full max-w-2xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-[0_24px_60px_-12px_rgba(15,23,42,0.28),0_1px_2px_rgba(0,0,0,0.06),0_0_0_1px_rgba(255,255,255,0.9)_inset] border border-white/70 overflow-hidden my-auto max-h-[92vh] flex flex-col transform transition-all duration-300 animate-in zoom-in-95 text-left"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header - EXACT SAME AS CALLMODAL */}
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
    <section id="quote-form" className="py-16 sm:py-24 bg-white relative scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-14">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 uppercase tracking-widest mb-2.5">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>Free, No-Obligation Estimate</span>
              <Sparkles className="w-4 h-4 text-emerald-500" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display text-balance">
              Request Your Free Air Duct Quote
            </h2>
            <p className="mt-3.5 text-sm sm:text-base text-slate-600 max-w-xl mx-auto leading-relaxed">
              Complete this 30-second form. Our residential team will confirm service availability and deliver a prompt, transparent estimate.
            </p>
          </div>

          {/* Form Card or Success Screen */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-[0_20px_50px_rgba(15,23,42,0.1),0_1px_3px_rgba(0,0,0,0.05)] overflow-hidden transition-shadow duration-300">
            {formContent}
          </div>
        </div>
      </div>
    </section>
  );
};
