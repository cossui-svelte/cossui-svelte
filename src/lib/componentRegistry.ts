import { COSSUI_DIRECTORIES, type ComponentState } from '$lib/componentRegistry.components';
import type {
  COSSUIComponent,
  COSSUIDirectory,
  COSSUIDirectoryToComponent
} from '$lib/componentRegistry.types';

import { GITHUB_REPO_URL } from './constants.js';

interface ComponentMetadata {
  githubUrl: string;
  name: string;
  path: string;
  state: ComponentState;
}

interface DirectoryMetadata {
  apiUrl: string;
  componentCount: number;
  components: ComponentMetadata[];
  directoryPath: string;
  githubUrl: string;
  llmsTextUrl: string;
  stateBreakdown: Record<ComponentState, number>;
}

interface RegistryMetadata {
  directoriesBreakdown: Record<COSSUIDirectory, DirectoryMetadata>;
  totalComponents: number;
  totalDirectories: number;
}

// =========================================
// Component Registry Implementation
// =========================================

class ComponentRegistry {
  #components: Map<COSSUIDirectory, Set<COSSUIComponent>>;

  constructor() {
    this.#components = new Map();
    this.refresh();
  }

  // =========================================
  // Initialization
  // =========================================

  async refresh() {
    this.#components = await this.#initializeComponents();
  }

  #getFileImports = () => {
    return import.meta.glob<COSSUIComponent>(
      ['$lib/components/**/*.svelte', '!$lib/components/ui/**/*.svelte'],
      { eager: false, import: 'default' }
    );
  };

  async #initializeComponents(): Promise<Map<COSSUIDirectory, Set<COSSUIComponent>>> {
    const files = this.#getFileImports();
    const componentMap = new Map<COSSUIDirectory, Set<COSSUIComponent>>();

    // In dev mode, we just need the paths
    const paths = Object.keys(files);

    for (const path of paths) {
      const match = path.match(/\/components\/examples\/([^/]+)\/([^/]+)\.svelte$/);
      if (!match) continue;

      const [, directory, filename] = match as [string, COSSUIDirectory, COSSUIComponent];

      if (!componentMap.has(directory)) {
        console.log('Adding directory to component map: ' + directory);
        componentMap.set(directory, new Set());
      }
      componentMap.get(directory)?.add(filename);
    }

    return componentMap;
  }

  /**
   * Determines the state of a component based on its filename
   */
  #getComponentState(filename: string): ComponentState {
    if (filename.includes('.todo')) return 'todo';
    return 'ready';
  }

  /**
   * Gets the GitHub URL for a directory or component
   */
  #generateGithubUrl(directory: COSSUIDirectory, filename?: string): string {
    const basePath = `${GITHUB_REPO_URL}/tree/main/src/lib/components/examples/${directory}`;
    return filename ? `${basePath}/${filename}.svelte` : basePath;
  }

  #getFile<T extends COSSUIDirectory>(directory: T): COSSUIDirectoryToComponent[T][] {
    console.log('Getting files for directory: ' + directory);
    const components = this.#components.get(directory);
    if (!components?.size) {
      throw new Error(`Components ${directory} not found in components/${directory}`);
    }
    return Array.from(components) as COSSUIDirectoryToComponent[T][];
  }

  getAllDirectories(): COSSUIDirectory[] {
    return Array.from(this.#components.keys());
  }

  getDirectories<T extends keyof typeof COSSUI_DIRECTORIES>(
    directories: T[]
  ): (typeof COSSUI_DIRECTORIES)[T]['directory'][] {
    return directories.map((directory) => COSSUI_DIRECTORIES[directory].directory);
  }

  getFiles<T extends COSSUIDirectory>(directories: T[]): COSSUIDirectoryToComponent[T][] {
    return directories.flatMap((directory) => this.#getFile(directory));
  }

  getRegistryMetaData(): RegistryMetadata {
    const metadata: RegistryMetadata = {
      directoriesBreakdown: {} as Record<COSSUIDirectory, DirectoryMetadata>,
      totalComponents: 0,
      totalDirectories: Object.keys(COSSUI_DIRECTORIES).length
    };

    Object.values(COSSUI_DIRECTORIES).forEach((directoryConfig) => {
      const directory = directoryConfig.directory;
      const directoryPath = `src/lib/components/examples/${directory}`;
      const components = this.#components.get(directory);
      const componentsMetadata: ComponentMetadata[] = [];
      const stateBreakdown = {
        ready: 0,
        soon: 0,
        todo: 0
      };

      components?.forEach((component) => {
        const state = this.#getComponentState(component);
        stateBreakdown[state]++;

        componentsMetadata.push({
          githubUrl: this.#generateGithubUrl(directory, component),
          name: component,
          path: `${directoryPath}/${component}`,
          state
        });
      });

      metadata.directoriesBreakdown[directory as COSSUIDirectory] = {
        apiUrl: `/api/v1/components/${directory}.json`,
        componentCount: components?.size || 0,
        components: componentsMetadata,
        directoryPath,
        githubUrl: this.#generateGithubUrl(directory),
        llmsTextUrl: `/llms/${directory}.txt`,
        stateBreakdown
      };

      metadata.totalComponents += components?.size || 0;
    });

    return metadata;
  }
}

let componentRegistryInstance: ComponentRegistry | null = null;

const initComponentRegistry = async () => {
  const registry = new ComponentRegistry();
  await registry.refresh();
  return registry;
};

export const getComponentRegistry = async () => {
  if (!componentRegistryInstance) {
    componentRegistryInstance = await initComponentRegistry();
  }
  return componentRegistryInstance;
};

export const getComponentDirectories = async () =>
  (await getComponentRegistry()).getAllDirectories();

export const getComponentFileNames = async <T extends COSSUIDirectory>(
  directory: T
): Promise<COSSUIDirectoryToComponent[T][]> => (await getComponentRegistry()).getFiles([directory]);

export function* iterateDirectories(): Generator<
  (typeof COSSUI_DIRECTORIES)[keyof typeof COSSUI_DIRECTORIES]
> {
  yield* Object.values(COSSUI_DIRECTORIES);
}
