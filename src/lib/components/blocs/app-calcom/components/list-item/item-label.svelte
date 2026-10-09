<script lang="ts">
  import { cn } from '#lib/utils.js';

  let {
    colorLight,
    colorDark,
    class: className
  }: { colorLight?: string; colorDark?: string; class?: string } = $props();

  const hasColor = $derived(Boolean(colorLight || colorDark));
</script>

{#if hasColor}
  <div
    aria-hidden="true"
    class={cn(
      'pointer-events-none absolute inset-y-4.5 start-2.5 in-[[data-draggable]:hover,[data-draggable]:has([data-slot=list-item-drag-handle]:focus-visible),[data-draggable][data-drag-overlay],[data-drag-release]]:top-10.5 w-[3px] rounded-full bg-(--label-color-light) not-in-data-drag-release:transition-[top] dark:bg-(--label-color-dark)',
      className
    )}
    data-slot="item-label-color"
    style="--label-color-dark: {colorDark || 'transparent'}; --label-color-light: {colorLight ||
      'transparent'};"
  ></div>
{/if}
