<script lang="ts">
  import Check from "@lucide/svelte/icons/check";
  import Copy from "@lucide/svelte/icons/copy";
  import FileCode from "@lucide/svelte/icons/file-code";
  import { buttonVariants } from "$lib/components/ui/button";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import {
    Tooltip,
    TooltipPopup,
    TooltipProvider,
    TooltipTrigger,
  } from "$lib/components/ui/tooltip";
  import { cn } from "$lib/utils";

  interface Props {
    code: string;
    copyButton?: boolean;
    /** Pre-rendered HTML from server-side highlighting. When provided, skips client-side shiki entirely. */
    html?: string;
    language: string;
    showLineNumbers?: boolean;
    title?: string;
  }

  let {
    code,
    language,
    title,
    html,
    copyButton = true,
    showLineNumbers = true,
  }: Props = $props();

  let isCopied = $state(false);
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  async function getHighlightedCode(src: string, lang: string): Promise<string> {
    const { highlighter } = await import("$lib/components/app/shiki");
    const hl = await highlighter;
    return hl.codeToHtml(src, {
      lang,
      themes: { dark: "github-dark-default", light: "github-light-default" },
    });
  }

  const highlightedCode = $derived(html ?? getHighlightedCode(code, language));

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(code);
      isCopied = true;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        isCopied = false;
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }
</script>

<figure class="relative" data-rehype-pretty-code-figure="">
  {#if title}
    <figcaption
      class="flex items-center gap-2 text-[.8125rem] text-code-foreground [&_svg]:size-4.5 [&_svg]:text-code-foreground sm:[&_svg]:size-4"
      data-language={language}
      data-rehype-pretty-code-title=""
    >
      <FileCode />
      {title}
    </figcaption>
  {/if}
  {#if copyButton}
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          {#snippet child({ props }: { props: Record<string, unknown> })}
            <button
              {...props}
              class={cn(
                buttonVariants({ size: "icon", variant: "ghost" }),
                "absolute top-1.5 right-1.5 z-3 size-9 opacity-70 hover:opacity-100 focus-visible:opacity-100 sm:size-8",
              )}
              data-slot="copy-button"
              onclick={copyToClipboard}
              type="button"
            >
              <span class="sr-only">Copy</span>
              {#if isCopied}
                <Check class="size-4" strokeWidth={2} />
              {:else}
                <Copy class="size-4" strokeWidth={2} />
              {/if}
            </button>
          {/snippet}
        </TooltipTrigger>
        <TooltipPopup>
          {isCopied ? "Copied" : "Copy to Clipboard"}
        </TooltipPopup>
      </Tooltip>
    </TooltipProvider>
  {/if}
  <ScrollArea
    class="**:data-[slot=scroll-area-scrollbar]:data-[orientation=horizontal]:mx-2 **:data-[slot=scroll-area-scrollbar]:data-[orientation=vertical]:my-2"
  >
    {#await highlightedCode}
      <div class="px-4 py-3.5 font-mono text-[.8125rem]">{code}</div>
    {:then html}
      {@html html}
    {:catch}
      <div class="px-4 py-3.5 font-mono text-[.8125rem]">{code}</div>
    {/await}
  </ScrollArea>
</figure>
