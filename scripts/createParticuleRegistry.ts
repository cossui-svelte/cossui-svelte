/// <reference types="node" />
import fs from 'node:fs/promises';
import path from 'node:path';
import userRegistry from './user-registry-particule-metadata.js';

export interface RegistryParticuleEntry {
    name?: string;
    description: string;
    // relative to src/lib/components/
    file?: string;
    // optional tags for categorization
    tags?: string[];
    npmDependencies?: string[];
    registryDependencies?: string[];
}

export type RegistryParticuleData = Record<string, RegistryParticuleEntry>;


const EXAMPLES_DIR = path.resolve('src/lib/components/examples');

const writeFlag = process.argv.includes('-w');
const writeArgIdx = process.argv.indexOf('-w');
const outputFile = writeArgIdx !== -1 && process.argv[writeArgIdx + 1] && !process.argv[writeArgIdx + 1].startsWith('-')
    ? process.argv[writeArgIdx + 1]
    : 'registry-blocks.json';

function toName(id: string): string {
    return id
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

async function scanExamples(): Promise<void> {
    const categories = await fs.readdir(EXAMPLES_DIR, { withFileTypes: true });
    const components: RegistryParticuleData = {};

    for (const entry of categories.sort((a, b) => a.name.localeCompare(b.name))) {
        if (!entry.isDirectory()) continue;

        const category = entry.name;
        const categoryPath = path.join(EXAMPLES_DIR, category);
        const files = (await fs.readdir(categoryPath)).sort();
        const meta = userRegistry[category];

        for (const file of files) {
            if (!file.endsWith('.svelte')) continue;

            const id = file.replace(/\.svelte$/, '');
            const component: RegistryParticuleEntry = {

                name: toName(id),
                description: meta?.description ?? '',
                file: `examples/${category}/${file}`,
                tags: meta ? meta.tags : [],
                npmDependencies: [],
                registryDependencies: []
            };

            components[id] = component;
        }
    }

    const json = JSON.stringify(components, null, 4)
    const output = `
export interface RegistryParticuleEntry {
    name: string;
    description: string;
    // relative to src/lib/components/
    file: string;
    // optional tags for categorization
    tags: string[];
    npmDependencies: string[];
    registryDependencies: string[];
}

export type RegistryParticuleData = Record<string, RegistryParticuleEntry>;
export const particules: RegistryParticuleData = ${json};
`;


    if (writeFlag) {

        await fs.writeFile(outputFile, output);
        console.log(`Written to ${outputFile}`);
    } else {
        console.log(output);
    }
}

scanExamples().catch((err) => {
    console.error(err);
    process.exit(1);
});
