import type { KnipConfig } from 'knip';

const config: KnipConfig = {
  compilers: {
    svelte: (text: string) => [...text.matchAll(/import[^;]+/g)].join('\n'),
  },
  project: ['src/**/*.{svelte,ts,js}', 'scripts/**/*.ts'],
  ignore: ['**/*.old', '**/*.old/**', '**/done/**'],
  ignoreDependencies: ['tw-animate-css'],
  svelte: {
    entry: ['src/routes/**/+*.{svelte,ts,js}', 'src/params/*.ts', 'src/app.html'],
  },
};

export default config;
