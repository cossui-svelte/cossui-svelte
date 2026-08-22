<script lang="ts">
  import Check from '@lucide/svelte/icons/check';
  import Copy from '@lucide/svelte/icons/copy';
  import FileCode from '@lucide/svelte/icons/file-code';
  import { buttonVariants } from '$lib/components/ui/button';
  import { ScrollArea } from '$lib/components/ui/scroll-area';
  import {
    Tooltip,
    TooltipPopup,
    TooltipProvider,
    TooltipTrigger
  } from '$lib/components/ui/tooltip';
  import { cn } from '$lib/utils';

  interface Props {
    code: string;
    copyButton?: boolean;
    /** Pre-rendered HTML from server-side highlighting. When provided, skips client-side shiki entirely. */
    html?: string;
    language: string;
    showLineNumbers?: boolean;
    title?: string;
  }

  let { code, language, title, html, copyButton = true }: Props = $props();

  let isCopied = $state(false);
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  async function getHighlightedCode(src: string, lang: string): Promise<string> {
    const { highlighter } = await import('$lib/components/app/shiki');
    const hl = await highlighter;
    return hl.codeToHtml(src, {
      lang,
      themes: { dark: 'github-dark-default', light: 'github-light-default' }
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
      console.error('Failed to copy:', err);
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
        <TooltipTrigger
          class={cn(
            buttonVariants({ size: 'icon', variant: 'ghost' }),
            'absolute top-1.5 right-1.5 z-3 size-9 opacity-70 hover:opacity-100 focus-visible:opacity-100 sm:size-8'
          )}
          data-slot="copy-button"
          onclick={copyToClipboard}
        >
          <span class="sr-only">Copy</span>
          {#if isCopied}
            <Check class="size-4" strokeWidth={2} />
          {:else}
            <Copy class="size-4" strokeWidth={2} />
          {/if}
        </TooltipTrigger>
        <TooltipPopup>
          {isCopied ? 'Copied' : 'Copy to Clipboard'}
        </TooltipPopup>
      </Tooltip>
    </TooltipProvider>
  {/if}
  <ScrollArea
    data-vaul-no-drag
    class="**:data-[slot=scroll-area-scrollbar]:data-[orientation=horizontal]:mx-2 **:data-[slot=scroll-area-scrollbar]:data-[orientation=vertical]:my-2"
  >
    {#await highlightedCode}
      <div class="px-4 py-3.5 font-mono text-[.8125rem]">{code}</div>
    {:then html}
      <!-- eslint-disable-next-line svelte/no-at-html-tags -- html is Shiki-generated markup from developer-authored source/language props, not user input -->
      {@html html}
    {:catch}
      <div class="px-4 py-3.5 font-mono text-[.8125rem]">{code}</div>
    {/await}
  </ScrollArea>
</figure>

<style>
  @layer components {
    :global([data-rehype-pretty-code-figure]) {
      background-color: var(--color-code);
      color: var(--color-code-foreground);
      border-radius: var(--radius-xl);
      border-width: 1px;
      border-style: solid;
      border-color: var(--border);
      margin-top: calc(var(--spacing) * 6);
      overflow: hidden;
      outline: none;
      position: relative;
      font-size: 0.875rem;
    }

    :global(
      [data-rehype-pretty-code-figure]:has([data-rehype-pretty-code-title])
        [data-slot="copy-button"]
    ) {
      top: calc(var(--spacing) * 1.5);
    }

    :global(*[data-tab="code"] [data-rehype-pretty-code-figure]) {
      border-width: 0;
    }

    :global([data-rehype-pretty-code-title]) {
      min-height: calc(var(--spacing) * 11);
      border-bottom: color-mix(in oklab, var(--border) 64%, transparent);
      border-bottom-width: 1px;
      border-bottom-style: solid;
      padding-block: calc(var(--spacing) * 2.5);
      padding-inline: calc(var(--spacing) * 4);
      font-family: var(--font-mono);
      color: var(--color-code-foreground);
    }
  }
</style>
