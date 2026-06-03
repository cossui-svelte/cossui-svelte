/// <reference types="node" />
import fs from 'node:fs/promises';
import path from 'node:path';
import registryCategory from './user-registryui-metadata.js';

export interface ComponentMeta {
    id: string;
    name: string;
    description: string;
    file: string; // relative to src/lib/components/
    tags: string[]; // optional tags for categorization
}

const EXAMPLES_DIR = path.resolve('src/lib/components/examples');

function toName(id: string): string {
    return id
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' ');
}

async function scanExamples(): Promise<void> {
    const categories = await fs.readdir(EXAMPLES_DIR, { withFileTypes: true });

    for (const entry of categories.sort((a, b) => a.name.localeCompare(b.name))) {
        if (!entry.isDirectory()) continue;

        const category = entry.name;
        const categoryPath = path.join(EXAMPLES_DIR, category);
        const files = (await fs.readdir(categoryPath)).sort();
        const meta = registryCategory[category];

        for (const file of files) {
            if (!file.endsWith('.svelte')) continue;

            const id = file.replace(/\.svelte$/, '');
            const component: ComponentMeta = {
                id,
                name: toName(id),
                description: meta?.description ?? '',
                file: `examples/${category}/${file}`,
                tags: meta ? [meta.category] : [],
            };
            console.log(component);
        }
    }
}

scanExamples().catch((err) => {
    console.error(err);
    process.exit(1);
});
