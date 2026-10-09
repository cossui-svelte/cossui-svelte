<script lang="ts">
  import { DrawerMenuSeparator } from '#lib/components/ui/drawer/index.js';
  import { MenuSeparator } from '#lib/components/ui/menu/index.js';
  import { type AdaptiveMenuVisibility, getAdaptiveMenuVariant, isVisible } from './context.js';

  let { class: className, show }: { class?: string; show?: AdaptiveMenuVisibility } = $props();

  const variant = getAdaptiveMenuVariant();
</script>

{#if isVisible(variant, show)}
  {#if variant === 'menu'}
    <MenuSeparator class={className} />
  {:else}
    <DrawerMenuSeparator class={className} />
  {/if}
{/if}
