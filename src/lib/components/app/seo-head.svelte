<script lang="ts">
  import { page } from '$app/state';
  import { PROJECT_NAME, SITE_URL } from '$lib/config';

  interface Props {
    description: string;
    image?: string;
    jsonLd?: Record<string, unknown>;
    noindex?: boolean;
    title: string;
    type?: 'article' | 'website';
  }

  let {
    description,
    image = '/img/abstract.png',
    jsonLd,
    noindex = false,
    title,
    type = 'website'
  }: Props = $props();

  const canonical = $derived(`${SITE_URL}${page.url.pathname}`);
  const ogImage = $derived(image.startsWith('http') ? image : `${SITE_URL}${image}`);

  // Escape characters that could close the surrounding <script> tag or be
  // misinterpreted as HTML if they appear inside a string value of jsonLd.
  function serializeJsonLd(data: Record<string, unknown>) {
    return JSON.stringify(data)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026');
  }
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <link rel="canonical" href={canonical} />
  {#if noindex}
    <meta name="robots" content="noindex, nofollow" />
  {/if}

  <meta property="og:type" content={type} />
  <meta property="og:site_name" content={PROJECT_NAME} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:image" content={ogImage} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />

  {#if jsonLd}
    <!-- eslint-disable-next-line svelte/no-at-html-tags -- jsonLd is escaped via serializeJsonLd to prevent script-tag breakout -->
    {@html `<script type="application/ld+json">${serializeJsonLd(jsonLd)}</` + `script>`}
  {/if}
</svelte:head>
