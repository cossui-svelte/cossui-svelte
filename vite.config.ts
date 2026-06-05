/// <reference types="vitest" />
/// <reference types="node" />

import path from 'node:path';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
// import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';

// Rolldown doesn't support wildcard package exports (./*.svelte), so we resolve
// svelte-remixicon subpath imports to the actual dist path ourselves.
function remixiconResolver() {
  return {
    name: 'svelte-remixicon-resolver',
    resolveId(id: string) {
      const match = id.match(/^svelte-remixicon\/(Ri\w+\.svelte)$/);
      if (match) {
        return path.resolve('./node_modules/svelte-remixicon/dist/icons/', match[1]);
      }
    }
  };
}

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['@vinejs/vine']
    }
  },
  optimizeDeps: {
    exclude: ['@vinejs/vine']
  },
  plugins: [
    remixiconResolver(),
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
    alias: {
      $assets: path.resolve('./src/lib/assets'),
      $data: path.resolve('./src/lib/data'),
      $helpers: path.resolve('./src/lib/helpers'),
      $lib: path.resolve('./src/lib')
    }
  },
  server: {
    watch: {
      ignored: ['**/*.old', '**/*.old/**']
    }
  }
});
