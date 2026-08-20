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

<a href="https://www.star-history.com/?repos=cossui-svelte%2Fcossui-svelte&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/chart?repos=cossui-svelte/cossui-svelte&type=date&theme=dark&legend=top-left&sealed_token=M4HW4n7KguTD-r4cBbHMPrZT4oaFlxwETtAy3jUbKCnw51EfXwPyssIn8ceVDumXFo75rSiF0drTvAiFw7fGdvzu8RsiSSMgWW2X1Zm2Ay8cGdu3_WzI7A" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/chart?repos=cossui-svelte/cossui-svelte&type=date&legend=top-left&sealed_token=M4HW4n7KguTD-r4cBbHMPrZT4oaFlxwETtAy3jUbKCnw51EfXwPyssIn8ceVDumXFo75rSiF0drTvAiFw7fGdvzu8RsiSSMgWW2X1Zm2Ay8cGdu3_WzI7A" />
   <img alt="Star History Chart" src="https://api.star-history.com/chart?repos=cossui-svelte/cossui-svelte&type=date&legend=top-left&sealed_token=M4HW4n7KguTD-r4cBbHMPrZT4oaFlxwETtAy3jUbKCnw51EfXwPyssIn8ceVDumXFo75rSiF0drTvAiFw7fGdvzu8RsiSSMgWW2X1Zm2Ay8cGdu3_WzI7A" />
 </picture>
</a>

## Contributors

[![Contributors](https://contrib.rocks/image?repo=cossui-svelte/cossui-svelte)](https://github.com/cossui-svelte/cossui-svelte/graphs/contributors)

## Acknowledgements

- [Coss UI](https://cossui.com/) - The original project that this Svelte version is copied from
- [ShardsUI](https://shardsui.com/) - A Svelte port of Base UI
- [TailwindCSS v4](https://tailwindcss.com) - An easy to use CSS framework with beautiful UI
- [Phantom-UI](https://github.com/Aejkatappaja/phantom-ui) - An elegant structure-aware skeleton loader
- [FormSnap & Superforms](https://superforms.rocks/) - A full featured headless validation framework
- [Places Autocomplete](https://github.com/gurbaaz27/shadcn-google-maps) - Address validation based on gmap
- [Huey ColorPicker](https://hueycolor.pages.dev/) - A modular color picker
- [MapCN-Svelte](https://mapcn-svelte.vercel.app/) - A modular map component
- [Svelte/SvelteKit](https://svelte.dev) - A quite intuitive web framework

Other good source of inspiration, sometimes with full component logic just copy/pasted (full credits to their authors):

- [ShadCN Svelte](https://www.shadcn-svelte.com/)
- [Bits UI](https://www.bits-ui.com/)
- [Unofficial port of Origin UI](https://github.com/max-got/originui-svelte)

### Differences from the original

The Original [Coss UI](https://cossui.com/) is built with Next.js and BaseUI. This port is built with **Svelte** and **BitsUI**.

- [x] [SvelteKit](https://svelte.dev) instead of ~~Next.js~~
- [x] [Lucide Svelte](https://lucide.dev/guide/packages/lucide-svelte) instead of ~~Lucide React~~
- [x] [ShardsUI](https://shardsui.com/) instead of ~~Base UI~~
- [x] Skeleton component is now trivial, thanks to [Phantom-UI](@aejkatappaja/phantom-ui)
- [x] More components, ported from various sources

A few components are built differently, reflecting the intuitive conventions of the Svelte ecosystem and its frameworks.

