<script lang="ts">
  import ScrollArea from "$lib/components/ui/scroll-area.svelte";
  import CopyButton from "./copy-button.svelte";
  import LanguageIcon from "./language-icon.svelte";

  /**
   * Note: The original React component used `await highlightCode(code, language, { showLineNumbers })`
   * as an async Server Component. In Svelte/SvelteKit, code highlighting should be performed in a
   * +page.server.ts load function and the resulting HTML passed as the `highlightedCode` prop.
   */
  interface Props {
    code: string;
    language: string;
    title?: string;
    copyButton?: boolean;
    showLineNumbers?: boolean;
    /** Pre-rendered highlighted HTML (e.g. from a server-side highlight function) */
    highlightedCode: string;
  }

  let {
    code,
    language,
    title,
    copyButton = true,
    showLineNumbers = true,
    highlightedCode,
  }: Props = $props();
</script>

<figure data-rehype-pretty-code-figure="">
  {#if title}
    <figcaption
      class="flex items-center gap-2 text-[.8125rem] text-code-foreground [&_svg]:size-4.5 [&_svg]:text-code-foreground sm:[&_svg]:size-4"
      data-language={language}
      data-rehype-pretty-code-title=""
    >
      <LanguageIcon {language} />
      {title}
    </figcaption>
  {/if}
  {#if copyButton}
    <CopyButton value={code} />
  {/if}
  <ScrollArea
    class="**:data-[slot=scroll-area-scrollbar]:data-[orientation=horizontal]:mx-2 **:data-[slot=scroll-area-scrollbar]:data-[orientation=vertical]:my-2"
  >
    <!-- svelte-ignore -->
    {@html highlightedCode}
  </ScrollArea>
</figure>
