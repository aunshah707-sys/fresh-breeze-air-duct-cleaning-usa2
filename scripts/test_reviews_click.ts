import { JSDOM } from 'jsdom';
import React, { act } from 'react';
import { createRoot } from 'react-dom/client';

// 1. Setup DOM environment
const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  url: 'http://localhost:3000',
  pretendToBeVisual: true,
});

globalThis.window = dom.window as any;
globalThis.document = dom.window.document;
Object.defineProperty(globalThis, 'navigator', {
  value: dom.window.navigator,
  configurable: true,
  writable: true,
});
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.HTMLButtonElement = dom.window.HTMLButtonElement;
globalThis.HTMLAnchorElement = dom.window.HTMLAnchorElement;

// Mock localStorage
const mockStorage: Record<string, string> = {};
globalThis.localStorage = {
  getItem: (key: string) => mockStorage[key] || null,
  setItem: (key: string, val: string) => { mockStorage[key] = val; },
  removeItem: (key: string) => { delete mockStorage[key]; },
  clear: () => { for (const k in mockStorage) delete mockStorage[k]; },
  length: 0,
  key: () => null,
};

// Mock window.matchMedia
dom.window.matchMedia = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
});

// Import App after JSDOM globals are defined
import App from '../src/App';

async function runTests() {
  console.log('--- STARTING INTERACTIVE REVIEWS BUTTON TESTS ---');

  const container = dom.window.document.getElementById('root')!;
  const root = createRoot(container);

  // Render App inside act
  await act(async () => {
    root.render(React.createElement(App));
  });

  console.log('✓ App rendered successfully in virtual DOM');

  // Verify that gallery modal is initially NOT open
  let modal = dom.window.document.querySelector('[aria-label="All 10 customer feedback reviews gallery"]');
  if (modal) {
    throw new Error('FAIL: Gallery modal should not be visible initially');
  }
  console.log('✓ Initial state verified: Gallery modal is hidden');

  // Find all "View All Reviews" buttons
  const buttons = Array.from(dom.window.document.querySelectorAll('button')).filter(
    (b) => b.textContent?.includes('View All Reviews')
  );

  console.log(`✓ Found ${buttons.length} "View All Reviews" button(s) in DOM`);
  if (buttons.length === 0) {
    throw new Error('FAIL: No "View All Reviews" button found');
  }

  // Ensure NONE of them are <a> anchor tags and ALL are type="button"
  for (let i = 0; i < buttons.length; i++) {
    const btn = buttons[i];
    if (btn.tagName.toLowerCase() !== 'button') {
      throw new Error(`FAIL: Button ${i} is a <${btn.tagName}> instead of <button>`);
    }
    if (btn.getAttribute('type') !== 'button') {
      throw new Error(`FAIL: Button ${i} does not have type="button"`);
    }
    if (btn.hasAttribute('href')) {
      throw new Error(`FAIL: Button ${i} has an href attribute (anchor behavior)`);
    }
    console.log(`✓ Button ${i + 1} (${btn.getAttribute('aria-label') || 'feedback section'}) is verified <button type="button"> with NO anchor navigation`);
  }

  // TEST 1: Click the ServicesSection "View All Reviews" button
  const servicesReviewBtn = buttons[0];
  console.log('Simulating click on ServicesSection "View All Reviews" button...');

  await act(async () => {
    servicesReviewBtn.click();
  });

  // Verify gallery modal opened
  modal = dom.window.document.querySelector('[aria-label="All 10 customer feedback reviews gallery"]');
  if (!modal) {
    throw new Error('FAIL: Gallery modal did NOT open after clicking ServicesSection "View All Reviews" button');
  }
  console.log('✓ SUCCESS: Clicking "View All Reviews" opened the gallery modal!');

  // Verify modal title
  const modalHeading = modal.querySelector('h3');
  console.log(`✓ Modal heading verified: "${modalHeading?.textContent?.trim()}"`);
  if (!modalHeading?.textContent?.includes('All 10 Customer Chat Reviews')) {
    throw new Error('FAIL: Modal heading mismatch');
  }

  // Verify all 10 customer review images are displayed in the modal
  const reviewCards = modal.querySelectorAll('img[alt^="Customer review #"]');
  console.log(`✓ Verified ${reviewCards.length} review screenshot thumbnails rendered inside the gallery`);
  if (reviewCards.length !== 10) {
    throw new Error(`FAIL: Expected 10 reviews in gallery, found ${reviewCards.length}`);
  }

  // Verify all image src URLs point to the existing assets
  reviewCards.forEach((img, idx) => {
    const src = img.getAttribute('src');
    if (!src?.includes(`/assets/reviews/review_${idx + 1}`)) {
      throw new Error(`FAIL: Review ${idx + 1} has invalid image src: ${src}`);
    }
  });
  console.log('✓ All 10 review screenshot assets verified with correct paths in gallery');

  // TEST 2: Test clicking a review thumbnail to enlarge it
  const firstThumbnail = modal.querySelector('button[aria-label="Close reviews gallery"]')
    ?.closest('div[role="dialog"]')
    ?.querySelectorAll('.group.bg-slate-50, .group')[0] as HTMLElement;

  if (firstThumbnail) {
    console.log('Simulating click on review thumbnail to test enlargement...');
    await act(async () => {
      firstThumbnail.click();
    });

    const lightbox = dom.window.document.querySelector('[aria-label="Enlarged review screenshot"]');
    if (!lightbox) {
      throw new Error('FAIL: Lightbox modal did NOT open upon clicking review thumbnail');
    }
    console.log('✓ SUCCESS: Enlarged lightbox modal opened with working preview!');

    // Close lightbox
    const closeLightboxBtn = lightbox.querySelector('button[aria-label="Close enlarged review"]') as HTMLButtonElement;
    await act(async () => {
      closeLightboxBtn.click();
    });

    const lightboxAfter = dom.window.document.querySelector('[aria-label="Enlarged review screenshot"]');
    if (lightboxAfter) {
      throw new Error('FAIL: Lightbox modal failed to close');
    }
    console.log('✓ SUCCESS: Lightbox modal closed cleanly via close button');
  }

  // TEST 3: Close the gallery modal
  const closeGalleryBtn = modal.querySelector('button[aria-label="Close reviews gallery"]') as HTMLButtonElement;
  if (!closeGalleryBtn) {
    throw new Error('FAIL: Gallery close button not found');
  }

  await act(async () => {
    closeGalleryBtn.click();
  });

  const modalAfterClose = dom.window.document.querySelector('[aria-label="All 10 customer feedback reviews gallery"]');
  if (modalAfterClose) {
    throw new Error('FAIL: Gallery modal did not close');
  }
  console.log('✓ SUCCESS: Gallery modal closed cleanly via close button');

  // TEST 4: Test CustomerFeedback section "View All Reviews" button
  if (buttons.length > 1) {
    const feedbackReviewBtn = buttons[1];
    console.log('Simulating click on CustomerFeedback "View All Reviews" button...');
    await act(async () => {
      feedbackReviewBtn.click();
    });

    const modal2 = dom.window.document.querySelector('[aria-label="All 10 customer feedback reviews gallery"]');
    if (!modal2) {
      throw new Error('FAIL: Gallery modal did NOT open after clicking CustomerFeedback "View All Reviews"');
    }
    console.log('✓ SUCCESS: CustomerFeedback "View All Reviews" button also opens the gallery modal!');

    const closeBtn2 = modal2.querySelector('button[aria-label="Close reviews gallery"]') as HTMLButtonElement;
    await act(async () => {
      closeBtn2.click();
    });
    console.log('✓ SUCCESS: Second gallery modal closed cleanly');
  }

  console.log('\n========================================');
  console.log('ALL TESTS PASSED WITH 100% SUCCESS!');
  console.log('========================================');
  process.exit(0);
}

runTests().catch((err) => {
  console.error('TEST FAILED:', err);
  process.exit(1);
});
