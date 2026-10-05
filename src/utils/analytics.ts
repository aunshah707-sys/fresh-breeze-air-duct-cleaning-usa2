/**
 * Google Analytics 4 (GA4) Integration Helper
 * Measurement ID: G-9D64M7DQJ7
 */

export const GA_MEASUREMENT_ID = 'G-9D64M7DQJ7';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Check if the gtag function is initialized on the window
 */
export function isGtagAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

/**
 * Track an SPA page view in GA4
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
  if (!isGtagAvailable()) return;
  try {
    window.gtag!('event', 'page_view', {
      page_path: pagePath,
      page_title: pageTitle || (typeof document !== 'undefined' ? document.title : ''),
      page_location: typeof window !== 'undefined' ? window.location.href : '',
      send_to: GA_MEASUREMENT_ID,
    });
  } catch {
    // Fail-safe to prevent breaking any app operations
  }
}

/**
 * Send a generic event to GA4
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}): void {
  if (!isGtagAvailable()) return;
  try {
    window.gtag!('event', eventName, {
      ...params,
      send_to: GA_MEASUREMENT_ID,
    });
  } catch {
    // Fail-safe to prevent breaking any app operations
  }
}

/**
 * Track lead conversions (Free Quote or Request a Callback)
 */
export function trackLeadSubmission(data: {
  leadType: 'quote' | 'callback';
  service: string;
  location?: string;
  quoteId?: string;
  hasDiscount?: boolean;
  value?: number;
}): void {
  trackEvent('generate_lead', {
    currency: 'USD',
    value: data.value,
    lead_type: data.leadType,
    service_name: data.service,
    service_location: data.location || 'Not specified',
    transaction_id: data.quoteId,
    has_discount: data.hasDiscount ?? false,
  });
}

/**
 * Track call-to-action button clicks
 */
export function trackCtaClick(ctaName: string, location: string): void {
  trackEvent('cta_click', {
    cta_name: ctaName,
    cta_location: location,
  });
}

/**
 * Track user contact actions (email, phone/callback, social messaging)
 */
export function trackContactClick(
  method: 'phone' | 'email' | 'instagram' | 'facebook', 
  target: string, 
  source: string
): void {
  trackEvent('contact_click', {
    contact_method: method,
    contact_target: target,
    click_source: source,
  });
}

/**
 * Track coupon code application
 */
export function trackCouponApplied(couponCode: string, service: string, discountAmount?: number): void {
  trackEvent('coupon_applied', {
    coupon_code: couponCode,
    service_name: service,
    discount_amount: discountAmount,
  });
}
