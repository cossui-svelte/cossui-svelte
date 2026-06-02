<script lang="ts">
  import type { LayoutData } from "./$types";
  import type { Snippet } from "svelte";

  import "../app.css";

  import calSansUIUrl from "$lib/fonts/CalSansUI[MODE,wght].woff2?url";
  import calSansHeadingUrl from "$lib/fonts/CalSans-SemiBold.woff2?url";
  import paperMonoUrl from "$lib/fonts/PaperMono-Regular.woff2?url";

  import SiteHeader from "$lib/components/app/app-site-header.svelte";
  import SiteFooter from "$lib/components/shared-components/site-footer.svelte";
  import { ModeWatcher } from "mode-watcher";
  import {
    AnchoredToastProvider,
    ToastProvider,
  } from "$lib/components/ui/toast";

  let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<svelte:head>
  <link rel="preload" href={calSansUIUrl} as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href={calSansHeadingUrl} as="font" type="font/woff2" crossorigin="anonymous" />
  <link rel="preload" href={paperMonoUrl} as="font" type="font/woff2" crossorigin="anonymous" />
  <title>
    coss ui-svelte - A new, modern UI component library built on top of Bits UI.
    Built for developers and AI.
  </title>
  <meta
    name="description"
    content="coss ui-svelte is a collection of accessible, and composable Svelte components. Built on top of Bits UI and styled with Tailwind CSS"
    title="coss ui-svelte - A new, modern UI component library built on top of Bits UI. Built for developers and AI"
  />
</svelte:head>

<ModeWatcher defaultMode="system" disableTransitions />
<ToastProvider>
  <AnchoredToastProvider>
    <div
      class="relative isolate flex min-h-svh flex-col overflow-clip [--header-height:4rem]"
    >
      <!-- Right vertical line -->
      <div
        aria-hidden="true"
        class="container pointer-events-none absolute inset-0 z-45 before:absolute before:inset-y-0 before:-left-3 before:w-px before:bg-border/64 after:absolute after:inset-y-0 after:-right-3 after:w-px after:bg-border/64"
      />
      <!-- Right dot -->
      <div
        aria-hidden="true"
        class="container pointer-events-none fixed inset-0 z-45 before:absolute before:top-[calc(var(--header-height)-4.5px)] before:-left-[11.5px] before:z-1 before:-ml-1 before:size-2 before:rounded-[2px] before:border before:border-border before:bg-popover before:bg-clip-padding before:shadow-xs/5 after:absolute after:top-[calc(var(--header-height)-4.5px)] after:-right-[11.5px] after:z-1 after:-mr-1 after:size-2 after:rounded-[2px] after:border after:border-border after:bg-background after:bg-clip-padding after:shadow-xs/5 dark:after:bg-clip-border dark:before:bg-clip-border"
      />
      <SiteHeader />
      {@render children()}
      <SiteFooter />
    </div>
  </AnchoredToastProvider>
</ToastProvider>
