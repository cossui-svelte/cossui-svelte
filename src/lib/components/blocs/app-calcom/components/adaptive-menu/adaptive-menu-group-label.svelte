<script lang="ts">
  import type { Snippet } from 'svelte';
  import { DrawerMenuGroupLabel } from '#lib/components/ui/drawer/index.js';
  import { MenuGroupLabel } from '#lib/components/ui/menu/index.js';
  import { type AdaptiveMenuVisibility, getAdaptiveMenuVariant, isVisible } from './context.js';

  let {
    class: className,
    show,
    children
  }: { class?: string; show?: AdaptiveMenuVisibility; children?: Snippet } = $props();

  const variant = getAdaptiveMenuVariant();
</script>

{#if isVisible(variant, show)}
  {#if variant === 'menu'}
    <MenuGroupLabel class={className}>{@render children?.()}</MenuGroupLabel>
  {:else}
    <DrawerMenuGroupLabel class={className}>{@render children?.()}</DrawerMenuGroupLabel>
  {/if}
{/if}
