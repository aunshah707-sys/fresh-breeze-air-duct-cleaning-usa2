import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  ArrowRight, 
  Grid, 
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { CUSTOMER_REVIEWS, CustomerReview } from '../data/reviewsData';
import { trackEvent } from '../utils/analytics';

interface ReviewsGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuote: () => void;
  initialReviewId?: number | null;
}

export const ReviewsGalleryModal: React.FC<ReviewsGalleryModalProps> = ({
  isOpen,
  onClose,
  onOpenQuote,
  initialReviewId = null,
}) => {
  const [selectedReview, setSelectedReview] = useState<CustomerReview | null>(null);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Instagram' | 'Facebook' | 'Messages'>('All');

  // Set initial review if provided
  useEffect(() => {
    if (initialReviewId) {
      const found = CUSTOMER_REVIEWS.find(r => r.id === initialReviewId);
      if (found) setSelectedReview(found);
    } else {
      setSelectedReview(null);
    }
  }, [initialReviewId, isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Handle ESC and arrow key navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedReview) {
          setSelectedReview(null);
        } else {
          onClose();
        }
      } else if (selectedReview) {
        if (e.key === 'ArrowRight') {
          const currentIndex = CUSTOMER_REVIEWS.findIndex(r => r.id === selectedReview.id);
          const nextIndex = (currentIndex + 1) % CUSTOMER_REVIEWS.length;
          setSelectedReview(CUSTOMER_REVIEWS[nextIndex]);
        } else if (e.key === 'ArrowLeft') {
          const currentIndex = CUSTOMER_REVIEWS.findIndex(r => r.id === selectedReview.id);
          const prevIndex = (currentIndex - 1 + CUSTOMER_REVIEWS.length) % CUSTOMER_REVIEWS.length;
          setSelectedReview(CUSTOMER_REVIEWS[prevIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedReview, onClose]);

  if (!isOpen) return null;

  const filteredReviews = activeFilter === 'All'
    ? CUSTOMER_REVIEWS
    : CUSTOMER_REVIEWS.filter(r => r.platform === activeFilter);

  const handleEnlarge = (review: CustomerReview) => {
    trackEvent('review_modal_enlarge', { reviewId: review.id, platform: review.platform });
    setSelectedReview(review);
  };

  return (
    <div 
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="All 10 customer feedback reviews gallery"
      onClick={onClose}
    >
      <div 
        className="relative max-w-5xl w-full max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-7 border border-white/20 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden text-slate-800 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-200/80 dark:border-slate-800 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-300 font-extrabold text-[11px] uppercase tracking-wider mb-1">
              <Grid className="w-3 h-3 text-sky-600 dark:text-sky-400" />
              <span>Customer Reviews Gallery</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-display">
              Customer Feedback
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block mt-0.5">
              Feedback shared by our customers
            </p>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close reviews gallery"
            className="p-2 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="pt-3 pb-2 flex items-center gap-2 overflow-x-auto shrink-0 no-scrollbar">
          {(['All', 'Instagram', 'Facebook', 'Messages'] as const).map((filter) => {
            const count = filter === 'All' 
              ? CUSTOMER_REVIEWS.length 
              : CUSTOMER_REVIEWS.filter(r => r.platform === filter).length;
            const isSelected = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
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

        {/* Grid of All 10 Reviews */}
        <div className="my-3 overflow-y-auto grow pr-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReviews.map((review) => (
            <div 
              key={review.id}
              onClick={() => handleEnlarge(review)}
              className="group bg-slate-50 dark:bg-slate-950/60 rounded-2xl p-3 border border-slate-200/80 dark:border-slate-800 hover:border-sky-400 dark:hover:border-sky-500 transition-all cursor-pointer flex flex-col hover:-translate-y-1 hover:shadow-md"
            >
              {/* Card Meta */}
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200/60 dark:border-slate-800 text-xs">
                <span className="font-bold text-sky-700 dark:text-sky-400">
                  {review.platform}
                </span>
                <span className="text-[11px] text-slate-400">
                  Review #{review.id}
                </span>
              </div>

              {/* Thumbnail image container */}
              <div className="rounded-xl overflow-hidden bg-slate-950 flex items-center justify-center max-h-56 relative border border-slate-200/50 dark:border-slate-800/80">
                <picture className="w-full flex items-center justify-center">
                  <source srcSet={review.imageWebp} type="image/webp" />
                  <img 
                    src={review.imagePng} 
                    alt={`Customer review #${review.id}`}
                    className="w-full h-auto object-contain max-h-56 transition-transform duration-300 group-hover:scale-102"
                    loading="lazy"
                  />
                </picture>
                
                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/35 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="p-2 rounded-full bg-white/95 dark:bg-slate-900/95 text-sky-600 shadow-md">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Tap to enlarge action label */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEnlarge(review);
                }}
                className="mt-2 text-center w-full text-[11px] font-bold text-slate-500 dark:text-slate-400 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Maximize2 className="w-3 h-3 text-sky-600 dark:text-sky-400" />
                <span>Tap to enlarge</span>
              </button>
            </div>
          ))}
        </div>

        {/* Gallery Footer */}
        <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
            Customer feedback shared from residential service appointments.
          </p>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenQuote();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-sky-500 via-sky-600 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-extrabold text-xs uppercase shadow-md transition-all cursor-pointer"
          >
            <span>GET A FREE QUOTE</span>
            <ArrowRight className="w-4 h-4 text-emerald-100" />
          </button>
        </div>
      </div>

      {/* LIGHTBOX MODAL: Enlarged Screenshot View */}
      {selectedReview && (
        <div 
          className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged review screenshot"
          onClick={() => setSelectedReview(null)}
        >
          <div 
            className="relative max-w-lg w-full max-h-[92vh] bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-white/20 dark:border-white/10 shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 font-extrabold text-xs">
                  {selectedReview.platform}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Review {CUSTOMER_REVIEWS.findIndex(r => r.id === selectedReview.id) + 1} of {CUSTOMER_REVIEWS.length}
                </span>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                aria-label="Close enlarged review"
                className="p-1.5 rounded-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Body with Next/Prev Arrows */}
            <div className="relative my-3 flex-1 overflow-y-auto max-h-[70vh] flex items-center justify-center bg-slate-950/5 dark:bg-slate-950 rounded-2xl p-2 border border-slate-100 dark:border-slate-800">
              <picture className="w-full flex items-center justify-center">
                <source srcSet={selectedReview.imageWebp} type="image/webp" />
                <img 
                  src={selectedReview.imagePng} 
                  alt={`Full customer feedback screenshot from ${selectedReview.platform}`}
                  className="max-w-full max-h-[64vh] object-contain rounded-xl shadow-xs"
                />
              </picture>

              {/* Prev Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const prevIdx = (CUSTOMER_REVIEWS.findIndex(r => r.id === selectedReview.id) - 1 + CUSTOMER_REVIEWS.length) % CUSTOMER_REVIEWS.length;
                  setSelectedReview(CUSTOMER_REVIEWS[prevIdx]);
                }}
                aria-label="Previous screenshot"
                className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-slate-800 dark:text-white shadow-md flex items-center justify-center border border-white/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Next Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const nextIdx = (CUSTOMER_REVIEWS.findIndex(r => r.id === selectedReview.id) + 1) % CUSTOMER_REVIEWS.length;
                  setSelectedReview(CUSTOMER_REVIEWS[nextIndex(nextIdx)]);
                }}
                aria-label="Next screenshot"
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-md text-slate-800 dark:text-white shadow-md flex items-center justify-center border border-white/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Footer CTA */}
            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedReview(null)}
                className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>← Back to all reviews</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedReview(null);
                  onClose();
                  onOpenQuote();
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 hover:from-sky-400 hover:to-emerald-400 text-white font-bold text-xs uppercase shadow-sm transition-all cursor-pointer"
              >
                <span>Request Free Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  function nextIndex(idx: number): number {
    return idx;
  }
};
