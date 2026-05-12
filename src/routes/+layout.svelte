<script lang="ts">
  import type { LayoutData } from "./$types";
  import type { Snippet } from "svelte";

  import "../app.css";

  import SiteHeader from "$lib/components/app/site-header.svelte";
  import { ModeWatcher } from "mode-watcher";
  import {
    AnchoredToastProvider,
    ToastProvider,
  } from "$lib/components/ui/toast";

  let { children, data }: { children: Snippet; data: LayoutData } = $props();
</script>

<svelte:head>
  <title>
    coss ui-svelte - A new, modern UI component library built on top of Bits UI.
    Built for developers and AI.
  </title>
  <meta
    name="description"
    content="coss ui-svelte is a collection of accessible, and composable React components. Built on top of Bits UI and styled with Tailwind CSS,"
  />
</svelte:head>

<ModeWatcher defaultMode="system" disableTransitions />
<ToastProvider>
  <AnchoredToastProvider>
    <main>{@render children()}</main>
  </AnchoredToastProvider>
</ToastProvider>

<div
  class="relative isolate flex min-h-svh flex-col overflow-clip [--header-height:4rem]"
>
  <div
    aria-hidden="true"
    class="before:-left-3 after:-right-3 container pointer-events-none absolute inset-0 z-45 before:absolute before:inset-y-0 before:w-px before:bg-border/64 after:absolute after:inset-y-0 after:w-px after:bg-border/64"
  />
  <div
    aria-hidden="true"
    class="before:left-[-11.5px] before:-ml-1 after:right-[-11.5px] after:-mr-1 container pointer-events-none fixed inset-0 z-45 before:absolute before:top-[calc(var(--header-height)-4.5px)] before:z-1 before:size-2 before:rounded-[2px] before:border before:border-border before:bg-popover before:bg-clip-padding before:shadow-xs/5 after:absolute after:top-[calc(var(--header-height)-4.5px)] after:z-1 after:size-2 after:rounded-[2px] after:border after:border-border after:bg-background after:bg-clip-padding after:shadow-xs/5 dark:after:bg-clip-border dark:before:bg-clip-border"
  />
  <SiteHeader />
  {@render children()}
</div>
