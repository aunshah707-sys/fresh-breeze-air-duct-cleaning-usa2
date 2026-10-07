/**
 * Dynamic SEO & Metadata Manager for Fresh Breeze Air Duct Cleaning USA
 */

export const CANONICAL_DOMAIN = 'https://freshbreezeairductcleaning.site';
const DEFAULT_IMAGE = `${CANONICAL_DOMAIN}/og-image.jpg`;

export interface SEOMetadata {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: string;
  ogImage?: string;
}

export function updateDocumentSEO(meta: SEOMetadata) {
  if (typeof document === 'undefined') return;

  // 1. Update Title
  document.title = meta.title;

  // 2. Update Meta Description
  let descTag = document.querySelector('meta[name="description"]');
  if (!descTag) {
    descTag = document.createElement('meta');
    descTag.setAttribute('name', 'description');
    document.head.appendChild(descTag);
  }
  descTag.setAttribute('content', meta.description);

  // 3. Update Canonical URL
  const canonicalUrl = `${CANONICAL_DOMAIN}${meta.canonicalPath || '/'}`;
  let canonicalTag = document.querySelector('link[rel="canonical"]');
  if (!canonicalTag) {
    canonicalTag = document.createElement('link');
    canonicalTag.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalTag);
  }
  canonicalTag.setAttribute('href', canonicalUrl);

  // 4. Update OpenGraph Tags
  const updateMetaProperty = (property: string, content: string) => {
    let tag = document.querySelector(`meta[property="${property}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('property', property);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  updateMetaProperty('og:title', meta.title);
  updateMetaProperty('og:description', meta.description);
  updateMetaProperty('og:url', canonicalUrl);
  updateMetaProperty('og:type', meta.ogType || 'website');
  updateMetaProperty('og:image', meta.ogImage || DEFAULT_IMAGE);
  updateMetaProperty('og:site_name', 'Fresh Breeze Air Duct Cleaning USA');

  // 5. Update Twitter Tags
  const updateMetaName = (name: string, content: string) => {
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute('name', name);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  };

  updateMetaName('twitter:title', meta.title);
  updateMetaName('twitter:description', meta.description);
  updateMetaName('twitter:image', meta.ogImage || DEFAULT_IMAGE);
  updateMetaName('twitter:card', 'summary_large_image');
}

/**
 * Injects or updates dynamic JSON-LD structured data for the current route
 */
export function setPageStructuredData(schema: object | null) {
  if (typeof document === 'undefined') return;
  const scriptId = 'dynamic-page-schema';
  let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;

  if (schema) {
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = scriptId;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schema);
  } else if (scriptTag) {
    scriptTag.remove();
  }
}
