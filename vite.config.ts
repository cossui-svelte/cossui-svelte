/// <reference types="vitest" />
/// <reference types="node" />

import path from 'node:path';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
// import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

export default defineConfig({
  // these @vinejs/vine stuff is there to prevent vine from being bundled in the final build, it was generating errors during the build
  build: {
    rollupOptions: {
      external: ['@vinejs/vine']
    }
  },
  optimizeDeps: {
    exclude: ['@vinejs/vine']
  },
  plugins: [
    {
      // Rolldown doesn't support wildcard package exports (./*.svelte); this plugin
      // catches svelte-remixicon icon imports before other resolvers.
      enforce: 'pre',
      name: 'svelte-remixicon-resolver',
      resolveId(source: string) {
        console.log(source)
        const match = source.match(/^svelte-remixicon\/(Ri\w+\.svelte)$/);
        if (match) return path.resolve(process.cwd(), 'node_modules/svelte-remixicon/dist/icons/', match[1]);
      }
    },
    tailwindcss(),
    enhancedImages(),
    sveltekit()
    // turn this on to check bundle details
    // visualizer({
    //   brotliSize: true,
    //   filename: 'stats.html',
    //   gzipSize: true,
    //   open: true // auto-opens in browser
    // })
  ],
  resolve: {
    alias: [
      { find: '$assets', replacement: path.resolve('./src/lib/assets') },
      { find: '$data', replacement: path.resolve('./src/lib/data') },
      { find: '$helpers', replacement: path.resolve('./src/lib/helpers') },
      { find: '$lib', replacement: path.resolve('./src/lib') }
    ]
  },
  server: {
    watch: {
      ignored: ['**/*.old', '**/*.old/**']
    }
  }
});
