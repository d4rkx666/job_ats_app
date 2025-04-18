const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');

// Define your routes
const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/pricing', changefreq: 'monthly', priority: 0.8 },
  { url: '/login', changefreq: 'monthly', priority: 0.5 },
  { url: '/signup', changefreq: 'monthly', priority: 0.5 },
  { url: '/dashboard', changefreq: 'daily', priority: 0.9 },
  { url: '/profile', changefreq: 'weekly', priority: 0.7 },
  { url: '/resume', changefreq: 'weekly', priority: 0.7 },
  { url: '/create-resume', changefreq: 'weekly', priority: 0.9 },
  { url: '/preview-resume', changefreq: 'weekly', priority: 0.6 },
  { url: '/improved', changefreq: 'weekly', priority: 0.6 },
];

// Create sitemap
const stream = new SitemapStream({ 
  hostname: 'https://jobbooster.vercel.app', // ← Change to your actual domain
  lastmodDateOnly: true // ← Better formatting for dates
});

// Add routes
routes.forEach(route => stream.write(route));
stream.end();

// Generate the sitemap
streamToPromise(stream)
  .then(sm => {
    fs.writeFileSync('./public/sitemap.xml', sm.toString());
    console.log('✅ Sitemap successfully generated at ./public/sitemap.xml');
  })
  .catch(err => {
    console.error('❌ Error generating sitemap:', err);
  });