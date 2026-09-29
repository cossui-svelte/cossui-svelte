<script lang="ts">
  import { resolve } from '$app/paths';
  import Code from '@lucide/svelte/icons/code';
  import Eye from '@lucide/svelte/icons/eye';
  import FileCode from '@lucide/svelte/icons/file-code';
  import Fullscreen from '@lucide/svelte/icons/fullscreen';
  import Monitor from '@lucide/svelte/icons/monitor';
  import Smartphone from '@lucide/svelte/icons/smartphone';
  import Tablet from '@lucide/svelte/icons/tablet';
  import { buttonVariants } from '$lib/components/ui/button';
  import { Separator } from '$lib/components/ui/separator';
  import { Spinner } from '$lib/components/ui/spinner';
  import { ToggleGroup, ToggleGroupItem } from '$lib/components/ui/toggle-group';
  import CodeBlock from '$lib/components/app/code-block.svelte';
  import { type BlocMeta, DEFAULT_IFRAME_HEIGHT } from '$lib/components/blocs/bloc-metadata';
  import { cn } from '$lib/utils';
  import type { BlocSourceResponse } from '../../../routes/api/bloc-source/[name]/+server';

  let { name, meta }: { name: string; meta: BlocMeta } = $props();

  type View = 'preview' | 'code';
  type Size = '100' | '60' | '30';

  let view = $state<View>('preview');
  let size = $state<Size>('100');
  let selectedPath = $state<string | undefined>();
  // Source is only fetched once the code view has been opened.
  let codeRequested = $state(false);

  const viewUrl = $derived(resolve('/blocs/view/[name]', { name }));
  const iframeHeight = $derived(meta.iframeHeight ?? DEFAULT_IFRAME_HEIGHT);

  const sourcePromise = $derived(codeRequested ? loadSource(name) : undefined);

  async function loadSource(bloc: string): Promise<BlocSourceResponse> {
    const resp = await fetch(`/api/bloc-source/${bloc}`);
    if (!resp.ok) throw new Error(`Failed to load source for ${bloc}`);
    return (await resp.json()) as BlocSourceResponse;
  }

  function setView(next: View) {
    view = next;
    if (next === 'code') codeRequested = true;
  }
</script>

<section id={name} class="flex scroll-mt-24 flex-col gap-4">
  <div class="flex flex-wrap items-center gap-2">
    <ToggleGroup
      size="sm"
      variant="outline"
      bind:value={
        () => [view],
        (v) => {
          if (v[0]) setView(v[0] as View);
        }
      }
    >
      <ToggleGroupItem value="preview" aria-label="Preview"><Eye />Preview</ToggleGroupItem>
      <ToggleGroupItem value="code" aria-label="Code"><Code />Code</ToggleGroupItem>
    </ToggleGroup>
    <Separator orientation="vertical" class="mx-1 hidden h-4 sm:block" />
    <a href="#{name}" class="font-medium text-sm underline-offset-4 hover:underline">
      {meta.description}
    </a>
    <div class="ms-auto flex items-center gap-2">
      {#if view === 'preview'}
        <ToggleGroup
          size="sm"
          variant="outline"
          class="hidden lg:flex"
          bind:value={
            () => [size],
            (v) => {
              if (v[0]) size = v[0] as Size;
            }
          }
        >
          <ToggleGroupItem value="100" aria-label="Desktop"><Monitor /></ToggleGroupItem>
          <ToggleGroupItem value="60" aria-label="Tablet"><Tablet /></ToggleGroupItem>
          <ToggleGroupItem value="30" aria-label="Mobile"><Smartphone /></ToggleGroupItem>
        </ToggleGroup>
      {/if}
      <a
        href={resolve('/blocs/view/[name]', { name })}
        target="_blank"
        rel="noreferrer"
        class={buttonVariants({ size: 'icon-sm', variant: 'outline' })}
        aria-label="Open in new tab"
      >
        <Fullscreen />
      </a>
    </div>
  </div>

  {#if view === 'preview'}
    <div class="overflow-hidden rounded-xl border bg-muted/40">
      <div
        class={[
          'mx-auto bg-background transition-[width] duration-300',
          size !== '100' && 'border-x'
        ]}
        style:width="{size}%"
      >
        <iframe
          src={viewUrl}
          title={name}
          loading="lazy"
          class="block w-full bg-background"
          style:height={iframeHeight}
        ></iframe>
      </div>
    </div>
  {:else}
    <div class="flex overflow-hidden rounded-xl border bg-code" style:height={iframeHeight}>
      {#await sourcePromise}
        <div class="flex flex-1 items-center justify-center"><Spinner /></div>
      {:then source}
        {#if source}
          {@const current = source.files.find((f) => f.path === selectedPath) ?? source.files[0]}
          <nav class="hidden w-60 shrink-0 flex-col gap-0.5 overflow-y-auto border-e p-2 md:flex">
            {#each source.files as file (file.path)}
              <button
                type="button"
                class={cn(
                  'flex items-center gap-2 truncate rounded-md px-2 py-1.5 text-start text-sm hover:bg-accent',
                  file.path === current.path && 'bg-accent font-medium'
                )}
                onclick={() => (selectedPath = file.path)}
              >
                <FileCode class="size-4 shrink-0 opacity-70" />
                <span class="truncate">{file.path}</span>
              </button>
            {/each}
          </nav>
          <div class="min-w-0 flex-1 overflow-auto *:data-rehype-pretty-code-figure:mt-0">
            <CodeBlock
              code={current.raw}
              html={current.html}
              language={current.path.endsWith('.ts') ? 'typescript' : 'svelte'}
              title={current.path}
            />
          </div>
        {/if}
      {:catch err}
        <p class="m-auto text-muted-foreground text-sm">{err.message}</p>
      {/await}
    </div>
  {/if}
</section>
