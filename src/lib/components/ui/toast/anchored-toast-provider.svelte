<script lang="ts">
  import { Toast as ToastPrimitive } from '@shardsui/svelte/toast';
  import type { ComponentProps, Snippet } from 'svelte';
  import AnchoredToasts from './anchored-toasts.svelte';
  import { anchoredToastManager } from './toast-manager';

  let {
    children,
    portalProps,
    ...restProps
  }: Omit<ComponentProps<typeof ToastPrimitive.Provider>, 'toastManager' | 'children'> & {
    portalProps?: ComponentProps<typeof ToastPrimitive.Portal>;
    children?: Snippet;
  } = $props();
</script>

<ToastPrimitive.Provider toastManager={anchoredToastManager} {...restProps}>
  {@render children?.()}
  <AnchoredToasts {portalProps} />
</ToastPrimitive.Provider>
