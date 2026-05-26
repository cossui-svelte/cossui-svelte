import type { Component } from 'svelte';
import {
  ENHANCED_IMAGE_REGEX,
  POSSIBLE_DEPENDENCIES,
  type PossibleDependency
} from '$lib/constants.js';
import type { COSSUIComponent, COSSUIDirectory } from '$lib/registry/componentRegistry.types.js';
import { highlighterSvelte, highlighterZsh } from './codePreview.js';

const IMPORTS_REGEX =
  /(?<=(?:import|export)[^`'"]*from\s+[`'"])(?<path1>[^`'"]+)(?=[`'"])|(?:import|export)(?:\s+|\s*\(\s*)[`'"](?<path2>[|'"`])/g;

interface ComponentImports {
  compiled: Record<string, () => Promise<Component>>;
  source: Record<string, () => Promise<string>>;
}

const getImports = (): ComponentImports => {
  return {
    compiled: import.meta.glob(
      [
        '/src/lib/components/examples/**/*.svelte',
        '!/src/lib/components/ui/**/*.svelte',
        '!/src/lib/components/**/*.old/**'
      ],
      {
        eager: false,
        import: 'default'
      }
    ) as Record<string, () => Promise<Component>>,
    source: import.meta.glob(
      [
        '/src/lib/components/examples/**/*.svelte',
        '!/src/lib/components/ui/**/*.svelte',
        '!/src/lib/components/**/*.old/**'
      ],
      {
        eager: false,
        import: 'default',
        query: '?raw'
      }
    ) as Record<string, () => Promise<string>>
  };
};

export async function getComponentSource(
  directory: COSSUIDirectory,
  componentName: COSSUIComponent
) {
  const path = buildComponentPath(directory, componentName);
  const imports = getImports();
  const importFn = imports.source[path];

  const processedComponentSource = await processComponentSource(await importFn());

  const componentState = {
    isAvailable: !componentName.includes('.todo'),
    isTodo: componentName.includes('.todo')
  };

  if (componentState.isTodo) {
    return {
      ...processedComponentSource,
      availability: 'todo',
      directory,
      id: componentName,
      name: componentName.replace('.todo', ''),
      path
    } as const;
  }

  return {
    ...processedComponentSource,
    availability: 'available',
    directory,
    id: componentName,
    name: componentName,
    path
  } as const;
}

function buildComponentPath(
  directory: string,
  componentName: string
): `/src/lib/components/examples/${string}/${string}.svelte` {
  return `/src/lib/components/examples/${directory}/${componentName}.svelte`;
}

function getDependencies(source: string): PossibleDependency[] {
  const dependencies = new Set<PossibleDependency>();
  const matches = source.matchAll(IMPORTS_REGEX);
  for (const match of matches) {
    const importPath = match[1] || match[2];
    const matchingDeps = POSSIBLE_DEPENDENCIES.filter((dep) => importPath.includes(dep.name));
    matchingDeps.forEach(function dd(dep) {
      dependencies.add(dep);
    });
  }

  const enhancedImageMatch = source.match(ENHANCED_IMAGE_REGEX);
  if (enhancedImageMatch) {
    dependencies.add({
      dev: true,
      //@ts-expect-error  - isn't a direct dependency, but must be treated as such
      name: 'enhanced-image',
      //@ts-expect-error  - isn't a direct dependency, but must be treated as such
      packageName: '@sveltejs/enhanced-img',
      //@ts-expect-error  - isn't a direct dependency, but must be treated as such
      url: 'https://www.npmjs.com/package/@sveltejs/enhanced-img'
    });
  }

  const sortedDependencies = Array.from(dependencies.values()).sort(
    (a, b) => Number(a.dev) - Number(b.dev)
  );

  if (sortedDependencies.length === 0) return [];

  return sortedDependencies;
}

function getDependenciesInstallCommand(dependencies: PossibleDependency[]) {
  if (dependencies.length === 0) return '';

  let command = '';
  const deps = dependencies.filter((d) => !d.dev).map((d) => d.packageName);
  const devDeps = dependencies.filter((d) => d.dev).map((d) => d.packageName);

  if (devDeps.length) command += `pnpm i -D ${devDeps.join(' ')}`;
  if (deps.length) {
    if (command) command += ' && ';
    command += `pnpm i ${deps.join(' ')}`;
  }

  return command;
}

async function processComponentSource(rawSource: string) {
  const dependencies = getDependencies(rawSource);
  const dependenciesInstallCommand = getDependenciesInstallCommand(dependencies);

  const [highlightedCleanedSource, highlightedInstallCommand] = await Promise.all([
    highlighterSvelte(rawSource),
    highlighterZsh(dependenciesInstallCommand)
  ]);

  return {
    code: {
      highlighted: { content: highlightedCleanedSource },
      raw: { content: rawSource }
    },
    componentDependencies: {
      command: {
        highlighted: { content: dependenciesInstallCommand ? highlightedInstallCommand : '' },
        raw: { content: dependenciesInstallCommand }
      },
      list: dependencies
    }
  } as const;
}
