<script lang="ts">
  import { cn } from "$lib/utils";
  import CodeBlock from "../shared-components/code-block.svelte";
  import CodeCollapsibleWrapper from "./code-collapsible-wrapper.svelte";

  /**
   * In SvelteKit, server-side file reading happens in a load function.
   * Pass the already-loaded `code` string and `highlightedCode` HTML here.
   */
  interface Props {
    class?: string;
    code?: string;
    title?: string;
    language?: string;
    collapsible?: boolean;
    /** Pre-rendered highlighted HTML from a server-side highlight function */
    highlightedCode?: string;
  }

  let {
    class: className,
    code,
    title,
    language,
    collapsible = true,
    highlightedCode = "",
  }: Props = $props();

  const lang = $derived(language ?? title?.split(".").pop() ?? "tsx");
</script>

{#if code}
  {#if !collapsible}
    <div class={cn("relative", className)}>
      <CodeBlock {code} language={lang} {title} {highlightedCode} />
    </div>
  {:else}
    <CodeCollapsibleWrapper class={className}>
      <CodeBlock {code} language={lang} {title} {highlightedCode} />
    </CodeCollapsibleWrapper>
  {/if}
{/if}
