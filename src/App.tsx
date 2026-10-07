/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { HowItWorks } from './components/HowItWorks';
import { ServiceArea } from './components/ServiceArea';
import { FAQSection } from './components/FAQSection';
import { FreeQuoteForm } from './components/FreeQuoteForm';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { CallModal } from './components/CallModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { PromoModal } from './components/PromoModal';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsAndConditions } from './components/TermsAndConditions';
import { ServicePage } from './components/ServicePage';
import { Chatbot } from './components/Chatbot';
import { updateDocumentSEO, setPageStructuredData } from './utils/seo';
import { trackPageView, trackCtaClick } from './utils/analytics';

const THEME_STORAGE_KEY = 'fresh_breeze_theme';

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    // Respect system preference only if the user has not previously selected a mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
  } catch (err) {
    console.error('Failed to read theme from localStorage', err);
  }
  return 'light'; // Default to Light Mode for new visitors
};

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'privacy' | 'terms' | 'service'>('home');
  const [currentServiceSlug, setCurrentServiceSlug] = useState<string>('air-duct-cleaning');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedQuoteService, setSelectedQuoteService] = useState<string>('Air Duct Cleaning');
  const [selectedQuoteLocation, setSelectedQuoteLocation] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);

  // Sync theme class on <html> and update theme-color meta tag
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      metaTheme.setAttribute('content', theme === 'dark' ? '#0f172a' : '#0284c7');
    }
  }, [theme]);

  // Listen to system preference changes if user hasn't chosen an explicit mode
  useEffect(() => {
    if (!window.matchMedia) return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemChange = (e: MediaQueryListEvent) => {
      try {
        const saved = localStorage.getItem(THEME_STORAGE_KEY);
        // Only respect system preference if the user has not previously selected a mode
        if (!saved) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      } catch {}
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (err) {
      console.error('Failed to save theme', err);
    }
  };

  // Sync route between URL path/hash and view
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/privacy-policy' || hash === '#privacy-policy') {
        setCurrentView('privacy');
      } else if (path === '/terms' || path === '/terms-and-conditions' || hash === '#terms' || hash === '#terms-and-conditions') {
        setCurrentView('terms');
      } else if (path.startsWith('/services/')) {
        const slug = path.replace('/services/', '').replace(/\/$/, '');
        if (slug) {
          setCurrentServiceSlug(slug);
          setCurrentView('service');
        } else {
          setCurrentView('home');
        }
      } else if (hash.startsWith('#services/')) {
        const slug = hash.replace('#services/', '').replace(/\/$/, '');
        if (slug) {
          setCurrentServiceSlug(slug);
          setCurrentView('service');
        } else {
          setCurrentView('home');
        }
      } else {
        setCurrentView('home');
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);

    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  // Update view SEO when view changes
  useEffect(() => {
    if (currentView === 'home') {
      updateDocumentSEO({
        title: 'Air Duct Cleaning USA | Fresh Breeze Air Duct Cleaning',
        description: 'Professional air duct cleaning services, dryer vent cleaning, HVAC cleaning, and chimney cleaning across the USA. Request your free upfront quote today.',
        canonicalPath: '/',
      });
      setPageStructuredData(null);
    } else if (currentView === 'privacy') {
      updateDocumentSEO({
        title: 'Privacy Policy | Fresh Breeze Air Duct Cleaning USA',
        description: 'Read the Fresh Breeze Air Duct Cleaning USA Privacy Policy to learn how we protect your personal information, contact details, and quote request submissions.',
        canonicalPath: '/privacy-policy',
      });
      setPageStructuredData({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://freshbreezeairductcleaning.site/',
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Privacy Policy',
            'item': 'https://freshbreezeairductcleaning.site/privacy-policy',
          },
        ],
      });
    } else if (currentView === 'terms') {
      updateDocumentSEO({
        title: 'Terms & Conditions | Fresh Breeze Air Duct Cleaning USA',
        description: 'Read the terms and conditions for using the Fresh Breeze Air Duct Cleaning USA website, requesting estimates, and scheduling residential cleaning services.',
        canonicalPath: '/terms',
      });
      setPageStructuredData({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          {
            '@type': 'ListItem',
            'position': 1,
            'name': 'Home',
            'item': 'https://freshbreezeairductcleaning.site/',
          },
          {
            '@type': 'ListItem',
            'position': 2,
            'name': 'Terms & Conditions',
            'item': 'https://freshbreezeairductcleaning.site/terms',
          },
        ],
      });
    }
  }, [currentView]);

  // Track SPA pageviews in GA4
  useEffect(() => {
    let path = '/';
    let title = 'Air Duct Cleaning USA | Fresh Breeze Air Duct Cleaning';

    if (currentView === 'privacy') {
      path = '/privacy-policy';
      title = 'Privacy Policy | Fresh Breeze Air Duct Cleaning USA';
    } else if (currentView === 'terms') {
      path = '/terms';
      title = 'Terms & Conditions | Fresh Breeze Air Duct Cleaning USA';
    } else if (currentView === 'service') {
      path = `/services/${currentServiceSlug}`;
      title = `${currentServiceSlug.replace(/-/g, ' ')} | Fresh Breeze`;
    }

    trackPageView(path, title);
  }, [currentView, currentServiceSlug]);

  const navigateToPrivacy = () => {
    try {
      window.history.pushState({}, '', '/privacy-policy');
    } catch {
      window.location.hash = 'privacy-policy';
    }
    setCurrentView('privacy');
  };

  const navigateToTerms = () => {
    try {
      window.history.pushState({}, '', '/terms');
    } catch {
      window.location.hash = 'terms';
    }
    setCurrentView('terms');
  };

  const navigateToService = (serviceSlug: string) => {
    try {
      window.history.pushState({}, '', `/services/${serviceSlug}`);
    } catch {
      window.location.hash = `services/${serviceSlug}`;
    }
    setCurrentServiceSlug(serviceSlug);
    setCurrentView('service');
  };

  const navigateToHome = () => {
    try {
      window.history.pushState({}, '', '/');
    } catch {
      window.location.hash = '';
    }
    setCurrentView('home');
  };

  // Open the Quote form in a modal popup without scrolling or redirecting
  const openQuoteModal = (serviceName?: string, location?: string) => {
    if (serviceName) {
      setSelectedQuoteService(serviceName);
    }
    if (location) {
      setSelectedQuoteLocation(location);
    }
    trackCtaClick('Open Free Quote Modal', serviceName || location || 'General');
    setIsQuoteModalOpen(true);
  };

  const handleCheckZip = (location: string) => {
    trackCtaClick('Check Zip Code Service Area', location);
    openQuoteModal(undefined, location);
  };

  const handleClaimPromo = (couponCode?: string) => {
    const code = couponCode || 'FRESHOCT';
    trackCtaClick(`Claim Promo: ${code}`, 'Promo Banner/Popup');
    setAppliedPromo(code);
    openQuoteModal();
  };

  const openCallbackModal = (source: string = 'General') => {
    trackCtaClick('Request a Callback Modal', source);
    setIsCallModalOpen(true);
  };

  // If visitor is on the dedicated Privacy Policy page
  if (currentView === 'privacy') {
    return (
      <PrivacyPolicy 
        onBackToHome={navigateToHome} 
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

    // If visitor is on the dedicated Terms & Conditions page
  if (currentView === 'terms') {
    return (
      <TermsAndConditions 
        onBackToHome={navigateToHome} 
        onOpenCall={() => openCallbackModal('Terms and Conditions Page')}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />
    );
  }

  // If visitor is on a dedicated Service Page
  if (currentView === 'service') {
    return (
      <>
        <ServicePage
          serviceId={currentServiceSlug}
          onBackToHome={navigateToHome}
          onOpenQuote={(serviceName) => openQuoteModal(serviceName)}
          onOpenCallback={() => openCallbackModal('Service Page')}
          onNavigateToService={navigateToService}
          theme={theme}
          onToggleTheme={handleToggleTheme}
        />

        {/* Global Modals accessible from Service Page */}
        <FreeQuoteForm
          isModal={true}
          isOpen={isQuoteModalOpen}
          onClose={() => setIsQuoteModalOpen(false)}
          initialService={selectedQuoteService}
          initialLocation={selectedQuoteLocation}
          appliedPromo={appliedPromo || ''}
          onClearPromo={() => setAppliedPromo(null)}
        />

        <CallModal
          isOpen={isCallModalOpen}
          onClose={() => setIsCallModalOpen(false)}
          onOpenQuote={() => {
            setIsCallModalOpen(false);
            openQuoteModal();
          }}
          appliedPromo={appliedPromo || undefined}
          onClearPromo={() => setAppliedPromo(null)}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans selection:bg-sky-100 selection:text-sky-900 dark:selection:bg-sky-900/60 dark:selection:text-sky-200 flex flex-col transition-colors duration-200">
      {/* 1. Header Navigation */}
      <Navbar
        onOpenQuote={() => openQuoteModal()}
        onOpenCallback={() => openCallbackModal('Navbar')}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main className="grow pb-16 md:pb-0">
        {/* 2. Hero */}
        <Hero
          onOpenQuote={() => openQuoteModal()}
          onOpenCallback={() => openCallbackModal('Hero')}
        />

        {/* 3. Our Services (Air Duct Cleaning, Dryer Vent Cleaning, HVAC Cleaning, Chimney Cleaning) */}
        <ServicesSection
          onLearnMore={(serviceId) => navigateToService(serviceId)}
          onSelectServiceForQuote={(serviceTitle) => openQuoteModal(serviceTitle)}
        />

        {/* 4. Why Choose Fresh Breeze */}
        <WhyChooseUs onOpenQuote={() => openQuoteModal()} />

        {/* 5. How It Works */}
        <HowItWorks onOpenQuote={() => openQuoteModal()} />

        {/* 6. Service Areas */}
        <ServiceArea onCheckZip={handleCheckZip} />

        {/* 7. FAQ */}
        <FAQSection
          onOpenQuote={() => openQuoteModal()}
          onOpenCall={() => openCallbackModal('FAQ Section')}
          onNavigateToService={navigateToService}
        />

        {/* 8. Free Quote / Contact Form (Inline section for page readers) */}
        <FreeQuoteForm
          initialService={selectedQuoteService}
          initialLocation={selectedQuoteLocation}
          appliedPromo={appliedPromo || ''}
          onClearPromo={() => setAppliedPromo(null)}
        />

        {/* 9. Strong Contact CTA Section */}
        <ContactCTA onOpenQuote={() => openQuoteModal()} />
      </main>

      {/* 10. Footer */}
      <Footer
        onOpenQuote={() => openQuoteModal()}
        onOpenCall={() => openCallbackModal('Footer')}
        onOpenPrivacyPolicy={navigateToPrivacy}
        onOpenTerms={navigateToTerms}
        onNavigateToService={navigateToService}
      />

      {/* Interactive Modals */}
      <FreeQuoteForm
        isModal={true}
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialService={selectedQuoteService}
        initialLocation={selectedQuoteLocation}
        appliedPromo={appliedPromo || ''}
        onClearPromo={() => setAppliedPromo(null)}
      />

      <CallModal
        isOpen={isCallModalOpen}
        onClose={() => setIsCallModalOpen(false)}
        onOpenQuote={() => {
          setIsCallModalOpen(false);
          openQuoteModal();
        }}
        appliedPromo={appliedPromo || undefined}
        onClearPromo={() => setAppliedPromo(null)}
      />

      <ServiceDetailModal
        serviceId={selectedServiceId}
        onClose={() => setSelectedServiceId(null)}
        onSelectForQuote={(serviceTitle) => {
          setSelectedServiceId(null);
          openQuoteModal(serviceTitle);
        }}
      />

      {/* 40% OFF Promotional Popup (Displays once per session after 2-3 sec delay) */}
      <PromoModal onClaimOffer={handleClaimPromo} />

      {/* Floating Chatbot Assistant with Instagram DM Quick-Action */}
      <Chatbot 
        onOpenQuote={() => openQuoteModal()} 
        onOpenCallback={() => openCallbackModal('Chatbot')} 
      />
    </div>
  );
}
