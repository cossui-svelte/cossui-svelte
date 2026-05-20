<script lang="ts">
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { cn } from '$lib/utils.js';

interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: Snippet;
}

let { class: className, children, ...restProps }: Props = $props();
</script>

<div
  class={cn(
    "block rounded-full h-2 w-full overflow-hidden bg-input",
    className,
  )}
  data-slot="meter-track"
  {...restProps}
>
  {@render children?.()}
</div>
