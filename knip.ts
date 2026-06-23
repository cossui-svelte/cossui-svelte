const config = {
  compilers: {
    svelte: (text: string) => [...text.matchAll(/import[^;]+/gu)].join('\n')
  },
  ignoreIssues: {
    'src/lib/components/ui/**': ['exports', 'types', 'files'],
    'src/lib/formsnap/**': ['exports', 'types', 'files'],
    'src/lib/varsel/**': ['exports', 'types', 'files'],
    'src/lib/vaul/**': ['exports', 'types', 'files']
  },

  paths: {
    '$assets/*': ['./src/lib/assets'],
    '$data/*': ['./src/lib/data'],
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
