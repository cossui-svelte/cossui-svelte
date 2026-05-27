import type { RegistryCategory } from './registry-categories.js';

export type Particle = {
  name: string;
  description?: string;
  categories?: RegistryCategory[];
  registryDependencies?: string[];
  meta?: {
    className?: string;
    colSpan?: number;
  };
  files: [
    {
      path: string;
      type: 'registry:block' | 'registry:style' | 'registry:script';
    }
  ];
  type: 'registry:block' | 'registry:style' | 'registry:script';
};

// Helper function to ensure categories are valid RegistryCategory values
function categories<T extends RegistryCategory[]>(...categories: T): T {
  return categories;
}

// Populate with actual particle registry items as they are ported to Svelte
export const particles: Particle[] = [
  {
    categories: categories('button'),
    description: 'Default button',
    files: [{ path: 'particles/p-button-1.tsx', type: 'registry:block' }],
    name: 'p-button-1',
    registryDependencies: ['@coss/button'],
    type: 'registry:block'
  },
  {
    categories: categories('button'),
    description: 'Outline button',
    files: [{ path: 'particles/p-button-2.tsx', type: 'registry:block' }],
    name: 'p-button-2',
    registryDependencies: ['@coss/button'],
    type: 'registry:block'
  }
];
