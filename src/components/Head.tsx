export const Head = () => {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* SEO Meta Tags */}
      <meta name="language" content="pt-BR" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#0A2342" />
      
      {/* Apple Meta Tags */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Batalha Imóveis" />
      
      {/* Preconnect to external resources */}
      <link rel="preconnect" href="https://static.parastorage.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      
      {/* Canonical URL - will be set per page */}
      <link rel="canonical" href="https://seu-dominio.com.br" />
      
      {/* Alternate Links for Mobile */}
      <link rel="alternate" media="only screen and (max-width: 640px)" href="https://seu-dominio.com.br" />
      
      {/* Fonts */}
      <link rel="preconnect" href="https://static.parastorage.com" />
    </>
  );
};
