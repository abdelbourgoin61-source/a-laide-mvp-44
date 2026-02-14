import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export function SEO({
  title = "À l'aide - Services d'urgence et à domicile 24/7 | Trouvez un professionnel près de chez vous",
  description = "Plateforme n°1 pour trouver des professionnels locaux en moins de 30 secondes. Services d'urgence (serrurier, plombier, électricien) et services à domicile (dog walker, babysitting, ménage, coiffeur, jardinage). Commission 18%. Disponible 24h/24 et 7j/7.",
  keywords = "services urgence, serrurier urgence, plombier 24h, électricien, dépannage, dog walker, babysitting, ménage à domicile, jardinage, coiffeur à domicile, chef à domicile, services informatiques, professionnels locaux, aide rapide, services France",
  ogImage = "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=630&fit=crop",
  canonicalUrl = "https://alaide.fr"
}: SEOProps) {
  
  useEffect(() => {
    // Set document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.content = content;
    };

    // Basic Meta Tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('author', 'À l\'aide');
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'French');
    updateMetaTag('revisit-after', '7 days');
    updateMetaTag('rating', 'general');
    
    // Open Graph Meta Tags (Facebook, LinkedIn)
    updateMetaTag('og:title', title, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:url', canonicalUrl, true);
    updateMetaTag('og:image', ogImage, true);
    updateMetaTag('og:site_name', 'À l\'aide', true);
    updateMetaTag('og:locale', 'fr_FR', true);

    // Twitter Card Meta Tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', title);
    updateMetaTag('twitter:description', description);
    updateMetaTag('twitter:image', ogImage);
    
    // Mobile Meta Tags
    updateMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=5.0');
    updateMetaTag('format-detection', 'telephone=yes');
    updateMetaTag('apple-mobile-web-app-capable', 'yes');
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'default');
    updateMetaTag('apple-mobile-web-app-title', 'À l\'aide');

    // Canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // JSON-LD Structured Data for Local Business
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "À l'aide",
      "description": description,
      "url": canonicalUrl,
      "logo": ogImage,
      "telephone": "+33-1-XX-XX-XX-XX",
      "priceRange": "€€",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "FR",
        "addressLocality": "Paris"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "48.8566",
        "longitude": "2.3522"
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "1247"
      },
      "sameAs": [
        "https://www.facebook.com/alaide",
        "https://www.instagram.com/alaide",
        "https://twitter.com/alaide"
      ]
    };

    // Service Structured Data
    const serviceData = {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "Emergency and Home Services",
      "provider": {
        "@type": "Organization",
        "name": "À l'aide"
      },
      "areaServed": {
        "@type": "Country",
        "name": "France"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Services d'urgence et à domicile",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Serrurier d'urgence 24/7"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Plombier d'urgence 24/7"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Électricien d'urgence 24/7"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Services à domicile"
            }
          }
        ]
      }
    };

    // Add or update JSON-LD script
    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify([structuredData, serviceData]);

  }, [title, description, keywords, ogImage, canonicalUrl]);

  return null;
}
