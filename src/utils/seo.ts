/**
 * Dynamic SEO & Metadata Manager for Fresh Breeze Air Duct Cleaning USA
 */

export interface SEOMetadata {
  title: string;
  description: string;
  canonicalPath?: string;
  ogType?: string;
  ogImage?: string;
}

const DEFAULT_ORIGIN = 'https://freshbreezeairductcleaning.com';
const DEFAULT_IMAGE = `${DEFAULT_ORIGIN}/og-image.jpg`;

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
  const canonicalUrl = `${DEFAULT_ORIGIN}${meta.canonicalPath || '/'}`;
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
}
