<script lang="ts">
  import { type Snippet } from 'svelte';
  import type { Editor } from '../Editor.ts';
  import { setEditor } from './editorContext.js';

  let { editor, children }: { editor: Editor | undefined; children?: Snippet } = $props();

  // Context is read once by descendants at init, so the initial editor is what we want to share.
  // svelte-ignore state_referenced_locally
  if (editor) {
    setEditor(editor);
  }
</script>

{#if editor && children}
  {@render children()}
{/if}
