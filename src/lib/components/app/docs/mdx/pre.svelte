<script lang="ts">
  import type { Snippet } from 'svelte';
  import CodeBlockCommand from '#lib/components/app/code-block-command.svelte';
  import { SHELL_LANGS, toPackageManagerCommands } from '../package-manager-commands.js';

  interface Props {
    children: Snippet;
    code?: string;
    lang?: string;
    title?: string;
  }

  let { children, code = '', lang = '', title }: Props = $props();

  // A single-line install or package-runner command (`npm install …`, `npx …`, `pnpm dlx …`)
  // renders as npm/pnpm/yarn/bun tabs that follow the reader's saved package manager.
  const commands = $derived.by(() => {
    if (!SHELL_LANGS.has(lang)) return undefined;
    const command = code.trim();
    return command.includes('\n') ? undefined : toPackageManagerCommands(command);
  });
</script>

<!-- Mirrors the static parts of code-block.svelte's markup so highlighted fences look consistent, minus the interactive copy button. -->
<figure data-rehype-pretty-code-figure>
  {#if commands}
    <CodeBlockCommand
      __bun__={commands.bun}
      __npm__={commands.npm}
      __pnpm__={commands.pnpm}
      __yarn__={commands.yarn}
    />
  {:else}
    {#if title}
      <figcaption data-rehype-pretty-code-title>{title}</figcaption>
    {/if}
    <div class="overflow-x-auto">{@render children()}</div>
  {/if}
</figure>
