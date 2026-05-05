<script lang="ts">
  import { Braces, FileCode, FileType2, Folder } from "@lucide/svelte";

  interface Props {
    language: string;
    class?: string;
  }

  let { language, class: className }: Props = $props();
</script>

{#if language === "json"}
  <Braces class={className} strokeWidth={2} />
{:else if language === "css"}
  <FileCode class={className} strokeWidth={2} />
{:else if language === "js" || language === "jsx" || language === "ts" || language === "tsx" || language === "typescript"}
  <FileType2 class={className} strokeWidth={2} />
{:else}
  <Folder class={className} strokeWidth={2} />
{/if}
