const RECIPIENT_EMAIL = 'freshbreezeairductcleaningusa@gmail.com';

export interface EmailNotificationPayload {
  fullName: string;
  phone: string;
  email: string;
  serviceNeeded: string;
  preferredTime?: string;
  preferredDate?: string;
  cityState?: string;
  message?: string;
  requestType: 'Callback' | 'Free Quote';
  quoteReferenceId?: string;
  couponCode?: string;
  pricingBreakdown?: string;
}

export async function sendEmailNotification(data: EmailNotificationPayload) {
  const { 
    fullName, 
    phone, 
    email, 
    serviceNeeded, 
    preferredTime, 
    preferredDate, 
    cityState, 
    message, 
    requestType, 
    quoteReferenceId 
  } = data;

  const subject = requestType === 'Free Quote'
    ? `New Free Quote Request: ${serviceNeeded} - ${fullName}${quoteReferenceId ? ` [#${quoteReferenceId}]` : ''}`
    : `New Callback Request: ${serviceNeeded} - ${fullName}`;

  // Retrieve EmailJS configuration from server-side environment variables
  const serviceId = (process.env.EMAILJS_SERVICE_ID || process.env.VITE_EMAILJS_SERVICE_ID || '').trim();
  const templateId = (process.env.EMAILJS_TEMPLATE_ID || process.env.VITE_EMAILJS_TEMPLATE_ID || 'template_7m4qanl').trim();
  const publicKey = (
    process.env.EMAILJS_PUBLIC_KEY || 
    process.env.EMAILJS_USER_ID || 
    process.env.VITE_EMAILJS_PUBLIC_KEY || 
    process.env.VITE_EMAILJS_USER_ID || 
    ''
  ).trim();
  const privateKey = (process.env.EMAILJS_PRIVATE_KEY || process.env.EMAILJS_ACCESS_TOKEN || '').trim();

  // Validate that EmailJS configuration and Private Key are present for Strict Mode
  if (!serviceId || !templateId || !publicKey || !privateKey) {
    const missing: string[] = [];
    if (!serviceId) missing.push('EMAILJS_SERVICE_ID');
    if (!templateId) missing.push('EMAILJS_TEMPLATE_ID');
    if (!publicKey) missing.push('EMAILJS_PUBLIC_KEY');
    if (!privateKey) missing.push('EMAILJS_PRIVATE_KEY');

    console.error(`[EmailJS Error] Missing configuration: ${missing.join(', ')}`);
    throw new Error(`EmailJS credentials not configured (Missing: ${missing.join(', ')} in environment)`);
  }

    const formattedMessage = [
      message && message.trim() ? message.trim() : 'No additional message provided',
      data.pricingBreakdown ? `\n[Server Pricing Breakdown]\n${data.pricingBreakdown}` : '',
    ].filter(Boolean).join('\n');

    const templateParams: Record<string, string> = {
      to_email: RECIPIENT_EMAIL,
      recipient_email: RECIPIENT_EMAIL,
      from_name: fullName,
      name: fullName,
      user_name: fullName,
      customer_name: fullName,
      from_email: email,
      user_email: email,
      email: email,
      reply_to: email,
      phone: phone,
      user_phone: phone,
      service: serviceNeeded,
      service_needed: serviceNeeded,
      city_state: cityState || 'Not specified',
      location: cityState || 'Not specified',
      preferred_date: preferredDate || 'Flexible / As soon as possible',
      preferred_time: preferredTime || 'Flexible / As soon as possible',
      message: formattedMessage,
      request_type: requestType,
      quote_reference_id: quoteReferenceId || 'N/A',
      coupon_code: data.couponCode || 'None',
      pricing: data.pricingBreakdown || 'Standard upfront estimate upon inspection',
      pricing_breakdown: data.pricingBreakdown || '',
      subject: subject,
    };

  const emailJsPayload: Record<string, any> = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    accessToken: privateKey,
    template_params: templateParams,
  };

  console.log(`[EmailJS Dispatch] Sending ${requestType} lead to ${RECIPIENT_EMAIL} (Service: ${serviceId}, Template: ${templateId})...`);

  const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Origin': process.env.APP_URL || process.env.URL || 'http://localhost:3000',
    },
    body: JSON.stringify(emailJsPayload),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => 'Unknown error');
    console.error(`[EmailJS Error] HTTP ${response.status}:`, errorText);
    throw new Error(`EmailJS delivery rejected (${response.status}): ${errorText}`);
  }

  const responseText = await response.text().catch(() => 'OK');
  console.log('[EmailJS Success] Delivery confirmed by EmailJS API:', responseText || 'OK');
  return { success: true, provider: 'emailjs', response: responseText || 'OK' };
}
