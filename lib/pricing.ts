/**
 * October Promotion & Service Pricing Validation
 * 
 * Strict Server-Side Expiry Lock:
 * Promotion: October Special — 40% OFF
 * Coupon Code: FRESHOCT
 * Expiry: October 31, 2026 at exactly 11:59:59 PM America/New_York
 */

// Target expiry: October 31, 2026 11:59:59 PM America/New_York (EDT, UTC-4) -> 2026-11-01 03:59:59 UTC
export const PROMO_EXPIRY_ISO = '2026-10-31T23:59:59-04:00';
export const PROMO_EXPIRY_MS = 1793505599000; // Exact millisecond timestamp of 2026-10-31 23:59:59 America/New_York
export const PROMO_COUPON_CODE = 'FRESHOCT';
export const PROMO_DISCOUNT_PERCENT = 40;
export const EXPIRED_MESSAGE = 'October offer has expired.';

// Standard Regular Service Prices
export const SERVICE_REGULAR_PRICES: Record<string, number> = {
  'Air Duct Cleaning': 249.00,
  'Dryer Vent Cleaning': 249.00,
  'Chimney Cleaning': 279.00,
  'HVAC Cleaning': 249.00,
  'Other': 249.00,
};

export function getServiceRegularPrice(serviceName: string): number {
  if (!serviceName) return 249.00;
  const lower = serviceName.toLowerCase().trim();
  if (lower.includes('chimney')) return 279.00;
  if (lower.includes('dryer')) return 249.00;
  if (lower.includes('duct')) return 249.00;
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

  // If coupon code matches FRESHOCT
  if (normalizedCode === PROMO_COUPON_CODE) {
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
      message: 'October Special — 40% OFF applied!',
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
