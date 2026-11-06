# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An unofficial Svelte 5 / SvelteKit port of [Coss UI](https://cossui.com/) (originally Next.js + BaseUI), built on **ShardsUI** (a Svelte port of Base UI) instead of Bits UI, with Tailwind CSS v4. It's both a component library (published to a registry consumable via `jsrepo`/shadcn-style CLI) and a documentation/showcase site (deployed to Cloudflare Workers).

## Commands

Package manager is **pnpm** (not npm/yarn) — `packageManager: pnpm@12.14.0`.

- `pnpm dev` — start dev server (`vite dev --host`; opens browser)
- `pnpm build` — production build (vite build)
- `pnpm check` — svelte-kit sync + svelte-check across the workspace (type/template errors). This is the typecheck — plain `tsc` can't see types exported from `.svelte` files
- `pnpm lint:audit` — knip unused-code/dependency audit (`knip.ts`)
- `pnpm format` — `oxlint --fix` then `oxfmt`, in that order
- `pnpm lint` — oxlint, then oxvelte (`pnpm lint:svelte`; needs the `oxvelte` binary, see below)
- `pnpm gen:registry` — regenerate component/particle registries, rebuild static registry JSON, then reformat (see Registry generation below)
- `pnpm cf:deploy` — build then `wrangler deploy`
- `pnpm cf:typegen` — regenerate `src/worker-configuration.d.ts` from `wrangler.jsonc`
- `pnpm migrate` — wrangler typegen + Lucide import transform (one-off maintenance script)
- `pnpm skills:install` — install the agent skills pinned in `skills-lock.json` (pinned `skills` CLI; not run on `pnpm install`)
- Tests: `vitest` is a dependency but there is no `test` script wired up in `package.json`; run `pnpm vitest` / `pnpm vitest run <path>` directly if you add or run tests.

### Formatting/linting split (Oxc toolchain, three tools)

- **oxfmt** (`.oxfmtrc.json`) formats `.ts`/`.js`/`.json`, `.svelte` and `.svelte.ts`/`.svelte.js`. Svelte markup is formatted through oxfmt's bundled Prettier engine; `<script>` blocks by oxfmt natively. It also sorts imports (packages incl. `$app`/`$env` → `#lib/components/ui/**` → `#lib/**` → relative, no blank lines between groups). `ignorePatterns` deliberately keeps it off `.md`/`.mdx` (mdsvex content — Prettier's MDX parser would mangle Svelte syntax), `.css`, `.html`, `static/`, `scripts/` and a few root configs.
- **oxlint** (`.oxlintrc.json`) lints all JS/TS, including the `<script>` blocks of `.svelte` files (but **not** their template markup). It carries the core/typescript rules (`no-unused-vars` with the `^_` convention) and the rules ported from the old Biome config. The `oxlint-tailwindcss` JS plugin (entry point `src/app.css`) checks Tailwind classes — but only in JS/TS and `<script>` blocks (`cn()`, `tv()`, …); classes written directly in Svelte markup are not linted. That gap was accepted when moving off `eslint-plugin-better-tailwindcss`.
- **oxvelte** (`oxvelte.config.json`) is a Rust port of `eslint-plugin-svelte` that lints Svelte templates and Svelte-specific semantics. It isn't on npm — install it with `cargo install --git https://github.com/tolgaouz/oxvelte.git`. Several svelte rules are deliberately downgraded to `warn` (SvelteKit `resolve()` migration, `SvelteSet`/`SvelteMap`, `$state`+`$effect` → `$derived`, each-block keys, `{@html}` review) and `svelte/no-dom-manipulating` is off (the map components must hand MapLibre real DOM nodes) — these need behavior changes or judgment calls, not mechanical fixes. oxvelte has no per-path overrides, so `pnpm lint:svelte` runs it twice: app/ui code with `oxvelte.config.json`, and particles/blocs with `oxvelte.demos.json` (same rules plus `svelte/no-navigation-without-resolve` off, because demo links are placeholder `#` fragments). Keep the two configs in sync, and add any new top-level `src/lib` folder containing Svelte code to the path list in `lint:svelte`.

Suppression comments: oxlint and oxvelte both honor `eslint-disable*` comments (including `<!-- eslint-disable-next-line … -->` in markup), so existing ones still work; use `oxlint-disable*` for new ones. This project doesn't enforce strict a11y linting — don't enable oxlint's `jsx-a11y` plugin without discussion.

Do not introduce another formatter/linter without checking whether a gap is intentional (the markup-Tailwind gap above is).

## Architecture

### Two parallel component trees

- `src/lib/components/ui/<name>/` — the actual reusable component primitives (70 components: button, dialog, combobox, select, tree, etc.). Each has an `index.ts` barrel export. This is what gets published to the registry and consumed by downstream apps.
- `src/lib/components/particles/<name>/p-<name>-<index>.svelte` — demo/showcase variants of each component (e.g. `p-combobox-9.svelte`, `p-group-14.svelte`) shown verbatim in the docs site. These are self-contained snippets, not meant to be "fixed" the way library code is — e.g. their internal nav links are intentionally placeholder `#` fragments (see `oxvelte.demos.json`).

Both trees have a hand-maintained metadata file (`custom-component-metadata.ts` in `ui/`, `custom-particle-metadata.ts` in `particles/`) that layers extra data (description, category, `isnew`/`istodo` tags) onto the generated registry entries. Edit these by hand; everything else under `src/lib/registry/generated-*` is generated — don't hand-edit it.

### Registry generation pipeline

`jsrepo.config.ts` drives a shadcn/jsrepo-style registry (paths: `ui` → components, `block` → particles, `hook`, `util`, `lib`). `pnpm gen:registry` runs, in order:
1. `scripts/generateComponentRegistry.ts` → `src/lib/registry/generated-registry-components.ts`
2. `scripts/generateParticleRegistry.ts` → particle metadata
3. clears `static/r/*.json`, then `jsrepo build` regenerates the static registry JSON consumed by the CLI/docs
4. `scripts/postprocessRegistry.ts` rewrites that JSON for `shadcn-svelte add <url>`: bare `registryDependencies` → absolute URLs, `$lib/...` targets → paths relative to the CLI alias of the item type, `#lib`/`#assets` imports → `$lib`. Don't hand-edit `static/r`; change the script instead
5. `pnpm format`

See `scripts/upstream/README.md` for the step-by-step for updating from upstream Coss UI (`registry.json`). Any new UI component also needs a thumbnail entry in `#lib/components/app/component-thumbnails.svelte`.

### Routes

SvelteKit routes under `src/routes/`: `docs/[...slug]` (component docs), `particle/[id]` and `particles` (particle showcase/search), `blocs`, `credits`, `ai`, `api` (`api/source`, `api/component-source`, `api/bloc-source`), `sitemap.xml`. SvelteKit config lives inline in the `sveltekit({...})` call in `vite.config.ts` (there is no `svelte.config.js`). Code imports via the Node subpath imports in `package.json` (`#lib/*` → `src/lib/*`, plus `#assets/*` and `#data/*`) — use `#lib`, not `$lib`, in code and docs samples. The registry `target` paths in `scripts/jsrepo-registry-items.ts` / `jsrepo.config.ts` stay `$lib/...`: they are install locations the consumer's CLI resolves, not imports.

### Adding a new Component

1. Ensure the component has a `src/lib/components/ui/<COMPONENT>/index.ts` file
2. If the component is not in `scripts/upstream/registry.json` add it to `src/lib/components/ui/custom-component-metadata.ts`. `registry.json` must stay untouched, any incremental change should be made to `custom-component-metadata.ts`
3. Ensure `src/lib/components/app/component-thumbnails.svelte` has a matching thumbnail for component <COMPONENT>. if not, generate one.
4. run `pnpm gen:registry`

### Adding a new Particle

1. create the particle in `#lib/components/particles/<COMPONENT>/p-<PARTICLE>-<INDEX>.svelte`
2. If the particle is not in `scripts/upstream/registry.json` add it to `src/lib/components/particles/custom-particle-metadata.ts` with the proper metadata (tags, description). `registry.json` must stay untouched, any incremental change should be made to `custom-particle-metadata.ts`
3. run `pnpm gen:registry`

### Deployment

Cloudflare Workers via `@sveltejs/adapter-cloudflare` + `wrangler.jsonc`. `nodejs_compat` and `nodejs_als` are enabled; `/api/*`, `/_app/env.js` and `/_app/env.script.js` are routed to the worker first. Don't set `not_found_handling: single-page-application` — the adapter would overwrite the prerendered `index.html` with a fallback shell (`adapter_fallback_overwrites` warning).

## Known open issues

`BUGS.md` tracks a running list of known bugs/TODOs (open items such as Firefox rounded-corner clipping on map particles; fixed ones are marked `DONE`) and a backlog of components still to port from origin-ui. Check it before assuming an odd visual behavior is a regression you introduced.
