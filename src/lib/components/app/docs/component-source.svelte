<script lang="ts">
  import CodeBlock from '$lib/components/app/code-block.svelte';
  import CodeCollapsibleWrapper from '$lib/components/app/code-collapsible-wrapper.svelte';
  import { cn } from '$lib/utils';
  import type { ComponentSourceFile } from '../../../../routes/api/component-source/[name]/+server';

  interface Props {
    class?: string;
    collapsible?: boolean;
    name: string;
    title?: string;
  }

  let { name, title, collapsible = true, class: className }: Props = $props();

  async function loadFiles(): Promise<ComponentSourceFile[] | undefined> {
    const resp = await fetch(`/api/component-source/${name}`);
    if (!resp.ok) return undefined;
    return (await resp.json()) as ComponentSourceFile[];
  }

  const filesPromise = $derived(loadFiles());
</script>

{#await filesPromise then files}
  {#if files}
    {#each files as file, i (file.filename)}
      {@const fileTitle = i === 0 ? (title ?? file.filename) : file.filename}
      {#if !collapsible}
        <div class={cn('relative', className)}>
          <CodeBlock code={file.raw} html={file.html} language="svelte" title={fileTitle} />
        </div>
      {:else}
        <CodeCollapsibleWrapper class={className}>
          <CodeBlock code={file.raw} html={file.html} language="svelte" title={fileTitle} />
        </CodeCollapsibleWrapper>
      {/if}
    {/each}
  {/if}
{/await}
