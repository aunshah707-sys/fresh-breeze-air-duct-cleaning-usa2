import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  ArrowRight, 
  Grid
} from 'lucide-react';
import { CUSTOMER_REVIEWS, CustomerReview } from '../data/reviewsData';
import { trackCtaClick, trackEvent } from '../utils/analytics';

interface CustomerFeedbackProps {
  onOpenQuote: () => void;
  onViewAllReviews?: () => void;
}

export const CustomerFeedback: React.FC<CustomerFeedbackProps> = ({ 
  onOpenQuote,
  onViewAllReviews,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [enlargedReview, setEnlargedReview] = useState<CustomerReview | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState<'All' | 'Instagram' | 'Facebook' | 'Messages'>('All');

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isScrollingFromClick = useRef(false);

  const totalReviews = CUSTOMER_REVIEWS.length;

  // Scroll to a specific card index
  const scrollToIndex = useCallback((index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const card = container.children[index] as HTMLElement;
    if (card) {
      isScrollingFromClick.current = true;
      const containerWidth = container.clientWidth;
      const cardLeft = card.offsetLeft;
      const cardWidth = card.clientWidth;
      // Center card in container
      const targetScroll = cardLeft - (containerWidth - cardWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: 'smooth',
      });
      setCurrentIndex(index);
      setTimeout(() => {
        isScrollingFromClick.current = false;
      }, 400);
    }
  }, []);

  const goToNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % totalReviews;
    scrollToIndex(nextIdx);
  }, [currentIndex, totalReviews, scrollToIndex]);

  const goToPrev = useCallback(() => {
    const prevIdx = (currentIndex - 1 + totalReviews) % totalReviews;
    scrollToIndex(prevIdx);
  }, [currentIndex, totalReviews, scrollToIndex]);

  // Update active dot on user swipe/scroll
  const handleScroll = () => {
    if (isScrollingFromClick.current || !scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;

    let closestIdx = 0;
    let minDistance = Infinity;

    Array.from(container.children).forEach((child, idx) => {
      const el = child as HTMLElement;
      const childCenter = el.offsetLeft + el.clientWidth / 2;
      const dist = Math.abs(containerCenter - childCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    if (closestIdx !== currentIndex) {
      setCurrentIndex(closestIdx);
    }
  };

  // Keyboard navigation for enlarged modal and gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (enlargedReview) {
        if (e.key === 'Escape') {
          setEnlargedReview(null);
        } else if (e.key === 'ArrowRight') {
          const nextIdx = (CUSTOMER_REVIEWS.findIndex(r => r.id === enlargedReview.id) + 1) % totalReviews;
          setEnlargedReview(CUSTOMER_REVIEWS[nextIdx]);
        } else if (e.key === 'ArrowLeft') {
          const prevIdx = (CUSTOMER_REVIEWS.findIndex(r => r.id === enlargedReview.id) - 1 + totalReviews) % totalReviews;
          setEnlargedReview(CUSTOMER_REVIEWS[prevIdx]);
        }
      } else if (isGalleryOpen) {
        if (e.key === 'Escape') {
          setIsGalleryOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enlargedReview, isGalleryOpen, totalReviews]);

  // Filtered reviews for gallery modal
  const filteredReviews = galleryFilter === 'All'
    ? CUSTOMER_REVIEWS
    : CUSTOMER_REVIEWS.filter(r => r.platform === galleryFilter);

  const handleOpenEnlarge = (review: CustomerReview) => {
    trackEvent('review_enlarge_view', { reviewId: review.id, platform: review.platform });
    setEnlargedReview(review);
  };

  const handleOpenGallery = () => {
    trackCtaClick('View All Reviews', 'Customer Feedback Section');
    if (onViewAllReviews) {
      onViewAllReviews();
    } else {
      setIsGalleryOpen(true);
    }
  };

  const handleQuoteClick = () => {
    trackCtaClick('Get a Free Quote Button', 'Customer Feedback Section');
    onOpenQuote();
  };

  return (
    <section 
      id="customer-feedback" 
      aria-label="What Our Customers Say"
      className="py-16 sm:py-24 bg-gradient-to-b from-sky-50/50 via-white to-sky-50/30 dark:from-slate-950 dark:via-[#091322] dark:to-slate-950 relative w-full max-w-full overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-full relative z-10">
        
        {/* Section Header matching approved reference */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100/90 dark:bg-sky-950/80 border border-sky-200/90 dark:border-sky-800/80 text-xs font-extrabold text-sky-800 dark:text-sky-300 uppercase tracking-wider mb-3 shadow-2xs">
            <span>CUSTOMER FEEDBACK</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight font-display text-balance">
            What Our Customers Say
          </h2>

          {/* Subtitle */}
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium">
            Feedback shared by our customers
          </p>

          {/* Platform labels badge */}
          <div className="mt-3.5 inline-flex items-center gap-2 px-4 py-1 rounded-full bg-slate-100/90 dark:bg-slate-800/90 border border-slate-200/80 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-300 shadow-2xs">
            <span>Instagram</span>
            <span className="text-slate-400 select-none">•</span>
            <span>Facebook</span>
            <span className="text-slate-400 select-none">•</span>
            <span>Messages</span>
          </div>
        </div>

        {/* Carousel Viewport:
            On Mobile: Shows one full readable card (width ~82vw, max-w-[340px]) and a small portion (~16vw peek) of the next card.
            On Desktop/Tablet: Centered readable card with peek previews.
        */}
        <div className="relative w-full max-w-full">
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex items-center gap-4 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory py-4 px-[8vw] sm:px-[calc(50%-180px)] md:px-[calc(50%-210px)] select-none no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="region"
            aria-label="Customer review cards carousel"
          >
            {CUSTOMER_REVIEWS.map((review, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div 
                  key={review.id}
                  className={`w-[82vw] max-w-[340px] sm:max-w-[380px] md:max-w-[420px] shrink-0 snap-center transition-all duration-300 ${
                    isActive 
                      ? 'scale-100 opacity-100' 
                      : 'scale-[0.96] opacity-60 sm:opacity-75 hover:opacity-90'
                  }`}
                >
                  {/* Card Container */}
                  <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-4 sm:p-5 border border-slate-200/90 dark:border-white/10 shadow-[0_12px_36px_rgba(2,132,199,0.08),0_1px_3px_rgba(0,0,0,0.05)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.5)] flex flex-col group/card hover:shadow-[0_16px_44px_rgba(2,132,199,0.14)] transition-all">
                    
                    {/* Screenshot Frame */}
                    <div 
                      onClick={() => handleOpenEnlarge(review)}
                      className="relative w-full rounded-2xl overflow-hidden cursor-pointer bg-slate-950 flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-inner group/img transition-transform active:scale-[0.99]"
                      title="Tap to enlarge customer feedback"
                    >
                      <picture className="w-full flex items-center justify-center">
                        <source srcSet={review.imageWebp} type="image/webp" />
                        <img 
                          src={review.imagePng} 
                          alt={`Customer feedback on ${review.platform}`}
                          className="w-full h-auto object-contain max-h-[460px] sm:max-h-[500px] transition-transform duration-300 group-hover/img:scale-[1.01]"
                          loading={idx < 3 ? 'eager' : 'lazy'}
                        />
                      </picture>

                      {/* Desktop Hover hint */}
                      <div className="absolute inset-0 bg-slate-900/15 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <div className="px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md text-xs font-bold text-slate-800 dark:text-slate-100 shadow-md flex items-center gap-1.5 border border-white/50">
                          <Maximize2 className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                          <span>Tap to enlarge</span>
                        </div>
                      </div>
                    </div>

                    {/* Tap to Enlarge Row matching reference mockup */}
                    <button
                      type="button"
                      onClick={() => handleOpenEnlarge(review)}
                      className="mt-3.5 pt-1.5 pb-0.5 w-full flex items-center justify-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400 transition-colors cursor-pointer"
                    >
                      <Maximize2 className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                      <span>Tap to enlarge</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Controls: Left Arrow, Pagination Dots, Right Arrow matching reference */}
        <div className="mt-6 flex items-center justify-center gap-3 sm:gap-5">
          {/* Previous Arrow Button */}
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Previous customer feedback"
            className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 border border-slate-200/90 dark:border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-md hover:-translate-x-0.5 active:translate-x-0 transition-all flex items-center justify-center cursor-pointer shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Pagination Dots */}
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Customer feedback slide navigation">
            {CUSTOMER_REVIEWS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={idx === currentIndex}
                aria-label={`Jump to review ${idx + 1}`}
                onClick={() => scrollToIndex(idx)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  idx === currentIndex 
                    ? 'w-6 h-2.5 bg-sky-600 dark:bg-sky-500 shadow-xs' 
                    : 'w-2.5 h-2.5 bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 dark:hover:bg-slate-600'
                }`}
              />
            ))}
          </div>

          {/* Next Arrow Button */}
          <button
            type="button"
            onClick={goToNext}
            aria-label="Next customer feedback"
            className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:text-sky-600 dark:hover:text-sky-400 border border-slate-200/90 dark:border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.06)] hover:shadow-md hover:translate-x-0.5 active:translate-x-0 transition-all flex items-center justify-center cursor-pointer shrink-0"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* View All Reviews Button */}
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={handleOpenGallery}
            className="inline-flex items-center gap-1.5 text-sm sm:text-base font-extrabold text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 hover:underline transition-colors cursor-pointer group"
          >
            <span>View All Reviews</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Primary CTA Button: GET A FREE QUOTE */}
        <div className="mt-6 sm:mt-7 text-center">
          <button
            type="button"
            onClick={handleQuoteClick}
            className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-sky-500 via-sky-600 to-emerald-500 hover:from-sky-400 hover:via-sky-500 hover:to-emerald-400 text-white font-extrabold text-sm sm:text-base tracking-wide uppercase shadow-[0_8px_24px_rgba(2,132,199,0.35)] hover:shadow-[0_12px_32px_rgba(16,185,129,0.45)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer border border-white/20"
          >
            <span>GET A FREE QUOTE</span>
            <ArrowRight className="w-5 h-5 text-emerald-100" />
          </button>
        </div>

      </div>

      {/* LIGHTBOX MODAL: Enlarged Screenshot View */}
      {enlargedReview && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged customer review"
          onClick={() => setEnlargedReview(null)}
        >
          <div 
            className="relative max-w-lg w-full max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-white/20 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 font-extrabold text-xs">
                  {enlargedReview.platform}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Review {CUSTOMER_REVIEWS.findIndex(r => r.id === enlargedReview.id) + 1} of {totalReviews}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setEnlargedReview(null)}
                aria-label="Close enlarged review"
                className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body with Next/Prev Arrows */}
            <div className="relative my-3 flex-1 overflow-y-auto max-h-[70vh] flex items-center justify-center bg-slate-950/5 dark:bg-slate-950 rounded-2xl p-2 border border-slate-100 dark:border-slate-800">
              <picture className="w-full flex items-center justify-center">
                <source srcSet={enlargedReview.imageWebp} type="image/webp" />
                <img 
                  src={enlargedReview.imagePng} 
                  alt={`Full customer feedback screenshot from ${enlargedReview.platform}`}
                  className="max-w-full max-h-[64vh] object-contain rounded-xl shadow-xs"
                />
              </picture>

              {/* Prev Arrow */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const prevIdx = (CUSTOMER_REVIEWS.findIndex(r => r.id === enlargedReview.id) - 1 + totalReviews) % totalReviews;
                  setEnlargedReview(CUSTOMER_REVIEWS[prevIdx]);
                }}
                aria-label="Previous screenshot"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-slate-800 dark:text-white shadow-md flex items-center justify-center border border-white/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Arrow */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const nextIdx = (CUSTOMER_REVIEWS.findIndex(r => r.id === enlargedReview.id) + 1) % totalReviews;
                  setEnlargedReview(CUSTOMER_REVIEWS[nextIdx]);
                }}
                aria-label="Next screenshot"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-slate-800 dark:text-white shadow-md flex items-center justify-center border border-white/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Footer CTA */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <p className="text-xs text-slate-500 dark:text-slate-400 italic truncate hidden sm:block">
                Original customer conversation screenshot
              </p>
              <button
                type="button"
                onClick={() => {
                  setEnlargedReview(null);
                  onOpenQuote();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-bold text-xs uppercase shadow-sm transition-all cursor-pointer"
              >
                <span>Request Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FULL GALLERY MODAL: View All 10 Reviews */}
      {isGalleryOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="All 10 customer feedback reviews"
          onClick={() => setIsGalleryOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-white/20 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gallery Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200/80 dark:border-slate-800 shrink-0">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 font-bold text-[11px] uppercase tracking-wider mb-1">
                  <Grid className="w-3 h-3" />
                  <span>Customer Reviews Gallery</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
                  All 10 Customer Chat Reviews
                </h3>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsGalleryOpen(false)}
                aria-label="Close review gallery"
                className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="pt-3 pb-2 flex items-center gap-2 overflow-x-auto shrink-0">
              {(['All', 'Instagram', 'Facebook', 'Messages'] as const).map((filter) => {
                const count = filter === 'All' 
                  ? CUSTOMER_REVIEWS.length 
                  : CUSTOMER_REVIEWS.filter(r => r.platform === filter).length;
                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setGalleryFilter(filter)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                      galleryFilter === filter
                        ? 'bg-sky-600 text-white shadow-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <span>{filter}</span>
                    <span className="ml-1.5 opacity-75">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* Gallery Grid (Scrollable) */}
            <div className="my-3 overflow-y-auto grow pr-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredReviews.map((review) => (
                <div 
                  key={review.id}
                  onClick={() => {
                    setIsGalleryOpen(false);
                    setEnlargedReview(review);
                  }}
                  className="group bg-slate-50 dark:bg-slate-950/60 rounded-2xl p-3 border border-slate-200/80 dark:border-slate-800 hover:border-sky-400 dark:hover:border-sky-500 transition-all cursor-pointer flex flex-col hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Platform & Index */}
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/60 dark:border-slate-800 text-xs">
                    <span className="font-bold text-sky-700 dark:text-sky-400">
                      {review.platform}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Review #{review.id}
                    </span>
                  </div>

                  {/* Thumbnail */}
                  <div className="rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center max-h-56 relative border border-slate-200/50 dark:border-slate-800/80">
                    <img 
                      src={review.imageWebp}
                      alt={`Review #${review.id}`}
                      className="w-full h-auto object-contain max-h-56 transition-transform group-hover:scale-102"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="p-2 rounded-full bg-white/90 dark:bg-slate-900/90 text-sky-600 shadow-md">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Tap to expand prompt */}
                  <div className="mt-2 text-center">
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors flex items-center justify-center gap-1">
                      <Maximize2 className="w-3 h-3" />
                      <span>Tap to enlarge</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Gallery Footer CTA */}
            <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
                100% genuine feedback from real residential service appointments.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsGalleryOpen(false);
                  onOpenQuote();
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-500 via-sky-600 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-extrabold text-xs uppercase shadow-md transition-all cursor-pointer"
              >
                <span>GET A FREE QUOTE</span>
                <ArrowRight className="w-4 h-4 text-emerald-100" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
