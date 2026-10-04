import React, { useState } from 'react';
import { Phone, Clock, ShieldCheck, X, CheckCircle2, AlertCircle, Send, User, Mail, Wrench, MessageSquare } from 'lucide-react';
import { useCountdown } from '../utils/useCountdown';
import { EXPIRED_MESSAGE } from '../../lib/pricing';

interface CallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote?: () => void;
  appliedPromo?: string;
  onClearPromo?: () => void;
}

export const CallModal: React.FC<CallModalProps> = ({ 
  isOpen, 
  onClose, 
  onOpenQuote,
  appliedPromo,
  onClearPromo,
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    serviceNeeded: 'Air Duct Cleaning',
    preferredTime: 'As Soon As Possible',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const countdown = useCountdown();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setErrorMessage('Please fill in your name, phone number, and email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const promoText = appliedPromo ? ` [Offer Claimed: ${appliedPromo}]` : '';
      const finalMessage = formData.message.trim() 
        ? `${formData.message.trim()}${promoText}`
        : promoText ? `Claimed offer: ${appliedPromo}` : '';

      const response = await fetch('/api/callback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          serviceNeeded: appliedPromo ? `${formData.serviceNeeded} (${appliedPromo})` : formData.serviceNeeded,
          preferredTime: formData.preferredTime,
          message: finalMessage,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccessMessage("Thank you! Your callback request has been received. We'll contact you shortly.");
      } else {
        setErrorMessage(result.error || "Something went wrong. Please try again or call us directly.");
      }
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage("Something went wrong. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccessMessage(null);
    setErrorMessage(null);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      serviceNeeded: 'Air Duct Cleaning',
      preferredTime: 'As Soon As Possible',
      message: '',
    });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/40 backdrop-blur-md overflow-y-auto animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white/88 backdrop-blur-xl rounded-3xl shadow-[0_24px_60px_-12px_rgba(15,23,42,0.28),0_1px_2px_rgba(0,0,0,0.06),0_0_0_1px_rgba(255,255,255,0.9)_inset] border border-white/70 overflow-hidden my-auto max-h-[92vh] flex flex-col transform transition-all duration-300 animate-in zoom-in-95 text-left"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-linear-to-r from-sky-600/92 via-sky-700/92 to-emerald-700/92 backdrop-blur-md px-6 py-5 text-white relative shrink-0 border-b border-white/20 shadow-xs">
          <button 
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 p-2 rounded-xl text-white/90 hover:text-white bg-white/10 hover:bg-white/25 backdrop-blur-xs transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-sky-200 text-xs font-semibold uppercase tracking-wider">
            <Phone className="w-4 h-4 text-emerald-300" />
            Fresh Breeze Dispatch
          </div>
          <h3 className="text-xl font-bold mt-1 text-white font-display">
            Request a Callback
          </h3>
          <p className="text-sky-100 text-xs mt-1">
            Leave your contact details and our team will call you back promptly.
          </p>
        </div>

        <div className="p-6 sm:p-7 space-y-5 overflow-y-auto bg-transparent">
          {successMessage ? (
            /* Success confirmation required by instructions */
            <div className="p-6 rounded-2xl bg-emerald-50/90 backdrop-blur-sm border border-emerald-200 text-center space-y-4 animate-in fade-in duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-bold text-emerald-950 font-display">
                  Callback Request Submitted!
                </h4>
                <p className="text-xs sm:text-sm text-emerald-800 mt-2 font-medium leading-relaxed">
                  {successMessage}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
                >
                  Close Window
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-emerald-300 bg-white/80 text-emerald-800 hover:bg-emerald-50 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            /* The Callback Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {appliedPromo && (
                countdown.isExpired ? (
                  <div className="p-3 rounded-xl bg-rose-50/90 backdrop-blur-xs border border-rose-200 flex items-center justify-between gap-2.5 text-xs text-rose-800 animate-in fade-in shadow-xs">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span className="font-medium">{EXPIRED_MESSAGE}</span>
                    </div>
                    {onClearPromo && (
                      <button
                        type="button"
                        onClick={onClearPromo}
                        className="text-rose-400 hover:text-rose-700 p-0.5 text-xs font-bold cursor-pointer"
                        title="Dismiss"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-linear-to-r from-emerald-50/90 via-emerald-100/80 to-sky-50/90 backdrop-blur-xs border border-emerald-400/80 flex items-center justify-between gap-2.5 text-xs text-emerald-950 animate-in fade-in shadow-xs">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white font-extrabold text-[11px] uppercase tracking-wider shadow-xs">
                        40% OFF
                      </span>
                      <span className="font-bold">
                        Special Offer: {appliedPromo} Applied!
                      </span>
                    </div>
                    {onClearPromo && (
                      <button
                        type="button"
                        onClick={onClearPromo}
                        className="text-slate-400 hover:text-slate-700 p-0.5 text-xs font-bold cursor-pointer"
                        title="Remove promotion"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                )
              )}

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50/90 backdrop-blur-xs border border-red-200 text-red-800 text-xs flex items-center gap-2.5 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-sky-600" />
                  Full Name *
                </label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. John Miller"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300/80 bg-white/80 backdrop-blur-xs text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/25 focus:border-sky-500 shadow-xs transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-sky-600" />
                    Phone Number *
                  </label>
                  <input 
                    type="tel"
                    required
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300/80 bg-white/80 backdrop-blur-xs text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/25 focus:border-sky-500 shadow-xs transition-all"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-sky-600" />
                    Email Address *
                  </label>
                  <input 
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300/80 bg-white/80 backdrop-blur-xs text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/25 focus:border-sky-500 shadow-xs transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Service Needed Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-sky-600" />
                    Service Needed *
                  </label>
                  <select
                    value={formData.serviceNeeded}
                    onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300/80 bg-white/80 backdrop-blur-xs text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/25 focus:border-sky-500 font-medium text-slate-800 shadow-xs transition-all"
                  >
                    <option value="Air Duct Cleaning">Air Duct Cleaning</option>
                    <option value="Dryer Vent Cleaning">Dryer Vent Cleaning</option>
                    <option value="HVAC Cleaning">HVAC Cleaning</option>
                    <option value="Chimney Cleaning">Chimney Cleaning</option>
                  </select>
                </div>

                {/* Preferred Callback Time */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    Preferred Callback Time *
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300/80 bg-white/80 backdrop-blur-xs text-sm focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/25 focus:border-sky-500 font-medium text-slate-800 shadow-xs transition-all"
                  >
                    <option value="As Soon As Possible">As Soon As Possible</option>
                    <option value="Morning (8:00 AM - 12:00 PM)">Morning (8:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (12:00 PM - 4:00 PM)">Afternoon (12:00 PM - 4:00 PM)</option>
                    <option value="Evening (4:00 PM - 7:00 PM)">Evening (4:00 PM - 7:00 PM)</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
                  Message
                </label>
                <textarea 
                  rows={2}
                  placeholder="Optional details about your home or question..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300/80 bg-white/80 backdrop-blur-xs text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-sky-500/25 focus:border-sky-500 shadow-xs transition-all"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-linear-to-r from-sky-600 to-emerald-600 hover:from-sky-700 hover:to-emerald-700 active:scale-[0.99] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending Callback Request...</span>
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>REQUEST A CALLBACK</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Trust points */}
          <div className="rounded-xl bg-white/60 backdrop-blur-xs p-3 flex items-center justify-between text-xs text-slate-600 border border-slate-200/70 shadow-xs">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-sky-600" />
              <span className="font-medium">Prompt Callback</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-medium">Free, Transparent Quotes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
