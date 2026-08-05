<script lang="ts">
  import { Dialog } from 'bits-ui';
  import { cn } from '$lib/utils';
  import { getCtx } from './ctx.js';

  let { ref = $bindable(null), class: className, ...restProps }: Dialog.OverlayProps = $props();

  const {
    refs: { overlayRef },
    states: { isOpen, visible, snapPoints, shouldFade },
    methods: { onRelease, closeDrawer },
    options: { dismissible }
  } = getCtx();

  $effect(() => {
    if (ref) overlayRef.set(ref as HTMLDivElement);
  });

  let hasSnapPoints = $derived($snapPoints && $snapPoints.length > 0);

  function handleClick() {
    if ($dismissible) {
      closeDrawer();
    }
  }
</script>

<Dialog.Overlay
  bind:ref
  onmouseup={onRelease}
  onclick={handleClick}
  data-slot="drawer-overlay"
  data-vaul-drawer-visible={$visible ? 'true' : 'false'}
  data-vaul-overlay=""
  data-vaul-snap-points={$isOpen && hasSnapPoints ? 'true' : 'false'}
  data-vaul-snap-points-overlay={$isOpen && $shouldFade ? 'true' : 'false'}
  class={cn(
    'fixed inset-0 z-50 pointer-events-auto bg-black/32 backdrop-blur-sm duration-200 fill-mode-both data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out supports-[-webkit-touch-callout:none]:absolute',
    className
  )}
  {...restProps}
/>
