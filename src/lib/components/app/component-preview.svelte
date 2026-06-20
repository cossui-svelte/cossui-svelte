<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "$lib/utils";
  import ComponentPreviewTabs from "$lib/components/app/docs/component-preview-tabs.svelte";
  import ComponentSource from "$lib/components/app/component-source.svelte";

  let {
    name,
    class: className,
    align = "center",
    hideCode = false,
    ...restProps
  }: HTMLAttributes<HTMLDivElement> & {
    name: string;
    align?: "center" | "start" | "end";
    hideCode?: boolean;
  } = $props();

  const component = $derived(Index[name]?.component);
  const metaClassName = $derived(Index[name]?.meta?.className);
</script>

{#if !component}
  <p class="text-muted-foreground text-sm">
    Component
    <code
      class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-[.8125rem]"
    >
      HEHE
      {name}
    </code>
    not found in registry.
  </p>
{:else}
  <ComponentPreviewTabs
    {align}
    class={cn(metaClassName, className)}
    {hideCode}
    {...restProps}
  >
    {#snippet children()}
      <svelte:component this={component} />
    {/snippet}
    {#snippet source()}
      <ComponentSource collapsible={false} {name} />
    {/snippet}
  </ComponentPreviewTabs>
{/if}
