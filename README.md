![logo](./static/favicon.svg)

# Coss UI-Svelte (unofficial)

This project is an unofficial port of Coss UI for Svelte.

I first found the unofficial [Svelte port of Origin UI](https://github.com/max-got/originui-svelte) and liked its look and feel. Later, I learned that Origin UI was acquired by Coss UI and that an updated component library existed, but only for React.

Since there was no Svelte option, this project aims to bring those updated components to Svelte 5.

Along the way, I noticed that even Coss UI lacks some of the components found in Bits UI and Origin UI. So after exploring through 3rd party projects and pull requests, I brought everything together under one umbrella, mainly for my personal use.

*__"A full set of good looking components, for the most intuitive web framework."__*

## ShowCase

[CossUI-Svelte ShowCase](https://www.cossui-svelte.com)

## Star History

## Star History

<a href="https://www.star-history.com/?type=date&repos=cossui-svelte%2Fcossui-svelte">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=cossui-svelte/cossui-svelte&type=date&theme=dark&legend=top-left&sealed_token=6_UYNKxcgUaJGjNL2rNTp_86ri5nOTsTcwjekEYrwRU_GFnHj7p_xL5ciFQsmYUOvajPQs74TzYGJjaTyDG2zp9pO9cvVtUaCHbYRHOzhYE6cq1X4Wgq0g" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=cossui-svelte/cossui-svelte&type=date&legend=top-left&sealed_token=6_UYNKxcgUaJGjNL2rNTp_86ri5nOTsTcwjekEYrwRU_GFnHj7p_xL5ciFQsmYUOvajPQs74TzYGJjaTyDG2zp9pO9cvVtUaCHbYRHOzhYE6cq1X4Wgq0g" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=cossui-svelte/cossui-svelte&type=date&legend=top-left&sealed_token=6_UYNKxcgUaJGjNL2rNTp_86ri5nOTsTcwjekEYrwRU_GFnHj7p_xL5ciFQsmYUOvajPQs74TzYGJjaTyDG2zp9pO9cvVtUaCHbYRHOzhYE6cq1X4Wgq0g" />
 </picture>
</a>

## Contributors

[![Contributors](https://contrib.rocks/image?repo=cossui-svelte/cossui-svelte)](https://github.com/cossui-svelte/cossui-svelte/graphs/contributors)

## Acknowledgements

- [Coss UI](https://cossui.com/) - The original project that this Svelte version is copied from
- [Bits UI](https://bits-ui.com) - The foundational headless UI library 
- [Svelte/SvelteKit](https://svelte.dev) - The building the easiest to use and most intuitive frontend framework
- [TailwindCSS v4](https://tailwindcss.com) - An easy to use CSS framework with beautiful UI
- [Versel](https://github.com/66HEX/varsel) - A headless toast component
- [Vaul](https://github.com/quanghle/autopilot-vaul-svelte) - An headless, gesture-driven drawer component
- [Phantom-UI](https://github.com/Aejkatappaja/phantom-ui) - An elegant structure-aware skeleton loader
- [FormSnap & Superforms](https://superforms.rocks/) - A full featured headless validation framework

Other good source of inspiration, sometimes with full component logic just copy/pasted (full credits to their authors):

- [ShadCN Svelte](https://www.shadcn-svelte.com/)
- [Unofficial port of Origin UI](https://github.com/max-got/originui-svelte)

### Differences from the original

The Original [Coss UI](https://cossui.com/) is built with Next.js and BaseUI. This port is built with **Svelte** and **BitsUI**.

- [x] [SvelteKit](https://svelte.dev) instead of ~~Next.js~~
- [x] [Lucide Svelte](https://lucide.dev/guide/packages/lucide-svelte) instead of ~~Lucide React~~
- [x] [Bits UI](https://bits-ui.com/docs/introduction) instead of ~~Base UI~~
- [x] Form/Field/Fieldset are leveraging the power of [FormSnap & Superforms](https://superforms.rocks/)
- [x] Skeleton component is now trivial, thanks to [Phantom-UI](@aejkatappaja/phantom-ui)

A few components are built differently, reflecting the intuitive conventions of the Svelte ecosystem and its frameworks.


## Contributing

If you have a great feature, feel free to fork the project and submit your changes back as a PR.

### Building

We recommend to use `pnpm` package manager.

To setup (or update) the project, process as such:

1. Install PNPM (if not already installed), for example via `npm install -g pnpm`
2. Clone the repository `git clone git@github.com:cossui-svelte/cossui-svelte.git && cd cossui-svelte`
3. Run `pnpm install`from within the project folder
4. Run `pnpm dev` to spin up a local development server

### Commiting changes

- run `pnpm commit`

The script above is an neat helper to produce properly formatted commintlint messages. If you are already familiar with the syntax, you may prefix your commit messages as follows:

- **fix**: A bug fix, increments X.X.9
- **feat**: A new feature, increments X.9.X
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **revert:** for a revert commit
- **chore**: Changes that affect the build system or CICD
- **docs**: Documentation only changes

adding a tailing **'!'** marks the commit as a **BREAKING CHANGE** - and will affect version numbering.

###### Commit Subject

The commit subject must contains a succinct description of the change:

- use the imperative, present tense: "change" not "changed" nor "changes"
- don't capitalize the first letter
- no dot (.) at the end

### Branching Policy

#### Update main branch
`git checkout main`
`git pull origin main`

#### Merge feature branch locally
`git merge feature/user-profile`

#### Push changes to remote
`git push origin main`

#### Delete feature branch
`git branch -d feature/user-profile`
`git push origin --delete feature/user-profile`

### Examples

#### Feature development
`git checkout -b feature/user-authentication`
`git checkout -b feature/JIRA-123-payment-gateway`

#### Bug fixes
`git checkout -b fix/login-timeout`
`git checkout -b bugfix/GH-456-header-alignment`

#### Refactoring
`git checkout -b refactor/api-client`
