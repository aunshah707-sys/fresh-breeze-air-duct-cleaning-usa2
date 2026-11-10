import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { sendEmailNotification } from './lib/email';
import { calculatePricing } from './lib/pricing';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  
  // Support --port and --host CLI flags passed by dev runner
  const portArgIndex = process.argv.indexOf('--port');
  const portFromArg = portArgIndex !== -1 ? parseInt(process.argv[portArgIndex + 1], 10) : undefined;
  // Dev server must listen on port 3000. Cloud Run sets PORT=8080 for Nginx, so avoid binding to 8080.
  const PORT = portFromArg || (process.env.PORT && process.env.PORT !== '8080' ? parseInt(process.env.PORT, 10) : 3000);

  const hostArgIndex = process.argv.indexOf('--host');
  const HOST = hostArgIndex !== -1 ? process.argv[hostArgIndex + 1] : '0.0.0.0';

  app.use(express.json());

  // API endpoint for coupon validation & server time check
  const handleValidateCoupon = (req: express.Request, res: express.Response) => {
    try {
      const code = (req.body?.couponCode || req.body?.code || req.query?.code || req.query?.couponCode || '').toString();
      const service = (req.body?.service || req.body?.serviceNeeded || req.query?.service || req.query?.serviceNeeded || 'Air Duct Cleaning').toString();

      // Server-authoritative calculation
      const pricing = calculatePricing(service, code, Date.now());

      return res.status(200).json({
        success: true,
        ...pricing,
      });
    } catch (err: any) {
      console.error('Error in /api/validate-coupon:', err.message);
      return res.status(500).json({
        success: false,
        error: 'Unable to validate coupon at this time.',
      });
    }
  };

  app.post('/api/validate-coupon', handleValidateCoupon);
  app.get('/api/validate-coupon', handleValidateCoupon);

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
      const { fullName, name, phone, email, cityState, zipCode, serviceNeeded, preferredDate, message, quoteReferenceId, couponCode } = req.body;
      const customerName = (fullName || name || '').trim();
      const location = (zipCode || cityState || '').trim();

      if (!customerName || !phone || !serviceNeeded || !location) {
        return res.status(400).json({
          success: false,
          error: 'Please fill in all required fields (Full Name, Phone, ZIP Code, and Service).',
        });
      }

      const emailTrimmed = (email || '').trim();
      if (emailTrimmed) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailTrimmed)) {
          return res.status(400).json({
            success: false,
            error: 'Please provide a valid email address.',
          });
        }
      }

      // Clean service name if legacy format had promo in string
      let cleanService = serviceNeeded.replace(/\s*\([^)]*\)/g, '').trim();
      if (!cleanService) cleanService = serviceNeeded.trim();

      // Extract coupon code from payload or promo text
      let effectiveCoupon = (couponCode || '').trim();
      if (!effectiveCoupon && /(FRESH40|FRESH50|FRESHOCT)/i.test(serviceNeeded)) {
        const match = serviceNeeded.match(/(FRESH40|FRESH50|FRESHOCT)/i);
        effectiveCoupon = match ? match[1].toUpperCase() : 'FRESH40';
      }

      // Strict server-side pricing & coupon calculation using server clock
      const pricing = calculatePricing(cleanService, effectiveCoupon, Date.now());

      let pricingSummaryText = '';
      if (pricing.couponValid) {
        pricingSummaryText = `Regular Price: $${pricing.regularPrice.toFixed(2)} | November Discount (${pricing.discountPercent}%): -$${pricing.discountAmount.toFixed(2)} (Coupon: ${pricing.couponCode}) | Final Price: $${pricing.finalPrice.toFixed(2)}`;
      } else if (pricing.couponExpired) {
        pricingSummaryText = `Regular Price: $${pricing.regularPrice.toFixed(2)} | Discount: $0.00 (Coupon ${effectiveCoupon} expired: ${pricing.message}) | Final Price: $${pricing.finalPrice.toFixed(2)}`;
      } else {
        pricingSummaryText = `Regular Price: $${pricing.regularPrice.toFixed(2)} | Final Price: $${pricing.finalPrice.toFixed(2)}`;
      }

      const refId = quoteReferenceId || `FB-${Math.floor(100000 + Math.random() * 900000)}`;

      const delivery = await sendEmailNotification({
        fullName: customerName,
        phone: phone.trim(),
        email: emailTrimmed,
        cityState: location,
        serviceNeeded: cleanService,
        preferredDate: preferredDate?.trim(),
        message: message?.trim(),
        requestType: 'Free Quote',
        quoteReferenceId: refId,
        couponCode: pricing.couponValid ? pricing.couponCode : (pricing.couponExpired ? `${effectiveCoupon} (EXPIRED)` : undefined),
        pricingBreakdown: pricingSummaryText,
      });

      return res.status(200).json({
        success: true,
        provider: delivery.provider,
        quoteReferenceId: refId,
        pricing,
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

  // Direct delivery for sitemap.xml and robots.txt with strict content types
  app.get('/sitemap.xml', (req, res) => {
    res.setHeader('Content-Type', 'application/xml; charset=UTF-8');
    const sitemapPath = process.env.NODE_ENV === 'production'
      ? path.resolve(__dirname, 'dist', 'sitemap.xml')
      : path.resolve(__dirname, 'public', 'sitemap.xml');
    res.sendFile(sitemapPath);
  });

  app.get('/robots.txt', (req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=UTF-8');
    const robotsPath = process.env.NODE_ENV === 'production'
      ? path.resolve(__dirname, 'dist', 'robots.txt')
      : path.resolve(__dirname, 'public', 'robots.txt');
    res.sendFile(robotsPath);
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

    // Fallback in dev mode for client-side SPA routing
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const indexHtmlPath = path.resolve(__dirname, 'index.html');
        let template = await fs.promises.readFile(indexHtmlPath, 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e) {
        next(e);
      }
    });
  }

  const server = app.listen(Number(PORT), HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });

  server.on('error', (err: any) => {
    console.error('Server error:', err);
  });
}

startServer();
