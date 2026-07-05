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

[![Star History Chart](https://api.star-history.com/svg?repos=cossui-svelte/cossui-svelte&type=Date)](https://star-history.com/#cossui-svelte/cossui-svelte&Date)

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

## Differences from the original

The Original [Coss UI](https://cossui.com/) is built with Next.js and BaseUI. This port is built with Svelte and BitsUI.

- [x] [Svelte](https://svelte.dev) instead of ~~Next.js~~
- [x] [Lucide Svelte](https://lucide.dev/guide/packages/lucide-svelte) instead of ~~Lucide React~~
- [x] [Bits UI](https://bits-ui.com/docs/introduction) instead of ~~Base UI~~
- [x] Form/Field/Fieldset are leveraging the power of [FormSnap & Superforms](https://superforms.rocks/)
- [x] Skeleton component now trivial, thanks to [Phantom-UI](@aejkatappaja/phantom-ui)

A few components are built differently, reflecting the intuitive conventions of the Svelte ecosystem and its frameworks.