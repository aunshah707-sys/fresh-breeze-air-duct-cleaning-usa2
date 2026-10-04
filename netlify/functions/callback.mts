import { sendEmailNotification } from '../../lib/email';

export default async (req: Request) => {
  if (req.method !== 'POST') {
    return Response.json({ success: false, error: 'Method not allowed' }, { status: 405 });
  }

  try {
    const { fullName, phone, email, serviceNeeded, preferredTime, message } = await req.json();

    if (!fullName || !phone || !email || !serviceNeeded) {
      return Response.json({
        success: false,
        error: 'Please fill in all required fields (Full Name, Phone, Email, and Service).',
      }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ success: false, error: 'Please provide a valid email address.' }, { status: 400 });
    }

    const delivery = await sendEmailNotification({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      serviceNeeded: serviceNeeded.trim(),
      preferredTime: preferredTime?.trim() || 'As Soon As Possible',
      message: message?.trim(),
      requestType: 'Callback',
    });

    return Response.json({
      success: true,
      provider: delivery.provider,
      message: "Thank you! Your callback request has been received. We'll contact you shortly.",
    });
  } catch (err: any) {
    console.error('Error handling /api/callback:', err.message);
    return Response.json({
      success: false,
      error: 'Email delivery failed. The request could not be sent to our team at this time. Please call us directly.',
    }, { status: 502 });
  }
};

export const config = {
  path: '/api/callback',
};
