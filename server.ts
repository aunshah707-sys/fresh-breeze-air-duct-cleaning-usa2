import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RECIPIENT_EMAIL = 'freshbreezeairductcleaningusa@gmail.com';

interface EmailNotificationPayload {
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
}

async function sendEmailNotification(data: EmailNotificationPayload) {
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
  const serviceId = (process.env.EMAILJS_SERVICE_ID || process.env.VITE_EMAILJS_SERVICE_ID || 'service_xr7lyvb').trim();
  const templateId = (process.env.EMAILJS_TEMPLATE_ID || process.env.VITE_EMAILJS_TEMPLATE_ID || 'template_7m4qanl').trim();
  const publicKey = (
    process.env.EMAILJS_PUBLIC_KEY || 
    process.env.EMAILJS_USER_ID || 
    process.env.VITE_EMAILJS_PUBLIC_KEY || 
    process.env.VITE_EMAILJS_USER_ID || 
    '8c4qODvW2YlSacDQT'
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

  // Build template parameters with all submitted form fields and common aliases
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
    message: message && message.trim() ? message.trim() : 'No additional message provided',
    request_type: requestType,
    quote_reference_id: quoteReferenceId || 'N/A',
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
      'Origin': process.env.APP_URL || 'http://localhost:3000',
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

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(express.json());

  // API endpoint for callback form submission
  app.post('/api/callback', async (req, res) => {
    try {
      const { fullName, phone, email, serviceNeeded, preferredTime, message } = req.body;

      if (!fullName || !phone || !email || !serviceNeeded) {
        return res.status(400).json({
          success: false,
          error: 'Please fill in all required fields (Full Name, Phone, Email, and Service).',
        });
      }

      // Basic email syntax validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: 'Please provide a valid email address.',
        });
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

      return res.status(200).json({
        success: true,
        provider: delivery.provider,
        message: "Thank you! Your callback request has been received. We'll contact you shortly.",
      });
    } catch (err: any) {
      console.error('Error handling /api/callback:', err.message);
      return res.status(502).json({
        success: false,
        error: 'Email delivery failed. The request could not be sent to our team at this time. Please call us directly.',
        details: err.message,
      });
    }
  });

  // API endpoint for quote form submission
  app.post('/api/quote', async (req, res) => {
    try {
      const { fullName, name, phone, email, cityState, serviceNeeded, preferredDate, message, quoteReferenceId } = req.body;
      const customerName = (fullName || name || '').trim();

      if (!customerName || !phone || !email || !serviceNeeded || !cityState) {
        return res.status(400).json({
          success: false,
          error: 'Please fill in all required fields (Full Name, Phone, Email, Location, and Service).',
        });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          error: 'Please provide a valid email address.',
        });
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

      return res.status(200).json({
        success: true,
        provider: delivery.provider,
        quoteReferenceId: refId,
        message: 'Your quote request has been sent to our team! We will follow up shortly.',
      });
    } catch (err: any) {
      console.error('Error handling /api/quote:', err.message);
      return res.status(502).json({
        success: false,
        error: 'Email delivery failed. The request could not be sent to our team at this time. Please call us directly.',
        details: err.message,
      });
    }
  });

  // Healthcheck
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // Serve public static assets (favicons, manifests, etc.)
  app.use(express.static(path.resolve(__dirname, 'public')));

  // Vite integration
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
