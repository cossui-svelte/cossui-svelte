import type { RequestHandler } from '@sveltejs/kit';

// Grab all index files (or any .svelte file) inside $lib/components sub-folders.
// Each key looks like: /src/lib/components/blog/index.svelte
// Adjust the glob pattern to match your actual file structure.
const componentModules = import.meta.glob('/src/lib/components/*/**/*.svelte');

function deriveSlug(path: string): string {
    // '/src/lib/components/blog/index.svelte' → 'blog'
    // '/src/lib/components/about/Hero.svelte'  → 'about'
    const match = path.match(/\/src\/lib\/components\/([^/]+)/);
    return match ? match[1] : '';
}

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
        { slug: '', changefreq: 'daily', priority: '1.0' }, // home
        { slug: 'about', changefreq: 'monthly', priority: '0.7' },
        { slug: 'contact', changefreq: 'monthly', priority: '0.6' },
        { slug: 'pricing', changefreq: 'weekly', priority: '0.8' },
        { slug: 'blog', changefreq: 'daily', priority: '0.9' },
    ];

export const GET: RequestHandler = ({ url }) => {
    const origin = url.origin; // e.g. https://example.com
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
    // Dynamic entries derived from $lib/components sub-folders
    // ---------------------------------------------------------------------------
    const staticSlugs = new Set(STATIC_URLS.map((u) => u.slug));

    const dynamicSlugs = [...new Set(
        Object.keys(componentModules)
            .map(deriveSlug)
            .filter((s) => Boolean(s) && !staticSlugs.has(s)) // skip duplicates
    )];

    const dynamicEntries = dynamicSlugs
        .map(
            (slug) => `
  <url>
    <loc>${buildUrl(origin, slug)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
        )
        .join('');

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticEntries}${dynamicEntries}
</urlset>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'max-age=3600', // cache for 1 hour
        },
    });
};