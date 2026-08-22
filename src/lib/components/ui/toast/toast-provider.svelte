<script lang="ts">
  import { Toast as ToastPrimitive } from '@shardsui/svelte/toast';
  import type { ComponentProps, Snippet } from 'svelte';
  import { type ToastPosition, toastManager } from './toast-manager';
  import Toasts from './toasts.svelte';

  let {
    children,
    position = 'bottom-right',
    portalProps,
    ...restProps
  }: Omit<ComponentProps<typeof ToastPrimitive.Provider>, 'toastManager' | 'children'> & {
    position?: ToastPosition;
    portalProps?: ComponentProps<typeof ToastPrimitive.Portal>;
    children?: Snippet;
  } = $props();
</script>

<ToastPrimitive.Provider {toastManager} {...restProps}>
  {@render children?.()}
  <Toasts {position} {portalProps} />
</ToastPrimitive.Provider>
