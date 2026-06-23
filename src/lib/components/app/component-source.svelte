<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import CodeBlock from "$lib/components/app/code-block.svelte";
  import CodeCollapsibleWrapper from "$lib/components/app/code-collapsible-wrapper.svelte";
  import { cn } from "$lib/utils";
  import { browser } from "$app/environment";

  let {
    // name,
    src,
    title,
    language,
    collapsible = true,
    class: className,
  }: HTMLAttributes<HTMLDivElement> & {
    // name?: string;
    src?: string;
    title?: string;
    language?: string;
    collapsible?: boolean;
    class?:string
  } = $props();

  async function loadCode(): Promise<string | undefined> {
    if (/*!name &&*/ !src) return undefined;

    // if (name) {
    //   // if (!browser) {
    //   //   const item = await getRegistryItem(name);
    //   //   return item?.files?.[0]?.content;
    //   // }
    //   const resp = await fetch(`/api/source/${name}`);
    //   if (!resp.ok) return undefined;
    //   const data = await resp.json();
    //   return data.content;
    // }

    if (src) {
      if (!browser) {
        const { readFile } = await import("node:fs/promises");
        const { join } = await import("node:path");
        return readFile(join(process.cwd(), src), "utf-8");
      }
      const resp = await fetch(
        `/api/source/${encodeURIComponent(src)}`,
      );
      if (!resp.ok) return undefined;
      return resp.text();
    }
  }

  const codePromise = $derived(loadCode());
</script>

{#await codePromise then code}
  {#if code}
    {@const lang = language ?? title?.split(".").pop() ?? "svelte"}
    {#if !collapsible}
      <div class={cn("relative", className)}>
        <CodeBlock {code} language={lang} {title} />
      </div>
    {:else}
      <CodeCollapsibleWrapper class={className}>
        <CodeBlock {code} language={lang} {title} />
      </CodeCollapsibleWrapper>
    {/if}
  {/if}
{/await}
