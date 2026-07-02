# How to update components registry from upstream

1. copy registry.json from upstream cossui project
2. run `pnpm generate:registry`

# How to add a new component

1. Ensure the component has a `$lib/components/ui/<COMPONENT>/index.ts` file
2. Ensure `$lib/components/app/category-thumbnails.svelte` has a thumbnail. You may want to use AI to generate it.
2. run `pnpm generate:registry`

# How to add a custom particle

1. create your particle in `$lib/components/particles/<COMPONENT>/p-<PARTICLE>-<INDEX>.svelte`
2. add en entry in file `custom-component-metadata.ts` with the proper metadata (component reference, search tags, description)
3. run `pnpm generate:registry`

# How to change release tags (todo/new)

1. edit file `custom-component-metadata`
2. find your component or create a new entry 
3. add tags 'istodo' or 'isnew' appropriatly
4. run `pnpm generate:registry`