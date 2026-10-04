import { sendEmailNotification } from '../../lib/email';

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { fullName, name, phone, email, cityState, serviceNeeded, preferredDate, message, quoteReferenceId } = await req.json();
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

    const refId = quoteReferenceId || `FB-${Math.floor(100000 + Math.random() * 900000)}`;

    const delivery = await sendEmailNotification({
      fullName: customerName,
      phone: phone.trim(),
      email: email.trim(),
      cityState: cityState.trim(),
      serviceNeeded: serviceNeeded.trim(),
      preferredDate: preferredDate?.trim(),
      message: message?.trim(),
      requestType: 'Free Quote',
      quoteReferenceId: refId,
    });

    return Response.json({
      success: true,
      provider: delivery.provider,
      quoteReferenceId: refId,
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
