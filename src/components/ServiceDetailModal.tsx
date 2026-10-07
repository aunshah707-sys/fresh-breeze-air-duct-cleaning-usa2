import React from 'react';
import { X, CheckCircle, ShieldAlert, ArrowRight, Wind, Flame, Cpu, Sparkles } from 'lucide-react';
import airDuctImg from '../assets/images/service_air_duct_cleaning_1791041452109.jpg';
import dryerVentImg from '../assets/images/service_dryer_vent_cleaning_1791041463972.jpg';
import hvacImg from '../assets/images/hero_air_duct_technician_1791041439373.jpg';
import chimneyImg from '../assets/images/service_chimney_cleaning_1791042480149.jpg';

export interface ServiceDetail {
  id: string;
  title: string;
  tagline: string;
  image: string;
  imageAlt: string;
  iconName: string;
  description: string;
  whatIncluded: string[];
  warningSigns: string[];
  homeownerBenefits: string[];
}

export const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'air-duct-cleaning',
    title: 'Air Duct Cleaning',
    tagline: "Remove accumulated dust, debris, and allergens from your home's air duct system.",
    image: airDuctImg,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 text-left"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header Image */}
        <div className="relative h-48 sm:h-56 bg-slate-900 overflow-hidden">
          <img 
            src={service.image} 
            alt={service.imageAlt} 
            loading="lazy"
            width={600}
            height={240}
            className="w-full h-full object-cover object-center opacity-85"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/40 to-transparent" />
          
          <button 
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white/90 hover:text-white hover:bg-black/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-8 h-8 rounded-lg bg-white/90 dark:bg-slate-900/90 flex items-center justify-center shadow-xs">
                {getIcon()}
              </span>
              <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
                Fresh Breeze Service
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white font-display">
              {service.title}
            </h3>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[calc(85vh-14rem)] overflow-y-auto">
          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Service Overview
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* What's Included */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>What Is Included</span>
            </h4>
            <div className="grid grid-cols-1 gap-2.5 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-100 dark:border-slate-700/80">
              {service.whatIncluded.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Warning Signs */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-500" />
              <span>Signs It May Be Time For Cleaning</span>
            </h4>
            <div className="grid grid-cols-1 gap-2 bg-amber-50/40 dark:bg-amber-950/30 p-4 rounded-xl border border-amber-100/60 dark:border-amber-900/40">
              {service.warningSigns.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-200">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Homeowner Benefits */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Homeowner Benefits
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {service.homeownerBenefits.map((item, idx) => (
                <div key={idx} className="p-3 bg-sky-50/40 dark:bg-sky-950/40 rounded-xl border border-sky-100 dark:border-sky-900/60 text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                  <span className="font-semibold text-sky-800 dark:text-sky-300 block mb-1">Benefit {idx + 1}</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-850 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            Free, no-obligation quotes for residential homeowners.
          </p>
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onSelectForQuote(service.title);
              }}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 active:scale-[0.98] text-white text-xs font-bold shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Get Free Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
