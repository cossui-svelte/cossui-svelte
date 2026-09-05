import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { mdsvexOptions } from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  compilerOptions: {
    warningFilter: (warning) => {
      if (warning.code === 'a11y_img_redundant_alt') return false;
    }
  },

  extensions: ['.svelte', '.mdx'],

  kit: {
    // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
    // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
    // See https://svelte.dev/docs/kit/adapters for more information about adapters.
    adapter: adapter(),
    alias: {
      $assets: './src/lib/assets',
      $data: './src/lib/data',
      $lib: './src/lib'
    },
    prerender: {
      handleMissingId: 'ignore',
      // Docs content is being ported incrementally (see CLAUDE.md / docs pipeline
      // follow-up work) — converted pages can link to sibling docs pages that
      // don't exist yet. Downgrade only those to a warning so the crawler
      // doesn't hard-fail the whole build; any other broken link still throws.
      handleHttpError: ({ path, message }) => {
        if (path.startsWith('/docs/') || path === '/llms.txt' || path === '/origin') {
          console.warn(`Skipping unresolved link during prerender: ${message}`);
          return;
        }
        throw new Error(message);
      }
    },
    experimental: {
      explicitEnvironmentVariables: true
    }
  },
  preprocess: [mdsvex(mdsvexOptions), vitePreprocess()],

  vitePlugin: {
    exclude: [
      /\.old$/u, // files ending in .old
      /\.old\//u // folders ending in .old
    ]
  }
};

export default config;
