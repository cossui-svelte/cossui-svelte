import fs from 'node:fs';
import path from 'node:path';
import { error } from '@sveltejs/kit';

const BASE_DIR = './Folders'; // Change to your root directory

export async function load({ params }) {
    const relativePath = params.path ? params.path.join('/') : '';
    const fullPath = path.join(BASE_DIR, relativePath);

    if (!fs.existsSync(fullPath)) {
        throw error(404, 'Folder not found');
    }

    const items = fs.readdirSync(fullPath, { withFileTypes: true });

    return {
        // currentPath: relativePath,
        // files: items.filter((item) => item.isFile()).map((item) => item.name),
        folders: items.filter((item) => item.isDirectory()).map((item) => item.name)
    };
}
