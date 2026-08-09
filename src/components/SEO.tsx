import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  keywords?: string;
  author?: string;
  structuredData?: Record<string, any>;
  noindex?: boolean;
}

export default function SEO({
  title,
  description,
  canonical,
  ogImage,
  ogType = 'website',
  keywords,
  author,
  structuredData,
  noindex = false,
}: SEOProps) {
  const siteUrl = 'https://www.batalhaimoveis.com.br';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const fullOgImage = ogImage ? `${siteUrl}${ogImage}` : `${siteUrl}/og-image.jpg`;

  useEffect(() => {
    // Update document title
    document.title = `${title} | Imóveis Premium`;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let tag = document.querySelector(selector) as HTMLMetaElement;
      if (!tag) {
        tag = document.createElement('meta');
        if (isProperty) {
          tag.setAttribute('property', name);
        } else {
          tag.setAttribute('name', name);
        }
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Basic Meta Tags
    updateMetaTag('description', description);
    if (keywords) updateMetaTag('keywords', keywords);
    if (author) updateMetaTag('author', author);
    updateMetaTag('language', 'pt-BR');
    updateMetaTag('robots', noindex ? 'noindex, nofollow' : 'index, follow');
    updateMetaTag('googlebot', noindex ? 'noindex, nofollow' : 'index, follow');

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = fullCanonical;

    // Open Graph Tags
    updateMetaTag('og:type', ogType, true);
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:image', fullOgImage, true);
    updateMetaTag('og:url', fullCanonical, true);
    updateMetaTag('og:site_name', 'Imóveis Premium', true);
    updateMetaTag('og:locale', 'pt_BR', true);

    // Twitter Card Tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', fullOgImage);

    // Additional Meta Tags
    updateMetaTag('theme-color', '#0A2342');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');

    // Structured Data (JSON-LD)
    if (structuredData) {
      let scriptTag = document.querySelector('script[type="application/ld+json"]') as HTMLScriptElement;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, canonical, ogImage, ogType, keywords, author, structuredData, noindex, siteUrl, fullCanonical, fullOgImage]);

  return null;
}
