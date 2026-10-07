import React, { useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Phone, 
  CheckCircle2, 
  ShieldAlert, 
  HelpCircle, 
  Tag, 
  Sparkles, 
  ChevronRight,
  Wind,
  Flame,
  Cpu
} from 'lucide-react';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { updateDocumentSEO, setPageStructuredData, CANONICAL_DOMAIN } from '../utils/seo';
import { SERVICES_DATA, ServiceDetail } from './ServiceDetailModal';
import { getServiceRegularPrice, PROMO_COUPON_CODE } from '../../lib/pricing';

export interface ServiceSEOInfo {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroSummary: string;
  faqs: { question: string; answer: string }[];
}

export const SERVICE_SEO_MAP: Record<string, ServiceSEOInfo> = {
  'air-duct-cleaning': {
    slug: 'air-duct-cleaning',
    metaTitle: 'Air Duct Cleaning Services | Fresh Breeze',
    metaDescription: 'Professional air duct cleaning services to remove dust, allergens, and debris from home supply and return vents. Improve indoor airflow with a free quote today.',
    h1: 'Professional Air Duct Cleaning Services',
    heroSummary: 'Comprehensive residential and commercial air duct cleaning across all supply vents and return vents to clear dust, debris, and allergens while restoring healthy indoor airflow and HVAC efficiency.',
    faqs: [
      {
        question: 'How do technicians clean residential air ducts?',
        answer: 'Technicians inspect all accessible registers, use mechanical rotary brushes to dislodge settled dust inside duct walls, and collect all loose debris directly into negative-air HEPA collection equipment so dust never blows into your home.',
      },
      {
        question: 'How often is residential air duct cleaning recommended?',
        answer: 'Most single-family homes benefit from professional air duct cleaning every 3 to 5 years, or sooner if you have indoor pets, family members with dust sensitivity, or recently completed home remodeling.',
      },
      {
        question: 'Does air duct cleaning reduce dust on household furniture?',
        answer: 'Yes. Removing accumulated debris and pet dander from the supply and return lines stops that settled dust from recirculating through your registers every time the HVAC fan starts up.',
      }
    ],
  },
  'dryer-vent-cleaning': {
    slug: 'dryer-vent-cleaning',
    metaTitle: 'Dryer Vent Cleaning Services | Fresh Breeze',
    metaDescription: 'Professional dryer vent cleaning services to clear clogged lint, restore airflow, improve drying times, and reduce fire hazards. Request a free quote today.',
    h1: 'Professional Dryer Vent Cleaning Services',
    heroSummary: 'Full-length mechanical lint removal from behind your clothes dryer through the entire exhaust vent run to the outdoor termination hood, eliminating blockages and dryer fire hazards.',
    faqs: [
      {
        question: 'Why does the dryer exhaust line need professional cleaning if there is a lint screen?',
        answer: 'Lint screens capture large fibers, but fine combustible lint passes through the mesh and adheres to the interior walls of your vent tubing, gradually narrowing the exhaust line over time.',
      },
      {
        question: 'How do I know my dryer vent line is obstructed?',
        answer: 'Common indicators include clothing taking multiple cycles to dry, the dryer exterior becoming noticeably hot to the touch, or minimal air coming from the exterior exhaust termination hood.',
      },
      {
        question: 'How often should residential dryer vent cleaning be scheduled?',
        answer: 'Annual dryer vent cleaning is recommended for most residential homes to preserve appliance efficiency and minimize lint fire hazards.',
      }
    ],
  },
  'hvac-cleaning': {
    slug: 'hvac-cleaning',
    metaTitle: 'HVAC Cleaning Services | Fresh Breeze',
    metaDescription: 'Comprehensive HVAC cleaning services for air handlers, blower wheels, and system coils to improve airflow and efficiency. Get your free estimate today.',
    h1: 'Professional HVAC Cleaning Services',
    heroSummary: 'Targeted cleaning of central heating and cooling equipment components, including the blower motor wheel, air handler cabinet, and evaporator coil surfaces for optimal airflow and efficiency.',
    faqs: [
      {
        question: 'What parts of my heating and cooling unit are cleaned?',
        answer: 'Our HVAC cleaning services focus on key internal components that accumulate grime, including the blower motor and fan wheel, accessible evaporator coil surfaces, air handler interior, and primary return drop.',
      },
      {
        question: 'How does cleaning the HVAC unit help airflow?',
        answer: 'Grime and lint sticking to blower fins reduce fan propulsion, while clogged coil fins restrict airflow across heat-exchange surfaces. Cleaning restores design airflow specifications.',
      },
      {
        question: 'Is HVAC component cleaning different from duct cleaning?',
        answer: 'Yes. Air duct cleaning focuses on the distribution channels (ductwork and registers), while HVAC cleaning focuses on the mechanical air handler unit and blower assembly that pushes the air.',
      }
    ],
  },
  'chimney-cleaning': {
    slug: 'chimney-cleaning',
    metaTitle: 'Chimney Cleaning Services | Fresh Breeze',
    metaDescription: 'Professional chimney cleaning and fireplace flue sweep services to remove soot and creosote buildup for safer indoor heating. Request a free quote today.',
    h1: 'Professional Chimney Cleaning Services',
    heroSummary: 'Thorough fireplace and chimney flue sweeps to remove combustible creosote, soot deposits, and drafting blockages for safe, dependable fireplace maintenance.',
    faqs: [
      {
        question: 'What is creosote and why must it be swept from chimneys?',
        answer: 'Creosote is a highly flammable byproduct of wood and solid fuel burning that condenses along flue liner walls. If left uncleaned, high heat can ignite creosote and cause dangerous chimney fires.',
      },
      {
        question: 'Will chimney sweeping create a mess inside my living room?',
        answer: 'No. Our technicians use heavy-duty hearth drop cloths, sealed flue vacuums, and negative containment equipment to ensure all loosened soot and ash are contained immediately at the fireplace opening.',
      },
      {
        question: 'How frequently should residential chimneys be cleaned?',
        answer: 'Annual inspections and sweeps are standard for fireplaces burned seasonally, or after burning roughly one full cord of wood.',
      }
    ],
  },
};

interface ServicePageProps {
  serviceId: string;
  onBackToHome: () => void;
  onOpenQuote: (serviceName?: string) => void;
  onOpenCallback: () => void;
  onNavigateToService: (serviceSlug: string) => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const ServicePage: React.FC<ServicePageProps> = ({
  serviceId,
  onBackToHome,
  onOpenQuote,
  onOpenCallback,
  onNavigateToService,
  theme,
  onToggleTheme,
}) => {
  const service = SERVICES_DATA.find((s) => s.id === serviceId) || SERVICES_DATA[0];
  const seo = SERVICE_SEO_MAP[service.id] || SERVICE_SEO_MAP['air-duct-cleaning'];
  const regularPrice = getServiceRegularPrice(service.title);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    updateDocumentSEO({
      title: seo.metaTitle,
      description: seo.metaDescription,
      canonicalPath: `/services/${seo.slug}`,
    });

    // Inject rich Schema.org structured data (Breadcrumbs, Service, and FAQPage)
    setPageStructuredData({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          '@id': `${CANONICAL_DOMAIN}/services/${seo.slug}#breadcrumb`,
          'itemListElement': [
            {
              '@type': 'ListItem',
              'position': 1,
              'name': 'Home',
              'item': `${CANONICAL_DOMAIN}/`,
            },
            {
              '@type': 'ListItem',
              'position': 2,
              'name': 'Services',
              'item': `${CANONICAL_DOMAIN}/#services`,
            },
            {
              '@type': 'ListItem',
              'position': 3,
              'name': service.title,
              'item': `${CANONICAL_DOMAIN}/services/${seo.slug}`,
            },
          ],
        },
        {
          '@type': 'Service',
          '@id': `${CANONICAL_DOMAIN}/services/${seo.slug}#service`,
          'name': `${service.title} Services`,
          'serviceType': service.title,
          'description': service.description,
          'provider': {
            '@type': 'HomeAndConstructionBusiness',
            '@id': `${CANONICAL_DOMAIN}/#business`,
            'name': 'Fresh Breeze Air Duct Cleaning USA',
          },
          'areaServed': {
            '@type': 'Country',
            'name': 'United States',
          },
          'offers': {
            '@type': 'Offer',
            'price': regularPrice,
            'priceCurrency': 'USD',
            'availability': 'https://schema.org/InStock',
          },
        },
        {
          '@type': 'FAQPage',
          '@id': `${CANONICAL_DOMAIN}/services/${seo.slug}#faq`,
          'mainEntity': seo.faqs.map((faq) => ({
            '@type': 'Question',
            'name': faq.question,
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': faq.answer,
            },
          })),
        },
      ],
    });

    return () => {
      // Clean up dynamic structured data and revert to homepage SEO
      setPageStructuredData(null);
      updateDocumentSEO({
        title: 'Air Duct Cleaning USA | Fresh Breeze Air Duct Cleaning',
        description: 'Professional air duct cleaning services, dryer vent cleaning, HVAC cleaning, and chimney cleaning across the USA. Request your free upfront quote today.',
        canonicalPath: '/',
      });
    };
  }, [seo, service, regularPrice]);

  const otherServices = SERVICES_DATA.filter((s) => s.id !== service.id);

  const getIcon = () => {
    switch (service.iconName) {
      case 'Wind': return <Wind className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
      case 'Flame': return <Flame className="w-5 h-5 text-amber-500 dark:text-amber-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
      default: return <Wind className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200 flex flex-col">
      {/* Top Sticky Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-sky-700 dark:hover:text-sky-400 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
            <div className="hidden sm:block h-4 w-px bg-slate-200 dark:bg-slate-800" />
            <a href="/" onClick={(e) => { e.preventDefault(); onBackToHome(); }}>
              <Logo size="sm" />
            </a>
          </div>

          <div className="flex items-center gap-2.5">
            {theme && onToggleTheme && (
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            )}
            <button
              onClick={onOpenCallback}
              className="hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-sky-700 dark:hover:text-white bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>REQUEST CALLBACK</span>
            </button>
            <button
              onClick={() => onOpenQuote(service.title)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-linear-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 shadow-sm transition-all cursor-pointer"
            >
              <span>FREE QUOTE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Service Content */}
      <main className="grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <button onClick={onBackToHome} className="hover:text-sky-600 dark:hover:text-sky-400 cursor-pointer">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span>Services</span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">{service.title}</span>
        </nav>

        {/* Hero Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-10 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 text-xs font-semibold border border-sky-100 dark:border-sky-800/80">
                {getIcon()}
                <span>Fresh Breeze Residential Cleaning</span>
              </div>

              {/* H1 Heading */}
              <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display">
                {seo.h1}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                {seo.heroSummary}
              </p>

              {/* Price & Promo Highlight */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200">
                  Regular Price: ${regularPrice}
                </div>
                <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                  <Tag className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>October Special: 40% OFF with code {PROMO_COUPON_CODE}</span>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => onOpenQuote(service.title)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>GET A FREE QUOTE ON THIS SERVICE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenCallback}
                  className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs sm:text-sm border border-slate-200 dark:border-slate-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>REQUEST A CALLBACK</span>
                </button>
              </div>
            </div>

            {/* Visual Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-md border-2 border-white dark:border-slate-800 aspect-4/3">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  loading="lazy"
                  width={640}
                  height={480}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Service Scope Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-10 space-y-6 text-left">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
              What Our {service.title} Service Includes
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {service.description}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {service.whatIncluded.map((item, idx) => (
              <div 
                key={idx} 
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-200"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Warning Signs & Homeowner Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* Warning Signs */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <ShieldAlert className="w-5 h-5" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                Signs It May Be Time for Cleaning
              </h2>
            </div>
            <div className="space-y-2.5">
              {service.warningSigns.map((sign, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/30 text-xs sm:text-sm text-slate-700 dark:text-slate-200 flex items-start gap-2.5">
                  <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                  <span>{sign}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
              <Sparkles className="w-5 h-5" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white font-display">
                Key Homeowner Benefits
              </h2>
            </div>
            <div className="space-y-2.5">
              {service.homeownerBenefits.map((benefit, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-sky-50/50 dark:bg-sky-950/20 border border-sky-200/60 dark:border-sky-900/30 text-xs sm:text-sm text-slate-700 dark:text-slate-200 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Service-Specific FAQ Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-10 space-y-6 text-left">
          <div className="flex items-center gap-2 text-sky-600 dark:text-sky-400">
            <HelpCircle className="w-5 h-5" />
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white font-display">
              Frequently Asked Questions About {service.title}
            </h2>
          </div>

          <div className="space-y-4">
            {seo.faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-2">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Internal Linking: Explore Other Cleaning Services */}
        <section className="bg-slate-100/70 dark:bg-slate-900/70 rounded-3xl p-6 sm:p-8 space-y-4 text-left border border-slate-200 dark:border-slate-800">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white font-display">
            Explore Other Professional Cleaning Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherServices.map((other) => (
              <button
                key={other.id}
                onClick={() => onNavigateToService(other.id)}
                className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-sky-300 dark:hover:border-sky-500 text-left transition-all group cursor-pointer shadow-2xs hover:shadow-xs"
              >
                <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 flex items-center justify-between">
                  <span>{other.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                </h3>
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {other.tagline}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* Bottom Conversion Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-linear-to-r from-sky-600 via-sky-700 to-emerald-700 text-white text-center space-y-4 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
            Ready to Schedule Your {service.title}?
          </h2>
          <p className="text-xs sm:text-sm text-sky-100 max-w-xl mx-auto">
            Get an upfront, transparent estimate for your home with zero obligation.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onOpenQuote(service.title)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-sky-800 hover:bg-sky-50 font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
            >
              REQUEST A FREE QUOTE
            </button>
            <button
              onClick={onOpenCallback}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
            >
              REQUEST A CALLBACK
            </button>
          </div>
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Fresh Breeze Air Duct Cleaning USA. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={onBackToHome} className="hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer">
              Home
            </button>
            <a href="/privacy-policy" onClick={(e) => { e.preventDefault(); onBackToHome(); window.location.pathname = '/privacy-policy'; }} className="hover:text-slate-800 dark:hover:text-slate-200">
              Privacy Policy
            </a>
            <a href="/terms" onClick={(e) => { e.preventDefault(); onBackToHome(); window.location.pathname = '/terms'; }} className="hover:text-slate-800 dark:hover:text-slate-200">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
