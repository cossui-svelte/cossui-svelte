<script lang="ts">
  import { Spinner } from '$lib/components/ui/spinner';
  import { Tabs, TabsList, TabsPanel, TabsTab } from '$lib/components/ui/tabs';
  import ParticleSource from '$lib/components/app/particle-source.svelte';
  import { allParticles } from '$lib/registry/registry-particles';
  import { cn } from '$lib/utils';

  interface Props {
    align?: 'center' | 'start';
    class?: string;
    name: string;
  }

  let { name, align = 'center', class: className }: Props = $props();

  const particle = $derived(allParticles[name]);
</script>

{#if particle}
  <Tabs class={cn('mt-6', className)} value="preview">
    <TabsList>
      <TabsTab value="preview">Preview</TabsTab>
      <TabsTab value="code">Code</TabsTab>
    </TabsList>
    <TabsPanel value="preview">
      <div
        class={cn(
          'flex min-h-56 items-center rounded-xl border p-8',
          align === 'start' ? 'justify-start' : 'justify-center'
        )}
      >
        {#await particle.component()}
          <Spinner />
        {:then { default: Comp }}
          <Comp />
        {/await}
      </div>
    </TabsPanel>
    <TabsPanel value="code">
      <ParticleSource name={particle.file} />
    </TabsPanel>
  </Tabs>
{/if}
