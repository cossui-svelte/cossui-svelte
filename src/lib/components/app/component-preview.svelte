<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "$lib/utils";
  import ComponentPreviewTabs from "./component-preview-tabs.svelte";

  /**
   * In SvelteKit the component registry lookup happens in the server load
   * function. Pass the resolved component and source snippets as props.
   */
  interface Props {
    name?: string;
    class?: string;
    metaClassName?: string;
    align?: "center" | "start" | "end";
    hideCode?: boolean;
    component?: Snippet;
    source?: Snippet;
  }

  let {
    name,
    class: className,
    metaClassName,
    align = "center",
    hideCode = false,
    component,
    source,
  }: Props = $props();
</script>

{#if component && source}
  <ComponentPreviewTabs
    {align}
    class={cn(metaClassName, className)}
    {component}
    {hideCode}
    {source}
  />
{:else}
  <p class="text-muted-foreground text-sm">
    Component
    <code
      class="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-[.8125rem]"
    >
      {name}
    </code>
    not found in registry.
  </p>
{/if}
