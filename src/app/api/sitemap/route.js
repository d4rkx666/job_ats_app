import { SitemapStream, streamToPromise } from 'sitemap';
import { NextResponse } from 'next/server';

// Define static pages for both locales
const staticPages = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/resume-advisor', changefreq: 'daily', priority: 0.9 },
  { url: '/pricing', changefreq: 'daily', priority: 0.8 },
];

export async function GET() {
  // Create a stream to generate the sitemap XML
  const smStream = new SitemapStream({ hostname: 'https://www.perfectocv.com' });

  // Write static pages for both English and Spanish locales
  const locales = ['es', 'en'];

  locales.forEach(locale => {
    staticPages.forEach(page => {
      // For each locale, add the page path
      smStream.write({ ...page, url: `/${locale}${page.url}` });
    });
  });

  smStream.end();

  // Generate the XML sitemap
  const sitemap = await streamToPromise(smStream);

  // Return the sitemap as a response with the correct XML content type
  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}