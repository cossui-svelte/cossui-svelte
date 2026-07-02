<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import CodeBlock from "$lib/components/app/code-block.svelte";
  import CodeCollapsibleWrapper from "$lib/components/app/code-collapsible-wrapper.svelte";
  import { cn } from "$lib/utils";
  import type { SourceResponse } from "../../../routes/api/source/[file]/+server";
  import { browser } from "$app/environment";

  interface Props extends HTMLAttributes<HTMLDivElement> {
    class?: string;
    collapsible?: boolean;
    language?: string;
    name?: string;
    src?: string;
    title?: string;
  }

  let {
    name,
    src,
    title,
    language,
    collapsible = true,
    class: className,
  }: Props = $props();

  async function loadCode(): Promise<SourceResponse | undefined> {
    if (!name && !src) return undefined;

    if (name) {
      const resp = await fetch(`/api/source/${name}`);
      if (!resp.ok) return undefined;
      return (await resp.json()) as SourceResponse;
    }

    if (src) {
      if (!browser) {
        const { readFile } = await import("node:fs/promises");
        const { join } = await import("node:path");
        const { highlighter: highlighterPromise } = await import(
          "$lib/components/app/shiki"
        );
        const raw = await readFile(join(process.cwd(), src), "utf-8");
        const highlighter = await highlighterPromise;
        const lang = language ?? title?.split(".").pop() ?? "svelte";
        const html = highlighter.codeToHtml(raw, {
          lang,
          themes: { dark: "github-dark-default", light: "github-light-default" },
        });
        return { html, raw };
      }
      const resp = await fetch(`/api/source/${src}`);
      if (!resp.ok) return undefined;
      return (await resp.json()) as SourceResponse;
    }
  }

  const codePromise = $derived(loadCode());
</script>

{#await codePromise then result}
  {#if result}
    {@const lang = language ?? title?.split(".").pop() ?? "svelte"}
    {#if !collapsible}
      <div class={cn("relative", className)}>
        <CodeBlock code={result.raw} html={result.html} language={lang} {title} />
      </div>
    {:else}
      <CodeCollapsibleWrapper class={className}>
        <CodeBlock code={result.raw} html={result.html} language={lang} {title} />
      </CodeCollapsibleWrapper>
    {/if}
  {/if}
{/await}
