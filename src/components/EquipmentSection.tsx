import React from 'react';
import { Wrench, Info, ShieldCheck } from 'lucide-react';

export interface EquipmentItem {
  id: string;
  name: string;
  description: string;
  imageWebp: string;
  imageJpeg: string;
  isSafety?: boolean;
}

export const AIR_DUCT_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'negative-air',
    name: 'Negative-Air Machine',
    description: 'Creates continuous vacuum pressure throughout the duct system to pull loosened dust directly into multi-stage HEPA filtration.',
    imageWebp: '/assets/equipment/negative_air_machine.webp',
    imageJpeg: '/assets/equipment/negative_air_machine.jpeg',
  },
  {
    id: 'hepa-vacuum',
    name: 'HEPA Vacuum',
    description: 'High-efficiency particulate filtration system capturing fine indoor dust, allergens, and microscopic debris without blowback.',
    imageWebp: '/assets/equipment/hepa_vacuum.webp',
    imageJpeg: '/assets/equipment/hepa_vacuum.jpeg',
  },
  {
    id: 'rotary-brush',
    name: 'Rotary Brush System',
    description: 'Motorized flexible shaft driving gentle spinning brushes to scrub duct walls and dislodge settled dust deposits.',
    imageWebp: '/assets/equipment/rotary_brush_system.webp',
    imageJpeg: '/assets/equipment/rotary_brush_system.jpeg',
  },
  {
    id: 'air-compressor-whip',
    name: 'Air Compressor & Air Whip',
    description: 'High-velocity pneumatic whip nozzles that agitate and blow stubborn debris toward the primary negative-air extraction duct.',
    imageWebp: '/assets/equipment/air_compressor_whip.webp',
    imageJpeg: '/assets/equipment/air_compressor_whip.jpeg',
  },
  {
    id: 'inspection-camera',
    name: 'Inspection Camera',
    description: 'Digital optical borescope camera providing real-time visual inspection of deep duct interior channels and turns.',
    imageWebp: '/assets/equipment/inspection_camera.webp',
    imageJpeg: '/assets/equipment/inspection_camera.jpeg',
  },
  {
    id: 'safety-gear',
    name: 'Safety & Protective Gear',
    description: 'Respirators, safety eyewear, gloves, and surface drop cloths to maintain home cleanliness and protect air quality during service.',
    imageWebp: '/assets/equipment/safety_gear.webp',
    imageJpeg: '/assets/equipment/safety_gear.jpeg',
    isSafety: true,
  },
];

export const DRYER_VENT_EQUIPMENT: EquipmentItem[] = [
  {
    id: 'dryer-brush-rods',
    name: 'Dryer Vent Brush & Flexible Rods',
    description: 'Flexible interlocking rods and specialized rotary nylon brushes that navigate tubing bends to sweep out packed lint.',
    imageWebp: '/assets/equipment/dryer_vent_brush_rods.webp',
    imageJpeg: '/assets/equipment/dryer_vent_brush_rods.jpeg',
  },
  {
    id: 'hepa-vacuum-dryer',
    name: 'HEPA Vacuum',
    description: 'Captures loosened lint particles and exhaust debris at the indoor disconnect point to keep laundry rooms clean.',
    imageWebp: '/assets/equipment/hepa_vacuum.webp',
    imageJpeg: '/assets/equipment/hepa_vacuum.jpeg',
  },
  {
    id: 'inspection-camera-dryer',
    name: 'Inspection Camera',
    description: 'Verifies the full line from dryer connection to exterior hood, identifying blockages, kinks, or damaged tubing.',
    imageWebp: '/assets/equipment/inspection_camera.webp',
    imageJpeg: '/assets/equipment/inspection_camera.jpeg',
  },
  {
    id: 'safety-gear-dryer',
    name: 'Safety & Protective Gear',
    description: 'Particulate dust filtration masks, eye protection, and protective floor mats to keep laundry spaces clean.',
    imageWebp: '/assets/equipment/safety_gear.webp',
    imageJpeg: '/assets/equipment/safety_gear.jpeg',
    isSafety: true,
  },
];

interface EquipmentSectionProps {
  serviceId: string;
  isCompactModal?: boolean;
}

export const EquipmentSection: React.FC<EquipmentSectionProps> = ({ 
  serviceId, 
  isCompactModal = false 
}) => {
  // Determine relevant equipment based on service ID
  const isAirDuct = serviceId === 'air-duct-cleaning';
  const isDryerVent = serviceId === 'dryer-vent-cleaning';

  if (!isAirDuct && !isDryerVent) {
    return null;
  }

  const items = isAirDuct ? AIR_DUCT_EQUIPMENT : DRYER_VENT_EQUIPMENT;

  return (
    <section 
      aria-label="Equipment Explained" 
      className={`rounded-3xl border border-slate-200/90 dark:border-white/10 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md shadow-xs text-left ${
        isCompactModal ? 'p-4 sm:p-6 space-y-4' : 'p-6 sm:p-10 space-y-6'
      }`}
    >
      {/* Section Header */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider">
            <Wrench className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Equipment Explained</span>
          </div>

          {/* Visible Illustrative Reference Disclosure per user prompt guidelines */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-600 dark:text-slate-300 border border-slate-200/70 dark:border-slate-700">
            <Info className="w-3 h-3 text-slate-500" />
            <span>Illustrative equipment examples</span>
          </div>
        </div>

        <h3 className={`${isCompactModal ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'} font-extrabold text-[#0f172a] dark:text-white font-display`}>
          Tools &amp; Technology for {isAirDuct ? 'Air Duct' : 'Dryer Vent'} Cleaning
        </h3>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
          An overview of standard commercial equipment types used across residential cleaning workflows to safely dislodge and extract accumulated debris.
        </p>
      </div>

      {/* Equipment Cards Grid */}
      <div className={`grid gap-3.5 sm:gap-4 ${
        isCompactModal 
          ? 'grid-cols-1 sm:grid-cols-2' 
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      }`}>
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-3.5 shadow-2xs hover:shadow-xs transition-shadow overflow-hidden group"
          >
            {/* Image Container with object-fit: contain to preserve entire tool shape */}
            <div className="relative aspect-4/3 w-full rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800 flex items-center justify-center p-2 overflow-hidden mb-3">
              <picture className="w-full h-full flex items-center justify-center">
                <source srcSet={item.imageWebp} type="image/webp" />
                <img
                  src={item.imageJpeg}
                  alt={item.name}
                  loading="lazy"
                  className="max-h-full max-w-full object-contain group-hover:scale-102 transition-transform duration-300"
                />
              </picture>
              {item.isSafety && (
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-emerald-100/90 dark:bg-emerald-950/80 text-[10px] font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Safety</span>
                </div>
              )}
            </div>

            {/* Content: Tool Name & Short Factual Description */}
            <div className="flex flex-col grow">
              <h4 className="text-sm font-bold text-[#0f172a] dark:text-white font-display mb-1 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                {item.name}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed grow">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
