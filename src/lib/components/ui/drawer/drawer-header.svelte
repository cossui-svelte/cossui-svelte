<script lang="ts">
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { cn } from '$lib/utils.js';

interface Props extends HTMLAttributes<HTMLDivElement> {
  allowSelection?: boolean;
  children?: Snippet;
}

let { class: className, allowSelection = false, children, ...restProps }: Props = $props();
</script>

<div
  class={cn(
    "flex flex-col gap-2 p-6 in-[[data-slot=drawer-popup]:has([data-slot=drawer-panel])]:pb-3 max-sm:pb-4",
    !allowSelection && "cursor-default",
    className,
  )}
  data-slot="drawer-header"
  {...restProps}
>
  {@render children?.()}
</div>
