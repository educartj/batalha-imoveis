/**
 * Sitemap Generator Component
 * This component generates a dynamic sitemap.xml for SEO purposes
 * 
 * Usage: Call this component on the server side to generate the sitemap
 * The sitemap includes all main pages and dynamically generated property pages
 */

export async function generateSitemap() {
  const baseUrl = 'https://seu-dominio.com.br'; // Replace with your actual domain
  
  const staticPages = [
    {
      url: '/',
      changefreq: 'weekly',
      priority: '1.0',
      lastmod: new Date().toISOString().split('T')[0],
    },
    {
      url: '/sobre',
      changefreq: 'monthly',
      priority: '0.8',
      lastmod: new Date().toISOString().split('T')[0],
    },
    {
      url: '/imoveis',
      changefreq: 'daily',
      priority: '0.9',
      lastmod: new Date().toISOString().split('T')[0],
    },
    {
      url: '/equipe',
      changefreq: 'monthly',
      priority: '0.7',
      lastmod: new Date().toISOString().split('T')[0],
    },
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
  `
    )
    .join('')}
</urlset>`;

  return sitemapXml;
}

/**
 * Robots.txt content for SEO
 * This should be served at /robots.txt
 */
export const robotsTxt = `# Robots.txt for Batalha Imóveis
# Allow all search engines to crawl the site

User-agent: *
Allow: /
Disallow: /admin
Disallow: /api
Disallow: /*.json$
Disallow: /*.xml$

# Specific rules for Google
User-agent: Googlebot
Allow: /

# Specific rules for Bing
User-agent: Bingbot
Allow: /

# Crawl delay (in seconds)
Crawl-delay: 1

# Sitemap location
Sitemap: https://seu-dominio.com.br/sitemap.xml
`;
