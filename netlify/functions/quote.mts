import { sendEmailNotification } from '../../lib/email';
import { calculatePricing } from '../../lib/pricing';

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { 
      fullName, 
      name, 
      phone, 
      email, 
      cityState, 
      serviceNeeded, 
      preferredDate, 
      message, 
      quoteReferenceId, 
      couponCode 
    } = await req.json();
    
    const customerName = (fullName || name || '').trim();

    if (!customerName || !phone || !email || !serviceNeeded || !cityState) {
      return Response.json({
        success: false,
        error: 'Please fill in all required fields (Full Name, Phone, Email, Location, and Service).',
      }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ success: false, error: 'Please provide a valid email address.' }, { status: 400 });
    }

    // Clean service name if previous frontends appended promo strings
    let cleanService = serviceNeeded.replace(/\s*\([^)]*\)/g, '').trim();
    if (!cleanService) cleanService = serviceNeeded.trim();

    // Extract coupon code from payload or promo text
    let effectiveCoupon = (couponCode || '').trim();
    if (!effectiveCoupon && /FRESHOCT/i.test(serviceNeeded)) {
      effectiveCoupon = 'FRESHOCT';
    }

    // Strict server-side pricing & coupon validity check using server clock
    const pricing = calculatePricing(cleanService, effectiveCoupon, Date.now());

    let pricingSummaryText = '';
    if (pricing.couponValid) {
      pricingSummaryText = `Regular Price: $${pricing.regularPrice.toFixed(2)} | October Discount (40%): -$${pricing.discountAmount.toFixed(2)} (Coupon: ${pricing.couponCode}) | Final Price: $${pricing.finalPrice.toFixed(2)}`;
    } else if (pricing.couponExpired) {
      pricingSummaryText = `Regular Price: $${pricing.regularPrice.toFixed(2)} | Discount: $0.00 (Coupon FRESHOCT expired: ${pricing.message}) | Final Price: $${pricing.finalPrice.toFixed(2)}`;
    } else {
      pricingSummaryText = `Regular Price: $${pricing.regularPrice.toFixed(2)} | Final Price: $${pricing.finalPrice.toFixed(2)}`;
    }

    const refId = quoteReferenceId || `FB-${Math.floor(100000 + Math.random() * 900000)}`;

    const delivery = await sendEmailNotification({
      fullName: customerName,
      phone: phone.trim(),
      email: email.trim(),
      cityState: cityState.trim(),
      serviceNeeded: cleanService,
      preferredDate: preferredDate?.trim(),
      message: message?.trim(),
      requestType: 'Free Quote',
      quoteReferenceId: refId,
      couponCode: pricing.couponValid ? pricing.couponCode : (pricing.couponExpired ? `${effectiveCoupon} (EXPIRED)` : undefined),
      pricingBreakdown: pricingSummaryText,
    });

    return Response.json({
      success: true,
      provider: delivery.provider,
      quoteReferenceId: refId,
      pricing,
      message: 'Your quote request has been sent to our team! We will follow up shortly.',
    });
  } catch (err: any) {
    console.error('Error handling /api/quote:', err.message);
    return Response.json({
      success: false,
      error: 'Email delivery failed. The request could not be sent to our team at this time. Please call us directly.',
    }, { status: 502 });
  }
};

export const config = {
  path: '/api/quote',
};
