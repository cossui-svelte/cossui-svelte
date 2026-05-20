<script lang="ts">
import type { Snippet } from 'svelte';
import type { HTMLAttributes } from 'svelte/elements';
import { cn } from '$lib/utils.js';

interface Props extends HTMLAttributes<HTMLTableElement> {
  children?: Snippet;
}

let { class: className, children, ...restProps }: Props = $props();
</script>

<div class="relative w-full overflow-x-auto" data-slot="table-container">
  <table
    class={cn("w-full caption-bottom text-sm", className)}
    data-slot="table"
    {...restProps}
  >
    {@render children?.()}
  </table>
</div>
