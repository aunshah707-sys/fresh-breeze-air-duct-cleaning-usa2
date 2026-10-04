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
import { Chatbot } from './components/Chatbot';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'privacy' | 'terms'>('home');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedQuoteService, setSelectedQuoteService] = useState<string>('Air Duct Cleaning');
  const [selectedQuoteLocation, setSelectedQuoteLocation] = useState<string>('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Sync route between URL path/hash and view
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/privacy-policy' || hash === '#privacy-policy') {
        setCurrentView('privacy');
      } else if (path === '/terms' || path === '/terms-and-conditions' || hash === '#terms' || hash === '#terms-and-conditions') {
        setCurrentView('terms');
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
    setIsQuoteModalOpen(true);
  };

  const handleCheckZip = (location: string) => {
    openQuoteModal(undefined, location);
  };

  const handleClaimPromo = () => {
    setAppliedPromo('40% OFF Promotion');
    openQuoteModal();
  };

  // If visitor is on the dedicated Privacy Policy page
  if (currentView === 'privacy') {
    return (
      <PrivacyPolicy onBackToHome={navigateToHome} />
    );
  }

  // If visitor is on the dedicated Terms & Conditions page
  if (currentView === 'terms') {
    return (
      <TermsAndConditions 
        onBackToHome={navigateToHome} 
        onOpenCall={() => setIsCallModalOpen(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-sky-100 selection:text-sky-900 flex flex-col">
      {/* 1. Header Navigation */}
      <Navbar
        onOpenQuote={() => openQuoteModal()}
        onOpenCallback={() => setIsCallModalOpen(true)}
      />

      <main className="grow pb-16 md:pb-0">
        {/* 2. Hero */}
        <Hero
          onOpenQuote={() => openQuoteModal()}
          onOpenCallback={() => setIsCallModalOpen(true)}
        />

        {/* 3. Our Services (Air Duct Cleaning, Dryer Vent Cleaning, HVAC Cleaning, Chimney Cleaning) */}
        <ServicesSection
          onLearnMore={(serviceId) => setSelectedServiceId(serviceId)}
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
          onOpenCall={() => setIsCallModalOpen(true)}
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
        onOpenCall={() => setIsCallModalOpen(true)}
        onOpenPrivacyPolicy={navigateToPrivacy}
        onOpenTerms={navigateToTerms}
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
        onOpenCallback={() => setIsCallModalOpen(true)} 
      />
    </div>
  );
}
