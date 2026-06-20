import { type RequestHandler } from '@sveltejs/kit';
import { allComponents } from '$lib/registry/registry-components';

export const prerender = true;

function buildUrl(origin: string, slug: string): string {
  return `${origin}/${slug}`;
}

function toW3CDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// ---------------------------------------------------------------------------
// Static routes — edit slug, changefreq and priority to suit your site.
// ---------------------------------------------------------------------------
const STATIC_URLS: Array<{
  slug: string;
  changefreq: string;
  priority: string;
}> = [
  { changefreq: 'monthly', priority: '1.0', slug: '' }, // home
  { changefreq: 'monthly', priority: '0.9', slug: 'particles' },
  { changefreq: 'monthly', priority: '0.8', slug: 'docs' }
];

export const GET: RequestHandler = ({ url }) => {
  const { origin } = url; // e.g. https://example.com
  const today = toW3CDate(new Date());

  // ---------------------------------------------------------------------------
  // Static entries
  // ---------------------------------------------------------------------------
  const staticEntries = STATIC_URLS.map(
    ({ slug, changefreq, priority }) => `
  <url>
    <loc>${origin}/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  ).join('');

  // ---------------------------------------------------------------------------
  // Dynamic entries — one per component in the registry
  // ---------------------------------------------------------------------------
  const dynamicEntries = Object.values(allComponents)
    .map(
      ({ folder }) => `
  <url>
    <loc>${buildUrl(origin, `docs/${folder}`)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
    .join('');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticEntries}${dynamicEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Cache-Control': 'max-age=3600', // cache for 1 hour
      'Content-Type': 'application/xml'
    }
  });
};
