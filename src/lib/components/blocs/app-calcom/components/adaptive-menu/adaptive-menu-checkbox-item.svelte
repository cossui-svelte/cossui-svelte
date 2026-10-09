<script lang="ts">
  import type { Snippet } from 'svelte';
  import { DrawerMenuCheckboxItem } from '#lib/components/ui/drawer/index.js';
  import { MenuCheckboxItem } from '#lib/components/ui/menu/index.js';
  import { type AdaptiveMenuVisibility, getAdaptiveMenuVariant, isVisible } from './context.js';

  type Props = {
    checked?: boolean;
    class?: string;
    disabled?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    show?: AdaptiveMenuVisibility;
    variant?: 'default' | 'switch';
    children?: Snippet;
  };

  let {
    checked = $bindable(false),
    class: className,
    disabled,
    onCheckedChange,
    show,
    variant: checkboxVariant = 'default',
    children
  }: Props = $props();

  const variant = getAdaptiveMenuVariant();
</script>

{#if isVisible(variant, show)}
  {#if variant === 'menu'}
    <MenuCheckboxItem
      bind:checked
      class={className}
      {disabled}
      {onCheckedChange}
      variant={checkboxVariant}
    >
      {@render children?.()}
    </MenuCheckboxItem>
  {:else}
    <DrawerMenuCheckboxItem
      bind:checked
      class={className}
      {disabled}
      {onCheckedChange}
      variant={checkboxVariant}
    >
      {@render children?.()}
    </DrawerMenuCheckboxItem>
  {/if}
{/if}
