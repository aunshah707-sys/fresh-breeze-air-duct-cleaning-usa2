import React from 'react';
import { X, CheckCircle, ShieldAlert, ArrowRight, Wind, Flame, Cpu, Sparkles } from 'lucide-react';
import airDuctImg from '../assets/images/service_air_duct_cleaning.webp';
import airDuctSmImg from '../assets/images/service_air_duct_cleaning_sm.webp';
import dryerVentImg from '../assets/images/service_dryer_vent_cleaning.webp';
import dryerVentSmImg from '../assets/images/service_dryer_vent_cleaning_sm.webp';
import hvacImg from '../assets/images/hero_air_duct_technician.webp';
import hvacSmImg from '../assets/images/hero_air_duct_technician_mobile.webp';
import chimneyImg from '../assets/images/service_chimney_cleaning.webp';
import chimneySmImg from '../assets/images/service_chimney_cleaning_sm.webp';
import { EquipmentSection } from './EquipmentSection';

export interface ServiceDetail {
  id: string;
  title: string;
  tagline: string;
  image: string;
  imageSm?: string;
  imageWidth: number;
  imageHeight: number;
  imageSmWidth?: number;
  imageSmHeight?: number;
  imageAlt: string;
  iconName: string;
  description: string;
  whatIncluded: string[];
  warningSigns: string[];
  homeownerBenefits: string[];
}

export const getServiceSrcSet = (service: ServiceDetail): string | undefined => {
  if (service.imageSm && service.imageSmWidth && service.imageWidth) {
    return `${service.imageSm} ${service.imageSmWidth}w, ${service.image} ${service.imageWidth}w`;
  }
  return undefined;
};

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'air-duct-cleaning',
    title: 'Air Duct Cleaning',
    tagline: "Remove accumulated dust, debris, and allergens from your home's air duct system.",
    image: airDuctImg,
    imageSm: airDuctSmImg,
    imageWidth: 800,
    imageHeight: 597,
    imageSmWidth: 400,
    imageSmHeight: 299,
    imageAlt: 'Professional air duct cleaning technician using rotary brush and HEPA negative-air vacuum equipment',
    iconName: 'Wind',
    description: "Our professional air duct cleaning service thoroughly cleans residential and commercial ventilation systems, removing dust, allergens, pet dander, and debris from supply vents and return vents. Using mechanical rotary brush agitation and high-powered negative-air HEPA collection equipment, we clean every duct run to restore unrestricted airflow, support HVAC efficiency, and improve indoor air quality.",
    whatIncluded: [
      'Comprehensive inspection of all accessible supply and return duct vents',
      'Rotary brush mechanical agitation to dislodge settled dust in ductwork',
      'High-velocity negative-air HEPA vacuum containment of dislodged debris',
      'Wipe-down of accessible vent register covers and grilles',
      'System-wide airflow verification across cleaned duct lines'
    ],
    warningSigns: [
      'Visible dust plumes blowing from vents when the heating or AC turns on',
      'Excessive dust accumulating rapidly across furniture and surfaces',
      'Stale, dusty odor emanating from ventilation registers',
      'Recent home renovation, sanding, drywall, or floor refinishing work'
    ],
    homeownerBenefits: [
      'Significantly less dust recirculating into bedrooms and living spaces',
      'Restores unrestricted airflow throughout the duct system',
      'Contributes to a cleaner, fresher home environment'
    ]
  },
  {
    id: 'dryer-vent-cleaning',
    title: 'Dryer Vent Cleaning',
    tagline: 'Help improve dryer airflow and reduce lint buildup with professional dryer vent cleaning services.',
    image: dryerVentImg,
    imageSm: dryerVentSmImg,
    imageWidth: 800,
    imageHeight: 597,
    imageSmWidth: 400,
    imageSmHeight: 299,
    imageAlt: 'Professional dryer vent cleaning service removing lint buildup from exhaust duct line',
    iconName: 'Flame',
    description: "While the lint screen captures larger fibers, fine combustible lint bypasses the trap and leads to a clogged dryer vent over time. Our dryer vent cleaning service clears packed lint buildup from behind the dryer through the full exhaust vent line to the outdoor exhaust hood, resolving long drying times, restoring dryer airflow efficiency, and preventing hazardous dryer vent blockages.",
    whatIncluded: [
      'Mechanical rotary rod and brush cleaning through the entire exhaust vent run',
      'High-powered vacuum extraction of packed lint along the tubing',
      'Inspection of flexible transition connection behind the dryer unit',
      'Outdoor exhaust hood and damper flap movement verification',
      'Exhaust airflow check before and after cleaning'
    ],
    warningSigns: [
      'Clothes take more than one cycle or unusual time to dry completely',
      'Dryer exterior and laundry room become excessively hot during operation',
      'Exterior exhaust damper does not open or shows minimal airflow during cycles',
      'More than a year has elapsed since the dryer exhaust was last cleared'
    ],
    homeownerBenefits: [
      'Removes flammable lint obstruction, reducing dryer fire risk',
      'Restores proper exhaust flow so clothes dry in normal cycle times',
      'Helps prevent excessive heat wear on the dryer heating element'
    ]
  },
  {
    id: 'hvac-cleaning',
    title: 'HVAC Cleaning',
    tagline: 'Professional cleaning solutions designed to help keep your HVAC system and home environment cleaner.',
    image: hvacImg,
    imageSm: hvacSmImg,
    imageWidth: 1200,
    imageHeight: 670,
    imageSmWidth: 640,
    imageSmHeight: 357,
    imageAlt: 'Technician performing HVAC system cleaning on blower wheel and air handler cabinet',
    iconName: 'Cpu',
    description: "Central HVAC systems circulate indoor air throughout the home continuously. Our professional HVAC cleaning service targets critical internal system components that collect dust buildup and grime, including the air handler cabinet, blower motor wheel assembly, and accessible evaporator coil surfaces. Deep cleaning helps maintain system airflow, supports HVAC efficiency, and promotes cleaner indoor air.",
    whatIncluded: [
      'Surface cleaning and particulate vacuuming of the air handler cabinet',
      'Blower wheel fin inspection and dust removal',
      'Accessible evaporator coil surface cleaning and debris clearance',
      'Furnace plenum and primary return drop interior wipe-down',
      'Filter compartment check and proper seating verification'
    ],
    warningSigns: [
      'HVAC unit runs longer cycles to reach thermostat temperatures',
      'Dust or film visible inside the furnace or air handler cabinet',
      'Musty or damp odor near the indoor heating/cooling unit',
      'System has not received component cleaning during recent seasons'
    ],
    homeownerBenefits: [
      'Helps maintain efficient airflow across heat exchange surfaces',
      'Prevents accumulated cabinet dust from blowing into supply channels',
      'Supports steady, reliable heating and cooling operation'
    ]
  },
  {
    id: 'chimney-cleaning',
    title: 'Chimney Cleaning',
    tagline: 'Professional chimney and fireplace flue sweeping to remove soot, creosote, and debris.',
    image: chimneyImg,
    imageSm: chimneySmImg,
    imageWidth: 800,
    imageHeight: 597,
    imageSmWidth: 400,
    imageSmHeight: 299,
    imageAlt: 'Professional chimney sweeping service clearing creosote and soot from fireplace flue',
    iconName: 'Sparkles',
    description: "Wood and fuel burning generates soot, ash, and flammable creosote deposits that build up along chimney flue walls. Our chimney cleaning and fireplace flue sweep service includes thorough chimney inspection and mechanical sweeping from the firebox to the chimney cap, clearing smoke chamber soot buildup and draft blockages for safe, dependable fireplace maintenance.",
    whatIncluded: [
      'Full chimney flue mechanical sweeping from fireplace to chimney top',
      'Soot and creosote deposit removal along flue liner walls',
      'Smoke shelf, throat damper, and firebox particulate clearance',
      'HEPA-filtered hearth containment to keep living rooms spotless',
      'Visual check of damper operation and flue draft pathway'
    ],
    warningSigns: [
      'Visible black creosote buildup or glazed soot along the flue walls',
      'Smoke drafting back into the room instead of drawing up the chimney',
      'Strong acrid or campfire odor from the fireplace when not in use',
      'Over a cord of wood burned or more than 12 months since last sweeping'
    ],
    homeownerBenefits: [
      'Removes flammable creosote deposits that pose chimney fire hazards',
      'Ensures proper drafting of smoke, soot, and fumes out of the home',
      'Leaves the fireplace and hearth safe and ready for family use'
    ]
  }
];

interface ServiceDetailModalProps {
  serviceId: string | null;
  onClose: () => void;
  onSelectForQuote: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({ serviceId, onClose, onSelectForQuote }) => {
  if (!serviceId) return null;

  const service = SERVICES_DATA.find((s) => s.id === serviceId);
  if (!service) return null;

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
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 bg-slate-950/40 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-[calc(100vw-1.25rem)] sm:max-w-2xl max-h-[90vh] flex flex-col glass-surface backdrop-blur-2xl rounded-3xl shadow-[0_24px_60px_-12px_rgba(2,132,199,0.25),0_0_0_1px_rgba(255,255,255,0.9)_inset] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)] border border-white/80 dark:border-white/10 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200 text-left"
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-detail-modal-title"
      >
        {/* Modal Header Image */}
        <div className="relative h-44 sm:h-56 bg-slate-900 overflow-hidden shrink-0">
          <img 
            src={service.image} 
            srcSet={getServiceSrcSet(service)}
            sizes="(max-width: 640px) 100vw, 600px"
            alt={service.imageAlt} 
            loading="lazy"
            decoding="async"
            width={service.imageWidth}
            height={service.imageHeight}
            className="w-full h-full object-cover object-center opacity-85"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/40 to-transparent" />
          
          <button 
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 rounded-2xl bg-black/40 text-white/90 hover:text-white hover:bg-black/60 backdrop-blur-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md flex items-center justify-center shadow-xs">
                {getIcon()}
              </span>
              <span className="text-emerald-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
                Fresh Breeze Service
              </span>
            </div>
            <h2 id="service-detail-modal-title" className="text-xl sm:text-2xl font-black text-white font-display">
              {service.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 space-y-5 sm:space-y-6 overflow-y-auto bg-transparent">
          {/* Description */}
          <div>
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
              Service Overview
            </h3>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* What's Included */}
          <div>
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>What Is Included</span>
            </h3>
            <div className="grid grid-cols-1 gap-2.5 bg-white/70 dark:bg-slate-800/60 backdrop-blur-md p-4 rounded-2xl border border-white/80 dark:border-white/10 shadow-2xs">
              {service.whatIncluded.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Warning Signs */}
          <div>
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Signs It May Be Time For Cleaning</span>
            </h3>
            <div className="grid grid-cols-1 gap-2.5 bg-amber-50/70 dark:bg-amber-950/40 backdrop-blur-md p-4 rounded-2xl border border-amber-200/80 dark:border-amber-900/50 shadow-2xs">
              {service.warningSigns.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-800 dark:text-slate-200">
                  <span className="text-amber-500 font-bold">•</span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Homeowner Benefits */}
          <div>
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-3">
              Homeowner Benefits
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
              {service.homeownerBenefits.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-sky-50/60 dark:bg-sky-950/50 backdrop-blur-md rounded-2xl border border-sky-100 dark:border-sky-900/60 text-xs text-slate-700 dark:text-slate-200 leading-relaxed shadow-2xs">
                  <span className="font-semibold text-sky-800 dark:text-sky-300 block mb-1">Benefit {idx + 1}</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Equipment Explained (for Air Duct & Dryer Vent) */}
          <EquipmentSection serviceId={service.id} isCompactModal={true} />
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-t border-slate-200/60 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-slate-600 dark:text-slate-300 text-center sm:text-left">
            Free, no-obligation quotes for residential homeowners.
          </p>
          <div className="flex items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="glass-pill flex-1 sm:flex-none px-4 py-2.5 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onSelectForQuote(service.title);
              }}
              className="btn-gradient-primary flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-2xl text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Get Free Quote</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
