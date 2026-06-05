const config = {
  compilers: {
    svelte: (text: string) => [...text.matchAll(/import[^;]+/gu)].join('\n')
  },
  ignoreDependencies: ['tw-animate-css'],
  project: ['src/**/*.{svelte,ts,js}'],
  svelte: {
    entry: [
      'src/routes/**/+*.{svelte,ts,js}',
      'src/params/*.ts',
      'src/app.html',
      'src/lib/**/*.svelte'
    ]
  }
};

export default config;
