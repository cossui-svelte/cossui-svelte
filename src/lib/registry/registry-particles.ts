import type { RegistryCategory } from './registry-categories.js';

export type Particle = {
  name: string;
  description?: string;
  categories?: RegistryCategory[];
  dependencies?: string[];
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
  },
  {
    categories: categories("alert", "warning"),
    dependencies: ["lucide-react"],
    description: "Warning alert",
    files: [{ path: "particles/p-alert-6.tsx", type: "registry:block" }],
    meta: {
      className: "**:data-[slot=preview]:w-full",
    },
    name: "p-alert-6",
    registryDependencies: ["@coss/alert"],
    type: "registry:block",
  },
  {
    categories: categories("alert", "error"),
    dependencies: ["lucide-react"],
    description: "Error alert",
    files: [{ path: "particles/p-alert-7.tsx", type: "registry:block" }],
    meta: {
      className: "**:data-[slot=preview]:w-full",
    },
    name: "p-alert-7",
    registryDependencies: ["@coss/alert"],
    type: "registry:block",
  },
  {
    categories: categories("alert dialog", "dialog"),
    description: "Alert dialog",
    files: [{ path: "particles/p-alert-dialog-1.tsx", type: "registry:block" }],
    name: "p-alert-dialog-1",
    registryDependencies: ["@coss/alert-dialog", "@coss/button"],
    type: "registry:block",
  },
  {
    categories: categories("autocomplete", "input"),
    description: "Basic autocomplete",
    files: [{ path: "particles/p-autocomplete-1.tsx", type: "registry:block" }],
    meta: {
      className:
        "**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64",
    },
    name: "p-autocomplete-1",
    registryDependencies: ["@coss/autocomplete"],
    type: "registry:block",
  },
  {
    categories: categories("autocomplete", "input", "async"),
    description: "Autocomplete with async items loading",
    files: [
      { path: "particles/p-autocomplete-12.tsx", type: "registry:block" },
    ],
    meta: {
      className:
        "**:data-[slot=preview]:w-full **:data-[slot=preview]:max-w-64",
    },
    name: "p-autocomplete-12",
    registryDependencies: ["@coss/autocomplete", "@coss/spinner"],
    type: "registry:block",
  },
];
