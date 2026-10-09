<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '#lib/utils.js';

  let {
    class: className,
    title,
    children,
    ...restProps
  }: Omit<HTMLAttributes<HTMLDivElement>, 'title'> & {
    title: string;
    children?: Snippet;
  } = $props();
</script>

<div class={cn('flex flex-col gap-1', className)} {...restProps}>
  <h1
    class="font-bold font-heading text-lg leading-none [font-variation-settings:'GEOM'_50,'opsz'_32]"
  >
    {title}
  </h1>
  {@render children?.()}
</div>
