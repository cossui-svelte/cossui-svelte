<script lang="ts">
import type { Snippet } from 'svelte';
import type { HTMLLabelAttributes } from 'svelte/elements';
import { cn } from '$lib/utils.js';

interface Props extends HTMLLabelAttributes {
  children?: Snippet;
}

let { class: className, children, ...restProps }: Props = $props();
</script>

<label
  class={cn("font-medium text-foreground text-sm", className)}
  data-slot="progress-label"
  {...restProps}
>
  {@render children?.()}
</label>
