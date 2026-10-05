import adapter from '@sveltejs/adapter-cloudflare';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
/// <reference types="vitest" />
/// <reference types="node" />
import tailwindcss from '@tailwindcss/vite';
import { mdsvex } from 'mdsvex';
// import { visualizer } from 'rollup-plugin-visualizer';
import { createLogger, defineConfig } from 'vite';
import { mdsvexOptions } from './mdsvex.config.js';
import pkg from './package.json' with { type: 'json' };

const logger = createLogger();
const loggerWarn = logger.warn.bind(logger);
logger.warn = (msg, options) => {
  // This is a known pnpm + Vite issue where sourcemap paths resolve to the actual pnpm store location instead of the symlink
  if (msg.includes('points to a source file outside its package')) return;
  loggerWarn(msg, options);
};

export default defineConfig({
  // these @vinejs/vine stuff is there to prevent vine from being bundled in the final build, it was generating errors during the build
  build: {
    rollupOptions: {
      external: ['@vinejs/vine'],
      onwarn(warning, warn) {
        if (
          warning.code === 'SOURCEMAP_BROKEN' ||
          warning.message.includes('points to a source file outside its package')
        )
          return;
        warn(warning);
      }
    }
  },
  customLogger: logger,
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version)
  },
  esbuild: {
    legalComments: 'none'
  },
  optimizeDeps: {
    exclude: ['@vinejs/vine']
  },
  plugins: [
    tailwindcss(),
    enhancedImages(),
    sveltekit({
      compilerOptions: {
        warningFilter: (warning) => {
          return !(warning.code === 'a11y_img_redundant_alt');
        }
      },
      extensions: ['.svelte', '.mdx'],
      preprocess: [mdsvex(mdsvexOptions), vitePreprocess()],
      // vitePlugin: {
      //   exclude: [/\.old$/u /* files ending in .old */, /\.old\//u /* folders ending in .old */]
      // },

      // adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
      // If your environment is not supported, or you settled on a specific environment, switch out the adapter.
      // See https://svelte.dev/docs/kit/adapters for more information about adapters.
      adapter: adapter(),
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
      }
      // experimental: { explicitEnvironmentVariables: true }
    })
  ],
  // turn this on to check bundle details
  // visualizer({
  //   brotliSize: true,
  //   filename: 'stats.html',
  //   gzipSize: true,
  //   open: true // auto-opens in browser
  // })
  server: {
    // only applies to vite dev/vite preview
    open: true,
    watch: {
      ignored: ['**/*.old', '**/*.old/**']
    }
  }
});
