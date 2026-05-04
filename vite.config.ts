/// <reference types="vitest" />

import path from 'node:path';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [tailwindcss(), enhancedImages(), sveltekit()],
  server: {
    watch: {
      ignored: ['**/*.old', '**/*.old/**']
    }
  },
  resolve: {
    alias: {
      $assets: path.resolve('./src/lib/assets'),
      $data: path.resolve('./src/lib/data'),
      $helpers: path.resolve('./src/lib/helpers'),
      $lib: path.resolve('./src/lib')
    }
  }
});
