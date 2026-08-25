# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

An unofficial Svelte 5 / SvelteKit port of [Coss UI](https://cossui.com/) (originally Next.js + BaseUI), built on **ShardsUI** (a Svelte port of Base UI) instead of Bits UI, with Tailwind CSS v4. It's both a component library (published to a registry consumable via `jsrepo`/shadcn-style CLI) and a documentation/showcase site (deployed to Cloudflare Workers).

## Commands

Package manager is **pnpm** (not npm/yarn) — `packageManager: pnpm@11.22.0`.

- `pnpm dev` — start dev server (opens browser)
- `pnpm build` — production build (vite build)
- `pnpm check` — svelte-kit sync + svelte-check across the workspace (type/template errors)
- `pnpm lint:typecheck` — `tsc --noEmit`
- `pnpm lint:audit` — knip unused-code/dependency audit (`knip.ts`)
- `pnpm format` — runs biome (fix) then eslint (fix), in that order
- `pnpm gen:registry` — regenerate component/particle registries, rebuild static registry JSON, then reformat (see Registry generation below)
- `pnpm cf:deploy` — build then `wrangler deploy`
- `pnpm cf:typegen` — regenerate `src/worker-configuration.d.ts` from `wrangler.jsonc`
- `pnpm migrate` — biome config migration + wrangler typegen + Lucide import transform (one-off maintenance script)
- Tests: `vitest` is a dependency but there is no `test` script wired up in `package.json`; run `pnpm vitest` / `pnpm vitest run <path>` directly if you add or run tests.

### Formatting/linting split (two tools, each with a distinct scope)

- **Biome** (`biome.json`) formats and lints `.ts`/`.js`/`.json`/config files **and** `.svelte` files (via Biome's HTML-superset support, `html.experimentalFullSupportEnabled` + `indentScriptAndStyle: true`) — everything except `**/*.svelte.ts` / `**/*.svelte.js`, which ESLint owns instead (see below). It also owns import organization (custom group order: framework packages → `$lib/components/ui/**` → `$lib/**` → `@lucide/**` → relative) and interface-member sorting. There is no standalone Prettier step anymore — Biome replaced `prettier`/`prettier-plugin-svelte` for `.svelte` formatting (verified byte-identical output on representative components before the cutover). Several a11y rules are turned off repo-wide rather than fixed mechanically (`biome.json` → `linter.rules.a11y`) — this project doesn't enforce strict a11y linting; don't re-enable them without discussion.
- **ESLint** (`eslint.config.js`) lints `.svelte` / `.svelte.ts` / `.svelte.js` using `svelte-eslint-parser` + `typescript-eslint` + `eslint-plugin-svelte` + `eslint-plugin-better-tailwindcss` (Tailwind class validation, entry point `src/app.css`) — i.e. the Svelte-semantic and Tailwind-aware rules Biome doesn't have. Several svelte rules are deliberately downgraded to `warn` rather than fixed mechanically — see the comments in that file before "fixing" them.

Biome's Svelte support is labeled experimental upstream and its embedded-language lint rules can produce false positives at file-type boundaries — if `biome check` flags something that looks wrong for a `.svelte` file specifically (as opposed to a real bug), prefer a scoped `overrides` entry in `biome.json` over a blanket rule change. One known gap: `biome-ignore` comments aren't recognized inside Svelte template markup (only inside `<script>` blocks) — suppress template-level false positives via a path-scoped override in `biome.json` instead (see the `seo-head.svelte` entry for the pattern — the `</script>` string split there needs `style/useTemplate` off, not fixed, or the tag closes early in the rendered HTML).

Do not introduce a third formatter/linter or try to make one tool cover another's file type without checking whether that gap is intentional (it is, per the above).

## Architecture

### Two parallel component trees

- `src/lib/components/ui/<name>/` — the actual reusable component primitives (72 components: button, dialog, combobox, select, tree, etc.). Each has an `index.ts` barrel export. This is what gets published to the registry and consumed by downstream apps.
- `src/lib/components/particles/<name>/p-<name>-<index>.svelte` — demo/showcase variants of each component (e.g. `p-combobox-9.svelte`, `p-group-14.svelte`) shown verbatim in the docs site. These are self-contained snippets, not meant to be "fixed" the way library code is — e.g. their internal nav links are intentionally placeholder `#` fragments (see the eslint override for `particles/**`).

Both trees have a hand-maintained metadata file (`custom-component-metadata.ts` in `ui/`, `custom-particle-metadata.ts` in `particles/`) that layers extra data (description, category, `isnew`/`istodo` tags) onto the generated registry entries. Edit these by hand; everything else under `src/lib/registry/generated-*` is generated — don't hand-edit it.

### Registry generation pipeline

`jsrepo.config.ts` drives a shadcn/jsrepo-style registry (paths: `ui` → components, `block` → particles, `hook`, `util`, `lib`). `pnpm gen:registry` runs, in order:
1. `scripts/generateComponentRegistry.ts` → `src/lib/registry/generated-registry-components.ts`
2. `scripts/generateParticleRegistry.ts` → particle metadata
3. clears `static/r/*.json`, then `jsrepo build` regenerates the static registry JSON consumed by the CLI/docs
4. `pnpm format`

See `scripts/README.md` for the step-by-step for updating from upstream Coss UI (`registry.json`) or adding a new component/particle — it also spells out that any new UI component needs a thumbnail entry in `$lib/components/app/category-thumbnails.svelte`.

### Routes

SvelteKit routes under `src/routes/`: `docs/[...slug]` (component docs), `particle/[id]` and `particles` (particle showcase/search), `blocs`, `credits`, `ai`, `api` (including `api/source`). Path aliases: `$lib` → `src/lib`, `$assets` → `src/lib/assets`, `$data` → `src/lib/data` (defined in both `svelte.config.js` and `vite.config.ts` — keep them in sync if changed).

### Adding a new Component

1. Ensure the component has a `src/lib/components/ui/<COMPONENT>/index.ts` file
2. If the component is not in `scripts/upstream/registry.json` add it to `src/lib/components/ui/custom-component-metadata.ts`. `registry.json` must stay untouched, any incremental change should be made to `custom-component-metadata.ts`
2. Ensure `src/lib/components/app/category-thumbnails.svelte` has a matching thumbnail for component <COMPONENT>. if not, generate one.
2. run `pnpm gen:registry`

### Adding a new Particle

1. create the particle in `$lib/components/particles/<COMPONENT>/p-<PARTICLE>-<INDEX>.svelte`
2. If the particle is not in `scripts/upstream/registry.json` add it to `src/lib/components/particles/custom-particle-metadata.ts` with the proper metadata (tags, description). `registry.json` must stay untouched, any incremental change should be made to `custom-particle-metadata.ts`
3. run `pnpm gen:registry`

### Deployment

Cloudflare Workers via `@sveltejs/adapter-cloudflare` + `wrangler.jsonc`. `nodejs_compat` is enabled; SPA fallback (`not_found_handling: single-page-application`) with `/api/*` and `_app/env*` routed to the worker first.

## Known open issues

`BUGS.md` tracks a running list of known bugs/TODOs (e.g. nested drawer stacking, Firefox rounded-corner clipping on map particles, broken sliders) and a backlog of components still to port from origin-ui. Check it before assuming an odd visual behavior is a regression you introduced.
