<script lang="ts">
  import type { Snippet } from 'svelte';
  import { DrawerMenuGroup } from '#lib/components/ui/drawer/index.js';
  import { MenuGroup } from '#lib/components/ui/menu/index.js';
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
    <MenuGroup class={className}>{@render children?.()}</MenuGroup>
  {:else}
    <DrawerMenuGroup class={className}>{@render children?.()}</DrawerMenuGroup>
  {/if}
{/if}
