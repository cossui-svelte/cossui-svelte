<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { mergeProps } from 'svelte-toolbelt';

  interface AspectRatioProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * The aspect ratio of the content.
     *
     * @defaultValue 1
     */
    ratio?: number;
    ref?: HTMLDivElement | null;
  }

  let { ref = $bindable(null), ratio = 1, children, ...restProps }: AspectRatioProps = $props();

  const mergedProps = $derived(
    mergeProps(restProps, {
      style: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    })
  );
</script>

<div style:position="relative" style:width="100%" style:padding-bottom="{ratio ? 100 / ratio : 0}%">
  <div bind:this={ref} data-slot="aspect-ratio" {...mergedProps}>
    {@render children?.()}
  </div>
</div>
