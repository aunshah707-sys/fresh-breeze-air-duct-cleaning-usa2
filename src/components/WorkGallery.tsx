import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  ArrowRight, 
  Sparkles,
  Camera
} from 'lucide-react';
import { trackCtaClick, trackEvent } from '../utils/analytics';

interface ServicePhoto {
  id: string;
  title: string;
  subtitle: string;
  imageWebp: string;
  imagePng: string;
  alt: string;
}

const SERVICE_PHOTOS: ServicePhoto[] = [
  {
    id: 'dryer-vent-drill',
    title: 'Dryer vent cleaning',
    subtitle: 'Exterior vent clearance with rotary drill and flexible rods',
    imageWebp: '/assets/work/team_dryer_vent_drill.webp',
    imagePng: '/assets/work/team_dryer_vent_drill.png',
    alt: 'Fresh Breeze technician cleaning exterior residential dryer vent with rotary brush and drill',
  },
  {
    id: 'ceiling-vent-ladder',
    title: 'Ceiling return vent cleaning',
    subtitle: 'High-reach particulate vacuuming and deep duct extraction',
    imageWebp: '/assets/work/team_ceiling_vent_ladder.webp',
    imagePng: '/assets/work/team_ceiling_vent_ladder.png',
    alt: 'Technician on ladder performing vacuum extraction on ceiling air duct return vent',
  },
  {
    id: 'dryer-vent-suit',
    title: 'Vent line sanitation',
    subtitle: 'Specialized protective equipment and exterior vent clearing',
    imageWebp: '/assets/work/team_dryer_vent_suit.webp',
    imagePng: '/assets/work/team_dryer_vent_suit.png',
    alt: 'Technician in protective gear using specialized nozzle to clear residential vent line',
  },
  {
    id: 'dryer-vent-clearing',
    title: 'Exhaust lint clearing',
    subtitle: 'Scrubbing accumulated lint and debris from residential vent line',
    imageWebp: '/assets/work/team_dryer_vent_clearing.webp',
    imagePng: '/assets/work/team_dryer_vent_clearing.png',
    alt: 'Technician clearing accumulated dryer lint from exterior vent exhaust hood',
  },
];

interface WorkGalleryProps {
  onOpenQuote: () => void;
}

export const WorkGallery: React.FC<WorkGalleryProps> = ({ onOpenQuote }) => {
  // Before / After slider position (percentage 0 to 100)
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Gallery slider state for mobile
  const [photoIndex, setPhotoIndex] = useState(0);
  const [enlargedPhoto, setEnlargedPhoto] = useState<ServicePhoto | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const animationStartedRef = useRef(false);
  const photoScrollRef = useRef<HTMLDivElement>(null);
  const isScrollingClickRef = useRef(false);

  // 1. Gentle Initial Animation: 50% -> 65% -> 35% -> 50% once when visible
  useEffect(() => {
    // Respect user reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !animationStartedRef.current && !hasInteracted) {
          animationStartedRef.current = true;

          // Animation timeline: 0ms -> 50%, 450ms -> 65%, 1050ms -> 35%, 1600ms -> 50%
          const startTime = performance.now();
          const duration = 1600;

          const step = (now: number) => {
            if (hasInteracted) return;

            const elapsed = now - startTime;
            const progress = Math.min(1, elapsed / duration);

            // Sine wave oscillation formula centered at 50% with amplitude 15%
            // sin(0) = 0 -> 50%; sin(pi/2) = 1 -> 65%; sin(3pi/2) = -1 -> 35%; sin(2pi) = 0 -> 50%
            const angle = progress * Math.PI * 2;
            const offset = Math.sin(angle) * 15;
            setSliderPos(50 + offset);

            if (progress < 1) {
              animationRef.current = requestAnimationFrame(step);
            } else {
              setSliderPos(50);
            }
          };

          animationRef.current = requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hasInteracted]);

  // Stop animation immediately on user interaction
  const stopAnimation = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
  }, [hasInteracted]);

  // Handle position update from client coordinate
  const updateSliderFromClientX = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      const relativeX = clientX - rect.left;
      const newPos = Math.max(0, Math.min(100, (relativeX / rect.width) * 100));
      setSliderPos(newPos);
    },
    []
  );

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    stopAnimation();
    setIsDragging(true);
    updateSliderFromClientX(e.clientX);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      updateSliderFromClientX(e.clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, updateSliderFromClientX]);

  // Touch drag handlers with non-blocking vertical scroll (touchAction: pan-y)
  const handleTouchStart = (e: React.TouchEvent) => {
    stopAnimation();
    setIsDragging(true);
    if (e.touches[0]) {
      updateSliderFromClientX(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches[0]) {
      updateSliderFromClientX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Keyboard accessibility controls (arrow keys, home, end)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    stopAnimation();
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPos((prev) => Math.min(100, prev + 5));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPos(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPos(100);
    }
  };

  // 2. Photo Carousel Scroll for Mobile
  const scrollPhotoToIndex = useCallback((index: number) => {
    if (!photoScrollRef.current) return;
    const container = photoScrollRef.current;
    const card = container.children[index] as HTMLElement;
    if (card) {
      isScrollingClickRef.current = true;
      const containerWidth = container.clientWidth;
      const cardLeft = card.offsetLeft;
      const cardWidth = card.clientWidth;
      const targetScroll = cardLeft - (containerWidth - cardWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth',
      });
      setPhotoIndex(index);
      setTimeout(() => {
        isScrollingClickRef.current = false;
      }, 400);
    }
  }, []);

  const handlePhotoScroll = () => {
    if (isScrollingClickRef.current || !photoScrollRef.current) return;
    const container = photoScrollRef.current;
    const center = container.scrollLeft + container.clientWidth / 2;

    let closest = 0;
    let minDiff = Infinity;
    Array.from(container.children).forEach((child, idx) => {
      const el = child as HTMLElement;
      const childCenter = el.offsetLeft + el.clientWidth / 2;
      const diff = Math.abs(center - childCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closest = idx;
      }
    });

    if (closest !== photoIndex) {
      setPhotoIndex(closest);
    }
  };

  const nextPhoto = () => {
    const nextIdx = (photoIndex + 1) % SERVICE_PHOTOS.length;
    scrollPhotoToIndex(nextIdx);
  };

  const prevPhoto = () => {
    const prevIdx = (photoIndex - 1 + SERVICE_PHOTOS.length) % SERVICE_PHOTOS.length;
    scrollPhotoToIndex(prevIdx);
  };

  // 3. Modal Focus & Scroll Lock
  useEffect(() => {
    if (enlargedPhoto) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setEnlargedPhoto(null);
        } else if (e.key === 'ArrowRight') {
          const cur = SERVICE_PHOTOS.findIndex((p) => p.id === enlargedPhoto.id);
          const next = (cur + 1) % SERVICE_PHOTOS.length;
          setEnlargedPhoto(SERVICE_PHOTOS[next]);
        } else if (e.key === 'ArrowLeft') {
          const cur = SERVICE_PHOTOS.findIndex((p) => p.id === enlargedPhoto.id);
          const prev = (cur - 1 + SERVICE_PHOTOS.length) % SERVICE_PHOTOS.length;
          setEnlargedPhoto(SERVICE_PHOTOS[prev]);
        }
      };

      window.addEventListener('keydown', handleKey);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKey);
      };
    }
  }, [enlargedPhoto]);

  return (
    <section 
      id="work-gallery"
      aria-label="Work Gallery"
      className="pt-16 sm:pt-24 pb-28 sm:pb-24 bg-gradient-to-b from-[#f0f9ff] via-white to-[#f0f9ff]/70 dark:from-slate-950 dark:via-[#0c1a30] dark:to-slate-950 relative w-full max-w-full overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-block mb-3">
            <span className="text-xs sm:text-sm font-extrabold text-[#0f172a] dark:text-white uppercase tracking-widest block font-display">
              A CLOSER LOOK
            </span>
            <div className="h-1 w-16 bg-gradient-to-r from-sky-500 to-emerald-400 rounded-full mx-auto mt-1" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0f172a] dark:text-white tracking-tight font-display text-balance">
            See the difference.
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
            Explore our cleaning work.
          </p>
        </div>

        {/* 1. BEFORE/AFTER INTERACTIVE SLIDER CONTAINER */}
        <div className="max-w-3xl mx-auto mb-16 sm:mb-20">
          <div 
            ref={sliderRef}
            tabIndex={0}
            role="slider"
            aria-label="Before and after air duct cleaning comparison slider"
            aria-valuenow={Math.round(sliderPos)}
            aria-valuemin={0}
            aria-valuemax={100}
            onKeyDown={handleKeyDown}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ touchAction: 'pan-y' }}
            className="relative aspect-[1448/926] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_16px_40px_rgba(2,132,199,0.12)] border-2 sm:border-4 border-white/95 dark:border-slate-800 bg-slate-900 select-none cursor-ew-resize group focus:outline-hidden focus:ring-4 focus:ring-sky-500/40"
          >
            {/* Base / Right Layer: AFTER Cleaning Image (Clean Duct) */}
            <picture className="absolute inset-0 w-full h-full pointer-events-none">
              <source srcSet="/assets/work/duct_cleaning_after.webp" type="image/webp" />
              <img
                src="/assets/work/duct_cleaning_after.png"
                alt="Air duct interior after cleaning showing clean metal surfaces"
                className="w-full h-full object-cover object-center select-none"
                loading="eager"
                draggable={false}
              />
            </picture>

            {/* Top / Left Layer: BEFORE Cleaning Image (Dirty Duct) revealed via clip-path */}
            <div 
              className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
              style={{
                clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
                WebkitClipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
              }}
            >
              <picture className="absolute inset-0 w-full h-full">
                <source srcSet="/assets/work/duct_cleaning_before.webp" type="image/webp" />
                <img
                  src="/assets/work/duct_cleaning_before.png"
                  alt="Air duct interior before cleaning with heavy dust accumulation"
                  className="w-full h-full object-cover object-center select-none"
                  loading="eager"
                  draggable={false}
                />
              </picture>
            </div>

            {/* Permanent Left & Right Badges matching reference design */}
            <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 pointer-events-none select-none">
              <span className="px-3 py-1 rounded-md bg-white/95 backdrop-blur-md text-[#0f172a] text-xs font-bold tracking-wider uppercase border border-slate-200/90 shadow-xs">
                BEFORE
              </span>
            </div>
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-10 pointer-events-none select-none">
              <span className="px-3 py-1 rounded-md bg-[#dcfce7]/95 backdrop-blur-md text-[#166534] text-xs font-bold tracking-wider uppercase border border-[#86efac]/90 shadow-xs">
                AFTER
              </span>
            </div>

            {/* Draggable Vertical Divider Line */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 sm:w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none -translate-x-1/2"
              style={{ left: `${sliderPos}%` }}
            />

            {/* Circular Handle with Left/Right Arrows */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-slate-800 shadow-[0_4px_16px_rgba(0,0,0,0.3)] border-2 border-slate-100 flex items-center justify-center z-30 cursor-ew-resize transition-transform active:scale-95 hover:scale-105 pointer-events-auto"
              style={{ left: `${sliderPos}%` }}
              aria-hidden="true"
            >
              <svg 
                className="w-5 h-5 text-slate-700 fill-current" 
                viewBox="0 0 24 24"
              >
                <path d="M8.5 7L3.5 12L8.5 17V7ZM15.5 7V17L20.5 12L15.5 7Z" />
              </svg>
            </div>
          </div>

          {/* Slider Sub-Captions */}
          <div className="mt-3 flex items-center justify-between text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 px-1">
            <span className="font-display text-[#0f172a] dark:text-white font-bold">
              Air duct cleaning
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              Before &amp; after
            </span>
          </div>
        </div>

        {/* 2. SERVICE PHOTO GALLERY ("Our team at work") */}
        <div className="pt-8 border-t border-slate-200/80 dark:border-slate-800">
          {/* Gallery Header with Navigation Arrows */}
          <div className="flex items-center justify-between gap-4 mb-6 sm:mb-8 text-left">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider mb-1">
                <Camera className="w-3.5 h-3.5" />
                <span>Field Photography</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] dark:text-white font-display">
                Our team at work
              </h3>
            </div>

            {/* Desktop / Tablet Arrow Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevPhoto}
                aria-label="Previous team photo"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 border border-slate-200/90 dark:border-white/10 shadow-xs flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextPhoto}
                aria-label="Next team photo"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 border border-slate-200/90 dark:border-white/10 shadow-xs flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Photo Carousel Viewport:
              - Mobile: 1 readable card (~82vw) with peek of next card and snap scroll
              - Desktop: 4-column balanced grid
          */}
          <div 
            ref={photoScrollRef}
            onScroll={handlePhotoScroll}
            className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory sm:snap-none no-scrollbar py-2 px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {SERVICE_PHOTOS.map((photo, idx) => (
              <div
                key={photo.id}
                onClick={() => {
                  trackEvent('work_photo_click', { photoId: photo.id });
                  setEnlargedPhoto(photo);
                }}
                className="w-[82vw] max-w-[340px] sm:w-auto sm:max-w-none shrink-0 snap-center flex flex-col bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl p-3 border border-slate-200/80 dark:border-white/10 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              >
                {/* Photo Container */}
                <div className="relative aspect-4/3 sm:aspect-square w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center">
                  <picture className="w-full h-full flex items-center justify-center">
                    <source srcSet={photo.imageWebp} type="image/webp" />
                    <img
                      src={photo.imagePng}
                      alt={photo.alt}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </picture>

                  {/* Hover Overlay Hint */}
                  <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-2 rounded-full bg-white/95 text-sky-700 shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Caption Text */}
                <div className="mt-3 text-left px-1 grow flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#0f172a] dark:text-white font-display group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {photo.title}
                    </h4>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {photo.subtitle}
                    </p>
                  </div>
                  <span className="mt-2 text-[11px] font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" />
                    <span>Tap to enlarge</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Pagination Dots */}
          <div className="flex sm:hidden items-center justify-center gap-1.5 mt-4" role="tablist">
            {SERVICE_PHOTOS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={idx === photoIndex}
                aria-label={`Jump to photo ${idx + 1}`}
                onClick={() => scrollPhotoToIndex(idx)}
                className={`transition-all rounded-full ${
                  idx === photoIndex 
                    ? 'w-6 h-2 bg-sky-600' 
                    : 'w-2 h-2 bg-slate-300 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>

          {/* Primary CTA Button: Connected to existing quote form */}
          <div className="mt-10 sm:mt-12 mb-4 text-center">
            <button
              type="button"
              onClick={() => {
                trackCtaClick('Get a Free Quote', 'Work Gallery Section');
                onOpenQuote();
              }}
              className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-sky-500 via-sky-600 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-extrabold text-sm sm:text-base tracking-wide uppercase shadow-[0_8px_24px_rgba(2,132,199,0.35)] hover:shadow-[0_12px_32px_rgba(16,185,129,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer border border-white/20 min-h-[48px]"
            >
              <span>Get a Free Quote</span>
              <ArrowRight className="w-5 h-5 text-emerald-100" />
            </button>
          </div>
        </div>

      </div>

      {/* 3. LIGHTBOX ENLARGED PHOTO MODAL */}
      {enlargedPhoto && (
        <div 
          className="fixed inset-0 z-[95] flex items-center justify-center p-3 sm:p-6 pb-[calc(2rem+env(safe-area-inset-bottom,0px))] bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label={enlargedPhoto.title}
          onClick={() => setEnlargedPhoto(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 border border-white/20 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 shrink-0">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#0f172a] dark:text-white font-display">
                  {enlargedPhoto.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {enlargedPhoto.subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setEnlargedPhoto(null)}
                aria-label="Close enlarged photo"
                className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0 ml-3"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body with Previous/Next Arrows */}
            <div className="relative my-3 flex-1 overflow-hidden flex items-center justify-center bg-slate-950 rounded-2xl min-h-[250px] max-h-[68vh]">
              <picture className="w-full h-full flex items-center justify-center">
                <source srcSet={enlargedPhoto.imageWebp} type="image/webp" />
                <img
                  src={enlargedPhoto.imagePng}
                  alt={enlargedPhoto.alt}
                  className="max-w-full max-h-[66vh] object-contain rounded-xl"
                />
              </picture>

              {/* Prev Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const cur = SERVICE_PHOTOS.findIndex((p) => p.id === enlargedPhoto.id);
                  const prev = (cur - 1 + SERVICE_PHOTOS.length) % SERVICE_PHOTOS.length;
                  setEnlargedPhoto(SERVICE_PHOTOS[prev]);
                }}
                aria-label="Previous photo"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const cur = SERVICE_PHOTOS.findIndex((p) => p.id === enlargedPhoto.id);
                  const next = (cur + 1) % SERVICE_PHOTOS.length;
                  setEnlargedPhoto(SERVICE_PHOTOS[next]);
                }}
                aria-label="Next photo"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-white shadow-md flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Footer CTA */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Photo {SERVICE_PHOTOS.findIndex((p) => p.id === enlargedPhoto.id) + 1} of {SERVICE_PHOTOS.length}
              </span>
              <button
                type="button"
                onClick={() => {
                  setEnlargedPhoto(null);
                  onOpenQuote();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-500 via-sky-600 to-emerald-500 text-white font-extrabold text-xs uppercase shadow-md transition-all cursor-pointer"
              >
                <span>Request Free Quote</span>
                <ArrowRight className="w-4 h-4 text-emerald-100" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
