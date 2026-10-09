<script lang="ts">
  import type { ComponentProps, Snippet } from 'svelte';
  import { DrawerTrigger } from '#lib/components/ui/drawer/index.js';
  import { MenuTrigger } from '#lib/components/ui/menu/index.js';
  import { cn } from '#lib/utils.js';
  import { getAdaptiveMenuVariant } from './context.js';

  type Props = Omit<ComponentProps<typeof MenuTrigger>, 'children'> & {
    children?: Snippet;
    /** Replaces `children` in the desktop (menu) variant. */
    menuChildren?: Snippet;
    /** Replaces `children` in the mobile (drawer) variant. */
    drawerChildren?: Snippet;
  };

  let { class: className, children, menuChildren, drawerChildren, ...restProps }: Props = $props();

  const variant = getAdaptiveMenuVariant();
</script>

{#if variant === 'menu'}
  <MenuTrigger class={cn(className, 'max-md:hidden')} {...restProps}>
    {@render (menuChildren ?? children)?.()}
  </MenuTrigger>
{:else}
  <DrawerTrigger
    class={cn(className, 'md:hidden')}
    {...restProps as ComponentProps<typeof DrawerTrigger>}
  >
    {@render (drawerChildren ?? children)?.()}
  </DrawerTrigger>
{/if}
