![logo](./static/favicon.svg)

# Coss UI-Svelte (unofficial)

This project is an unofficial port of Coss UI for Svelte.

This port is what I’ve always wanted for Svelte: one unified, full-featured component library. It builds on the upstream Coss components and extends them with contributions from Shadcn, MapCN, Bits UI, Origin UI and third-party contributors.

In a nutshell, everything needed to build a serious application, plus:

- **Modern design**: clean, contemporary styling with layered shadows and softly rounded surfaces.
- **Responsive by default**: widgets and layouts adapt to any screen size, with swipe and touch gestures built in.
- **Ready to use**: 70 components and 700+ blocks and particles, including forms, fieldsets and skeletons. Spend your time on application logic, not on rebuilding the basics.
- **Solid foundation**: powered by Shards UI, a Svelte port of Base UI.
- **Intuitive out of the box**: sensible defaults, so components behave the way you expect.

This work is not affiliated with coss.com and therefore unofficial.

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

<p>
  <a href="https://github.com/orefalo" title="Olivier Refalo"><img src="https://github.com/orefalo.png?size=96" width="48" height="48" alt="Olivier Refalo" style="border-radius:50%" /></a>
  <a href="https://github.com/Tsuzat" title="Tsuzat"><img src="https://github.com/Tsuzat.png?size=96" width="48" height="48" alt="Tsuzat" style="border-radius:50%" /></a>
</p>

See all [contributors](https://github.com/cossui-svelte/cossui-svelte/graphs/contributors) on GitHub.

## Acknowledgements

- [Coss UI](https://cossui.com/) - The original project that this Svelte version is copied from
- [ShardsUI](https://shardsui.com/) - A Svelte port of Base UI
- [TailwindCSS v4](https://tailwindcss.com) - An easy to use CSS framework with beautiful UI
- [Phantom-UI](https://github.com/Aejkatappaja/phantom-ui) - An elegant structure-aware skeleton loader
- [FormSnap & Superforms](https://superforms.rocks/) - A full featured headless validation framework
- [Places Autocomplete](https://github.com/gurbaaz27/shadcn-google-maps) - Address validation based on gmap
- [Huey ColorPicker](https://hueycolor.pages.dev/) - A modular color picker
- [Edra](https://github.com/Tsuzat/Edra) - A rich text editor for Svelte
- [MapCN-Svelte](https://mapcn-svelte.vercel.app/) - A modular map component
- [Svelte/SvelteKit](https://svelte.dev) - A quite intuitive web framework

Other good source of inspiration, sometimes with full component logic just copy/pasted (full credits to their authors):

- [ShadCN Svelte](https://www.shadcn-svelte.com/)
- [Bits UI](https://www.bits-ui.com/)
- [Unofficial port of Origin UI](https://github.com/max-got/originui-svelte)

### Differences from the original

The Original [Coss UI](https://cossui.com/) is built with Next.js and BaseUI. This port is built with **Svelte** and **ShardsUI**.

- [x] [SvelteKit](https://svelte.dev) instead of ~~Next.js~~
- [x] [Lucide Svelte](https://lucide.dev/guide/packages/lucide-svelte) (`@lucide/svelte`) instead of ~~Lucide React~~
- [x] [ShardsUI](https://shardsui.com/) instead of ~~Base UI~~
- [x] Skeleton component is now trivial, thanks to [Phantom-UI](https://github.com/Aejkatappaja/phantom-ui)
- [x] More components, ported from various sources

A few components are built differently, reflecting the intuitive conventions of the Svelte ecosystem and its frameworks.

