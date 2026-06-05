const config = {
  compilers: {
    svelte: (text: string) => [...text.matchAll(/import[^;]+/gu)].join('\n')
  },
  ignoreDependencies: ['tw-animate-css'],
  ignoreIssues: {
    'src/lib/components/ui/**': ['exports', 'types'],
    'src/lib/formsnap/**': ['exports', 'types'],
    'src/lib/varsel/**': ['exports', 'types'],
    'src/lib/vaul/**': ['exports', 'types'],
  },

  paths: {
    '$assets/*': ['./src/lib/assets'],
    '$data/*': ['./src/lib/data'],
    '$helpers/*': ['./src/lib/helpers'],
    '$lib/*': ['./src/lib/*']
  },
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
