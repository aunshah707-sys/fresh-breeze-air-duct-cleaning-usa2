/**
 * November Promotion & Service Pricing Validation
 * 
 * Strict Server-Side Expiry Lock:
 * Promotion: November Special — 40% OFF
 * Coupon Code: FRESH40
 * Expiry: November 30, 2026 at exactly 11:59:59 PM America/New_York
 */

// Target expiry: November 30, 2026 11:59:59 PM America/New_York (EST, UTC-5) -> 2026-12-01 04:59:59 UTC
export const PROMO_EXPIRY_ISO = '2026-11-30T23:59:59-05:00';
export const PROMO_EXPIRY_MS = 1796101199000; // Exact millisecond timestamp of 2026-11-30 23:59:59 America/New_York
export const PROMO_COUPON_CODE = 'FRESH40';
export const PROMO_DISCOUNT_PERCENT = 40;
export const EXPIRED_MESSAGE = 'November offer has expired.';

// Standard Regular Service Prices
export const SERVICE_REGULAR_PRICES: Record<string, number> = {
  'Air Duct Cleaning': 359.00,
  'Dryer Vent Cleaning': 249.00,
  'Chimney Cleaning': 279.00,
  'HVAC Cleaning': 249.00,
  'Other': 249.00,
};

export function getServiceRegularPrice(serviceName: string): number {
  if (!serviceName) return 359.00;
  const lower = serviceName.toLowerCase().trim();
  if (lower.includes('chimney')) return 279.00;
  if (lower.includes('dryer')) return 249.00;
  if (lower.includes('duct')) return 359.00;
  if (lower.includes('hvac')) return 249.00;
  return 249.00;
}

export interface PricingResult {
  service: string;
  regularPrice: number;
  discountPercent: number;
  discountAmount: number;
  finalPrice: number;
  couponCode?: string;
  couponValid: boolean;
  couponExpired: boolean;
  message?: string;
  serverTime: number;
  expiryTime: number;
}

export function isCouponExpired(currentTimeMs: number = Date.now()): boolean {
  return currentTimeMs >= PROMO_EXPIRY_MS;
}

/**
 * Validates a coupon and computes server-authoritative pricing.
 * Can accept an optional currentTimeMs for testing/mocking.
 */
export function calculatePricing(
  serviceName: string,
  couponCode?: string,
  currentTimeMs: number = Date.now()
): PricingResult {
  const regularPrice = getServiceRegularPrice(serviceName);
  const normalizedCode = (couponCode || '').trim().toUpperCase();
  const serverTime = currentTimeMs;
  const expiryTime = PROMO_EXPIRY_MS;
  const expired = isCouponExpired(serverTime);

  // If no coupon provided
  if (!normalizedCode) {
    return {
      service: serviceName,
      regularPrice,
      discountPercent: 0,
      discountAmount: 0,
      finalPrice: regularPrice,
      couponValid: false,
      couponExpired: false,
      serverTime,
      expiryTime,
    };
  }

  // If coupon code matches FRESH40
  if (normalizedCode === PROMO_COUPON_CODE || normalizedCode === 'FRESH40' || normalizedCode === 'FRESH50') {
    if (expired) {
      return {
        service: serviceName,
        regularPrice,
        discountPercent: 0,
        discountAmount: 0,
        finalPrice: regularPrice,
        couponCode: PROMO_COUPON_CODE,
        couponValid: false,
        couponExpired: true,
        message: EXPIRED_MESSAGE,
        serverTime,
        expiryTime,
      };
    }

    // Coupon is valid and active before expiry!
    const discountAmount = Math.round(regularPrice * (PROMO_DISCOUNT_PERCENT / 100) * 100) / 100;
    const finalPrice = Math.round((regularPrice - discountAmount) * 100) / 100;

    return {
      service: serviceName,
      regularPrice,
      discountPercent: PROMO_DISCOUNT_PERCENT,
      discountAmount,
      finalPrice,
      couponCode: PROMO_COUPON_CODE,
      couponValid: true,
      couponExpired: false,
      message: 'November Special — 40% OFF applied!',
      serverTime,
      expiryTime,
    };
  }

  // Handle expired October coupon gracefully
  if (normalizedCode === 'FRESHOCT') {
    return {
      service: serviceName,
      regularPrice,
      discountPercent: 0,
      discountAmount: 0,
      finalPrice: regularPrice,
      couponCode: 'FRESHOCT',
      couponValid: false,
      couponExpired: true,
      message: 'October offer has expired. Use FRESH40 for November!',
      serverTime,
      expiryTime,
    };
  }

  // Any other coupon code is invalid
  return {
    service: serviceName,
    regularPrice,
    discountPercent: 0,
    discountAmount: 0,
    finalPrice: regularPrice,
    couponCode: normalizedCode,
    couponValid: false,
    couponExpired: false,
    message: 'Invalid coupon code.',
    serverTime,
    expiryTime,
  };
}
