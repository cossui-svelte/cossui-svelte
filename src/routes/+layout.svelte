<script lang="ts">
  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";

  import "../app.css";

  import { ModeWatcher } from "mode-watcher";
  import {
    AnchoredToastProvider,
    ToastProvider,
  } from "$lib/components/ui/toast";
  import SiteHeader from "$lib/components/app/app-site-header.svelte";
  import SiteFooter from "$lib/components/app/site-footer.svelte";

  let { children, data: _data }: { children: Snippet; data: LayoutData } = $props();
</script>

<svelte:head>
  <title>
    coss ui-svelte - A new, modern UI component library built on top of Bits UI.
    Built for developers and AI.
  </title>
  <meta
    name="description"
    content="coss ui-svelte is a collection of accessible, and composable Svelte components. Built on top of Bits UI and styled with Tailwind CSS"
    title="coss ui-svelte - A new, modern UI component library built on top of Bits UI. Built for developers and AI (coming soon)"
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
      ></div>
      <!-- Right dot -->
      <div
        aria-hidden="true"
        class="container pointer-events-none fixed inset-0 z-45 before:absolute before:top-[calc(var(--header-height)-4.5px)] before:-left-[11.5px] before:z-1 before:-ml-1 before:size-2 before:rounded-[2px] before:border before:border-border before:bg-popover before:bg-clip-padding before:shadow-xs/5 after:absolute after:top-[calc(var(--header-height)-4.5px)] after:-right-[11.5px] after:z-1 after:-mr-1 after:size-2 after:rounded-[2px] after:border after:border-border after:bg-background after:bg-clip-padding after:shadow-xs/5 dark:after:bg-clip-border dark:before:bg-clip-border"
      ></div>
      <SiteHeader />
      {@render children()}
      <SiteFooter />
    </div>
  </AnchoredToastProvider>
</ToastProvider>
