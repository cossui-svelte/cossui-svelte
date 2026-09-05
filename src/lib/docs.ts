import { allComponents, type RegistryUIEntry } from '$lib/registry/generated-registry-components';

export interface PageNode {
  name: string;
  type: 'page';
  url: string;
}

export interface FolderNode {
  $id: string;
  children: PageNode[];
  name: string;
  type: 'folder';
}

export interface NavTree {
  children: FolderNode[];
}

const CATEGORY_LABELS: Record<RegistryUIEntry['category'], string> = {
  'bits-ui': 'Bits UI',
  extra: 'Extra',
  'origin-ui': 'Origin UI',
  'shadcn-ui': 'Shadcn UI',
  ui: 'Components'
};

const CATEGORY_ORDER = Object.keys(CATEGORY_LABELS) as RegistryUIEntry['category'][];

function docUrl(entry: RegistryUIEntry) {
  return `/docs/${entry.folder}`;
}

export const PAGES_NEW: string[] = Object.values(allComponents)
  .filter((entry) => entry.isnew)
  .map(docUrl);

export const componentNavTree: NavTree = {
  children: CATEGORY_ORDER.map((category) => ({
    $id: category,
    children: Object.values(allComponents)
      .filter((entry) => entry.category === category)
      .map((entry) => ({ name: entry.name, type: 'page' as const, url: docUrl(entry) }))
      .sort((a, b) => a.name.localeCompare(b.name)),
    name: CATEGORY_LABELS[category],
    type: 'folder' as const
  })).filter((folder) => folder.children.length > 0)
};
