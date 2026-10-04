import { calculatePricing } from '../../lib/pricing';

export default async (req: Request) => {
  let couponCode = '';
  let service = 'Air Duct Cleaning';

  if (req.method === 'POST') {
    try {
      const body = await req.json();
      couponCode = body.couponCode || body.code || '';
      service = body.service || body.serviceNeeded || 'Air Duct Cleaning';
    } catch {
      // ignore
    }
  } else if (req.method === 'GET') {
    const url = new URL(req.url);
    couponCode = url.searchParams.get('code') || url.searchParams.get('couponCode') || '';
    service = url.searchParams.get('service') || url.searchParams.get('serviceNeeded') || 'Air Duct Cleaning';
  } else {
    return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
  }

  // Authoritative server-side pricing & coupon calculation using server clock
  const pricing = calculatePricing(service, couponCode, Date.now());

  return Response.json({
    success: true,
    ...pricing,
  });
};

export const config = {
  path: '/api/validate-coupon',
};
