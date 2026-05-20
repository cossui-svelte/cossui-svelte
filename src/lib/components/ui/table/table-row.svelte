<script lang="ts">
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { cn } from '$lib/utils.js';

interface Props extends HTMLAttributes<HTMLTableRowElement> {
  children?: Snippet;
}

let { class: className, children, ...restProps }: Props = $props();
</script>

<tr
  class={cn(
    "border-b transition-colors hover:bg-muted/72 data-[state=selected]:bg-muted/72",
    className,
  )}
  data-slot="table-row"
  {...restProps}
>
  {@render children?.()}
</tr>
