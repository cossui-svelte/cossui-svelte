<script lang="ts">
  import Info from '@lucide/svelte/icons/info';
  import ScanEye from '@lucide/svelte/icons/scan-eye';
  import FileBraces from '@lucide/svelte/icons/file-braces';

  import { goto } from '$app/navigation';
  import { resolve } from '$app/paths';
  import { Button, buttonVariants } from '$lib/components/ui/button';
  import { Drawer, DrawerPopup } from '$lib/components/ui/drawer';
  import { Spinner } from '$lib/components/ui/spinner';
  import {
    Tooltip,
    TooltipPopup,
    TooltipProvider,
    TooltipTrigger
  } from '$lib/components/ui/tooltip';
  import type { RegistryParticuleEntry } from '$lib/registry/registry-particles';
  import { cn } from '$lib/utils';
  import ParticleCardContainer from './particle-card-container.svelte';
  import ComponentSource from '$lib/components/app/particle-source.svelte';
  import CodeBlockCommand from '$lib/components/app/code-block-command.svelte';

  let {
    particle,
    class: className,
    colSpan
  }: {
    particle: RegistryParticuleEntry;
    class?: string;
    colSpan?: number;
  } = $props();

  let drawerOpen = $state(false);

  async function viewSource(_file: string) {
    if (drawerOpen) {
      closeDrawer();
      return;
    }
    drawerOpen = true;
  }

  function closeDrawer() {
    drawerOpen = false;
  }
</script>

<ParticleCardContainer class={className} {colSpan}>
  {#snippet footer()}
    <p class="flex flex-1 gap-1 truncate text-muted-foreground text-xs">
      <Info class="size-3 h-lh shrink-0" strokeWidth={2} />
      <span class="truncate">{particle.description ?? ''}</span>
    </p>
    <div class="flex items-center gap-1.5">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            class={cn(buttonVariants({ size: 'sm', variant: 'outline' }), 'text-sm')}
            onclick={() => goto(resolve('/particle/[id]', { id: particle.file }))}
          >
            <ScanEye />
          </TooltipTrigger>
          <TooltipPopup>
            <p>Single particle view</p>
          </TooltipPopup>
        </Tooltip>
      </TooltipProvider>
      <Button class="text-sm" size="sm" variant="outline" onclick={() => viewSource(particle.file)}
        ><FileBraces />View code</Button
      >
      <Drawer
        position="right"
        open={drawerOpen}
        onOpenChange={(v) => {
          if (!v) closeDrawer();
        }}
      >
        <DrawerPopup class="max-w-4xl" showBar showCloseButton={false} variant="straight">
          <div>
            <h2 class="mb-4 font-heading font-semibold text-xl">Installation</h2>
            <figure data-rehype-pretty-code-figure>
              <CodeBlockCommand
                __bun__={`bunx --bun shadcn-svelte@latest add https://cossui-svelte.com/r/${particle.file}.json`}
                __npm__={`npx shadcn-svelte@latest add https://cossui-svelte.com/r/${particle.file}.json`}
                __pnpm__={`pnpm dlx shadcn-svelte@latest add https://cossui-svelte.com/r/${particle.file}.json`}
                __yarn__={`yarn dlx shadcn-svelte@latest add https://cossui-svelte.com/r/${particle.file}.json`}
              />
            </figure>
          </div>
          <div class="flex h-full flex-1 flex-col overflow-hidden">
            <div class="flex items-center justify-between gap-2">
              <h2 class="mt-6 mb-4 font-heading font-semibold text-xl">Code</h2>
            </div>
            <ComponentSource
              class="flex min-h-0 flex-1 flex-col *:data-rehype-pretty-code-figure:mt-0"
              collapsible={false}
              src={particle.file}
            />
          </div>
        </DrawerPopup>
      </Drawer>
    </div>
  {/snippet}

  <div data-particle data-slot="preview" class="flex items-center justify-center">
    {#await particle.component()}
      <Spinner />
    {:then { default: Comp }}
      <Comp />
    {/await}
  </div>
</ParticleCardContainer>

<style>
</style>
