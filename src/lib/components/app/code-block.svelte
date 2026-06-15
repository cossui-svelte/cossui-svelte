<script lang="ts">
  import { cn } from "$lib/utils";
  import { ScrollArea } from "$lib/components/ui/scroll-area";
  import { buttonVariants } from "$lib/components/ui/button";
  import {
    Tooltip,
    TooltipProvider,
    TooltipTrigger,
    TooltipPopup,
  } from "$lib/components/ui/tooltip";
  import Copy from "@lucide/svelte/icons/copy";
  import Check from "@lucide/svelte/icons/check";
  import FileCode from "@lucide/svelte/icons/file-code";

  interface Props {
    code: string;
    language: string;
    title?: string;
    copyButton?: boolean;
    showLineNumbers?: boolean;
  }

  let {
    code,
    language,
    title,
    copyButton = true,
    showLineNumbers = true,
  }: Props = $props();

  let isCopied = $state(false);
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  async function getHighlightedCode(src: string, lang: string): Promise<string> {
    const { createHighlighter } = await import("shiki");
    const highlighter = await createHighlighter({
      langs: [lang],
      themes: ["github-light", "github-dark"],
    });
    return highlighter.codeToHtml(src, {
      lang,
      themes: { dark: "github-dark", light: "github-light" },
    });
  }

  const highlightedCode = $derived(getHighlightedCode(code, language));

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
